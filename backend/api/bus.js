var express = require('express');
var router = express.Router();



router.post("register", function (req, res) {
    console.log("register request", req.body);
    let connection = require('../lib/db');
    let query = "INSERT INTO Users VALUES("
        + connection.escape(req.body.id) +
        "," + connection.escape(req.body.password) +
        "," + connection.escape(req.body.name) + ");";
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                auth: 'False',
                message: 'There was a problem',
                userData: []
            });
        }
        var token = createToken(req.body.id, req.body.password);
        res.status(201).send({
            auth: 'True',
            userData: results[0],
            jwt: token
        });
    });
})

module.exports = router;;