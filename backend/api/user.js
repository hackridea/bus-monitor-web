var express = require('express');
var router = express.Router();

router.get("/test", function (req, res) {
    res.send("hello");
    res.end();
});


router.post("/getbuses", function (req, res) {
    console.log("get buses request", req.body);
    let connection = require('../lib/db');
    let query = "select distinct(routeid) from paths p1 where (select idx from paths p2 where p2.routeid = p1.routeid AND p2.name =" + connection.escape(req.body.from) + " ) < (select idx from paths p3 where p3.routeid = p1.routeid AND  p3.name = " + connection.escape(req.body.to) + ")";
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send({
                success: false,
                message: 'There was a problem',
                locations: []
            });
        }
        else {
            if (!results.length) {
                res.send({
                    success: false,
                    message: 'route not found',
                    locations: []
                });
                return;
            }
            let buses = { buses: [] };
            results.forEach((route, index) => {
                let routeid = (route.routeid);
                console.log("routeid is", routeid)
                let query2 = "";
                if (req.body.time) {
                    let time = new Date(req.body.time).toISOString().slice(0, 19).replace('T', ' ');
                    query2 = "select id, init_time, end_time from route where routeid = " + routeid + " and '" + time + "' between init_time AND end_time;";
                }
                else
                    query2 = "select id, init_time, end_time from route where routeid = " + routeid + ";";
                console.log("sudarshan", query2);
                connection.query(query2, function (error, results2, fields) {
                    if (error) {
                        console.log(error);
                        res.send({
                            success: false,
                            message: 'There was a problem',
                            locations: []
                        });
                        return;
                    }
                    else {
                        if (!results2.length) {
                            res.send({
                                success: false,
                                message: 'route not found',
                                locations: []
                            });
                            return;
                        }
                        id = results2[0].id;
                        let sendData = { id: id, init_time: results2[0].init_time, end_time: results2[0].end_time, routeid: routeid }
                        console.log(sendData)
                        let query2 = `select name from bus where id = '${results2[0].id}'`;
                        connection.query(query2, function (error, results3, fields) {
                            if (error) {
                                console.log(error);
                                res.send({
                                    success: false,
                                    message: 'could not get bus name',
                                    locations: []
                                });
                                return;
                            }
                            else {
                                sendData.name = results3[0].name;
                                console.log(results3[0].name)
                            }
                        });
                        let query3 = "select * from paths where routeid =" + routeid + ";";
                        connection.query(query3, function (error, results4, fields) {
                            if (error) {
                                console.log(error);
                                res.send({
                                    success: false,
                                    message: '2There was a problem',
                                    locations: []
                                });
                                return;
                            }
                            else {
                                sendData.locations = [];
                                results4.forEach(location => {
                                    delete location["routeid"]
                                    sendData.locations.push(location);
                                });
                                // console.log(sendData);
                                buses.buses.push(sendData);
                                if (index == results.length - 1)
                                    res.send(buses);
                            }
                        });
                    }
                });
            });

        };
    });
});

router.get("/getbus/:id", function (req, res) {
    console.log("asking for "+req.params.id);
    let id = req.params.id;
    let connection = require('../lib/db');
    let sendData = { name: "", routes: [] };
    let query2 = `select name from bus where id = '${id}'`;
    connection.query(query2, function (error, results3, fields) {
        if (error) {
            console.log(error);
            res.send({
                success: false,
                message: 'could not get bus name',
                locations: []
            });
            return;
        }
        else {
            if (!results3[0].name) {
                res.send({
                    success: false,
                    message: 'could not get bus name',
                    locations: []
                });
                return;
            }
            sendData.name = results3[0].name;
            let query = `select *  from route where id = '${id}';`;
            connection.query(query, function (error, routes, fields) {
                if (error) {
                    console.log(error);
                    res.send({
                        success: false,
                        message: 'There was a problem in getting the routes',
                        locations: []
                    });
                }
                else {
                    routes.forEach((route, index) => {
                        route.locations = [];
                        let query2 = `select * from paths where routeid = ${route.routeid}`;
                        connection.query(query2, function (error, points, fields) {
                            if (error) {
                                console.log(error);
                                res.send({
                                    success: false,
                                    message: 'There was a problem in getting the points for path',
                                    locations: []
                                });
                            }
                            else {
                                route.locations = points;
                                sendData.routes.push(route);
                                if (index == routes.length - 1)
                                    res.send(sendData);
                            }
                        });
                    });
                }
            })
        }
    });
});

module.exports = router;