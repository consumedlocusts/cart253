
//drawing with text overlapping & mapping?
//Maybe the text into pixels so i dont have to repeat these functions for each letter
//Or upload as an image and do the same ^^
"use strict";
let test1= { testString:"¯(ツ)_/¯", x: 200, y: 200
 }  
let test2=  {test2String:"12345678", x:200, y:200,
}

let mouseOverlapsText = 0

let distance2 = dist (mouseX,mouseY,test2.x,test2.y);

function setup() { createCanvas(640,640);

}
function checkInput() {  

    const distance = dist(mouseX,mouseY,test1.x,test1.y); 
    console.log(distance)


 mouseOverlapsText = (distance < 5 );

}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() { 
    background (255);
   checkInput()
    if(mouseOverlapsText){ test1.testString = test2.test2String }
   push();
    fill("#1d9925b7"); 
//text(test1, pmouseX, pmouseY, mouseX, mouseY);
text(test1.testString,test1.x,test1.y)
  pop(); 
push();
fill("#b80b0bff")
text(test2.testString2,test2.x,test1.y);
}

