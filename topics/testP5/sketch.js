function setup() {
  createCanvas(375,400);
  // Paint the background once.
  background("brown")
  describe('A circle on a brown background. The circle follows the mouse as the user moves, leaving a trail. The circle changes color to green when the user double clicks.');
}

function draw() {

  // Draw circles repeatedly.
  circle(mouseX,mouseY,40)
}
isLooping
// Change the fill color when the user double-clicks.
function doubleClicked() {
  fill('olive');
}

