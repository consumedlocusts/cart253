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
let alien;
let alienGif;
let planetVideo;
//let useImages = false;
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

let player = {
  //the player does not move but the laser does with the mouse/mouse click as the aimer
  x: 320,
  y: 420, //player viewpoint lower on screen for POV style
};
let playerHealth = 15; // health bar in boss fight, not working
const playerMaxHp = 15;

//the small aliens or "minions"
let aliens = [];
let alienCount = 8;
let alienSpeed = 1.2;
let specialTarget = null; //special alien to scan for during the scan state

let laser = null; //idle when not in use laser beam effect
let laserCounter = 0;
//t laserCools = 12; //by frame to cooldown the laser

let booms = [];
//kill counter to spawn boss (there is only 8 aliens maximum to not confuse the game)

let killsToSpawnBoss = 8;
let killCount = 0;
let boss = null;
const bossMaxHp = 30;
let bossSize = 100;
let bossSpeed = 1.5; //or slower

let goops = []; //the boss shoots poison at the player
const goopVelocity = 2;

//let maxGoopHits = 15; // lose after this many hits

let end; //edited video for the start of game
let bigGif;
//function playSound() {
// the soundeffect for the shooting etc.

function preload() {
  //sprite images as the characters (hand/gun, "minion" aliens, boss etc.)
  //hand = loadImage("assets/hand.png");
  planetVideo = createVideo("assets/locusthost.mp4");
  planetVideo.hide();
  alien = loadImage("assets/aliens.gif");
  alienGif = loadImage("assets/saline.gif");
  end = loadImage("assets/end.png");
  bigGif = loadImage("assets/bigGif.gif");
  //landscape = loadImage (assets/landscape.png)
  // if (hand && alien && alienGif) useImages = true;
}
/**
 * Creates the canvas and plays game start video
 */
function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  planetVideo.play();

  spawnAliens();
  resetAll();
}
function resetAll() {
  //reset the game if you lose or win
  state = "start";
  killCount = 0;
  goops = [];
  laser = null;
  //laserCounter = 0;
  //booms = [];
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
      size: 60,
      velocityx: random([-1, 1]) * alienSpeed,
      alive: true, //until its false then the loop stops
    });
  }
}
function spawnSpecialTarget() {
  // the alien to find first, shoot and start the game
  // only during the scan state, initialize special target alien, scan for this alien , it goes away after
  specialTarget = {
    //again using image/gif as the base, it spawns at a random place each reset
    x: random(80, width - 80),
    y: random(120, 300),
    size: 50,
    revealed: false, //did you find the alien
  };
}
function spawnBoss() {
  boss = {
    x: width / 2,
    y: 110,
    size: bossSize,
    health: bossMaxHp,
    velocityx: bossSpeed,
    shootTimer: 0,
    shooting: 150,
  };
  goops = [];
  playerHealth = playerMaxHp;
}
function startScan() {
  //scanning state meaning search around with the cursor and click on the "target"
  spawnAliens();
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
    scopeMask();
    checkScanFind();
  } else if (state === "play") {
    drawPlayMode();
  } else if (state === "boss") {
    bossMode();
  } else if (state === "win") {
    drawWin();
  } else if (state === "gameover") {
    drawGameOver();
  }

  drawPlayerHand(); //player hand is the POV shooter
  //after the scope scanner unactivates and activates the users hand
  if (state !== "start") {
    drawScopeCursor(); //cursor does not appear at the startmode for aesthetic reasons
  }
  //boomBooms();
  
}

