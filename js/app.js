/* =========================================================
   SUPABASE INIT
   ========================================================= */
const supabaseClient = window.supabase.createClient(
  'https://aybtqmiaboqpdrfojhlb.supabase.co',
  'sb_publishable_IKx1-koZP1Gu0G2HBNbclw_xp0jxt0h'
);

/* =========================================================
   CANDY PALETTE
   ========================================================= */
const CANDY = [
  { base: '#9B6BF2', dark: '#5B21B6' },
  { base: '#2FDFC0', dark: '#0F766E' },
  { base: '#FF7AA8', dark: '#C21E63' },
  { base: '#FFC93C', dark: '#B45309' },
  { base: '#4FC3F7', dark: '#0369A1' }
];

/* =========================================================
   DATA: questions
   ========================================================= */
const QUESTIONS = [
  {
    id: 'mood', text: "What's your mood tonight?", hint: 'Pick up to 2',
    type: 'multi', maxSelect: 2,
    options: [
      { value: 'aching',     label: 'Aching',     desc: 'Longing, heartbreak, bittersweet' },
      { value: 'reckless',   label: 'Reckless',   desc: 'Obsessive, intense, no restraint' },
      { value: 'romantic',   label: 'Romantic',   desc: 'Warm, tender, hopeful' },
      { value: 'mysterious', label: 'Mysterious', desc: 'Secrets, tension, slow reveal' },
      { value: 'cozy',       label: 'Cozy',       desc: 'Light, comforting, low-stakes' },
      { value: 'haunted',    label: 'Haunted',    desc: "Eerie, uneasy, can't look away" }
    ]
  },
  {
    id: 'genre', text: 'Pick your flavor', hint: 'Pick up to 2',
    type: 'multi', maxSelect: 2,
    options: [
      { value: 'obsessive-romance', label: 'Obsessive romance', desc: 'Possessive, controlling dynamics' },
      { value: 'slow-burn',         label: 'Slow burn',         desc: 'Tension builds over time' },
      { value: 'toxic-chaotic',     label: 'Toxic & chaotic',   desc: 'Messy, dramatic, unstable' },
      { value: 'forbidden',         label: 'Forbidden',         desc: 'Secrecy, affairs, taboo' },
      { value: 'period-drama',      label: 'Period drama',      desc: 'Historical, restrained passion' },
      { value: 'psychological-thriller', label: 'Psychological thriller', desc: 'Mind games, obsession, control' },
      { value: 'supernatural',      label: 'Supernatural',      desc: 'Drawn to something otherworldly' },
      { value: 'comedy',            label: 'Comedy',            desc: 'Playful, witty, feel-good' },
      { value: 'anime',             label: 'Anime',             desc: 'Animated storytelling, any tone' }
    ]
  },
  {
    id: 'occasion', text: "What's the occasion?", hint: 'Pick one',
    type: 'single', maxSelect: 1,
    options: [
      { value: 'solo',    label: 'Solo tonight',      desc: 'No filter needed' },
      { value: 'date',    label: 'Movie date',        desc: 'Comfortable next to someone' },
      { value: 'weekend', label: 'Weekend deep-dive', desc: 'Ready to commit to a series' },
      { value: 'special', label: 'Something special', desc: 'A celebration or mood-lifter' }
    ]
  },
  {
    id: 'duration', text: 'How much time do you have?', hint: 'Pick one',
    type: 'single', maxSelect: 1,
    options: [
      { value: 'under1',   label: 'Under 1 hour', desc: 'Quick, an episode not a movie' },
      { value: '1to2',     label: '1-2 hours',    desc: 'One movie' },
      { value: '2to4',     label: '2-4 hours',    desc: 'A handful of episodes' },
      { value: 'allnight', label: 'All night',    desc: 'Full binge, no limit' }
    ]
  }
];

/* =========================================================
   DATA: starter catalog
   ========================================================= */
