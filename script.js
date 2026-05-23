/* ═══════════════════════════════════════════════════════════
   THIS OR THAT  ·  Premium Relationship Game  ·  script.js
   ═══════════════════════════════════════════════════════════ */

"use strict";

/* ─── WHATSAPP NUMBER ──────────────────────────────────────── */
const WA_NUMBER = "2347032665212"; // Nigerian format with country code

/* ─── 30 ROMANTIC QUESTIONS ────────────────────────────────── */
const ALL_QUESTIONS = [
  {
    text: "How do you love to be greeted after a long day?",
    optionA: "Slow, deep kiss",
    optionB: "Warm, tight hug",
    emoji: "💋",
    media: { type: "emoji", value: "💋" },
    reactions: ["💋", "🥰"]
  },
  {
    text: "Your perfect romantic evening?",
    optionA: "Candlelit dinner for two",
    optionB: "Stargazing on a blanket",
    emoji: "🌹",
    media: { type: "emoji", value: "🌹" },
    reactions: ["🍷", "✨"]
  },
  {
    text: "What's your love language?",
    optionA: "Sweet, whispered words",
    optionB: "Gentle, tender touch",
    emoji: "💬",
    media: { type: "emoji", value: "💬" },
    reactions: ["🗣️", "🤝"]
  },
  {
    text: "Waking up next to someone — you want to...",
    optionA: "Steal sleepy cuddles",
    optionB: "Make breakfast in bed",
    emoji: "🌅",
    media: { type: "emoji", value: "🌅" },
    reactions: ["😴", "🍳"]
  },
  {
    text: "Your ideal romantic getaway?",
    optionA: "Cozy mountain cabin",
    optionB: "Secluded beach resort",
    emoji: "🏝️",
    media: { type: "emoji", value: "🏝️" },
    reactions: ["⛰️", "🌊"]
  },
  {
    text: "Late night vibes — you prefer...",
    optionA: "Deep 2 AM conversations",
    optionB: "Slow dancing in the kitchen",
    emoji: "🌙",
    media: { type: "emoji", value: "🌙" },
    reactions: ["💭", "💃"]
  },
  {
    text: "You'd rather receive...",
    optionA: "Handwritten love letter",
    optionB: "Surprise bouquet of roses",
    emoji: "💌",
    media: { type: "emoji", value: "💌" },
    reactions: ["✍️", "🌸"]
  },
  {
    text: "A spontaneous date — you'd pick...",
    optionA: "Midnight drive with music",
    optionB: "Surprise picnic at sunset",
    emoji: "🚗",
    media: { type: "emoji", value: "🚗" },
    reactions: ["🎵", "🌇"]
  },
  {
    text: "What's more seductive to you?",
    optionA: "A slow, knowing smile",
    optionB: "A confident, lingering gaze",
    emoji: "👀",
    media: { type: "emoji", value: "👀" },
    reactions: ["😏", "🔥"]
  },
  {
    text: "How do you prefer to fall asleep?",
    optionA: "Wrapped in their arms",
    optionB: "Fingers intertwined",
    emoji: "💤",
    media: { type: "emoji", value: "💤" },
    reactions: ["🤗", "🤞"]
  },
  {
    text: "On a rainy day, you want to...",
    optionA: "Watch movies and cuddle",
    optionB: "Dance in the rain together",
    emoji: "🌧️",
    media: { type: "emoji", value: "🌧️" },
    reactions: ["🎬", "💧"]
  },
  {
    text: "Your ideal date energy?",
    optionA: "Playful and teasing",
    optionB: "Intense and passionate",
    emoji: "⚡",
    media: { type: "emoji", value: "⚡" },
    reactions: ["😜", "🔥"]
  },
  {
    text: "You'd rather be with someone who...",
    optionA: "Always makes you laugh",
    optionB: "Always makes you feel safe",
    emoji: "❤️",
    media: { type: "emoji", value: "❤️" },
    reactions: ["😂", "🛡️"]
  },
  {
    text: "First date setting?",
    optionA: "Jazz bar with low lighting",
    optionB: "Rooftop dinner under the stars",
    emoji: "🎷",
    media: { type: "emoji", value: "🎷" },
    reactions: ["🎶", "⭐"]
  },
  {
    text: "How do you flirt?",
    optionA: "Subtle hints and mystery",
    optionB: "Bold, direct and daring",
    emoji: "😉",
    media: { type: "emoji", value: "😉" },
    reactions: ["🕵️", "😈"]
  },
  {
    text: "Which gift would sweep you off your feet?",
    optionA: "A playlist made just for you",
    optionB: "A weekend trip — just you two",
    emoji: "🎁",
    media: { type: "emoji", value: "🎁" },
    reactions: ["🎧", "✈️"]
  },
  {
    text: "Texting style in a relationship?",
    optionA: "Good morning & goodnight always",
    optionB: "Random 'thinking of you' surprises",
    emoji: "📱",
    media: { type: "emoji", value: "📱" },
    reactions: ["🌅", "💭"]
  },
  {
    text: "How would you describe your kiss style?",
    optionA: "Soft and slow — savoring every second",
    optionB: "Hungry and spontaneous",
    emoji: "👄",
    media: { type: "emoji", value: "👄" },
    reactions: ["😚", "💥"]
  },
  {
    text: "Your partner dresses up for you — you want...",
    optionA: "Elegant and sophisticated",
    optionB: "Effortlessly sexy & casual",
    emoji: "👗",
    media: { type: "emoji", value: "👗" },
    reactions: ["💎", "😍"]
  },
  {
    text: "The most romantic gesture?",
    optionA: "Remembering the little things",
    optionB: "Grand, unexpected surprises",
    emoji: "🌟",
    media: { type: "emoji", value: "🌟" },
    reactions: ["🧠", "🎉"]
  },
  {
    text: "Your ideal relationship vibe is...",
    optionA: "Best friends who fell in love",
    optionB: "Magnetic, undeniable chemistry",
    emoji: "🔮",
    media: { type: "emoji", value: "🔮" },
    reactions: ["👫", "⚡"]
  },
  {
    text: "When it comes to affection in public?",
    optionA: "Holding hands everywhere",
    optionB: "Stolen glances & secret smiles",
    emoji: "👥",
    media: { type: "emoji", value: "👥" },
    reactions: ["🤝", "😏"]
  },
  {
    text: "Your love story begins with...",
    optionA: "Eyes meeting across a room",
    optionB: "Unexpected conversation at 3 AM",
    emoji: "📖",
    media: { type: "emoji", value: "📖" },
    reactions: ["👁️", "🌙"]
  },
  {
    text: "The scent you find most irresistible?",
    optionA: "Warm vanilla & sandalwood",
    optionB: "Fresh citrus & sea breeze",
    emoji: "🌺",
    media: { type: "emoji", value: "🌺" },
    reactions: ["🕯️", "🌊"]
  },
  {
    text: "Late night food run — you're picking...",
    optionA: "Dessert: chocolate fondue for two",
    optionB: "Spicy street food adventure",
    emoji: "🍫",
    media: { type: "emoji", value: "🍫" },
    reactions: ["🍬", "🌶️"]
  },
  {
    text: "Your partner surprises you at work — you feel...",
    optionA: "Butterflies — totally swept away",
    optionB: "Electric — everyone can tell",
    emoji: "🦋",
    media: { type: "emoji", value: "🦋" },
    reactions: ["😳", "🤩"]
  },
  {
    text: "A song comes on. You two...",
    optionA: "Slow dance right where you are",
    optionB: "Sing every word to each other",
    emoji: "🎵",
    media: { type: "emoji", value: "🎵" },
    reactions: ["💃", "🎤"]
  },
  {
    text: "Your version of 'forever' looks like...",
    optionA: "Growing old together quietly",
    optionB: "Adventuring until our last breath",
    emoji: "♾️",
    media: { type: "emoji", value: "♾️" },
    reactions: ["🏡", "🌍"]
  },
  {
    text: "The most intimate thing two people can share?",
    optionA: "Deepest fears and secret dreams",
    optionB: "Comfortable, wordless silence",
    emoji: "🫀",
    media: { type: "emoji", value: "🫀" },
    reactions: ["💬", "🤫"]
  },
  {
    text: "If love had a flavor, yours would be...",
    optionA: "Rich dark chocolate — intense & complex",
    optionB: "Ripe strawberries — sweet & irresistible",
    emoji: "🍓",
    media: { type: "emoji", value: "🍓" },
    reactions: ["🍫", "🍓"]
  }
];

