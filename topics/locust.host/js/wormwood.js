/**
 * locust.host
 * sama hojabri
 * 
 * storyline 1 set up for the locust storlines
 */
 state = "wormwood";
function wormwoodSetup() {
console.log("wormwood setup");
}

/**
 * This will be called every frame when the blue variation is active
 */
function wormwoodDraw() {
  background(0);
  fill(255); //redd
  textSize(48);
  textAlign(CENTER, CENTER);
  text("xxxx", width / 2, height / 2);
}


/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function wormwoodMousePressed() {
   state = "menu";
  menuSetup();
}

