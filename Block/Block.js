const CryptoHash = require('../CryptoHash');
const { GENESIS_DATA, MINE_RATE } = require('../config');

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
        let timestamp, hash;
        const lastHash = lastBlock.hash;
        const { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            hash = CryptoHash(timestamp, lastHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash
        });
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        const difference = timestamp - originalBlock.timestamp;

        if (difference > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }

}

module.exports = Block;