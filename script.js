/* ═══════════════════════════════════════════════════════════
   THIS OR THAT · Premium Fun Game · script.js
   WITH PIN LOGIN SYSTEM (10 Random Secure PINs)
   ═══════════════════════════════════════════════════════════ */

"use strict";

/* ═══════════════════════════════════════════════════════════
   SECTION 1: PIN SECURITY SYSTEM
   ═══════════════════════════════════════════════════════════ */

/**
 * Generates 10 random 4-digit secure PINs
 * Avoids sequential numbers (1234), repeating numbers (1111), and years (1990-2025)
 * @returns {Array} Array of 10 unique PINs
 */
function generateSecurePins() {
  const pins = new Set();  // Use Set to prevent duplicates
  
  while (pins.size < 10) {
    let pin = Math.floor(1000 + Math.random() * 9000);  // Random between 1000-9999
    const pinStr = pin.toString();
    
    // Check for invalid PIN patterns
    const isSequential = pinStr === "1234" || pinStr === "4321" || pinStr === "5678" || pinStr === "9876";
    const isRepeating = /^(\d)\1{3}$/.test(pinStr);  // Matches 1111, 2222, etc.
    const isYear = (pin >= 1900 && pin <= 2025);      // Avoids common year numbers
    
    if (!isSequential && !isRepeating && !isYear) {
      pins.add(pin);
    }
  }
  
  // Fallback backup PINs in case generation fails
  if (pins.size < 10) {
    const backups = [2847, 5936, 7182, 3695, 8417, 6253, 4791, 9362, 1578, 6429];
    backups.forEach(p => pins.add(p));
  }
  
  return Array.from(pins).slice(0, 10);
}

/**
 * Loads valid PINs from localStorage (set by admin.html)
 * If no stored PINs exist, generates new ones
 * @returns {Array} Array of valid access PINs
 */
function loadValidPins() {
  // First priority: Load from localStorage (set by admin page)
  const storedPins = localStorage.getItem('valid_game_pins');
  if (storedPins) {
    return JSON.parse(storedPins);
  }
  
  // Second priority: Generate new secure PINs
  const newPins = generateSecurePins();
  localStorage.setItem('valid_game_pins', JSON.stringify(newPins));
  return newPins;
}

// Initialize authorized PINs from storage
let AUTHORIZED_PINS = loadValidPins();

/**
 * Shuffles an array for additional security
 * @param {Array} arr - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffle PINs for extra security
AUTHORIZED_PINS = shuffleArray([...AUTHORIZED_PINS]);

/* ═══════════════════════════════════════════════════════════
   SECTION 2: 30 ROMANTIC QUESTIONS WITH IMAGES
   Each question has two options with associated images
   ═══════════════════════════════════════════════════════════ */