const CATALOG = [
  { title: '365 Days', type: 'movie', platform: 'Netflix', mood: 'reckless', genre: 'obsessive-romance', occasion: 'solo', duration: '1to2' },
  { title: 'Fifty Shades of Grey', type: 'movie', platform: 'Netflix', mood: 'mysterious', genre: 'obsessive-romance', occasion: 'date', duration: '1to2' },
  { title: 'Bridgerton', type: 'series', platform: 'Netflix', mood: 'romantic', genre: 'slow-burn', occasion: 'weekend', duration: 'allnight' },
  { title: 'You', type: 'series', platform: 'Netflix', mood: 'mysterious', genre: 'psychological-thriller', occasion: 'solo', duration: 'allnight' },
  { title: 'Behind Her Eyes', type: 'series', platform: 'Netflix', mood: 'haunted', genre: 'supernatural', occasion: 'solo', duration: 'allnight' },
  { title: 'Set It Up', type: 'movie', platform: 'Netflix', mood: 'cozy', genre: 'comedy', occasion: 'date', duration: '1to2' },
  { title: 'Kaguya-sama: Love Is War', type: 'series', platform: 'Crunchyroll', mood: 'cozy', genre: 'anime', occasion: 'solo', duration: 'allnight' },
  { title: 'Horimiya', type: 'series', platform: 'Crunchyroll', mood: 'romantic', genre: 'anime', occasion: 'weekend', duration: 'allnight' },
  { title: 'Amar', type: 'movie', platform: 'Netflix', mood: 'romantic', genre: 'slow-burn', occasion: 'date', duration: '1to2' },
  { title: 'Cruel Intentions', type: 'movie', platform: 'Prime Video (free)', mood: 'reckless', genre: 'forbidden', occasion: 'special', duration: '1to2' },
  { title: "Lady Chatterley's Lover", type: 'movie', platform: 'check current platform', mood: 'mysterious', genre: 'forbidden', occasion: 'date', duration: '1to2' },
  { title: 'Elite', type: 'series', platform: 'Netflix', mood: 'reckless', genre: 'toxic-chaotic', occasion: 'weekend', duration: 'allnight' },
  { title: 'Endings, Beginnings', type: 'movie', platform: 'check current platform', mood: 'aching', genre: 'slow-burn', occasion: 'solo', duration: '2to4' },
  { title: 'Lolita (1997)', type: 'movie', platform: 'Tubi (free)', mood: 'aching', genre: 'forbidden', occasion: 'solo', duration: '2to4' }
];

/* =========================================================
   STATE
   ========================================================= */
let currentQuestionIndex = 0;
const answers = { mood: [], genre: [], occasion: [], duration: [] };

/* =========================================================
   AMBIENT MAGIC BACKGROUND
   ========================================================= */
function initMagicBackground(){
  const bg = document.getElementById('magicBg');

  const blob1 = document.createElement('div');
  blob1.className = 'glow-blob';
  blob1.style.cssText = 'width:340px;height:340px;top:-100px;left:-80px;background:#9B6BF2;';
  bg.appendChild(blob1);

  const blob2 = document.createElement('div');
  blob2.className = 'glow-blob';
  blob2.style.cssText = 'width:300px;height:300px;bottom:-100px;right:-80px;background:#2FDFC0;';
  bg.appendChild(blob2);

  for (let i = 0; i < 26; i++){
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 2) + 's';
    bg.appendChild(star);
  }

  const CINE_ICONS = ['bi-film', 'bi-camera-reels', 'bi-ticket-perforated', 'bi-collection-play'];
  for (let i = 0; i < 9; i++){
    const icon = document.createElement('i');
    icon.className = 'cine-icon bi ' + CINE_ICONS[i % CINE_ICONS.length];
    icon.style.fontSize = (Math.random() * 14 + 16) + 'px';
    icon.style.left = Math.random() * 92 + '%';
    icon.style.top = Math.random() * 92 + '%';
    icon.style.animationDelay = (Math.random() * 3) + 's';
    bg.appendChild(icon);
  }

  setInterval(() => {
    const dust = document.createElement('div');
    dust.className = 'floaty';
    const size = Math.random() * 5 + 3;
    const candy = CANDY[Math.floor(Math.random() * CANDY.length)];
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';
    dust.style.left = Math.random() * 100 + '%';
    dust.style.background = candy.base;
    dust.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    bg.appendChild(dust);
    setTimeout(() => dust.remove(), 4200);
  }, 900);
}

function confettiBurst(originX, originY){
  if (typeof confetti !== 'function') return;
  try {
    confetti({
      particleCount: 45,
      spread: 65,
      startVelocity: 32,
      colors: ['#9B6BF2', '#2FDFC0', '#FF7AA8', '#FFC93C', '#4FC3F7'],
      origin: { x: originX, y: originY }
    });
  } catch (e) { console.warn('Confetti skipped:', e); }
}

/* =========================================================
   SCREEN SWITCHING
   ========================================================= */
function showScreen(id){
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(id);
  if (current === next) return;

  if (!window.gsap) {
    current.classList.remove('active');
    next.classList.add('active');
    return;
  }

  try {
    gsap.to(current, {
      opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        current.classList.remove('active');
        next.classList.add('active');
        try {
          gsap.fromTo(next,
            { opacity: 0, scale: 0.85, rotation: -3 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(1.6)' }
          );
        } catch (e) { console.warn('Transition-in skipped:', e); }
      }
    });
  } catch (e) {
    console.warn('Transition skipped:', e);
    current.classList.remove('active');
    next.classList.add('active');
  }
}

