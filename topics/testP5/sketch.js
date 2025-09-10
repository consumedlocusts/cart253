function setup() {
  createCanvas(375,400);
  // Paint the background once.
  background("brown")
  describe('wormhole, continous, keep drawing and double click for a strange olive');
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