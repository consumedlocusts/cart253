function setup() {
  // A canvas 600 pixels wide
  // and 400 pixels high.
  createCanvas(600, 400);
}

function draw() {
  // the background sky is gold!
  background(212,184,95);
  // the 1st medium sun in the top corner, 
  // somewhat covering the background
fill(196,133,49); // poo orange
stroke(196,106,49); // nice orange
strokeWeight(20); // radiation of the sun
  circle(100,20,350);
  // the 2nd large sun in the opposing top corner
  // mostly covering the background
  // whilst overlapping the 1st sun
  fill(156,67,42); // orange again
  stroke(196,80,47); // inverted the radiation 
  strokeWeight(14); // ok
  circle(550,0,600);
  //the dragon
fill(95,148,89);
// greener
stroke(43, 84, 39);
// shading the circle outlines
strokeWeight(2)
// kura, the boundless sky
circle(mouseX,mouseY,100);
// temporary dragon
textSize(300);
text("🐉",89,280);
}





