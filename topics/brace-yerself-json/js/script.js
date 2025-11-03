/**
 * brace.yerself.json
 * sama
 *
 * drawing with text
 */
//I want to have the scope pointer x ray the target on contact,
// have the target move randomly around the frame - contact then release mouse then move i mean**
//
"use strict";
let target = {
  targetSize: 50,
  targetFill: "#ff0000ff",
  x: 0,
  y: 0,
};

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

function setup() {
  createCanvas(640, 640);
  background("#000000");
  target.x = random(0, width);
  target.y = random(0, height);
}
function checkInput() {
  let targetDistance = dist(mouseX, mouseY, target.x, target.y);
  const mouseIsOverlapping = targetDistance < target.targetSize / 2;
  const mouseIsMoving = movedX !== 0 || movedY !== 0;

  if (mouseIsOverlapping && mouseIsMoving) {
    target.x = random(0, width);
    target.y = random(0, height);
  } else {
    target.targetFill = "#ffdd00ff";
  }
}

//sorry I am still working on this and plan to change the rectVar to a "target".
function draw() {
  background("#000000");
  checkInput();
  push();

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
// Create initial aliens (randomized positions)
function setupAliens() {
  aliens = [];
  for (let counter = 0; counter < ALIEN_COUNT; counter++) {
    aliens.push({
      x: random(40, width - 40),
      y: random(100, 260),
      size: 18,
      velocity: random([-1, 1]) * alienSpeed,
      alive: true,
    });
  }
}
function draw() {
  background("#0b0f1a");
  drawPlanetLandscape();
  //the alien planet landscape appears after the player starts the game
  if (state === "start") {
    drawStartScreen();
  } else if (state === "scan") {
    drawHiddenScene();
    drawScanMask();
    checkScanFind();
  } else if (state === "play") {
    drawPlayScene();
  } else if (state === "boss") {
    drawBossScene();
  } else if (state === "win") {
    drawWinScreen();
  } else if (state === "gameover") {
    drawGameOverScreen();
  }

  drawPlayerHand();
  //scope scanner, scanning
  if (state !== "start") {
    drawScopeCursor();
  }
}

function drawPlanetLandscape() {
  push();
  //the landscape is an edited image
  pop();
}
function drawStartScreen() {
  push();
  //edited video of the game beginning, a short story tale
  pop();
}
