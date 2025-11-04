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
//let handImg, alienImg, bossImg, beerImg;
let alien;
let alienGif;
let useImages = false;
//the hand/gun set up (which is the same object)
//everything is drawn with images
//scopes from another code (listed in the read.me)
let scope = {
  x: 200,
  y: 200,
  size: 200,
};
let scope2 = {
  x: 200,
  y: 200,
  size: 400,
};
let pointer = {
  x: 200,
  y: 200,
  size: 4,
};

let foundTarget = false;

let player = {
  x: 320,
  y: 420, //player viewpoint lower on screen for POV style
};

//the small aliens or "minions"
let aliens = [];
let ALIEN_COUNT = 8;
let alienSpeed = 1.2;
let specialTarget = null; //special alien to scan for during the scan state
//laser shot settings (single shot per click)
let laser = null;
let canShoot = true; //so its not spam shooting

//boom/hit effect
//let booms = [];

//kill counter to spawn boss (there is only 8 aliens maximum to not confuse the game)
//numbers for the board
let killsToSpawnBoss = 8;
let killCount = 0;
let boss = null;
let bossHealthMax = 30;

let goops = []; //the boss shoots poison at the player

let playerHealth = 15; // health bar in boss fight
let maxGoopHits = 15; // lose after this many hits
let introVideo; //edited video for the start of game

function playSound() {
  // the soundeffect for the shooting etc.
}
function preload() {
  //sprite images as the characters (hand/gun, "minion" aliens, boss etc.)
  handImg = loadImage("assets/hand.png");
  alien = loadImage("assets/aliens.gif");
  alienGif = loadImage("assets/saline.gif");
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
  //alien index and counter, making sure they spawn at random around the screen every time the game restarts
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
function spawnSpecialTarget() {
  specialTarget = {
    //again using image/gif as the base
    x: random(80, width - 80),
    y: random(120, 300),
    size: 50,
    revealed: false,
  };
}
// during the scan state initialize a special target alien, scan for this alien
function startScan() {
  setupAliens();
  spawnSpecialTarget();
  state = "scan";
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
    drawPlayMode();
  } else if (state === "boss") {
    drawBossMode();
  } else if (state === "win") {
    drawWinMode();
  } else if (state === "gameover") {
    drawGameOverMode();
  }

  drawPlayerHand();
  //scope scanner unactivates and activates the users hand
  if (state !== "start") {
    drawScopeCursor();
  }
}

function drawPlanetLandscape() {
  push();
  //the landscape is an edited image, the planet landscape is a constatnt background
  pop();
}
function drawStartScreen() {
  background(0);
  image(introVideo, 0, 0);
}

function scopeMask() {
  //this is the scopemask from my brace.yer.self code
  push();
  if (mouseIsPressed) {
    fill("#f9f511ff");
    strokeWeight(90);
    stroke("#f9f511ff");
    ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);

    fill("#4fb419ff");
    strokeWeight(90);
    stroke("#4fb419ff");
    ellipse(mouseX, mouseY, scope2.x, scope2.y, scope2.size, scope2.size);

    fill("#4fb419ff");
    strokeWeight(190);
    stroke("#000000ff");
    ellipse(mouseX, mouseY, 140, 20, 0, 20);

    stroke("#000000d3");
    strokeWeight(80);
    fill("#ff0000ff");
    ellipse(mouseX, mouseY, pointer.x, pointer.y, pointer.size, pointer.size);

    fill("#ffda35ff");
    noStroke();
    ellipse(mouseX, mouseY, 10, 200, 0, 5);
    ellipse(mouseX, mouseY, 200, 10, 5, 0);
  } else {
    // Retracted scope when not scanning
    fill("#f9f511ff");
    strokeWeight(170);
    stroke("#f9f511ff");
    ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);

    fill("#4fb419ff");
    strokeWeight(150);
    stroke("#4fb419ff");
    ellipse(mouseX, mouseY, 200, 200, 600, 600);

    stroke("#000000ec");
    strokeWeight(130);
    fill("#ff0000ff");
    ellipse(mouseX, mouseY, 200, 200, 300, 300);

    stroke("#ff0000ff");
    strokeWeight(5);
    fill("#000000ff");
    ellipse(mouseX, mouseY, 200, 200, 0);
  }
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

