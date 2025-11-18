/**
 * locust.host
 * sama hojabri
 * 
 * storyline 2 set up for the locust storlines
 */
function swarmSetup() { }

function swarmDraw() {
  background("#344034ff");
  fill("#9e1d1dff");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("yyyy", width/2, height/2);
}

function swarmMousePressed() {
  state = "menu";
  menuSetup();
}