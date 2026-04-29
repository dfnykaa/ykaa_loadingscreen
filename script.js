const images = [
    "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg",
    "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg"
];

const songs = [
    { title: "Did i First", artist: "Ice Spice", src: "audio/song2.mp3" },
    { title: "Sigue", artist: "Morad", src: "audio/song1.mp3" },
];

const serverTips = [
    "Welcome to the server! Please read the rules before joining!",
    "You can find the rules on our Discord!",
    "It is your responsibility to know and follow our rules.",
    "Respect other players and the Admin Team!",
    "Enjoy the game and create your own story!",
    "We wish you a lot of fun and quality RP!",
    "Do you have an idea for an improvement? Write to us in a ticket.",
    "You can use the /report command to report any issues!"
];

let currentImg = 0;
let currentSong = 0;
let currentTip = 0;
let isManuallyPaused = false;
const audio = new Audio();
audio.volume = 0.5;

document.body.style.cursor = "none";

function startMusic() {
    if (isManuallyPaused) return; 

    if (audio.paused) {
        if (!audio.src) {
            audio.src = songs[currentSong].src;
            document.getElementById('song-name').innerText = songs[currentSong].title;
            document.getElementById('artist-name').innerText = songs[currentSong].artist;
        }
        audio.play().catch((error) => {
            console.log("Autoplay was blocked by the browser:", error);
        });
    }
}

document.getElementById('bg').style.backgroundImage = `url(${images[0]})`;

setInterval(() => {
    const tipElement = document.querySelector('.welcome-pill');
    if (tipElement) {
        tipElement.style.opacity = 0;
        setTimeout(() => {
            currentTip = (currentTip + 1) % serverTips.length;
            document.getElementById('changing-tip').innerText = serverTips[currentTip];
            tipElement.style.opacity = 1;
        }, 500);
    }
}, 5000);

setInterval(() => {
    currentImg = (currentImg + 1) % images.length;
    document.getElementById('bg').style.backgroundImage = `url(${images[currentImg]})`;
}, 6000);

window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
        isManuallyPaused = false;
        currentSong = (currentSong + 1) % songs.length;
        updateSongInfo();
    } else if (e.code === "ArrowLeft") {
        isManuallyPaused = false;
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        updateSongInfo();
    } else if (e.code === "Space") {
        e.preventDefault(); 
        e.stopPropagation();

        if (audio.paused) {
            isManuallyPaused = false;
            audio.play();
        } else {
            isManuallyPaused = true;
            audio.pause();
        }
    }
});

function updateSongInfo() {
    audio.src = songs[currentSong].src;
    document.getElementById('song-name').innerText = songs[currentSong].title;
    document.getElementById('artist-name').innerText = songs[currentSong].artist;
    audio.play();
}

window.addEventListener('message', (e) => {
    if (e.data.eventName === 'loadProgress') {
        let progress = Math.floor(e.data.loadFraction * 100);
        const bar = document.getElementById('progress-bar');
        const val = document.getElementById('progress-val');
        
        if (bar) bar.style.width = progress + "%";
        if (val) val.innerText = progress + "%";
        
        startMusic();
    }
});

window.addEventListener('mousemove', () => {
    startMusic();
}, { once: true });