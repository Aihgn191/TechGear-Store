const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true }
});

const OrderSchema = new Schema({
    address: { type: String, required: true },
    ghichu: { type: String, default: '' },
    username: { type: String, default: '' },
    phonenumber: { type: String, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'], default: 'pending' },
    orderDate: { type: Date, default: Date.now },
    ispay: { type: Boolean, default: false },
    phuongthuc: { type: String, required: true },
    totalprice: { type: Number, required: true },
    items: [OrderItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);