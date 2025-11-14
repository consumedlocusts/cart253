/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let charWid;
let charHi;
let horz;
let vert;
let lineGrid=[];
//let chars = [];
let menuStage=0;
let locustImg;
//let startIndex = 0;
//let mouseOverlapsText = 0;
 // empty list == group
let titles=[
    {name:"Wormwood",
        sub: "Shaft of the Abyss, devastation", 
        x: 200, y: 200 },
    {name:"Signs of the Swarm", 
        sub:"Destroyer, destruction", x: 200, y: 260},
   {name:"The end times",
    sub:"God's hate, desolation", x: 200, y: 320}
]

function preload() {
  locustImg = loadImage("assets/locust.png");
}

function setup() {
  createCanvas(800, 800);
  background(0);

  //textFont(font);
  textSize(2);
  textAlign(LEFT, BOTTOM); //align as one would read/type text

  //text in columns and rows to cover the canvas using approx width/height of each character
  charWid = textWidth("W"); //after prolonged research on why this wasnt working it was because
  //it needs the widest char in the alphabet of all time not just in my text for an average
  charHi = textAscent() + textDescent(); //this is the height of each character, it differs per letter
  horz = floor(width / charWid); //floor rounds down to the nearest integer, making the row a whole number because i need array index
  vert = floor(height / charHi); //floor also makes it so they dont overlap
  let grid = horz * vert; //basic area

  locustImg.resize(horz, vert); //chars per row,column
  locustImg.loadPixels();

  //loop - repeat code inside the {}
  //this loop is considering the individual details of the above
  for (let counter = 0; counter < grid; counter = counter + 1) {
    //each sole column and row but seperated so i can map the pixels of me to them
    let h = counter % horz;
    let v = floor(counter / horz);
    //console.log(startString[counter]);

    //how these pixels shall spawn
    let me = (v * locustImg.width + h) * 4;
    let r = locustImg.pixels[me]; //red pixel channel
    let g = locustImg.pixels[me + 1]; //red+1=green pix chanl
    let b = locustImg.pixels[me + 2]; //red+2=blue pix chanl

    let brightness = (r + g + b) / 3;
    let thickness =map(brightness, 0,255,4,0.3);

    //const charPaint = "Ñ@#W$9876543210?!abc;:+=-,._  ";
    //let charIndex = floor(map(brightness, 0, 255, 0, charPaint.length));
    //let mappedChar = charPaint[charIndex];
    // add character to list
    lineGrid.push({
      //listString: startString[counter % startString.length],
      x: h * charWid,
      y: v * charHi,
      thickness: thickness,
      revealed: false
    });
  }
}
function checkInput() {
  backgroun(0);
  drawLineLocust();
  drawMenuTitles();
}

//draws the text
function drawLineLocust() {
 

  for (let cell of lineGird) {
    // calculate distance for each letter
    let d = dist(mouseX, mouseY, cell.x, cell.y);
   
    //hovering with & pressing reveals a red "transparencey" over the drawn "distance" with mouse
    if (d<40) {
      cell.revealed=true;

    }

    stroke(220);
    strokeWeight(cell.revealed ? cell.thickness: 0.2);
    lineGrid(cell.x,cell.y,cell.x+charWid*0.8,cell.y);

  }
}
function drawMenueTitles(){
    for (let t of titles){
        let d = dist(mouseX, mouseY, t.x, t.y);
if (menueStage>=0){
    fill();
    text(t.name,t.x,t.y);

}
if ( menuStage >=1&&d<120){
    fill(180);
      text(t.sub, t.x + 20, t.y + 25);
    }
    if(menuStage == 2 && d < 120){
      fill(255, 40, 40);
      text(t.name, t.x, t.y);
    }
}
    }
function mousePressed(){
  if(menuStage == 0){
    menuStage = 1;
    return;
  }
  if(menuStage == 1){
    menuStage = 2;
    return;
  }

}