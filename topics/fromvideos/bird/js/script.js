/**
 * bird
 * sama
 * 
 * Hi IT'S GRADED! bird dove flying
 */

"use strict";

let wing2 = {
    x: 110,
    y:470,
    width:40,
    height:20,

    velocity: {
        x:1,
        y:-2
    },
    minVelocity:{ 
        x:-3,
        y:-2
    },
    maxVelocity: {
        x:3, 
        y:2
    },
    
    acceleration: {
        x:0.025,
        y:-0.05
    }

}
let wing = { 
    x: 118,
    y:478,
    width: 40,
    height:20,

    velocity: {
        x:1,
        y:-2
    },
    minVelocity:{ 
        x:-3,
        y:-2
    },
    maxVelocity: {
        x:3, 
        y:2
    },
    
    acceleration: {
        x:0.025,
        y:-0.05
    }

}

let bird = {
    x: 120,
    y:480,
    size: 50,
    velocity: {
        x:1,
        y:-2
    },
    minVelocity:{ 
        x:-3,
        y:-2
    },
    maxVelocity: {
        x:3, 
        y:2
    },
    
    acceleration: {
        x:0.025,
        y:-0.05
    }
}
/**
 * canvas
*/
function setup() {
    createCanvas(640,480)

}

/**
 * move and display berd
*/
function draw() {
    
    background("brown");
    //move 
    bird.velocity.x=bird.velocity.x+bird.acceleration.x;
    bird.velocity.y=bird.velocity.y+bird.acceleration.y;

    bird.velocity.x=constrain(bird.velocity.x,bird.minVelocity.x,bird.maxVelocity.x);
    bird.velocity.y=constrain(bird.velocity.y,bird.minVelocity.y,bird.maxVelocity.y);
    

    bird.x=bird.x+bird.velocity.x;
    bird.y=bird.y+bird.velocity.y;

    //draw
    push();
    fill("#ffffffff");
    stroke(0);
    strokeWeight(1);
    ellipse(bird.x,bird.y,bird.size);
    
    wing.velocity.x=wing.velocity.x+wing.acceleration.x;
    wing.velocity.y=wing.velocity.y+wing.acceleration.y;

    wing.velocity.x=constrain(wing.velocity.x,wing.minVelocity.x,wing.maxVelocity.x);
    wing.velocity.y=constrain(wing.velocity.y,wing.minVelocity.y,wing.maxVelocity.y);
    

    wing.x=wing.x+wing.velocity.x;
    wing.y=wing.y+wing.velocity.y;

    push();
    fill("#ffffffff");
    stroke(0);
    strokeWeight(1);
    ellipse(wing.x,wing.y,wing.width,wing.height);
    pop();

    wing2.velocity.x=wing2.velocity.x+wing2.acceleration.x;
    wing2.velocity.y=wing2.velocity.y+wing2.acceleration.y;

    wing2.velocity.x=constrain(wing2.velocity.x,wing2.minVelocity.x,wing2.maxVelocity.x);
    wing2.velocity.y=constrain(wing2.velocity.y,wing2.minVelocity.y,wing2.maxVelocity.y);
    

    wing2.x=wing2.x+wing2.velocity.x;
    wing2.y=wing2.y+wing2.velocity.y;

    push();
    fill("#ffffffff");
    stroke(0);
    strokeWeight(1);
    ellipse(wing2.x,wing2.y,wing2.width,wing2.height);
    pop();


}