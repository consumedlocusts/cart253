
"use strict";


let scope2 = { 

  x: 200,
    y:200,
    size: 200
}

let scope = {
  x: 200,
    y: 200,
    size: 150
  }

let pointer = { 
  x: 200,
    y:200,
    size: 50
  }

function setup() {
  createCanvas(400, 400);
 background("#000000");

}

function draw() {

  //scope level 1
  push();
  fill("#0000");
  strokeWeight(40);
  stroke("#f9f511ff");
  ellipse(mouseX,mouseY,scope.x,scope.y,scope.size,scope.size);
pop();

//scope level 2

push();
fill("#0000");
strokeWeight(20);
stroke("#4fb419ff");
ellipse(mouseX,mouseY,scope2.x,scope2.y, scope2.size,scope2.size);
pop();

push();
fill("#0000");
strokeWeight(2);
stroke("#f50000ff");
ellipse(mouseX,mouseY,pointer.x, pointer.y, pointer.size,pointer.size);
pop();

}
