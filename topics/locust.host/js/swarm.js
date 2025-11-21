/**
 * locust.host
 * sama hojabri
 * 
 * storyline 2 set up for the locust storlines
 */

let fft; //from a youtube video, fft audio to animation of spectrums thing
function swarmSetup() {
  song.play();
  fft = new p5.FFT();
 }


function swarmDraw() {
 userStartAudio();
  background(0);
song.rate(0.2);
  let spectrum = fft.analyze();

  noStroke();
  fill(0, 200, 255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height - h, width / spectrum.length, h);
  }

  fill("#9e1d1dff");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("yyyy", width/2, height/2);
}

function swarmMousePressed() {
  state = "menu";
  menuSetup();
}