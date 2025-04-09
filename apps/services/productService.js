const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class ProductService {
    databaseConnection = require('./../database/database');
    product = require('../model/product');
    client;
    productDatabase;
    productCollection;
    constructor() {
        this.client = this.databaseConnection.getMongoClient();
        this.productDatabase = this.client.db(config.mongodb.database);
        this.productCollection = this.productDatabase.collection("product");
    }
    async deleteProduct(id) {
        return await this.productCollection.deleteOne({
            "_id": new ObjectId(id)
        });
    }
    async updateProduct(product) {
        return await this.productCollection.updateOne({
            "_id": new
                ObjectId(product._id)
        }, { $set: product });
    }
    async updateProduct(productId, updatedData) {
        return await this.productCollection.updateOne(
            {
                "_id": new ObjectId(productId)
            },
            { $set: updatedData }
        );
    }
    async insertProduct(product) {
        return await this.productCollection.insertOne(product);
    }
    async getProduct(id) {
        return await this.productCollection.findOne({
            "_id": new ObjectId(id)
        }, {});
    }
    async getProductList() {
        const cursor = await this.productCollection.find({},
            {}).skip(0).limit(100);
        return await cursor.toArray();
    }
    async getRandomProducts() {
        try {
            const result = await this.productCollection.aggregate([
                { $sample: { size: 8 } }
            ]).toArray();
            return await result;
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
            return [];
        }
    }
    async getLatestProducts() {
        try {
            const result = await this.productCollection
                .find({})
                .sort({ createdAt: -1 }) // sắp xếp mới nhất
                .limit(8)
                .toArray();
            return result;
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm mới nhất:", error);
            return [];
        }
    }

    async getProductByCategoryId(categoryId) {
        return await this.productCollection.find({ category_id: parseInt(categoryId) }).toArray();
    }


}
module.exports = ProductService;