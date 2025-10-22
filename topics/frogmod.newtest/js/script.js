/**
 * frogfrogfrog mod
 * sama hojabri
 *
 * modification and combination of both frogfrogfrog and my original game
 * from a previous project titled "brace.yerself.json"(the .json is intentional in my game's title).
 *
 */

"use strict";
//target replaces the "fly" in this context
let target = {
  targetSize: 50,
  x: random(0, width),
  y: random(0, height),
};

//scopes are called and appear only for/in the first game scene (same as pointer)
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
  //  target.x = random(0, width);
  //  target.y = random(0, height);
}
function draw() {
  drawTarget();
  drawScope(scope);
  drawScope2(scope2);
  drawPointer(pointer);
  targetFound(target);
  scopeZooms(scope);
  scopeZooms(scope2);
  pointerZoom(pointer);
}

function targetFound(target) {
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
function drawTarget(target) {
  push();
  fill("#ffbb44ff");
  noStroke();
  ellipse(target.x, target.y, target.size);
  pop();
}

function drawScope2(scope2) {
  background("#000000");
  //targetFound();
  push();

  //if (mouseIsPressed === true) {

  //scope level 2

  fill("#4fb419ff");
  strokeWeight(90);
  stroke("#4fb419ff");
  ellipse(mouseX, mouseY, scope2.x, scope2.y, scope2.size);

  fill("#4fb419ff");
  strokeWeight(190);
  stroke("#000000ff");
  ellipse(mouseX, mouseY, 140, 20, 0, 20);

  stroke("#000000d3");
  strokeWeight(80);
  fill("#ff0000ff");
  ellipse(mouseX, mouseY, pointer.x, pointer.y, pointer.size);

  fill("#ffda35ff");
  noStroke();
  ellipse(mouseX, mouseY, 10, 200, 0, 5);
  fill("#ffda35ff");
  noStroke();
  ellipse(mouseX, mouseY, 200, 10, 5, 0);
  fill(target.targetFill);
  rect(target.x, target.y, target.targetSize);
}
//  } else {

function drawScope(scope) {
  background("#000000");
  push();
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
