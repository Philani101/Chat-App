const path = require("path");
const express = require("express");

//this is the path to the public folder(will help to serve static files)
const publicPath = path.join(__dirname, "../public");
var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); //this will serve the static files in the public folder
app.listen(port, () => {
    console.log("Server is up on port 3000"); //this will log the message to the console when the server is started
}); //this will start the server on port 3000