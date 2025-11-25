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
let wordFallStart = false;
let trails = [];
//third verse lol
let particles=[];
let textPit;
let fade;
let fadeAmount = 1
//wormwoodPitText=" He opened the shaft of the bottomless pit, 
//and from the shaft rose smoke like the smoke of a great furnace, and the sun and the air were darkened with the smoke from the shaft.
//"
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
  } else if (wormState === 2) {
   wormWordPit();
  } //else if (gameState === 3) {
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
let words = fallText.split(" "); //why
    let x = width * 0.05;
  let y = height * 0.9;
  let maxWidth = width * 0.9;
  let lineHeight = 40;
  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    let tw = textWidth(w + " ");
    if(x+tw >maxWidth){ //actual restrain on border string
 x = width * 0.05;
      y += lineHeight;
    }
    
fallWords.push({
      word: w,
      x: x,
      y: -random(50, 200),
      targetY: y,
      landed: false,
      trail:[]});
      
      x += tw; //which i dont know why the x pos is directed at the text width 
}
wordFallStart=true;
}
function wordFall(){
    updatePulseLInes();
    //draw the lines before the rest as a backgroudn and the trails and vines of text as they fall down
    stroke(255);
    noFill();
    for (let w of fallWords){
        if (!w.landed){
            let prePosition = createVector(w.x,w.y); //i dont really understand how vector works 
            w.y += 1 + random(0,7) //spped of falling 
            //noise 
            let timeOffset = frameCount *0.01; //test out these numbas later
let nx = noise(w.x * 0.01, w.y * 0.01, timeOffset);
      let ny = noise(w.y * 100, w.x * 100, timeOffset+100);
      //mapping and leaving a trail in form of offset 
      let offsetX = map(nx, 0, 1, -40, 40);
      let offsetY = map(ny, 0, 1, -15, 15);
      w.trail.push({x: w.x + offsetX, y: prePosition.y + offsetY});
      // limit trail length to end of the screeen
      if (w.trail.length > 600) w.trail.shift();

      // check landing
      if (w.y >= w.targetY) {
        w.y = w.targetY;
        w.landed = true;
      }
    }
    //draw organic curved lines instead of straight
        noFill();
        stroke(255, 180);
        strokeWeight(1.5);
        beginShape();
        for (let p of w.trail) {
            curveVertex(p.x, p.y); // curveVertex makes smoother organic curves, less ugly 
        }
        endShape();
//word chiling above the lines
fill(255);
    noStroke();
    text(w.word, w.x, w.y);
    //pulsing lighting fast lines back up again 
    //soon
        }
    }
function pulseWord(word){
    let nLines=floor(random(3,6));
    //im so tired of i
    for (let i =0; i <nLines; i++){
let startX = word.x + random(-20, textWidth(word.word) + 20); // start near but not too close to word
        let startY = word.targetY;
    }
    ///pulse line array
    let pulseLine = {
            points: [],
            currentY: startY,
            speed: random(8, 15), // faster upward movement
            thickness: random(2, 5), // thicker wilder lines
            offsetSeed: random(1000), // unique offset for each line
            life: 255,
            baseX: startX
        };
        pulseLine.points.push({x: startX, y: startY});
        //push push push opush pushpsushpsush
        pulseLinesArray.push(pulseLine);
}
function updatePulseLines() {
//you wouldnt be able to guess, this is for the reverse btw
for (let i = pulseLinesArray.length - 1; i >= 0; i--) {
        let line = pulseLinesArray[i];
line.currentY-=line.speed
let timeOffset = frameCount * 0.02;
let nx = noise(line.baseX * 0.008, line.currentY * 0.008, timeOffset + line.offsetSeed);

}
}
function setupWordPit(){
    //var is accessed outside of these for loops, thats why my let wasnt working, im not used to it
    fade =0;
    for(var i=0;i<width;i+=20){
        for (var hole=0;hole<height;hole+=5){
            particles.push({
                x:1,
                y:hole,
                clr: color(mouseX*0.1,mouseY*0.4+frameCount,250,250)
            })
        }
    }
}
function wormWordPit(){
    background(100,70,40,0.07);
    for(var i=0; i<particles.length; i++){
        var p=particles[i];
        fill(mouseX*0.5,mouseY*0.5+frameCount,fade)
        if (fade<0) fadeAmount=1;
        if (fade>255) fadeAmount=-10;
        fade+= fadeAmount
        //replace ellipse with the text string 
ellipse(p.x+30 ,p.y+30 ,1);
		 p.x+=(noise(p.x/200,p.y/200,300)-0.6)*3;
		 p.y+=(noise(p.x/200,p.y/200,300)-0.5)*3;
    }
}
function keyPressed() {
    if (wormState === 0 && wormwoodLettersToShow >= wormwoodString.length) {
      wormState =1;
    wormwoodStringTimer = 0;
//for now
locustVid.pause(); // stopping the video if needed (right now yes)
    setupWordFall();
  }
  if (wormState === 1 && fallWords.every(w => w.landed)){
wormState=2;
setupWordPit();

  }
  //else if (
    //wormState === 1 &&
   //wormwoodGrid
  //) {
// locustVid.loop();
  //}
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