function drawPlanetLandscape() {
  image(planetVideo, 0, 0, width, height);
}
function drawStartScreen() {
  background(0);
  image(end, 0, 0);
  push();
  fill("red"); //sorry im too tired
  textSize(30);
  text("FIGHT FIGHT FIGHT", width / 2, 120); //opener text and instruction
  textSize(18);
  text("click to begin scan.", width / 2, 160);
  pop();
}
function drawHiddenScene() {
  //as part of the first scene steps, an alien is hidden under the dark mask;
  //find the real alien to actually start the game
  //the other small aliens are also masked to confuse player (do no)
  for (let a of aliens) {
    if (a.alive) {
      drawAliens(a);
      //alien "a" is one alien of the array, but still applies to specialTarg
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
    push();
    fill(0, 200); // semi-transparent dark overlay
    rect(0, 0, width, height);
    blendMode(DIFFERENCE); //blending it so screen is actually dark maybe
    ellipse(mouseX, mouseY, scope.x, scope.y); // reveal area
    pop();
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
    if (laserCounter> 0) {
    laserCounter--;
}
}
function checkScanFind() {
  //player uses the scope to scan around for a special alien
  
  if (!specialTarget) return; //i finally understand
  let d = dist(mouseX, mouseY, specialTarget.x, specialTarget.y); //checks overlap
  console.log(d)
  if (d <= scope.x / 8 && mouseIsPressed) { 
    specialTarget.revealed = true;
    //once this is true, begin gameplay
    state = "play";
    drawPlayMode();
  }
}
//
// too much stuff
// play mode below
//
//

function drawPlayMode() {
  for (let counter = 0; counter < aliens.length; counter++) {
    let a = aliens[counter];
    if (!a.alive) continue;
    a.x += a.velocityx;
    // bounce from the edges for no missing alien
    if (a.x < 20 || a.x > width - 20) a.velocityx *= -1;
    drawAliens(a);
  }
  if (laser) {
    drawLaser();
    didShootCounter();
    //laserShot();
  }
  for (let boomEl of booms){
    if((millis()- boomEl.timer)<500){
      boom(boomEl.x, boomEl.y)

    }
    
  }
  //boomBooms();
  //  after enough kills then spawn boss
  if (killCount >= killsToSpawnBoss) {
    // transition to boss mode
    state = "boss";
    spawnBoss();
    //playSound("bossAppear");
  }
  //kill score keeper
  push();
  fill(255);
  textSize(14);
  text("Kills: " + killCount + " / " + killsToSpawnBoss, width - 100, 20);
  pop();
}
//function laserCooler() {
  //so it is a linear shot and not rapid fire,
  //  also doesnt keep running when not in use
  //laser = { x: player.x, y: player.y - 30 };
  //laserCounter = laserCools;
//}
function drawLaser() {
  push();
  stroke(255, 200, 0);
  strokeWeight(4);
  line(player.x, player.y - 30, mouseX, mouseY);
  pop();
   laser = { x: player.x, y: player.y - 30 };
}

function didShootCounter() {
  drawLaser();
  for (let counter = 0; counter < aliens.length; counter++) {
    let a = aliens[counter];
    if (!a.alive) continue;
    if (dist(mouseX, mouseY, a.x, a.y) < a.size / 2 + 6) {
      a.alive = false;
      killCount++;
      booms.push({ x: a.x, y: a.y, timer: millis() });
      laser = null;
      break;
    }
  }
}

function boom(x,y){
  text("BOOM",x,y)

}

function bossMode() {
  boss.x += boss.velocityx;
  if (boss.x < boss.size / 2 || boss.x > width - boss.size / 2)
    boss.velocityx *= -1; // this makes sure the boss guy bounces on the wall and returns instead of respawning a new one or disapearing
  drawBoss(boss);

  boss.shootTimer++; //goop shooter timer, once enough time passes, he is allowed to shoot goop/no rapid fire
  if (boss.shootTimer >= boss.shooting) {
    boss.shootTimer = 0;
    spawnGoop();
  }
  for (let counter = goops.length - 1; counter >= 0; counter--) {
    let g = goops[counter];
    g.y += g.velocity; //goop stuff (from ref code this is bullet behaviour)
    // checks collision with player (or the x axis of the player)
    if (g.y > player.y - 20 && g.x - player.x < 24) {
      playerHealth--;
      goops.splice(counter, 1); //removes the goop once it is hit player or off the board so it can detect actual hits to player and
      // splice to not overrun or instant kill player by accident
      if (playerHealth <= 0) state = "gameover";
      //ensure the poison he boss is spitting is going downwards near the player(y then detects at x)
    }
    if (g.y > height + 20) goops.splice(counter, 1);
    else drawGoop(g);
  }
  if (laser) {
    drawLaser();
    if (dist(mouseX, mouseY, boss.x, boss.y) < boss.size / 2 + 8) {
      boss.health--;
      //booms.push
      laser = null;
    }
  }
  drawBossScore();
}

function drawAliens(a) {
  push();
  noStroke();
  let gifSize = a.size * 2;
  image(alienGif, a.x - gifSize / 2, a.y - gifSize / 2, gifSize, gifSize);
  
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

function drawPlayerHand() {
  push();
  fill(207, 168, 127);
  rect(player.x - 22, player.y - 10, 44, 20);
  fill(42);
  rect(player.x - 10, player.y - 40, 20, 36);
  pop();
}

function drawBossScore() {
  fill(255);
  textSize(12);
  text("BOSS HEALTH", width / 2, 20);
  noFill();
  stroke(180);
  rect(width / 2 - 120, 30, 240, 14);
  noStroke();
  fill(255, 77, 77);
  rect(width / 2 - 120, 30, (boss.health * 240) / bossMaxHp, 14);

  text("PLAYER HEALTH", 80, 20);
  noFill();
  stroke(180);
  rect(20, 30, 120, 14);
  noStroke();
  fill(79, 180, 25);
  rect(20, 30, (playerHealth * 120) / playerMaxHp, 14);
}
function drawWin() {}
function drawGameOver() {}
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
function mousePressed() {
  if (state === "start") {
    planetVideo.loop();
    state = "scan";
    return;
  }
  if (state === "play" || state === "boss") drawLaser();
  planetVideo.loop();

  
  if (state === "win" || state === "gameover") resetAll();
  planetVideo.loop();
}

function mouseReleased() {
  laser = null;
}
//to push for school edit
