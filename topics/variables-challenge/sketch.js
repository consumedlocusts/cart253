"use strict";

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
  size:4,
};

function setup() {
  createCanvas(400, 400);
  background("#000000");
}

function draw() {
  background("#000000");
  
  push();
  if (mouseIsPressed === true) {
    fill("#f9f511ff");
  strokeWeight(90);
  stroke("#f9f511ff");
  ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);
  pop();

  //scope level 2

  push();
  fill("#4fb419ff");
  strokeWeight(90);
  stroke("#4fb419ff");
  ellipse(mouseX, mouseY, scope2.x, scope2.y, scope2.size, scope2.size);
  
  stroke("#000000");
  strokeWeight(80)
  fill("#ff0000");
  ellipse(mouseX, mouseY, pointer.x, pointer.y, pointer.size, pointer.size);
  
  } else {
  
  stroke("#ffffff");
  strokeWeight(10);
  line(200,200,200,200,20)

  fill("#f9f511ff");
  strokeWeight(170);
  stroke("#f9f511ff");
  ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);
 
  fill("#4fb419ff");
  strokeWeight(150);
  stroke("#4fb419ff");
  ellipse(mouseX, mouseY, 200,200,600,600);

 
  stroke("#000000");
  strokeWeight(130);
  fill("#ff0000");
  ellipse(mouseX, mouseY, 200,200,300,300);

  stroke("#ff0000ff");
  strokeWeight(5);
  fill("#000000ff");
  ellipse(mouseX, mouseY,200,200,0);
  
  }
 
  //scope level 1
 
  
}
