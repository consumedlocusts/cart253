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
//let locustImg2;
let locustVid;
let fontForAll;
let song;

function preload() {
  locustImg = loadImage("assets/locust.png");
  //wormFont = loadFont("assets/what.ttf");
  locustVid = createVideo("assets/locusthost22.mp4");
  locusteats = createVideo("assets/locusteats.mp4");
  locusteats.hide();
  locusteats2 = createVideo("assets/locusteats2.mp4");
  locusteats2.hide();
  //locusteats3Vid = createVideo("assets/idk.mp4");
  song = loadSound("assets/bruhwhat.mp3");
  locustVid.hide();
  mountainImg = loadImage("assets/mount.png");
  locustImg2 = loadImage("assets/hi.png");
  console.log("STATE5 IMAGE LOADED"); //do not pmo

  fontForAll = loadFont("assets/what.ttf");
}

function setup() {
  createCanvas(800, 800);
  menuSetup();
  textFont(fontForAll);
  console.log(setup);

  //locustImg.loadPixels();
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
function keyPressed() {
  switch (state) {
    //case "menu": menuMousePressed(); break;
    case "wormwood":
      wormwoodPressed();
      break;
    case "swarm":
      swarmPressed();
      break;
    case "end":
      endPressed();
      break;
  }
}
function mousePressed() {
  switch (state) {
    case "menu":
      menuMousePressed();
      break;
    case "wormwood":
      wormwoodMousePressed();
      break;
    case "swarm":
      swarmMousePressed();
      break;
    case "end":
      endMousePressed();
      break;
  }
}
