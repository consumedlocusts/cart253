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

function wormwoodDraw() {
    background(0);
    
wormwoodBorder();
    locustVid.loadPixels();
    linelineGrid=[];
   for(let v = 0; v < ticle; v++){
    for(let h = 0; h < rizon; h++){
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
function wormwoodBorder(){
 
    push();

  fill(255);
  textFont(wormFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", width/2, height/10);
  
  
  fill(255);
  textFont(wormFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", width/2, height/1.1);
pop();
 helloObject.drawHello()
 helloObject2.drawHello()
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