/* ─── PERSONALITY PROFILES ─────────────────────────────────── */
const PERSONALITIES = [
  { min: 85, label: "The Passionate Romantic 🔥", desc: "You love fiercely and intensely. No half-measures — when you love, the whole world knows." },
  { min: 70, label: "The Tender Lover 🌹", desc: "Soft, deep, and genuine. You find magic in the quiet moments others overlook." },
  { min: 55, label: "The Playful Seducer 😏", desc: "Charming, spontaneous, and irresistible. You turn every moment into an adventure." },
  { min: 40, label: "The Loyal Dreamer 💫", desc: "You love with loyalty and longing. Your ideal love is a slow-burning, forever kind." },
  { min: 0,  label: "The Mystery & Depth 🌙", desc: "Complex, guarded, but deeply magnetic. The right person will unlock worlds in you." }
];

/* ─── APP STATE ────────────────────────────────────────────── */
const state = {
  playerName:    "",
  questions:     [],
  currentIndex:  0,
  answers:       [],  // { question, chosen, optionA, optionB }
  timerMode:     false,
  timerInterval: null,
  timerSeconds:  10,
  timerLeft:     10,
  musicOn:       false,
  theme:         "dark",
  touchStartX:   0,
  touchStartY:   0,
};

/* ─── DOM REFERENCES ──────────────────────────────────────── */
const $ = id => document.getElementById(id);

