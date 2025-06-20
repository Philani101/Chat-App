function scrollToBottom() {
    let messages = document.querySelector('#message-form').lastElementChild; //this will get the last message element in the message-form
    messages.scrollIntoView();
}
function getRandomTriadicColor() {
    const baseHue = 120;
    // Pick randomly from the triadic hues, excluding green (120°)
    const triadicHues = [(baseHue + 120) % 360, (baseHue + 240) % 360];
    const hue = triadicHues[Math.floor(Math.random() * triadicHues.length)];

    const saturation = Math.floor(Math.random() * 30) + 50;
    const lightness = Math.floor(Math.random() * 30) + 40;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
function getRandomComplementaryColor() {
  const baseHue = 120;
  const complementaryHue = (baseHue + 180) % 360;

  const saturation = Math.floor(Math.random() * 30) + 50; // 50-80%
  const lightness = Math.floor(Math.random() * 30) + 40;  // 40-70%

  return `hsl(${complementaryHue}, ${saturation}%, ${lightness}%)`;
}

function getRandomSplitComplementaryColor() {
  const baseHue = 120;
  const splitHue = (baseHue + (Math.random() < 0.5 ? 150 : 210)) % 360;

  const saturation = Math.floor(Math.random() * 30) + 50;
  const lightness = Math.floor(Math.random() * 30) + 40;

  return `hsl(${splitHue}, ${saturation}%, ${lightness}%)`;
}
function getRandomHarmonyColor() {
  const modes = ['complementary', 'split', 'triadic'];
  const pick = modes[Math.floor(Math.random() * modes.length)];

  if (pick === 'complementary') return getRandomComplementaryColor();
  if (pick === 'split')         return getRandomSplitComplementaryColor();
  if (pick === 'triadic')       return getRandomTriadicColor();
}
// let displayname = '';
// let currentRoom = '';

document.addEventListener('DOMContentLoaded', function (e) {
    document.documentElement.style.setProperty('--main-color', getRandomHarmonyColor());
    const socket = io(); //this is gonna create a connection to the server(backend)

    socket.on('connect', function ()  {
        console.log('connected to server.');
        let searchQuery = window.location.search; //this will get the query string from the URL and remove the '?' at the beginning
        let params = {};
            const searchParams = new URLSearchParams(searchQuery);
            for (const [key, value] of searchParams.entries()) {
                params[key] = value;
            }
        socket.emit('connected',params);
        socket.emit('join', params, function(err) {
            if(err) {
                alert(err);
                window.location.href = '/'; //this will redirect the user to the home page if there is an error
            } else {
                console.log('No error');
                // displayname = params.name;
                document.querySelector('#username').innerText = params.name; //this will set the display name to the name of the user
                // currentRoom = params.room;
                document.querySelector('#roomName').innerText = params.room; //this will set the room name to the name of the room
            }
        }); 
    }); // do something when you have connected to the server

    const screenHeight = document.querySelector('#message-form').scrollHeight;
    socket.on('updateUserList', function (users) {
        console.log('updateUserList: ', users); //this will log the users to the console when the updateUserList event is emitted from the server
        let ol = document.createElement('ol');
        ol.classList.add('user-list'); //this will add a class to the ol element
        users.forEach(function(user) {
            let li = document.createElement('li');
            li.innerText = user;
            li.style.color = getRandomHarmonyColor(); //this will set the color of the user name to a random color
            li.classList.add('user-list-item'); //this will add a class to the user
            ol.appendChild(li);
        });
        let userList = document.querySelector('#users');
        userList.innerHTML = ''; //this will clear the user list before adding new users
        userList.appendChild(ol);
    })

    socket.on('newMessage' , function (message){
        
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

    socket.emit('createMessage', {
        text: document.getElementById('message-input').value,
        createdAt: new Date().getTime()
    });
    document.getElementById('message-input').value = ''; //this will clear the input field after the message is sent
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
    document.querySelector('#exitBtn').addEventListener('click', function(e){
        e.preventDefault();
        socket.disconnect(); //this will disconnect the user from the server
        window.location.href = '/'; //this will redirect the user to the home page
    });
});