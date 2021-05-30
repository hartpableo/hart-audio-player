// auto-update year
const year = document.querySelector('.year');
year.innerHTML = new Date().getFullYear();

// script for music/audio player
const title = document.querySelector('.musicTitle');
const image = document.querySelector('#musicImg');
const audio = document.querySelector('.audio');
const musicContainer = document.querySelector('.musicContainer');

const songs = [
    'Calvin Harris',
    'Know Myself',
    'Muriel',
    'Road Tripzzz',
    'Stayin\' Lazy'
];

// initial item of songs array
let currentItem = 4;

// display initial item
displaySong(songs[currentItem]);

// function: display the song details
function displaySong(song) {
    title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    image.src = `imgs/${song}.jpg`;
};

// buttons
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playBtn = document.querySelector('.play');

playBtn.addEventListener('click',function() {
    const playing = musicContainer.classList.contains('play');

    if (playing) {
        pauseSong();
    } else {
        playSong();
    };
});

// functions: pause and play
function pauseSong() {
    musicContainer.classList.remove('play');
};

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('.fa-play').style.display = 'none';
    playBtn.querySelector('.fa-pause').style.display = 'block';

    audio.play();
};

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fa-play').style.display = 'block';
    playBtn.querySelector('.fa-pause').style.display = 'none';

    audio.pause();
};

// next and previous 
prevBtn.addEventListener('click',prevSong);

function prevSong() {
    currentItem--;

    if (currentItem < 0) {
        currentItem = songs.length - 1;
    };

    displaySong(songs[currentItem]);
    playSong();
};

nextBtn.addEventListener('click',nextSong);

function nextSong() {
    currentItem++;

    if (currentItem > songs.length - 1) {
        currentItem = 0;
    };

    displaySong(songs[currentItem]);
    playSong();
};

// playing song progress bar
const progressBar = document.querySelector('.progressBar');

audio.addEventListener('timeupdate',updateProgress)

function updateProgress(e) {
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
};

// navigate the song progress bar
const progressContainer = document.querySelector('.progressContainer');

progressContainer.addEventListener('click',clickProgress);

function clickProgress(e) {
    const width = this.clientWidth;
    const click = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (click / width) * duration;
};

//  auto-play to next song when current song has ended
audio.addEventListener('ended',nextSong);