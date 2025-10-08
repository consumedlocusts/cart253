let rectVar = {
  x:200,
  y:20,
  rectSize:50,
  rectFill:255
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255,0,0)
  fill(rectVar.rectFill)
  rect(rectVar.x,rectVar.y,rectVar.rectSize)

  // if mouse x is greater than left of box
  if(mouseX > rectVar.x){
// if mouse x is less than right of box
    if(mouseX < rectVar.x+rectVar.rectSize){
      rectVar.rectFill = 0
  }
  else{
    rectVar.rectFill = 255
  }
}
  else{
    rectVar.rectFill = 255
  }
  
}
