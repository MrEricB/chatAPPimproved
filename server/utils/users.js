//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//gerUserList(room)

class Users {
    constructor() {
        this.users = []; // array to hold the users
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        //return removed user
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;

    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room){
        var users = this.users.filter((user)=> user.room === room);

        var namesArray = users.map((user)=>user.name);

        return namesArray;
    }
}

module.exports = {Users};