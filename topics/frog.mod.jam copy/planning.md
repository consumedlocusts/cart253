# Planning

## Starting point

The initial idea:

> DOOM style first POV shooter game

## Experience design

The experience:

> As styled likewise of a classic first POV (browser) game, the user is prompted to begin by clicking to start, then the user is tasked with saving their planet by defeating the evil boss alien (who appears after the user kills 8 of his minions). Defeat the minions, defeat the boss, beware of green goo, drink the potions, do so quickly.

## Breaking it down

Basic things to do:

- Draw everything as sprite/sprite inspired images
- Draw the start screen as a video pre-edited in after affects to mimic the style of pixel art
- Move the hand (which is the user) holding the gun (mouseX,mouseY) click to shoot, most of the actions are done by clicking
- Move the minions (random)
- Figure out if the laser hits 8 minions to then initialize the boss battle

Questions:

- What do the aliens look like?
  - sprite images
- How does the user control the hand/shooter?
  - User controls hand with the mouse position, just to the left and right
  - User launches the lasers with a mouse click
- How do the minions move?
  - The minions start on the left at a random y position, and moves to the right in a line,
- What does the lserlook like?
  - A red line coming out of the gun...
- What happens if the user doesn't kill the few minions need to proceed?
  - If the minion goes off the right side, it just resets to a new random y on the left
- What does it all look like on the screen? Layout?
  - hand/gun at the bottom, minions moving across, laser shooting out of gun

## The program starts to form....

What is there?

- The opening scene
  - a video plays in the background of some text saying/instructing the user to begin the game "PRESS ANY BUTTON TO START"
- The scene then changes entirely to the actual game
  - Position and the size of hand below
  - minions above noticbely (but not too much) smaller than the hand

```
hand/gun
    hand
        x
        y
        size
    gun
        x
        y
        size
        speed
        state

minion(s)
    x
    y
    size
    speed
```

Game states:

- "start" : intro video/starting screen
- "scan" : scope overlay scanning for the alien (dark mask)
- "play" : main wave gameplay (small aliens)
- "boss" : boss fight mode
- "win" : victory screen
- "gameover" : lose screen
