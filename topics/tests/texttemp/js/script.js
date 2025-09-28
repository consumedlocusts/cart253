/**
 * Dr
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

//let font;

let startIndex = 0;
let mouseOverlapsText = 0;
let chars =[]; // empty list == group
//let otherFill = ("#f22424ff")
  let startString = "¯\_(ツ)_/¯¯\_(ツ)_/¯"
  let otherString = "1234567890"

//let distance2 = dist (mouseX,mouseY,test2.x,test2.y);
//function preload() { billy= loadImage('/Users/s_hojabr/Documents/GitHub/cart253/topics/texttemp/assets/istockphoto-614744860-612x612.jpg')

//font = loadFont('/assets/SpecialElite-Regular.ttf');
//}

function setup() { 
  createCanvas(640,640);
  background(0)
//textFont(font);
  textSize(36);
textAlign(LEFT, TOP); //idk might change with wrap


//text in columns and rows to cover the canvas using approx width/height of each character
let charWid= textWidth ("M");
let charHi= textAscent()+textDescent();
let horz = floor(width/charWid);
let vert = floor(height/charHi);
let grid = vert*horz
//console.log(startString[1]) 
//loop - repeat code inside the {} 
for(let counter =0; 
  counter<grid; 
  counter =counter+1)
{
  //
  let h = counter%horz;           
  let v = floor(counter/horz); 
  console.log(startString[counter]);
  // add character to list
  chars.push({
    listString: startString[counter%startString.length], 
      x: h*charWid, 
      y: v*charHi,
      otherListString: otherString[counter%otherString.length]
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
     // if overlap
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
    checkInput()
   
    fill("#1d9925b7"); 
    
    for(let counter =0; 
      counter<chars.length; 
      counter =counter+1)
{
   push();
    text(chars[counter].listString, chars[counter].x, chars[counter].y);
    pop()
}
//     if(mouseOverlapsText){ test1.testString = test2.test2String }
//    push();
//     fill("#1d9925b7"); 
// //text(test1, pmouseX, pmouseY, mouseX, mouseY);
// text(test1.testString,test1.x,test1.y)
//   pop(); 
// push();
// fill("#b80b0bff")
// text(test2.testString2,test2.x,test1.y);
}