/**
 * locust.host
 * sama hojabri
 *
 * menu set up for the locust storlines
 */
//sliders, slider library, json import
//vectors??

"use strict";

let charWid, charHi, horz, vert;
let hoverAgain = 0;
let lineGrid = [];
let menuState = 0;
///let menuTitle = "locust.host";
let titles = [
  //array of titles for the char index detection when clicking to turn both
  // scripts(seperatestorylines) and colors
  { name: "Wormwood", sub: "Shaft of the Abyss, devastation", x: 100, y: 230 },
  { name: "Signs of the Swarm", sub: "Destroyer, destruction", x: 100, y: 400 },
  { name: "The End Times", sub: "God's hate, desolation", x: 100, y: 600 },
  { name: "locust.host", x: 800 / 1.4, y: 800 / 0.99, textSize: 20 },
];

function menuSetup() {
  //similar setup to ASCII (billy.ball) array, counter(index), and
  // and the brightness usage
  charWid = 6;
  charHi = 6;
  horz = floor(width / charWid); //rowws
  vert = floor(height / charHi); // columns
  locustImg.resize(horz, vert);

  locustImg.loadPixels();
  lineGrid = []; //turns any image into grided line art, using same "brightness" concept but
  //cells and thickness of each line corresponds to each cell (pixel) of image
  //similar to ASCII art (using brightness which is the thickness of lines drawn to match the pixels picked up by indx)

  for (let v = 0; v < vert; v++) {
    for (let h = 0; h < horz; h++) {
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
        revealed: false,
      });
    }
  }
}
function menuDraw() {
  background(0);
  drawLineLocust();
  drawMenuTitles();
}
function drawLineLocust() {
  for (let cell of lineGrid) {
    let d = dist(mouseX, mouseY, cell.x, cell.y);
    if (d < 80) {
      cell.revealed = true; //bolean instead of using this feature again in mousepressed
    }
    let displayThickness =
      hoverAgain === 1 ? map(cell.inv, 0, 255, 4, 0.3) : cell.thickness;
    stroke(255); // white lines, turn thicker when hovered over too
    strokeWeight(cell.revealed ? displayThickness : 0.05); //"if then else" used becasue of the "hoverAgain" (click to change the line thickness of locust whenever, mid draw or not, but must return true)
    line(cell.x, cell.y, cell.x + charWid * 0.8, cell.y);

    //let displayThickness = cell.thickness;
    //if (hoverAgain === 1) {
    //displayThickness = map(cell.inv, 0, 255, 4, 0.3);
    //}
  }
}

function drawMenuTitles() {
  //console.log(drawMenuTitles)

  fill(255);
  textSize(32);
  textAlign(LEFT, BOTTOM);
  //char ind array of title string for clicking the titles to work and not whenever user simply "clicks"
  for (let t of titles) {
    fill(255); //color for titles, changed color when hovered over/press mouse
    text(t.name, t.x, t.y);
    let d = dist(mouseX, mouseY, t.x, t.y);
    if (d < 80) {
      fill(255, 40, 40); // hover color redoen
      text(t.sub, t.x + 20, t.y + 25);
      textStyle(ITALIC);
    }
  }
}
function menuMousePressed() {
  hoverAgain = 1;

  for (let t of titles) {
    let d = dist(mouseX, mouseY, t.x, t.y);
    if (d < 80) {
      if (t.name === "Wormwood") {
        state = "wormwood";
        textStyle(NORMAL);
        wormwoodSetup();
      } else if (t.name === "Signs of the Swarm") {
        state = "swarm";
        swarmSetup();
      } else if (t.name === "The End Times") {
        state = "end";
        endSetup();
      }

      return;
    }
  }
}
function menuTouched() {
  menuMousePressed();
  //return false;
}
