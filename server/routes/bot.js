var express = require('express');
var router = express.Router();
var BotController = require("../controllers/bot");

router.post("/get-response", BotController.getResponse);

module.exports = router;