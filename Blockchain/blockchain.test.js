const Blockchain = require('./Blockchain');
const Block = require('../Block/Block');
const CryptoHash = require('../CryptoHash');
describe('Blockchain', () => {
    let blockchain, newChain, originalChain;


    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain
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
            describe('and the chain has a block with a jumped difficulty', () => {
                it('returns false', () => {
                    const lastBlock = blockchain.chain[blockchain.chain.length - 1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty - 3;
                    const hash = CryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block({
                        timestamp, lastHash, hash, difficulty, nonce, data
                    });
                    blockchain.chain.push(badBlock);

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
    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' };
                blockchain.replaceChain(newChain.chain);
            });
            it('does not get replaced', () => {

                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs and error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'Red Wine' });
                newChain.addBlock({ data: 'Hard Cider' });
                newChain.addBlock({ data: 'Tequila' });
            });
            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'Beer-Hash';
                    blockchain.replaceChain(newChain.chain);
                });
                it('does not get replaced', () => {
                    expect(blockchain.chain).toEqual(originalChain);
                });

                it('logs and error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });
            describe('and the chain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                });
                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                });
                it('logs about chain replacement', () => {
                    expect(logMock).toHaveBeenCalled();
                });
            });
        });
    });
});