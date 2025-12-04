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
const step = 4; // reduce this later
const pointSize = 4;
const smoothstep = (edge0, edge1, x) => {
  x = constrain((x - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x); //open process sketch math
};
let sentence =
  "like the dawn overspreading the mountains a great and strong army appears,";
//let sentenceParticles = [];
let sentenceFormed = false; //tracks if text is fully formed by particles, im keeping it because it bugs in the class without sentanceFormed and im too behind to fix this
let hovering = false;
let mountainImg;

let locustTargets = [];
let imageParticles = [];
let state5Sentence =
  "such as never was of old, nor will ever be in ages to come.";
let swarmTextParticles = [];
let sentenceParticles = [];
let locustImg2;
let virus = [];

let locusteats2;
let locustChewingTextTimer2 = 0;
let locustChewingTextShow2 = 3;
let locustChewingTextSpeed2 = 3; //types 3 characters at a time, sourced from a code
let locustChewingTextStarted2 = false; //for testbolean,not ready
let locustChewingText2 =
  "What the swarming locust left, the crawling locust has eaten";
let progress = "mousePress to exit";
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
    spectrum = fft.analyze();
    drawLocustTest();
  } else if (swarmState === 5) {
    spectrum = fft.analyze();
    myHeadHurts();
  } else if (swarmState === 6) {
    spectrum = fft.analyze();
    locusteatsCloser2();
    locustEatsGrid2();
  } else if (swarmState === 7) {
    spectrum = fft.analyze();
    enough();
  }
  //}
}
function openSwarm() {
  fill("#ffffffff");
  textSize(20);
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

  fill("#e3e2e2ff");
  textSize(22);
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
  //let spectrum = fft.analyze();
  let xStep = 10;
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
    let xStep = 10;
    for (let x = 0; x <= width; x += xStep) {
      let newNoise =
        noise(x * xFreq, y * yFreq, frameCount * velocity) * amplitude;
      vertex(x, newNoise);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE); //from noise tutorial, shapes
    pop();
  }
  swarmParticleHost();
}
//text for state 3 STATE THREE
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
    let energy = spectrum[freqIndex]; //fruitful energized object to spectrum jitters, mapped to the frequency of song (spectrum freqIndx)
    let lift = map(energy, 0, 255, 0, -120); //map the it and allow for motion
    let jitter = map(energy, 0, 255, 0, 6); //use of energy everywhere that requires showing the music bobbing effct
    p.y = lerp(p.y, p.baseY + lift, 0.15);
    let xJitter = sin(frameCount * 0.1 + p.offset) * jitter;
    text(p.char, p.x + xJitter, p.y); //text drawn accordingly
  }
  //drawNewWave();
}
//using open processing code VVV state 4
function setupLocustTest() {
  //see the refrence code for further explaination
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
  pg.textAlign(LEFT, BOTTOM);
  pg.textSize(48); //basic particle graphics hidden stuff to wrap
  //another evil bounding box to spend half the day adjusting
  let boxW = width * 0.5;
  let boxH = height * 0.4;
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
function imageTargetParticles() {
  if (!mountainImg) return;
  //new addition; sync the particles to image brightness
  //"mg" mountain graphics r u fr
  let mg = createGraphics(width, height);
  mg.pixelDensity(1); //dude
  mg.background(255);
  mg.image(mountainImg, 0, 0, width, height); //ofe canvas and its og size
  mg.loadPixels();
  let imageTps = []; //image targetted as particle path
  for (let x = 0; x < width; x += 4) {
    //same old indexes
    for (let y = 0; y < height; y += 4) {
      let idx = (x + y * width) * 4;
      let r = mg.pixels[idx];
      if (r < 128) imageTps.push({ x, y });
    }
  }
  //shuffle again but for image pixels, exact same as above
  shuffle(imageTps, true);
  //instead appply this appearenace of pixely movements as a "filter"

  let freeParticles = swarmParticles.filter((p) => p.tx === undefined); //particle filter effect for image
  let freeCount = min(freeParticles.length, imageTps.length); //allow free virus floaters to correspond to and with image when not active
  for (let i = 0; i < freeCount; i++) {
    let t = imageTps[i];
    let p = freeParticles[i];
    p.tx = t.x;
    p.ty = t.y;
    //the end
  }
}
function hoverSwarmParticles() {
  //too much happening return to original simple
  let mouseV = createVector(mouseX, mouseY); //it all ties together, thid vector represents the current position of the cursor on the screen
  let center = createVector(width / 2, height / 2); //exact middle of SKETCH canvas not pg canvas
  let d = center.dist(mouseV); //calculates euclidean distance(pythagorean theorem)between distance of center of canvas and mouseVec position to then
  hovering = d < width / 2; //important: checks if the calculated distance d is less than half the canvas width, for smooth integration and also IF ITS NOT something cool happens #bolean
}
function drawLocustTest() {
  //this has been a test this whole time btw
  hoverSwarmParticles();
  background(255);
  swarmParticles.forEach((swarmParticle) => {
    swarmParticle.update(); //BIG AWESOME CLASS (can be used again ! and again...)
    swarmParticle.show();
  });
  noStroke();
  fill(0); //nevermind i dont want the particles to form text too tired
  textAlign(CENTER, CENTER);
  textSize(22);
  text(sentence, 0, height - 80, width, 80); //keep this form? is it readable at this level??
}
////////////////////
////seperating ti avoid confusion and refer back to this
/////////////
/////////////////////
//first use of class, provided by the source code Particleses classss
class SwarmParticle {
  constructor(x, y, size) {
    this.pos = createVector(x, y); //active update
    this.size = size; //i wonder
    this.tx = undefined; //text loctaions
    this.ty = undefined;
  }
  // update horrendously
  update() {
    let mouseVec = createVector(mouseX, mouseY); //stop useless commenting bruh
    let posVec = this.pos;
    //I CANT SPELL SENTANCE

    if (
      hovering &&
      !sentenceFormed &&
      this.tx !== undefined &&
      this.ty !== undefined
    ) {
      let pTarg = createVector(this.tx, this.ty);
      let d = posVec.dist(pTarg);
      if (d < 2) {
        posVec.set(pTarg); //real snap to particless if closeclose
        //px.x = this.tx; //this automaticcaly wrote itself check to change later
        //px.y = this.ty; //ok i get it
      } else if (d > 80) {
        let snap = p5.Vector.sub(pTarg, posVec).setMag(10);
        //snap.setMag(15); //"magnitude" or force of particle dispersing
        posVec.add(snap); //move vector by adding MORE vector like "go some more over here" if pos=(100,200) and snap=(10,-5), then the updated pos =(110,195): thus a smooth stepping effect
      }
      //pull particles to mouse if its that far away quickly
      else {
        posVec.lerp(pTarg, 0.2);
      }
      //noo repel from mouse
    } else if (
      sentenceFormed &&
      this.tx !== undefined &&
      this.ty !== undefined
    ) {
      //scattered comments
      let d = posVec.dist(mouseVec); //NORMALIZE: This scales that difference vector down so it has a length (magnitude) of exactly 1. This gives you only the direction of the "snap"
      let snap = p5.Vector.sub(posVec, mouseVec).normalize(); //researhced SUB: this NEW VECTOR** is created by SUBtracting the mouse VECcoordinates from the objectVECcoordinates:
      //result vector points from the mouse towards the objectVVVV
      let f = 5 * smoothstep(120, 0, d); //smoothste p calculates the force (f) of the attraction, smoothly allowing force increase of distance 120 the max value is caoped at 5*the smoothstepping result
      //creates the snapping, ATTRACTION EFFECT;between posVec or position vector and mosue vector:the strength of the attraction dependent on the distance between them(BY SUBIng)
      posVec.add(snap.mult(f)); //soruce code's main function to multiply and drive particles away from mouse butVV
      //^^^ addsthis force (f) vector to the object's current position vector updating its location to move it toward the mouse
    } else {
      //this is drifting behavior (noise)
      //allow the rest of the particles not attached to the text in the meantime drift in nice mathy patterns:smooth randomized but organically geometrical..
      let loose =
        noise(posVec.x * 0.01, posVec.y * 0.01, frameCount * 0.001) *
        TWO_PI *
        2;
      //sin...cos for varied patterns and what can be returned from whole
      posVec.x += cos(loose) * 1.5; //UPDATOR ANGLES:the cosine of the angle is giving the horizontal direction/magnitude (change in Xof "loose" partilces) and speed of 1.5
      posVec.y += sin(loose) * 1.5; //sine is this ^^ but verticle
    } //change numbers around so the entire thing doesnt explode
    //this is my best way to describe use of PI and noise etc:VVV
    //*twoPi *2 calculates random but geometrical angles using perlin noise, the output of the noise is scaled to 0-4Pi (360 around a cricle)to get the full rng of directional value (hense floaters)
    //
    if (hovering && !sentenceFormed && sentenceParticles.length > 0) {
      let done = true;
      for (let p of sentenceParticles) {
        if (dist(p.pos.x, p.pos.y, p.tx, p.ty) > 1) {
          done = false;
          break; //redit
        }
      }
      if (done) sentenceFormed = true; //again 95% of this is from source code and p5js
    }
  }
  show() {
    stroke(0);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y); //pts position is all of this code
  }
  ////////////////////
  ////seperating ti avoid confusion and refer back to this
  /////////////
  /////////////////////
  ////////////hi
}
//state 5 is almost identical in construction to the 4th state but dif image + some little squares in the backgroudn
function setupState5() {
  //swarmParticles.length = 0;
  //clear the mountain oartcicals or it wont WORK
  for (let p of swarmParticles) {
    p.tx = undefined;
    p.ty = undefined;
  }
  sentenceFormed = false;
  hovering = false;
  locustTargets = [];
  imageParticles = [];
  sentenceParticles = [];
  virus = [];
  //i dont want to break anything so im just gonna make a seperate cloud of particles (called floaters..I SHOULDVE NAMED THEM VIRUS)
  //named them virus..
  for (let i = 0; i < 600; i++) {
    //chnage 150 later for density
    virus.push({
      x: random(width),
      y: random(height),
      offset: random(1000),
      size: random(0.5, 5),
    });
  }
  //new swarm particle from class!!!!!!!!
  swarmParticles.length = 0;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      swarmParticles.push(
        new SwarmParticle(x + random(-4, 4), y + random(-4, 4), pointSize)
      );
    }
  }
  targetLocustImg();
  buildState5SentenceParticles();
  mapParticlesToImage();
}
function targetLocustImg() {
  //console.log("pls");
  if (!locustImg2) return;
  //just renamed all the stuff above tto match thus one if needed
  let pg = createGraphics(width, height);
  pg.pixelDensity(1);
  pg.background(0);
  pg.image(locustImg2, 0, 0, width, height);
  pg.loadPixels();

  locustTargets = [];
  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      let idx = (x + y * width) * 4;
      let brightness = pg.pixels[idx];
      if (brightness < 120) {
        locustTargets.push({ x, y });
      }
    }
  } //shufflin
  shuffle(locustTargets, true);
  let freeLocParticles = swarmParticles.filter((p) => p.tx === undefined);
  let libreCount = min(freeLocParticles.length, locustTargets.length);
  for (let i = 0; i < libreCount; i++) {
    let t = locustTargets[i];
    let p = freeLocParticles[i];
    p.tx = t.x;
    p.ty = t.y;
    //the end
  }
}

