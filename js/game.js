import { generateTableOfEnvironment, drawEnvironment, modifyEnvironment, updateEnvironment } from './gameElement.js';
/*
Prototype V1, the duck do 40/40px and all the configuration is based on this value
Idea : We can split the canva in X part and each part is randomly choosed between road / grass / river
When he jumps the part of the bottom is deleted and on the top you have a new randomly generated part
*/
// Create the canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

//Events listener for keyboard
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawDuck();

}
setInterval(draw, 10);

// Draw ligne to visualise every 40 pixel
function drawLines() {
    for (let y = -1; y <= canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(-1, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    } 
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        duckX -= jumpDistance;
        lastJumpTime = currentTime; 
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        duckX += jumpDistance;
        lastJumpTime = currentTime; 
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        duckY -= jumpDistance;
        lastJumpTime = currentTime;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        duckY += jumpDistance;
         lastJumpTime = currentTime; 
    }
}
// Duck
let duckSize = 40;
//Calcule the top left  position to be center horizontaly for the X
//If we don't decrease the duckSize, the duck will be decaled of his width on the right
let duckX = (canvas.width  - duckSize ) / 2;
// Start from the bottom of the canva and up of 40
let duckY = canvas.height - duckSize  - 40;


// Duck image
let duckReady = false;
let duckImage = new Image();
duckImage.onload = function () {
	duckReady = true;
};
duckImage.src = "images/Duck.png";

function drawDuck(){
    if (duckReady) {
		ctx.drawImage(duckImage, duckX, duckY);
	}
}
//Function to avoid to go out of the canvas
function limitDuckMovement() {
    // limit the horizontal movement
    if (duckX < 0) {
        duckX = 0; //left 
    } else if (duckX + duckSize > canvas.width) {
        duckX = canvas.width - duckSize; //right
    }

    // Vertical
    if (duckY < 0) {
        duckY = 0; //up
    } else if (duckY + duckSize > canvas.height) {
        duckY = canvas.height - duckSize; // bottom
    }
}

//Store the different key
var keys = {};

/*/When the key is pressed it's become true
document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});
//When the key is relaxed, it's become false
document.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});*/

//Variable to avoid the possibility for the duck to slide if someone let the key pressed
let lastJumpTime = 0;
//The distance of each jump
let jumpDistance = 40;

// Update the game when the key is pressed
function update() {
    let currentTime = Date.now();

     // limit to 0,3 second betweeen each jump
    if (currentTime - lastJumpTime > 200) {
        if (keys['ArrowLeft']) {
            duckX -= jumpDistance;
            lastJumpTime = currentTime; 
        }
        if (keys['ArrowRight']) {
            duckX += jumpDistance;
            lastJumpTime = currentTime; 
        }
        if (keys['ArrowUp']) {
            //duckY -= jumpDistance;
            lastJumpTime = currentTime;
            modifyEnvironment(elements);
        }
        if (keys['ArrowDown']) {
            duckY += jumpDistance;
            lastJumpTime = currentTime; 
        }
    }
    //Verify the movement
    limitDuckMovement();
}


//unused for the moment
function checkRiverCollision() {
    // Verify the duck position
    //First condition : Verify if the bottom left of the canard is in the water
    // Second condition : Verify if the top left of the canard is in the water
    if (duckY + duckSize > riverStart  && duckY < riverStart + riverHeight) {
        let onWoodLog = false;
        //Duck is on a wood ?
        for (let i = 0; i < woodLogs.length; i++) {
            let log = woodLogs[i];
            if (duckX + duckSize > log.x && duckX < log.x + log.width && duckY + duckSize > log.y && duckY < log.y + log.height) {
                // move the duck with the wood
                duckX -= logSpeed; 
                onWoodLog = true;
                break; // left because he is on a wood don't need to test again
            }
    }
    if (!onWoodLog) {
        duckX = (canvas.width - duckSize) / 2; 
        duckY = canvas.height - duckSize - 40; 
        console.log("Le canard s'est noyé!");
    }
}
}

// Utiliser la fonction pour générer le tableau d'environnement
let elements = generateTableOfEnvironment(canvas.height);

function drawAllElement(){
    // Start by cleaning the canva, if we don't all the objet in movement are demultiplied
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    // Order is important or the canard will be behind the water for example. 
    
    drawEnvironment(elements, ctx, canvas.width);
    updateEnvironment(elements);
    //drawLines();
    //drawRiver();
    //drawWoodLogs();
    drawDuck();
}
// loop of refresh
function gameLoop() {
    update();
    drawAllElement();
    
    //checkRiverCollision();
    //updateWoodLogs();
    requestAnimationFrame(gameLoop); 
}

// Start the game
//gameLoop();
