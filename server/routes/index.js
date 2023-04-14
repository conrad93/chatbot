var express = require('express');
var router = express.Router();
var BotRouter = require("./bot");

router.use("/api/bot", BotRouter);

router.use("*", (req, res) => {
    console.log("404: Route not found");
    res.status(404).send("404: Route not found");
});

module.exports = router;