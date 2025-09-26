/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
let test1= { testString:"¯(ツ)_/¯", x: 200, y: 200
 }  
let test2=  {test2String:"12345678", x:200, y:200,
}
let font;
let mouseOverlapsText = 0
let chars =[] // empty list == group
  let startString = "¯(ツ)_/¯"
  let otherString = "_.a$$$$$a.    ,$$$$$$$$$$$$$. ,$$$$$$$$$$$$$$$$$"



//let distance2 = dist (mouseX,mouseY,test2.x,test2.y);
function preload() {
  font = loadFont('/assets/SpecialElite-Regular.ttf');
 // billy= loadImage ()
}

function setup() { 
  createCanvas(640,640);
  background(0)
textFont(font);
  textSize(36);


//console.log(startString[1]) 
//loop - repeat code inside the {} 7 times
for(let counter =0; 
  counter<startString.length;
  counter =counter+1)
{
  console.log(startString[counter]);
  // add character to list
  chars.push({
    listString:startString[counter], 
    x:50, 
    y:counter*50,
    otherListString:otherString[counter]
  })


}

}
function checkInput() {  
    for(let counter =0; 
  counter<startString.length;
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

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() { 
    background (0);
    checkInput()
   
    fill("#1d9925b7"); 
    for(let counter =0; 
  counter<startString.length;
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