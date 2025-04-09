var express = require('express');
var compression = require('compression');
var app = express();
const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.set("views", __dirname + "/apps/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());

app.use("/static", express.static(__dirname + "/public"));
app.use("/partical", express.static(__dirname + "/views/partical"));
app.use("/fragments", express.static(__dirname + "/views/fragments"));

var apiController = require(__dirname + "/apps/controllers/apicontroller");
var viewController = require(__dirname + "/apps/controllers/viewcontroller");

app.use("/api", apiController);
app.use("/", viewController);

var server = app.listen(3000, function () {
    console.log("Server is running on port 3000");
});