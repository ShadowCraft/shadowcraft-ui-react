var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var parse = require('csv-parse/lib/sync');

let url = 'mongodb://localhost:27017/roguesim_python';
MongoClient.connect(url, function(err, db) {
    assert.equal(err, null);

    let collection = db.collection('items');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);

        let wstream = fs.createWriteStream('shadowcraft_ui/static/item_data.js');
        wstream.write('var ITEM_DATA=[')

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

        // Get a list of the bonus IDs with type of 9 (column 5 in the table). We'll
        // use these to map a bunch of other information.
        let data = fs.readFileSync('shadowcraft_ui/external_data/ItemBonus.dbc.csv');
        let allBonuses = parse(data);
        let bonusMap = {};
        allBonuses.filter(function(row) {
            return row[4] == 9;
        }).map(function(row) {
            bonusMap[row[0]] = row;
        });

        // Take the bonus data and find all of the entries that have a type of 5 and
        // and id_node (which maps one bonus to another) that exists in the earlier
        // list of bonuses. This is the list of bonuses that map from a bonus to a
        // description.
        let descrMap = {};
        allBonuses.filter(function(row) {
            return row[3] in bonusMap && row[4] == 5;
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
            return row[3] in bonusMap && row[4] == 2;
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

        // Load the description data to get all of the names for the different bonuses.
        let descData = fs.readFileSync('shadowcraft_ui/external_data/ItemNameDescription.dbc.csv');
        let descriptions = {};
        parse(descData).map(function(row) {
            descriptions[row[0]] = row[1];
        });

        // Take the description data and the map from bonus to description and build up the output.
        let output = {};
        for (let index in descrMap) {
            output[index] = {
                name: descriptions[descrMap[index]],
                stats: propMap[index]
            }
        }

        wstream.write("var RANDOM_SUFFIX_MAP=");
        wstream.write(JSON.stringify(output));
        wstream.write(";\n");

        // Lastly, write out the entirety of the RandPropPoints table since we don't
        // know what ilvl or slot the item is ahead of time. Take out the header row
        // since it's useless and sort the data by the first item.
        let randPropData = fs.readFileSync('shadowcraft_ui/external_data/RandPropPoints.dbc.csv');
        let randProps = {}
        parse(randPropData).filter(function(row) {
            return row[0] != 'id';
        }).map(function(row) {
            randProps[row[0]] = row;
        });

        wstream.write("var RAND_PROP_POINTS=");
        wstream.write(JSON.stringify(randProps));
        wstream.write(';');

        wstream.end();
    });
});
