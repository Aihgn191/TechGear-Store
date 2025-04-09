const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class ProducerService {
    databaseConnection = require('./../database/database');
    producer = require('../model/producer');
    client;
    producerDatabase;
    producerCollection;
    constructor() {
        this.client = this.databaseConnection.getMongoClient();
        this.producerDatabase = this.client.db(config.mongodb.database);
        this.producerCollection = this.producerDatabase.collection("producer");
    }
    async deleteProducer(id) {
        return await this.producerCollection.deleteOne({
            "_id": new ObjectId(id)
        });
    }
    async updateProducer(producer) {
        return await this.producerCollection.updateOne({
            "_id": new
                ObjectId(producer._id)
        }, { $set: producer });
    }
    async insertProducer(producer) {
        return await this.producerCollection.insertOne(producer);
    }
    async getProducer(id) {
        return await this.producerCollection.findOne({
            _id: parseInt(id) // đảm bảo id là số
        });
    }
    async getProducerList() {
        const cursor = await this.producerCollection.find({},
            {}).skip(0).limit(100);
        return await cursor.toArray();
    }

}
module.exports = ProducerService;