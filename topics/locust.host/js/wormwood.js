/**
 * locust.host
 * sama hojabri
 * 
 * storyline 1 set up for the locust storlines
 */

function wormwoodSetup() { }

function wormwoodDraw() {
  background("#263a7eff");
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("xxxx", width/2, height/2);
}

function wormwoodMousePressed() {
  state = "menu";
  menuSetup();
}

