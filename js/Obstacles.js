export class Obstacles {
  type;
  height;
  width;
  img;
  posX;
  posY;

  //Don't know if its possible to do better for the constructor
  // For the wood, i need all of this except the type
  // We can imagine a test based on the type in the environnement to know what initialize but i dont know if it's better
  constructor(type, height, width, imgPath, posX, posY, speed, direction) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.img = new Image();
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.direction = direction;
    // CALLBACK
    // When the picture is charged, ii call the second function.
    this.img.onload = () => {
      // Redimensionner l'image après son chargement
      this.img = this.resizeImage(this.img, this.width, this.height);
    };
    this.img.src = imgPath;
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

  // Fonction pour redimensionner une image
  resizeImage(image, newWidth, newHeight) {
    // create temporary canva
    var canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    var ctx = canvas.getContext("2d");
    // Dessine the picture redimensioned
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    // Create the new image
    var resizedImage = new Image();
    resizedImage.src = canvas.toDataURL("./images/woodLoogs.png");
    return resizedImage;
  }
}

export class Wood extends Obstacles {
  constructor(height, width, imgPath, posX, posY, speed, direction) {
    super("wood", height, width, imgPath, posX, posY, speed, direction);
  }
}

export class Car extends Obstacles {}

export class Tree extends Obstacles {
  // Constructeur pour Tree sans les paramètres de speed et direction
  constructor(height, width, imgPath, posX, posY) {
    super("tree", height, width, imgPath, posX, posY);
  }
}
