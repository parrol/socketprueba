const ipify = require('ipify')
const _ip = require('ip')
var fs = require('fs')
var blockchain = require('./blockchain.js/index.js')

function validateEmail(input) {
    if ((input).trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
    }
    else {
        if ((input).trim() == '') {
            return false;
        }
    }
    return true;
}

function getLocalIp() {
    let ip = _ip.address();
    console.log('ip local de la araña: ' + `${ip}`);
    return ip
}

function getPublicIp() {
    (async () => {
        var ip = await ipify()
        console.log('ip publica de la araña: ' + `${ip}`)
        return ip
    })();
}

function saveBlockchainToLocal(blockchain, name) {
    string = JSON.stringify(blockchain, null, 2)
    fs.writeFileSync(`${name}.json`, string, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

//devuelve el blockchain local con los metos de su clase 
function addMethods() {
    var chain = new blockchain.Blockchain();
    var localBlockchain = new blockchain.Blockchain();
    localBlockchain = readBlockchainFromLocal('blockchain.json')
    chain = Object.assign(chain, localBlockchain)
    return chain
}

//Devuelve un objeto de tipo blockchain
function readBlockchainFromLocal(file) {
    let rawdata = fs.readFileSync(`${file}`);
    let blockchain = JSON.parse(rawdata);
    return blockchain
}

module.exports = exports = {
    getLocalIp: getLocalIp,
    getPublicIp: getPublicIp,
    saveBlockchainToLocal: saveBlockchainToLocal,
    readBlockchainFromLocal: readBlockchainFromLocal,
    validateEmail: validateEmail,
    addMethods: addMethods
}