var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var api = require("./api");
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

io.on('connection', function (socket) {
    socket.emit('test', { hello: 'world' });
});

//store the last know details about bus
storeState = (id, last_lat, last_lng, crowd_status) => {
    console.log('storing last know data to database');
    let connection = require('./lib/db');
    let query = `update  bus set  last_lat =${last_lat} ,last_lng =${last_lng} , crowd_status = ${crowd_status} where id = '${id}';`;
    connection.query(query, (err, result, field) => {
        if (err) {
            console.log(err);
        }
    });
};

app.post("/bus/currentData", (req, res) => {
    console.log("current data of the bus", req.body);
    let id = req.body.id, routeid = req.body.routeid, lat = req.body.lat, lng = req.body.lng, crowd_status = req.body.crowd_status;
    storeState(id, lat,lng, crowd_status);
    io.sockets.emit("currentData", { id, routeid, lat, lng, crowd_status });
    res.send({ success: true });
});

app.use("/", api);

app.use(express.static("./build"));




server.listen(3001, () => {
    console.log('listening at 3000');
});