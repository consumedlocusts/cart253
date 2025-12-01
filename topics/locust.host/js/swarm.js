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
//for wave tests
//let yFreq = 0.003;

//
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

//from particle source
const swarmParticles = [];
const step = 4; // increase this later
const pointSize = 4;
const smoothstep = (edge0, edge1, x) => {
  x = constrain((x - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x); //open process sketch math
};
let sentence =
  "Like the dawn overspreading the mountains a great and strong army appears,";
let sentenceParticles = [];
let sentenceFormed = false; //tracks if text is fully formed by particles
let hoverActive = false;
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
    drawNewWave();
    //swarmParticleHost();
  } else if (swarmState === 4) {
    //
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
} //idk

//SECOND, get ready to use sin() and more lerp().
//lerp means linear interpolation!! insert/snap a this to a that by way of animation. lerp (start, end, speed amount). without lerp, the object would snap instantly to the final position
//sin() returns vals that smoothly oscillate between -1 & 1, like a smooth turning wheel... one of those maths
function setupSwarmParticleHost() {
  swarmTextParticles = []; //per particle, differs from text,
  //when i say bob i mean jitter
  //lerping the text/letters to the frequenecy of the audio begins
  let xOffset = 300; //this to assign bobbing, make sine wave for each letter so VVV
  let yOffset = 300; // its where the bob centers, starts, how the letters wiggle diffirently:animation noise
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
  drawNewWave();
}
function drawNewWave() {
  background(0);
  //wil be clouds later, is just a rectangular form for now
  let spectrum = fft.analyze();
  let xStep = spectrum;
  let xFreq = 0.003; //not tailored to the sound frequency as using both freq/step twice crashes system
  let yFreq = 0.005;
  let amplitude = 200; //how much its affected
  let velocity = 0.03; //updownupdwon
  let waveCount = 10; //not working, wanted more waves
  let yStep = height / waveCount;
  for (let y = 0; y <= height; y += yStep) {
    push();
    translate(0, y);
    //creating gradient folder type sheild
    let gradient = drawingContext.createLinearGradient(
      0,
      height / 2,
      width,
      height / 2
    );
    gradient.addColorStop(0, "#000000ff"); //p5 gradient effect
    gradient.addColorStop(1, "#2d2d2dff");
    drawingContext.fillStyle = gradient;
    //let noiseNo = noise(y * spectrum, frameCount * velocity) * amplitude;
    //vertex(y, noiseNo);

    beginShape();
    for (let x = 0; x <= width; x += xStep) {
      let newNoise =
        noise(x * xFreq, y * yFreq, frameCount * velocity) * amplitude;
      //vertex(x, height / -4 + newNoise);
      vertex(x, newNoise); //remove this soon
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE); //from noise tutorial, shapes
    pop();
  }
  swarmParticleHost();
}
function swarmParticleHost() {
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
  //drawNewWave();
}
//using open processing code VVV
function setupLocustTest() {
  console.log("state 4 running");
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const p = new SwarmParticle(
        x + random(-4, 4),
        y + random(-4, 4),
        pointSize
      );
      swarmParticles.push(p);
    }
  }
}
//this is mine tailored to this, reverses the partical dispersal effect and instead sttracts them to lerp into a sentance
function setupSentenceParticles() {
  sentenceParticles = [];
  let pg = createGraphics(width, height);
  pg.pixelDensity(1);
  pg.background(0);
  pg.fill(255);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(48); //basic particle graphics hidden stuff to wrap
  //another evil bounding box to spend half the day adjusting
  let boxW = width * 0.2;
  let boxH = height * 0.5;
  //the text
  pg.text(sentence, width / 2, height / 2, boxW, boxH);
  pg.loadPixels();
  //brightness targeted poinnt pixel
  let targetPs = [];
  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      let idx = (x + y * width) * 4;
      let bright = pg.pixels[idx]; //idx
      if (bright > 128) {
        //fun to change
        targetPs.push({ x, y }); //same thing again and again and again and again and
      }
    }
  }
  //assign these brightness pixel targets to the upcoming random particles
  let count = min(swarmParticles.length, targetPs.length);
  //new p5 discovery of less ugly patterns using random
  shuffle(targetPs, true); //simple "true"
  //push the swarm pparticles now
  for (let i = 0; i < count; i++) {
    let t = targetPs[i];
    let p = swarmParticles[i];
    p.tx = t.x;
    p.ty = t.y;
    sentenceParticles.push(p);
  }
  //console.log("???eijudkquwde");
}
function drawLocustTest() {
  //this has been a test this whole time btw
  background(255);
  swarmParticles.forEach((swarmParticle) => {
    swarmParticle.update();
    swarmParticle.show(pointSize);
  });
}
//first use of class, provided by the source code
class SwarmParticle {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
    this.tx = undefined; //text loctaions
    this.ty = undefined;
  }
  // update horrendously
  update() {
    let px = this.pos;
    let mouseVec = createVector(mouseX, mouseY); //idk where to put this vector
    //move the text towards da mouse
    if (!sentanceFormed && this.tx !== undefined && this.ty !== undefined) {
      let pTarg = createVector(this.tx, this.ty); //HELP ME i dont under stand
      let d = px.dist(pTarg);
      if (d < 2) {
        px.x = this.tx; //this automaticcaly wrote itself check to change later
        px.y = this.ty; //ok i get it
      } else if (d > 200) {
        let snap = createVector(this.tx, -px.x, this.ty, -px.y);
        snap.setMag(15); //"magnitude" or force of particle dispersing, some p5 thing
        px.add(snap); //move vector by adding MORE vector like "go some more over here" if pos=(100,200) and snap=(10,-5), then the updated pos =(110,195)
      }
      //pull particles to mouse if its that far away quickklly
    } else {
      px.lerp(this.tx, this.ty, 0.21);
    } //below 1

    //after my sentacne done it should go back to wild particles
    if (sentenceFormed && this.tx !== undefined) {
      let d = dist(px.x, px, y, mouseVec);
      let repelForce = map(d, 0, 120, 6, 0, true); //
    }
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
    //drawNewWave();
  }
}
function swarmMousePressed() {
  song.pause();
  state = "menu";
  audioStarted = false;
  menuSetup();
}
