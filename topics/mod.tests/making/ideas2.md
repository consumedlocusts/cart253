hungry
hungry
hungry
hungry
black metal

based on If all you have ever known is winter, an EP by the band begotten - i want to bring the song to life, also adding some of my own text

text baseed story (70% ofthe EP lyrics but most of it i altered) l

text based (small dialog per frame, eg.character is saying something), animated (not too detailed) game that per task complete in a frame reveals a new frame pr "screen" idk background??(each follows chronologically the story).
pixel art and ascii style, gonna use phtoshop to edit some pictures cool, crop them etc maybe rig them (images to animate)
dynamic (the characters or whatnot are not super still) eg. a frame of a face covering/sheilding with a scarf that is blowing in the blizzard (like a flag motion).

** but before all of this just use cool video clips found from outside, edit them to fit the theme, no need for animating yet, final project idea \***

also i maybe want the music to play along the background and change visuals alommg the music time signiture (must do base first)

theme: cold, winter, arctic exploration(franklin), atmosphereic melancholy, such looming feelings

phases;

-a false awakening

-odd still existance in the middle ground

-terms

-consumed and depleted

rough draft for the text (abstract): this is rather cringe

-

at first light...
the shadow of a man filling his prints in the snow

unblinded by our exhauled fog, her Polaris points above to the heavens

-

empty nostalgia, from a life passed

just as tomorrow nil

-

if all you have ever known is winter
lost in useless territory

you will crave revaluation (a warm feeling)

-

and i never told you
we have been dead since a long time.

TEST PHASES

else if (gameState === "empty nostalgia, from a life passed") {
//will loop until the gameState variable is no longer 'end'
phaseStill();
}
else if (gameState === "just as tomorrow nil") {
//will loop until the gameState variable is no longer 'end'
phaseStillOdd();
}
else if (gameState === "if all you have ever known is winter") {
//will loop until the gameState variable is no longer 'end'
phaseBegotten();
}
else if (gameState === "lost in useless territory") {
//will loop until the gameState variable is no longer 'end'
phaseWinterized();
}
else if (gameState === "you will crave revaluation (a warm feeling)") {
//will loop until the gameState variable is no longer 'end'
phaseWarmth();
}
else if (gameState === "and i never told you") {
//will loop until the gameState variable is no longer 'end'
phaseYouNeverKnew();
}
else if (gameState === "we have been dead since a long time.") {
//will loop until the gameState variable is no longer 'end'
phaseSorry();

}
TEST COPY SUBSTRING CODE,REPLACE PHASE NAMES N LETTERS STUFF IM SO TIRED OK
function phaseStill() {
image(stillVid, 0, 0, width, height);
stillLetters = floor(stillTimer / stillSpeed);
stillLetters = min(stillLetters, stillString.length);
text(stillString.substring(0, stillLetters), width/2, height/2);
if (stillLetters < stillString.length) stillTimer++;
}

TEST IMAGE AND VIDEO LOADERS

stillImg = loadImage()
stillOddImg = loadImage()
begottenImg = loadImage()
winterizedImg = loadImage()
warmthImg = loadImage()
youNeverKnewImg = loadImage()
sorryImg = loadImage()

TEST VARIABLES

let stillString; "empty nostalgia, from a life passed"
let stillOddString; "just as tomorrow nil"
let begottenString; "if all you have ever known is winter"
let winterizedString; "lost in useless territory"
let warmthString; "you will crave revaluation (a warm feeling)"
let youNeverKnewString; "and i never told you"
let sorryString;"we have been dead since a long time."

TEST BOLEAN (phase 1)
if (!phaseAwakenStarted) {
awakenVid.loop();
awakenVid.hide();
phaseAwakenStarted = true;
}

TEST BOLEAN (phase 2)
if (!phaseFalseAwakenStarted) {
falseAwakenVid.loop();
falseAwakenVid.hide();
phaseFalseAwakenStarted = true;
}
TEST FOR RECTMODE, from a code source
function drawTextWithBackground(
txt,
x,
y,
padding = 10,
bgColor = [0, 0, 0, 180] //counter im assuming is the cause
) {
textAlign(CENTER, CENTER);
textSize(14);
let w = textWidth(txt) + padding _ 2;
let h = textAscent() + textDescent() + padding _ 2;

fill(bgColor[0], bgColor[1], bgColor[2], bgColor[3]); //hmm
rectMode(CENTER);
rect(x, y, w, h);

fill(255); // text color
text(txt, x, y);
}
