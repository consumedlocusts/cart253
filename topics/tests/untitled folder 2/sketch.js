let startIndex = 0;
let mouseOverlapsText = 0;
let chars = []; 
let startString = "¯\\_(ツ)_/¯¯\\_(ツ)_/¯";
let otherString = "12345678901234567890";

function setup() { 
  createCanvas(640, 640);
  background(0);
  textSize(36);
  textAlign(LEFT, TOP);

  let charWidth = textWidth("M"); 
  let charHeight = textAscent() + textDescent(); 

  let cols = floor(width / charWidth);
  let rows = floor(height / charHeight);
  let total = cols * rows; // how many characters to fill the canvas

  for (let counter = 0; counter < total; counter++) {
    let col = counter % cols;           // figure out column
    let row = floor(counter / cols);    // figure out row

    chars.push({
      listString: startString[counter % startString.length], 
      x: col * charWidth, 
      y: row * charHeight,
      otherListString: otherString[counter % otherString.length]
    });
  }
}

function checkInput() {  
  for (let counter = 0; counter < chars.length; counter++) {
    const distance = dist(mouseX, mouseY, chars[counter].x, chars[counter].y); 
    mouseOverlapsText = (distance < 30);
    if (mouseOverlapsText) {
      chars[counter].listString = chars[counter].otherListString;
    }
  }
}

function draw() { 
  background(0);
  checkInput();
  fill("#1d9925b7"); 

  for (let counter = 0; counter < chars.length; counter++) {
    text(chars[counter].listString, chars[counter].x, chars[counter].y);
  }
}