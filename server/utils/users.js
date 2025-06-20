// [{
//     id :'dfhfuiewa',//socket id
//     name : 'joe', //user name
//     room: 'node JS'
// }]

class Users {
     constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    getUserList(room) {
        let users = this.users.filter(user => user.room === room);
        let namesArray = users.map(user => user.name);
        return namesArray;
    }

    getUser(id) {
        let user = this.users.filter(user => user.id === id)[0];
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }

    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
            return user;
        }
        return null;
    }
}

module.exports = { Users };