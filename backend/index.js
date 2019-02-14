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

app.post("/bus/currentData", (req, res) => {
    console.log("current data of the bus", req.body);
    let id = req.body.id, routeid = req.body.routeid, lat = req.body.lat, lng = req.body.lng;
    io.sockets.emit("currentData", { id: id, routeid: routeid, lat: lat, lng: lng });
    res.send({success: true});
})
app.use("/", api);

app.use(express.static("./build"));




server.listen(3001,()=>{
    console.log('listening at 3000');
});