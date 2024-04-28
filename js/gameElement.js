import { Grass, Road, River } from './Environment.js';

// Définition de la classe GameElement
class GameElement {
    constructor(color, height) {
        this.color = color;
        this.height = height;
    }
    //Function to draw the element
    draw(ctx,width,distanceFromTop) {
        ctx.fillStyle = this.color;
        //create the square distance from left, top, total width and total height
        ctx.fillRect(0, distanceFromTop, width, this.height);
    }
}

// Définition de la classe Grass
// class Grass extends GameElement {
//     constructor() {
//         super('green', 40);
//     }
// }

// Définition de la classe Road
// class Road extends GameElement {
//     constructor() {
//         super('gray', 40);
//     }
// }

// // Définition de la classe River
// class River extends GameElement {
//     constructor() {
//         super('blue', 40);
//     }
// }

// Définir la fonction pour générer un élément aléatoire
export function generateRandomElement(height) {
    let randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return new Grass(height);
    } else if (randomNumber < 0.66) {
        return new Road();
    } else {
        return new River(height);
    }
}

// Generate the canva and the environnment
export function generateTableOfEnvironment(canvasHeight) {
    let elements = [];
    for (let y = 0; y < canvasHeight - 80; y += 40) {
        let element = generateRandomElement(y);
        elements.push(element);
    }
    // Add element, always start on grass
    elements.push(new Grass(canvasHeight));
    elements.push(new Grass(canvasHeight));
    return elements;
}

// Draw the environment
export function drawEnvironment(elements, ctx, canvasWidth) {
    let distanceFromTop = 0;
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.draw(ctx, canvasWidth, distanceFromTop);
        element.setDistanceFromTop(distanceFromTop);
        distanceFromTop += 40;
    }
}

export function updateEnvironment(elements){
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if(element instanceof River){
            element.updateObstacle();
        }
        if (elements[i] instanceof Grass){
            elements[i].updateTreePosition();
    }
}
}

export function modifyEnvironment(elements) {
    // Generate the new element
    let newElement = generateRandomElement();
    // Modify all the element
    for (let i = elements.length - 1; i > 0; i--) {
        elements[i] = elements[i - 1];
        //Based on the height of environment of 40
        // Wait how we do the size and adapt dynamically
        if (elements[i] instanceof River){
            elements[i].updateObstaclePosition(elements[i].distanceFromTop+50);
        }
    }
    // Repalce the first element
    elements[0] = newElement;
    return elements;
}
