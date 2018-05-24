const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correnct message object', () => {
        var from = 'Eric';
        var text = 'my message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
        
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location object', ()=>{
        var from = 'Bob';
        var latitude = 107;
        var longitude = -120;
        var url = 'https://www.google.com/maps?q=107,-120';
    
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
    });
});