const dom = {
  ageModal:      $("ageModal"),
  ageYes:        $("ageYes"),
  ageNo:         $("ageNo"),
  landingPage:   $("landingPage"),
  gamePage:      $("gamePage"),
  resultsPage:   $("resultsPage"),
  playerName:    $("playerName"),
  startBtn:      $("startBtn"),
  timerModeBtn:  $("timerModeBtn"),
  musicToggle:   $("musicToggle"),
  themeToggle:   $("themeToggle"),
  playerGreet:   $("playerGreet"),
  questionCount: $("questionCount"),
  progressFill:  $("progressFill"),
  timerBar:      $("timerBar"),
  timerFill:     $("timerFill"),
  cardMedia:     $("cardMedia"),
  questionText:  $("questionText"),
  questionEmoji: $("questionEmoji"),
  optionA:       $("optionA"),
  optionAText:   $("optionAText"),
  optionB:       $("optionB"),
  optionBText:   $("optionBText"),
  reactionPop:   $("reactionPop"),
  skipBtn:       $("skipBtn"),
  restartBtn:    $("restartBtn"),
  resultsName:   $("resultsName"),
  scoreNumber:   $("scoreNumber"),
  ringFill:      $("ringFill"),
  personalityTag:$("personalityTag"),
  answersSummary:$("answersSummary"),
  whatsappBtn:   $("whatsappBtn"),
  shareBtn:      $("shareBtn"),
  playAgainBtn:  $("playAgainBtn"),
  questionCard:  $("questionCard"),
  bgMusic:       $("bgMusic"),
  sfxClick:      $("sfxClick"),
  sfxWin:        $("sfxWin"),
  particles:     $("particles"),
  confettiCanvas:$("confettiCanvas"),
};

