/* ===== CONFIGURATION ===== */
const CONFIG = {
    name: 'you',
    messages: {
        scene1: 'Someone left you something special...',
        scene2: 'Hey, you! 🌷\nI know I\'m a little late,\nbut I didn\'t want your special day\nto pass without a little surprise.\nSo I made this tiny place\non the internet just for you.',
        scene3: 'Make a wish ✨',
        scene5_note1_front: 'You are special ✨',
        scene5_note2_front: 'Keep smiling 🌼',
        scene5_note3_front: 'Keep going ⭐',
        scene5_note4_front: 'Thank you 💗',
        scene5_note1_back: 'You light up every room you walk into',
        scene5_note2_back: 'Your smile is contagious',
        scene5_note3_back: 'You inspire me more than you know',
        scene5_note4_back: 'I\'m so lucky to have you in my life',
        scene6: 'There\'s one more thing...',
        scene7_title: 'Happy Belated Birthday! 🎂🎉',
        scene7_message: `I may be late,
        but my wish for you will always be on time.
        Wishing you happiness, success,
        beautiful memories,
        and plenty of reasons to smile.
        Thank you for being such an important
        part of my life.
        I'm lucky to know you. 🌸`,
        signature: '— From me to you 💌'
    },
    photoCaptions: [
        'One of my favorite memories 🌸',
        'You make everything brighter ✨',
        'A moment I\'ll never forget 💗',
        'So grateful for you 🌷'
    ],
    musicFile: 'assets/musicforbirthday.mp3',
    confettiCount: 100,
    confettiColors: ['#ff6b9d', '#c9a0dc', '#ffd93d', '#a8d8ea', '#ff9ecf', '#6bff9d', '#ff6bff']
};

/* ===== STATE ===== */
let currentScene = 1;
let musicPlaying = false;
let audioElement = null;

/* ===== SFX ENGINE ===== */
let sfxCtx = null;
let sfxReady = false;

function ensureSfxReady() {
    if (sfxReady) return;
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        sfxCtx = new AudioCtx();
        if (sfxCtx.state === 'suspended') {
            sfxCtx.resume().then(() => { sfxReady = true; }).catch(() => {});
        } else {
            sfxReady = true;
        }
    } catch (e) {
        console.log('SFX unavailable');
    }
}

document.addEventListener('touchstart', ensureSfxReady, { once: true });
document.addEventListener('click', ensureSfxReady, { once: true });

function getSfxContext() {
    if (!sfxCtx) ensureSfxReady();
    if (sfxCtx && sfxCtx.state === 'suspended') sfxCtx.resume();
    return sfxCtx;
}

function playTone(freq, type, duration, startTime, vol, glide) {
    const ctx = getSfxContext();
    if (!ctx) return;
    try {
        const t = startTime || ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, t);
        if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(freq * glide, 20), t + duration);
        gain.gain.setValueAtTime(vol || 0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + duration + 0.05);
    } catch (e) {}
}

function playNoise(duration, startTime, vol) {
    const ctx = getSfxContext();
    if (!ctx) return;
    try {
        const t = startTime || ctx.currentTime;
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, t);
        src.buffer = buffer;
        gain.gain.setValueAtTime(vol || 0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        src.start(t);
        src.stop(t + duration + 0.05);
    } catch (e) {}
}

const SFX = {
    envelope() {
        const ctx = getSfxContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        playTone(220, 'sine', 0.2, t, 0.1);
        playTone(440, 'sine', 0.15, t + 0.04, 0.06);
        playNoise(0.1, t, 0.04);
    },
    letter() {
        const ctx = getSfxContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        playNoise(0.3, t, 0.06);
        playTone(180, 'triangle', 0.15, t, 0.06);
        playTone(260, 'sine', 0.12, t + 0.06, 0.04);
    },
    cake() {
        const ctx = getSfxContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        playNoise(0.5, t, 0.05);
        playTone(120, 'sine', 0.6, t, 0.08, 0.5);
        playTone(240, 'sine', 0.35, t + 0.05, 0.05);
        playTone(80, 'triangle', 0.7, t + 0.03, 0.06, 0.4);
    },
    photos() {
        const ctx = getSfxContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        playTone(800, 'square', 0.06, t, 0.04);
        playTone(1200, 'sine', 0.05, t + 0.04, 0.03);
        playNoise(0.08, t + 0.03, 0.03);
    },
    notes() {
        const ctx = getSfxContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        playTone(660, 'sine', 0.1, t, 0.06);
        playTone(880, 'sine', 0.08, t + 0.05, 0.03);
    }
};

