const express = require('express');
const fetch = require('node-fetch');
const app = express();
const f = require("./server/server-functions")
const funcs = f.func;

// Use express to create a websocket tunnel
const http = require('http').Server(app); //create a tcp or IPC server
const io = require('socket.io')(http); // use net framework socket.io

// Set view engine to ejs
app.set('view engine', 'ejs');

//Definerer root mappe til css referencer m.m.
app.use(express.static(__dirname + '/'));

// Fetch when server starts
fetch('https://infoboard.mediehuset.net/api/')
  .then(response => response.json())
  .then(data => {
    funcs.saveData(data);
    console.log("Fetching data and starting service");
  });

// Re-fetch from API every 1 hour and save the data.
setInterval(() => {  
  fetch('https://infoboard.mediehuset.net/api/')
  .then(response => response.json())
  .then(data => {
    funcs.saveData(data);
    console.log("Re-fetching and clearing memory");
  });
}, 3600000);

setInterval(() => {
  funcs.update();

}, 1000);


// When the server receives a get on / root it renders index.ejs
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Mediehuset Infoboard',
  });
});

// Start server on port 3000
const server = http.listen(3000, function () {
  console.log('listening on *:3000');
})

// On establishing connection
io.sockets.on('connection', function (socket) {

  console.log(socket.id);

  // start and update interval that emits the updated content every 500ms
  setInterval(() => {
    socket.emit('update', funcs.content, funcs.news)
  }, 500);

    // start and update interval of videos every 1 hour
  setInterval(() => {
    socket.emit('videoupdate', funcs.media)
  }, 3600000);

  // Emit video content on start
  socket.emit('videoupdate', funcs.media)

})