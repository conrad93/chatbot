var dotenv = require("dotenv");
var express = require("express");
var cors = require("cors");
var routes = require("./routes");

dotenv.config();
var app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use("/static", express.static("public"));
app.use('/', routes);

module.exports = app;