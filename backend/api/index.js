var express = require("express");
// var app = express();
var router = express.Router();
var bus = require("./bus");
var user = require("./user");

router.use("/bus", bus);
router.use("/user", user);

module.exports = router;