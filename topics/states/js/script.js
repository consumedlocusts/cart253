/**
 *
 * A small project for exploring how states work!
 * Sabine : free style
 *
 * MAKING THINGS :: IDEA TODAY - start by blocking
 *
 */

("use strict");
//8A
let timer = {
  startTime: 0,
  timeExpired: 10000,
  currentTime: 0,
};
let gameState = "start"; //should this be a 'const'?

//9B
let finishState = "none";

let score = 0; //7A

/**
 * Create the canvas
 */
function setup() {
  createCanvas(500, 500);
  //6A ask - why here?
  setTimeout(goToGameScreen, 5000);
}

function goToGameScreen() {
  //6B ask - what should the this be?
  gameState = "game";
  //if not correct then will just stay in the draw()

  //8B set timer start time to millis()
  timer.startTime = millis();
}

/**
 * states
 */
function draw() {
  //default
  background("#333333");
  // 3 possible states///
  //do I have to have an else? No!
  if (gameState === "start") {
    //will loop until the gameState variable is no longer start
    startScreen();
  } else if (gameState === "game") {
    //will loop until the gameState variable is no longer 'game'
    gameScreen();
  } else if (gameState === "end") {
    //will loop until the gameState variable is no longer 'end'
    endScreen();
  }
}

function startScreen() {
  background("#2869caff");
}
function gameScreen() {
  background("#ca4028ff");

  //8C
  //its the difference!
  timer.currentTime = millis() - timer.startTime;
  //8D
  displayTimer();

  //9A:
  if (timer.currentTime > timer.timeExpired) {
    //win or lose
    //9C
    if (score >= 10) {
      finishState = "WIN";
    } else {
      finishState = "LOSE";
    }
    //SET game state
    gameState = "end";
  }

  //7D ADD RECT ON MOUSE OVER
  //before - so that it is underneath
  //condition
  if (mouseX > 0 && mouseX < width / 3)
    //AGAIN make a function
    drawRect();

  //7B add score - make a function :)
  displayScore();
}

function endScreen() {
  background("#604c7eff");
  //9D
  displayEndText();
}

function mousePressed() {
  //7C
  //P1: just generally in mousePressed
  //score =score+1;
  //P2: add a condition
  if (mouseX > 0 && mouseX < width / 3) {
    score = score + 1;
  }
  //P3::bonus - make it harder that if not in the range then decrease
  else {
    score--;
  }
}

function displayScore() {
  push();
  textSize(24);
  fill(255);
  text("SCORE: " + score, width - 150, 50);
  pop();
}

function drawRect() {
  push();
  fill("#ffffff");
  rect(0, 0, width / 3, height);
  pop();
}

//8D
function displayTimer() {
  push();
  textSize(24);
  fill(255);

  //text("TIMER: "+timer.currentTime, width-150,120 )
  //show division by 1000 and round //oh its counting up ... lets show COUNTDOWN
  // text("TIMER: "+floor(timer.currentTime/1000), width-150,120 )

  // lets show COUNTDOWN :: note the calculation is the same but the display is different...
  //that will mean that we don't worry about it too much
  //timerExpired - currenttime

  text(
    "TIMER: " +
      (floor(timer.timeExpired / 1000) - floor(timer.currentTime / 1000)),
    width - 150,
    120
  );
  pop();
}

function displayEndText() {
  push();
  textSize(24);
  fill(255);
  text(finishState, width / 2, height / 2);
  pop();
}