const ALL_QUESTIONS = [
  {
    text: "How do you love to be greeted after a long day?",
    optionA: "Slow, deep kiss",
    optionB: "Warm, tight hug",
    optionAImage: "images/kiss.jpg",
    optionBImage: "images/hug.jpg",
    optionAEmoji: "💋",
    optionBEmoji: "🤗",
    reactions: ["💋", "🥰"]
  },
  {
    text: "Your perfect romantic evening?",
    optionA: "Just lie on the bed and gist",
    optionB: "Cuddle and snacks",
    optionAImage: "images/lie.jpg",
    optionBImage: "images/nack.jpg",
    optionAEmoji: "🕯️",
    optionBEmoji: "⭐",
    reactions: ["🍷", "✨"]
  },
  {
    text: "What position do you prefer on bed?",
    optionA: "Missionary",
    optionB: "Doggy",
    optionAImage: "images/mission.jpg",
    optionBImage: "images/doggy.jpg",
    optionAEmoji: "🗣️",
    optionBEmoji: "🤝",
    reactions: ["🗣️", "🤝"]
  },
  {
    text: "Which of these will you prefer?",
    optionA: "Fingering",
    optionB: "Head",
    optionAImage: "images/fingering.jpg",
    optionBImage: "images/head.jpg",
    optionAEmoji: "😴",
    optionBEmoji: "🍳",
    reactions: ["😴", "🍳"]
  },
  {
    text: "In matters of size, what do you prefer?",
    optionA: "Long dick",
    optionB: "Small dick",
    optionAImage: "images/long.jpg",
    optionBImage: "images/small.jpg",
    optionAEmoji: "⛰️",
    optionBEmoji: "🌊",
    reactions: ["⛰️", "🌊"]
  },
  {
    text: "In a romantic evening what will you choose?",
    optionA: "Red wine",
    optionB: "Smirnoff Ice",
    optionAImage: "images/wine.jpg",
    optionBImage: "images/smirnuff.jpg",
    optionAEmoji: "💭",
    optionBEmoji: "💃",
    reactions: ["💭", "💃"]
  },
  {
    text: "You'd rather receive...",
    optionA: "Head",
    optionB: "Dick",
    optionAImage: "images/head.jpg",
    optionBImage: "images/small.jpg",
    optionAEmoji: "✍️",
    optionBEmoji: "🌸",
    reactions: ["✍️", "🌸"]
  },
  {
    text: "For a partner — you'd pick...",
    optionA: "A romantic partner",
    optionB: "Spender that is not available physically",
    optionAImage: "images/romantic.jpg",
    optionBImage: "images/spend.jpg",
    optionAEmoji: "😏",
    optionBEmoji: "👀",
    reactions: ["🎵", "🌇"]
  },
  {
    text: "In terms of communication, would you rather...?",
    optionA: "Talk on Phone",
    optionB: "Chat on Phone",
    optionAImage: "images/talk.jpg",
    optionBImage: "images/chat.jpg",
    optionAEmoji: "😏",
    optionBEmoji: "👀",
    reactions: ["😏", "🔥"]
  },
  {
    text: "How do you prefer to fall asleep?",
    optionA: "Naked",
    optionB: "Full pyjamas",
    optionAImage: "images/naked.jpg",
    optionBImage: "images/pyjamas.jpg",
    optionAEmoji: "🤗",
    optionBEmoji: "🤞",
    reactions: ["🤗", "🤞"]
  },
  {
    text: "On a rainy day, you want to...",
    optionA: "Watch movies and cuddle",
    optionB: "Just sleep",
    optionAImage: "images/vov.jpg",
    optionBImage: "images/sleep.jpg",
    optionAEmoji: "🎬",
    optionBEmoji: "💧",
    reactions: ["🎬", "💧"]
  },
  {
    text: "Your ideal date energy?",
    optionA: "Playful and teasing",
    optionB: "Intense and passionate",
    optionAImage: "images/playful.jpg",
    optionBImage: "images/passionate.jpg",
    optionAEmoji: "😜",
    optionBEmoji: "🔥",
    reactions: ["😜", "🔥"]
  },
  {
    "text": "What’s your favorite way to be kissed?",
    "optionA": "Soft & slow",
    "optionB": "Deep & passionate",
    "optionAImage": "images/slow.jpg",
    "optionBImage": "images/deep.jpg",
    "optionAEmoji": "🫦",
    "optionBEmoji": "🔥",
    "reactions": ["🫦", "🔥"]
  },
  {
    text: "Lights on or Lights off?",
    optionA: "Lights on",
    optionB: "Lights off",
    optionAImage: "images/light.jpg",
    optionBImage: "images/dark.jpg",
    optionAEmoji: "🎶",
    optionBEmoji: "⭐",
    reactions: ["🎶", "⭐"]
  },
  {
    text: "How do you flirt?",
    optionA: "Subtle hints and mystery",
    optionB: "Bold, direct and daring",
    optionAImage: "images/subtle.jpg",
    optionBImage: "images/bold.jpg",
    optionAEmoji: "🕵️",
    optionBEmoji: "😈",
    reactions: ["🕵️", "😈"]
  },
  {
    text: "In matters of location, would you choose bathroom or kitchen sex?",
    optionA: "Bathroom",
    optionB: "Kitchen",
    optionAImage: "images/bathroom.jpg",
    optionBImage: "images/kitchen.jpg",
    optionAEmoji: "🎧",
    optionBEmoji: "✈️",
    reactions: ["🎧", "✈️"]
  },
  {
    text: "Which is more interesting to you?",
    optionA: "Quickie",
    optionB: "Full Foreplay before sex",
    optionAImage: "images/quickie.jpg",
    optionBImage: "images/full.jpg",
    optionAEmoji: "🌅",
    optionBEmoji: "💭",
    reactions: ["🌅", "💭"]
  },
  {
    text: "Which of these will you want to try someday?",
    optionA: "Outdoor Sex",
    optionB: "Car Sex",
    optionAImage: "images/outdoor.jpg",
    optionBImage: "images/car.jpg",
    optionAEmoji: "😚",
    optionBEmoji: "💥",
    reactions: ["😚", "💥"]
  },
  {
    text: "An Insecure partner who is always checking my phone Vs An unavailable partner",
    optionA: "Insecure partner with time",
    optionB: "Busy and unavailable partner",
    optionAImage: "images/secure.jpg",
    optionBImage: "images/busy.jpg",
    optionAEmoji: "💎",
    optionBEmoji: "😍",
    reactions: ["💎", "😍"]
  },
  {
    text: "The most romantic gesture?",
    optionA: "Remembering the little things",
    optionB: "Grand, unexpected surprises",
    optionAImage: "images/rem.jpg",
    optionBImage: "images/grand.jpg",
    optionAEmoji: "🧠",
    optionBEmoji: "🎉",
    reactions: ["🧠", "🎉"]
  },
  {
    text: "Your ideal relationship vibe is...",
    optionA: "Best friends who fell in love",
    optionB: "Magnetic, undeniable chemistry",
    optionAImage: "images/bestie.jpg",
    optionBImage: "images/mag.jpg",
    optionAEmoji: "👫",
    optionBEmoji: "⚡",
    reactions: ["👫", "⚡"]
  },
  {
    text: "In Public place like Shoprite... Kiss or Grab",
    optionA: "Kiss",
    optionB: "Grab",
    optionAImage: "images/kiss1.jpg",
    optionBImage: "images/grab.jpg",
    optionAEmoji: "🤝",
    optionBEmoji: "😏",
    reactions: ["🤝", "😏"]
  },
  {
    text: "You greatest turn off",
    optionA: "Body odor",
    optionB: "Mouth odor",
    optionAImage: "images/body.jpg",
    optionBImage: "images/mouth.jpg",
    optionAEmoji: "👁️",
    optionBEmoji: "🌙",
    reactions: ["👁️", "🌙"]
  },
  {
    text: "Fast and hard sex Vs Slow and deep?",
    optionA: "Fast and hard",
    optionB: "Slow and deep",
    optionAImage: "images/fast.jpg",
    optionBImage: "images/slow1.jpg",
    optionAEmoji: "🕯️",
    optionBEmoji: "🌊",
    reactions: ["🕯️", "🌊"]
  },
  {
    text: "Once in a week or Everyday night",
    optionA: "Once in a week",
    optionB: "Every Night",
    optionAImage: "images/once.jpg",
    optionBImage: "images/every.jpg",
    optionAEmoji: "🍬",
    optionBEmoji: "🌶️",
    reactions: ["🍬", "🌶️"]
  },
  {
    text: "When you partner decides to visit",
    optionA: "Give me a surprise visit",
    optionB: "Inform me ahead",
    optionAImage: "images/sup.jpg",
    optionBImage: "images/inf.jpg",
    optionAEmoji: "😳",
    optionBEmoji: "🤩",
    reactions: ["😳", "🤩"]
  },
  {
    text: "I like it when we moan Vs Noooo Remain silent",
    optionA: "When we moan",
    optionB: "Nooo remain silent",
    optionAImage: "images/moan.jpg",
    optionBImage: "images/qt.jpg",
    optionAEmoji: "💃",
    optionBEmoji: "🎤",
    reactions: ["💃", "🎤"]
  },
  {
    text: "While Making out",
    optionA: "Remove the panties",
    optionB: "Just shift the panties",
    optionAImage: "images/remove.jpg",
    optionBImage: "images/shift.jpg",
    optionAEmoji: "🏡",
    optionBEmoji: "🌍",
    reactions: ["🏡", "🌍"]
  },
  {
    text: "I prefer to curdle while sleeping Vs Stay far away from me?",
    optionA: "Curdle me",
    optionB: "Stay away",
    optionAImage: "images/curdle.jpg",
    optionBImage: "images/stay.jpg",
    optionAEmoji: "💬",
    optionBEmoji: "🤫",
    reactions: ["💬", "🤫"]
  },
  {
    text: "Let's go out often or Lets make out often? ",
    optionA: "Go out often",
    optionB: "Make out often",
    optionAImage: "images/go.jpg",
    optionBImage: "images/make.jpg",
    optionAEmoji: "🍫",
    optionBEmoji: "🍓",
    reactions: ["🍫", "🍓"]
  }
];

