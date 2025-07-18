let play = document.getElementById("play");
let audio = document.getElementById("audio");
let img = document.getElementById("img");
let trackName = document.getElementById("trackName");
let next = document.getElementById("next");
let previous = document.getElementById("prev");
let volumeUp = document.getElementById("volume-up");
let volumeDown = document.getElementById("volume-down");
let duration = document.getElementById("duration");
let currentTime = document.getElementById("current-time");
let progress = document.getElementById("progress");

let audios = [
  "Challa gali.mp3",
  "Next Enti.mp3"

];

let images = [
  " https://m.media-amazon.com/images/M/MV5BM2NmYzRjYTItNWUwMC00MjMyLThhYzgtMWE4ODBmOGUzOGZjXkEyXkFqcGc@._V1_.jpg ",
  " https://i.pinimg.com/736x/38/2f/02/382f02fd7be73d7ddc7a8d38febbd8a4.jpg "
];

let trackNames = [
  "Challa gali",
  "Next Enti"

];

let currentIndex = 0;
audio.src = audios[currentIndex];
img.src = images[currentIndex];
trackName.textContent = trackNames[currentIndex];

audio.addEventListener("loadedmetadata", function() {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function() {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.currentTime;
  if (audio.duration) {
    progress.max = audio.duration;
  }
});

progress.addEventListener("input", function(event) {
  audio.currentTime = progress.value;
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  sec = (sec < 10 ? '0' + sec : sec);
  return `${min}:${sec}`;
}

next.addEventListener("click", function() {
  currentIndex++;
  if (currentIndex >= audios.length) {
    currentIndex = 0;
  }
  audio.src = audios[currentIndex];
  img.src = images[currentIndex];
  trackName.textContent = trackNames[currentIndex];
  audio.play();
  play.textContent = "⏸";
});

prev.addEventListener("click", function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = audios.length - 1;
  }
  audio.src = audios[currentIndex];
  img.src = images[currentIndex];
  trackName.textContent = trackNames[currentIndex];
  audio.play();
   play.textContent = "⏸";
});

volumeUp.addEventListener("click", function() {
  if (audio.volume < 1) {
    audio.volume += 0.1;
  }
  if (audio.volume > 1) {
    audio.volume = 1;
  }
});

volumeDown.addEventListener("click", function() {
  if (audio.volume > 0) {
    audio.volume -= 0.1;
  }
  if (audio.volume < 0) {
    audio.volume = 0;
  }
});

play.addEventListener("click", function(event) {
  if (audio.paused) {
    play.textContent = "⏸";
    audio.play();
    img.classList.add("rotate");
  } else {
    audio.pause();
    play.textContent = "▶";
    img.classList.remove("rotate");
  }
});

audio.addEventListener("ended", function() {
  next.click();
});
