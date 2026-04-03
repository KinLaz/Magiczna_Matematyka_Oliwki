/* ═══════════════════════════════════════════════════════════
   MAGICZNA MATEMATYKA OLIWKI — script.js
   Vanilla JavaScript, brak frameworków ani importów.
   ═══════════════════════════════════════════════════════════ */

// ──────────────────────────────────────────────
//  STAŁE
// ──────────────────────────────────────────────
var TOTAL_QUESTIONS = 10;
var MAX_LIVES       = 5;

// ──────────────────────────────────────────────
//  STAN GRY
// ──────────────────────────────────────────────
var gameMode      = null;  // 'add' | 'sub' | 'mix'
var gameRange     = null;  // 10 | 20 | 30 | 40 | 50
var score         = 0;
var lives         = MAX_LIVES;
var questionIndex = 0;
var currentQuestion = null;
var isAnswered    = false;

// ──────────────────────────────────────────────
//  NARZĘDZIA
// ──────────────────────────────────────────────

/** Wyświetl wybrany ekran, ukryj pozostałe */
function showScreen(id) {
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.remove('active');
  }
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

/** Tasuje tablicę (Fisher-Yates) */
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

// ──────────────────────────────────────────────
//  GENEROWANIE PYTANIA
// ──────────────────────────────────────────────

/**
 * Generuje obiekt { a, b, op, answer } zgodnie z trybem i zakresem.
 * Dodawanie: a + b ≤ gameRange, oba ≥ 1
 * Odejmowanie: a - b ≥ 0, a ≤ gameRange
 */
function generateQuestion() {
  var op;
  if      (gameMode === 'add') op = '+';
  else if (gameMode === 'sub') op = '-';
  else                         op = Math.random() < 0.5 ? '+' : '-';

  var a, b;

  if (op === '+') {
    a = Math.floor(Math.random() * (gameRange - 1)) + 1;   // 1…range-1
    b = Math.floor(Math.random() * (gameRange - a)) + 1;   // 1…range-a
  } else {
    a = Math.floor(Math.random() * (gameRange + 1));        // 0…range
    b = Math.floor(Math.random() * (a + 1));                // 0…a
  }

  return { a: a, b: b, op: op, answer: op === '+' ? a + b : a - b };
}

/**
 * Generuje tablicę 4 opcji odpowiedzi (1 poprawna + 3 mylące).
 * Opcje błędne są „w pobliżu" poprawnej (±1…9),
 * ograniczone do zakresu 0…gameRange.
 */
function generateOptions(answer) {
  var opts = {};
  opts[answer] = true;

  var attempts = 0;
  while (Object.keys(opts).length < 4 && attempts < 300) {
    var offset = Math.floor(Math.random() * 9) + 1;
    var sign   = Math.random() < 0.5 ? 1 : -1;
    var wrong  = answer + sign * offset;
    wrong = Math.max(0, Math.min(gameRange, wrong));
    if (wrong !== answer) opts[wrong] = true;
    attempts++;
  }

  // Fallback: uzupełnij liczbami od 0 w górę
  for (var i = 0; Object.keys(opts).length < 4; i++) {
    if (opts[i] === undefined) opts[i] = true;
  }

  var arr = Object.keys(opts).map(Number);
  return shuffle(arr);
}

// ──────────────────────────────────────────────
//  EKRAN POWITALNY
// ──────────────────────────────────────────────
document.getElementById('btn-start').addEventListener('click', function () {
  showScreen('screen-menu');
});

// ──────────────────────────────────────────────
//  EKRAN MENU
// ──────────────────────────────────────────────

// Obsługa przycisków trybu
var modeBtns = document.querySelectorAll('.btn-mode');
for (var i = 0; i < modeBtns.length; i++) {
  modeBtns[i].addEventListener('click', function () {
    for (var j = 0; j < modeBtns.length; j++) {
      modeBtns[j].classList.remove('selected');
      modeBtns[j].classList.add('unselected');
    }
    this.classList.add('selected');
    this.classList.remove('unselected');
    gameMode = this.getAttribute('data-mode');
    updateStartBtn();
  });
}

