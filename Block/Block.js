const CryptoHash = require('../CryptoHash');
const { GENESIS_DATA } = require('../config');

class Block {

    constructor({ timestamp, lastHash, data, hash, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const { difficulty } = lastBlock;
        let nonce = 0;
        return new this({
            timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash: CryptoHash(timestamp, lastHash, data, nonce, difficulty)
        });
    }

}

module.exports = Block;