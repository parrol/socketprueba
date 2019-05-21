import ipify from 'ipify';
import { address } from 'ip';

function getLocalIp(){
    let ip = address();
    console.log('ip local de la araña: ' + `${ip}`);
    return ip
}

function getPublicIp(){
    (async () => {
        let ip = await ipify()
        console.log('ip publica de la araña: ' + `${ip}`);
    })();
}