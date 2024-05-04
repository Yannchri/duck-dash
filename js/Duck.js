export class Duck {
  duckSize;
  isDuckAlive;
  duckX;
  duckY;
  duckImage;
  lastJumpTime;
  jumpDistance;

  constructor(duckSize, duckImage, jumpDistance) {
    this.duckSize = duckSize;
    this.duckImage = duckImage;
    this.isDuckAlive = true;

    this.duckX = (canvas.width - this.duckSize) / 2;
    this.duckY = canvas.height - this.duckSize - 40;
    this.lastJumpTime = 0;
    this.jumpDistance = jumpDistance;
  }

  draw(ctx) {
    ctx.drawImage(this.duckImage, this.duckX, this.duckY);
  }

  limitDuckMovement() {
    if (this.duckX < 0) {
      this.duckX = 0;
    } else if (this.duckX + this.duckSize > canvas.width) {
      this.duckX = canvas.width - this.duckSize;
    }

    if (this.duckY < 0) {
      this.duckY = 0;
    } else if (this.duckY + this.duckSize > canvas.height) {
      this.duckY = canvas.height - this.duckSize;
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
      }
      if (keys["ArrowDown"]) {
        this.duckY += this.jumpDistance;
        this.lastJumpTime = currentTime;
      }
    }
    //Verify the movement
    this.limitDuckMovement();
  }

  checkCollision(obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
      if (
        this.duckX < obstacles[i].x + obstacles[i].width &&
        this.duckX + this.duckSize > obstacles[i].x &&
        this.duckY < obstacles[i].y + obstacles[i].height &&
        this.duckY + this.duckSize > obstacles[i].y
      ) {
        this.isDuckAlive = false;
      }
    }
  }
}
