export class Obstaclce {
  type;
  height;
  width;
  img;
  posX;
  posY;


  //Don't know if its possible to do better for the constructor
  // For the wood, i need all of this except the type
  // We can imagine a test based on the type in the environnement to know what initialize but i dont know if it's better
  constructor(type, height, width, imgPath,posX,posY,speed,direction) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.img = new Image();
    this.img.src = imgPath;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.direction = direction;
  }


  //update the X position of the obstacle on each loop, will be used to create a method in the environement who will be used in gameElement
  update(width) {
    if (this.direction === "left") {
      this.posX -= this.speed;
      if (this.posX + this.width < 0) {
        this.posX = width;
      }
    } else if (this.direction === "right") {
      this.posX += this.speed;
      if (this.posX > width) {
        this.posX = -this.width;
      }
    }
  }
}

export class Wood extends Obstaclce {
  constructor(height, width, imgPath,posX,posY,speed,direction) {
    super('wood', height, width, imgPath,posX,posY,speed,direction);
  }
}

export class Car extends Obstaclce {}

export class Three extends Obstaclce {}
