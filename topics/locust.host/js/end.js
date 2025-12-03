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
let endOpenerText = "They were allowed to torment them, but not to kill them";
//globalls for the chaos equations
const DT = 0.002;

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
    //swarmSwarm();
  } // else if (endState === 2) {

  //} else if (endState === 3) {

  //  } else if (endState === 4) {

  //}
}
function setupEndString() {
  background("#9f0000ff");
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
}

function endAtmosphereDrawChaos() {
  //breh
}
class AttractorParticle {
  constructor(x, y, z, hue) {
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
  draw() {}
}

function endPressed() {
  if (endState === 0 && endOpenerShow >= endOpenerText.length) {
    endState = 1;
    endOpenerTimer = 0;
  }

  if (endState === 1) {
    endState = 2;
  } //else if (endState === 2) {
  //endState = 3;
  //}
}
function endMousePressed() {
  state = "menu";
  menuSetup();
}
