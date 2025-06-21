# Real-Time Chat Application

A real-time chat application built with Node.js, Express, and Socket.io that allows users to join chat rooms and communicate instantly with other users.

## Features

- **Real-time messaging** - Instant message delivery using WebSocket connections
- **Chat rooms** - Users can join specific chat rooms to communicate with others
- **User management** - Display active users in each chat room
- **Location sharing** - Share your current location with other users in the room
- **Message timestamps** - All messages include formatted timestamps
- **Responsive design** - Dynamic color theming with harmony-based color selection
- **Auto-scroll functionality** - Smart scrolling with scroll-to-bottom indicator
- **Input validation** - Ensures valid usernames and room names

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Socket.io
  - HTTP module

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Socket.io Client
  - Mustache.js (templating)
  - Moment.js (date formatting)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Philani101/Chat-App.git
   cd Chat-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Required dependencies:
   ```bash
   npm install express socket.io moment mustache
   ```

## Usage

1. Start the server:
   ```bash
   node server.js
   ```
   OR
1. ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Enter your name and desired chat room to join the conversation

## Project Structure

```
├── server.js              # Main server file
├── public/
│   ├── chat.js            # Client-side JavaScript
│   ├── index.html         # Homepage
│   ├── chat.html          # Chat room interface
│   └── css/
│       └── styles.css     # Styling
└── utils/
    ├── message.js         # Message generation utilities
    ├── isRealString.js    # String validation
    └── users.js           # User management class
```

## API Events

### Client to Server Events

- `connected` - Initial connection with user parameters
- `join` - Join a specific chat room
- `createMessage` - Send a text message
- `createLocationMessage` - Share location coordinates
- `disconnect` - Leave the chat room

### Server to Client Events

- `newMessage` - Receive new text messages
- `newLocationMessage` - Receive location sharing messages
- `updateUserList` - Update the list of active users in the room

## Features Overview

### Chat Rooms
Users can join different chat rooms by specifying a room name. Each room maintains its own user list and message history for the session.

### Location Sharing
Users can share their current location using the browser's geolocation API. The location is displayed as a clickable link to Google Maps.

### User Management
The application tracks users in each room and updates the user list in real-time when users join or leave.

### Message Formatting
All messages include:
- Sender's name
- Message content
- Formatted timestamp
- Color-coded user names

### Dynamic Theming
The application uses a harmony-based color system that generates complementary, triadic, or split-complementary colors for a visually appealing interface.

## Environment Variables

- `PORT` - Server port (defaults to 3000)

## Browser Support

- Modern browsers with WebSocket support
- Geolocation API support required for location sharing
- ES6+ JavaScript features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Acknowledgments

- Socket.io for real-time communication
- Moment.js for date formatting
- Mustache.js for templating

## Key Learning Outcomes

### **Technical Skills**

- **Real-time communication** with WebSockets (Socket.io)
- **Full-stack development** using Node.js and Express
- **Event-driven programming** and asynchronous JavaScript
- **Client-server architecture** and API design
- **DOM manipulation** and browser APIs (geolocation)

### **Software Engineering Concepts**

- **Modular code organization** and separation of concerns
- **State management** across client and server
- **Input validation** and basic error handling
- **Template rendering** and dynamic UI updates
- **Session management** and user tracking

### **Problem-Solving Skills**

- Building interactive, multi-user applications
- Managing concurrent connections and room-based communication
- Implementing real-time features like live user lists
- Handling network events (connect/disconnect scenarios)
- Creating responsive user interfaces

### **Development Workflow**

- **Project structure** planning and file organization
- **Debugging** network communication and real-time events
- **Testing** real-time functionality across multiple clients
- **Frontend-backend integration** and data flow management

This project provided me with hands-on experience with modern web development fundamentals while introducing concepts essential for building scalable, interactive applications.
---
