var express = require("express");
var router = express.Router();


var OrderService = require("../../services/orderService");
var OrderModel = require("../../model/order");
const verifyToken = require("../../../middleware/verifyToken");
router.post("/", verifyToken, async function (req, res) {
    try {
        var orderService = new OrderService();
        const order = new OrderModel({
            username: req.body.username,
            status: req.body.status || 'pending',
            orderDate: new Date(),
            ghichu: req.body.ghichu || '',
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            phuongthuc: req.body.phuongthuc,
            totalprice: req.body.totalprice,
            ispay: req.body.ispay,
            items: req.body.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.quantity * item.price
            }))
        });
        const result = await orderService.insertOrder(order);
        res.status(201).json({ message: 'Order created', orderId: result._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating order' });
    }
});
module.exports = router;