/**
 * locust.host
 * sama hojabri
 *
 * storyline 3 set up for the locust storlines
 */
"use strict";
//let endString1 = "They were allowed to torment them, but not to kill them";
let endState = 0;
let endOpenerTimer = 0;
let endOpenerShow = 0;
let endOpenerSpeedFactor = 3; // types 3 characters at a time
let endOpenerStarted = false;
let endOpenerText = "Here at the edge of this world";
let endSentence = " if this grand panorama before me is what you call God...";
let contText = "...Then God is not dead";
let progress2 = "mousePress to exit";
//globalls for the chaos equations
const DT = 0.002;
const r = 20;
const dots = 5000; //too many, no more than 10K
//paramses to random
const P = 3;
const O = 2.7;
const Q = 1.7;
const C = 2;
const E = 9;
let particleChaos = [];
let dLines = false; //like 0=points, false = pts, true =lines like 1=lines
let cStroke = true; //strokeweight changes w depth to add .. depth
let project = "xz"; //any of them really

function endSetup() {}
function endDraw() {
  background(0);
  //  song22.rate(0.2);

  if (endState === 0) {
    // endDrawString1();
    setupEndString();
  } else if (endState === 1) {
    //spectrum = fft.analyze();
  } else if (endState === 2) {
    endAtmosphereDrawChaos();
  } else if (endState === 3) {
    continueLater();
  } else if (endState === 4) {
    enough2();
  }
}

function setupEndString() {
  background("#a9000073");
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  endOpenerShow = floor(endOpenerTimer / endOpenerSpeedFactor);
  endOpenerShow = min(endOpenerShow, endOpenerText.length);
  text(endOpenerText.substring(0, endOpenerShow), width / 2, height / 2);

  if (endOpenerShow < endOpenerText.length) {
    endOpenerTimer++;
  }
}

function endDrawString1() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(endOpenerText, width / 2, height / 2);
}

function endAtmosphereChaos() {
  //source code CHAOS equations
  //what is going on : millions of particles in a fake 3d space, projected into as 2d pts using XY,Xz,Yz etc.
  //depending on the outcome, dots or lines or both (most common)
  //dots;num of partics dt;smoothening motion r;scale of clouds p,o,q,c,e;params for systme, l;line0=points,1=lines s;strokeweight mode?,per;projection plane (ie xy)
  //nx[], ny[], nz[]; derivatives (results), x[], y[], z[]; current pos, px[], py[], pz[]; prev frame pos.
  //gonna try a class
  //new class particle incomng, want to try seeds
  for (let i = 0; i < dots; i++) {
    let x = random(-10, 10);
    let y = random(-10, 10);
    let z = random(-10, 10);
    particles.push(new AtmosParticle(x, y, z));
  }
}

function endAtmosphereDrawChaos() {
  fill(0, 20);
  noStroke();

  for (let p of particles) {
    p.update();
    p.draw();
  }
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(endSentence, width / 2, height - 100);
}

class AtmosParticle {
  //love contructors
  constructor(x, y, z, colors) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.prevX = x;
    this.prevY = y;
    this.prevZ = z;

    this.colors = colors;
  }

  update() {
    //storage for previous thingies
    this.prevX = this.x;
    this.prevY = this.y;
    this.prevZ = this.z;
    //what i learnt from bad youtube ex: dx, dy, dz mean he direction + speed to move along the x/y/z axis this frame
    const dx = this.y - P * this.x + O * this.y * this.z;
    const dy = Q * this.y - this.x * this.z + this.z;
    const dz = C * this.x * this.y - E * this.z;
    //always mult by the DT
    this.x += dx * DT;
    this.y += dy * DT;
    this.z += dz * DT;
  }
  draw() {
    stroke(255);
    //points are mapped likewise of the constructors directions, creats that infininity look
    let px, py;
    if (project === "xy") {
      px = map(this.x, -r, r, 0, width);
      py = map(this.y, -r, r, height, 0);
    } else if (project === "xz") {
      px = map(this.x, -r, r, 0, width);
      py = map(this.z, -r, r, height, 0);
    } else {
      //return to yz
      px = map(this.y, -r, r, 0, width);
      py = map(this.z, -r, r, height, 0);
    }
    //this is accordig to the codes og math how the radius of the strokeweight as poits are determined to add depth to the loop appearnce(create a fake 3d enviroment by assigning z)
    if (cStroke === 1) {
      if (project === "xy") {
        strokeWeight(map(this.z, -r / 3, r / 3, 2, 3)); //swoop
      } else if (project === "xz") {
        strokeWeight(map(this.y, -r / 3, r / 3, 3, 2));
      } else {
        strokeWeight(map(this.x, -r / 3, r / 3, 2, 3));
      }
    } else {
      strokeWeight(1);
    }
    point(px, py);
  }
  //point(px, py);
}
//ranout of time but I think this is a good way to end it for now
function continueLater() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(contText, width / 2, height / 2);
}
function enough2() {
  background("#a9000073");

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(progress2, 400, 400);
}
function endPressed() {
  if (endState === 0 && endOpenerShow >= endOpenerText.length) {
    endState = 1;
    endOpenerTimer = 0;
  }
  if (endState === 1) {
    endState = 2;
    endAtmosphereChaos();
  } else if (endState === 2) {
    endState = 3;
  } else if (endState === 3) {
    endState = 4;
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(progress2, 400, 400);
  }
}
function endTouched() {
  endPressed();
  return false;
}
function endMousePressed() {
  if (endState === 4) {
    //song.pause();
    state = "menu";
    //audioStarted = false;
    menuSetup();
  }
}
