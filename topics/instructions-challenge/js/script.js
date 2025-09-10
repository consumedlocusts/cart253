
"use strict";

/**
 *  Creates the canvas
 */
function setup() {
    createCanvas (400, 400)

}


/**
 * sets background, draws the eye
*/
function draw() {
//the void
background("#000000");

push();
fill(255,0,0);
ellipse(20,20,20,20);
pop();

stroke(255);
strokeWeight(4);
fill(255,121,0);


// the eye
drawEye();


}

/**
 * draws void eye
 */
function drawEye() {
    //eyeball
      push();
    noStroke();
    fill("white");
    ellipse(200,200,300,25);
    pop();

 

    push();
    noStroke();
    fill("brown");
    ellipse(200,200,200,25);
    pop();

    //retina
    push();
    noStroke();
    fill("#000000");
    ellipse(200,200,25);
    pop();
    
  



}