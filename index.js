const PORT = 3000
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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