var express = require("express");
var router = express.Router();


var UserService = require("../../services/userService");
router.get("/", async function (req, res) {

    var userService = new UserService();
    var user = await userService.getUser();
    res.json(user);
});
module.exports = router;