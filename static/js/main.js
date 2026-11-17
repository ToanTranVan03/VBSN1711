/**
 * Bữa tiệc sinh nhật Trần Văn Toàn (17/11/2003 - 17/11/2026)
 * High-End Web Audio Music Box Synthesizer, Multi-Stage Particle Fireworks,
 * Realistic Candle Blowing Physics, 3D Balloon Popping & Live Real-Time Ticker
 */

// ==========================================
// 1. ADVANCED MUSIC BOX / HARMONIC AUDIO SYNTH
// ==========================================
class BirthdayAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.timeoutIds = [];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Rich warm music box tone with multiple harmonic overtones
    playTone(freq, duration, type = 'sine', startTime = 0, masterGainVal = 0.25) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + startTime;

        // Primary Fundamental Oscillator
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);

        gain1.gain.setValueAtTime(0.0001, now);
        gain1.gain.exponentialRampToValueAtTime(masterGainVal, now + 0.03);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + duration);

        // Harmonic 2nd Overtone (Chime / Crystal Sparkle)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, now);

        gain2.gain.setValueAtTime(0.0001, now);
        gain2.gain.exponentialRampToValueAtTime(masterGainVal * 0.45, now + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(now);
        osc2.stop(now + duration);

        // Sub Warmth Bass
        if (freq > 200) {
            const oscSub = this.ctx.createOscillator();
            const gainSub = this.ctx.createGain();
            oscSub.type = 'sine';
            oscSub.frequency.setValueAtTime(freq * 0.5, now);

            gainSub.gain.setValueAtTime(0.0001, now);
            gainSub.gain.exponentialRampToValueAtTime(masterGainVal * 0.3, now + 0.05);
            gainSub.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

            oscSub.connect(gainSub);
            gainSub.connect(this.ctx.destination);
            oscSub.start(now);
            oscSub.stop(now + duration);
        }
    }

    playPopSound() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    }

    playCheerSound() {
        this.init();
        const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        chord.forEach((freq, idx) => {
            this.playTone(freq, 1.4, 'sine', idx * 0.08, 0.2);
        });
    }

    playHappyBirthdaySong() {
        this.init();
        this.stopHappyBirthdaySong();
        this.isPlaying = true;
        document.body.classList.add('music-playing');

        const notes = {
            'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
            'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
            'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46
        };

        const score = [
            // Bar 1 & 2: Hap-py birth-day to you
            { note: 'G4', dur: 0.45, delay: 0 },
            { note: 'G4', dur: 0.35, delay: 0.45 },
            { note: 'A4', dur: 0.75, delay: 0.8 },
            { note: 'G4', dur: 0.75, delay: 1.55 },
            { note: 'C5', dur: 0.75, delay: 2.3 },
            { note: 'B4', dur: 1.4, delay: 3.05 },

            // Bar 3 & 4: Hap-py birth-day to you
            { note: 'G4', dur: 0.45, delay: 4.6 },
            { note: 'G4', dur: 0.35, delay: 5.05 },
            { note: 'A4', dur: 0.75, delay: 5.4 },
            { note: 'G4', dur: 0.75, delay: 6.15 },
            { note: 'D5', dur: 0.75, delay: 6.9 },
            { note: 'C5', dur: 1.4, delay: 7.65 },

            // Bar 5 & 6: Hap-py birth-day dear TOÀN
            { note: 'G4', dur: 0.45, delay: 9.2 },
            { note: 'G4', dur: 0.35, delay: 9.65 },
            { note: 'G4', dur: 0.75, delay: 10.0 },
            { note: 'E5', dur: 0.75, delay: 10.75 },
            { note: 'C5', dur: 0.75, delay: 11.5 },
            { note: 'B4', dur: 0.75, delay: 12.25 },
            { note: 'A4', dur: 1.4, delay: 13.0 },

            // Bar 7 & 8: Hap-py birth-day to YOU!
            { note: 'F5', dur: 0.45, delay: 14.6 },
            { note: 'F5', dur: 0.35, delay: 15.05 },
            { note: 'E5', dur: 0.75, delay: 15.4 },
            { note: 'C5', dur: 0.75, delay: 16.15 },
            { note: 'D5', dur: 0.75, delay: 16.9 },
            { note: 'C5', dur: 2.0, delay: 17.65 }
        ];

        score.forEach(item => {
            const tid = setTimeout(() => {
                if (this.isPlaying) {
                    this.playTone(notes[item.note], item.dur);
                }
            }, item.delay * 1000);
            this.timeoutIds.push(tid);
        });

        // Loop after song ends
        const loopTid = setTimeout(() => {
            if (this.isPlaying) {
                this.playHappyBirthdaySong();
            }
        }, 20500);
        this.timeoutIds.push(loopTid);
    }

    stopHappyBirthdaySong() {
        this.isPlaying = false;
        this.timeoutIds.forEach(id => clearTimeout(id));
        this.timeoutIds = [];
        document.body.classList.remove('music-playing');
    }
}

