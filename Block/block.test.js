const { GENESIS_DATA } = require('../config');
const Block = require('./Block');

describe('Block', () => {
    const timestamp = 'Today';
    const lastHash = 'prevHash';
    const data = 'I miss Jimmy';
    const hash = 'currHash';
    const block = new Block({ timestamp, lastHash, data, hash });

    it('has a timestamp, lastHash, data, and hash property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
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

        it(`sets the 'lastHash' to be the 'hash' of the lastBlock`, () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it(`sets the 'data'`, () => {
            expect(minedBlock.data).toEqual(data);
        });

        it(`sets a 'timestamp'`, () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });
    });
});