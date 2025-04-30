const { generateMessage } = require("../../server/utils/message");

let socket = io(); //this is gonna create a connection to the server(backend)

socket.on('connect', function ()  {
    console.log('connected to server.');

}); // do something when you have connected to the server

socket.on('newMessage' , function (message){
    console.log('newMessage: ', message); //this will log the message to the console when the newMessage event is emitted from the server
                       //you can also use this to update the UI with the new message
    alert("message received from server" );
}); //listens for newMessage event from server

io.on('disconnect', function () {
    console.log('disconnected from server.');
}); // disconnected from server(e.g server crashes or network issues)


document.querySelector('#submitBtn').addEventListener('click', function (e) {
  
  
});