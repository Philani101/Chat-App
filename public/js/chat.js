function scrollToBottom() {
    let messages = document.querySelector('#message-form').lastElementChild; //this will get the last message element in the message-form
    messages.scrollIntoView();
}

document.addEventListener('DOMContentLoaded', function () {
    const socket = io(); //this is gonna create a connection to the server(backend)

    socket.on('connect', function ()  {
        console.log('connected to server.');

    }); // do something when you have connected to the server

    const screenHeight = document.querySelector('#message-form').scrollHeight;

    socket.on('newMessage' , function (message){
        console.log('newMessage: ', message); //this will log the message to the console when the newMessage event is emitted from the server
        const template = document.querySelector('#msg-template').innerHTML; //this will get the template from the HTML file
        const html = Mustache.render(template, {
            from: message.from,
            text: message.text,
            createdAt: moment(message.createdAt).format('llll') //this will format the date and time using moment.js
        });
        
        const section = document.createElement('section');
        section.innerHTML = html;
        document.querySelector('#message-form').appendChild(section);
        //alert("message received from server" );
        // const formattedTime = moment(message.createdAt).format('llll');
        // let boxContainer = document.getElementById('message-form');
        // let newMsg = document.createElement('li');
        // newMsg.innerHTML = `${message.from}: ${message.text} created at ${formattedTime}`;
        // boxContainer.appendChild(newMsg);
        console.log(screenHeight);
        let currentHeight = document.querySelector('#message-form').scrollHeight;
        if(currentHeight > screenHeight) {
            document.querySelector('#scroll-down-arrow').setAttribute('style', 'display: block;'); //this will show the scroll down arrow if the current height is greater than the screen height
        }
    }); //listens for newMessage event from server

    socket.on('newLocationMessage' , function (message){
        const template = document.querySelector('#msg-template-2').innerHTML; //this will get the template from the HTML file
        const html = Mustache.render(template, {
            from: message.from,
            text: message.url,
            createdAt: moment(message.createdAt).format('llll') //this will format the date and time using moment.js
        });
        
        const section = document.createElement('section');
        section.innerHTML = html;
        document.querySelector('#message-form').appendChild(section);
        // console.log('newLocationMessage: ', message); //this will log the message to the console when the newMessage event is emitted from the server
        // //alert("message received from server" );
        // const formattedTime = moment(message.createdAt).format('llll');
        // let boxContainer = document.getElementById('message-form');
        // let newMsg = document.createElement('li');
        // newMsg.classList.add('location-message'); //this will add a class to the new message element
        // newMsg.innerHTML = `${message.from}: ${message.text} created at ${formattedTime} <br> Location: `;
        // let a = document.createElement('a');
        // a.setAttribute('target', '_blank'); //this will open the link in a new tab
        // a.setAttribute('href', message.url); //this will set the href attribute of the link to the url of the message
        // a.classList.add('location-link'); //this will add a class to the link element
        // a.innerText = ` My current location`;
        // newMsg.appendChild(a);
        // boxContainer.appendChild(newMsg);
        console.log(screenHeight);
        let currentHeight = document.querySelector('#message-form').scrollHeight;
        if(currentHeight > screenHeight) {
            document.querySelector('#scroll-down-arrow').setAttribute('style', 'display: block;'); //this will show the scroll down arrow if the current height is greater than the screen height
        }
    });

    socket.on('disconnect', function () {
        console.log('disconnected from server.');
    }); // disconnected from server(e.g server crashes or network issues)


    document.querySelector('#submitBtn').addEventListener('click', function(e){
    e.preventDefault();
    console.log('submit button clicked.');

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById('message-input').value,
        createdAt: new Date().getTime()
    });
    }); //this will emit the createMessage event to the server when the submit button is clicked
    document.querySelector('#send-location').addEventListener('click', function(e){
        e.preventDefault();
        
        if(!navigator.geolocation){
          return alert('Geolocation not supported by your browser.');
        }

        navigator.geolocation.getCurrentPosition(function(position){
          socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, function(){
            return alert('Unable to fetch location.');//this will alert the user if the location is not found or if something goes wrong
        })
    });
    document.querySelector('#scroll-down-arrow').addEventListener('click', function(e){
        e.preventDefault();
        scrollToBottom();
        document.querySelector('#scroll-down-arrow').setAttribute('style', 'display: none;');
    });
});