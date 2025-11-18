/**
 * locust.host
 * sama hojabri
 * 
 * menu set up for the locust storlines
 */

"use strict";

let charWid, charHi, horz, vert;
let hoverAgain=0;
let lineGrid = [];
let menuState = 0;
let locustImg;
let titles = [
  {name:"Wormwood", sub:"Shaft of the Abyss, devastation", x:100, y:230},
  {name:"Signs of the Swarm", sub:"Destroyer, destruction", x:100, y:400},
  {name:"The End Times", sub:"God's hate, desolation", x:100, y:600}
];
function preload() {
  locustImg = loadImage("assets/locust.png");
}

function menuSetup() { //similar setup to ASCII (billy.ball) array, counter(index), and 
// and the brightness usage
 console.log(menuSetup)
  textSize(20);
  textAlign(LEFT, BOTTOM);

  charWid = 6;
  charHi = 6;
  horz = floor(width / charWid); //rowws
  vert = floor(height / charHi);// columns
locustImg.resize(horz, vert);
  
 locustImg.loadPixels();
  lineGrid = []; //turns any image into grided line art, using same "brightness" concept but 
  //cells and thickness of each line corresponds to each cell (pixel) of image

  for(let v = 0; v < vert; v++){
    for(let h = 0; h < horz; h++){
      let idx = (v * locustImg.width + h) * 4;
      let r = locustImg.pixels[idx];
      let g = locustImg.pixels[idx + 1];
      let b = locustImg.pixels[idx + 2];

      let brightness = (r + g + b) / 3;
      let inv = 255 - brightness;
//let thickness= map(inv, 0, 255, 1, 0.05);

      lineGrid.push({
        x: h * charWid, //each little row and column
        y: v * charHi,
        thickness: map(inv, 0, 255, 1, 0.05),
        inv: inv,
        revealed: false
      });
    }
  }
}
function menuDraw() {
  console.log(menuDraw)
  background(0);
  drawLineLocust();
  drawMenuTitles();
}
function drawLineLocust() {
 console.log(drawLineLocust)
  for(let cell of lineGrid){
    let d = dist(mouseX, mouseY, cell.x, cell.y);
    if(d < 40){
      cell.revealed = true; 
    }
    let displayThickness = hoverAgain === 1 ? map(cell.inv, 0, 255, 4, 0.3) : cell.thickness;
 stroke(255); // white lines, turn thicker when hovered over too
  strokeWeight(cell.revealed ? displayThickness: 0.05);
    line(cell.x, cell.y, cell.x + charWid*0.8, cell.y);
    //let displayThickness = cell.thickness;
    //if (hoverAgain === 1) {
      //displayThickness = map(cell.inv, 0, 255, 4, 0.3);
    //}
  }
 
}

function drawMenuTitles(){
   console.log(drawMenuTitles)
   fill(255);
  textSize(32);
  textAlign(LEFT, BOTTOM);
  for(let t of titles){
    fill(255); //color for titles, changed color when hovered over/press mouse 
    text(t.name, t.x, t.y);
    let d = dist(mouseX, mouseY, t.x, t.y);
if (d < 80) {
      fill(180);  //this is hover color for subtitles
      text(t.sub, t.x + 20, t.y + 25);
      
    }
}
}

function menuMousePressed() {
hoverAgain = 1; 
//mousePressed();
//if(menuState == 0) menuState = 1; else if(menuState == 1) menuState = 2;
for (let t of titles) {
    let d = dist(mouseX, mouseY, t.x, t.y);
    if (d < 50) {
      if (t.name === "Wormwood") state = "wormwood";
      else if (t.name === "Signs of the Swarm") state = "swarm";
      else if (t.name === "The End Times") state = "end";

    if (d < 80){
    state = t.target; // set global state to target scene
      // Call setup function of the scene
      switch(state){
        case "wormwood": wormwoodSetup(); break;
        case "swarm": swarmSetup(); break;
        case "end": endSetup(); break;
      
  } //Prettier deciding not to work 
     return; //menuState = (menuState + 1) % 3;
}
}
}
}

