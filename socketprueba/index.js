const PORT = 3000
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var blockchain = require('./blockchain.js')
var utility = require('./utility.js')

app.use(express.static(__dirname + '/'))

app.get('', function (req, res) {
    res.sendFile(__dirname + '/index.html')
    console.dir(req)
})

app.get('/login', function (req, res) {
    console.dir(req)
    res.sendFile(__dirname + '/login.html')
})



io.on('connection', function (socket) {
    console.log(`nació una araña ${socket.id}`)
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        console.log('murió una araña')
    })
    socket.on('reconocimiento', function (ip) {
        console.log(`ip publica del cliente: ${ip}`);
    })
    socket.on('index', function(data, res) {
        console.log(data)
    })
})

http.listen(3000, "0.0.0.0", () => {
    console.log(`listening on *:${PORT}`)
});

console.log('Creating new blockchain...')
chain = new blockchain.Blockchain();
console.log(JSON.stringify(chain, null, 2));
chain.addBlock(new blockchain.Block(chain.lastBlock().index + 1, new Date(), 'Perro', '123'));
console.log(JSON.stringify(chain, null, 2));
var jsonData = JSON.stringify(chain, null, 2);

utility.saveBlockchainToLocal(jsonData)

var localBlockchain = utility.readBlockchainFromLocal('blockchain.json')
localBlockchain.chain[0].user = 'perrito'
localBlockchain = JSON.stringify(localBlockchain, null, 2)
console.log(localBlockchain);

utility.saveBlockchainToLocal(localBlockchain)