/* ═══════════════════════════════════════════════════════════
   SECTION 3: MUSIC TRACKS CONFIGURATION
   ═══════════════════════════════════════════════════════════ */

const MUSIC_TRACKS = {
  none: null,
  romantic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  lofi: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  ambient: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  jazz: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
};

/* ═══════════════════════════════════════════════════════════
   SECTION 4: PERSONALITY PROFILES (For Results Page)
   ═══════════════════════════════════════════════════════════ */

const PERSONALITIES = [
  { min: 85, label: "The Passionate Romantic 🔥", desc: "You love fiercely and intensely. No half-measures — when you love, the whole world knows." },
  { min: 70, label: "The Tender Lover 🌹", desc: "Soft, deep, and genuine. You find magic in the quiet moments others overlook." },
  { min: 55, label: "The Playful Seducer 😏", desc: "Charming, spontaneous, and irresistible. You turn every moment into an adventure." },
  { min: 40, label: "The Loyal Dreamer 💫", desc: "You love with loyalty and longing. Your ideal love is a slow-burning, forever kind." },
  { min: 0,  label: "The Mystery & Depth 🌙", desc: "Complex, guarded, but deeply magnetic. The right person will unlock worlds in you." }
];

/* ═══════════════════════════════════════════════════════════
   SECTION 5: APPLICATION STATE MANAGEMENT
   ═══════════════════════════════════════════════════════════ */

const state = {
  playerName:    "",      // Player's entered name
  questions:     [],      // Shuffled questions array
  currentIndex:  0,       // Current question index
  answers:       [],      // Stored answers
  timerMode:     false,   // Timer mode active flag
  timerInterval: null,    // Timer interval reference
  timerSeconds:  10,      // Timer duration in seconds
  timerLeft:     10,      // Remaining timer seconds
  musicOn:       false,   // Music playing flag
  currentMusic:  "none",  // Currently selected music track
  theme:         "dark",  // Current color theme
  touchStartX:   0,       // Touch start X for swipe
  touchStartY:   0,       // Touch start Y for swipe
  volume:        30,      // Volume level (0-100)
  isAuthenticated: false  // PIN authentication status
};

/* ═══════════════════════════════════════════════════════════
   SECTION 6: DOM ELEMENT REFERENCES
   ═══════════════════════════════════════════════════════════ */

const $ = id => document.getElementById(id);

