const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Eric',
            room: 'Node FTW'
        }, {
            id: 2,
            name: 'Mike',
            room: 'Node FTW'
        },
        {
            id: 3,
            name: 'Bill',
            room: 'PHP Master Race'
        }
    ]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Eric',
            room: 'Test Room'
        };
        
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });


    it('should not remove user', () => {
        var userId = 999;
        var user = users.removeUser(userId);

        expect(user).toNotExist()
        expect(users.users.length).toBe(3);
    });



    it('should finde user', () => {
        var userId = 1;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = 4;
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });






    it('should return names for Node FTW', () => {
        var userList = users.getUserList('Node FTW');
        expect(userList).toEqual(['Eric', 'Mike'])
    });

    it('should return names for PHP Master Race', () => {
        var userList = users.getUserList('PHP Master Race');
        expect(userList).toEqual(['Bill'])
    });

});


