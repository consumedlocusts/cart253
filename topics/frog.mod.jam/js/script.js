/**
 * Frogfrogfrog
 * Pippin Barr
 *
 * A game of catching flies with your frog-tongue
 *
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";
let state = "start";
let handImg, alienImg, bossImg, beerImg;
let useImages = false;
//the hand/gun set up (which is the same object)
//everything is drawn with images

//scopes from another code (listed in the read.me)
let scope = { size: 200 };
let foundTarget = false;

let player = {
  x: 320,
  y: 420, //player viewpoint lower on screen for POV style
};

//the small aliens/minions
let aliens = [];
let ALIEN_COUNT = 6;
let alienSpeed = 1.2; //slowed
let specialTarget = null; //special alien to scan for during the scan state
//laser shot settings (single shot per click)
let laser = null;
let canShoot = true;

//boom/hit effect
let booms = [];

//kill counter to spawn boss
let killsToSpawnBoss = 8;
let killCount = 0;
let boss = null;
let bossHealthMax = 30;
// boss's"goop" projectiles
let goops = [];
let playerHealth = 15; // health bar in boss fight
let maxGoopHits = 15; // lose after this many hits
let introVideo; //edited video for the start of game

function playSound(name) {
  // the soundeffect for the shooting etc.
}
function preload() {
  //sprite images as the characters (hand/gun, minion aliens, boss etc.)
  // handImg = loadImage(assets/hand.png);
  // alienImg = loadImage(assets/alien.png);
  // bossImg = loadImage(assets/boss.png);
  //landscape = loadImage (assets/landscape.png)
  // if (handImg && alienImg) useImages = true;
}
/**
 * Creates the canvas and plays game start video
 */
function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  setupAliens();
  resetBoss();
}

//create initial aliens (randomized positions)
function setupAliens() {
  aliens = [];
  for (let counter = 0; counter < ALIEN_COUNT; counter++) {
    aliens.push({
      x: random(40, width - 40),
      y: random(100, 260),
      size: 18,
      velocity: random([-1, 1]) * alienSpeed,
      alive: true,
    });
  }
}
function draw() {
  background("#0b0f1a");
  drawPlanetLandscape();
  //the alien planet landscape appears after the player starts the game
  if (state === "start") {
    drawStartScreen();
  } else if (state === "scan") {
    drawHiddenScene();
    drawScanMask();
    checkScanFind();
  } else if (state === "play") {
    drawPlayScene();
  } else if (state === "boss") {
    drawBossScene();
  } else if (state === "win") {
    drawWinScreen();
  } else if (state === "gameover") {
    drawGameOverScreen();
  }

  drawPlayerHand();
  //scope scanner, scanning
  if (state !== "start") {
    drawScopeCursor();
  }
}

function drawPlanetLandscape() {
  push();
  //the landscape is an edited image
  pop();
}
function drawStartScreen() {
  background(0);
  image(introVideo, 0, 0);
}

function scopeMask() {
  //the "mask" is the scope from my other code, use it to hover over the alien to begin the game
  push();
  fill(0, 220);
  rect(0, 0, width, height);

  // use erase to create scope hole instead of layering many shapes
  erase();
  ellipse(mouseX, mouseY, scope.size);
  noErase();

  // raw scope crosshair ring thing
  strokeWeight(3);
  stroke(255, 180);
  noFill();
  ellipse(mouseX, mouseY, scope.size);
  pop();
}

function drawHiddenScene() {
  //as part of the first scene steps, an alien is hidden under the dark mask;
  //find the alien to actually start the game
  for (let a of aliens) {
    if (a.alive) {
      drawAlien(a); //alien "a" is the special alien target only in this scene
    }
  }
}
// during the scan state initialize a special target alien, scan for this alien
function startScan() {
  setupAliens();
  spawnSpecialTarget();
  state = "scan";
}
function spawnSpecialTarget() {
  specialTarget = {
    //again using image as the base
    x: random(80, width - 80),
    y: random(120, 300),
    size: 36,
    revealed: false,
  };
}

function checkScanFind() {
  if (!specialTarget) return;
  push();
  //the special alien target is drawn here because the user has to scan for it to find it

  pop();

  let d = dist(mouseX, mouseY, specialTarget.x, specialTarget.y);
  if (d <= scope.size / 2) {
    specialTarget.revealed = true;
    startPlayMode(specialTarget.x, specialTarget.y);
  }
}
