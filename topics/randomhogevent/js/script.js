/**
 * event
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

let horses;
// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function preload() {
  font = loadFont("./1Punk.ttf");

  horses = loadImage("./horses.png");
}
function setup() {
  createCanvas(400, 400);
  horses.loadPixels();
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
  gameOver = true;
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    image(horses, 0, 0);
    push();
    textFont(font);
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER + 10);
    text("FAILED", width / 2, height / 3);
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
