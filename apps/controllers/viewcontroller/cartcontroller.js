var express = require("express");
var router = express.Router();
const config = require("../../../config/setting.json");


router.get("/", async function (req, res) {
    res.render("cart/index.ejs");
});
router.get("/success", async function (req, res) {
    res.render("cart/success.ejs");
});
router.get("/payment", async function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/auth/login?redirect=/cart/payment");
    }
    res.render("cart/payment.ejs", { clientId: config.paypal.clientId });
});
module.exports = router;
