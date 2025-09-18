

/**
 * Creates the canvas
 */
let string = "¯\_(ツ)_/¯i̴̻̺̿̐͌̈́͌à̸͎͓͚̔͐̕̕m̴̼͉͚̓̈́̾̓̀͝i̸̢̺͑͋̐̕̕͝n̸̼͕͙̽̿͛͑̕ÿ̵͍͙̝́͋͒̈́͊ö̸̙̻̞́̓̒̿͊̒u̴͇̞̫͋̿̕͠r̴͕̝̈́͆͛̔̕͘W̴͎͙͙̐̔̽͒̀́a̴̪̦͙̔͑̽̽̚͠l̵͉͙͖̒̾͌͌͌͆l̵̡͚͖͛̓̒͌̕s̸̢̝̟̔͆͐̓͠͝Δμ∂┏(-_-)┛∑∏​π∫i̴̻̺̿̐͌̈́͌à̸͎͓͚̔͐̕̕m̴̼͉͚̓̈́̾̓̀͝i̸̢̺͑͋̐̕̕͝n̸̼͕͙̽̿͛͑̕ÿ̵͍͙̝́͋͒̈́͊ö̸̙̻̞́̓̒̿͊̒u̴͇̞̫͋̿̕͠r̴͕̝̈́͆͛̔̕͘W̴͎͙͙̐̔̽͒̀́a̴̪̦͙̔͑̽̽̚͠l̵͉͙͖̒̾͌͌͌͆l̵̡͚͖͛̓̒͌̕s̸̢̝̟̔͆͐̓͠͝Ω√≈​ÉΔ¯\_(ツ)_/¯∂∑∏​π∫"
let font; 
let value=fill("#c2c2c2b7"); 

function setup() {
  createCanvas(500, 500);
  
  // A one time background fill
  background("#181819ff");
  
}

function draw() {
  
  push();
  if (mouseIsPressed === true) {
    fill("#c2c2c2b7");
  } else {
  const weight = map(abs(movedX), 0, 30, 10, 6);
  strokeWeight(weight);
  
  const d = dist(mouseX, mouseY, width/2, height/2);

  const strokeColor = map(d, -width/2, width/2, 0, 100);
  stroke(strokeColor);

  }
  
  textSize(20);
  // Draw a line from the previous mouse position to the current one
  text(string, pmouseX, pmouseY, mouseX, mouseY);

  pop(); 
  
}


