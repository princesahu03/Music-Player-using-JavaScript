const songs = [
    {
        title: "Song One",
        artist: "Artist A",
        src: "songs/song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist B",
        src: "songs/song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist C",
        src: "songs/song3.mp3"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");


// Load Song
function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

loadSong(currentSong);


// Play / Pause
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}


// Next Song
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}


// Previous Song
function prevSong() {
    currentSong =
        (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}


// Progress Bar Update
audio.addEventListener("timeupdate", () => {
    progress.value =
        (audio.currentTime / audio.duration) * 100;
});


// Seek Song
progress.addEventListener("input", () => {
    audio.currentTime =
        (progress.value / 100) * audio.duration;
});


// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});


// Autoplay Next
audio.addEventListener("ended", nextSong);


// Playlist Create
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = () => {
        currentSong = index;
        loadSong(currentSong);
        audio.play();
    };
    playlist.appendChild(li);
});