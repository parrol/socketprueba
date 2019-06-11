const PORT = 3000
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(process.env.PORT || PORT);
var io = socket(server);
var blockchain = require('./blockchain.js')
var utility = require('./utility.js')

var files = {
    files: files
};

var text = {
    text: ''
};

var holis = 'holiss'

app.use(express.static(__dirname + '/'))

app.get('', function (req, res) {
    res.sendFile(__dirname + '/index.html')
    console.dir(req)
})

app.get('/login', function (req, res) {
    console.dir(req)
    res.sendFile(__dirname + '/login.html')
})

app.get('/registro', function (req, res) {
    console.dir(req)
    res.sendFile(__dirname + '/registro.html')
})

app.get('/public', function (req, res) {
    console.dir(req)
    res.sendFile(__dirname + '/public.html')
})
app.get('/archivos', function (req, res) {
    console.dir(req)
    res.sendFile(__dirname + '/loader.html')
})
app.get('/text-editor', function (req, res) {
    console.dir(req)
    res.sendFile(__dirname + '/text-editor.html')
})

io.sockets.on('connection', connection);

function connection(socket) {
    console.log('a new user with id ' + socket.id + " has entered");

    //////////////////////////////////////
    //--------------TEXTO---------------//
    socket.emit('newUser', text);
    socket.emit('initialize', holis);

    socket.on('text', handleTextSent);


    function handleTextSent(data){
        text.text = data.text
        io.sockets.emit('text', data);
    }


    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
    socket.on('files', handleUploadedFiles)

    function handleUploadedFiles(data) {
        files.files = data.file
        io.emit('files', data);
    }

    socket.on('disconnect', function () {
        console.log(`Socket ${socket.id} disconnected.`);
    })
    socket.on('reconocimiento', function (ip) {
        console.log(`ip publica del cliente: ${ip}`);
    })
    socket.on('index', function (data, res) {
        console.log(data)
    })
    socket.on('login', function (email, pass) {
        console.log(email)
        console.log(pass)
        var chain = utility.addMethods();
        if (!utility.validateEmail(email)) {
            console.log('email incorrecto')
            io.emit('login', 'email incorrecto', 1)
        } else {
            console.log('email correcto')

            if (pass == '') {
                io.emit('login', 'ingrese una contraseña válida', 4)
            } else if (chain.verifyUser(email)) {
                console.log('Usuario registrado')
                if (chain.verifyPass(email, pass)) {
                    console.log('Contraseña correcta')
                    io.emit('login', 'Contraseña correcta', 5)

                } else if (!chain.verifyPass(email, pass)) {
                    console.log('contraseña incorrecta')
                    io.emit('login', 'contraseña incorrecta', 3)

                }

            } else if (!chain.verifyUser(email)) {
                console.log('Usuario no registrado')
                io.emit('login', 'usuario no registrado', 2)
            }
        }
    })
    socket.on('registro', function (email, pass) {
        var chain = utility.addMethods();
        var block = new blockchain.Block(chain.lastBlock().index + 1, new Date(), email, pass)
        block.mineBlock(3)
        chain.addBlock(block);
        utility.saveBlockchainToLocal(chain, 'blockchain')
    })
}
/*
http.listen(3000, "0.0.0.0", () => {
    console.log(`listening on *:${PORT}`)
});
*/
/////////////////////////////////FROALA//////////////////
/*io.sockets.on('connection', connection);

var text = {
    text: ''
};

function connection(socket){
    console.log('a new user with id ' + socket.id + " has entered");
    socket.emit('newUser', text);

    socket.on('text', handleTextSent);

    function handleTextSent(data){
        text.text = data.text
        io.sockets.emit('text', data);
    }
}

*/
function main() {
    console.log('Creating new blockchain...')
    var chain = new blockchain.Blockchain();
    console.log(chain.checkValid())
    console.log(JSON.stringify(chain, null, 2));
    chain.addBlock(new blockchain.Block(chain.lastBlock().index + 1, new Date(), 'Perro', '123'));
    console.log(JSON.stringify(chain, null, 2));
    var jsonData = JSON.stringify(chain, null, 2);

    utility.saveBlockchainToLocal(jsonData)
    var localBlockchain = new blockchain.Blockchain();
    localBlockchain = utility.readBlockchainFromLocal('blockchain.json')
    localBlockchain.chain[0].user = 'perrito'
    console.log(localBlockchain)
    console.log(blockchain.verifyUser('Perro', localBlockchain));

    const returned = Object.assign(chain, localBlockchain)

    returned.addBlock(new blockchain.Block(chain.lastBlock().index + 1, new Date(), 'Pedrito', '123'));
    utility.saveBlockchainToLocal(returned, 'returned')
}

function main2() {
    console.log('//////////MAIN2//////////')
    chain = utility.addMethods()
    console.log(chain.verifyUser('pedrito'))
    chain.addBlock(new blockchain.Block(chain.lastBlock().index + 1, new Date(), 'pedrito', '123'));
    console.log(chain.verifyUser('pedrito'))
    console.log(chain)

}
////////////////MAIN///////////
//main2()