/* =========================================================
   AUTO-LOGIN: check for an existing session on page load
   ========================================================= */
async function checkExistingSession(){
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session && session.user) {
    const name = session.user.user_metadata?.name || 'friend';
    document.getElementById('greetingText').textContent = `Welcome back, ${name}`;
    showScreen('screen-home');
  }
}

/* =========================================================
   SIGN UP / LOG IN — tab switching
   ========================================================= */
let authMode = 'signup';

function setAuthMode(mode){
  authMode = mode;
  const nameField = document.getElementById('signupName');
  const submitBtn = document.getElementById('authSubmitBtn');
  const tabSignup = document.getElementById('tabSignup');
  const tabLogin = document.getElementById('tabLogin');
  const errorEl = document.getElementById('signupError');

  errorEl.style.color = '#FF7AA8';
  errorEl.textContent = '';

  if (mode === 'signup'){
    nameField.style.display = 'block';
    submitBtn.textContent = 'Create account';
    tabSignup.className = 'btn btn-candy candy-blue auth-tab-btn';
    tabLogin.className = 'btn btn-candy-ghost auth-tab-btn';
  } else {
    nameField.style.display = 'none';
    submitBtn.textContent = 'Log in';
    tabLogin.className = 'btn btn-candy candy-blue auth-tab-btn';
    tabSignup.className = 'btn btn-candy-ghost auth-tab-btn';
  }
}

document.getElementById('tabSignup').addEventListener('click', () => setAuthMode('signup'));
document.getElementById('tabLogin').addEventListener('click', () => setAuthMode('login'));

/* =========================================================
   Basic email format check (a real safety net,
   full verification happens via Supabase's confirmation email)
   ========================================================= */
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/* =========================================================
   SIGN UP / LOG IN — submit handler
   ========================================================= */
document.getElementById('authSubmitBtn').addEventListener('click', async () => {
  const name = document.getElementById('signupName').value.trim() || 'friend';
  const email = document.getElementById('signupContact').value.trim();
  const password = document.getElementById('signupPassword').value;
  const errorEl = document.getElementById('signupError');
  const btn = document.getElementById('authSubmitBtn');

  errorEl.style.color = '#FF7AA8';
  errorEl.textContent = '';

  if (!email || !password) {
    errorEl.textContent = 'Please enter an email and password.';
    return;
  }
  if (!isValidEmail(email)) {
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  btn.disabled = true;

  if (authMode === 'signup'){
    btn.textContent = 'Creating account...';

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    btn.disabled = false;
    btn.textContent = 'Create account';

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    // If email confirmation is required, Supabase won't return a session yet
    if (!data.session) {
      errorEl.style.color = '#2FDFC0';
      errorEl.textContent = 'Account created! Check your email to confirm, then log in.';
      setAuthMode('login');
      return;
    }

    document.getElementById('greetingText').textContent = `Welcome, ${name}`;
    showScreen('screen-home');

  } else {
    btn.textContent = 'Logging in...';

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    btn.disabled = false;
    btn.textContent = 'Log in';

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    const loggedInName = data.user.user_metadata?.name || 'friend';
    document.getElementById('greetingText').textContent = `Welcome back, ${loggedInName}`;
    showScreen('screen-home');
  }
});

/* =========================================================
   HOME -> QUESTIONS
   ========================================================= */
document.getElementById('startQuizBtn').addEventListener('click', () => {
  currentQuestionIndex = 0;
  renderQuestion();
  showScreen('screen-question');
});

/* =========================================================
   RENDER A QUESTION SCREEN
   ========================================================= */
function renderQuestion(){
  const q = QUESTIONS[currentQuestionIndex];
  document.getElementById('questionText').textContent = q.text;
  document.getElementById('questionHint').textContent = q.hint;

  const dotsEl = document.getElementById('progressDots');
  dotsEl.innerHTML = '';
  QUESTIONS.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i <= currentQuestionIndex ? ' filled' : '');
    dotsEl.appendChild(d);
  });

  const listEl = document.getElementById('optionsList');
  listEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const candy = CANDY[i % CANDY.length];
    const card = document.createElement('div');
    card.className = 'option-card';
    card.style.setProperty('--c-base', candy.base);
    card.style.setProperty('--c-dark', candy.dark);
    if (answers[q.id].includes(opt.value)) card.classList.add('selected');
    card.innerHTML = `
      <span class="check-badge"><i class="bi bi-check-lg"></i></span>
      <span class="opt-label">${opt.label}</span>
      <span class="opt-desc">${opt.desc}</span>
    `;
    card.addEventListener('click', () => toggleOption(q, opt.value));
    listEl.appendChild(card);
  });

  document.getElementById('backBtn').style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
  updateNextButton(q);

  try {
    if (window.gsap) {
      gsap.fromTo(listEl.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
          onComplete: () => gsap.set(listEl.children, { clearProps: 'transform' })
        }
      );
    }
  } catch (e) { console.warn('Animation skipped:', e); }
}

