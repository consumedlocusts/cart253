"use strict";
let test1= { testString:"¯(ツ)_/¯", x: 200, y: 200
 }  
let test2=  {test2String:"12345678", x:200, y:200,
}





//let font;

let billy;
let startIndex = 0;
let mouseOverlapsText = 0
let chars =[] // empty list == group
  let startString = "1234567812345678"
  let otherString;

//let distance2 = dist (mouseX,mouseY,test2.x,test2.y);
function preload() { billy= loadImage("assets/8ball.jpg");

//font = loadFont('/assets/SpecialElite-Regular.ttf');
}

function setup() { 
  createCanvas(640,640);
  background(0)
//billy.resize(64,0);//chars per row,column
billy.loadPixels();
//textFont(font);
  textSize(20);
  textAlign(LEFT, BOTTOM);

let charWid= textWidth ("W");
let charHi= textAscent()+textDescent();
let horz = floor(width/charWid);
let vert = floor(height/charHi);
let grid = horz*vert

//console.log(startString[1]) 

for(let counter =0; 
  counter<grid; 
  counter =counter+1)
{
  console.log(startString[counter]);
  // add character to list
    let h = counter%horz; 
    let v = floor(counter/horz);
    let bill = (v * billy.width + h) * 4;
   let r = billy.pixels[bill];//red pixel channel
let g = billy.pixels[bill + 1];//red+1=green pix chanl
let b = billy.pixels[bill + 2];
let brightness = (r + g + b) / 3;
const charPaint = "abL+@W9876j54II0?abc;:JNN "; 
let charIndex = floor(map(brightness, 0, 255, 0, charPaint.length));
let mappedChar = charPaint[charIndex];

  chars.push({
    listString:startString[counter], 
    x: h*charWid, 
    y: v*charHi,
    otherListString:mappedChar 
  })


}

}
function checkInput() {  
    for(let counter =0; 
      counter<chars.length;
      counter =counter+1)
{
  // calculate distance for each letter
    const distance = dist(mouseX,mouseY,chars[counter].x,chars[counter].y); 
     mouseOverlapsText = (distance < 30 );
     // if overlap
     if(mouseOverlapsText){
        console.log(chars[counter].listString)
        // switch to other string
        chars[counter].listString = chars[counter].otherListString
     }
   
}



}

//draws 8ball with ASCII style text
function draw() { 
    background (0);
    checkInput()
   
    fill("#1d9925b7"); 
    
    }
  
   for(let counter =0; 
      counter<chars.length;
      counter =counter+1)
{
   push();
    text(chars[counter].listString, chars[counter].x, chars[counter].y);
    pop()
}

