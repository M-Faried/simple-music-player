const musicContainer = document.getElementById('music-container');

const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song titles
const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 2;

// Initially loading ukulele song.
loadSong(songs[songIndex]);

btnPlay.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
btnNext.addEventListener('click', nextSong);
btnPrev.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);

////////////////////////////////////////////////// Helper functions
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');

  btnPlayIcon = btnPlay.querySelector('i');
  btnPlayIcon.classList.remove('fa-play');
  btnPlayIcon.classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');

  btnPlayIcon = btnPlay.querySelector('i');
  btnPlayIcon.classList.remove('fa-pause');
  btnPlayIcon.classList.add('fa-play');

  audio.pause();
}

function nextSong() {
  if (songIndex === songs.length - 1) songIndex = 0;
  else songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  if (songIndex === 0) songIndex = songs.length - 1;
  else songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
