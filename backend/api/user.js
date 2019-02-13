var express = require('express');
var router = express.Router();

router.get("/test", function (req, res) {
    res.send("hello");
    res.end();
});

router.post("/getbuses", function (req, res) {
    console.log("get buses request", req.body);
    let connection = require('../lib/db');
    let query = "select distinct(routeid) from paths p1 where (select idx from paths p2 where p2.routeid = p1.routeid AND p2.loc =" + connection.escape(req.body.from) + " ) < (select idx from paths p3 where p3.routeid = p1.routeid AND  p3.loc = " + connection.escape(req.body.to) + ")";
    connection.query(query, function (error, results, fields) {
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
                let query2 = "";
                if (req.body.time)
                    query2 = "select id, init_time, end_time from route where routeid = " + routeid + " and '" + req.body.time + "' between init_time AND end_time;";
                else
                    query2 = "select id, init_time, end_time from route where routeid = " + routeid + ");";
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