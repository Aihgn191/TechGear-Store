const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class OrderService {
    databaseConnection = require('./../database/database');
    order = require('../model/order');
    order = require('../model/orderDetail');
    client;
    orderDatabase;
    orderCollection;
    constructor() {
        this.client = this.databaseConnection.getMongoClient();
        this.orderDatabase = this.client.db(config.mongodb.database);
        this.orderCollection = this.orderDatabase.collection("order");
    }

    async insertOrder(order) {
        return await this.orderCollection.insertOne(order);
    }
}
module.exports = OrderService;