// Obsługa przycisków zakresu
var rangeBtns = document.querySelectorAll('.btn-range');
for (var i = 0; i < rangeBtns.length; i++) {
  rangeBtns[i].addEventListener('click', function () {
    for (var j = 0; j < rangeBtns.length; j++) {
      rangeBtns[j].classList.remove('selected');
    }
    this.classList.add('selected');
    gameRange = parseInt(this.getAttribute('data-range'), 10);
    updateStartBtn();
  });
}

function updateStartBtn() {
  var btn = document.getElementById('btn-game-start');
  if (gameMode && gameRange) {
    btn.disabled = false;
    btn.textContent = 'Start! 🌟';
    btn.classList.remove('btn-disabled');
    btn.classList.add('btn-pulse');
  } else {
    btn.disabled = true;
    btn.textContent = 'Wybierz tryb i zakres';
    btn.classList.add('btn-disabled');
    btn.classList.remove('btn-pulse');
  }
}

document.getElementById('btn-game-start').addEventListener('click', function () {
  if (gameMode && gameRange) startGame();
});

// ──────────────────────────────────────────────
//  GRA — inicjalizacja i ładowanie pytań
// ──────────────────────────────────────────────

function startGame() {
  score         = 0;
  lives         = MAX_LIVES;
  questionIndex = 0;
  showScreen('screen-game');
  loadQuestion();
}

function loadQuestion() {
  isAnswered      = false;
  currentQuestion = generateQuestion();

  // Pasek postępu
  document.getElementById('progress-bar').style.width =
    (questionIndex / TOTAL_QUESTIONS * 100) + '%';

  // Numer pytania
  document.getElementById('question-number').textContent =
    'Pytanie ' + (questionIndex + 1) + ' z ' + TOTAL_QUESTIONS;

  // Wynik
  document.getElementById('score-display').textContent =
    '⭐ ' + score + '/' + TOTAL_QUESTIONS;

  // Etykieta trybu
  var modeLabel = { add: 'Dodawanie ➕', sub: 'Odejmowanie ➖', mix: 'Miks 🎲' };
  document.getElementById('mode-label').textContent = modeLabel[gameMode];

  // Serduszka
  renderHearts();

  // Treść pytania
  document.getElementById('question-text').textContent =
    currentQuestion.a + ' ' + currentQuestion.op + ' ' + currentQuestion.b + ' = ?';

  // Wyczyść feedback
  document.getElementById('feedback-emoji').textContent = '';
  var fb = document.getElementById('feedback');
  fb.textContent = '';
  fb.className   = 'feedback';

  // Opcje odpowiedzi
  var options   = generateOptions(currentQuestion.answer);
  var answerBtns = document.querySelectorAll('.btn-answer');
  for (var i = 0; i < answerBtns.length; i++) {
    answerBtns[i].textContent = options[i];
    answerBtns[i].setAttribute('data-value', options[i]);
    answerBtns[i].className   = 'btn-answer';
    answerBtns[i].disabled    = false;
  }
}

function renderHearts() {
  var container = document.getElementById('hearts');
  container.innerHTML = '';
  for (var i = 0; i < MAX_LIVES; i++) {
    var span = document.createElement('span');
    span.textContent = '❤️';
    span.className   = 'heart ' + (i < lives ? 'alive' : 'dead');
    container.appendChild(span);
  }
}

