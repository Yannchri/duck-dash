import { duckY } from "./game.js";

let currentScore = duckY;
const scoreDisplay = document.querySelector(".score");

export function updateScore() {
    // Sélectionne l'élément du DOM où le score est affiché
    const scoreDisplay = document.getElementById('scoreDisplay');
    
    // Met à jour le contenu textuel de cet élément avec le score actuel
    scoreDisplay.textContent = `Score: ${currentScore}`;
  }
updateScore();

let bestScores = [10];


