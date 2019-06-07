const ipify = require('ipify')
const _ip = require('ip')
var fs = require('fs')

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


function saveBlockchainToLocal(jsonData) {
    fs.writeFileSync("blockchain.json", jsonData, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function readBlockchainFromLocal(file) {
    let rawdata = fs.readFileSync(`${file}`);
    let blockchain = JSON.parse(rawdata);
    return blockchain
}

module.exports = exports = {
    getLocalIp: getLocalIp,
    getPublicIp: getPublicIp,
    saveBlockchainToLocal: saveBlockchainToLocal,
    readBlockchainFromLocal: readBlockchainFromLocal
}