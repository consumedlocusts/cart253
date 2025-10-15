/**
 * Frogfrogfrog
 * Pippin Barr
 *
 * A game of catching flies with your frog-tongue
 *
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";
//the alien target for scope to find to initiate the third gamemode (shooterPOV)
let target = {
  targetSize: 50,
  targetFill: "#ff0000ff",
  x: 0,
  y: 0,
};
//Scope, gamemode 2 "scene (find the alien)"
let scope2 = {
  x: 200,
  y: 200,
  size: 400,
};

let scope = {
  x: 200,
  y: 200,
  size: 200,
};

let pointer = {
  x: 200,
  y: 200,
  size: 4,
};

// Our frog
let frog = {
  // The frog's body has a position and size
  body: {
    x: 320,
    y: 520,
    size: 150,
  },
  // The frog's tongue has a position, size, speed, and state
  tongue: {
    x: undefined,
    y: 480,
    size: 20,
    speed: 20,
    // Determines how the tongue moves each frame
    state: "idle", // State can be: idle, outbound, inbound
  },
};

// Our fly
// Has a position, size, and speed of horizontal movement
let fly = {
  x: 0,
  y: 200, // Will be random
  size: 10,
  speed: 3,
};
let resetFly();
  let moveFly;
  let drawFly;
  let moveFrog;
let  moveTongue;
  let drawFrog;
let  checkTongueFlyOverlap;
let gameState = 0;
/**
 * Creates the canvas and initializes the fly
 */
function setup() {
  background("#ffffff");
  createCanvas(640, 640);
}
function draw() {
  background(0);

  if (gameState === 0) {
    scopePov();
  } else if (gameState === 1) {
    shooterPov();
  } else if (gameState === 2) {
    bossPov();
  }
  
  else if (gameState === "win") {
    drawWin();
  } 
  else if (gameState === "lose") {
    drawLose();
}
}
function scopePov() {
  createCanvas(640, 640);
  background("#000000");

  let targetDistance = dist(mouseX, mouseY, target.x, target.y);
  const mouseIsOverlapping = targetDistance < target.targetSize / 2;
  const mouseIsMoving = movedX !== 0 || movedY !== 0;

  if (mouseIsOverlapping && mouseIsMoving) {
    target = gameState;
    gameState = 1;
  } else {
    target.targetFill = "#ffdd00ff";
  }

  if (mouseIsPressed === true) {
    fill("#f9f511ff");
    strokeWeight(90);
    stroke("#f9f511ff");
    ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);

    //scope level 2

    fill("#4fb419ff");
    strokeWeight(90);
    stroke("#4fb419ff");
    ellipse(mouseX, mouseY, scope2.x, scope2.y, scope2.size, scope2.size);

    fill("#4fb419ff");
    strokeWeight(190);
    stroke("#000000ff");
    ellipse(mouseX, mouseY, 140, 20, 0, 20);

    stroke("#000000d3");
    strokeWeight(80);
    fill("#ff0000ff");
    ellipse(mouseX, mouseY, pointer.x, pointer.y, pointer.size, pointer.size);

    fill("#ffda35ff");
    noStroke();
    ellipse(mouseX, mouseY, 10, 200, 0, 5);
    fill("#ffda35ff");
    noStroke();
    ellipse(mouseX, mouseY, 200, 10, 5, 0);
    fill(target.targetFill);
    rect(target.x, target.y, target.targetSize);
  } else {
    fill("#f9f511ff");
    strokeWeight(170);
    stroke("#f9f511ff");
    ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);

    fill("#4fb419ff");
    strokeWeight(150);
    stroke("#4fb419ff");
    ellipse(mouseX, mouseY, 200, 200, 600, 600);

    stroke("#000000ec");
    strokeWeight(130);
    fill("#ff0000ff");
    ellipse(mouseX, mouseY, 200, 200, 300, 300);

    stroke("#ff0000ff");
    strokeWeight(5);
    fill("#000000ff");
    ellipse(mouseX, mouseY, 200, 200, 0);

    pop();
  }
}

function shooterPov() {
  createCanvas(640, 480);

  // Give the fly its first random position
 
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
moveFly = fly.x += fly.speed;
 
  if (fly.x > width) {
 resetFly();
  }
   
  

/**
 * Draws the fly as a black circle
 */
drawFly=
  push();
  noStroke();
  fill("#000000");
  ellipse(fly.x, fly.y, fly.size);
  pop();


/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
  fly.x = 0;
  fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
  frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
  // Tongue matches the frog's x
  frog.tongue.x = frog.body.x;
  // If the tongue is idle, it doesn't do anything
  if (frog.tongue.state === "idle") {
    // Do nothing
  }
  // If the tongue is outbound, it moves up
  else if (frog.tongue.state === "outbound") {
    frog.tongue.y += -frog.tongue.speed;
    // The tongue bounces back if it hits the top
    if (frog.tongue.y <= 0) {
      frog.tongue.state = "inbound";
    }
  }
  // If the tongue is inbound, it moves down
  else if (frog.tongue.state === "inbound") {
    frog.tongue.y += frog.tongue.speed;
    // The tongue stops if it hits the bottom
    if (frog.tongue.y >= height) {
      frog.tongue.state = "idle";
    }
  }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
  // Draw the tongue tip
  push();
  fill("#ff0000");
  noStroke();
  ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
  pop();

  // Draw the rest of the tongue
  push();
  stroke("#ff0000");
  strokeWeight(frog.tongue.size);
  line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
  pop();

  // Draw the frog's body
  push();
  fill("#00ff00");
  noStroke();
  ellipse(frog.body.x, frog.body.y, frog.body.size);
  pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  // Get distance from tongue to fly
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  // Check if it's an overlap
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;
  if (eaten) {
    // Reset the fly
    resetFly();
    // Bring back the tongue
    frog.tongue.state = "inbound";
  }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
  if (frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  }
}
