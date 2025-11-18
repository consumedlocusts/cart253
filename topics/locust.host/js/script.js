/**
 * locust.host
 * sama hojabri
 * 
 * menu set up for the locust storlines
 */

"use strict";


let state = "menu";

function setup() {
    createCanvas(800, 800);
    menuSetup();

    console.log(setup);

  //locustImg.loadPixels();

    
}
/**
 * Display the menu or the current variation
*/
function draw() {
    console.log(draw);
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
    console.log(mousePressed);

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