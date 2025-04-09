const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class UserService {
    databaseConnection = require('./../database/database');
    user = require('../model/user');
    client;
    userDatabase;
    userCollection;
    constructor() {
        this.client = this.databaseConnection.getMongoClient();
        this.userDatabase = this.client.db(config.mongodb.database);
        this.userCollection = this.userDatabase.collection("user");
    }
    async deleteUser(id) {
        return await this.userCollection.deleteOne({
            "_id": new ObjectId(id)
        });
    }
    async updateUser(user) {
        return await this.userCollection.updateOne({
            "_id": new
                ObjectId(user._id)
        }, { $set: user });
    }
    async insertUser(user) {
        return await this.userCollection.insertOne(user);
    }
    async getUser(id) {
        return await this.userCollection.findOne({
            "_id": new ObjectId(id)
        }, {});
    }
    async findUserByLoginInput(loginInput) {
        return await this.userCollection.findOne({
            $or: [{ username: loginInput }, { email: loginInput }]
        });
    }
    async getUserList() {
        const cursor = await this.userCollection.find({},
            {}).skip(0).limit(100);
        return await cursor.toArray();
    }


}
module.exports = UserService;