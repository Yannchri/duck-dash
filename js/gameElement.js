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
export function generateRandomElement() {
    let randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return new Grass();
    } else if (randomNumber < 0.66) {
        return new Road();
    } else {
        return new River();
    }
}

// Generate the canva and the environnment
export function generateTableOfEnvironment(canvasHeight) {
    let elements = [];
    for (let y = 0; y < canvasHeight - 80; y += 40) {
        let element = generateRandomElement();
        elements.push(element);
    }
    // Add element, always start on grass
    elements.push(new Grass());
    elements.push(new Grass());
    return elements;
}

// Draw the environment
export function drawEnvironment(elements, ctx, canvasWidth) {
    let distanceFromTop = 0;
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.draw(ctx, canvasWidth, distanceFromTop);
        distanceFromTop += 40;
    }
}

export function modifyEnvironment(elements) {
    // Generate the new element
    let newElement = generateRandomElement();
    // Modify all the element
    for (let i = elements.length - 1; i > 0; i--) {
        elements[i] = elements[i - 1];
    }
    // Repalce the first element
    elements[0] = newElement;
    return elements;
}
