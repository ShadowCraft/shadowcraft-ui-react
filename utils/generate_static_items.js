var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

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

        wstream.write(']');
        wstream.end();
        
        db.close();
    });
});