/* ─── UTILITIES ────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playSfx(el) {
  if (!el) return;
  el.currentTime = 0;
  el.play().catch(() => {});
}

function showPage(id) {
  ["landingPage", "gamePage", "resultsPage"].forEach(pid => {
    const pg = $(pid);
    if (pg) {
      pg.classList.remove("active");
      pg.style.pointerEvents = "none";
    }
  });
  const target = $(id);
  if (target) {
    target.classList.add("active");
    target.style.pointerEvents = "auto";
    target.scrollTop = 0;
  }
}

function saveProgress() {
  try {
    localStorage.setItem("tot_answers", JSON.stringify(state.answers));
    localStorage.setItem("tot_name",    state.playerName);
    localStorage.setItem("tot_index",   state.currentIndex);
  } catch (e) {}
}

function loadProgress() {
  try {
    const a = localStorage.getItem("tot_answers");
    const n = localStorage.getItem("tot_name");
    const i = localStorage.getItem("tot_index");
    if (a) state.answers     = JSON.parse(a);
    if (n) state.playerName  = n;
    if (i) state.currentIndex = parseInt(i, 10);
  } catch (e) {}
}

/* ─── PARTICLES ────────────────────────────────────────────── */
(function initParticles() {
  const canvas = dom.particles;
  const ctx    = canvas.getContext("2d");
  const SYMBOLS = ["✦", "✧", "·", "❤", "✿"];
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      symbol:  SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size:    Math.random() * 10 + 4,
      opacity: Math.random() * 0.35 + 0.05,
      vx:      (Math.random() - 0.5) * 0.4,
      vy:      -(Math.random() * 0.5 + 0.1),
      life:    1,
      decay:   Math.random() * 0.002 + 0.001,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 60 }, createParticle);
    window.addEventListener("resize", resize);
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0 || p.y < -20) { particles[idx] = createParticle(); return; }
      ctx.globalAlpha = p.life * p.opacity;
      ctx.fillStyle   = "#e8457a";
      ctx.font        = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }

  init();
})();

