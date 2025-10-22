/**
 * Buzzy the parameter
 * Pippin Barr
 *
 * A fly that buzzes around on the canvas
 */

"use strict";

// Our fly that will buzz around
let buzzyTheFly = {
  x: 200,
  y: 200,
  size: 30,
  buzziness: 4,
};
let lazyTheFly = {
  x: 250,
  y: 250,
  size: 20,
  buzziness: 2,
};
let crazyTheFly = {
  x: 300,
  y: 250,
  size: 40,
  buzziness: 10,
};
/**
 * Create a canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Background, move and draw buzzy
 */
function draw() {
  background("#87ceeb");
  moveFly(buzzyTheFly);
  moveFly(lazyTheFly);
  moveFly(crazyTheFly);
  drawFly(buzzyTheFly);
  drawFly(lazyTheFly);
  drawFly(crazyTheFly);
}
function moveFly(fly) {
  fly.x += random(-fly.buzziness, fly.buzziness);
  fly.y += random(-fly.buzziness, fly.buzziness);
}
function drawFly(fly) {
  push();
  noStroke();
  fill(0);
  ellipse(fly.x, fly.y, fly.size);
  pop();
}
