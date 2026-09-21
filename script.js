/* ==========================================================
   HAPPY BIRTHDAY SONAKSHI VERMA - INTERACTIVE JAVASCRIPT
   Birthday: 16 November 2007
   ========================================================== */

(function () {
  'use strict';

  // --- Target Date: 16 November 2007 ---
  const BIRTH_DATE = new Date(2007, 10, 16, 0, 0, 0); // Month is 0-indexed (10 = November)

  // ========================================================
  // 1. LIVE JOURNEY COUNTER (Since 16 Nov 2007)
  // ========================================================
  function updateJourneyCounter() {
    const now = new Date();
    
    // Accurate calculation of elapsed years, months, days, hours, min, sec
    let years = now.getFullYear() - BIRTH_DATE.getFullYear();
    let months = now.getMonth() - BIRTH_DATE.getMonth();
    let days = now.getDate() - BIRTH_DATE.getDate();
    
    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const elYears = document.getElementById('cntYears');
    const elMonths = document.getElementById('cntMonths');
    const elDays = document.getElementById('cntDays');
    const elHours = document.getElementById('cntHours');
    const elMinutes = document.getElementById('cntMinutes');
    const elSeconds = document.getElementById('cntSeconds');

    if (elYears) elYears.textContent = String(years);
    if (elMonths) elMonths.textContent = String(months);
    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateJourneyCounter, 1000);
  updateJourneyCounter();


  // ========================================================
  // 2. ROMANTIC MUSIC PLAYER & WEB AUDIO SYNTHESIZER
  // ========================================================
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicStatusText = document.getElementById('musicStatusText');
  let isMusicPlaying = false;
  let audioContext = null;
  let synthInterval = null;

  // Romantic chord progression generator using Web Audio API (Guaranteed offline music fallback)
  function startRomanticSynth() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Gentle romantic melody notes (Frequencies in Hz: F major / D minor romantic arpeggios)
    const melody = [
      { f: 261.63, d: 0.8 }, // C4
      { f: 329.63, d: 0.8 }, // E4
      { f: 392.00, d: 0.8 }, // G4
      { f: 523.25, d: 1.2 }, // C5
      { f: 440.00, d: 0.8 }, // A4
      { f: 349.23, d: 0.8 }, // F4
      { f: 392.00, d: 1.0 }, // G4
      { f: 329.63, d: 1.4 }, // E4
      { f: 293.66, d: 0.8 }, // D4
      { f: 349.23, d: 0.8 }, // F4
      { f: 440.00, d: 1.2 }, // A4
      { f: 392.00, d: 1.6 }  // G4
    ];

    let noteIndex = 0;

    function playNextNote() {
      if (!isMusicPlaying) return;
      const note = melody[noteIndex % melody.length];
      noteIndex++;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'triangle'; // Warm, soft music-box / piano timbre
      osc.frequency.setValueAtTime(note.f, audioContext.currentTime);

      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + note.d);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + note.d);

      synthInterval = setTimeout(playNextNote, (note.d * 750));
    }

    playNextNote();
  }

  function stopRomanticSynth() {
    if (synthInterval) {
      clearTimeout(synthInterval);
      synthInterval = null;
    }
  }

  // Play a soft pleasant chime sound when interacting
  function playSparkleChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContext || new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // AudioCtx disabled or not permitted yet
    }
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      // Stop music
      if (bgMusic) bgMusic.pause();
      stopRomanticSynth();
      isMusicPlaying = false;
      musicBtn.classList.remove('playing');
      if (musicStatusText) musicStatusText.textContent = 'Tap to Play Music 💖';
    } else {
      // Start music
      isMusicPlaying = true;
      musicBtn.classList.add('playing');
      if (musicStatusText) musicStatusText.textContent = 'Playing For Sonakshi 🎶';

      if (bgMusic) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
          playPromise.catch(function () {
            // If audio file is blocked or fails, use the Web Audio synthesizer seamlessly!
            startRomanticSynth();
          });
        }
      } else {
        startRomanticSynth();
      }
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }


  // ========================================================
  // 3. AMBIENT CANVAS (Floating Hearts, Petals & Stars)
  // ========================================================
  const ambientCanvas = document.getElementById('ambientCanvas');
  const actx = ambientCanvas ? ambientCanvas.getContext('2d') : null;
  let ambientParticles = [];

  function resizeAmbientCanvas() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeAmbientCanvas);
  resizeAmbientCanvas();

  class AmbientParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      if (!ambientCanvas) return;
      this.x = Math.random() * ambientCanvas.width;
      this.y = initial ? Math.random() * ambientCanvas.height : ambientCanvas.height + 20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.25;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      // Types: 0 = heart, 1 = star sparkle, 2 = rose petal
      this.type = Math.floor(Math.random() * 3);
      this.color = ['#ff8fab', '#ffb3c6', '#cdb4db', '#ffd166', '#ffcbf2'][Math.floor(Math.random() * 5)];
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4;
      this.rotation += this.rotSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      if (!actx) return;
      actx.save();
      actx.translate(this.x, this.y);
      actx.rotate((this.rotation * Math.PI) / 180);
      actx.globalAlpha = this.opacity;

      if (this.type === 0) {
        // Draw Heart
        actx.fillStyle = this.color;
        const s = this.size * 0.5;
        actx.beginPath();
        actx.moveTo(0, s * 0.3);
        actx.bezierCurveTo(-s, -s * 0.6, -s * 1.4, s * 0.4, 0, s * 1.4);
        actx.bezierCurveTo(s * 1.4, s * 0.4, s, -s * 0.6, 0, s * 0.3);
        actx.fill();
      } else if (this.type === 1) {
        // Draw 4-point Sparkle Star
        actx.fillStyle = '#ffffff';
        actx.shadowColor = this.color;
        actx.shadowBlur = 6;
        const s = this.size * 0.4;
        actx.beginPath();
        actx.moveTo(0, -s * 2);
        actx.quadraticCurveTo(0, 0, s * 2, 0);
        actx.quadraticCurveTo(0, 0, 0, s * 2);
        actx.quadraticCurveTo(0, 0, -s * 2, 0);
        actx.quadraticCurveTo(0, 0, 0, -s * 2);
        actx.fill();
      } else {
        // Draw Rose Petal
        actx.fillStyle = this.color;
        const s = this.size * 0.5;
        actx.beginPath();
        actx.ellipse(0, 0, s * 0.8, s * 1.4, 0, 0, Math.PI * 2);
        actx.fill();
      }

      actx.restore();
    }
  }

  function initAmbientParticles() {
    ambientParticles = [];
    const count = Math.min(Math.floor(window.innerWidth / 30), 45);
    for (let i = 0; i < count; i++) {
      ambientParticles.push(new AmbientParticle());
    }
  }

  initAmbientParticles();

  function animateAmbient() {
    if (actx && ambientCanvas) {
      actx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
      for (let i = 0; i < ambientParticles.length; i++) {
        ambientParticles[i].update();
        ambientParticles[i].draw();
      }
    }
    requestAnimationFrame(animateAmbient);
  }

  animateAmbient();


  // ========================================================
  // 4. CONFETTI & FIREWORKS CANNON ENGINE
  // ========================================================
  const confettiCanvas = document.getElementById('confettiCanvas');
  const cctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiPieces = [];
  let fireworksRockets = [];
  let fireworksSparks = [];

  function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();

  class ConfettiPiece {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx || (Math.random() - 0.5) * 12;
      this.vy = vy || (Math.random() * -14 - 6);
      this.size = Math.random() * 8 + 6;
      this.gravity = 0.25;
      this.drag = 0.96;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 12;
      this.colors = ['#ff4d6d', '#ff8fab', '#b39ddb', '#ffd166', '#06d6a0', '#ffffff', '#e0aaff'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.opacity = 1;
      this.life = 0;
      this.maxLife = Math.random() * 100 + 120;
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.life++;
      if (this.life > this.maxLife - 30) {
        this.opacity = Math.max(0, (this.maxLife - this.life) / 30);
      }
    }

    draw() {
      if (!cctx) return;
      cctx.save();
      cctx.translate(this.x, this.y);
      cctx.rotate((this.rotation * Math.PI) / 180);
      cctx.globalAlpha = this.opacity;
      cctx.fillStyle = this.color;
      cctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      cctx.restore();
    }
  }

  class FireworkSpark {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.color = color;
      this.radius = Math.random() * 2.5 + 1.5;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.gravity = 0.08;
    }

    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      if (!cctx) return;
      cctx.save();
      cctx.globalAlpha = Math.max(0, this.alpha);
      cctx.fillStyle = this.color;
      cctx.shadowColor = this.color;
      cctx.shadowBlur = 8;
      cctx.beginPath();
      cctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      cctx.fill();
      cctx.restore();
    }
  }

  function launchConfettiBlast(originX, originY, count = 120) {
    playSparkleChime();
    const x = originX !== undefined ? originX : window.innerWidth / 2;
    const y = originY !== undefined ? originY : window.innerHeight * 0.6;
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) + Math.PI; // Upward spray
      const force = Math.random() * 18 + 8;
      const vx = Math.cos(angle) * force;
      const vy = Math.sin(angle) * force;
      confettiPieces.push(new ConfettiPiece(x, y, vx, vy));
    }
  }

  function triggerFireworksDisplay(rounds = 6) {
    const colors = ['#ff4d6d', '#ff8fab', '#cdb4db', '#ffd166', '#a2d2ff', '#ffffff'];
    for (let r = 0; r < rounds; r++) {
      setTimeout(() => {
        const x = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
        const y = Math.random() * (window.innerHeight * 0.5) + (window.innerHeight * 0.15);
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 60; i++) {
          fireworksSparks.push(new FireworkSpark(x, y, color));
        }
      }, r * 280);
    }
  }

  function animateConfetti() {
    if (cctx && confettiCanvas) {
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      // Update & draw confetti
      for (let i = confettiPieces.length - 1; i >= 0; i--) {
        confettiPieces[i].update();
        confettiPieces[i].draw();
        if (confettiPieces[i].opacity <= 0 || confettiPieces[i].y > confettiCanvas.height + 50) {
          confettiPieces.splice(i, 1);
        }
      }

      // Update & draw fireworks
      for (let j = fireworksSparks.length - 1; j >= 0; j--) {
        fireworksSparks[j].update();
        fireworksSparks[j].draw();
        if (fireworksSparks[j].alpha <= 0) {
          fireworksSparks.splice(j, 1);
        }
      }
    }
    requestAnimationFrame(animateConfetti);
  }

  animateConfetti();


  // ========================================================
  // 5. HERO SURPRISE BUTTON ACTION
  // ========================================================
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', function (e) {
      const rect = openSurpriseBtn.getBoundingClientRect();
      launchConfettiBlast(rect.left + rect.width / 2, rect.top);
      triggerFireworksDisplay(3);

      const target = document.getElementById('specialDateSection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ========================================================
  // 6. CUTE CATS SECTION INTERACTIONS
  // ========================================================
  window.celebrateCat = function (button, emoji) {
    playSparkleChime();
    const originalText = button.textContent;
    button.textContent = `Paws Love! ${emoji}`;
    button.style.background = '#ff4d6d';
    button.style.color = '#ffffff';

    const rect = button.getBoundingClientRect();
    launchConfettiBlast(rect.left + rect.width / 2, rect.top, 30);

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 1800);
  };

  // Image error handling fallback for GIF cards & Polaroids
  const catImages = document.querySelectorAll('.cat-gif-img');
  catImages.forEach((img) => {
    img.addEventListener('error', function () {
      // Fallback cute SVG illustration if remote GIF fails
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220"><rect width="300" height="220" fill="%23ffe5ec"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="60">🐱</text><text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23d81b60">Cute Birthday Kitty ❤️</text></svg>';
    });
  });

  const polaroidImages = document.querySelectorAll('.polaroid-img');
  polaroidImages.forEach((pimg) => {
    pimg.addEventListener('error', function () {
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23fce4ec"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="80">🌸</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23d81b60">Beautiful Memory ✨</text></svg>';
    });
  });


  // ========================================================
  // 7. POLAROID GALLERY & LIGHTBOX MODAL
  // ========================================================
  const memoryModal = document.getElementById('memoryModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');

  const memoryData = {
    1: {
      src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=900&auto=format&fit=crop&q=80',
      caption: 'Your radiant grace 🌸 — Pure elegance'
    },
    2: {
      src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=80',
      caption: 'Dreamy night skies 🌌 — Under the stars'
    },
    3: {
      src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=80',
      caption: 'Sweet kitten cuddles 💕 — Pure softness'
    },
    4: {
      src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&auto=format&fit=crop&q=80',
      caption: 'The prettiest flowers 💐 — Like your smile'
    },
    5: {
      src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&auto=format&fit=crop&q=80',
      caption: 'Sweet celebrations 🍰 — 16 November joy'
    },
    6: {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
      caption: 'Golden hour warmth ☀️ — Endless horizons'
    }
  };

  window.openMemoryModal = function (id) {
    if (!memoryModal || !modalImg || !modalCaption) return;
    const item = memoryData[id];
    if (item) {
      modalImg.src = item.src;
      modalCaption.textContent = item.caption;
      memoryModal.classList.add('active');
      playSparkleChime();
    }
  };

  window.closeMemoryModal = function (e) {
    if (memoryModal) {
      memoryModal.classList.remove('active');
    }
  };


  // ========================================================
  // 8. INTERACTIVE LOVE LETTER 💌 & TYPEWRITER EFFECT
  // ========================================================
  const envelope3d = document.getElementById('envelope3d');
  const typedLetterText = document.getElementById('typedLetterText');
  const envelopePrompt = document.getElementById('envelopePrompt');
  let isEnvelopeOpen = false;
  let typeTimer = null;

  const letterContent = 