/* ─── AGE MODAL ─────────────────────────────────────────────── */
function initAgeModal() {
  const confirmed = localStorage.getItem("tot_age");
  if (confirmed) { dom.ageModal.style.display = "none"; return; }

  dom.ageYes.addEventListener("click", () => {
    localStorage.setItem("tot_age", "1");
    dom.ageModal.style.opacity = "0";
    dom.ageModal.style.transition = "opacity 0.4s ease";
    setTimeout(() => dom.ageModal.style.display = "none", 400);
    playSfx(dom.sfxClick);
  });

  dom.ageNo.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

/* ─── THEME TOGGLE ──────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem("tot_theme") || "dark";
  setTheme(saved);

  dom.themeToggle.addEventListener("click", () => {
    setTheme(state.theme === "dark" ? "light" : "dark");
    playSfx(dom.sfxClick);
  });
}

function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute("data-theme", theme);
  dom.themeToggle.innerHTML = theme === "dark"
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("tot_theme", theme);
}

/* ─── MUSIC TOGGLE ──────────────────────────────────────────── */
function initMusic() {
  dom.musicToggle.addEventListener("click", () => {
    state.musicOn = !state.musicOn;
    if (state.musicOn) {
      dom.bgMusic.play().catch(() => {});
      dom.musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      dom.bgMusic.pause();
      dom.musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    }
    playSfx(dom.sfxClick);
  });
}

/* ─── LANDING PAGE ──────────────────────────────────────────── */
function initLanding() {
  // Restore name
  const savedName = localStorage.getItem("tot_name");
  if (savedName) dom.playerName.value = savedName;

  dom.startBtn.addEventListener("click", () => {
    playSfx(dom.sfxClick);
    startGame(false);
  });

  dom.timerModeBtn.addEventListener("click", () => {
    playSfx(dom.sfxClick);
    startGame(true);
  });

  // Enter key
  dom.playerName.addEventListener("keydown", e => {
    if (e.key === "Enter") startGame(false);
  });
}

function startGame(timerMode) {
  const raw = dom.playerName.value.trim();
  state.playerName = raw || "Lover";
  localStorage.setItem("tot_name", state.playerName);

  state.timerMode   = timerMode;
  state.questions   = shuffle(ALL_QUESTIONS);
  state.currentIndex = 0;
  state.answers     = [];

  showPage("gamePage");
  renderQuestion();
}

/* ─── GAME LOGIC ────────────────────────────────────────────── */
function renderQuestion() {
  clearTimer();

  const q = state.questions[state.currentIndex];
  if (!q) { endGame(); return; }

  const total = state.questions.length;
  const idx   = state.currentIndex;

  // Greet
  dom.playerGreet.textContent = idx === 0
    ? `Hey, ${state.playerName}… 💋`
    : `Question ${idx + 1} of ${total}`;

  dom.questionCount.textContent = `${idx + 1} / ${total}`;
  dom.progressFill.style.width  = `${(idx / total) * 100}%`;

  // Media
  dom.cardMedia.innerHTML = "";
  if (q.media) {
    if (q.media.type === "emoji") {
      dom.cardMedia.innerHTML = `<span class="media-emoji">${q.media.value}</span>`;
    } else if (q.media.type === "image") {
      dom.cardMedia.innerHTML = `<img src="${q.media.value}" alt="Question visual" loading="lazy" />`;
    } else if (q.media.type === "video") {
      dom.cardMedia.innerHTML = `<video src="${q.media.value}" autoplay muted loop playsinline></video>`;
    }
  }

  // Question & options
  dom.questionText.textContent  = q.text;
  dom.questionEmoji.textContent = q.emoji || "";
  dom.optionAText.textContent   = q.optionA;
  dom.optionBText.textContent   = q.optionB;

  // Reset buttons
  dom.optionA.classList.remove("selected");
  dom.optionB.classList.remove("selected");
  dom.optionA.disabled = false;
  dom.optionB.disabled = false;
  dom.reactionPop.className = "reaction-pop";
  dom.reactionPop.textContent = "";

  // Timer mode
  if (state.timerMode) {
    dom.timerBar.style.display = "block";
    dom.timerFill.style.width  = "100%";
    startTimer();
  } else {
    dom.timerBar.style.display = "none";
  }
}

function animateCardIn() {
  dom.questionCard.style.transform = "translateX(0)";
  dom.questionCard.style.opacity   = "1";
}

function handleAnswer(chosen, btnEl) {
  const q = state.questions[state.currentIndex];
  clearTimer();

  // Disable both buttons
  dom.optionA.disabled = true;
  dom.optionB.disabled = true;
  btnEl.classList.add("selected");

  // Ripple
  addRipple(btnEl);

  // Reaction pop
  const reactionList = q.reactions || ["❤️", "💖"];
  const reaction = reactionList[chosen === "A" ? 0 : 1];
  dom.reactionPop.textContent = reaction;
  dom.reactionPop.classList.add("show");

  // Save answer
  state.answers.push({
    question: q.text,
    chosen,
    optionA: q.optionA,
    optionB: q.optionB,
    selected: chosen === "A" ? q.optionA : q.optionB,
  });

  playSfx(dom.sfxClick);
  saveProgress();

  // Transition to next
  setTimeout(() => {
    dom.reactionPop.classList.remove("show");
    dom.questionCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    dom.questionCard.style.transform  = chosen === "A"
      ? "translateX(-110%) rotate(-4deg)"
      : "translateX(110%) rotate(4deg)";
    dom.questionCard.style.opacity = "0";

    setTimeout(() => {
      state.currentIndex++;
      dom.questionCard.style.transition = "none";
      dom.questionCard.style.transform  = chosen === "A"
        ? "translateX(80px)"
        : "translateX(-80px)";
      dom.questionCard.style.opacity = "0";

      renderQuestion();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dom.questionCard.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease";
          dom.questionCard.style.transform  = "translateX(0)";
          dom.questionCard.style.opacity    = "1";
        });
      });
    }, 150);
  }, 700);
}

