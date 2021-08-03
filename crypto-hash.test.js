const cryptoHash = require('./CryptoHash');

describe('cryptoHash()', () => {

    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('I Love You, Jimmy!!')).toEqual('6ccd6537611d85725de2226cd988ed0d2c5786b46d26876119d1a40fdf14af2c');
    });

    it('produces the same hash with the same input arguments in any order', () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'two', 'one'));
    });
});