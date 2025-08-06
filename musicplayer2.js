const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playlistEl = document.getElementById('playlist');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const fileUpload = document.getElementById('file-upload');

let playlist = [
   { title: "Song 1-Dil hi to hai", artist: "Arijit Singh", src: "Dil Hi Toh Hai.mp3"},
  { title: "Song 2-Humnava - Maa",  artist: "Arijit Singh",src: "Humnava - Maa.mp3"},
  { title: "Song 3-Jaane Tu",  artist: "Arijit Singh",src: "Jaane Tu - Chhaava.mp3"},
  { title: "Song 4-Khairiyat", artist: "Arijit Singh", src: "Khairiyat - Chhichhore.mp3"},
  { title: "Song 5-Pal Pal Dil Ke Paas", artist: "Arijit Singh", src: "Pal Pal Dil Ke Paas.mp3"},
  { title: "Song 6-Rudra", artist: "Arijit Singh", src: "Rudra - Chhaava.mp3"},
  { title: "Song 7-Shayad", artist: "Arijit Singh", src: "Shayad.mp3"},
  { title: "Song 8-Tera Fitoor", artist: "Arijit Singh", src: "Tera Fitoor - Genius.mp3"},
  { title: "Song 9-Thodi Jagah", artist: "Arijit Singh", src: "Thodi Jagah - Marjaavaan.mp3"},
  { title: "Song 10-Tu Hi Yaar Mera", artist: "Arijit Singh", src: "Tu Hi Yaar Mera.mp3"},
  { title: "Song 11-Tujhe Kitna", artist: "Arijit Singh", src: "Tujhe Kitna Chahne Lage.mp3"},
  { title: "Song 12-Tum Ho", artist: "Arijit Singh", src: "Tum Ho.mp3"},
  { title: "Song 13-Zamaana Lage", artist: "Arijit Singh", src: "Zamaana Lage.mp3"},
  { title: "Song 14-Zindagi", artist: "Arijit Singh", src: "Zindagi.mp3"},
  { title: "Song 15-Haqeeqat", artist: "Arijit Singh", src: "Haqeeqat Akhil Sachdeva 128 Kbps.mp3"},
];

let songIndex = 0;
let isShuffle = false;
let repeatMode = 'off'; // 'off', 'one', 'all'

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
}

function playPauseSong() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

function prevSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * playlist.length);
  } else {
    songIndex = (songIndex - 1 + playlist.length) % playlist.length;
  }
  loadSong(songIndex);
  audio.play();
}

function nextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * playlist.length);
  } else {
    songIndex = (songIndex + 1) % playlist.length;
  }
  loadSong(songIndex);
  audio.play();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
}

function setProgress() {
  audio.currentTime = (progress.value / 100) * audio.duration;
}

function setVolume() {
  audio.volume = volume.value;
}

function handleEnded() {
  if (repeatMode === 'one') {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === 'all') {
    nextSong();
  } else {
    if (songIndex < playlist.length - 1) {
      nextSong();
    } else {
      playBtn.textContent = '▶️';
    }
  }
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.textContent = isShuffle ? '🔀 Shuffle: On' : '🔀 Shuffle: Off';
}

function toggleRepeat() {
  if (repeatMode === 'off') {
    repeatMode = 'one';
    repeatBtn.textContent = '🔁 Repeat: One';
  } else if (repeatMode === 'one') {
    repeatMode = 'all';
    repeatBtn.textContent = '🔁 Repeat: All';
  } else {
    repeatMode = 'off';
    repeatBtn.textContent = '🔁 Repeat: Off';
  }
}

function handleFileUpload(event) {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    const title = file.name;
    const newSong = { title: title, artist: 'Unknown', src: url };
    playlist.push(newSong);
  });
  populatePlaylist();
}

function populatePlaylist() {
  playlistEl.innerHTML = '';
  playlist.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(songIndex);
      audio.play();
    });
    playlistEl.appendChild(li);
  });
}

playBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);
audio.addEventListener('ended', handleEnded);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
fileUpload.addEventListener('change', handleFileUpload);

loadSong(songIndex);
populatePlaylist();

// additional animation
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') 
    ? '☀️ Light Mode' 
    : '🌙 Dark Mode';
});
