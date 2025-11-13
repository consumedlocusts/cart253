/**
 * Tarot
 * Pippin Barr
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";
//tarot file
let tarot = undefined;
function preload(){
    tarot =loadJSON("assets/tarot_interpretations.json")
}

/**
 * tbd.
*/
function setup() {
    createCanvas(800,400);

}


/**
 * tbd.
*/
function draw() {
background(0);
const fool= tarot.tarot_interpretations[0].meanings.shadow[0];
push()
textSize(16);
fill("yellow");
text(fool,width/2,height/2 );

}