//overlay
function mapParticlesToImage() {
  //simplified vers of the other one gonna tweak later
  let count = min(swarmParticles.length, locustTargets.length);
  // let mouseV = createVector(mouseX, mouseY); **//it all ties together, thid vector represents the current position of the cursor on the screen
  // let center = createVector(width / 2, height / 2); **//exact middle of SKETCH canvas not pg canvas
  // let d = center.dist(mouseV); **//calculates euclidean distance(pythagorean theorem)between distance of center of canvas and mouseVec position to then
  // hovering = d < width / 2;
  for (let i = 0; i < count; i++) {
    swarmParticles[i].tx = locustTargets[i].x;
    swarmParticles[i].ty = locustTargets[i].y;
  }
}

function buildState5SentenceParticles() {
  // overlay text after image-forming particles
  let pg = createGraphics(width, height);
  pg.pixelDensity(1);
  pg.background(0);
  pg.fill(255);
  pg.textAlign(LEFT, TOP);
  pg.textSize(40);

  let boxW = width * 0.7;
  let boxH = height * 0.4;

  pg.text(
    state5Sentence,
    width / 2 - boxW / 2,
    height / 2 - boxH / 2,
    boxW,
    boxH
  );
  pg.loadPixels();

  let targets = []; //eberytime u see a 4 in these contexts is either RGBA related or pixel
  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      let idx = (x + y * width) * 4;
      if (pg.pixels[idx] > 150) {
        targets.push({ x, y });
      }
    }
  }
  shuffle(targets, true);
  //ok filter goes here afte for the free particles
  let count = min(swarmParticles.length, targets.length);
  for (let i = 0; i < count; i++) {
    let t = targets[i];
    imageParticles.push({
      p: swarmParticles[i],
      tx: t.x,
      ty: t.y,
    });
  }
}
function myHeadHurts() {
  //uh
  // for (let i = 0; i < 5; i++) {
  //   console.log(i, swarmParticles[i].pos.x, swarmParticles[i].tx);
  // }
  //show the pic
  //interesting fact use the class again
  //MORE floaters (sorry i dont have a better name lmaoo)

  hovering = true;
  background("brown");
  noStroke();
  fill("#e5ce00ff");
  for (let f of virus) {
    let n = noise(f.x * 0.01, f.y * 0.01, frameCount * 0.001) * TWO_PI * 2;
    //sin...cos for varied patterns and what can be returned from whole
    f.x += cos(n) * 1.5; //UPDATOR ANGLES:the cosine of the angle is giving the horizontal direction/magnitude (change in Xof "loose" partilces) and speed of 1.5
    f.y += sin(n) * 1.5;
    //might make the speeed align to music ^^
    //wrap around screen, could i constrain instead .. i havent used const more than like once...
    if (f.x < 0) f.x = width;
    if (f.x > width) f.x = 0;
    if (f.y < 0) f.y = height;
    if (f.y > height) f.y = 0;
    ellipse(f.x, f.y, f.size);
  }
  swarmParticles.forEach((p) => {
    p.update();
    p.show();
  });

  //yay text
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(state5Sentence, width / 2, height - 100);
}

