"use strict";
let rectVar = {x:200,
  y:20,
  rectSize:50,
  rectFill:"#ff0000ff"}

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
  createCanvas(640, 640);
  background("#000000");
}
//sorry I am still working on this and plan to change the rectVar to a "target".
function draw() {
  background("#000000");
 
  fill(rectVar.rectFill)
  rect(rectVar.x,rectVar.y,rectVar.rectSize)

  // if mouse x is greater than left of box
  if(mouseX > rectVar.x){
// if mouse x is less than right of box
    if(mouseX < rectVar.x+rectVar.rectSize){
      rectVar.rectFill = 0
  }

}
  else{
    rectVar.rectFill = 255
  }
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
  ellipse(mouseX, mouseY,140,20,0,20);

  stroke("#000000d3");
  strokeWeight(80)
  fill("#ff0000ff");
  ellipse(mouseX, mouseY, pointer.x, pointer.y, pointer.size, pointer.size);
   
  fill("#ffda35ff");
 noStroke();
  ellipse(mouseX, mouseY, 10, 200, 0, 5);
fill("#ffda35ff");
 noStroke();
ellipse(mouseX, mouseY, 200, 10, 5, 0);


  } else {


  fill("#f9f511ff");
  strokeWeight(170);
  stroke("#f9f511ff");
  ellipse(mouseX, mouseY, scope.x, scope.y, scope.size, scope.size);
 
  fill("#4fb419ff");
  strokeWeight(150);
  stroke("#4fb419ff");
  ellipse(mouseX, mouseY, 200,200,600,600);

 
  stroke("#000000ec");
  strokeWeight(130);
  fill("#ff0000ff");
  ellipse(mouseX, mouseY, 200,200,300,300);

  stroke("#ff0000ff");
  strokeWeight(5);
  fill("#000000ff");
  ellipse(mouseX, mouseY,200,200,0);
  
  pop();

  }
 
  
}
