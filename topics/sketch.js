
let string = "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
"░░░░░░░░░░░░▄▄▄█████████▄▄▄▄░░░░░░░░░░░░"
"░░░░░░░░░▄████████████████████▄░░░░░░░░░"
"░░░░░░▄██████████████████████████▄░░░░░░"
"░░░░▄███████████████▀▀▀▀▀▀▀▀███████▄░░░░"
"░░░▄██████████████▀░░▄▀▀▀▀▄░░▀██████▄░░░"
"░░████████████████░░░▀▄▄▄▄▀░░░████████░░"
"░█████████████████░░░█░░░░█░░░█████████░"
"▄█████████████████▄░░▀▄▄▄▄▀░░▄█████████░"
"████████████████████▄▄▄▄▄▄▄▄████████████"
"████████████████████████████████████████"
"████████████████████████████████████████"
"████████████████████████████████████████"
"░██████████████████████████████████████░"
"░█████████████████████████████████████▀░"
"░░████████████████████████████████████░░"
"░░░▀████████████████████████████████▀░░░"
"░░░░▀██████████████████████████████▀░░░░"
"░░░░░░▀██████████████████████████▀░░░░░░"
"░░░░░░░░░▀████████████████████▀░░░░░░░░░"
"░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"


let hoverRadius = 30;

function setup() {
  createCanvas(400, 400);
  textSize(2);
  textAlign(CENTER);

  let xPos = width / 2;
  let yPos = height / 2;
  for (let i = 0; i < textToDisplay.length; i++) {
    letters.push({
      char: textToDisplay[i],
      x: xPos,
      y: yPos,
      isHovering: false
    });
    // Adjust xPos for the next letter
    xPos += textWidth(textToDisplay[i]);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let d = dist(mouseX, mouseY, letter.x, letter.y);

    if (d < hoverRadius) {
      letter.isHovering = true;
    } else {
      letter.isHovering = false;
    }

    if (letter.isHovering) {
      fill(0, 255, 0); // Green when hovering
      textStyle(BOLD);
    } else {
      fill(0, 0, 0);   // Black by default
      textStyle(NORMAL);
    }
    text(letter.char, letter.x, letter.y);
  }
}
