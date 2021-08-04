const Blockchain = require('./Blockchain');
const Block = require('../Block/Block');

describe('Blockchain', () => {
    const blockchain = new Blockchain();

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block to the chain', () => {
        const newData = 'for ever';
        blockchain.addBlock({ data: newData });
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain does NOT start with the genesis block', () => {
            it('returns False', () => { });
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            describe('a last hash reference has been changed', () => {
                it('returns False', () => { });
            });
            describe('the chain contains a block with an invalid field', () => {
                it('returns False', () => { });
            });
        });
    });
});