const dom = {
  // Modal elements
  ageModal:      $("ageModal"),
  ageYes:        $("ageYes"),
  ageNo:         $("ageNo"),
  pinModal:      $("pinModal"),
  pinInput:      $("pinInput"),
  pinSubmitBtn:  $("pinSubmitBtn"),
  pinError:      $("pinError"),
  
  // Page sections
  landingPage:   $("landingPage"),
  gamePage:      $("gamePage"),
  resultsPage:   $("resultsPage"),
  
  // Input elements
  playerName:    $("playerName"),
  startBtn:      $("startBtn"),
  timerModeBtn:  $("timerModeBtn"),
  
  // Controls
  musicToggleBtn:    $("musicToggleBtn"),
  musicSelect:       $("musicSelect"),
  themeColorSelect:  $("themeColorSelect"),
  themeToggle:       $("themeToggle"),
  
  // Game display elements
  playerGreet:   $("playerGreet"),
  questionCount: $("questionCount"),
  progressFill:  $("progressFill"),
  timerBar:      $("timerBar"),
  timerFill:     $("timerFill"),
  questionText:  $("questionText"),
  questionEmoji: $("questionEmoji"),
  answerContainer: $("answerContainer"),
  reactionPop:   $("reactionPop"),
  questionCard:  $("questionCard"),
  
  // Game control buttons
  skipBtn:       $("skipBtn"),
  restartBtn:    $("restartBtn"),
  exitGameBtn:   $("exitGameBtn"),
  restartGameBtn:$("restartGameBtn"),
  
  // Results page elements
  resultsName:   $("resultsName"),
  scoreNumber:   $("scoreNumber"),
  ringFill:      $("ringFill"),
  personalityTag:$("personalityTag"),
  answersSummary:$("answersSummary"),
  
  // WhatsApp elements
  whatsappBtn:   $("whatsappBtn"),
  shareBtn:      $("shareBtn"),
  playAgainBtn:  $("playAgainBtn"),
  sendCustomWaBtn:$("sendCustomWaBtn"),
  whatsappNumber:$("whatsappNumber"),
  
  // Audio elements
  bgMusic:       $("bgMusic"),
  sfxClick:      $("sfxClick"),
  sfxWin:        $("sfxWin"),
  volumeSlider:  $("volumeSlider"),
  audioControlIcon: $("audioControlIcon"),
  
  // Canvas elements
  particles:     $("particles"),
  confettiCanvas:$("confettiCanvas")
};

/* ═══════════════════════════════════════════════════════════
   SECTION 7: PIN AUTHENTICATION SYSTEM
   Handles PIN verification and access control
   ═══════════════════════════════════════════════════════════ */

/**
 * Initializes the PIN authentication system
 * Shows modal and handles PIN verification
 */
function initPinSystem() {
  // Check if already authenticated in this session
  const sessionAuth = sessionStorage.getItem("tot_auth");
  if (sessionAuth === "true") {
    state.isAuthenticated = true;
    if (dom.pinModal) dom.pinModal.style.display = "none";
    return;
  }
  
  // Show PIN modal if not authenticated
  if (dom.pinModal) dom.pinModal.style.display = "flex";
  
  // Add hint about admin page for easy PIN access
  const adminHint = document.createElement('div');
  adminHint.style.marginTop = '1rem';
  adminHint.style.padding = '0.5rem';
  adminHint.style.background = 'rgba(233, 30, 99, 0.1)';
  adminHint.style.borderRadius = '0.5rem';
  adminHint.style.fontSize = '0.7rem';
  adminHint.style.textAlign = 'center';
  
  
  const modalGlass = dom.pinModal.querySelector('.modal-glass');
  if (modalGlass && !modalGlass.querySelector('.admin-hint')) {
    adminHint.className = 'admin-hint';
    modalGlass.appendChild(adminHint);
  }
  
  // Log valid PINs to console for developer access
  console.log("%c🔑 VALID ACCESS PINS:", "color: #e91e63; font-size: 16px; font-weight: bold;");
  console.log("%c" + AUTHORIZED_PINS.join(" | "), "color: #4caf50; font-size: 14px; font-family: monospace;");
  console.log("%c📁 Go to /admin.html to manage PINs", "color: #2196f3; font-size: 12px;");
  
  // Attach event listeners
  if (dom.pinSubmitBtn) {
    dom.pinSubmitBtn.addEventListener("click", verifyPin);
  }
  
  if (dom.pinInput) {
    dom.pinInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") verifyPin();
    });
    setTimeout(() => dom.pinInput.focus(), 100);
  }
}

/**
 * Verifies the entered PIN against authorized PINs
 */
