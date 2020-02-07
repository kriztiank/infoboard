// Initialize socket io and start connection to server
let socket = io('http://localhost:3000');
let classContainer = document.getElementById('items');

// Initialize all needed variables
let newsContainer = document.getElementById('news');
let newsArray = [];
let videoArray = [];
let increment = 0;
let switcher = 0;
var ytSwitcher = 0;
let clock = document.getElementById('clock');

let images = ["images/icons/group.png", "images/icons/meatroom.png", "images/icons/time.png"]

// When client receives an 'update' from the server
socket.on('update', function (content, news) {

    // Update Activity by looping though each content package and create a new element
    classContainer.innerHTML = "";

    content.forEach(function (con) {

        let el = document.createElement('div');
        let elH = document.createElement('div');
        el.classList.add('grid-item');
        elH.classList.add('top-grid-item');
        elH.style.backgroundColor = getColor(con.class);
        let firstLetter = con.name.substring(0, 1).toUpperCase();
        let remainLetter = con.name.substring(1);
        elH.innerHTML = `<h3> ${firstLetter+remainLetter}</h3> `
        el.append(elH);
        el.innerHTML +=
            `<div><img class="icon" src=${images[2]}><p>${convertTime(con.stamp)}</p></div>
             <div><img class="icon" src=${images[0]}><p>${con.class}</p></div>
             <div><img class="icon" src=${images[1]}><p>${con.classroom}</p></div>`
        classContainer.append(el);
    });

    // News array gets updated and filled with current news
    newsArray.length = 0;
    news.forEach(function (thenews) {
        let el = document.createElement('div');
        el.setAttribute('id', `news${thenews.id}`);
        el.innerHTML = `<article class="news-item"><h2>${thenews.title}</h2><div>${cutText(thenews.content)}</div></article>`
        newsArray.push(el);
    })

    // Every 10 seconds add 1 to int increment
    // if increment is 10, then add one to switcher
    // if switcher is higher then or equal to newsArrays.length then reset it
    if (increment >= 10) {
        switcher += 1;
        increment = 0;
        if (switcher >= newsArray.length) {
            switcher = 0;
        }
    }
    // Set newscontainers inner html to whatever index the switcher is at.
    newsContainer.innerHTML = newsArray[switcher].innerHTML;
})

// Local update loop that gets the time and increases the counter every 1 second
setInterval(() => {
    increment += 1
    getClock();
}, 1000);

// Video Updates - updates videoArray with new references
socket.on('videoupdate', function (media) {
    videoArray.length = 0;
    media.forEach(function (med) {

        if (!med.reference == "") {
            ref = `${med.reference}`
            videoArray.push(ref);
        }
    })
})

// Function to return a the time in the format "00:00:00". 
function getClock() {
    var date = new Date;
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    clock.textContent = hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}

// Function to cut text if it is above 350 characters, in order to avoid text overflow
function cutText(text) {
    if (text.length > 350) {
        let ctxt = text.substr(0, 350);
        ctxt += "...";
        return ctxt;
    } else {
        return text;
    }
}

// Function to get colors for cards. Takes a string as variable c -
// and looks for the corrosponding coarse name, which it in turn returns the right color for.
function getColor(c) {

    let str = c;

    if (str.toLowerCase().includes('dm')) {
        color = '#94b144';
        return color;
    }
    if (str.toLowerCase().includes('gr')) {
        color = '#567ebe';
        return color;
    }
    if (str.toLowerCase().includes('mg')) {
        color = '#a43380';
        return color;
    }
    if (str.toLowerCase().includes('we')) {
        color = '#dd5050';
        return color;
    } else {
        color = '#F3E052';
        return color;
    }
}

// Function to convert the timestamp into something readable
function convertTime(time, minus = 0) {
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

// Set a small timeout to make sure the array is loaded. Then create new yt player.
setTimeout(() => {
   
    player = new YT.Player('player', {
        width: '29vw',
        height: '35vh',
        videoId: videoArray[ytSwitcher],
        playerVars: {
            'controls': 0,
            'modestbranding': 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });

    // autoplay video
    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {
        state = player.getPlayerState()
        //console.log(state);

        // TO DO
        // If state remains -1 for more then 5 seconds - destroy.player and insert default image, 
        // then check for videoArray to fill again before creating a new yt player

        if (event.data === 0) {
            ytSwitcher += 1;

            if (ytSwitcher >= videoArray.length) {
                ytSwitcher = 0;
            }
            player.loadVideoById(videoId = videoArray[ytSwitcher])
        }
    }

}, 1000);