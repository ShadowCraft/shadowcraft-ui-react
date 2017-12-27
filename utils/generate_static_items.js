const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
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
        wstream.write(`export const CHARACTER_DATA_VERSION='${md5}';`);

        wstream.write('export const ITEM_DATA=[');
        const len = docs.length;
        let database_ids = [];
        for (let i = 0; i < len; i++) {
            delete docs[i]['_id'];
            database_ids.push(parseInt(docs[i]['id']));
            wstream.write(JSON.stringify(docs[i]));
            if (i != len-1) {
                wstream.write(',');
            }
        }

        wstream.write('];\n');
        db.close();

        // Load the description data and find all of the entries where the name starts with "of the".
        // These are the random properties. If we find that we missed one later, we can add it here.
        const descData = fs.readFileSync('shadowcraft_ui/external_data/ItemNameDescription.dbc.csv');
        let descriptions = {};
        parse(descData).filter(function(row) {
            return row[1].startsWith("of the");
        }).map(function(row) {
            descriptions[row[0]] = row[1];
        });

        // Get a list of bonus IDs where the val_1 column is in the list of descriptions above.
        // This is how we find a list of bonus IDs that map to a description. Skip any that are
        // less than 1000 since those likely don't mean anything to Legion items.
        const data = fs.readFileSync('shadowcraft_ui/external_data/ItemBonus.dbc.csv');
        const allBonuses = parse(data);
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

        // Write out the entirety of the RandPropPoints table since we don't know what
        // ilvl or slot the item is ahead of time. Take out the header row since it's
        // useless and sort the data by the first item.
        const randPropData = fs.readFileSync('shadowcraft_ui/external_data/RandPropPoints.dbc.csv');
        let randProps = {};
        parse(randPropData, {columns: true}).filter(function(row) {
            return row['id'] >= 750;
        }).map(function(row) {
            let data = {epic: [], rare: [], uncommon: []};
            for (let i = 0; i < 5; i++) {
                data['epic'][i] = row[`epic_points_${i+1}`];
                data['rare'][i] = row[`rare_points_${i+1}`];
                data['uncommon'][i] = row[`uncm_points_${i+1}`];
            }
            randProps[row['id']] = data;
        });

        wstream.write("export const RAND_PROP_POINTS=");
        wstream.write(JSON.stringify(randProps));
        wstream.write(';');

        const itemDamageData = fs.readFileSync('shadowcraft_ui/external_data/ItemDamageOneHand.dbc.csv');
        let itemDamage = {};
        parse(itemDamageData, {columns: true}).filter(function(row) {
            return row['ilevel'] >= 750;
        }).map(function(row) {
            itemDamage[row['ilevel']] = row;
        });

        // Write out the sparse item data to use to calculate item variants in
        // combination with the props data above. Trim the rows down to just the rows
        // that we need though so we're not sending a shit load of extra data along
        // with it.
        const itemSparseData = fs.readFileSync('shadowcraft_ui/external_data/ItemSparse.dbc.csv');
        let itemSparse = {};
        parse(itemSparseData, {columns: true}).filter(function(row) {
            return row[0] != 'id' && database_ids.indexOf(parseInt(row['id'])) != -1;
        }.bind(database_ids)).map(function(row) {
            let data = {stat_alloc: [], stat_val: [], stat_type: []};
            for (let i = 0; i < 10; i++) {
                data['stat_alloc'][i] = row[`stat_alloc_${i+1}`];
                data['stat_val'][i] = row[`stat_val_${i+1}`];
                data['stat_type'][i] = row[`stat_type_${i+1}`];
            }

            // If this item is a weapon, also include the damage stats.
            if (row['inv_type'] == 21 || row['inv_type'] == 22) {
                const speed = row['delay'] / 1000;
                const dps = itemDamage[row['ilevel']][`v_${row['quality']}`];
                data['weapon'] = {
                    speed: speed,
                    dps: dps,
                    min_dmg: Math.round(dps * speed * (1.0 - row['dmg_range'] / 2.0)),
                    max_dmg: Math.round(dps * speed * (1.5 - row['dmg_range'] / 2.0))
                }
            }

            itemSparse[row['id']] = data;
        }.bind(itemDamage));
        wstream.write("export const ITEM_SPARSE=");
        wstream.write(JSON.stringify(itemSparse));
        wstream.write(';');

        wstream.end();
    });
});
