const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class CategoryService {
    databaseConnection = require('./../database/database');
    category = require('../model/category');
    client;
    categoryDatabase;
    categoryCollection;
    constructor() {
        this.client = this.databaseConnection.getMongoClient();
        this.categoryDatabase = this.client.db(config.mongodb.database);
        this.categoryCollection = this.categoryDatabase.collection("category");
    }
    async deleteCategory(id) {
        return await this.categoryCollection.deleteOne({
            "_id": new ObjectId(id)
        });
    }
    async updateCategory(category) {
        return await this.categoryCollection.updateOne({
            "_id": new
                ObjectId(category._id)
        }, { $set: category });
    }
    async insertCategory(category) {
        return await this.categoryCollection.insertOne(category);
    }
    async getCategory(id) {
        return await this.categoryCollection.findOne({
            _id: parseInt(id) // đảm bảo id là số
        }, {});
    }

    async getCategoryList() {
        const cursor = await this.categoryCollection.find({},
            {}).skip(0).limit(100);
        return await cursor.toArray();
    }

}
module.exports = CategoryService;