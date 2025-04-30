const path = require("path");
const express = require("express");
const http = require("http"); //this is the http module which will help to create our own server
const socketIO = require("socket.io");

const {generateMessage} = require('./utils/message'); 
//this is the path to the public folder(will help to serve static files)
const publicPath = path.join(__dirname, "../public");
let app = express();
let server = http.createServer(app); //this will create a server using the express app
const port = process.env.PORT || 3000;
let io = socketIO(server); //this will create a socket.io server using the http server

app.use(express.static(publicPath)); //this will serve the static files in the public folder

io.on('connection' , (socket) => {
    console.log("A new user just connected")

    socket.emit('newMessage' , generateMessage('Admin', 'Welcome new user, to the chat app')
    );// for everyone who connects

        text: 'New user just joined the chat app',
    socket.broadcast.emit('newMessage' , generateMessage('Admin', 'New user just joined the chat app')
    );// for everyone who connects but the current user

    socket.on('createMessage' , (message) => {
        console.log("createMessage: ", message);

        io.emit('newMessage' , generateMessage(message.from, message.text)
            
        ); //sends this to all clients that are connected when a new user connects
    
    }); //this will listen for the createMessage event

    
    socket.on('disconnect' , () => {
        console.log("A user was disconnected");
    }); //this will listen for the disconnect event

}); //this will listen for the connection event

server.listen(port, () => {
    console.log(`Server is up on port ${port}`); //this will log the message to the console when the server is started
}); //this will start the server on port 3000