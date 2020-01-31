// Initialize socket io and start connection to server
var socket = io('http://localhost:3000');
var container = document.getElementById('container');

// When client receives an 'update' from the server
socket.on('update', function(content) {
    container.innerHTML = "";
    content.forEach(function(con) {
        let el = document.createElement('div');
        el.innerHTML = `<div class="grid-item">${con.id} <br> ${con.name} <br>${con.classroom} <br> ${con.class}<br> ${convertTime(con.stamp)}</div>`
        container.append(el);
    }); 
})

// Client side function to convert the timestamp into something readable
function convertTime(time, minus = 0){
    var date = new Date(time * 1000);
    var hours = date.getHours() - minus;
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formatted = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2); 
    return formatted;
    }