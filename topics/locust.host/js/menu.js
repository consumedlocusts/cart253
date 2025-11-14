/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let charWid, charHi, horz, vert;
let hoverAgain=0;
let lineGrid = [];
let menuStage = 0;
let locustImg;
let titles = [
  {name:"Wormwood", sub:"Shaft of the Abyss, devastation", x:100, y:230},
  {name:"Signs of the Swarm", sub:"Destroyer, destruction", x:100, y:400},
  {name:"The End Times", sub:"God's hate, desolation", x:100, y:600}
];
le6
function preload() {
  locustImg = loadImage("assets/locust.png");
}

function setup() {
  createCanvas(800, 800);
  background(0);

  textSize(20);
  textAlign(LEFT, BOTTOM);

  charWid = 6;
  charHi = 6;
  horz = floor(width / charWid);
  vert = floor(height / charHi);

  locustImg.resize(horz, vert);
  locustImg.loadPixels();

  for(let v = 0; v < vert; v++){
    for(let h = 0; h < horz; h++){
      let idx = (v * locustImg.width + h) * 4;
      let r = locustImg.pixels[idx];
      let g = locustImg.pixels[idx + 1];
      let b = locustImg.pixels[idx + 2];

      let brightness = (r + g + b) / 3;
      let inv = 255 - brightness;

      let thickness = map(inv, 0, 255, 1, 0.05);

      lineGrid.push({
        x: h * charWid,
        y: v * charHi,
        thickness: thickness,
        revealed: false
      });
    }
  }
}

function draw() {
  background(0);
  drawLineLocust();
  drawMenuTitles();
}

function drawLineLocust() {
  for(let cell of lineGrid){
    let d = dist(mouseX, mouseY, cell.x, cell.y);
    if(d < 100){
      cell.revealed = true;
    }

    stroke(255); // white lines
    if (hoverAgain === 0) {
      strokeWeight(cell.revealed ? cell.thickness : 0.05);
      line(cell.x, cell.y, cell.x + charWid*0.8, cell.y);
  }
  else if (hoverAgain === 1) {
    //locustImg.resize(0);
      strokeWeight(cell.revealed ? cell.thickness : 0.2); // bigger
      line(cell.x, cell.y, cell.x + charWid*0.8, cell.y);}

  
}
}

function drawMenuTitles(){
  for(let t of titles){
    let d = dist(mouseX, mouseY, t.x, t.y);

    if(menuStage >= 0){
      fill(255);
      text(t.name, t.x, t.y);
    }

    if(menuStage >= 1 && d < 80){
      fill(180);
      text(t.sub, t.x + 20, t.y + 25);
    }

    if(menuStage == 2 && d < 80){
      fill(255, 40, 40);
      text(t.name, t.x, t.y);
    }
  }
}

function mousePressed(){
  

 if (hoverAgain === 0) {
  
    hoverAgain = 1;
    for (let cell of lineGrid) 
  cell.x = cell.x * (8/ charWid);
cell.y = cell.y* (8/ charHi);
 charWid = 10;
    charHi = 10;
  }
   
   
  
  if(menuStage == 0) menuStage = 1;
  else if(menuStage == 1) menuStage = 2;
}