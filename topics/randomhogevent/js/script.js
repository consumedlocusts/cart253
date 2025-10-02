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

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function preload() {
  font = loadFont("assets/1Punk.ttf");
}
function setup() {
  createCanvas(400, 400);
}

/**
 * Update the score and display the UI
 */
function draw() {
  background("#000000ff");

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
    push();
    textFont(font);
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You lose!", width / 2, height / 3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width / 2, height / 2);
  pop();
}