//topics/locust.host/js/wormwood.js
function locustEating2() {
  background(0);

  locusteats2.loop();

  image(locusteats2, 0, 0, width, height);
  textSize(19);
  fill("#000000ff");
  textAlign(LEFT, BOTTOM);
  text(locustChewingText2, 99, 100);
  carW = 3;
  carH = 3;
  rizon = floor(width / carW);
  ticle = floor(height / carH);
  //locustEatsGrid();
}
function locusteatsCloser2() {
  //console.log("m");
  //based on a seperate code of mine that made a video player with "typewriter" animated text appearing
  //i am using the type writer effect
  //locustEating();
  locustChewingTextShow2 = floor(
    locustChewingTextTimer2 / locustChewingTextSpeed2
  );
  locustChewingTextShow2 = min(
    locustChewingTextShow2,
    locustChewingText2.length
  );
  text(
    locustChewingText2.substring(0, locustChewingTextShow2),
    width / 2,
    height / 2
  );
  if (locustChewingTextShow2 < locustChewingText2.length) {
    locustChewingTextTimer2++;
  }
}
//i had to sorry
function locustEatsGrid2() {
  locustEating2();
  locusteats2.loadPixels();
  linelineGrid = [];
  let step = 3;
  //renamed all this in google docs cuz nah
  //let step = 3;

  for (let v = 0; v < ticle; v += step) {
    for (let h = 0; h < rizon; h += step) {
      let idx = (v * locusteats2.width + h) * 4;
      let r = locusteats2.pixels[idx];
      let g = locusteats2.pixels[idx + 1];
      let b = locusteats2.pixels[idx + 2];

      let brightness = (r + g + b) / 3; //i want to add alpha channel anf try something else soon
      //let inv = 255 - brightness; //might change this to normal ...

      linelineGrid.push({
        x: map(h, 0, locusteats2.width, 0, width), //mapp h, min 0, to new vid wid,0 smallest on canvas, outted asheight
        y: map(v, 0, locusteats2.height, 0, height),
        thickness: map(brightness, 0, 255, 7, 0.05),
        //inv: inv,
        revealed: false,
      });
    }
  }

  for (let cell of linelineGrid) {
    cell.revealed = true;
    stroke("#ffffffa9");
    strokeWeight(cell.thickness);
    line(cell.x, cell.y, cell.x + carW * 0.8, cell.y);
  }
}
function enough() {
  background("#a9000073");

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(progress, 400, 400);
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
  } else if (swarmState === 3) {
    swarmState = 4;
    setupLocustTest();
    setupSentenceParticles();
    imageTargetParticles();
    //drawNewWave();
  } else if (swarmState === 4) {
    swarmState = 5;
    setupState5();
    //buildState5SentenceParticles();
    //targetLocustImg();
  } else if (swarmState === 5) {
    swarmState = 6;
    locustChewingTextTimer2 = 0;
    //locusteats2.loop();
    //locusteats2.hide();
  } else if (swarmState === 6) {
    swarmState = 7;
    textAlign(CENTER, CENTER);
    textSize(22);
    text(progress, 400, 400);
  }
}
function swarmMousePressed() {
  if (swarmState === 7) {
    song.pause();
    state = "menu";
    audioStarted = false;
    menuSetup();
  }
}
