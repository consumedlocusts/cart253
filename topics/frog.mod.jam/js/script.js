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
  //the player does not move but the laser does with the mouse/mouse click as the aimer
  x: 320,
  y: 420, //player viewpoint lower on screen for POV style
};

//the small aliens or "minions"
let aliens = [];
const alienCount = 8;
const alienSpeed = 1.2;
let specialTarget = null; //special alien to scan for during the scan state
//laser shot settings (single shot per click)
let laser = null; //idle when not in use laser beam effect
let canShoot = true; //so its not spam shooting

//boom/hit effect
//let booms = [];

//kill counter to spawn boss (there is only 8 aliens maximum to not confuse the game)
//numbers for the board
const killsToSpawnBoss = 8;
let killCount = 0;
let boss = null;
let bossMaxHp = 30;
const bossSize = 120;
const bossSpeed = 1.5; //or slower

let goops = []; //the boss shoots poison at the player
const goopVelocity = 2;

let playerHealth = 15; // health bar in boss fight, not working
//let maxGoopHits = 15; // lose after this many hits
//const playerMaxHp = 15;
let introVideo; //edited video for the start of game

function playSound() {
  // the soundeffect for the shooting etc.
}
function preload() {
  //sprite images as the characters (hand/gun, "minion" aliens, boss etc.)
  //hand = loadImage("assets/hand.png");
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
  spawnAliens();
  resetAll();
}
function resetAll() {
  //reset the game if you lose or win
  state = "start";
  killCount = 0;
  goops = [];
  laser = null;
  booms = [];
  playerHealth = 15;
  aliens = [];
  boss = null;
  spawnAliens();
  spawnSpecialTarget();
}
//create initial aliens (randomized positions)
function spawnAliens() {
  aliens = [];
  //alien index and counter, making sure they spawn at random around the screen every time the game restarts
  for (let counter = 0; counter < alienCount; counter++) {
    //loop is running until there is 8 aliens so it doesnt spawn extra
    aliens.push({
      //pushes the array to the array
      x: random(40, width - 40),
      y: random(100, 260),
      size: 18,
      velocity: random([-1, 1]) * alienSpeed,
      alive: true, //until its false then the loop stops
    });
  }
}
function spawnSpecialTarget() {
  // the alien to find first, shoot and start the game
  // only during the scan state does it initialize special target alien, scan for this alien , it goes away after
  specialTarget = {
    //again using image/gif as the base
    x: random(80, width - 80),
    y: random(120, 300),
    size: 50,
    revealed: false, //or targetfound
  };
}
function spawnBoss() {
  boss = {
    x: width / 2,
    y: 110,
    size: bossSize,
    health: bossMaxHp,
    velocityx: bossSpeed,
    //shootTimer: 0,
  };
  //goops[]; soon
  //playerHealth = 15;
}
function startScan() {
  //scanning state meaning search around with the cursor and click on the "target"
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

  drawPlayerHand(); //player hand is the POV shooter
  //after the scope scanner unactivates and activates the users hand
  if (state !== "start") {
    drawScopeCursor(); //cursor does not appear at the startmode for aesthetic reasons
  }
  //boomBooms();
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
function drawHiddenScene() {
  //as part of the first scene steps, an alien is hidden under the dark mask;
  //find the real alien to actually start the game
  //the other small aliens are also masked to confuse player (do no)
  for (let a of aliens) {
    if (a.alive) {
      drawAlien(a);
      //alien "a" is one alien of the array
      if (specialTarget) push();
      noStroke();
      let gifSize = specialTarget.size * 4;
      image(
        alienGif,
        specialTarget.x - gifSize / 2,
        specialTarget.y - gifSize / 2,
        gifSize,
        gifSize
      );

      pop();
    }
  }
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
    fill(0, 200);
    rect(0, 0, width, height);

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

function checkScanFind() {
  //player uses the scope to scan around for a special alien

  let d = dist(mouseX, mouseY, specialTarget.x, specialTarget.y);
  if (d <= scope.size / 2 && mouseIsPressed) {
    specialTarget.revealed = true;
    startPlayMode();
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
    a.x += a.velocity.x;
    // bounce from the edges for no missing alien
    if (a.x < 20 || a.x > width - 20) a.velocity.x *= -1;
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
  line(laser.startX, laser.startY, mouseX, mouseY); //line as the laser
  pop();
}
function laserShot() {
  //if (!laser) return;
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
    //if in bossmode and the boss is drawn himself, and if we shooot him, he loses health
    if (dist(mouseX, mouseY, boss.x, boss.y) < boss.size / 2 + 6) {
      boss.health--;
      laser = null;
    }
  }
}
function bossMode() {
  drawBossScore();
  drawBoss(boss);
  boss.x += boss.velocity.x;
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
  canShoot = true; //laser beam affect,, instead of spam shooting
}
function winner() {
  push();
  pop();
}
function over() {
  push();
  pop();
}
function drawBoss(b) {
  push();
  let gifSize = b.size * 2;
  image(bigGif, b.x - gifSize / 2, b.y - gifSize / 2, gifSize, gifSize);
  pop();
}
function drawGoop(g) {
  push();
  fill("#6ab04c");
  noStroke();
  ellipse(g.x, g.y, 18);
  pop();
}
function spawnGoop() {
  goops.push({
    x: boss.x + random(-30, 30),
    y: boss.y + boss.size / 2,
    velocity: 2.2,
  });
}
function drawScopeCursor() {
  //more aesthetics for the scope but layered under
  push();
  noFill();
  stroke(255, 200);
  strokeWeight(2);
  ellipse(mouseX, mouseY, scope.size);
  line(mouseX - 20, mouseY, mouseX + 20, mouseY);
  line(mouseX, mouseY - 20, mouseX, mouseY + 20);
  pop();
}
function playerHand() {
  push();
  image(handImg, player.x - 60, player.y - 40, 120, 120);
  pop();
}

function drawBossScore() {
  push();
  fill(255);
  textSize(20);
  text("BOSS HEALTH", width / 2, 20);
  stroke(180);
  noFill();
  rect(width / 2 - 120, 30, 240, 14);

  fill("#ff4d4d");
  rect(width / 2 - 120, 30, map(boss.health, 0, bossHealthMax, 0, 240), 14);

  text("PLAYER HEALTH", 80, 20);
  stroke(180);
  noFill();
  rect(20, 30, 120, 14);

  fill("#4fb419");
  rect(20, 30, map(playerHealth, 0, 15, 0, 120), 14);
  pop();
}
function mousePressed() {
  let laser;
}
