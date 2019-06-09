const SHA256 = require('sha256');
const difficulty = 3

class Block {
    constructor(index, timestamp, user, pass, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.user = user;
        this.pass = SHA256(pass).toString();
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.user + this.pass + this.prevHash + this.nonce).toString();
    }

    hashIsValid() {
        return this.hash.slice(0, difficulty) == this.repeat0(difficulty)
    }

    repeat0(difficulty) {
        var string = ''
        for (let i = 0; i < difficulty; i++)
            string += '0'
        return string
    }
    mineBlock(difficulty) {
        console.log('Mining block...')
        while (!this.hashIsValid()) {

            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(0, new Date(), "Bloque Inicial", "0")
    }

    lastBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.lastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    //Devuelve verdadero si es válido el blockchain  y falso si no lo es.
    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.prevHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    //Devuelve verdadero si encuentra el usuario
    verifyUser(user) {
        for (let i = 0; i < this.chain.length; i++) {
            if (this.chain[i].user == user) {
                return true
            }
        }
        return false
    }
    //Devuelve verdadero si la clave es correcta
    verifyPass(user, pass) {
        for (let i = 0; i < this.chain.length; i++) {
            if (this.chain[i].user == user) {
                if (this.chain[i].pass == SHA256(pass).toString())
                    return true
            }
        }
        return false
    }

    replaceChain(newChain) {
        if (newChain.chain.length <= this.chain.length) {
            console.log("Recieved chain is not longer than the current chain");
            return;
        } else if (this.checkValid(newChain)) {
            console.log("Recieved chain is longer than the current chain");
            console.log("Replacing the current chain with new chain...");
            this.chain = newChain;
            return;
        }

    }
}

function verifyUser(user, blockchain) {

    for (let i = 0; i < blockchain.chain.length; i++) {
        if (blockchain.chain[i].user == user) {
            return true
        }
    }
    return false
}


function main() {
    let blockchain = new Blockchain();
    blockchain.addBlock(new Block(blockchain.lastBlock().index + 1, new Date(), 'Parra', '123'));
    blockchain.addBlock(new Block(blockchain.lastBlock().index + 1, new Date(), 'Oscar', '123'));
    console.log(JSON.stringify(blockchain, null, 2));
    console.log("Is blockchain valid? " + blockchain.checkValid());
    console.log('lenght1> ' + blockchain.chain.length)

    let blockchain2 = new Blockchain();
    blockchain2.addBlock(new Block(blockchain2.lastBlock().index + 1, new Date(), 'rakonet', '123'));
    blockchain.replaceChain(blockchain2)
    console.log(JSON.stringify(blockchain, null, 2));
    console.log("Is blockchain valid? " + blockchain2.checkValid());
    console.log('lenght1> ' + blockchain.chain.length)


    let block = new Block(blockchain.lastBlock().index + 1, new Date(), 'Parro', '123', blockchain.lastBlock().hash)
    block.hashIsValid()
    block.mineBlock(3)
}

//module.exports = Block;
module.exports = {
    Block: Block,
    Blockchain: Blockchain,
    verifyUser: verifyUser,
    SHA256: SHA256
}

//////////////MAIN/////////////
//main()