/* ===== DOM ELEMENTS ===== */
const scenes = {
    1: document.getElementById('scene-1'),
    2: document.getElementById('scene-2'),
    3: document.getElementById('scene-3'),
    4: document.getElementById('scene-4'),
    5: document.getElementById('scene-5'),
    6: document.getElementById('scene-6'),
    7: document.getElementById('scene-7')
};

const envelope = document.getElementById('envelope');
const envelopeFlap = document.getElementById('envelope-flap');
const envelopeSeal = document.getElementById('envelope-seal');
const petalsContainer = document.getElementById('petals-container');
const candlesContainer = document.getElementById('candles');
const giftBox = document.getElementById('gift-box');
const giftGlow = document.getElementById('gift-glow');
const giftLid = document.getElementById('gift-lid');
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');
const particlesContainer = document.getElementById('particles-container');
const confettiContainer = document.getElementById('confetti-container');

/* ===== INITIALIZATION ===== */
function init() {
    createBackgroundParticles();
    createBackgroundStars();
    createFloatingBalloons();
    setupEventListeners();
    setupMusic();
}

/* ===== SCENE NAVIGATION ===== */
function showScene(sceneNumber) {
    if (sceneNumber === currentScene) return;

    // Hide all scenes
    Object.values(scenes).forEach(scene => {
        if (scene) scene.classList.remove('active');
    });

    // Show target scene
    if (scenes[sceneNumber]) {
        scenes[sceneNumber].classList.add('active');
        currentScene = sceneNumber;
    }

    // Scene-specific initialization
    if (sceneNumber === 4) {
        initPhotoScene();
    }

    // Update music button state when entering final scene
    if (sceneNumber === 7) {
        updateMusicButton();
    }

    // Scene transition SFX
    if (sceneNumber === 2) SFX.letter();
    if (sceneNumber === 3) SFX.cake();
    if (sceneNumber === 4) SFX.photos();
    if (sceneNumber === 5) SFX.notes();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== EVENT LISTENERS ===== */
function setupEventListeners() {
    // Scene 1: Open Envelope
    const btnScene1 = document.getElementById('btn-scene1');
    if (btnScene1) {
        btnScene1.addEventListener('click', () => {
            openEnvelope();
        });
    }

    // Scene 2: Continue to Cake
    const btnScene2 = document.getElementById('btn-scene2');
    if (btnScene2) {
        btnScene2.addEventListener('click', () => {
            showScene(3);
        });
    }

    // Scene 3: Make a Wish
    const btnScene3 = document.getElementById('btn-scene3');
    if (btnScene3) {
        btnScene3.addEventListener('click', () => {
            makeWish();
        });
    }

    // Scene 4: Continue to Notes
    const btnScene4 = document.getElementById('btn-scene4');
    if (btnScene4) {
        btnScene4.addEventListener('click', () => {
            showScene(5);
        });
    }

    // Scene 5: Next to Gift
    const btnScene5 = document.getElementById('btn-scene5');
    if (btnScene5) {
        btnScene5.addEventListener('click', () => {
            showScene(6);
        });
    }

    // Scene 6: Open Gift
    const btnScene6 = document.getElementById('btn-scene6');
    if (btnScene6) {
        btnScene6.addEventListener('click', () => {
            openGift();
        });
    }

    // Scene 7: Replay
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
        btnReplay.addEventListener('click', () => {
            resetAndReplay();
        });
    }

    // Scene 7: Music toggle
    const btnMusic = document.getElementById('btn-music');
    if (btnMusic) {
        btnMusic.addEventListener('click', () => {
            toggleMusic();
        });
    }

    // Photo modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Polaroid clicks
    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('click', (e) => {
            SFX.photos();
            const wrapper = polaroid.closest('.polaroid-wrapper');
            const caption = wrapper ? wrapper.dataset.caption : '';
            const photoNum = polaroid.dataset.photo;
            openPhotoModal(photoNum, caption);
        });
    });

    // Note flips
    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', () => {
            SFX.notes();
            note.classList.toggle('flipped');
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ===== ENVELOPE ===== */
function openEnvelope() {
    if (envelope.classList.contains('opened')) {
        showScene(2);
        return;
    }

    envelope.classList.add('opened');

    SFX.envelope();

    // Create sparkles around envelope
    createSparkles(document.querySelector('.envelope-wrapper'), 20);

    // Create petals
    createPetals();

    // Transition to next scene after animation
    setTimeout(() => {
        showScene(2);
        // Reset envelope for replay
        setTimeout(() => {
            envelope.classList.remove('opened');
        }, 1000);
    }, 2500);
}

