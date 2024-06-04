import { Duck } from "./Duck.js";
import { Grass, Road, River } from "./Environment.js";
import { drawScore, setScores, storedScore, getHighestScore } from "./score.js";

// Canvas creation
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasHeight = canvas.height;
let canvasWidth = canvas.width;
ctx.strokeStyle = "black";
ctx.lineWidth = 1;

// Game variables and state
let phase = "start";
let screenOffset = 0;
let obstacles = [];
let environments = [];
let score = 0;
let user = "testUser";
let keys = {};
let rnd = Math.random;
let interval;
let woodDirection = false; // false = left, true = right to keep track of the direction of the wood
let isGameOverDisplayed = false; // Flag to track game over screen display

// Configuration
// Keyboard event listener
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (isGameOverDisplayed) {
      reset();
      isGameOverDisplayed = false; // Hide the game over screen
    } else if (!duck.isDuckAlive) {
        reset();
    }
  } else {
    keys[event.key] = true;
  }
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

// Duck configuration and creation
let duckSize = 40;
let duckImage = new Image();
duckImage.src = "./images/Duck.png";
const duck = new Duck(duckSize, duckImage, 40, 280);

// Game loop
reset();
function draw() {
  clearFullCanvas();
  checkDuckState();
  duck.duckMove(keys);
  duck.checkCollision(environments);
  moveEnvironment(1);
  drawEnvironment();
  duck.draw(ctx);
  drawScore(ctx, duck);
  interval = setInterval(draw, 10);
  
  if (phase === "end" && !isGameOverDisplayed) {
    setScores(user, duck._score);
    showEndGame();
    clearInterval(interval);
  }

  if (isGameOverDisplayed) {
    showEndGame();
  }
}

function generateTableOfEnvironment() {
  for (let y = -80; y < canvasHeight; y += 40) {
    if (y >= canvasHeight - 320) {
      environments.push(new Grass(y));
    } else {
      environments.push(generateRandomEnvironment(y));
    }
  }
}

function generateRandomEnvironment(distanceFromTop) {
  let elementId = Math.floor(rnd() * 3);
  if (elementId === 0) {
    return new Grass(distanceFromTop);
  } else if (elementId === 1) {
    return new Road(distanceFromTop);
  } else {
    let direction = woodDirection ? "right" : "left";
    woodDirection = !woodDirection;
    return new River(distanceFromTop, direction);
  }
}

// Reset the game
function reset() {
  //clearEndGameOverlay();
  user = localStorage.getItem("username") || "nobody"; // Default to "testUser" if no username is stored
  phase = "start";
  isDuckAlive = true;
  //screenOffset = 0;
  //obstacles = [];
  //environments = [];
  generateTableOfEnvironment();
  //keys = {};
  //woodDirection = false; 
  clearFullCanvas();
  
}

function drawEnvironment() {
  for (let i = 0; i < environments.length; i++) {
    let element = environments[i];
    element.draw(ctx, canvasWidth, element.distanceFromTop);
    element.updateObstacle();
  }
}

function moveEnvironment(speed) {
  duck.duckY += speed;
  for (let i = 0; i < environments.length; i++) {
    let element = environments[i];
    element.distanceFromTop = element.distanceFromTop + speed;
    if (element.distanceFromTop >= canvasHeight) {
      environments.unshift(generateRandomEnvironment(-80));
      environments.pop();
    }
  }
}

function checkDuckState() {
  if (duck.isDuckAlive === false) {
    phase = "end";
    isGameOverDisplayed = true;
  }
}

function showEndGame() {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 50);
  ctx.fillText("Your score is " + getHighestScore(), canvasWidth / 2, canvasHeight / 2);
  ctx.fillText('To play again, press "Enter"', canvasWidth / 2, canvasHeight / 2 + 50);
}

function clearFullCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// function clearEndGameOverlay() {
//   ctx.clearRect(0, 0, canvasWidth, canvasHeight);
// }