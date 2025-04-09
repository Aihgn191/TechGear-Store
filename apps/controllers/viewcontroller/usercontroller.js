var express = require("express");
var router = express.Router();
var ejs = require("ejs");
var path = require("path");

router.get("/profile", function (req, res) {
    ejs.renderFile(path.join(__dirname, "../views/user/profile.ejs"), {}, (err, body) => {
        if (err) {
            console.error("Lỗi render home.ejs:", err);
            return res.status(500).send("Lỗi server");
        }
        res.render("partical/layout", { title: "Trang chủ", body });
    });
});
router.get("/edit", function (req, res) {
    ejs.renderFile(path.join(__dirname, "../views/user/edit_profile.ejs"), {}, (err, body) => {
        if (err) {
            console.error("Lỗi render home.ejs:", err);
            return res.status(500).send("Lỗi server");
        }
        res.render("partical/layout", { title: "Trang chủ", body });
    });
});

module.exports = router;