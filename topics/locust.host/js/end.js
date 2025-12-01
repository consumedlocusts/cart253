/**
 * locust.host
 * sama hojabri
 *
 * storyline 3 set up for the locust storlines
 */
"use strict";
//let endString1 = "They were allowed to torment them, but not to kill them";
let endState = 0;
let endOpenerTimer = 0;
let endOpenerShow = 0;
let endOpenerSpeedFactor = 3; // types 3 characters at a time
let endOpenerStarted = false;
let endOpenerText = "They were allowed to torment them, but not to kill them";

function endSetup() {}
function endDraw() {
  background(0);
  //  song22.rate(0.2);

  if (endState === 0) {
    // endDrawString1();
    setupEndString();
  } else if (endState === 1) {
    //spectrum = fft.analyze();
    //swarmSwarm();
  } // else if (endState === 2) {

  //} else if (endState === 3) {

  //  } else if (endState === 4) {

  //}
}
function setupEndString() {
  background("#9f0000ff");
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  endOpenerShow = floor(endOpenerTimer / endOpenerSpeedFactor);
  endOpenerShow = min(endOpenerShow, endOpenerText.length);
  text(endOpenerText.substring(0, endOpenerShow), width / 2, height / 2);

  if (endOpenerShow < endOpenerText.length) {
    endOpenerTimer++;
  }
}

function endDrawString1() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(endOpenerText, width / 2, height / 2);
}
function endPressed() {
  if (endState === 0 && endOpenerShow >= endOpenerText.length) {
    endState = 1;
    endOpenerTimer = 0;
  }

  if (endState === 1) {
    endState = 2;
  } //else if (endState === 2) {
  //endState = 3;
  //}
}
function endMousePressed() {
  state = "menu";
  menuSetup();
}
