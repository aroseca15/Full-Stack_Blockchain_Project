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
});