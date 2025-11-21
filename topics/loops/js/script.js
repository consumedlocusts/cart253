/**
 * contemporary square
 * sama
 *
 * A series of lines across the canvas and one blue square
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
  drawLines();
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */

function drawLines() {
  background("brown");

  let x = 0;

  while (x < 500) {
    stroke(x / 2);
    line(x, 0, x, height);
    x += 50;
  }
  let y = 0;
  while (y <= height) {
    stroke(y / 2);
    line(0, y, width, y);
    y += 50;
  }
  for (let ix = 0; ix < width; ix += 500) {
    for (let iy = 0; iy < height; iy += 500) {
      let g = map(ix, 0, height, 0, 255);
      fill(g, 100, 255);
      rect(ix, iy, 50, 50);
    }
  }
}

//function draw() {
//background("pink");
////increases distance by 50, thickness by 25
//stroke(0);
//line(0, 0, 0, height);

//stroke(25);
//line(50, 0, 50, height);

//stroke(50);
//line(100, 0, 100, height);

//stroke(75);
//line(150, 0, 150, height);

//stroke(100);
//line(200, 0, 200, height);

//stroke(125);
//line(250, 0, 250, height);

//stroke(150);
//line(300, 0, 300, height);

//stroke(175);
//line(350, 0, 350, height);

//stroke(200);
//line(400, 0, 400, height);

//stroke(225);
//line(450, 0, 450, height);

//stroke(250);
//line(500, 0, 500, height);
//}
