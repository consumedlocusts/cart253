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

let swarmParticleHostText =
  "a day of darkness and gloom, a day of clouds and blackness";
//let swarmParticleWords = [];
//let swarmParticleWordsStart = false;

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
  } else if (swarmState === 2) {
    spectrum = fft.analyze();
    swarmSpectrum();
  } else if (swarmState === 3) {
    spectrum = fft.analyze();
    swarmParticleHost();
  }
  //}
}
function openSwarm() {
  fill("#ffffffff");
  textSize(32);
  textAlign(CENTER, CENTER);
  //text like typewriter h e l l o ... h . e . l . l . o etc. (used in many of my codes)
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

//SECOND, get ready to use sin() and more lerp().
//lerp means linear interpolation!! insert/snap a this to a that by way of animation. lerp (start, end, speed amount). without lerp, the object would snap instantly to the final position
//sin() returns vals that smoothly oscillate between -1 & 1, like a smooth turning wheel... one of those maths
function setupSwarmParticleHost() {
  swarmTextParticles = []; //per particle, differs from text,
  //when i say bob i mean jitter
  //lerping the text/letters to the frequenecy of the audio begins
  let xOffset = 400; //this to assign bobbing, make sine wave for each letter so VVV
  let yOffset = 400; // its where the bob centers, starts, how the letters wiggle diffirently:animation noise
  let spacing = 21; //
  let lineHeight = 40; //verticle spacig betwn lines
  let maxWidth = width - 50; //right margin of text paragraph stylr
  let currentX = xOffset; //where on screen (width/height) 2 draw the ACTUAL then NEXT letter:spatial VVV
  let currentY = yOffset; //this changes with each letter's current offset because although the offset is set
  //offset (doesnt change,its assigned to the audio, but appears random)

  for (let i = 0; i < swarmParticleHostText.length; i++) {
    let char = swarmParticleHostText[i];
    if (currentX > maxWidth) {
      //the xposition stays the same BUT the y of particles bob with the freq using line height
      currentX = xOffset;
      currentY += lineHeight;
    }
    swarmTextParticles.push({
      char: char,
      x: currentX,
      y: currentY,
      baseY: currentY, //base of letter height
      offset: random(1000),
    });
    currentX += spacing;
  }
}
function swarmParticleHost() {
  background(0);
  //frequency now assigning appearing
  let spectrum = fft.analyze();
  noStroke();
  fill(255);
  textSize(32);
  for (let i = 0; i < swarmTextParticles.length; i++) {
    let p = swarmTextParticles[i];
    let freqIndex = floor(
      map(i, 0, swarmTextParticles.length, 0, spectrum.length)
    );
    let energy = spectrum[freqIndex]; //fruitful energized object to spectrum jitters
    let lift = map(energy, 0, 255, 0, -120); //map the it and allow for motion
    let jitter = map(energy, 0, 255, 0, 6);
    p.y = lerp(p.y, p.baseY + lift, 0.15);
    let xJitter = sin(frameCount * 0.1 + p.offset) * jitter;
    text(p.char, p.x + xJitter, p.y); //text drawn accordingly
  }
}
function swarmPressed() {
  if (swarmState === 0 && swarmOpenerShow >= swarmOpenerText.length) {
    swarmState = 1;
    swarmOpenerTimer = 0;
  }
  if (swarmState === 1) {
    swarmState = 2;
  } else if (swarmState === 2) {
    swarmState = 3;
    setupSwarmParticleHost();
  }
}
function swarmMousePressed() {
  song.pause();
  state = "menu";
  audioStarted = false;
  menuSetup();
}
