/**
 * locust.host
 * sama hojabri
 * 
 * storyline 1 set up for the locust storlines
 */

let carW, carH, rizon, ticle;

let linelineGrid = [];

let helloObject;
let helloObject2;

// testing first factor of type writer style generation
let wormwoodStringTimer = 0;
let wormwoodLettersToShow = 0;
let wormwoodSpeedFactor = 3; //types 3 characters at a time, sourced from a code
let wormwoodStarted = false; //for testbolean,not ready
let wormwoodString = " And the fifth angel blew his trumpet, ";
let wormState = 0

//inspired from a word fall code, the ltters fall downwards an leave a trail
let fallText = "and I saw a star fallen from heaven to earth, and he was given the key to the shaft of the bottomless pit";
let fallWords = [];
let particles = [];
let wordFallStart = false;
let trails = [];

function wormwoodSetup() { 
    helloObject=new hello (width/10, height/10) 
     helloObject2=new hello (width/1.1, height/1.1)
     locustVid.loop();
     textSize(20);
  textAlign(LEFT, BOTTOM);

  carW = 5;
  carH = 5;
  rizon = floor(width / carW); //rowws
  ticle = floor(height / carH);// columns
//locustVid.resize(700, 700);

}
//likewise of gamestates
function wormwoodDraw() {
   background(0)
  if (wormState === 0) {
    wormwoodOpening();
    wormwoodGrid();
  } else if (wormState === 1) {
   wordFall();
  } //else if (gameState === 3) {
   //wormwoodMid2();
  //} else if (gameState === 4) {
    //wormwoodClosing();
  //} 
}
function wormwoodOpening(){ //based on a seperate code of mine that made a video player with "typewriter" animated text appearing
//just a test
    wormwoodLettersToShow = floor(
    wormwoodStringTimer / wormwoodSpeedFactor
  );
  wormwoodLettersToShow = min(
    wormwoodLettersToShow,
    wormwoodString.length
  );

  text(
    wormwoodString.substring(0, wormwoodLettersToShow),
    width / 2,
    height / 2
  );

  if (wormwoodLettersToShow < wormwoodString.length) {
    wormwoodStringTimer++;
  }
}
function wormwoodGrid() {
    
//wormwoodBorder();

    locustVid.loadPixels();
    linelineGrid=[];
    let step =3; //it processes pixels "per this many times" instead of ++ hense why im counting like += step instead of ++ pixels h and v
   for(let v = 0; v < ticle;  v += step){
    for(let h = 0; h < rizon;  h += step){
      let idx = (v * locustVid.width + h) * 4;
      let r = locustVid.pixels[idx];
      let g = locustVid.pixels[idx + 1];
      let b = locustVid.pixels[idx + 2];

      let brightness = (r + g + b) / 3;
      let inv = 255 - brightness;
//let thickness= map(inv, 0, 255, 1, 0.05);

      linelineGrid.push({
        x: h * carW, //each little row and column
        y: v * carH,
        thickness: map(inv, 0, 255, 7, 0.05),
        inv: inv,
        revealed: false
      });
    }
  }
    //image(locustVid, 0, 0, width, height);
    //console.log(linelineGrid.length);
    
    for(let cell of linelineGrid){
      cell.revealed = true; //bolean instead of using this feature again in mousepressed
 stroke(255); // white lines, turn thicker when hovered over too
// let cellThickness= 0.05
  strokeWeight(cell.thickness);//"if then else" used becasue of the "hoverAgain" (click to change the line thickness of locust whenever, mid draw or not, but must return true)
   // console.log(cell.thickness);
  line(cell.x, cell.y, cell.x + carW*0.8, cell.y);
}

}
function setupWordFall(){
    //new function for word fall, styling it
 textSize(26);
  textAlign(LEFT, TOP);
  fallWords = []; //per word in the string oh god im only on the second verse
  trails = []; //array for the vine lines

  //border for ye lines to not go out of bounds

    let x = width * 0.05;
  let y = height * 0.9;
  let maxWidth = width * 0.9;
  let lineHeight = 40;
  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    let tw = textWidth(w + " ");

}
}
function keyPressed() {
    if (wormState === 0 && wormwoodLettersToShow >= wormwoodString.length) {
      wormState =1;
    wormwoodStringTimer = 0;
  }
  else if (
    wormState === 1 &&
   wormwoodGrid
  ) {

 locustVid.loop();
  }

}
function wormwoodMousePressed() {
  state = "menu";
  menuSetup();
}

class hello {
    constructor(x,y){
        this.x=x
        this.y=y

    }
    drawHello(){
        rect(this.x, this.y, 20, 20)
        
    }
}