const audioEngine = new BirthdayAudioEngine();

// ==========================================
// 2. MULTI-STAGE PARTICLE FIREWORKS ENGINE
// ==========================================
class FireworksEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.rockets = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.loop();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Launch a rocket shooting up from the bottom
    launchRocket(targetX = null, targetY = null) {
        const startX = Math.random() * (this.canvas.width * 0.8) + (this.canvas.width * 0.1);
        const endX = targetX || (startX + (Math.random() - 0.5) * 120);
        const endY = targetY || (Math.random() * (this.canvas.height * 0.45) + (this.canvas.height * 0.1));
        const color = ['#ffd700', '#ff007f', '#00f2fe', '#ff416c', '#a8ff78', '#ff8da1'][Math.floor(Math.random() * 6)];

        this.rockets.push({
            x: startX,
            y: this.canvas.height,
            targetX: endX,
            targetY: endY,
            speed: Math.random() * 3 + 8,
            color: color
        });
    }

    burst(x, y, count = 85, color = null) {
        const palette = ['#ffd700', '#ff007f', '#00f2fe', '#4facfe', '#ff0844', '#f857a6', '#00ff87', '#ffffff', '#fffa65'];
        const chosenColor = color || palette[Math.floor(Math.random() * palette.length)];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 3 + 1.2,
                color: chosenColor,
                alpha: 1,
                decay: Math.random() * 0.018 + 0.012,
                trail: []
            });
        }
    }

    launchRandom() {
        this.launchRocket();
    }

    loop() {
        requestAnimationFrame(() => this.loop());
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        // Update Rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            const dx = r.targetX - r.x;
            const dy = r.targetY - r.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 15 || r.y <= r.targetY) {
                this.burst(r.x, r.y, 90, r.color);
                this.rockets.splice(i, 1);
                continue;
            }

            const angle = Math.atan2(dy, dx);
            r.x += Math.cos(angle) * r.speed;
            r.y += Math.sin(angle) * r.speed;

            // Rocket spark trail
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.985;
            p.vy *= 0.985;
            p.vy += 0.07; // Gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fill();
        }
    }
}

let fireworks = null;

// ==========================================
// 3. FLOATING BALLOONS SPAWNER
// ==========================================
function initBalloons() {
    const container = document.getElementById('balloons-container');
    if (!container) return;

    const balloonColors = ['#ff4b2b', '#ff416c', '#00b4db', '#ffd700', '#9b51e0', '#2ed573', '#ff758c'];

    function createBalloon() {
        const b = document.createElement('div');
        b.className = 'balloon';
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        b.style.backgroundColor = color;
        b.style.left = `${Math.random() * 92 + 4}%`;
        const size = Math.random() * 25 + 50;
        b.style.width = `${size}px`;
        b.style.height = `${size * 1.25}px`;
        b.style.animationDuration = `${Math.random() * 6 + 9}s`;

        b.addEventListener('click', () => {
            audioEngine.playPopSound();
            const rect = b.getBoundingClientRect();
            if (fireworks) fireworks.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45, color);
            b.remove();
        });

        container.appendChild(b);

        setTimeout(() => {
            if (b.parentNode) b.remove();
        }, 16000);
    }

    for (let i = 0; i < 7; i++) {
        setTimeout(createBalloon, i * 700);
    }
    setInterval(createBalloon, 2200);
}

// ==========================================
// 4. CANDLE BLOWING & CELEBRATION
// ==========================================
let areCandlesBlown = false;

