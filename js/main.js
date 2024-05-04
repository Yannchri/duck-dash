import { Duck } from "./Duck.js";
import { Grass, Road, River } from "./Environment.js";

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
let keys = {};
let rnd = Math.random;

// Configuration
// Keyboard event listener
document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});
document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

// Duck configuration and creation
let duckSize = 40;
let duckImage = new Image();
duckImage.src = "images/duck.png";
const duck = new Duck(duckSize, duckImage, 40);

// Game loop
reset();
generateTableOfEnvironment();

function draw() {
  if (phase === "start") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnvironment();
    moveEnvironment(1);
    duck.draw(ctx);
    duck.duckMove(keys);
  }
}
setInterval(draw, 20);

// Game functions
function generateTableOfEnvironment() {
  for (let y = -80; y < canvasHeight; y += 40) {
    environments.push(generateRandomEnvironment(y));
  }
}

function generateRandomEnvironment(distanceFromTop) {
  let elementId = Math.floor(rnd() * 3);
  if (elementId === 0) {
    return new Grass(distanceFromTop);
  } else if (elementId === 1) {
    return new Road(distanceFromTop);
  } else {
    return new River(distanceFromTop);
  }
}

// Reset the game
function reset() {
  phase = "start";
  screenOffset = 0;
  obstacles = [];
  generateTableOfEnvironment();
  score = 0;
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
  }
  if (environments[environments.length - 1].distanceFromTop >= 600) {
    // Décaler tous les éléments d'un indice vers le haut dans le tableau
    for (let i = environments.length - 1; i > 0; i--) {
      environments[i] = environments[i - 1];
    }
    environments[0] = generateRandomEnvironment(-80);
  }
}
