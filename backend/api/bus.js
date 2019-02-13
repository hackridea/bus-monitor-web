var express = require('express');
var router = express.Router();
var createToken = require('../lib/createToken');

router.post("/register", function (req, res) {
    console.log("register request", req.body);
    let connection = require('../lib/db');
    let query = "INSERT INTO bus VALUES("
        + connection.escape(req.body.id) +
        "," + connection.escape(req.body.password) +
        "," + connection.escape(req.body.name) + ");";
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'There was a problem',
                userData: []
            });
        }
        else {
            var token = createToken(req.body.id, req.body.password);
            res.status(201).send({
                success: true,
                message: 'Registration successful',
                id: req.body.id,
                name: req.body.name,
                jwt: token
            });
        }
    });
});

module.exports = router;