function toggleOption(q, value){
  const selected = answers[q.id];
  const isSelected = selected.includes(value);

  if (q.type === 'single'){
    answers[q.id] = isSelected ? [] : [value];
  } else {
    if (isSelected){
      answers[q.id] = selected.filter(v => v !== value);
    } else if (selected.length < q.maxSelect){
      selected.push(value);
    } else {
      selected.shift();
      selected.push(value);
    }
  }
  renderQuestion();
}

function updateNextButton(q){
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = answers[q.id].length === 0;
  nextBtn.textContent = currentQuestionIndex === QUESTIONS.length - 1 ? 'What is my movie tarot?' : 'Next';
}

document.getElementById('backBtn').addEventListener('click', () => {
  if (currentQuestionIndex === 0) return;
  currentQuestionIndex--;
  renderQuestion();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentQuestionIndex < QUESTIONS.length - 1){
    currentQuestionIndex++;
    renderQuestion();
  } else {
    runReveal();
  }
});

/* =========================================================
   SCORING ENGINE
   ========================================================= */
const DURATION_ORDER = ['under1', '1to2', '2to4', 'allnight'];

function scoreTitle(title){
  let score = 0;
  if (answers.mood.includes(title.mood)) score += 4;
  if (answers.genre.includes(title.genre)) score += 4;
  if (answers.occasion.includes(title.occasion)) score += 2;

  const userDur = answers.duration[0];
  if (userDur){
    const diff = Math.abs(DURATION_ORDER.indexOf(userDur) - DURATION_ORDER.indexOf(title.duration));
    if (diff === 0) score += 2;
    else if (diff === 1) score += 1;
  }
  return score;
}

function pickTwo(){
  const scored = CATALOG.map(t => ({ ...t, score: scoreTitle(t) }))
                         .sort((a, b) => b.score - a.score);
  const topScore = scored[0].score;
  const contenders = scored.filter(t => t.score >= topScore - 2);
  return contenders.sort(() => Math.random() - 0.5).slice(0, 2);
}

/* =========================================================
   SAVE READING TO SUPABASE
   ========================================================= */
async function saveReading(picks){
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { error } = await supabaseClient.from('readings').insert({
    user_id: user.id,
    answers: answers,
    picks: picks
  });

  if (error) console.warn('Could not save reading:', error.message);
}

/* =========================================================
   REVEAL SCREEN
   ========================================================= */
function runReveal(){
  const picks = pickTwo();
  saveReading(picks);

  const row = document.getElementById('cardsRow');
  row.innerHTML = '';
  document.getElementById('revealDesc').textContent = 'Tap a card to reveal its title';

  picks.forEach((pick, i) => {
    const candy = CANDY[i % CANDY.length];
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.setProperty('--c-base', candy.base);
    card.style.setProperty('--c-dark', candy.dark);
    card.innerHTML = `
      <div class="tarot-face tarot-back"><span class="mark">&#10022;</span></div>
      <div class="tarot-face tarot-front">
        <div class="t-title">${pick.title}</div>
        <div class="t-meta">${pick.type} &middot; ${pick.platform}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      if (card.classList.contains('flipped')) return;
      card.classList.add('flipped');
      const rect = card.getBoundingClientRect();
      confettiBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    });
    row.appendChild(card);
  });

  try {
    if (window.gsap) {
      gsap.fromTo(row.children,
        { opacity: 0, y: 30, rotation: -8 },
        {
          opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)',
          onComplete: () => gsap.set(row.children, { clearProps: 'transform' })
        }
      );
    }
  } catch (e) { console.warn('Card animation skipped:', e); }

  confettiBurst(0.5, 0.4);
  showScreen('screen-reveal');
}

document.getElementById('reshuffleBtn').addEventListener('click', () => {
  currentQuestionIndex = 0;
  answers.mood = []; answers.genre = []; answers.occasion = []; answers.duration = [];
  renderQuestion();
  showScreen('screen-question');
});

/* =========================================================
   INIT
   ========================================================= */
initMagicBackground();
checkExistingSession();