function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    if (flames.length === 0) return;

    if (!areCandlesBlown) {
        areCandlesBlown = true;
        flames.forEach(f => f.classList.add('out'));
        audioEngine.playCheerSound();

        // Spectacular Multi-Stage Fireworks
        if (fireworks) {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => fireworks.launchRandom(), i * 300);
            }
        }

        // Dual-Side Confetti Cannons
        if (typeof confetti === 'function') {
            confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 120, angle: 60, spread: 65, origin: { x: 0 } });
                confetti({ particleCount: 120, angle: 120, spread: 65, origin: { x: 1 } });
            }, 450);
        }

        const btn = document.getElementById('btn-blow');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles me-2"></i>Thắp Lại Nến Lung Linh`;
            btn.classList.replace('btn-glow-gold', 'btn-glow-pink');
        }

        // Animation: Thả Đèn Trời / Ngôi Sao Ước Nguyện bay vút lên bầu trời
        launchWishingLantern();
    } else {
        // Re-ignite candles
        areCandlesBlown = false;
        flames.forEach(f => f.classList.remove('out'));
        const btn = document.getElementById('btn-blow');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-cake-candles me-2"></i>Thổi Nến Ước Nguyện`;
            btn.classList.replace('btn-glow-pink', 'btn-glow-gold');
        }
    }
}

function launchWishingLantern() {
    const candlesLayer = document.querySelector('.candles-layer') || document.querySelector('.tier-1');
    if (!candlesLayer) return;

    const rect = candlesLayer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    // Tạo 3 đèn lồng / đốm sáng ước nguyện bay lên bầu trời
    const lanterns = [
        { offsetX: 0, delay: 0, size: 1 },
        { offsetX: -45, delay: 350, size: 0.75 },
        { offsetX: 45, delay: 550, size: 0.8 }
    ];

    lanterns.forEach(cfg => {
        setTimeout(() => {
            const lantern = document.createElement('div');
            lantern.className = 'wishing-lantern';
            lantern.style.left = `${startX + cfg.offsetX}px`;
            lantern.style.top = `${startY}px`;
            lantern.style.transform = `translate(-50%, 0) scale(${cfg.size * 0.4})`;
            lantern.style.opacity = '1';

            lantern.innerHTML = `
                <div class="lantern-body">
                    <span class="lantern-sparkle" style="top:-10px; left:50%; transform:translateX(-50%);">✨</span>
                    <span class="lantern-sparkle" style="bottom:-8px; right:4px;">⭐</span>
                </div>
            `;
            document.body.appendChild(lantern);

            const sway = (Math.random() - 0.5) * 160;

            requestAnimationFrame(() => {
                lantern.style.transform = `translate(calc(-50% + ${sway}px), -130vh) scale(${cfg.size * 0.35}) rotate(${sway > 0 ? 12 : -12}deg)`;
                lantern.style.opacity = '0.2';
            });

            // Khi bay lên cao đỉnh trời, nổ pháo hoa vàng rực rỡ đón nhận điều ước
            setTimeout(() => {
                if (fireworks) {
                    fireworks.burst(startX + cfg.offsetX + sway, 120, 80, '#ffd700');
                }
                if (lantern.parentNode) lantern.remove();
            }, 3400);
        }, cfg.delay);
    });
}

