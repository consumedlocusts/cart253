/**
 * tired me2
 * sama
 * 
 * Drawing with altering one text string into another
 * Each string is still joined, but "ungrouped" to be altered 
 * per character in the string(image/pixel variation)
 */
//note: i keep getting columns and rows mixed up in the notes sorry 
"use strict";
let font;
let sama;
let startIndex = 0;
let mouseOverlapsText = 0;
let chars =[]; // empty list == group
  let startString = "1234567890123456789012345678901234567890"
  let otherString; 

function preload() {sama = loadImage('assets/code.png');
font = loadFont('assets/Bomb!.ttf');
}

function setup() { 
  createCanvas(640,640);
  background(0)

sama.resize(64,0);//chars per row,column
sama.loadPixels();
textFont(font);
textSize(15);
textAlign(LEFT, TOP); //align as one would read/type text 


//text in columns and rows to cover the canvas using approx width/height of each character
let charWid= textWidth ("W"); //after prolonged research on why this wasnt working it was because
//it needs the widest char of all time not just in my text for an average
let charHi= textAscent()+textDescent(); //this is the height of each character, it differs per letter 
let horz = floor(width/charWid); //floor rounds down to the nearest integer, making the row a whole number because i need array index 
let vert = floor(height/charHi); //floor also makes it so they dont overlap
let grid = horz*vert//basic area 

//loop - repeat code inside the {} 
//this loop is considering the individual details of the above
for(let counter =0; 
  counter<grid; 
  counter =counter+1)
{
  //each sole column and row but seperated so i can map the pixels of me to them
  let h = counter%horz;           
  let v = floor(counter/horz); //hours googling this calc still made no sense 
  console.log(startString[counter]);
  //how these pixels shall spawn 
let me = (v * sama.width + h) * 4; //where the first coordinate (at the first row, offset column) to allow
// my pixels to be arrayed , * 4 because each pixel is made up of 4 components: RGBA (photoshop theory)
let r = sama.pixels[me];//red pixel channel
let g = sama.pixels[me + 1];//red+1=green pix chanl
let b = sama.pixels[me + 2];//red+2=blue pix chanl
//sama.updatePixels();
//average of the rbg scale to get grey scale, "brightness"index
//is just whichever char's density is closest to the actual "pixel size"(rgb channel)
let brightness = (r + g + b) / 3;
const charPaint = "@#W$9876543210?!abc;:+=-,._ "; 
// any chars i want will get "greyscaled" into my image(dont forget space/empty)!!
let charIndex = floor(map(brightness, 0, 255, 0, charPaint.length)); //mapping...
//if (charIndex >= charPaint.length) charIndex = charPaint.length - 1;
let mappedChar = charPaint[charIndex];
  // add character to list
  chars.push({
    listString: startString[counter%startString.length], //length because of text orientation
      x: h*charWid, 
      y: v*charHi,
      otherListString: mappedChar 
    });
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
     // if hovering with mouse
     if(mouseOverlapsText){
        console.log(chars[counter].listString)
        // switch to other string
        chars[counter].listString = chars[counter].otherListString
        
     }
   
}

}

//draws the text 
function draw() { 
    background (0);
    checkInput();

    for (let counter = 0; 
        counter < chars.length; 
        counter = counter + 1) {
    if (mouseOverlapsText && mouseIsPressed) {
      fill("#c60606ff"); // red when hovered + pressed 
    } 
    else if (chars[counter].mouseOverlapsText) {
      fill("#1d9925b7"); 
    } 
    else {
       fill("#1d9925b7"); 
    }
   
    text(chars[counter].listString, chars[counter].x, chars[counter].y);
    
  }
   
}
   
    

//reference youtube: https://www.youtube.com/watch?v=55iwMYv8tGI
//reference youtube: https://www.youtube.com/watch?v=4IyeLc6J1Uo