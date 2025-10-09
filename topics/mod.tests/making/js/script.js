/**
 * Unknwon
 * Sama Hojabri
 *
 * UNSKIPABLE GAME WITH AWESOME DIALOG
 */

"use strict";
let begottenMusic;
let musicStarted = false;
let font; //font name idk its 6am i havent slep
let awakenStringTimer = 0;
let awakenLettersToShow = 0;
let awakenSpeedFactor = 3; //types 3 characters at a time, sourced from a typewriter code
let awakenString =
  "at first light...the shadow of a man filling his prints in the snow";
let awakenVid;
let phaseAwakenStarted = false; //for testbolean,not ready

let falseAwakenStringTimer = 0;
let falseAwakenLettersToShow = 0;
let falseAwakenSpeedFactor = 3; //types 3 characters at a time, sourced from a code
let phaseFalseAwakenStarted = false; //for testbolean,not ready
let falseAwakenString =
  "unblinded by our exhaled fog, her Polaris points above to the heavens";
let falseAwakenVid;
//WE COULD DO THIS(merge the lets like this so I CAN SEE)
let stillVid,
  stillString = "empty nostalgia, from a life passed";
let stillTimer = 0,
  stillLetters = 0,
  stillSpeed = 3;
let stillOddVid,
  stillOddString = "just as tomorrow nil";
let stillOddTimer = 0,
  stillOddLetters = 0,
  stillOddSpeed = 3;
let begottenVid,
  begottenString = "if all you have ever known is winter";
let begottenTimer = 0,
  begottenLetters = 0,
  begottenSpeed = 3;
let winterizedVid,
  winterizedString = "lost in useless territory";
let winterizedTimer = 0,
  winterizedLetters = 0,
  winterizedSpeed = 3;
let warmthVid,
  warmthString = "you will crave revaluation (a warm feeling)";
let warmthTimer = 0,
  warmthLetters = 0,
  warmthSpeed = 3;
let youNeverKnewVid,
  youNeverKnewString = "and i never told you";
let youNeverKnewTimer = 0,
  youNeverKnewLetters = 0,
  youNeverKnewSpeed = 3;
let sorryVid,
  sorryString = "we have been dead since a long time.";
let sorryTimer = 0,
  sorryLetters = 0,
  sorrySpeed = 3;

//gamstate is the phaser (changer of phases)
let gameState = 0;
//videos i made as a side project, not keeping these here
function preload() {
  awakenVid = createVideo("./assets/the.mp4");
  awakenVid.hide();
  falseAwakenVid = createVideo("./assets/dogs.mp4");
  falseAwakenVid.hide();
  stillVid = createVideo("./assets/still.mp4");
  stillVid.hide();
  stillOddVid = createVideo("./assets/odd.mp4");
  stillOddVid.hide();
  begottenVid = createVideo("./assets/begotten.mp4");
  begottenVid.hide();
  winterizedVid = createVideo("./assets/winterized.mp4");
  winterizedVid.hide();
  warmthVid = createVideo("./assets/warmth.mp4");
  warmthVid.hide();
  youNeverKnewVid = createVideo("./assets/youNeverKnew.mp4");
  youNeverKnewVid.hide();
  sorryVid = createVideo("./assets/sorry.mp4");
  sorryVid.hide();

  begottenMusic = loadSound("./assets/begotten.mp3");
  font = loadFont("./assets/fontie.ttf");
}

function setup() {
  createCanvas(640, 640);
  fill("#ff0000ff");
  textFont(font);
  textSize(14);
  textAlign(CENTER, CENTER);

  //begottenMusic.loop();
  //begottenMusic.setVolume(0.3);

  // mute videos
  awakenVid.volume(0);
  falseAwakenVid.volume(0);
  stillVid.volume(0);
  stillOddVid.volume(0);
  begottenVid.volume(0);
  winterizedVid.volume(0);
  warmthVid.volume(0);
  youNeverKnewVid.volume(0);
  sorryVid.volume(0);

  awakenVid.loop();
}

function draw() {
  background(0);

  if (gameState === 0) {
    phaseAwaken();
  } else if (gameState === 1) {
    phaseFalseAwaken();
  } else if (gameState === 2) {
    phaseStill();
  } else if (gameState === 3) {
    phaseStillOdd();
  } else if (gameState === 4) {
    phaseBegotten();
  } else if (gameState === 5) {
    phaseWinterized();
  } else if (gameState === 6) {
    phaseWarmth();
  } else if (gameState === 7) {
    phaseYouNeverKnew();
  } else if (gameState === 8) {
    phaseSorry();
  }
}