function createPetals() {
    const colors = ['#ff9ecf', '#ffd6e7', '#ffb6c1', '#c9a0dc', '#e8d5f5'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            petal.style.animationDuration = (3 + Math.random() * 3) + 's';
            petal.style.animationDelay = Math.random() * 2 + 's';
            petalsContainer.appendChild(petal);

            // Remove petal after animation
            setTimeout(() => {
                petal.remove();
            }, 7000);
        }, i * 100);
    }
}

function createSparkles(container, count) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        sparkle.style.background = ['#ffd700', '#ff6b9d', '#c9a0dc', '#fff'][Math.floor(Math.random() * 4)];
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2500);
    }
}

/* ===== CAKE ===== */
function makeWish() {
    const flames = document.querySelectorAll('.flame');
    const flameGlows = document.querySelectorAll('.flame-glow');
    const wishGlow = document.querySelector('.cake-wish-glow');

    // Extinguish flames
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('extinguished');
            if (flameGlows[index]) {
                flameGlows[index].classList.add('extinguished');
            }
        }, index * 150);
    });

    // Show wish glow
    setTimeout(() => {
        if (wishGlow) wishGlow.classList.add('active');
    }, flames.length * 150 + 200);

    // Confetti
    setTimeout(() => {
        launchConfetti(CONFIG.confettiCount);
    }, flames.length * 150 + 500);

    // Transition
    setTimeout(() => {
        showScene(4);
        // Reset cake for replay
        setTimeout(() => {
            flames.forEach(f => f.classList.remove('extinguished'));
            flameGlows.forEach(g => g.classList.remove('extinguished'));
            if (wishGlow) wishGlow.classList.remove('active');
        }, 1000);
    }, flames.length * 150 + 1500);
}

/* ===== GIFT ===== */
function openGift() {
    // Shake animation
    giftBox.classList.add('shaking');

    setTimeout(() => {
        giftBox.classList.remove('shaking');
        giftBox.classList.add('opened');

        // Show glow
        giftGlow.classList.add('active');

        // Auto-play music when gift is opened
        if (audioElement && !musicPlaying) {
            audioElement.play().then(() => {
                musicPlaying = true;
                updateMusicButton();
            }).catch(() => {
                // Autoplay may be blocked by browser
                console.log('Music autoplay blocked - user can enable with button');
            });
        }

        // Launch confetti
        launchConfetti(CONFIG.confettiCount * 2);

        // Create rising particles
        createRisingParticles();

        // Transition to final scene
        setTimeout(() => {
            showScene(7);
            // Reset gift for replay
            setTimeout(() => {
                giftBox.classList.remove('opened');
                giftGlow.classList.remove('active');
            }, 1000);
        }, 2000);
    }, 600);
}

function createRisingParticles() {
    const giftWrapper = document.getElementById('gift-wrapper');
    if (!giftWrapper) return;
    const rect = giftWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX + (Math.random() - 0.5) * 100}px;
                top: ${centerY}px;
                width: ${5 + Math.random() * 10}px;
                height: ${5 + Math.random() * 10}px;
                background: ${CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
                animation: particleRise 2s ease-out forwards;
            `;
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 2000);
        }, i * 50);
    }
}

// Add particle rise animation dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleRise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

/* ===== PHOTO MODAL ===== */
function openPhotoModal(photoNum, caption) {
    if (!modal || !modalImg || !modalCaption) return;

    const photoMap = {
        '1': 'assets/photo1.svg',
        '2': 'assets/photo2.svg',
        '3': 'assets/photo3.svg',
        '4': 'assets/photo4.svg'
    };

    modalImg.src = photoMap[photoNum] || 'assets/photo1.svg';
    modalCaption.textContent = caption || CONFIG.photoCaptions[parseInt(photoNum) - 1] || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ===== CONFETTI ===== */
function launchConfetti(count) {
    if (!confettiContainer) return;
    const colors = CONFIG.confettiColors;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 5 + Math.random() * 10;
            const left = Math.random() * 100;
            const drift = (Math.random() - 0.5) * 200;
            const duration = 2 + Math.random() * 3;
            const shape = Math.random() > 0.5 ? '50%' : '0';

            confetti.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${shape};
                animation-duration: ${duration}s;
                --drift: ${drift}px;
            `;

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), duration * 1000);
        }, i * 20);
    }
}

