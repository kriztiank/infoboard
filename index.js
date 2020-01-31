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

// Fetch from API and save the data.
fetch('https://infoboard.mediehuset.net/api/')
  .then(response => response.json())
  .then(data => {
    funcs.saveData(data);
  });

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

  // start and update interval that emits the updated content every 500ms
  setInterval(() => {
    socket.emit('update', funcs.content)
  }, 500);
})