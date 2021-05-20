const player = document.querySelector('.player');
const video = player.querySelector('video');
const controls = player.querySelector('.player__controls');
const toggle = controls.querySelector('.toggle');
const progress = controls.querySelector('.progress');
const progressBar = controls.querySelector('.progress__filled');
const volume = controls.querySelector('input[name="volume"]');
const playbackRate = controls.querySelector('input[name="playbackRate"]');
const skipButtons = controls.querySelectorAll('[data-skip]');

let isPlaying = false;
const toggleVideo = () => {
  if (isPlaying) {
    video.pause();
    toggle.textContent = "►";
    isPlaying = false;
  } else {
    video.play();
    toggle.textContent = "❚ ❚";
    isPlaying = true;
  }
}

const scrub = (e) => {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  updateProgess();
}

const updateProgess = () => {
  progressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}

const handleVolume = () => {
  video.volume = volume.value;
}

const handlePlaybackRate = () => {
  video.playbackRate = playbackRate.value;
}

const skip = (e) => {
  video.currentTime += parseFloat(e.currentTarget.dataset['skip']);
}

toggle.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);
video.addEventListener('timeupdate', updateProgess);

let isMouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e));

volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handlePlaybackRate);
skipButtons.forEach(button => button.addEventListener('click', skip));