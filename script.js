// Get all cards
const cards = document.querySelectorAll('.card');
let modalIds, audioIds;

if (document.title === 'Influencers de Guatemala') {
    modalIds = ['modal-neto', 'modal-chimador', 'modal-farruko', 'modal-meyer'];
    audioIds = ['audio-neto', 'audio-chimador', 'audio-farruko', 'audio-meyer'];
} else {
    modalIds = ['modal-pedri', 'modal-ferran', 'modal-messi', 'modal-sorpresa'];
    audioIds = ['audio-pedri', 'audio-ferran', 'audio-messi', 'audio-sorpresa'];
}

if (document.title === 'Influencers de Guatemala') {
    modalIds = ['modal-neto', 'modal-chimador', 'modal-farruko', 'modal-meyer'];
    audioIds = ['audio-neto', 'audio-chimador', 'audio-farruko', 'audio-meyer'];
} else {
    modalIds = ['modal-pedri', 'modal-ferran', 'modal-messi', 'modal-sorpresa'];
    audioIds = ['audio-pedri', 'audio-ferran', 'audio-messi', 'audio-sorpresa'];
}

let audioTimeouts = [];

// Add click event to each card
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Pause any playing audio except the current one
        audioIds.forEach((id, idx) => {
            if (idx !== index) {
                const aud = document.getElementById(id);
                aud.pause();
                aud.currentTime = 0;
                if (audioTimeouts[idx]) {
                    clearTimeout(audioTimeouts[idx]);
                }
            }
        });

        const audio = document.getElementById(audioIds[index]);
        const pauseAllBtn = document.getElementById('pause-all');

        if (document.title === 'Influencers de Guatemala') {
            if (audio.paused) {
                // Play audio
                audio.play();
                if (pauseAllBtn) pauseAllBtn.style.display = 'block';
                audioTimeouts[index] = setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    if (pauseAllBtn) pauseAllBtn.style.display = 'none';
                }, 20000);
            } else {
                // Pause audio
                audio.pause();
                audio.currentTime = 0;
                if (audioTimeouts[index]) {
                    clearTimeout(audioTimeouts[index]);
                }
                if (pauseAllBtn) pauseAllBtn.style.display = 'none';
            }
        } else {
            // For players page, open modal and play
            const modal = document.getElementById(modalIds[index]);
            modal.style.display = 'block';
            audio.play();
            audioTimeouts[index] = setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 20000);
        }
    });
});

// Get all close buttons
const closeButtons = document.querySelectorAll('.close');

// Add click event to close buttons
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        const audioId = 'audio-' + modalId.split('-')[1];
        const audio = document.getElementById(audioId);
        audio.pause();
        audio.currentTime = 0; // Reset to start
        const index = modalIds.indexOf(modalId);
        if (audioTimeouts[index]) {
            clearTimeout(audioTimeouts[index]);
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        const modalId = event.target.id;
        const audioId = 'audio-' + modalId.split('-')[1];
        const audio = document.getElementById(audioId);
        audio.pause();
        
        audio.currentTime = 0;
        const index = modalIds.indexOf(modalId);
        if (audioTimeouts[index]) {
            clearTimeout(audioTimeouts[index]);
        }
    }
});

const pauseAllBtn = document.getElementById('pause-all');
if (pauseAllBtn) {
    pauseAllBtn.addEventListener('click', () => {
        audioIds.forEach((id, idx) => {
            const aud = document.getElementById(id);
            aud.pause();
            aud.currentTime = 0;
            if (audioTimeouts[idx]) {
                clearTimeout(audioTimeouts[idx]);
            }
        });
        pauseAllBtn.style.display = 'none'; // Oculta el botón al pausar
    });
}