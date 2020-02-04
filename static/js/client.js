// Initialize socket io and start connection to server
let socket = io('http://localhost:3000');
let classContainer = document.getElementById('class-container');
let rooms = document.getElementsByClassName('st1');

// Initialize all needed variables
let newsContainer = document.getElementById('news');
let newsArray = [];
let videoArray = [];
let increment = 0;
let switcher = 0;
var ytSwitcher = 0;



// When client receives an 'update' from the server
socket.on('update', function(content, news) {
    
    // Activity
    classContainer.innerHTML = "";
    //console.log(topfloor);
    resetColors(rooms);
    //resetColors(bottomfloor);
    content.forEach(function(con) {

        let class_room = con.classroom.toLowerCase();
        let drawnroom = document.getElementById(`${class_room}`);
        drawnroom.style.fill = getColor(con.class);


        let el = document.createElement('div');
        el.classList.add('grid-item');
        el.innerHTML = `${con.id} <br> ${con.name} <br>${con.classroom} <br> ${con.class}<br> ${convertTime(con.stamp)}`
        classContainer.append(el);
    }); 

    // News
    newsArray.length = 0;
    news.forEach(function(thenews){
        let el = document.createElement('div');
        el.setAttribute('id',`news${thenews.id}`);
        el.innerHTML = `<div class="news-item"><h2>${thenews.title}</h2><p>${thenews.content}</p><p>${thenews.date_start}</p></div>`
        newsArray.push(el);
    })


    // Every 10 seconds add 1 to int increment
    // if increment is 10, then add one to switcher
    // if switcher is higher then or equal to newsArrays.length then reset it
    if (increment >= 10){
        switcher += 1;
        increment = 0;
        if (switcher >= newsArray.length){
            switcher = 0;
        }
    }

    newsContainer.innerHTML = newsArray[switcher].innerHTML;
})


setInterval(() => {
    increment +=1
}, 1000);

socket.on('videoupdate', function(media) {

// Video Updates
   videoArray.length = 0;
    media.forEach(function(med){

        if (!med.reference == ""){
            ref = `${med.reference}`
            videoArray.push(ref);
        }
    })
})



function resetColors(el){

        for(var x = 0; x < el.length; x++) {
            el[x].style.fill = '#ffffff'; 
        }; 
}


function getColor(c){

    let str = c;
    let substr = str.substring(0, 4);

    switch(substr){

        case 'agr0': // Ofremstilling ??
            return '#94b144';
        
        case 'dgm0': // Digital media
            return '#dd5050'

        case 'ggr0': // Grafisk tekniker
            return '#ca4a50'
    
        case 'gmg0': // Medie grafiker
            return '#90368b'

        case 'gwe0': // Web grundforløb
            return '#4b6d9e'
            
        case 'h1we': // Web hovedforløb
            return '#567ebe'

        case 'h0gr': // Prod storf prin ??
            return '#94b144'

        case 'h1mg': // Engelsk
            return '#94b144'
    }
}



// Client side function to convert the timestamp into something readable
function convertTime(time, minus = 0){
    var date = new Date(time * 1000);
    var hours = date.getHours() - minus;
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formatted = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2); 
    return formatted;
}

//Youtube API player From this example: 
//https://stackoverflow.com/questions/7853904/how-to-detect-when-a-youtube-video-finishes-playing

var player;

// Check if videArray is not empty
setTimeout(() => {
    // create youtube player
        player = new YT.Player('player', {
          width: '22vw',
          height: '31vh',
          videoId: videoArray[ytSwitcher],
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {    
        ytSwitcher += 1;
            if (ytSwitcher >= videoArray.length){
                ytSwitcher = 0;
            }      
            player.loadVideoById(videoId = videoArray[ytSwitcher])
        }
    }

}, 500);