var express = require('express');
var router = express.Router();

router.get("/test", function (req, res) {
    res.send("hello");
    res.end();
});

router.post("/getbuses", function (req, res) {
    console.log("get buses request", req.body);
});

module.exports = router;