const PORT = 40000
var localtunnel = require('localtunnel');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const ipify = require('ipify');
const customDomain = 'p2prueba'
//var _ip = require('ip')

function getLocalIp(){
    let ip = _ip.address();
    console.log('ip local de la araña: ' + `${ip}`);

}

function getPublicIp(){
    (async () => {
        let ip = await ipify()
        console.log('ip publica de la araña: ' + `${ip}`);
    })();
}
    

var tunnel = localtunnel(PORT, { subdomain: `${customDomain}` }, (err, tunnel) => {
    console.log('}');
    console.log('Abierto el tunel');
    console.log('}');
    tunnel.on('close', () => {
        console.log("Se te cerró, whoops")
    })
})

//Para servir archivos 
app.use(express.static(__dirname + '/'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
    //console.dir(req)
});

io.on('connection', function (socket) {
    console.log('nació una araña')
    //getLocalIp();
    //getPublicIp();
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        console.log('murió una araña')
    })
})

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`)

})