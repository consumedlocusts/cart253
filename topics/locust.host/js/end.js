/**
 * locust.host
 * sama hojabri
 * 
 * storyline 3 set up for the locust storlines
 */
"use strict";

function endSetup() { }

function endDraw() {
  background("#9f0000ff");
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("zzzz", width/2, height/2);
}

function endMousePressed() {
  state = "menu";
  menuSetup();
}