`Dearest Sonakshi,

Happy Birthday! 🌸 

Every year, 16 November comes as a sweet reminder of just how special you are. You bring a warmth that makes ordinary moments feel extraordinary, a quiet grace that inspires everyone around you, and a laugh that brightens any cloudy sky.

May this new year of your life be filled with gentle mornings, boundless laughter, dreams fulfilled, and hearts that appreciate the magnificent soul you are.

Keep shining as brightly as ever. Happy Birthday! ❤️`;

  function typeWriterEffect(text, index = 0) {
    if (!typedLetterText) return;
    if (index === 0) {
      typedLetterText.textContent = '';
    }
    if (index < text.length) {
      typedLetterText.textContent += text.charAt(index);
      typeTimer = setTimeout(() => {
        typeWriterEffect(text, index + 1);
      }, 35);
    }
  }

  window.toggleEnvelope = function () {
    if (!envelope3d) return;
    isEnvelopeOpen = !isEnvelopeOpen;

    if (isEnvelopeOpen) {
      envelope3d.classList.add('open');
      playSparkleChime();
      const rect = envelope3d.getBoundingClientRect();
      launchConfettiBlast(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

      if (envelopePrompt) {
        envelopePrompt.innerHTML = '✨ Your letter has unfolded with love! ✨';
      }

      if (typeTimer) clearTimeout(typeTimer);
      setTimeout(() => {
        typeWriterEffect(letterContent);
      }, 600);
    } else {
      envelope3d.classList.remove('open');
      if (typeTimer) clearTimeout(typeTimer);
      if (typedLetterText) typedLetterText.textContent = '';
      if (envelopePrompt) {
        envelopePrompt.innerHTML = '<span class="pulse-indicator">👉</span> Tap the envelope to open your letter! <span class="pulse-indicator">👈</span>';
      }
    }
  };


  // ========================================================
  // 9. INTERACTIVE BIRTHDAY CAKE & BLOWING CANDLES 🎂
  // ========================================================
  const candles = document.querySelectorAll('.candle');
  const wishBanner = document.getElementById('wishBanner');
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  let areCandlesBlown = false;

  window.blowOutCandles = function () {
    if (areCandlesBlown) return;
    areCandlesBlown = true;

    // Blow out each candle
    candles.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add('blown-out');
      }, idx * 120);
    });

    playSparkleChime();

    // Massive celebration bursts
    const cakeEl = document.getElementById('interactiveCake');
    const rect = cakeEl ? cakeEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
    launchConfettiBlast(rect.left + rect.width / 2, rect.top + 30, 150);
    triggerFireworksDisplay(8);

    if (blowCandleBtn) {
      blowCandleBtn.style.display = 'none';
    }

    if (wishBanner) {
      wishBanner.classList.add('active');
    }
  };

  window.relightCandles = function () {
    areCandlesBlown = false;
    candles.forEach((c) => {
      c.classList.remove('blown-out');
    });
    if (wishBanner) {
      wishBanner.classList.remove('active');
    }
    if (blowCandleBtn) {
      blowCandleBtn.style.display = 'inline-flex';
    }
    playSparkleChime();
  };


  // ========================================================
  // 10. SURPRISE GIFT BOX 🎁
  // ========================================================
  const interactiveGift = document.getElementById('interactiveGift');
  const giftRevealed = document.getElementById('giftRevealed');
  const giftPrompt = document.getElementById('giftPrompt');
  const reasonDisplay = document.getElementById('reasonDisplay');
  let isGiftOpen = false;

  window.openGiftBox = function () {
    if (isGiftOpen) return;
    isGiftOpen = true;

    if (interactiveGift) {
      interactiveGift.classList.add('open');
    }

    playSparkleChime();

    const rect = interactiveGift ? interactiveGift.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
    launchConfettiBlast(rect.left + rect.width / 2, rect.top, 100);
    triggerFireworksDisplay(6);

    if (giftPrompt) {
      giftPrompt.innerHTML = '🎉 Surprise Unboxed! 🎉';
    }

    if (giftRevealed) {
      giftRevealed.classList.add('active');
    }
  };

  window.showReason = function (message) {
    playSparkleChime();
    if (reasonDisplay) {
      reasonDisplay.textContent = message;
      reasonDisplay.style.transform = 'scale(1.05)';
      setTimeout(() => {
        reasonDisplay.style.transform = 'scale(1)';
      }, 300);
    }
  };


  // ========================================================
  // 11. CLICK / TOUCH FLOATING HEARTS GENERATOR
  // ========================================================
  const clickHeartContainer = document.getElementById('clickHeartContainer');
  const heartEmojis = ['💖', '💕', '🌸', '✨', '🎂', '🐱', '🌷', '💓'];

  function spawnClickHeart(x, y) {
    if (!clickHeartContainer) return;
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    clickHeartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1400);
  }

  document.addEventListener('pointerdown', function (e) {
    // Avoid interfering with button clicks
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('.music-floating-widget')) {
      spawnClickHeart(e.clientX, e.clientY);
    }
  });


  // ========================================================
  // 12. REPLAY SURPRISE BUTTON
  // ========================================================
  window.replaySurprise = function () {
    // Reset candle & gift states
    if (areCandlesBlown) {
      relightCandles();
    }
    if (isGiftOpen && interactiveGift) {
      interactiveGift.classList.remove('open');
      isGiftOpen = false;
      if (giftRevealed) giftRevealed.classList.remove('active');
      if (giftPrompt) {
        giftPrompt.innerHTML = '<span>✨ Tap the gift box to unwrap your surprise! ✨</span>';
      }
    }
    if (isEnvelopeOpen && envelope3d) {
      toggleEnvelope();
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      launchConfettiBlast(window.innerWidth / 2, window.innerHeight * 0.4, 120);
      triggerFireworksDisplay(5);
    }, 600);
  };

})();
