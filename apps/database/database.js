
var config = require("../../config/setting.json");
class DatabaseConnection {
    url;
    user;
    pass;
    constructor() {

    }
    static getMongoClient() {
        this.user = config.mongodb.username;
        this.pass = config.mongodb.password;
        this.url =

            this.url = `mongodb+srv://${this.user}:${this.pass}@cluster0.koy4w.mongodb.net/?retryWrites=true&w=majority`;
        //this.url =" mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=5000&amp;connectTimeoutMS=10000";
        const { MongoClient } = require('mongodb');
        const client = new MongoClient(this.url);
        return client;
    }

}
module.exports = DatabaseConnection;

