const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {
    it('should reject non string values', () => {
        var res = isRealString(98);

        expect(res).toBe(false);
    });

    it('should reject sting with oly spaces', () =>{
        var res = isRealString('   ');
        expect(res).toBe(false);
    })

    it('should allow sting with non-space chars', () => {
        var res = isRealString('Testing');
        expect(res).toBe(true);
    })
});