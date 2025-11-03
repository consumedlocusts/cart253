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

function playSound(name) {
  // the soundeffect for the shooting etc.
}
function preload() {
  //sprite images as the characters (hand/gun, minion aliens, boss etc.)
  // handImg = loadImage('assets/hand.png');
  // alienImg = loadImage('assets/alien.png');
  // bossImg = loadImage('assets/boss.png');
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
  push();
  //edited video of the game beginning, a short story tale
  pop();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
  frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
  // Tongue matches the frog's x
  frog.tongue.x = frog.body.x;
  // If the tongue is idle, it doesn't do anything
  if (frog.tongue.state === "idle") {
    // Do nothing
  }
  // If the tongue is outbound, it moves up
  else if (frog.tongue.state === "outbound") {
    frog.tongue.y += -frog.tongue.speed;
    // The tongue bounces back if it hits the top
    if (frog.tongue.y <= 0) {
      frog.tongue.state = "inbound";
    }
  }
  // If the tongue is inbound, it moves down
  else if (frog.tongue.state === "inbound") {
    frog.tongue.y += frog.tongue.speed;
    // The tongue stops if it hits the bottom
    if (frog.tongue.y >= height) {
      frog.tongue.state = "idle";
    }
  }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
  // Draw the tongue tip
  push();
  fill("#ff0000");
  noStroke();
  ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
  pop();

  // Draw the rest of the tongue
  push();
  stroke("#ff0000");
  strokeWeight(frog.tongue.size);
  line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
  pop();

  // Draw the frog's body
  push();
  fill("#00ff00");
  noStroke();
  ellipse(frog.body.x, frog.body.y, frog.body.size);
  pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  // Get distance from tongue to fly
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  // Check if it's an overlap
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;
  if (eaten) {
    // Reset the fly
    resetFly();
    // Bring back the tongue
    frog.tongue.state = "inbound";
  }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
  if (frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  }
}