/* ===== BACKGROUND PARTICLES ===== */
function createBackgroundParticles() {
    if (!particlesContainer) return;
    const colors = ['#ff9ecf', '#c9a0dc', '#ffd93d', '#a8d8ea', '#ff6bff', '#6bff9d'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'glow-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

function createBackgroundStars() {
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = ['✦', '✧', '⋆', '✶'][Math.floor(Math.random() * 4)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        star.style.fontSize = (0.5 + Math.random() * 1) + 'rem';
        document.body.appendChild(star);
    }
}

function createFloatingBalloons() {
    const balloons = ['🎈', '🎀', '🎊'];
    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.top = Math.random() * 100 + '%';
        balloon.style.animationDelay = Math.random() * 15 + 's';
        balloon.style.animationDuration = (10 + Math.random() * 10) + 's';
        balloon.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
        document.body.appendChild(balloon);
    }
}

/* ===== MUSIC ===== */
function setupMusic() {
    try {
        audioElement = new Audio(CONFIG.musicFile);
        audioElement.loop = true;
        audioElement.volume = 0.3;
    } catch (e) {
        console.log('Audio not available');
    }
}

function updateMusicButton() {
    const btnMusic = document.getElementById('btn-music');
    if (!btnMusic) return;
    btnMusic.textContent = musicPlaying ? 'Music: On ♫' : 'Music: Off ♪';
}

function toggleMusic() {
    const btnMusic = document.getElementById('btn-music');
    if (!btnMusic) return;

    if (!audioElement) {
        btnMusic.textContent = 'Music: Off ♪';
        return;
    }

    if (musicPlaying) {
        audioElement.pause();
        musicPlaying = false;
        btnMusic.textContent = 'Music: Off ♪';
    } else {
        audioElement.play().catch(() => {
            // Auto-play may be blocked
            console.log('Click anywhere to enable audio');
        });
        musicPlaying = true;
        btnMusic.textContent = 'Music: On ♫';
    }
}

/* ===== RESET & REPLAY ===== */
function resetAndReplay() {
    // Stop music
    if (audioElement && musicPlaying) {
        audioElement.pause();
        musicPlaying = false;
    }

    // Reset music button
    const btnMusic = document.getElementById('btn-music');
    if (btnMusic) {
        btnMusic.textContent = 'Music: Off ♪';
    }

    // Reset envelope
    if (envelope) envelope.classList.remove('opened');

    // Reset cake
    const flames = document.querySelectorAll('.flame');
    const flameGlows = document.querySelectorAll('.flame-glow');
    const wishGlow = document.querySelector('.cake-wish-glow');
    flames.forEach(f => f.classList.remove('extinguished'));
    flameGlows.forEach(g => g.classList.remove('extinguished'));
    if (wishGlow) wishGlow.classList.remove('active');

    // Reset gift
    if (giftBox) {
        giftBox.classList.remove('shaking', 'opened');
    }
    if (giftGlow) giftGlow.classList.remove('active');

    // Reset notes
    document.querySelectorAll('.note').forEach(note => {
        note.classList.remove('flipped');
    });

    // Clear confetti
    if (confettiContainer) confettiContainer.innerHTML = '';

    // Go to scene 1
    showScene(1);
}

/* ===== PHOTO SCENE INIT ===== */
function initPhotoScene() {
    // Ensure polaroids are visible and scrollable on mobile
    const clothesline = document.getElementById('clothesline');
    if (clothesline && window.innerWidth <= 768) {
        clothesline.scrollLeft = clothesline.scrollWidth / 2 - clothesline.clientWidth / 2;
    }
}

/* ===== HELPER: Get scene element ===== */
function getScene(num) {
    return scenes[num] || null;
}

/* ===== START ===== */
document.addEventListener('DOMContentLoaded', init);

/* ===== SERVICE WORKER REGISTRATION (for offline support) ===== */
if ('serviceWorker' in navigator) {
    // Uncomment to enable offline caching:
    // navigator.serviceWorker.register('sw.js');
}