function verifyPin() {
  const enteredPin = dom.pinInput ? dom.pinInput.value.trim() : "";
  
  // Validate PIN format
  if (enteredPin.length !== 4 || !/^\d+$/.test(enteredPin)) {
    if (dom.pinError) dom.pinError.textContent = "❌ Please enter a valid 4-digit PIN";
    if (dom.pinInput) dom.pinInput.value = "";
    return;
  }
  
  const pinNum = parseInt(enteredPin, 10);
  
  // Check if PIN is authorized
  if (AUTHORIZED_PINS.includes(pinNum)) {
    // Successful authentication
    state.isAuthenticated = true;
    sessionStorage.setItem("tot_auth", "true");
    
    // Animate modal closing
    if (dom.pinModal) {
      dom.pinModal.style.opacity = "0";
      setTimeout(() => {
        if (dom.pinModal) dom.pinModal.style.display = "none";
      }, 400);
    }
    
    playSfx(dom.sfxClick);
    if (dom.pinError) dom.pinError.textContent = "";
  } else {
    // Failed authentication
    if (dom.pinError) dom.pinError.textContent = "❌ Invalid PIN. Access denied.";
    if (dom.pinInput) {
      dom.pinInput.value = "";
      dom.pinInput.focus();
    }
    
    // Add shake animation for visual feedback
    const modal = dom.pinModal ? dom.pinModal.querySelector(".modal-glass") : null;
    if (modal) {
      modal.classList.add("shake-animation");
      setTimeout(() => { modal.classList.remove("shake-animation"); }, 500);
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 8: UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} arr - Array to shuffle
 * @returns {Array} New shuffled array
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Plays a sound effect
 * @param {HTMLAudioElement} el - Audio element to play
 */
function playSfx(el) {
  if (!el) return;
  el.currentTime = 0;
  el.volume = state.volume / 100;
  el.play().catch(() => {});
}

/**
 * Shows a specific page and hides others
 * @param {string} id - Page ID to show
 */
function showPage(id) {
  ["landingPage", "gamePage", "resultsPage"].forEach(pid => {
    const pg = $(pid);
    if (pg) pg.classList.remove("active");
  });
  const target = $(id);
  if (target) target.classList.add("active");
}

/**
 * Saves game progress to localStorage
 */
function saveProgress() {
  try {
    localStorage.setItem("tot_answers", JSON.stringify(state.answers));
    localStorage.setItem("tot_name", state.playerName);
    localStorage.setItem("tot_index", state.currentIndex);
  } catch (e) {}
}

/* ═══════════════════════════════════════════════════════════
   SECTION 9: PARTICLES BACKGROUND ANIMATION
   Creates floating romantic particles in the background
   ═══════════════════════════════════════════════════════════ */

(function initParticles() {
  const canvas = dom.particles;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const SYMBOLS = ["✦", "✧", "·", "❤", "✿"];
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: Math.random() * 10 + 4,
      opacity: Math.random() * 0.35 + 0.05,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.1),
      life: 1,
      decay: Math.random() * 0.002 + 0.001,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 60 }, createParticle);
    window.addEventListener("resize", resize);
    loop();
  }

  function loop() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0 || p.y < -20) {
        particles[idx] = createParticle();
        return;
      }
      ctx.globalAlpha = p.life * p.opacity;
      ctx.fillStyle = "#e8457a";
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  init();
})();

/* ═══════════════════════════════════════════════════════════
   SECTION 10: AGE VERIFICATION MODAL
   ═══════════════════════════════════════════════════════════ */

