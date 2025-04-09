var express = require("express");
var router = express.Router();
var CategoryService = require("../../services/categoryService");
var ProductService = require("../../services/productService");

router.get("/cate/:id", async function (req, res) {
    res.render("product/list.ejs");
});
router.get("/special", async function (req, res) {
    res.render("product/list.ejs");

});
router.get("/new", async function (req, res) {
    res.render("product/list.ejs");

});
router.get("/", async function (req, res) {
    res.render("product/list.ejs");
});
router.get("/:id", async function (req, res) {
    res.render("product/detail.ejs");
});


module.exports = router;