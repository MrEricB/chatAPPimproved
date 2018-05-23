const expect = require('expect');
const {generateMessage} = require('./message');

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