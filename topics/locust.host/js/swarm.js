/**
 * locust.host
 * sama hojabri
 *
 * storyline 2 set up for the locust storlines
 */

let fft; //from a youtube video, fft audio to animation of spectrums thing
let audioStarted = false;
let swarmState = 0;
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
    // swarmOpening();
  } else if (swarmState === 1) {
    spectrum = fft.analyze();
    //swarmSwarm();
    swarmOpening();
  } //else if (swarmState === 2) {
  //spectrum = fft.analyze();
  //();
  //} else if (swarmState === 3) {
  //spectrum = fft.analyze();
  //lastDraw();
  // }
  //}
}
function swarmOpening() {
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
  text("yyyy", width / 2, height / 2);
}

function keyPressed() {
  if (swarmState === 0) {
    swarmState = 1;
    //swarmOpening();
  }
  if (swarmState === 1) {
    //swarmState = 2;
    swarmOpening();
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
