const sha256 = require('sha256');

class Block {
    constructor(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = sha256(
            this.index + this.timestamp + this.data + this.prevHash
        );
    }
}

const createGenesisBlock = () => new Block(0, Date.now(), 'Genesis Block', '0');

const nextBlock = (lastBlock, data) =>
    new Block(lastBlock.index + 1, Date.now(), data, lastBlock.Hash);