function initAgeModal() {
  const confirmed = localStorage.getItem("tot_age");
  if (confirmed && dom.ageModal) {
    dom.ageModal.style.display = "none";
    return;
  }

  if (dom.ageYes) {
    dom.ageYes.addEventListener("click", () => {
      localStorage.setItem("tot_age", "1");
      if (dom.ageModal) {
        dom.ageModal.style.opacity = "0";
        setTimeout(() => {
          if (dom.ageModal) dom.ageModal.style.display = "none";
        }, 400);
      }
      playSfx(dom.sfxClick);
    });
  }

  if (dom.ageNo) {
    dom.ageNo.addEventListener("click", () => {
      window.location.href = "https://www.google.com";
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 11: THEME MANAGEMENT (Dark/Light + Custom Colors)
   ═══════════════════════════════════════════════════════════ */

function initTheme() {
  const saved = localStorage.getItem("tot_theme") || "dark";
  setTheme(saved);
  
  if (dom.themeColorSelect) {
    dom.themeColorSelect.value = saved;
    dom.themeColorSelect.addEventListener("change", (e) => {
      setTheme(e.target.value);
      playSfx(dom.sfxClick);
    });
  }

  if (dom.themeToggle) {
    dom.themeToggle.addEventListener("click", () => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      if (dom.themeColorSelect) dom.themeColorSelect.value = newTheme;
      playSfx(dom.sfxClick);
    });
  }
}

function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute("data-theme", theme);
  if (dom.themeToggle) {
    dom.themeToggle.innerHTML = theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem("tot_theme", theme);
}

/* ═══════════════════════════════════════════════════════════
   SECTION 12: MUSIC PLAYER CONTROLS
   ═══════════════════════════════════════════════════════════ */

function initMusic() {
  if (dom.musicSelect) {
    dom.musicSelect.addEventListener("change", (e) => {
      state.currentMusic = e.target.value;
      if (state.currentMusic !== "none" && state.musicOn) {
        playSelectedMusic();
      } else if (!state.musicOn && state.currentMusic !== "none") {
        state.musicOn = true;
        playSelectedMusic();
      } else if (state.currentMusic === "none") {
        dom.bgMusic.pause();
      }
      playSfx(dom.sfxClick);
    });
  }

  if (dom.musicToggleBtn) {
    dom.musicToggleBtn.addEventListener("click", () => {
      state.musicOn = !state.musicOn;
      if (state.musicOn && state.currentMusic !== "none") {
        playSelectedMusic();
        dom.musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        dom.bgMusic.pause();
        dom.musicToggleBtn.innerHTML = '<i class="fas fa-music"></i>';
      }
      playSfx(dom.sfxClick);
    });
  }

  if (dom.volumeSlider) {
    dom.volumeSlider.addEventListener("input", (e) => {
      state.volume = e.target.value;
      dom.bgMusic.volume = state.volume / 100;
      if (dom.sfxClick) dom.sfxClick.volume = state.volume / 100;
      if (dom.sfxWin) dom.sfxWin.volume = state.volume / 100;
    });
  }

  if (dom.audioControlIcon) {
    dom.audioControlIcon.addEventListener("click", () => {
      if (state.volume > 0) {
        state.volume = 0;
        if (dom.volumeSlider) dom.volumeSlider.value = 0;
        dom.audioControlIcon.className = "fas fa-volume-mute";
      } else {
        state.volume = 30;
        if (dom.volumeSlider) dom.volumeSlider.value = 30;
        dom.audioControlIcon.className = "fas fa-volume-up";
      }
      dom.bgMusic.volume = state.volume / 100;
    });
  }
}

function playSelectedMusic() {
  const trackUrl = MUSIC_TRACKS[state.currentMusic];
  if (trackUrl && state.musicOn) {
    dom.bgMusic.src = trackUrl;
    dom.bgMusic.loop = true;
    dom.bgMusic.volume = state.volume / 100;
    dom.bgMusic.play().catch(() => {});
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 13: LANDING PAGE & GAME INITIALIZATION
   ═══════════════════════════════════════════════════════════ */

function initLanding() {
  const savedName = localStorage.getItem("tot_name");
  if (savedName && dom.playerName) dom.playerName.value = savedName;

  if (dom.startBtn) {
    dom.startBtn.addEventListener("click", () => {
      playSfx(dom.sfxClick);
      startGame(false);
    });
  }

  if (dom.timerModeBtn) {
    dom.timerModeBtn.addEventListener("click", () => {
      playSfx(dom.sfxClick);
      startGame(true);
    });
  }

  if (dom.playerName) {
    dom.playerName.addEventListener("keydown", e => {
      if (e.key === "Enter") startGame(false);
    });
  }
}

function startGame(timerMode) {
  const raw = dom.playerName ? dom.playerName.value.trim() : "";
  state.playerName = raw || "Lover";
  localStorage.setItem("tot_name", state.playerName);

  state.timerMode = timerMode;
  state.questions = shuffle(ALL_QUESTIONS);
  state.currentIndex = 0;
  state.answers = [];

  showPage("gamePage");
  renderQuestion();
}

/* ═══════════════════════════════════════════════════════════
   SECTION 14: QUESTION RENDERING WITH TWO IMAGE CARDS
   ═══════════════════════════════════════════════════════════ */

function renderQuestion() {
  clearTimer();

  const q = state.questions[state.currentIndex];
  if (!q) { endGame(); return; }

  const total = state.questions.length;
  const idx = state.currentIndex;

  if (dom.playerGreet) {
    dom.playerGreet.textContent = idx === 0
      ? `Hey, ${state.playerName}… 💋`
      : `Question ${idx + 1} of ${total}`;
  }
  if (dom.questionCount) dom.questionCount.textContent = `${idx + 1} / ${total}`;
  if (dom.progressFill) dom.progressFill.style.width = `${(idx / total) * 100}%`;

  if (dom.questionText) dom.questionText.textContent = q.text;
  if (dom.questionEmoji) dom.questionEmoji.textContent = "💕";

  // Create two image cards for options A and B
  if (dom.answerContainer) {
    dom.answerContainer.innerHTML = `
      <div class="answer-grid-images">
        <div class="answer-card" data-choice="A">
          <img class="answer-card-image" src="${q.optionAImage}" alt="${q.optionA}" onerror="this.src='https://placehold.co/400x300/e91e63/white?text=${encodeURIComponent(q.optionA)}'">
          <div class="answer-card-label">OPTION A</div>
          <div class="answer-card-text">${q.optionA}</div>
          <div class="answer-card-badge">${q.optionAEmoji || "💕"}</div>
        </div>
        <div class="or-divider-images">
          <span>VS</span>
        </div>
        <div class="answer-card" data-choice="B">
          <img class="answer-card-image" src="${q.optionBImage}" alt="${q.optionB}" onerror="this.src='https://placehold.co/400x300/9c27b0/white?text=${encodeURIComponent(q.optionB)}'">
          <div class="answer-card-label">OPTION B</div>
          <div class="answer-card-text">${q.optionB}</div>
          <div class="answer-card-badge">${q.optionBEmoji || "💕"}</div>
        </div>
      </div>
    `;

    // Add click event listeners to answer cards
    const cards = dom.answerContainer.querySelectorAll('.answer-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('disabled')) {
          const choice = card.getAttribute('data-choice');
          handleAnswer(choice, card);
        }
      });
    });
  }

  if (dom.reactionPop) {
    dom.reactionPop.className = "reaction-pop";
    dom.reactionPop.textContent = "";
  }

  // Handle timer mode display
  if (state.timerMode && dom.timerBar) {
    dom.timerBar.style.display = "block";
    if (dom.timerFill) dom.timerFill.style.width = "100%";
    startTimer();
  } else if (dom.timerBar) {
    dom.timerBar.style.display = "none";
  }
}

/**
 * Handles user answer selection with smooth animation
 * @param {string} chosen - 'A' or 'B'
 * @param {HTMLElement} cardElement - The clicked card element
 */
function handleAnswer(chosen, cardElement) {
  const q = state.questions[state.currentIndex];
  clearTimer();

  // Disable both cards to prevent double-clicking
  const allCards = document.querySelectorAll('.answer-card');
  allCards.forEach(card => {
    card.classList.add('disabled');
  });
  
  if (cardElement) cardElement.classList.add('selected');

  // Show reaction emoji
  const reactionList = q.reactions || ["❤️", "💖"];
  const reaction = reactionList[chosen === "A" ? 0 : 1];
  if (dom.reactionPop) {
    dom.reactionPop.textContent = reaction;
    dom.reactionPop.classList.add("show");
  }

  // Save answer to state
  state.answers.push({
    question: q.text,
    chosen,
    optionA: q.optionA,
    optionB: q.optionB,
    selected: chosen === "A" ? q.optionA : q.optionB,
    optionAImage: q.optionAImage,
    optionBImage: q.optionBImage
  });

  playSfx(dom.sfxClick);
  saveProgress();

  // Animate card exit
  setTimeout(() => {
    if (dom.reactionPop) dom.reactionPop.classList.remove("show");
    if (dom.questionCard) {
      dom.questionCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      dom.questionCard.style.transform = chosen === "A"
        ? "translateX(-110%) rotate(-4deg)"
        : "translateX(110%) rotate(4deg)";
      dom.questionCard.style.opacity = "0";
    }

    // Move to next question or end game
    setTimeout(() => {
      state.currentIndex++;
      if (dom.questionCard) {
        dom.questionCard.style.transition = "none";
        dom.questionCard.style.transform = chosen === "A" ? "translateX(80px)" : "translateX(-80px)";
        dom.questionCard.style.opacity = "0";
      }

      if (state.currentIndex >= state.questions.length) {
        endGame();
      } else {
        renderQuestion();
        // Animate card entrance
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (dom.questionCard) {
              dom.questionCard.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease";
              dom.questionCard.style.transform = "translateX(0)";
              dom.questionCard.style.opacity = "1";
            }
          });
        });
      }
    }, 150);
  }, 700);
}

