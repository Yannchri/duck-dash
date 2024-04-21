export class Environment {
  type;
  obstacles;
  height;
  width;
  random;
  color;

  constructor(type, height, width, color) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  setDifficulty(level) {}
}

export class Road extends Environment {
  setDirection() {}
}
export class River extends Environment {
  setDirection() {}
}
export class Grass extends Environment {}
