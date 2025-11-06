/**
 * Lines
 * Pippin Barr
 *
 * A series of lines across the canvas
 */

"use strict";
//let x = width/2;
//let start
//let vertLine;

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
  drawVertLines();
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */

function drawVertLines() {
  background("brown");
  let x = 0;

  while (x < 500) {
    stroke(x / 2);
    line(x, 0, x, height);
    //y +=
    x += 50;
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
