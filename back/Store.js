const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('./config');
/*
const ParserCultbeauty = require('./component/ParserCultbeauty');
url = 'mongodb://' + config.mongodb.user + ':' + config.mongodb.pwd + '@' + config.mongodb.host;
console.log(url);
const client = new MongoClient(url, { useNewUrlParser: true });*/
/*

client.connect(function(err) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server");

    const db = client.db(config.mongodb.db);

    const insertDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Insert some documents
        collection.insertMany([
            {a : 1}, {a : 2}, {a : 3}
        ], function(err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        });
    };
    insertDocuments(db, () =>{});

    client.close();
});
*/

const url = 'mongodb://' + config.mongodb.user + ':' + config.mongodb.pwd + '@' + config.mongodb.host;

class Store {

    async insertProduct(product) {
        let client;
        try {
            let ret;
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            const db = client.db(config.mongodb.db);

            const collection = db.collection('products');
            return (await collection.insertOne(product)).insertedId;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    }

    async removeAllProducts() {
        let client;
        try {
            let ret;
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            const db = client.db(config.mongodb.db);

            const collection = db.collection('products');
            return (await collection.deleteMany({})).insertedId;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    }

    async getAllProducts() {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            const db = client.db(config.mongodb.db);

            const collection = db.collection('products');
            return await collection.find().toArray();
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

    }
}


module.exports = Store;