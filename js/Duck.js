export class Duck {
  duckSize;
  isDuckAlive;
  duckX;
  duckY;
  duckImage;
  lastJumpTime;
  jumpDistance;
  lastMove;
  _score;

  constructor(duckSize, duckImage, jumpDistance, duckX) {
    this.duckSize = duckSize;
    this.duckImage = duckImage;
    this.isDuckAlive = true;

    this.duckX = duckX;
    this.duckY = canvas.height - this.duckSize - 120;
    this.lastJumpTime = 0;
    this.jumpDistance = jumpDistance;
    this._score = 0;
    this.lastMove = null;
  }

  draw(ctx) {
    ctx.drawImage(this.duckImage, this.duckX, this.duckY);
  }

  limitDuckMovement() {
    if (this.duckX < 0) {
      this.duckX = canvas.width - this.duckSize;
    } else if (this.duckX + this.duckSize > canvas.width) {
      this.duckX = 0;
    }
    if (this.duckY < 0) {
      this.duckY = 0;
    } else if (this.duckY + this.duckSize >= canvas.height + 1) {
      this.isDuckAlive = false;
    }
  }

  duckMove(keys) {
    let currentTime = Date.now();

    this.limitDuckMovement();

    // limit to 0,15 second betweeen each jump
    if (currentTime - this.lastJumpTime > 150) {
      if (keys["ArrowLeft"]) {
        this.duckX -= this.jumpDistance;
        this.lastJumpTime = currentTime;
      }
      if (keys["ArrowRight"]) {
        this.duckX += this.jumpDistance;
        this.lastJumpTime = currentTime;
      }
      if (keys["ArrowUp"]) {
        this.duckY -= this.jumpDistance;
        this.lastJumpTime = currentTime;
        this._score += 1;
      }
      if (keys["ArrowDown"]) {
        this.duckY += this.jumpDistance;
        this.lastJumpTime = currentTime;
        this._score -= 1;
      }
    }
    this.lastMove = keys;
  }

  checkCollision(environments) {
    // If it's not the duck environment, we don't need to check the collision
    for (let i = 0; i < environments.length; i++) {
      if (
        environments[i].obstacles === undefined ||
        environments[i].distanceFromTop !== this.duckY
      )
        continue;
      // If the duck is in the environment, we need to check the collision
      else {
        let obstacles = environments[i].obstacles;
        for (let j = 0; j < obstacles.length; j++) {
          let obstacle = obstacles[j];
          let collision =
            this.duckX + 10 < obstacle.posX + obstacle.width &&
            this.duckX - 10 + this.duckSize > obstacle.posX;
          if (collision && obstacle.type === "wood") {
            this.duckOnWood(obstacle);
          } else if (collision && obstacle.type === "tree") {
            this.undoMove(obstacle);
          } else if (collision && obstacle.type === "car") {
            this.isDuckAlive = false;
          } else if (environments[i].type === "river") this.isDuckAlive = false;
        }
      }
    }
  }
  

  duckOnWood(wood) {
    if (wood.direction === "left") {
      this.duckX -= wood.speed;
    } else {
      this.duckX += wood.speed;
    }
  }

  undoMove(obstacle) {
    this._score -= 1;
    if (this.lastMove["ArrowLeft"]) {
      this.duckX = obstacle.posX + obstacle.width;
    } else if (this.lastMove["ArrowRight"]) {
      this.duckX = obstacle.posX - this.duckSize;
    } else if (this.lastMove["ArrowUp"]) {
      this.duckY += this.jumpDistance;
    } else if (this.lastMove["ArrowDown"]) {
      this.duckY -= this.jumpDistance;
    }
  }
}
