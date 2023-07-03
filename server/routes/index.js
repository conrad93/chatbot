var express = require('express');
var router = express.Router();
var BotRouter = require("./bot");

router.use("/bot", BotRouter);

module.exports = router;