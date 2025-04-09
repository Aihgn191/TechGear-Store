var express = require("express");
var router = express.Router();


var ProducerService = require("../../services/producerService");
router.get("/", async function (req, res) {
    var producerService = new ProducerService();
    var producers = await producerService.getProducerList();
    res.json(producers);
});
router.get("/:id", async function (req, res) {
    const producerId = req.params.id;
    const producerService = new ProducerService();
    const producer = await producerService.getProducer(producerId);
    res.json(producer);
});
module.exports = router;