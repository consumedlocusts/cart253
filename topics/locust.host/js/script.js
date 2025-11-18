/**
 * locust.host
 * sama hojabri
 * 
 * menu set up for the locust storlines
 */

"use strict";


let state = "menu";
let locustImg;
/**
 * Create the canvas
*/
function preload() {
  locustImg = loadImage("assets/locust.png");
}
function setup() {
    createCanvas(800, 800);
    menuSetup();
    locustImg.resize(horz, vert);
  locustImg.loadPixels();
    
}
/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "wormwood":
            wormwoodDraw();
            break;
        case "swarm":
            swarmDraw();
            break;
        case "end":
            endDraw();
            break;
    }
}

function mousePressed(event) {
    switch (state) {
        case "menu":
            menuMousePressed(event);
            break;
        case "wormwood":
            wormwoodMousePressed(event);
            break;
        case "swarm":
            swarmMousePressed(event);
            break;
        case "end":
            endMousePressed(event);
            break;
    }
}