// ──────────────────────────────────────────────
//  GRA — obsługa odpowiedzi
// ──────────────────────────────────────────────
var answerBtns = document.querySelectorAll('.btn-answer');
for (var i = 0; i < answerBtns.length; i++) {
  answerBtns[i].addEventListener('click', function () {
    if (isAnswered) return;
    isAnswered = true;

    var chosen  = parseInt(this.getAttribute('data-value'), 10);
    var correct = chosen === currentQuestion.answer;

    // Oznacz przyciski
    var allAns = document.querySelectorAll('.btn-answer');
    for (var k = 0; k < allAns.length; k++) {
      allAns[k].disabled = true;
      var val = parseInt(allAns[k].getAttribute('data-value'), 10);
      if (val === currentQuestion.answer) {
        allAns[k].classList.add('correct');
      } else if (allAns[k] === this && !correct) {
        allAns[k].classList.add('wrong');
      }
    }

    var fbEmoji = document.getElementById('feedback-emoji');
    var fb      = document.getElementById('feedback');

    if (correct) {
      score++;
      fbEmoji.textContent = '🎉';
      fb.textContent      = 'Brawo! Super!';
      fb.className        = 'feedback correct-fb';
    } else {
      lives--;
      fbEmoji.textContent = '😢';
      fb.textContent      = 'Odpowiedź: ' + currentQuestion.answer;
      fb.className        = 'feedback wrong-fb';
      renderHearts();
    }

    setTimeout(function () {
      questionIndex++;
      if (questionIndex >= TOTAL_QUESTIONS || lives <= 0) {
        showEnd();
      } else {
        loadQuestion();
      }
    }, 1300);
  });
}

// ──────────────────────────────────────────────
//  EKRAN KOŃCOWY
// ──────────────────────────────────────────────

function showEnd() {
  showScreen('screen-end');

  var pct = score / TOTAL_QUESTIONS;
  var emoji, msg, color;

  if (pct === 1) {
    emoji = '🏆'; msg = 'Perfekcja! Jesteś geniuszem matematyki!';   color = '#f59e0b';
  } else if (pct >= 0.8) {
    emoji = '🌟'; msg = 'Wspaniale! Tak trzymaj, jesteś świetna!';    color = '#a78bfa';
  } else if (pct >= 0.6) {
    emoji = '😊'; msg = 'Dobra robota! Ćwicz dalej, idzie coraz lepiej!'; color = '#f472b6';
  } else if (pct >= 0.4) {
    emoji = '💪'; msg = 'Dobry start! Następnym razem będzie jeszcze lepiej!'; color = '#fb923c';
  } else {
    emoji = '🌈'; msg = 'Nie poddawaj się! Każde ćwiczenie robi z Ciebie mistrzynię!'; color = '#22c55e';
  }

  document.getElementById('end-emoji').textContent   = emoji;
  document.getElementById('end-score').textContent   = score + ' / ' + TOTAL_QUESTIONS;

  var endMsg = document.getElementById('end-message');
  endMsg.textContent  = msg;
  endMsg.style.color  = color;

  // Gwiazdki (0–3)
  var stars    = Math.round(pct * 3);
  var starsEl  = document.getElementById('end-stars');
  starsEl.innerHTML = '';
  for (var i = 0; i < 3; i++) {
    var s = document.createElement('span');
    s.textContent = '⭐';
    s.className   = 'star ' + (i < stars ? 'active' : 'inactive');
    starsEl.appendChild(s);
  }

  // Życia
  var livesEl = document.getElementById('end-lives');
  livesEl.innerHTML = '';
  for (var i = 0; i < MAX_LIVES; i++) {
    var h = document.createElement('span');
    h.textContent    = '❤️';
    h.style.opacity  = i < lives ? '1' : '0.18';
    h.style.fontSize = '1.3rem';
    livesEl.appendChild(h);
  }
}

document.getElementById('btn-play-again').addEventListener('click', function () {
  startGame();
});

document.getElementById('btn-menu').addEventListener('click', function () {
  // Resetuj wybory w menu
  for (var j = 0; j < modeBtns.length; j++) {
    modeBtns[j].classList.remove('selected', 'unselected');
  }
  for (var j = 0; j < rangeBtns.length; j++) {
    rangeBtns[j].classList.remove('selected');
  }
  gameMode  = null;
  gameRange = null;
  updateStartBtn();
  showScreen('screen-menu');
});
