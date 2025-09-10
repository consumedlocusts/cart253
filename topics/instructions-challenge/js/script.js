
"use strict";

/**
 *  Creates the canvas
 */
function setup() {
    createCanvas (800, 400)
    background(0,45,0)
}


/**
 * sets background, draws the eye
*/
function draw() {
//the void
background("brown");

push();
fill(255,0,0);
ellipse(20,20,20,20);
pop();

stroke(255);
strokeWeight(4);
fill(255,121,0);
rect(100,100,50,30);

// the eye
drawEye();


}
