var express = require('express');
var router = express.Router();

router.use("/product", require(__dirname + "/productcontroller.js"));
router.use("/category", require(__dirname + "/categorycontroller.js"));
router.use("/producer", require(__dirname + "/producercontroller.js"));
router.use("/auth", require(__dirname + "/authcontroller.js"));
router.use("/user", require(__dirname + "/usercontroller.js"));
router.use("/order", require(__dirname + "/ordercontroller.js"));
module.exports = router;