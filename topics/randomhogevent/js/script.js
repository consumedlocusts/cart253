/**
 * its so over event
 * Sama Hojabri
 * 

"use strict";

/**
*/
"use strict";
//font change
let font;
// Current score
let score = 0;
let soundeff;
let horses;
let sesroh;
// Is the game over?
let gameOver = false;
let revoEmag = false;
let noisePlaid = false;
let noisePlaid2 = false;

/**
 * Create the canvas
 */
function preload() {
  font = loadFont("./1Punk.ttf");
  horses = loadImage("./horses.png");
  sesroh = loadImage("./sesroh1.png");
  soundeff = loadSound("./game.mp3");
}
function setup() {
  createCanvas(400, 400);
  horses.loadPixels();

  console.log(soundeff.attackLevel);
}

/**
 * Update the score and display the UI
 */
function draw() {
  background("#a14242ff");

  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }

  displayUI();
}
function mousePressed() {
  gameOver = true;
}
function keyPressed() {
  revoEmag = true;
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    if (!noisePlaid) {
      console.log(soundeff.attackLevel);
      soundeff.play();

      noisePlaid = true;
    }

    image(horses, 0, 0);
    push();
    textFont(font);
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER + 10);
    text("FAILED", width / 2, height / 3);
    pop();
  }
  if (revoEmag) {
    if (!noisePlaid2) {
      soundeff.play();
      soundeff.rate(0.2);
      noisePlaid2 = true;
    }

    background("#000eabff");
    image(sesroh, 0, 0);
    push();
    textFont(font);
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER + 10);
    text("DELIAF", width / 2, height / 3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(36);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width / 2, height / 3);
  pop();
}
