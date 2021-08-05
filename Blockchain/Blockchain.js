const Block = require('../Block/Block');
const CryptoHash = require('../CryptoHash');
class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });

        this.chain.push(newBlock);
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error('Incoming chain must be longer.');
            return;
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error('Incoming chain must be valid');
            return;
        }
        this.chain = chain;
        console.log('Chain was successfully replaced with:', chain);
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        };

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, data, hash } = chain[i];
            const actualLastHash = chain[i - 1].hash;

            if (lastHash !== actualLastHash) return false;

            const validatedHash = CryptoHash(timestamp, lastHash, data);

            if (hash !== validatedHash) return false;
        }
        return true;
    }
}

module.exports = Blockchain;