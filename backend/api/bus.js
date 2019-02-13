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
                message: 'There was a problem mostly same id',
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

router.post("/login", function (req, res) {
    console.log("login request", req.body);
    let connection = require('../lib/db');
    let query = "SELECT * FROM bus where id = " + connection.escape(req.body.id) + " and password =" + connection.escape(req.body.password);
    connection.query(query, function (error, results, fields) {
        if (error || results.length == 0) {
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
                message: 'login successful',
                id: req.body.id,
                name: req.body.name,
                jwt: token
            });
        }
    });
});

router.post("/createpath", function (req, res) {
    console.log("create path request", req.body);
    let connection = require('../lib/db');
    let query = "insert into route(id,  init_time, end_time) values(?,?,?)";
    let inpData = req.body;
    connection.query(query,[inpData.id, inpData.init_time, inpData.end_time], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'There was a problem',
                locations: []
            });
        }
        else {
            if (!results.length) {
                res.status(500).send({
                    success: false,
                    message: 'route not found',
                    locations: []
                });
                return;
            }
            results.forEach(route => {
                let routeid = (route.routeid);
                console.log("routeid is", routeid)
                let query2 = "select id, init_time, end_time from route where routeid = " + routeid + " and '" + req.body.time + "' between init_time AND end_time;";
                connection.query(query2, function (error, results2, fields) {
                    if (error) {
                        console.log(error);
                        res.status(500).send({
                            success: false,
                            message: 'There was a problem',
                            locations: []
                        });
                        return;
                    }
                    else {
                        if (!results2.length) {
                            res.status(500).send({
                                success: false,
                                message: 'route not found',
                                locations: []
                            });
                            return;
                        }
                        let sendData = { id: results2[0].id, init_time: results2[0].init_time, end_time: results2[0].end_time }
                        console.log(sendData)
                        let query3 = "select * from paths where routeid =" + routeid + ";";
                        connection.query(query3, function (error, results3, fields) {
                            if (error) {
                                console.log(error);
                                res.status(500).send({
                                    success: false,
                                    message: '2There was a problem',
                                    locations: []
                                });
                                return;
                            }
                            else {
                                sendData.locations = [];
                                results3.forEach(location => {
                                    sendData.locations.push(location);
                                });
                                console.log(sendData);
                                res.send(sendData);
                                return;
                            }
                        });
                    }
                });
            });
        };
    });
});

module.exports = router;