const audioContext = new window.AudioContext();
const audioElement = document.querySelector("audio");

const gainNode = audioContext.createGain();

const volumeControl = document.querySelector("#volume");
volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
  }, false
);

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

const pannerControl = document.querySelector("#panner");
pannerControl.addEventListener(
  "input",
  () => {
    panner.pan.value = pannerControl.value;
  }, false
);

const track = audioContext.createMediaElementSource(audioElement);
track.connect(gainNode).connect(panner).connect(audioContext.destination);

const playButton = document.querySelector("button");

playButton.addEventListener(
  "click",
  () => {
    if (audioContext.state === "suspended") audioContext.resume();

    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }
  }, false
);

audioElement.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false"
  }
);
