/**
 * locust.host
 * sama hojabri
 *
 * storyline 2 set up for the locust storlines
 */

let fft; //from a youtube video, fft audio to animation of spectrums thing
let audioStarted = false;
let swarmState = 0;
let swarmOpenerTimer = 0;
let swarmOpenerShow = 0;
let swarmOpenerSpeedFactor = 3; //types 3 characters at a time, sourced from a code
let swarmOpenerStarted = false;
let swarmOpenerText = "Then from the smoke came locusts on the earth,";

let openWords = [];
let openWordsStart = false;
//help

let swarmSpectrumText = "and they were given power like scorpions of the earth";
let spectrumWords = [];
let spectrumWordsStart = false;

function swarmSetup() {
  if (!audioStarted) {
    song.play();
    fft = new p5.FFT();
    audioStarted = true;
  }
}

function swarmDraw() {
  // audioStarted();
  background(0);
  song.rate(0.2);

  if (swarmState === 0) {
    openSwarm();
  } else if (swarmState === 1) {
    spectrum = fft.analyze();
    //swarmSwarm();
    swarmSpectrum();
  } //else if (swarmState === 2) {
  //spectrum = fft.analyze();
  //();
  //} else if (swarmState === 3) {
  //spectrum = fft.analyze();
  //lastDraw();
  // }
  //}
}
function openSwarm() {
  fill("#ffffffff");
  textSize(32);
  textAlign(CENTER, CENTER);

  swarmOpenerShow = floor(swarmOpenerTimer / swarmOpenerSpeedFactor);
  swarmOpenerShow = min(swarmOpenerShow, swarmOpenerText.length);
  text(swarmOpenerText.substring(0, swarmOpenerShow), width / 2, height / 2);
  if (swarmOpenerShow < swarmOpenerText.length) {
    swarmOpenerTimer++;
  }
}

function swarmSpectrum() {
  let spectrum = fft.analyze();
  noStroke();
  fill(0, 200, 255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height - h, width / spectrum.length, h);
  }

  fill("#774949ff");
  textSize(32);
  textAlign(CENTER, CENTER);
  text(swarmSpectrumText, width / 2, height / 2);
}

function swarmPressed() {
  if (swarmState === 0 && swarmOpenerShow >= swarmOpenerText.length) {
    swarmState = 1;
    swarmOpenerTimer = 0;
  }
  if (swarmState === 1) {
    //swarmState = 2;
    swarmSpectrum();
  } else if (swarmState === 3) {
    //}
  }
}
function swarmMousePressed() {
  song.pause();
  state = "menu";
  audioStarted = false;
  menuSetup();
}
