/**
 * UFO on a Dark Night, blackhole version
 * Pippin Barr and sama
 * 
 * A UFO. On a dark night. It just sits there? no it devours 
 */

"use strict";

// Our UFO
let ufo = {
    // Position
    x: 200,
    y: 375,
    // Dimensions
    width: 150,
    maxWidth: 400,
    height: 50,
    maxHeight: 400,
    // Fill colour (greyscale)
    fill: 255
};

// Shade to fill the sky (background)
let skyShade = 0;

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
 * Displays a UFO
*/
function draw() {
    // Display the sky
    background(skyShade=skyShade+1);

ufo.y=ufo.y-2;
ufo.x=ufo.x+0.5;
ufo.fill=ufo.fill*0.995;
ufo.width=ufo.width/1.005;
ufo.height=ufo.height/1.005;
    // Draw the UFO xbased on its properties, mouseX and Y added
    push();
    fill(ufo.fill);
    noStroke();
    ellipse(mouseX,mouseY,ufo.x, ufo.y, ufo.width, ufo.height);
    pop();
}