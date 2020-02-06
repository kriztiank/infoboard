// Initialize socket io and start connection to server
let socket = io('http://localhost:3000');
let classContainer = document.getElementById('items');
let rooms = document.getElementsByClassName('st1');

// Initialize all needed variables
let newsContainer = document.getElementById('news');
let newsArray = [];
let videoArray = [];
let increment = 0;
let switcher = 0;
var ytSwitcher = 0;
let clock = document.getElementById('clock');


// When client receives an 'update' from the server
socket.on('update', function(content, news) {
    // Activity
    classContainer.innerHTML = "";
    content.forEach(function(con) {

  /*       let class_room = con.classroom.toLowerCase();
        let drawnroom = document.getElementById(`${class_room}`);
        drawnroom.style.fill = getColor(con.class);
 */

        let el = document.createElement('div');
        let elH = document.createElement('div');
        el.classList.add('grid-item');
       // el.setAttribute('id', getId(con.class));
        elH.classList.add('top-grid-item');
        elH.style.backgroundColor = getColor(con.class);
        let firstLetter = con.name.substring(0, 1).toUpperCase();
        let remainLetter = con.name.substring(1,100);
        elH.innerHTML = `<h3> ${firstLetter+remainLetter}</h3> `
        el.append(elH);
        el.innerHTML += `<p>Kl: ${convertTime(con.stamp)}</p><p>Hold: ${con.class}</p><p> Lokale: ${con.classroom}</p>`
        classContainer.append(el);
    }); 

    // News
    newsArray.length = 0;
    news.forEach(function(thenews){
        let el = document.createElement('div');
        el.setAttribute('id',`news${thenews.id}`);
        el.innerHTML = `<div class="news-item"><h2>${thenews.title}</h2><p>${cutText(thenews.content)}</p></p></div>`
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
    getClock();
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

function getClock(){
    var date = new Date;
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    clock.textContent = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2); 
}

function getId(el){

    str = el;
    if (!(str.includes('dm') || str.includes('gr') || str.includes('mg') || str.includes('we'))){
        str = "other";
    }
    return str.substring(1,3);

}

function cutText(text){
    if (text.length > 351){
        ctxt = text.substr(0, 350);
        ctxt += "...";
        return ctxt;
    }
    else{
        return text;
    }
}

function resetColors(el){
        for(var x = 0; x < el.length; x++) {
            el[x].style.fill = '#ffffff'; 
        }; 
}

function getColor(c){

    let str = c;

    if (str.toLowerCase().includes('dm')){
        color =  '#94b144';
        return color;
    }

    if (str.toLowerCase().includes('gr')){
        color =  '#567ebe';
        return color;
    }

    if (str.toLowerCase().includes('mg')){
        color =  '#a43380';
        return color;
    }

    if (str.toLowerCase().includes('we')){
        color =  '#dd5050';
        return color;
    }

    else{
        color = '#F3E052';
        return color;
    }
}



// Client side function to convert the timestamp into something readable
function convertTime(time, minus = 0){
    var date = new Date(time * 1000);
    var hours = date.getHours() - minus;
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formatted = hours + ":" + minutes.substr(-2); 
    return formatted;
}


//Youtube API player From this example: 
//https://stackoverflow.com/questions/7853904/how-to-detect-when-a-youtube-video-finishes-playing

var player;

setTimeout(() => {
    // create youtube player
        player = new YT.Player('player', {
          width: '29vw',
          height: '35vh',
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