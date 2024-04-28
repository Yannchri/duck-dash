export class Duck {
  duckSize;
  isDuckAlive;
  duckX;
  duckY;
  duckImage;
  lastJumpTime;
  jumpDistance;
  _score;

  constructor(duckSize, duckImage, jumpDistance) {
    this.duckSize = duckSize;
    this.duckImage = duckImage;
    this.isDuckAlive = true;

    this.duckX = (canvas.width - this.duckSize) / 2;
    this.duckY = canvas.height - this.duckSize - 120;
    this.lastJumpTime = 0;
    this.jumpDistance = jumpDistance;
    this._score = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.duckImage, this.duckX, this.duckY);
  }

  limitDuckMovement() {
    if (this.duckX < 0 || this.duckX + this.duckSize > canvas.width) {
      this.isDuckAlive = false;
    }
    if (this.duckY < 0) {
      this.duckY = 0;
    } else if (this.duckY + this.duckSize >= canvas.height + 1) {
      this.isDuckAlive = false;
    }
  }

  duckMove(keys) {
    let currentTime = Date.now();

    // limit to 0,3 second betweeen each jump
    if (currentTime - this.lastJumpTime > 200) {
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
    //Verify the movement
    this.limitDuckMovement();
  }

  duckOnWood(wood) {
    if (wood.direction === "left") {
      this.duckX -= wood.speed;
    } else {
      this.duckX += wood.speed;
    }
  }

  getScore() {
    return this._score;  // Getter pour le score
  }

  
}
