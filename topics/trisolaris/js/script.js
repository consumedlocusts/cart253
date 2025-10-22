/**
 * Trisolaris
 * Pippin
 *
 * Draws the three suns of Trisolaris. Poorly.
 */

"use strict";

/**
 * Create the canvas
 */
function setup() {
  createCanvas(600, 400);
}

/**
 * Draw the three suns
 */
function draw() {
  // Sky blue
  background("#87ceeb");

  drawSun(500, 100, 80);
  drawSun(350, 180, 200);
  drawSun(120, 100, 160);
}

/**
 * Draws the first sun
 */

function drawSun(x, y, size) {
  let weight = calcWeightStroke(x, y);

  push();
  strokeWeight(weight);
  stroke("#fcce59ff");
  fill("#f99736");
  ellipse(x, y, size);
  pop();
}
function calcWeightStroke(x, y) {
  const minWeight = 1;
  const maxWeight = 20;
  let d = dist(mouseX, mouseY, x, y);
  let result = map(d, 0, width, maxWeight, minWeight);
  return result;
}
