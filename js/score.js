let highestScore = 0;
let bestScores = [];

export function getScores() {
  if (localStorage.getItem("bestScores") !== null) {
    bestScores = localStorage.getItem("bestScores").split(",");
  }
}

export function setScores(score) {
  getScores();
  bestScores.push(score);
  bestScores.sort((a, b) => b - a);

  console.log("Top 10 : ", bestScores);

  localStorage.setItem("bestScores", bestScores);
}

export function drawScore(ctx, duck) {
  let currentScore = duck._score;

  if (highestScore < duck._score) highestScore = currentScore;

  ctx.font = "20px Arial bold";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + highestScore, 10, 30);
}

export function storedScore(highestScore) {}
