/**
 * Unknwon
 * Sama Hojabri
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
let awakenStringTimer = 0;
let awakenLettersToShow = 0;
let awakenSpeedFactor = 3;

let awakenString;
("at first light...the shadow of a man filling his prints in the snow");
let awakenVid;

let falseAwakenStringTimer = 0;
let falseAwakenLettersToShow = 0;
let falseAwakenSpeedFactor = 3;

let falseAwakenString;
("unblinded by our exhaled fog, her Polaris points above to the heavens");
let falseAwakenImg;

let gameState = 0;

function preload() {
  awakenVid = createVideo();
  falseAwakenImg = loadImage();
}

function setup() {
  createCanvas(640, 640);
  background(0);
}

function draw() {
  background(0);

  if (gameState === 0) {
    //will loop until the gameState variable is no longer start
    phaseAwaken();
  } else if (gameState === 1) {
    //will loop until the gameState variable is no longer 'game'
    phaseFalseAwaken();
  }
}

function phaseAwaken() {
  background(0);

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(
    "at first light...the shadow of a man filling his prints in the snow",
    width / 2,
    height / 2
  );
}

function phaseFalseAwaken() {
  background(0);

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(
    "unblinded by our exhaled fog, her Polaris points above to the heavens",
    width / 2,
    height / 2
  );
}
