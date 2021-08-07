const { GENESIS_DATA } = require('../config');
const cryptoHash = require('../CryptoHash');
const { mineBlock } = require('./Block');
// const { mineBlock } = require('./Block');
const Block = require('./Block');

describe('Block', () => {
    const timestamp = 'Today';
    const lastHash = 'prevHash';
    const data = 'I miss Jimmy';
    const hash = 'currHash';
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({ timestamp, lastHash, data, hash, nonce, difficulty });

    it('has a timestamp, lastHash, data, and hash property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    })

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        // console.log('genesisBlock', genesisBlock)
        it('returns a block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mineBlock function works';
        const minedBlock = Block.mineBlock({ lastBlock, data });

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash).toEqual(
                cryptoHash(
                    minedBlock.timestamp,
                    lastBlock.hash,
                    lastBlock.nonce,
                    lastBlock.difficulty,
                    data
                )
            );
        });

        it('sets a `hash` that matches the difficulty level', () => {
            expect(mineBlock.hash.substring(0, minedBlock.difficulty))
            .toEqual('0'.repeat(minedBlock.difficulty));
        });
    });
});
