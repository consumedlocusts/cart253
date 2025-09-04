function setup() {
  createCanvas(400, 400);
  // Paint the background once.
  background("brown")
  describe('A green circle on a brown background. The circle follows the mouse as the user moves, leaving a trail. The circle changes color to green when the user double clicks.');
}

function draw() {

  // Draw circles repeatedly.
  circle(mouseX,mouseY,40)
}


