const PORT = 40000
var localtunnel = require('localtunnel');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const customDomain = 'ricardoasombrateporfis'

var tunnel = localtunnel(PORT, { subdomain: `${customDomain}`}, (err, tunnel) => {
    console.log(tunnel);
    tunnel.on('close', () => {
        console.log("Se te cerró, ups")
    })
})

app.use(express.static(__dirname + '/'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function (socket) {
    console.log('nació una araña')
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    })
    socket.on('disconnect', function () {
        console.log('murió una araña')
    })
})

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`)
})