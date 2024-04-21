export class Obstaclce {
  type;
  height;
  width;
  img;

  constructor(type, height, width, imgPath) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.img = new Image();
    this.img.src = imgPath;
  }
}

export class Wood extends Obstaclce {}

export class Car extends Obstaclce {}

export class Three extends Obstaclce {}
