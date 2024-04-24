const height = 40;
const width = 600;

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
  
  draw(ctx,width,distanceFromTop) {
    ctx.fillStyle = this.color;
    //create the square distance from left, top, total width and total height
    ctx.fillRect(0, distanceFromTop, width, this.height);
}

  setDifficulty(level) {}
}

export class Road extends Environment {
  constructor() {
    super("road", height, width, "gray");  // Couleur de base de la route
  }

  draw(ctx, width, distanceFromTop) {
    // Dessiner la base de la route
    ctx.fillStyle = this.color;  // 'gray' est défini dans le constructeur
    ctx.fillRect(0, distanceFromTop, width, this.height);

    // Dessiner les marquages de la route
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
  setDirection() {}
} 
  


export class River extends Environment {
  constructor() {
    super("river", height, width, "blue");  // Base color for the river
  }

  
  setDirection() {}

}

export class Grass extends Environment {
  constructor() {
    super("grass", height, width, "green"); // Pas nécessaire de passer 'draw' ici.
  }

  draw(ctx, width, distanceFromTop) {
    // Utilisation d'un motif pour créer un effet d'herbe
    const grassColor = "#00AA00"; // Couleur de base de l'herbe
    const detailColor = "#007700"; // Couleur pour les détails de l'herbe
    ctx.fillStyle = grassColor;
    ctx.fillRect(0, distanceFromTop, width, this.height);

    // Ajout de détails pour simuler l'herbe en pixel art
    ctx.fillStyle = detailColor;
    for (let y = distanceFromTop; y < distanceFromTop + this.height; y += 4) { // Espacement vertical des détails
      for (let x = 0; x < width; x += 4) { // Espacement horizontal des détails
          ctx.fillRect(x, y, 2, 2); // Taille des détails en pixels
        
      }
    }
  }
}
