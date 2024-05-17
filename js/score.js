import { Duck } from "./Duck.js";

let myDuck = new Duck(40, "path/to/duckImage.png", 10);
let highestScore = 0;
let bestScores = [];


export function drawScore(ctx, Duck) {
    let currentScore = Duck.getScore();
    
    if (highestScore < Duck.getScore())
      highestScore = currentScore;

    ctx.font = '20px Arial bold';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + highestScore, 10, 30);

}


export function storedScore(highestScore) {
  bestScores.push(highestScore);
  bestScores.sort((a, b) => b - a);
  bestScores = bestScores.slice(0, 10);

  console.log("Top 10 : ", bestScores);
}



