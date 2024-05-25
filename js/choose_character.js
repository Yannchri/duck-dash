document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const gallery = document.getElementById('gallery');
    const startButton = document.getElementById('startGame');
    let droppedImagePath = '';

    // Tableau des chemins d'accès aux images
    const imagePaths = [
        'images/characters/duck1.png',
        'images/characters/duck2.png',
        'images/characters/duck3.png',
        'images/characters/duck4.png',
        'images/characters/duck5.png',
        'images/characters/duck6.png',
        'images/characters/cat1.png',
    ];

    // Remplir la galerie avec les images
    imagePaths.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.draggable = true;
        img.addEventListener('dragstart', handleDragStart);
        gallery.appendChild(img);
    });

    // Gestionnaire d'événement pour le dragstart
    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.src);
    }

    // Gestionnaire d'événement pour le dragover
    dropZone.addEventListener('dragover', event => {
        event.preventDefault();
    });

    // Gestionnaire d'événement pour le drop
    dropZone.addEventListener('drop', event => {
        event.preventDefault();
        const src = event.dataTransfer.getData('text/plain');
        dropZone.style.backgroundImage = `url(${src})`;
        dropZone.style.backgroundSize = 'cover';
        dropZone.style.backgroundPosition = 'center';
        droppedImagePath = src;
    });

    startGameButton.addEventListener('click', () => {
        if (droppedImagePath) {
            localStorage.setItem('selectedImagePath', droppedImagePath);
            window.location.href = 'game.html'; // Redirige vers la page du jeu
        } else {
            alert('Veuillez déposer une image avant de commencer le jeu.');
        }
    });

});