// ==========================================
// 5. CAKE CUTTING & MULTI-PORTION SHARING (Cắt Bánh & Chia Cho Mọi Người)
// ==========================================
function cutCake() {
    audioEngine.playPopSound();
    audioEngine.playCheerSound();

    const cakeStage = document.getElementById('the-giant-cake');
    if (!cakeStage) return;

    // 1. Tạo hiệu ứng nhát dao cắt sáng lóa xuyên qua bánh
    let knife = document.querySelector('.knife-slash');
    if (!knife) {
        knife = document.createElement('div');
        knife.className = 'knife-slash';
        cakeStage.appendChild(knife);
    }
    knife.classList.remove('knife-slashing');
    void knife.offsetWidth; // trigger reflow
    knife.classList.add('knife-slashing');

    // 2. Các tầng bánh tách nhẹ sang 2 bên rồi khép lại nhịp nhàng
    const t1 = document.querySelector('.tier-1');
    const t2 = document.querySelector('.tier-2');
    const t3 = document.querySelector('.tier-3');
    const t4 = document.querySelector('.tier-4');

    [t1, t3].forEach(t => {
        if (t) {
            t.classList.remove('tier-sliced-left');
            void t.offsetWidth;
            t.classList.add('tier-sliced-left');
        }
    });

    [t2, t4].forEach(t => {
        if (t) {
            t.classList.remove('tier-sliced-right');
            void t.offsetWidth;
            t.classList.add('tier-sliced-right');
        }
    });

    // 3. Bắn các miếng bánh kem bay tỏa ra 360 độ chia cho mọi người
    const rect = cakeStage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const sliceItems = ['🍰', '🍰', '🧁', '🍰', '🎂', '🍰', '🧁', '🍰', '🍰', '🧁', '🍰', '🎂', '🍰', '🧁'];
    const totalSlices = sliceItems.length;

    sliceItems.forEach((item, index) => {
        const slice = document.createElement('div');
        slice.className = 'flying-slice';
        slice.innerText = item;
        slice.style.left = `${centerX}px`;
        slice.style.top = `${centerY}px`;
        slice.style.transform = 'translate(-50%, -50%) scale(0.2)';
        slice.style.opacity = '1';
        document.body.appendChild(slice);

        // Tính góc và cự ly bay ra khắp màn hình
        const angle = (index / totalSlices) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const distance = Math.random() * 260 + 280;
        const destX = Math.cos(angle) * distance;
        const destY = Math.sin(angle) * distance;
        const rot = (Math.random() - 0.5) * 120;

        requestAnimationFrame(() => {
            slice.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(${Math.random() * 0.5 + 1}) rotate(${rot}deg)`;
            slice.style.opacity = '0';
        });

        setTimeout(() => {
            if (slice.parentNode) slice.remove();
        }, 1500);
    });

    // 4. Bắn pháo hoa rực rỡ chào mừng
    if (fireworks) {
        fireworks.burst(centerX, centerY, 60, '#ffd700');
        setTimeout(() => fireworks.launchRandom(), 300);
    }

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.55 }
        });
    }
}

function closeGiftModal() {
    const giftModalElem = document.getElementById('giftModal');
    if (giftModalElem) {
        const modalInstance = bootstrap.Modal.getInstance(giftModalElem) || new bootstrap.Modal(giftModalElem);
        modalInstance.hide();
        // Xóa sạch backdrop nếu còn sót lại
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }
}

// ==========================================
// 6. CAKE FLAVOR THEME CHANGER
// ==========================================
function changeFlavor(theme) {
    const t4 = document.querySelector('.tier-4');
    const t3 = document.querySelector('.tier-3');
    const t2 = document.querySelector('.tier-2');
    const t1 = document.querySelector('.tier-1');

    document.querySelectorAll('.flavor-dot').forEach(d => d.classList.remove('active'));
    const activeDot = document.querySelector(`.flavor-${theme}`);
    if (activeDot) activeDot.classList.add('active');

    if (theme === 'strawberry') {
        t4.style.background = 'linear-gradient(180deg, #d87093 0%, #b83b5e 35%, #4a0e4e 100%)';
        t3.style.background = 'linear-gradient(180deg, #ff9a8b 0%, #ff6a88 45%, #c0392b 100%)';
        t2.style.background = 'linear-gradient(180deg, #fbc2eb 0%, #a6c1ee 50%, #4a69bd 100%)';
        t1.style.background = 'linear-gradient(180deg, #fff3b0 0%, #fdcb6e 40%, #e17055 100%)';
    } else if (theme === 'choco') {
        t4.style.background = 'linear-gradient(180deg, #3d1c06 0%, #200f04 100%)';
        t3.style.background = 'linear-gradient(180deg, #5c2c0e 0%, #301708 100%)';
        t2.style.background = 'linear-gradient(180deg, #b07d50 0%, #6e4726 100%)';
        t1.style.background = 'linear-gradient(180deg, #faedcd 0%, #c49a6c 100%)';
    } else if (theme === 'matcha') {
        t4.style.background = 'linear-gradient(180deg, #1b4332 0%, #081c15 100%)';
        t3.style.background = 'linear-gradient(180deg, #2d6a4f 0%, #1b4332 100%)';
        t2.style.background = 'linear-gradient(180deg, #52b788 0%, #2d6a4f 100%)';
        t1.style.background = 'linear-gradient(180deg, #d8f3dc 0%, #74c69d 100%)';
    } else if (theme === 'galaxy') {
        t4.style.background = 'linear-gradient(180deg, #0f0c29 0%, #000000 100%)';
        t3.style.background = 'linear-gradient(180deg, #24243e 0%, #0f0c29 100%)';
        t2.style.background = 'linear-gradient(180deg, #6c5ce7 0%, #341f97 100%)';
        t1.style.background = 'linear-gradient(180deg, #fd79a8 0%, #e84393 100%)';
    }

    if (fireworks) fireworks.launchRandom();
}

// ==========================================
// 7. TOAST NOTIFICATIONS & WISH SUBMISSION
// ==========================================
function showCelebrationToast(message) {
    const toastElem = document.getElementById('liveToast');
    if (toastElem) {
        document.getElementById('toast-msg').innerText = message;
        const toast = new bootstrap.Toast(toastElem);
        toast.show();
    }
}

function submitWish(event) {
    event.preventDefault();
    const authorInput = document.getElementById('wish-author');
    const textInput = document.getElementById('wish-text');

    const author = authorInput.value.trim() || 'Người bạn thân thiết';
    const text = textInput.value.trim();

    if (!text) return;

    fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text })
    })
    .then(res => res.json())
    .catch(() => {})
    .finally(() => {
        const list = document.getElementById('wishes-list');
        if (list) {
            const card = document.createElement('div');
            card.className = 'wish-bubble';
            card.innerHTML = `
                <div class="wish-author"><i class="fa-solid fa-heart text-danger me-2"></i>${escapeHtml(author)}</div>
                <div class="mt-1">${escapeHtml(text)}</div>
            `;
            list.insertBefore(card, list.firstChild);
        }

        authorInput.value = '';
        textInput.value = '';

        audioEngine.playCheerSound();
        if (fireworks) fireworks.launchRandom();
        showCelebrationToast(`Lời chúc của ${author} đã được gửi tới Toàn! Cảm ơn bạn!`);
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

// ==========================================
// 8. REAL-TIME CLOCK & LIVE TIME TICKER
// ==========================================
function initLiveClock() {
    const clockElem = document.getElementById('live-digital-clock');
    const dateElem = document.getElementById('current-date-str');
    const youthDaysElem = document.getElementById('youth-days');
    const youthSecsElem = document.getElementById('youth-seconds');

    const birthDate = new Date(2003, 10, 17, 0, 0, 0); // 17/11/2003
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    function updateClock() {
        const now = new Date();

        // 1. Digital Time (HH:MM:SS)
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        if (clockElem) {
            clockElem.innerText = `${hh}:${mm}:${ss}`;
        }

        // 2. Full Date String
        const dayName = daysOfWeek[now.getDay()];
        const dd = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        if (dateElem) {
            dateElem.innerText = `${dayName}, ${dd}/${month}/${yyyy}`;
        }

        // 3. Exact Youth Ticker from 17/11/2003
        const diffMs = now - birthDate;
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalSeconds = Math.floor(diffMs / 1000);

        if (youthDaysElem) {
            youthDaysElem.innerText = totalDays.toLocaleString('vi-VN');
        }
        if (youthSecsElem) {
            youthSecsElem.innerText = totalSeconds.toLocaleString('vi-VN');
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// ==========================================
// 9. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    fireworks = new FireworksEngine('fireworks-canvas');
    initBalloons();

    // Toggle Music Button
    const btnMusic = document.getElementById('btn-music');
    if (btnMusic) {
        btnMusic.addEventListener('click', () => {
            if (!audioEngine.isPlaying) {
                audioEngine.playHappyBirthdaySong();
                btnMusic.innerHTML = `<i class="fa-solid fa-pause me-2"></i>Tạm Dừng Nhạc`;
                btnMusic.classList.replace('btn-glow-blue', 'btn-glow-pink');
            } else {
                audioEngine.stopHappyBirthdaySong();
                btnMusic.innerHTML = `<i class="fa-solid fa-music me-2"></i>Bật Nhạc Sinh Nhật`;
                btnMusic.classList.replace('btn-glow-pink', 'btn-glow-blue');
            }
        });
    }

    // Blow Candles Button
    const btnBlow = document.getElementById('btn-blow');
    if (btnBlow) {
        btnBlow.addEventListener('click', blowCandles);
    }

    // Cut Cake Button
    const btnCut = document.getElementById('btn-cut');
    if (btnCut) {
        btnCut.addEventListener('click', cutCake);
    }

    // Individual flame click
    document.querySelectorAll('.flame').forEach(flame => {
        flame.addEventListener('click', () => {
            flame.classList.toggle('out');
            audioEngine.playPopSound();
        });
    });

    // Fireworks Blast Button
    const btnFireworks = document.getElementById('btn-fireworks');
    if (btnFireworks) {
        btnFireworks.addEventListener('click', () => {
            if (fireworks) {
                for (let i = 0; i < 7; i++) {
                    setTimeout(() => fireworks.launchRandom(), i * 180);
                }
            }
            if (typeof confetti === 'function') {
                confetti({ particleCount: 130, spread: 85, origin: { y: 0.7 } });
            }
        });
    }

    // Modal Slice reset listener
    const cakeSliceModal = document.getElementById('cakeSliceModal');
    if (cakeSliceModal) {
        cakeSliceModal.addEventListener('hidden.bs.modal', resetCakeSlice);
    }

    // First blast of welcome fireworks
    setTimeout(() => {
        if (fireworks) {
            fireworks.launchRandom();
            setTimeout(() => fireworks.launchRandom(), 450);
        }
    }, 1000);
});