function addRipple(btn) {
  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";
  const rect = btn.getBoundingClientRect();
  ripple.style.left = (rect.width / 2) + "px";
  ripple.style.top  = (rect.height / 2) + "px";
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

/* ─── TIMER ─────────────────────────────────────────────────── */
function startTimer() {
  state.timerLeft = state.timerSeconds;
  dom.timerFill.style.transition = "none";
  dom.timerFill.style.width = "100%";

  setTimeout(() => {
    dom.timerFill.style.transition = `width ${state.timerSeconds}s linear`;
    dom.timerFill.style.width = "0%";
  }, 50);

  state.timerInterval = setTimeout(() => {
    // Auto-skip on timeout — pick random
    const rand = Math.random() < 0.5 ? "A" : "B";
    handleAnswer(rand, rand === "A" ? dom.optionA : dom.optionB);
  }, state.timerSeconds * 1000);
}

function clearTimer() {
  if (state.timerInterval) { clearTimeout(state.timerInterval); state.timerInterval = null; }
}

/* ─── SWIPE SUPPORT ─────────────────────────────────────────── */
function initSwipe() {
  const card = dom.questionCard;

  card.addEventListener("touchstart", e => {
    state.touchStartX = e.touches[0].clientX;
    state.touchStartY = e.touches[0].clientY;
  }, { passive: true });

  card.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - state.touchStartX;
    const dy = e.changedTouches[0].clientY - state.touchStartY;

    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dom.optionA.disabled) return; // already answered
      if (dx > 0) handleAnswer("A", dom.optionA);
      else        handleAnswer("B", dom.optionB);
    }
  }, { passive: true });
}

/* ─── SKIP & RESTART ────────────────────────────────────────── */
function initGameControls() {
  dom.optionA.addEventListener("click", () => {
    if (!dom.optionA.disabled) handleAnswer("A", dom.optionA);
  });
  dom.optionB.addEventListener("click", () => {
    if (!dom.optionB.disabled) handleAnswer("B", dom.optionB);
  });

  dom.skipBtn.addEventListener("click", () => {
    playSfx(dom.sfxClick);
    clearTimer();
    state.currentIndex++;
    if (state.currentIndex >= state.questions.length) { endGame(); return; }

    dom.questionCard.style.transition = "opacity 0.3s ease";
    dom.questionCard.style.opacity = "0";
    setTimeout(() => {
      renderQuestion();
      dom.questionCard.style.opacity = "1";
    }, 300);
  });

  dom.restartBtn.addEventListener("click", () => {
    playSfx(dom.sfxClick);
    clearTimer();
    state.answers = [];
    state.currentIndex = 0;
    state.questions = shuffle(ALL_QUESTIONS);
    renderQuestion();
  });
}

/* ─── END GAME / RESULTS ────────────────────────────────────── */
function endGame() {
  clearTimer();
  playSfx(dom.sfxWin);
  showPage("resultsPage");
  buildResults();
  launchConfetti();
}

function calcScore() {
  // Score based on answer patterns (A = more passionate, B = more tender)
  // Simple 0-100 based on ratio + variety
  const total = state.answers.length;
  if (total === 0) return 75;
  const aCount = state.answers.filter(a => a.chosen === "A").length;
  const ratio  = aCount / total;
  // Map to 45–99 range for satisfying results
  return Math.round(45 + ratio * 54);
}

