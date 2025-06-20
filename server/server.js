const path = require("path");
const express = require("express");
const http = require("http"); //this is the http module which will help to create our own server
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require('./utils/message'); 
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');
//this is the path to the public folder(will help to serve static files)
const publicPath = path.join(__dirname, "../public");
let app = express();
let server = http.createServer(app); //this will create a server using the express app
const port = process.env.PORT || 3000;
let io = socketIO(server); //this will create a socket.io server using the http server
let users = new Users(); //this will create a new instance of the Users class

app.use(express.static(publicPath)); //this will serve the static files in the public folder

io.on('connection' , (socket) => {
    socket.on('connected', (params) => {
        socket.emit('newMessage' , generateMessage('Admin', `Welcome ${params.name}!`));// for everyone who connects
        
    });
    
    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        } //this will check if the name and room are real strings
        
        socket.join(params.room); //this will join the user to the room
        users.removeUser(socket.id); //this will remove the user from the previous room if they were in one
        users.addUser(socket.id, params.name, params.room); //this will add the user to the room

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); //this will emit the updateUserList event to all clients in the room
        socket.emit('newMessage', generateMessage(`Admin`, `Welcome to the ${params.room} chat room`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback(); //this will call the callback function when the user joins
    }); //this will listen for the join event

    socket.on('createMessage' , (message) => {
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); //this will emit the newMessage event to all clients in the room
        }
    
    }); //this will listen for the createMessage event

    socket.on('createLocationMessage', (coords) => {
      let user = users.getUser(socket.id);
      if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude , coords.longitude)); //this will emit the newLocationMessage event to all clients in the room
      }
    });
    
    socket.on('disconnect' , () => {
        let user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //this will emit the updateUserList event to all clients in the room
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room`)); //this will emit the newMessage event to all clients in the room
        }
    }); //this will listen for the disconnect event

}); //this will listen for the connection event

server.listen(port, () => {
    console.log(`Server is up on port ${port}`); //this will log the message to the console when the server is started
}); //this will start the server on port 3000