const ipify = require('ipify')
const _ip = require('ip')

function getLocalIp(){
    let ip = _ip.address();
    console.log('ip local de la araña: ' + `${ip}`);
    return ip
}

function getPublicIp(){
    (async () => {
        var ip = await ipify()
        console.log('ip publica de la araña: ' + `${ip}`)
        return ip
    })();
}

module.exports = exports = {
    getLocalIp: getLocalIp,
    getPublicIp: getPublicIp
}