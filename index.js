const PORT = 3000
var localtunnel = require('localtunnel');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const customDomain = 'p2pruebasss'
/*
var tunnel = localtunnel(PORT, { subdomain: `${customDomain}` }, (err, tunnel) => {
    let domain = tunnel.url
    console.log('}');
    console.log('Abierto el tunel');
    console.log(`URL:${domain}`)
    console.log('}');

    tunnel.on('close', () => {
        console.log("Se te cerró, whoops")
    })
})*/

//Para servir archivos 
app.use(express.static(__dirname + '/'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
    console.dir(req)
});

io.on('connection', function (socket) {
    console.log('nació una araña')
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        console.log('murió una araña')
    })
    socket.on('reconocimiento', function(ip){
        console.log(`ip publica del cliente: ${ip}`);
    })
})

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`)

})