function phaseAwaken() {
  image(awakenVid, 0, 0, width, height);

  // Typewriter effect but its too fast
  awakenLettersToShow = floor(awakenStringTimer / awakenSpeedFactor);
  awakenLettersToShow = min(awakenLettersToShow, awakenString.length);

  let currentText = awakenString.substring(0, awakenLettersToShow);
  drawTextWithBackground(
    currentText,
    width / 2,
    height / 2,
    20,
    [0, 0, 0, 180]
  );

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
function phaseStill() {
  image(stillVid, 0, 0, width, height);
  stillLetters = floor(stillTimer / stillSpeed);
  stillLetters = min(stillLetters, stillString.length);
  text(stillString.substring(0, stillLetters), width / 2, height / 2);
  if (stillLetters < stillString.length) stillTimer++;
}
function phaseStillOdd() {
  image(stillOddVid, 0, 0, width, height);
  stillOddLetters = floor(stillOddTimer / stillOddSpeed);
  stillOddLetters = min(stillOddLetters, stillOddString.length);
  text(stillOddString.substring(0, stillOddLetters), width / 2, height / 2);
  if (stillOddLetters < stillOddString.length) stillOddTimer++;
}
function phaseBegotten() {
  image(begottenVid, 0, 0, width, height);
  begottenLetters = floor(begottenTimer / begottenSpeed);
  begottenLetters = min(begottenLetters, begottenString.length);
  text(begottenString.substring(0, begottenLetters), width / 2, height / 2);
  if (begottenLetters < begottenString.length) begottenTimer++;
}
function phaseWinterized() {
  image(winterizedVid, 0, 0, width, height);
  winterizedLetters = floor(winterizedTimer / winterizedSpeed);
  winterizedLetters = min(winterizedLetters, winterizedString.length);
  text(winterizedString.substring(0, winterizedLetters), width / 2, height / 2);
  if (winterizedLetters < winterizedString.length) winterizedTimer++;
}
function phaseWarmth() {
  image(warmthVid, 0, 0, width, height);
  warmthLetters = floor(warmthTimer / warmthSpeed);
  warmthLetters = min(warmthLetters, warmthString.length);
  text(warmthString.substring(0, warmthLetters), width / 2, height / 2);
  if (warmthLetters < warmthString.length) warmthTimer++;
}
function phaseYouNeverKnew() {
  image(youNeverKnewVid, 0, 0, width, height);
  youNeverKnewLetters = floor(youNeverKnewTimer / youNeverKnewSpeed);
  youNeverKnewLetters = min(youNeverKnewLetters, youNeverKnewString.length);
  text(
    youNeverKnewString.substring(0, youNeverKnewLetters),
    width / 2,
    height / 2
  );
  if (youNeverKnewLetters < youNeverKnewString.length) youNeverKnewTimer++;
}
function phaseSorry() {
  image(sorryVid, 0, 0, width, height);
  sorryLetters = floor(sorryTimer / sorrySpeed);
  sorryLetters = min(sorryLetters, sorryString.length);
  text(sorryString.substring(0, sorryLetters), width / 2, height / 2);
  if (sorryLetters < sorryString.length) sorryTimer++;
}

function keyPressed() {
  if (!musicStarted) {
    begottenMusic.loop();
    musicStarted = true;
  }
  if (gameState === 0 && awakenLettersToShow >= awakenString.length) {
    awakenVid.pause();
    gameState = 1;
    falseAwakenStringTimer = 0;
    falseAwakenVid.loop();
  } else if (
    gameState === 1 &&
    falseAwakenLettersToShow >= falseAwakenString.length
  ) {
    falseAwakenVid.pause();
    gameState = 2;
    stillTimer = 0;
    stillVid.loop();
  } else if (gameState === 2 && stillLetters >= stillString.length) {
    stillVid.pause();
    gameState = 3;
    stillOddTimer = 0;
    stillOddVid.loop();
  } else if (gameState === 3 && stillOddLetters >= stillOddString.length) {
    stillOddVid.pause();
    gameState = 4;
    begottenTimer = 0;
    begottenVid.loop();
  } else if (gameState === 4 && begottenLetters >= begottenString.length) {
    begottenVid.pause();
    gameState = 5;
    winterizedTimer = 0;
    winterizedVid.loop();
  } else if (gameState === 5 && winterizedLetters >= winterizedString.length) {
    winterizedVid.pause();
    gameState = 6;
    warmthTimer = 0;
    warmthVid.loop();
  } else if (gameState === 6 && warmthLetters >= warmthString.length) {
    warmthVid.pause();
    gameState = 7;
    youNeverKnewTimer = 0;
    youNeverKnewVid.loop();
  } else if (
    gameState === 7 &&
    youNeverKnewLetters >= youNeverKnewString.length
  ) {
    youNeverKnewVid.pause();
    gameState = 8;
    sorryTimer = 0;
    sorryVid.loop();
  } else if (gameState === 8 && sorryLetters >= sorryString.length) {
    sorryVid.pause();
  }
}
//i am dying of tired
function drawTextWithBackground(
  txt,
  x,
  y,
  padding = 10,
  bgColor = [0, 0, 0, 180] //counter im assuming is the cause
) {
  textAlign(CENTER, CENTER);
  textSize(14);
  let w = textWidth(txt) + padding * 2;
  let h = textAscent() + textDescent() + padding * 2;

  fill(bgColor[0], bgColor[1], bgColor[2], bgColor[3]); //hmm
  rectMode(CENTER);
  rect(x, y, w, h);

  fill(255); // text color
  text(txt, x, y);
}
