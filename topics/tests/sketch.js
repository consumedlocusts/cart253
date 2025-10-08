// face position variables
let faceX = 200;
let faceY = 200;

/* goal: we want to have a face with some eyes, nose, spots etc ... 
that can all move together -> so we want ONE ref point that then all the other x and y positions are positioned RELATIVE to that ref point.
EXAMPLE: we want to have a spot on the face that is at the lower left:
faceX and faceY are our chosen ref point - the CENTRE of the face
 so we create variables spotX and spotY that are RELATIVE to faceX and faceY:*/

let spotX = faceX - 20; // the -20 is the OFFSET from faceX on x
let spotY= faceY +10; // the +10 is the OFFSET from faceY on y

/**
 * 
 */
function setup() {
    createCanvas(500,500)
}

/**
 * 
 */
function draw() {
    background(0);
    noStroke();
    // draw face
    push();
    fill(153, 255, 204);
    ellipse(faceX,faceY, 100,100)
    pop();

    // spot
    push();
    fill(51, 153, 255);
    ellipse(spotX,spotY, 20,20);
    pop();

} 
