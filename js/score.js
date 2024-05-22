let highestScore = 0;
let bestScores = [];

export function getScores() {
  let scores = localStorage.getItem("bestScores");
  if (scores) {
    bestScores = JSON.parse(scores);
  }
  return bestScores;
}

export function setScores(user, score) {
  getScores();
  bestScores.push({ user: user, score: score });
  bestScores.sort((a, b) => b.score - a.score);
  bestScores = bestScores.slice(0, 10);
  localStorage.setItem("bestScores", JSON.stringify(bestScores));

  console.log(bestScores);
}

export function drawScore(ctx, duck) {
  let currentScore = duck._score;

  if (highestScore < duck._score) highestScore = currentScore;

  ctx.font = "20px Arial bold";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + highestScore, 10, 30);
}

export function storedScore(highestScore) {}
