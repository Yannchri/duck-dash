document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.createElement('audio');
    audioPlayer.src = './sound/Mercury.mp3';
    audioPlayer.loop = true; // Faire en sorte que le son se répète
    audioPlayer.style.display = 'none'; // Masquer le contrôleur audio
    document.body.appendChild(audioPlayer);

    // Load the saved state from localStorage
    const savedTime = localStorage.getItem('audioPlayerCurrentTime');
    const isPlaying = localStorage.getItem('audioPlayerIsPlaying') === 'true';
    const savedVolume = localStorage.getItem('audioPlayerVolume');

    if (savedTime) {
        audioPlayer.currentTime = parseFloat(savedTime);
    }

    if (savedVolume) {
        audioPlayer.volume = parseFloat(savedVolume);
    }

    if (isPlaying) {
        audioPlayer.play().catch(error => {
            console.log('Autoplay was prevented. Waiting for user interaction.');
        });
    }

    // Save the current time and playing state to localStorage
    audioPlayer.addEventListener('timeupdate', () => {
        localStorage.setItem('audioPlayerCurrentTime', audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('play', () => {
        localStorage.setItem('audioPlayerIsPlaying', 'true');
    });

    audioPlayer.addEventListener('pause', () => {
        localStorage.setItem('audioPlayerIsPlaying', 'false');
    });

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('audioPlayerCurrentTime', audioPlayer.currentTime);
        localStorage.setItem('audioPlayerIsPlaying', !audioPlayer.paused);
    });

    // Listen for changes in localStorage to pause/play the audio and adjust volume
    window.addEventListener('storage', (event) => {
        if (event.key === 'audioPlayerIsPlaying') {
            if (event.newValue === 'false') {
                audioPlayer.pause();
            } else {
                audioPlayer.play().catch(error => {
                    console.log('Autoplay was prevented. Waiting for user interaction.');
                });
            }
        } else if (event.key === 'audioPlayerVolume') {
            audioPlayer.volume = parseFloat(event.newValue);
        }
    });

    // Gestion des contrôles audio sur la page audio
    const playMusicButton = document.getElementById('playMusic');
    const pauseMusicButton = document.getElementById('pauseMusic');
    const volumeControl = document.getElementById('volumeControl');

    if (playMusicButton && pauseMusicButton && volumeControl) {
        playMusicButton.addEventListener('click', () => {
            audioPlayer.play();
            localStorage.setItem('audioPlayerIsPlaying', 'true');
        });

        pauseMusicButton.addEventListener('click', () => {
            audioPlayer.pause();
            localStorage.setItem('audioPlayerIsPlaying', 'false');
        });

        volumeControl.addEventListener('input', (event) => {
            const volume = event.target.value;
            audioPlayer.volume = volume;
            localStorage.setItem('audioPlayerVolume', volume);
        });

        // Update volume control to reflect saved volume
        if (savedVolume) {
            volumeControl.value = savedVolume;
        }
    }

    // Listen for "M" key press to mute/unmute the audio
    document.addEventListener('keydown', (event) => {
        if (event.key === 'm' || event.key === 'M') {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                localStorage.setItem('audioPlayerIsPlaying', 'false');
            } else {
                audioPlayer.play();
                localStorage.setItem('audioPlayerIsPlaying', 'true');
            }
        }
    });
});
