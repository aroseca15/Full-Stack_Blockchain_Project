const Blockchain = require('./Blockchain');
const Block = require('../Block/Block');

describe('Blockchain', () => {
    let blockchain = new Blockchain();

    beforeEach(() => {
        blockchain = new Blockchain();
    });

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
            it('returns False', () => {
                blockchain.chain[0] = { data: 'evil-genesis' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Red Wine' });
                blockchain.addBlock({ data: 'Hard Cider' });
                blockchain.addBlock({ data: 'Tequila' });
            });
            describe('and a last hash reference has been changed', () => {
                it('returns False', () => {

                    blockchain.chain[2].lastHash = 'Wine Cooler';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain contains a block with an invalid field', () => {
                it('returns False', () => {

                    blockchain.chain[2].data = 'Wine Cooler is the BEST!';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain contains Valid blocks with no invalid blocks', () => {
                it('returns True', () => {

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });
});