/**
 * locust.host
 * sama hojabri
 * 
 * storyline 3 set up for the locust storlines
 */
function endSetup() {}

function endDraw() {
  background(0, 0, 100); //dark blue
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("zzzz", width/2, height/2);
}

function endMousePressed() {
  state = "menu";
  menuSetup();
}