function buildResults() {
  const score = calcScore();
  const personality = PERSONALITIES.find(p => score >= p.min) || PERSONALITIES[PERSONALITIES.length - 1];

  dom.resultsName.textContent = `${state.playerName}'s Romantic Profile`;

  // Animate score counter
  let displayed = 0;
  const target  = score;
  const step    = Math.ceil(target / 60);
  const tick    = setInterval(() => {
    displayed = Math.min(displayed + step, target);
    dom.scoreNumber.textContent = displayed + "%";
    if (displayed >= target) clearInterval(tick);
  }, 25);

  // Ring animation
  const circumference = 314; // 2π × 50
  const offset = circumference - (score / 100) * circumference;
  // Add gradient defs inline
  const svg = dom.ringFill.closest("svg");
  if (!svg.querySelector("defs")) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c8184a"/>
      <stop offset="100%" stop-color="#7b2d8b"/>
    </linearGradient>`;
    svg.prepend(defs);
  }
  dom.ringFill.setAttribute("stroke", "url(#ringGrad)");
  setTimeout(() => { dom.ringFill.style.strokeDashoffset = offset; }, 200);

  // Personality
  dom.personalityTag.innerHTML = `
    <strong>${personality.label}</strong><br/>
    <span style="font-size:0.85rem;color:var(--muted)">${personality.desc}</span>
  `;

  // Answers summary
  dom.answersSummary.innerHTML = state.answers.map((a, i) => `
    <div class="answer-item">
      <span class="answer-num">${i + 1}</span>
      <div>
        <div class="answer-q">${truncate(a.question, 55)}</div>
        <div class="answer-a">→ ${a.selected}</div>
      </div>
    </div>
  `).join("") || '<p style="color:var(--muted);text-align:center;padding:16px 0;">No answers recorded.</p>';
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

/* ─── WHATSAPP INTEGRATION ───────────────────────────────────── */
function buildWhatsAppMessage() {
  const name  = state.playerName;
  const date  = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" });
  const score = calcScore();
  const personality = PERSONALITIES.find(p => score >= calcScore()) || PERSONALITIES[0];

  let msg = `💋 *This or That — Romantic Results*\n`;
  msg    += `━━━━━━━━━━━━━━━━\n`;
  msg    += `👤 *Name:* ${name}\n`;
  msg    += `📅 *Date:* ${date}\n`;
  msg    += `❤️ *Match Score:* ${score}%\n`;
  msg    += `✨ *Profile:* ${PERSONALITIES.find(p => score >= p.min)?.label || "Romantic"}\n`;
  msg    += `━━━━━━━━━━━━━━━━\n`;
  msg    += `*Selected Answers:*\n\n`;

  state.answers.forEach((a, i) => {
    msg += `${i + 1}. ${a.selected}\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━\n`;
  msg += `_Played at This or That 💕_`;

  return msg;
}

function initResultsActions() {
  dom.whatsappBtn.addEventListener("click", () => {
    playSfx(dom.sfxClick);
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });

  dom.shareBtn.addEventListener("click", async () => {
    playSfx(dom.sfxClick);
    const score = calcScore();
    const shareData = {
      title: "This or That 💋",
      text:  `I just played This or That and got ${score}% Match Score! Play now and discover your romantic style 💕`,
      url:   window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        dom.shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => dom.shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Results', 2000);
      } catch (e) {}
    }
  });

  dom.playAgainBtn.addEventListener("click", () => {
    playSfx(dom.sfxClick);
    clearTimer();
    state.answers      = [];
    state.currentIndex = 0;
    state.questions    = shuffle(ALL_QUESTIONS);
    showPage("landingPage");
  });
}

/* ─── CONFETTI ──────────────────────────────────────────────── */
function launchConfetti() {
  const canvas = dom.confettiCanvas;
  const ctx    = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  const COLORS = ["#c8184a","#e8457a","#f9a8c0","#7b2d8b","#f0c060","#ffffff"];
  const SHAPES = ["♥","✦","●","★","✿"];
  const pieces = Array.from({ length: 120 }, () => ({
    x:      Math.random() * canvas.width,
    y:      -10 - Math.random() * canvas.height * 0.5,
    vx:     (Math.random() - 0.5) * 3,
    vy:     Math.random() * 3 + 1,
    size:   Math.random() * 14 + 6,
    color:  COLORS[Math.floor(Math.random() * COLORS.length)],
    shape:  SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rot:    Math.random() * 360,
    rotV:   (Math.random() - 0.5) * 6,
    life:   1,
  }));

  let frame = 0;
  const MAX_FRAMES = 200;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.y > canvas.height + 20) return;
      alive = true;
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.04;
      p.rot += p.rotV;
      p.life = Math.max(0, 1 - frame / MAX_FRAMES);

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.font      = `${p.size}px serif`;
      ctx.fillText(p.shape, 0, 0);
      ctx.restore();
    });

    frame++;
    if (alive && frame < MAX_FRAMES * 1.5) requestAnimationFrame(loop);
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
    }
  }
  loop();
}

/* ─── INIT ──────────────────────────────────────────────────── */
function init() {
  initAgeModal();
  initTheme();
  initMusic();
  initLanding();
  initGameControls();
  initSwipe();
  initResultsActions();
  showPage("landingPage");
}

document.addEventListener("DOMContentLoaded", init);