/* ═══════════════════════════════════════════════════════════
   SECTION 15: TIMER FUNCTIONALITY
   ═══════════════════════════════════════════════════════════ */

function startTimer() {
  state.timerLeft = state.timerSeconds;
  if (dom.timerFill) {
    dom.timerFill.style.transition = "none";
    dom.timerFill.style.width = "100%";
    setTimeout(() => {
      if (dom.timerFill) {
        dom.timerFill.style.transition = `width ${state.timerSeconds}s linear`;
        dom.timerFill.style.width = "0%";
      }
    }, 50);
  }

  state.timerInterval = setTimeout(() => {
    const rand = Math.random() < 0.5 ? "A" : "B";
    const card = document.querySelector(`.answer-card[data-choice="${rand}"]`);
    handleAnswer(rand, card);
  }, state.timerSeconds * 1000);
}

function clearTimer() {
  if (state.timerInterval) {
    clearTimeout(state.timerInterval);
    state.timerInterval = null;
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 16: GAME CONTROL FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

function exitToBeginning() {
  clearTimer();
  state.answers = [];
  state.currentIndex = 0;
  showPage("landingPage");
  playSfx(dom.sfxClick);
}

function restartGame() {
  clearTimer();
  state.answers = [];
  state.currentIndex = 0;
  state.questions = shuffle(ALL_QUESTIONS);
  renderQuestion();
  playSfx(dom.sfxClick);
}

/* ═══════════════════════════════════════════════════════════
   SECTION 17: SWIPE SUPPORT FOR MOBILE DEVICES
   ═══════════════════════════════════════════════════════════ */

function initSwipe() {
  const card = dom.questionCard;
  if (!card) return;

  card.addEventListener("touchstart", e => {
    state.touchStartX = e.touches[0].clientX;
    state.touchStartY = e.touches[0].clientY;
  }, { passive: true });

  card.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - state.touchStartX;
    const dy = e.changedTouches[0].clientY - state.touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      const cards = document.querySelectorAll('.answer-card');
      if (cards.length && cards[0].classList.contains('disabled')) return;
      if (dx > 0) {
        const cardA = document.querySelector('.answer-card[data-choice="A"]');
        if (cardA) handleAnswer("A", cardA);
      } else {
        const cardB = document.querySelector('.answer-card[data-choice="B"]');
        if (cardB) handleAnswer("B", cardB);
      }
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   SECTION 18: GAME BUTTON CONTROLS
   ═══════════════════════════════════════════════════════════ */

function initGameControls() {
  if (dom.skipBtn) {
    dom.skipBtn.addEventListener("click", () => {
      playSfx(dom.sfxClick);
      clearTimer();
      state.currentIndex++;
      if (state.currentIndex >= state.questions.length) {
        endGame();
        return;
      }
      if (dom.questionCard) {
        dom.questionCard.style.transition = "opacity 0.3s ease";
        dom.questionCard.style.opacity = "0";
      }
      setTimeout(() => {
        renderQuestion();
        if (dom.questionCard) dom.questionCard.style.opacity = "1";
      }, 300);
    });
  }

  if (dom.restartBtn) {
    dom.restartBtn.addEventListener("click", restartGame);
  }
  if (dom.restartGameBtn) {
    dom.restartGameBtn.addEventListener("click", restartGame);
  }
  if (dom.exitGameBtn) {
    dom.exitGameBtn.addEventListener("click", exitToBeginning);
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 19: END GAME & RESULTS DISPLAY
   ═══════════════════════════════════════════════════════════ */

function endGame() {
  clearTimer();
  playSfx(dom.sfxWin);
  showPage("resultsPage");
  buildResults();
  launchConfetti();
}

function calcScore() {
  const total = state.answers.length;
  if (total === 0) return 75;
  const aCount = state.answers.filter(a => a.chosen === "A").length;
  const ratio = aCount / total;
  return Math.round(45 + ratio * 54);
}

function buildResults() {
  const score = calcScore();
  const personality = PERSONALITIES.find(p => score >= p.min) || PERSONALITIES[PERSONALITIES.length - 1];

  if (dom.resultsName) dom.resultsName.textContent = `${state.playerName}'s Romantic Profile`;

  // Animate score counter
  let displayed = 0;
  const target = score;
  const step = Math.ceil(target / 60);
  const tick = setInterval(() => {
    displayed = Math.min(displayed + step, target);
    if (dom.scoreNumber) dom.scoreNumber.textContent = displayed + "%";
    if (displayed >= target) clearInterval(tick);
  }, 25);

  // Animate score ring
  const circumference = 314;
  const offset = circumference - (score / 100) * circumference;
  const svg = dom.ringFill ? dom.ringFill.closest("svg") : null;
  if (svg && !svg.querySelector("defs")) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c8184a"/>
      <stop offset="100%" stop-color="#7b2d8b"/>
    </linearGradient>`;
    svg.prepend(defs);
  }
  if (dom.ringFill) {
    dom.ringFill.setAttribute("stroke", "url(#ringGrad)");
    setTimeout(() => { if (dom.ringFill) dom.ringFill.style.strokeDashoffset = offset; }, 200);
  }

  // Display personality tag
  if (dom.personalityTag) {
    dom.personalityTag.innerHTML = `
      <strong>${personality.label}</strong><br/>
      <span style="font-size:0.85rem;color:var(--muted)">${personality.desc}</span>
    `;
  }

  // Display answers summary
  if (dom.answersSummary) {
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
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 20: WHATSAPP INTEGRATION
   ═══════════════════════════════════════════════════════════ */

function buildWhatsAppMessage(phoneNumber) {
  const name = state.playerName;
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const score = calcScore();

  let msg = `💋 *This or That — Romantic Results*\n`;
  msg += `━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📅 *Date:* ${date}\n`;
  msg += `❤️ *Match Score:* ${score}%\n`;
  msg += `━━━━━━━━━━━━━━━━\n`;
  msg += `*Selected Answers:*\n\n`;

  state.answers.forEach((a, i) => {
    msg += `${i + 1}. ${a.selected}\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━\n`;
  msg += `_Played at This or That 💕_`;

  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

function initResultsActions() {
  if (dom.whatsappBtn) {
    dom.whatsappBtn.addEventListener("click", () => {
      playSfx(dom.sfxClick);
      const phoneNumber = dom.whatsappNumber ? dom.whatsappNumber.value.trim() : "";
      if (!phoneNumber) {
        alert("Please enter a WhatsApp number (e.g., 1234567890 - no spaces or + sign)");
        return;
      }
      buildWhatsAppMessage(phoneNumber);
    });
  }

  if (dom.sendCustomWaBtn) {
    dom.sendCustomWaBtn.addEventListener("click", () => {
      playSfx(dom.sfxClick);
      const phoneNumber = dom.whatsappNumber ? dom.whatsappNumber.value.trim() : "";
      if (!phoneNumber) {
        alert("Please enter a WhatsApp number");
        return;
      }
      buildWhatsAppMessage(phoneNumber);
    });
  }

  if (dom.shareBtn) {
    dom.shareBtn.addEventListener("click", async () => {
      playSfx(dom.sfxClick);
      const score = calcScore();
      const shareData = {
        title: "This or That 💋",
        text: `I just played This or That and got ${score}% Match Score! Play now and discover your romantic style 💕`,
        url: window.location.href,
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (e) {}
      } else {
        try {
          await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
          if (dom.shareBtn) {
            dom.shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
              if (dom.shareBtn) dom.shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Results';
            }, 2000);
          }
        } catch (e) {}
      }
    });
  }

  if (dom.playAgainBtn) {
    dom.playAgainBtn.addEventListener("click", () => {
      playSfx(dom.sfxClick);
      clearTimer();
      state.answers = [];
      state.currentIndex = 0;
      state.questions = shuffle(ALL_QUESTIONS);
      showPage("landingPage");
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 21: CONFETTI CELEBRATION EFFECT
   ═══════════════════════════════════════════════════════════ */

function launchConfetti() {
  const canvas = dom.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  const COLORS = ["#c8184a", "#e8457a", "#f9a8c0", "#7b2d8b", "#f0c060", "#ffffff"];
  const SHAPES = ["♥", "✦", "●", "★", "✿"];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * canvas.height * 0.5,
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 1,
    size: Math.random() * 14 + 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rot: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 6,
    life: 1,
  }));

  let frame = 0;
  const MAX_FRAMES = 200;

  function loop() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.y > canvas.height + 20) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.rotV;
      p.life = Math.max(0, 1 - frame / MAX_FRAMES);

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.font = `${p.size}px serif`;
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

/* ═══════════════════════════════════════════════════════════
   SECTION 22: INITIALIZATION - ENTRY POINT
   ═══════════════════════════════════════════════════════════ */

function init() {
  initPinSystem();      // PIN verification first
  initAgeModal();       // Age verification
  initTheme();          // Color theme setup
  initMusic();          // Music player setup
  initLanding();        // Landing page setup
  initGameControls();   // Game button controls
  initSwipe();          // Mobile swipe support
  initResultsActions(); // Results page actions
  showPage("landingPage");
}

// Start the application when DOM is ready
document.addEventListener("DOMContentLoaded", init);