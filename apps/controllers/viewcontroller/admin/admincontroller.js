var express = require("express");
var router = express.Router();

router.get("/category", function (req, res) {
    res.render("./admin/category/index.ejs");
});
router.use("/order", function (req, res) {
    res.render("./admin/order/index.ejs");
});
router.use("/product", function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/auth/login?redirect=/admin/product");
    }
    res.render("./admin/product/index.ejs");
});
router.use("/user", function (req, res) {
    res.render("./admin/user/index.ejs");
});
router.use("/", function (req, res) {
    res.render("./admin/index-v2.ejs");
});
module.exports = router;