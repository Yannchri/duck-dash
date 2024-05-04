import { Wood, Tree, Car } from "./Obstacles.js";

export class Environment {
  type;
  obstacles;
  height;
  width;
  color;
  distanceFromTop;


  constructor(type, height, width, color) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  
  setDistanceFromTop(distanceFromTop){
    this.distanceFromTop = distanceFromTop;
    this.height = 40;
    this.width = 600;
    this.obstacles = [];
  }
  
  getDistanceFromTop(){
    return this.distanceFromTop;
  }

  getHeight(){
    return this.height;
  }
  
  draw(ctx,width,distanceFromTop) {
    ctx.fillStyle = this.color;
    //create the square distance from left, top, total width and total height
    ctx.fillRect(0, distanceFromTop, width, this.height);
}

  setDifficulty(level) {}
}

const carImages = {
  green: {
      left: "./images/CarGreenR.png",
      right: "./images/CarGreenL.png"
  },
  red: {
      left: "./images/CarRedR.png",
      right: "./images/CarRedL.png"
  },
  blue: {
      left: "./images/CarBlueR.png",
      right: "./images/CarBlueL.png"
  },
  gray: {
      left: "./images/CarGrayR.png",
      right: "./images/CarGrayL.png"
  }
};

export class Road extends Environment {
  constructor(distanceFromTop) {
    super(distanceFromTop);
    this.color = "gray";
    this.type = "road";
    this.generateCar(); // Appel de la méthode pour générer la voiture
  }

  draw(ctx, width, distanceFromTop) {
    // Dessiner la base de la route
    ctx.fillStyle = this.color;  // 'gray' est défini dans le constructeur
    ctx.fillRect(0, distanceFromTop, width, this.height);

    /*// Dessiner les marquages de la route
    ctx.fillStyle = "white";  // Couleur des marquages
    const lineLength = 40;  // Longueur de chaque marque
    const lineGap = 60;  // Espace entre les marques
    const lineWidth = 5;  // Largeur de chaque marque
    const lineOffset = distanceFromTop + this.height / 2 - lineWidth / 2;  // Centrage vertical des marques

    // Dessin des lignes discontinues au milieu de la route
    for (let x = 0; x < width; x += lineLength + lineGap) {
      ctx.fillRect(x, lineOffset, lineLength, lineWidth);
    }
  }
  setDirection() {}*/
}
} 
  

/*Constructeur de la rivière
-Besoin de distanceFromTop dans le constructeur pour adapter les obstacles quand tu déplaces l'environnement

*/
export class River extends Environment {
  constructor(distanceFromTop) {
    super(distanceFromTop); // Base color for the river
    this.color = "#204bb0";
    this.type = "river";
    this.generateWood(); // Appel de la méthode pour générer le bois
  }

  /*Méthode pour générer le bois
  - The height of the obstacle is half the height of the environement
  - distanceFromTopEnvironement --> The distance from the top of the canva + half the height of the obstacle to be in the middle of the river
  - Woodx = Horizontal start position
  - this.distanceFromTop --> to initialize at the same level of the river
  */
  generateWood() {
    const woodHeight = this.height / 2;
    //Just for testing to obtain 20, 30 , 40 ,50
    const woodWidth = Math.floor(Math.random() * 4) * 10 + 20;
    const distanceFromTopEnvironement = this.distanceFromTop + woodHeight / 2;
    const woodX = Math.random() * 600;
    const speed = Math.random() * 5;
    const direction = Math.random() < 0.5 ? "left" : "right"; // Direction aléatoire: gauche ou droite
    this.obstacles.push(
      new Wood(
        woodHeight,
        woodWidth,
        "./images/woodLoogs.png",
        woodX,
        distanceFromTopEnvironement,
        speed,
        direction
      )
    );
  }

  draw(ctx) {
    const detailRiverColor = "#0400d9";

    ctx.fillStyle = this.color;
    ctx.fillRect(0, this.distanceFromTop, this.width, this.height);

    ctx.fillStyle = detailRiverColor;
    for (
      let y = this.distanceFromTop;
      y < this.distanceFromTop + this.height;
      y += 6
    ) {
      for (let x = 0; x < this.width; x += 18) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
    this.obstacles.forEach((wood) => {
      ctx.drawImage(wood.img, wood.posX, wood.posY); // Assurez-vous que draw est défini dans Tree
    });
  }

  //Modify on each loop the X position on a obstacle, called in gameElement
  updateObstacle() {
    this.obstacle.update(this.width);
    //If the duck goes forward, we need to update all the canva to move the obstacle on posY
    this.obstacle.posY = this.distanceFromTop + (this.height/4);
  }
  

}

export class Grass extends Environment {
  constructor(distanceFromTop) {
    super(distanceFromTop);
    this.color = "green";
    this.type = "grass";
    this.generateTrees();
  }

  // Générer un nombre aléatoire d'arbres avec des positions aléatoires
  generateTrees() {
    const numberOfTrees = Math.floor(Math.random() * 5); // entre 1 et 10 arbres
    for (let i = 0; i < numberOfTrees; i++) {
      const treeHeight = 40; // hauteur fixe pour les arbres
      const treeWidth = 40; // largeur fixe pour les arbres
      const posX =
        Math.floor(Math.random() * ((this.width - treeWidth) / 40)) * 40; // Position X aléatoire
      const posY = this.distanceFromTop;
      if (posX != 280)
        this.obstacles.push(
          new Tree(treeHeight, treeWidth, "./images/tree.png", posX, posY)
        );
    }
  }

  draw(ctx) {
    // Dessiner l'herbe
    ctx.fillStyle = this.color;
    ctx.fillRect(0, this.distanceFromTop, this.width, this.height);

    // Dessiner les arbres
    this.obstacles.forEach((tree) => {
      ctx.drawImage(tree.img, tree.posX, tree.posY); // Assurez-vous que draw est défini dans Tree
    });
  }

  updateObstacle() {
    // Code pour mettre à jour les positions des arbres
    for (let tree of this.obstacles) {
      tree.posY = this.distanceFromTop; // Exemple de mise à jour
    }
  }
}
