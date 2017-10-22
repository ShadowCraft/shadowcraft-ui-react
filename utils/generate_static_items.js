var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var parse = require('csv-parse/lib/sync');
const crypto = require('crypto');

let url = 'mongodb://localhost:27017/roguesim_python';
MongoClient.connect(url, function(err, db) {
    assert.equal(err, null);

    let collection = db.collection('items');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);

        let wstream = fs.createWriteStream('shadowcraft_ui/js/item_data.js');

        // get the md5 checksum for models/character.py and store it in the ITEM_DATA block so
        // that we can use it to check on whether the character data version has changed.
        const pyfile = fs.readFileSync('shadowcraft_ui/models/character.py');
        const md5 = crypto.createHash('md5').update(pyfile).digest("hex");
        wstream.write(`export const CHARACTER_DATA_VERSION=${md5};`);

        wstream.write('export const ITEM_DATA=[');
        let len = docs.length;
        for (let i = 0; i < len; i++) {
            delete docs[i]['_id'];
            wstream.write(JSON.stringify(docs[i]));
            if (i != len-1) {
                wstream.write(',');
            }
        }

        wstream.write('];\n');
        db.close();

        // Load the description data and find all of the entries where the name starts with "of the".
        // These are the random properties. If we find that we missed one later, we can add it here.
        let descData = fs.readFileSync('shadowcraft_ui/external_data/ItemNameDescription.dbc.csv');
        let descriptions = {};
        parse(descData).filter(function(row) {
            return row[1].startsWith("of the");
        }).map(function(row) {
            descriptions[row[0]] = row[1];
        });

        // Get a list of bonus IDs where the val_1 column is in the list of descriptions above.
        // This is how we find a list of bonus IDs that map to a description. Skip any that are
        // less than 1000 since those likely don't mean anything to Legion items.
        let data = fs.readFileSync('shadowcraft_ui/external_data/ItemBonus.dbc.csv');
        let allBonuses = parse(data);
        let descrMap = {};
        allBonuses.filter(function(row) {
            return row[1] in descriptions && parseInt(row[3]) > 1000;
        }).map(function(row) {
            descrMap[row[3]] = row[1];
        });

        // Take the bonus data and find all of the entries that have a type of 2 and
        // and id_node that exists in the earlier list of bonuses. This is the list
        // bonuses that map from a bonus to a list of stats for the random properties.
        // These will be used in conjunction with the RandPropPoints table and the
        // item's ilvl and slot to calculate the actual stat values.
        let propMap = {};
        allBonuses.filter(function(row) {
            return row[3] in descrMap && row[4] == 2;
        }).map(function(row) {
            if (!(row[3] in propMap)) {
                propMap[row[3]] = {};
            }

            let stat = '';
            switch(row[1]) {
                case '32': stat = 'crit'; break;
                case '36': stat = 'haste'; break;
                case '40': stat = 'versatility'; break;
                case '49': stat = 'mastery'; break;
            }

            // The value in the table here is multiplied by 10000 to make it
            // easier to store (I'm guessing?). Divide by 10000 here so that we
            // don't have to do it repeatedly in the UI code.
            propMap[row[3]][stat] = parseFloat(row[2]) / 10000.0;
        });

        // Take the description data and the map from bonus to description and build up the output.
        let output = {};
        for (let index in descrMap) {
            output[index] = {
                name: descriptions[descrMap[index]],
                stats: propMap[index]
            };
        }

        wstream.write("export const RANDOM_SUFFIX_MAP=");
        wstream.write(JSON.stringify(output));
        wstream.write(";\n");

        // Lastly, write out the entirety of the RandPropPoints table since we don't
        // know what ilvl or slot the item is ahead of time. Take out the header row
        // since it's useless and sort the data by the first item.
        let randPropData = fs.readFileSync('shadowcraft_ui/external_data/RandPropPoints.dbc.csv');
        let randProps = {};
        parse(randPropData).filter(function(row) {
            return row[0] != 'id';
        }).map(function(row) {
            randProps[row[0]] = row;
        });

        wstream.write("export const RAND_PROP_POINTS=");
        wstream.write(JSON.stringify(randProps));
        wstream.write(';');

        wstream.end();
    });
});
