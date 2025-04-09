var express = require("express");
var router = express.Router();


var CategoryService = require("../../services/categoryService");
router.get("/", async function (req, res) {
    var categoryService = new CategoryService();
    var categories = await categoryService.getCategoryList();
    res.json(categories);
});
router.get("/:id", async function (req, res) {
    const categoryId = req.params.id;
    const categoryService = new CategoryService();
    const category = await categoryService.getCategory(categoryId);
    res.json(category);
});
module.exports = router;