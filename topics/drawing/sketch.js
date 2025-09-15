

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
  
  // A one time background fill
  background("#87ceeb");
}

/**
 * Updates and draws the current bit of paint
 */
function draw() {
  // Figure out all the fun settings!
  
  // Let's use map() to convert between mouse-related numbers
  // and colour and other numbers!
  // https://p5js.org/reference/p5/map/
  
  push();
  // Calculate the stroke weight based on how far the mouse moved
  // We're using abs() (absolute value) to ignore negatives
  // The stroke weight will be thinner the faster (further) the
  // mouse moved
  const weight = map(abs(movedX), 0, 30, 10, 6);
  strokeWeight(weight);
  
  // Calculate the stroke color based on the mouse's distance
  // from the centre of the canvas
  const d = dist(mouseX, mouseY, width/2, height/2);
  // Set the stroke color based on the distance
  // Make the stroke lighter when it's closer to the edges
  const strokeColor = map(d, -width/2, width/2, 0, 100);
  stroke(strokeColor);
  
  // Draw a line from the previous mouse position to the current one
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop(); 
}
