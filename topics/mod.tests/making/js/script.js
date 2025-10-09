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

let awakenString =
  "at first light...the shadow of a man filling his prints in the snow";
let awakenVid;

let falseAwakenStringTimer = 0;
let falseAwakenLettersToShow = 0;
let falseAwakenSpeedFactor = 3;

let falseAwakenString =
  "unblinded by our exhaled fog, her Polaris points above to the heavens";
let falseAwakenImg;

let gameState = 0;

function preload() {
  awakenVid = createVideo();
  awakenVid.hide();
  falseAwakenVid = createVideo();
  falseAwakenVid.hide();
}

function setup() {
  createCanvas(640, 640);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255);
}

function draw() {
  background(0);

  if (gameState === 0) {
    phaseAwaken();
  } else if (gameState === 1) {
    phaseFalseAwaken();
  }
}

function phaseAwaken() {
  image(falseAwakenVid, 0, 0, width, height);
  //Typewriter effect...gradually... each word/letter appears(by threes atm)
  awakenStringTimer = floor(awakenStringTimer / awakenSpeedFactor);
  awakenLettersToShow = min(awakenLettersToShow, awakenString.length);

  //substringing
  text(awakenString.substring(0, awakenLettersToShow), width / 2, height / 2);

  // til the lines done
  if (awakenLettersToShow < awakenString.length) {
    awakenStringTimer++;
  }
}

function phaseFalseAwaken() {
  image(falseAwakenVid, 0, 0, width, height);

  falseAwakenLettersToShow = floor(
    falseAwakenStringTimer / falseAwakenSpeedFactor
  );
  falseAwakenLettersToShow = min(
    falseAwakenLettersToShow,
    falseAwakenString.length
  );

  text(
    falseAwakenString.substring(0, falseAwakenLettersToShow),
    width / 2,
    height / 2
  );

  if (falseAwakenLettersToShow < falseAwakenString.length) {
    falseAwakenStringTimer++;
  }
}
