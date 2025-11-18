/**
 * locust.host
 * sama hojabri
 * 
 * storyline 3 set up for the locust storlines
 */

function endSetup() {

}

/**
 * This will be called every frame when the blue variation is active
 */
function endDraw() {
    background("blue");
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function endMousePressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

