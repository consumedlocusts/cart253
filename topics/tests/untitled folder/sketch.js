let chars = []; 
let startString = "¯\\_(ツ)_/¯¯\\_(ツ)_/¯";
let otherString = "12345678901234567890";

function setup() { 
  createCanvas(640, 640);
  background(0);
  textSize(36);
  textAlign(LEFT, TOP);

  let charWidth = textWidth("M"); // rough width of a character
  let charHeight = textAscent() + textDescent(); // rough height
  let cols = floor(width / charWidth);
  let rows = floor(height / charHeight);

  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let ch = startString[index % startString.length]; 
      let otherCh = otherString[index % otherString.length];
      chars.push({
        listString: ch,
        x: c * charWidth,
        y: r * charHeight,
        otherListString: otherCh
      });
      index++;
    }
  }
}

function checkInput() {  
  for (let i = 0; i < chars.length; i++) {
    const distance = dist(mouseX, mouseY, chars[i].x, chars[i].y); 
    if (distance < 30) {
      chars[i].listString = chars[i].otherListString;
    }
  }
}

function draw() { 
  background(0);
  checkInput();
  fill("#1d9925b7"); 
  for (let i = 0; i < chars.length; i++) {
    text(chars[i].listString, chars[i].x, chars[i].y);
  }
}

