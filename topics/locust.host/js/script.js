/**
 * locust.host
 * sama hojabri
 * 
 * menu set up for the locust storlines
 */

"use strict";


let state = "menu";
 let wormFont;
let locustImg;
let locustVid;
let song;

function preload() {
  locustImg = loadImage("assets/locust.png");
   wormFont = loadFont("assets/what.ttf");
   locustVid = createVideo("assets/locusthost22.mp4");
   song = loadSound("assets/bruhwhat.mp3");
locustVid.hide();
}

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
  switch(state){
    case "menu": menuDraw(); break;
    case "wormwood": wormwoodDraw(); break;
    case "swarm": swarmDraw(); break;
    case "end": endDraw(); break;
  }
}

function mousePressed() {
  switch(state){
    case "menu": menuMousePressed(); break;
    case "wormwood": wormwoodMousePressed(); break;
    case "swarm": swarmMousePressed(); break;
    case "end": endMousePressed(); break;
  }
}