var express = require("express");
// var app = express();
var router = express.Router();
var bus = require("./bus");
var user = require("./user");

router.post("/", function (req, res) {
    console.log(req.body, req.params);
    res.send({ success: true });
});

router.use("/bus", bus);
router.use("/user", user);

module.exports = router;