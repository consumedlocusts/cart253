/**
 * locust.host
 * sama hojabri
 * 
 * storyline 1 set up for the locust storlines
 */
let wormFont;
let wormerFont;

function preload(){
    wormFont = loadFont("meeska.ttf");
     wormerFont = loadFont("what.ttf");
}
function wormwoodSetup() { }

function wormwoodDraw() {
  background("#263a7eff");
  fill(255);
  textFont(wormerFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("xxxx", width/2, height/2);
  
  fill(255);
  textFont(wormFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("xxxx", width/3, height/3);
}

function wormwoodMousePressed() {
  state = "menu";
  menuSetup();
}

