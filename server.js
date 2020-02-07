const express = require('express');
const fetch = require('node-fetch');
const app = express();
const f = require("./server/server-functions")
const funcs = f.func;
const one_hour = 3600000;
const half_hour = 1800000;

// Use express to create a websocket tunnel
const http = require('http').Server(app); //create a tcp or IPC server
const io = require('socket.io')(http); // use net framework socket.io

// Set view engine to ejs
app.set('view engine', 'ejs');

//Define root folders to css, js, images and other static files
app.use('*/css',express.static('static/css'));
app.use('*/js',express.static('static/js'));
app.use('*/images',express.static('static/images'))

// Fetch when server starts - first time fetch
fetch('https://infoboard.mediehuset.net/api/')
  .then(response => response.json())
  .then(data => {
    funcs.saveData(data);
    console.log("Fetching data and starting services..");
  });

// Re-fetch from API every half hour and save the data.
setInterval(() => {  
  fetch('https://infoboard.mediehuset.net/api/')
  .then(response => response.json())
  .then(data => {
    funcs.saveData(data);
    console.log("Re-fetching new data..");
  });
}, half_hour);

// When the server receives a get on '/' root it renders index.ejs
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Mediehuset Infoboard',
  });
});

// Start server on port 3000
const server = http.listen(3000, function () {
  console.log('Server started - listening on *:3000');
})

// On establishing connection
io.sockets.on('connection', function (socket) {

  console.log("Client connected on socket#: " + socket.id);

  // start and update interval that emits the updated content every 500ms
  setInterval(() => {
    socket.emit('update', funcs.content, funcs.news)
  }, 1000);

    // start and update interval of videos every 1 hour
  setInterval(() => {
    socket.emit('videoupdate', funcs.media)
  }, one_hour);

  // Emit video content on first start
  socket.emit('videoupdate', funcs.media)

})

setInterval(() => {
  funcs.update();
}, 1000);