function checkScanFind() {
  //player uses the scope to scan around for a special alien
  if (!specialTarget) return;
  push();

  noStroke();
  let gifSize = specialTarget.size * 2;
  image(
    alienGif,
    specialTarget.x - gifSize / 2,
    specialTarget.y - gifSize / 2,
    gifSize,
    gifSize
  );

  pop();
  let d = dist(mouseX, mouseY, specialTarget.x, specialTarget.y);
  if (d <= scope.size / 2 && mouseIsPressed) {
    specialTarget.revealed = true;
    startPlayMode(specialTarget.x, specialTarget.y);
  }
}
function startPlayMode() {
  state = "play"; //begins the shooting game after the special alien has been located
  setupAliens();
  for (let a of aliens) {
    a.x = constrain(a.x, 20, width - 20);
    a.y = random(100, 250);
    a.alive = true;
  }
  killCount = 0;
}

function drawPlayMode() {
  for (let a of aliens) {
    if (!a.alive) continue;
    a.x += a.velocity;
    // bounce from the edges for no missing alien
    if (a.x < 20 || a.x > width - 20) a.velocity *= -1;
    drawAlien(a);
  }
  if (laser) {
    drawLaser();
    laserShot();
  }
  updateBooms();
  // the simple win condition: after enough kills then spawn boss
  if (killCount >= killsToSpawnBoss) {
    // transition to boss mode
    state = "boss";
    resetBoss();
    playSound("bossAppear");
  }
  //kill score keeper
  push();
  fill(255);
  textSize(14);
  text("Kills: " + killCount + " / " + killsToSpawnBoss, width - 100, 20);
  pop();
}

function drawLaser() {
  push();
  stroke(255, 200, 0);
  strokeWeight(4);
  line(laser.startX, laser.startY, mouseX, mouseY);
  pop();
}
function laserShot() {
  if (!laser) return;
  //for future boom sound effect, updates the laser
  if (state === "play") {
    for (let a of aliens) {
      if (!a.alive) continue;
      if (dist(mouseX, mouseY, a.x, a.y) < a.size / 2 + 6) {
        a.alive = false;
        killCount++;
        laser = null;
        break;
      }
    }
  }
  if (state === "boss" && boss) {
    if (dist(mouseX, mouseY, boss.x, boss.y) < boss.size / 2 + 6) {
      boss.health--;
      laser = null;
    }
  }
}
function bossMode() {
  drawBossScore();
  drawBoss(boss);
  boss.x += boss.velocityx;
  if (boss.x < boss.size / 2 || boss.x > width - boss.size / 2)
    boss.velocity *= -1;
  boss.shootTimer++;
  if (boss.shootTimer >= boss.shootInterval) {
    boss.shootTimer = 0;
    spawnGoop();
  }
  for (let counter = goops.length - 1; counter >= 0; counter--) {
    let g = goops[counter];
    g.y += g.velocityy; //ensure the poison he boss is spitting is going downwards near the player
  }
}
function mousePressed() {
  if (state === "start") {
    startScan();
    return;
  }

  if (state === "scan") return;
  if ((state === "play" || state === "boss") && canShoot) {
    laser = { startX: player.x, startY: player.y - 30 };
    canShoot = false;
  }
  if (state === "win" || state === "gameover") {
    resetBoss();
    setupAliens();
    state = "start";
  }
}

function drawAliens(a) {
  push();
  noStroke();
  let gifSize = a.size * 2;
  image(alienGif, a.x - gifSize / 2, a.y - gifSize / 2, gifSize, gifSize);
  pop();
}
function mouseReleased() {
  canShoot = true;
}
function winner() {
  push();
  pop();
}
function over() {
  push();
  pop();
}
