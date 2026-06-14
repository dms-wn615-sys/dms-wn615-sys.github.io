const GRID = 8;
const CELL = 40;

const PIECE_POOL = [
  { shape: [[1]], color: '#FFEB3B' },
  { shape: [[1, 1]], color: '#FF1744' },
  { shape: [[1, 1, 1]], color: '#2979FF' },
  { shape: [[1, 1], [1, 1]], color: '#1A1A1A' },
  { shape: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], color: '#D500F9' },
  { shape: [[1, 1, 1], [0, 1, 0]], color: '#D500F9' },
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#00E676' },
  { shape: [[1, 0], [1, 0], [1, 1]], color: '#A0522D' },
  { shape: [[1, 1, 1, 1]], color: '#FFEB3B' },
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#FF1744' },
  { shape: [[1, 1, 1], [1, 0, 0]], color: '#2979FF' },
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#D500F9' },
  { shape: [[1], [1], [1]], color: '#00E676' },
  { shape: [[1, 1, 1], [1, 1, 1]], color: '#A0522D' },
  { shape: [[1, 1], [1, 0]], color: '#FFEB3B' },
  { shape: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], color: '#FF1744' },
  { shape: [[1, 0, 0], [1, 1, 0], [0, 1, 1]], color: '#2979FF' },
];

const TRANSLATIONS = {
  ko: {
    title: '오리 블록 게임',
    subtitle: '블록을 놓아 가로·세로 줄을 채우세요!',
    language: '언어',
    score: '점수',
    clears: '제거',
    combo: '콤보',
    pickBlock: '블록 선택',
    controls: '조작법',
    controlsHint: '블록을 선택한 뒤 보드에 놓을 위치를 클릭하세요.',
    pause: '일시정지',
    start: '게임 시작',
    restart: '다시 시작',
    startMsg: '블록을 보드에 맞춰 놓아 줄을 없애세요!',
    paused: '일시정지',
    pausedMsg: '버튼을 눌러 계속하세요',
    continue: '계속하기',
    gameOver: '게임 오버',
    gameOverMsg: '점수: {score} · 제거: {clears}',
    rankings: '점수 순위',
    rankMsg: '{rank}위',
    newRecord: '🏆 1위!',
    noRecords: '아직 기록이 없습니다',
    playerName: '이름',
    playerDefault: '오리',
  },
  en: {
    title: 'Duck Block Game',
    subtitle: 'Place blocks to fill rows and columns!',
    language: 'Language',
    score: 'Score',
    clears: 'Clears',
    combo: 'Combo',
    pickBlock: 'Pick a block',
    controls: 'How to play',
    controlsHint: 'Select a block, then tap the board to place it.',
    pause: 'Pause',
    start: 'Start Game',
    restart: 'Play Again',
    startMsg: 'Place blocks to clear full rows and columns!',
    paused: 'Paused',
    pausedMsg: 'Press the button to continue',
    continue: 'Continue',
    gameOver: 'Game Over',
    gameOverMsg: 'Score: {score} · Clears: {clears}',
    rankings: 'Top Scores',
    rankMsg: 'Rank #{rank}',
    newRecord: '🏆 #1!',
    noRecords: 'No scores yet',
    playerName: 'Name',
    playerDefault: 'Duck',
  },
  ja: {
    title: 'アヒルブロックパズル',
    subtitle: 'ブロックを置いて行と列を消そう！',
    language: '言語',
    score: 'スコア',
    clears: '消去',
    combo: 'コンボ',
    pickBlock: 'ブロック選択',
    controls: '操作',
    controlsHint: 'ブロックを選んでボードをタップして配置',
    pause: '一時停止',
    start: 'ゲーム開始',
    restart: 'もう一度',
    startMsg: 'ブロックを配置してラインを消そう！',
    paused: '一時停止',
    pausedMsg: 'ボタンで再開',
    continue: '再開',
    gameOver: 'ゲームオーバー',
    gameOverMsg: 'スコア: {score} · 消去: {clears}',
    rankings: 'スコアランキング',
    rankMsg: '{rank}位',
    newRecord: '🏆 1位!',
    noRecords: '記録がありません',
    playerName: '名前',
    playerDefault: 'アヒル',
  },
  zh: {
    title: '小鸭方块拼图',
    subtitle: '放置方块，填满横排和竖列！',
    language: '语言',
    score: '分数',
    clears: '消除',
    combo: '连击',
    pickBlock: '选择方块',
    controls: '操作',
    controlsHint: '选择方块后点击棋盘放置',
    pause: '暂停',
    start: '开始游戏',
    restart: '再来一次',
    startMsg: '放置方块消除整行整列！',
    paused: '已暂停',
    pausedMsg: '点击按钮继续',
    continue: '继续',
    gameOver: '游戏结束',
    gameOverMsg: '分数: {score} · 消除: {clears}',
    rankings: '分数排行',
    rankMsg: '第{rank}名',
    newRecord: '🏆 第1名!',
    noRecords: '暂无记录',
    playerName: '昵称',
    playerDefault: '小鸭',
  },
  es: {
    title: 'Puzzle de Bloques',
    subtitle: '¡Coloca bloques para llenar filas y columnas!',
    language: 'Idioma',
    score: 'Puntos',
    clears: 'Eliminados',
    combo: 'Combo',
    pickBlock: 'Elige un bloque',
    controls: 'Controles',
    controlsHint: 'Elige un bloque y toca el tablero para colocarlo.',
    pause: 'Pausar',
    start: 'Iniciar',
    restart: 'Jugar de nuevo',
    startMsg: '¡Coloca bloques para borrar líneas!',
    paused: 'Pausado',
    pausedMsg: 'Pulsa el botón para continuar',
    continue: 'Continuar',
    gameOver: 'Fin del juego',
    gameOverMsg: 'Puntos: {score} · Eliminados: {clears}',
    rankings: 'Ranking',
    rankMsg: 'Puesto #{rank}',
    newRecord: '🏆 ¡#1!',
    noRecords: 'Sin puntuaciones',
    playerName: 'Nombre',
    playerDefault: 'Pato',
  },
  fr: {
    title: 'Puzzle Blocs Canard',
    subtitle: 'Placez des blocs pour remplir lignes et colonnes !',
    language: 'Langue',
    score: 'Score',
    clears: 'Effacés',
    combo: 'Combo',
    pickBlock: 'Choisir un bloc',
    controls: 'Commandes',
    controlsHint: 'Sélectionnez un bloc puis touchez le plateau.',
    pause: 'Pause',
    start: 'Commencer',
    restart: 'Rejouer',
    startMsg: 'Placez des blocs pour effacer les lignes !',
    paused: 'En pause',
    pausedMsg: 'Appuyez sur le bouton pour continuer',
    continue: 'Continuer',
    gameOver: 'Partie terminée',
    gameOverMsg: 'Score : {score} · Effacés : {clears}',
    rankings: 'Classement',
    rankMsg: '{rank}e place',
    newRecord: '🏆 1er !',
    noRecords: 'Aucun score',
    playerName: 'Nom',
    playerDefault: 'Canard',
  },
  de: {
    title: 'Enten-Block-Puzzle',
    subtitle: 'Setze Blöcke, um Reihen und Spalten zu füllen!',
    language: 'Sprache',
    score: 'Punkte',
    clears: 'Gelöscht',
    combo: 'Combo',
    pickBlock: 'Block wählen',
    controls: 'Steuerung',
    controlsHint: 'Block wählen, dann Brett antippen zum Platzieren.',
    pause: 'Pause',
    start: 'Spiel starten',
    restart: 'Nochmal spielen',
    startMsg: 'Setze Blöcke, um Linien zu löschen!',
    paused: 'Pausiert',
    pausedMsg: 'Button drücken zum Fortsetzen',
    continue: 'Fortsetzen',
    gameOver: 'Spiel vorbei',
    gameOverMsg: 'Punkte: {score} · Gelöscht: {clears}',
    rankings: 'Bestenliste',
    rankMsg: 'Platz {rank}',
    newRecord: '🏆 Platz 1!',
    noRecords: 'Noch keine Einträge',
    playerName: 'Name',
    playerDefault: 'Ente',
  },
};

const langSelect = document.getElementById('langSelect');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const clearsEl = document.getElementById('clears');
const comboEl = document.getElementById('combo');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const traySlots = document.querySelectorAll('.tray-slot');
const musicToggle = document.getElementById('musicToggle');
const sfxToggle = document.getElementById('sfxToggle');
const playerNameInput = document.getElementById('playerName');
const leaderboardList = document.getElementById('leaderboardList');

const LEADERBOARD_KEY = 'blockgame-leaderboard';
const NICKNAME_KEY = 'blockgame-nickname';
const MAX_LEADERBOARD = 10;

let currentLang = detectLanguage();
let board = [];
let trayPieces = [null, null, null];
let selectedIndex = null;
let hoverCell = null;
let score = 0;
let clears = 0;
let combo = 0;
let gameState = 'idle';
let lastGameRank = null;
let lastMadeBoard = false;

function detectLanguage() {
  const saved = localStorage.getItem('blockgame-lang');
  if (saved && TRANSLATIONS[saved]) return saved;
  const browser = (navigator.language || 'ko').slice(0, 2).toLowerCase();
  return TRANSLATIONS[browser] ? browser : 'ko';
}

function t(key, vars = {}) {
  const text = TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.ko[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.id === 'pauseBtn' && gameState === 'playing') {
      el.textContent = t('pause');
    } else if (el.id === 'pauseBtn' && gameState === 'paused') {
      el.textContent = t('continue');
    } else if (el.id !== 'pauseBtn' || gameState === 'idle') {
      el.textContent = t(el.dataset.i18n);
    }
  });
}

function refreshOverlayText() {
  if (gameState === 'idle') {
    showOverlay(t('title'), t('startMsg'), t('start'));
  } else if (gameState === 'paused') {
    showOverlay(t('paused'), t('pausedMsg'), t('continue'));
  } else if (gameState === 'gameover') {
    showOverlay(t('gameOver'), getGameOverMessage(), t('restart'));
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadLeaderboard() {
  try {
    const data = JSON.parse(localStorage.getItem(LEADERBOARD_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

function getPlayerName() {
  const name = playerNameInput.value.trim();
  return (name || t('playerDefault')).slice(0, 12);
}

function saveScoreRecord(gameScore, gameClears) {
  if (gameScore <= 0) return { rank: null, madeBoard: false };
  const name = getPlayerName();
  localStorage.setItem(NICKNAME_KEY, name);
  const entry = { score: gameScore, clears: gameClears, name, date: Date.now() };
  const sorted = [...loadLeaderboard(), entry].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.clears !== a.clears) return b.clears - a.clears;
    return b.date - a.date;
  });
  const trimmed = sorted.slice(0, MAX_LEADERBOARD);
  saveLeaderboard(trimmed);
  const rank = trimmed.findIndex(e => e.date === entry.date) + 1;
  return { rank, madeBoard: rank > 0 };
}

function getGameOverMessage() {
  let msg = t('gameOverMsg', { score, clears });
  if (lastMadeBoard && lastGameRank) {
    msg += ` · ${t('rankMsg', { rank: lastGameRank })}`;
    if (lastGameRank === 1) msg += ` ${t('newRecord')}`;
  }
  return msg;
}

function renderLeaderboard() {
  const entries = loadLeaderboard();
  if (!entries.length) {
    leaderboardList.innerHTML = `<li class="leaderboard-empty">${escapeHtml(t('noRecords'))}</li>`;
    return;
  }
  leaderboardList.innerHTML = entries.map((entry, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
    return `<li class="leaderboard-item${index < 3 ? ' top' : ''}">
      <span class="leaderboard-rank">${medal}</span>
      <span class="leaderboard-name">${escapeHtml(entry.name)}</span>
      <span class="leaderboard-score">${entry.score}</span>
    </li>`;
  }).join('');
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('blockgame-lang', lang);
  langSelect.value = lang;
  applyStaticTranslations();
  refreshOverlayText();
  renderLeaderboard();
  if (playerNameInput) playerNameInput.placeholder = t('playerName');
  if (gameState === 'playing') pauseBtn.textContent = t('pause');
  else if (gameState === 'paused') pauseBtn.textContent = t('continue');
}

function createBoard() {
  return Array.from({ length: GRID }, () => Array(GRID).fill(null));
}

function randomPiece() {
  const src = PIECE_POOL[Math.floor(Math.random() * PIECE_POOL.length)];
  return { shape: src.shape.map(row => [...row]), color: src.color };
}

function refillTray() {
  trayPieces = [randomPiece(), randomPiece(), randomPiece()];
  selectedIndex = null;
}

function canPlace(shape, row, col) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const br = row + r;
      const bc = col + c;
      if (br < 0 || br >= GRID || bc < 0 || bc >= GRID) return false;
      if (board[br][bc]) return false;
    }
  }
  return true;
}

function countCells(shape) {
  return shape.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
}

function canPlaceAnywhere(shape) {
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (canPlace(shape, r, c)) return true;
    }
  }
  return false;
}

function checkGameOver() {
  const remaining = trayPieces.filter(p => p !== null);
  if (remaining.length === 0) return;
  for (const piece of remaining) {
    if (canPlaceAnywhere(piece.shape)) return;
  }
  endGame();
}

function placePiece(index, row, col) {
  const piece = trayPieces[index];
  if (!piece || !canPlace(piece.shape, row, col)) return false;

  const cells = countCells(piece.shape);
  score += cells * 10;

  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        board[row + r][col + c] = piece.color;
      }
    }
  }

  trayPieces[index] = null;
  selectedIndex = null;

  const cleared = clearFullLines();
  GameAudio.playPlace(cells);
  if (cleared > 0) {
    combo += 1;
    score += cleared * 100 * combo;
    clears += cleared;
    GameAudio.playClear(cleared, combo);
  } else {
    combo = 0;
  }

  if (trayPieces.every(p => p === null)) {
    refillTray();
  }

  updateStats();
  checkGameOver();
  drawAll();
  return true;
}

function clearFullLines() {
  const rows = [];
  const cols = [];
  for (let r = 0; r < GRID; r++) {
    if (board[r].every(cell => cell !== null)) rows.push(r);
  }
  for (let c = 0; c < GRID; c++) {
    if (board.every(row => row[c] !== null)) cols.push(c);
  }
  rows.forEach(r => { board[r] = Array(GRID).fill(null); });
  cols.forEach(c => {
    for (let r = 0; r < GRID; r++) board[r][c] = null;
  });
  return rows.length + cols.length;
}

function drawDuck(context, x, y, color, size = CELL, alpha = 1) {
  const px = x * size;
  const py = y * size;
  const pad = 1;
  const w = size - pad * 2;
  const h = size - pad * 2;
  const cx = px + pad + w / 2;
  const cy = py + pad + h / 2;
  const isDark = color === '#1A1A1A';

  context.save();
  context.globalAlpha = alpha;

  context.fillStyle = color;
  context.beginPath();
  context.ellipse(cx, cy + h * 0.1, w * 0.36, h * 0.3, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(cx + w * 0.1, cy - h * 0.1, w * 0.22, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.18)';
  context.lineWidth = isDark ? 1.5 : 1;
  context.beginPath();
  context.ellipse(cx, cy + h * 0.1, w * 0.36, h * 0.3, 0, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.arc(cx + w * 0.1, cy - h * 0.1, w * 0.22, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = '#FF6D00';
  context.beginPath();
  context.moveTo(cx + w * 0.26, cy - h * 0.1);
  context.lineTo(cx + w * 0.44, cy - h * 0.05);
  context.lineTo(cx + w * 0.26, cy + h * 0.02);
  context.closePath();
  context.fill();

  context.fillStyle = isDark ? '#FFFFFF' : '#1a1a2e';
  context.beginPath();
  context.arc(cx + w * 0.16, cy - h * 0.14, w * 0.045, 0, Math.PI * 2);
  context.fill();

  if (!isDark) {
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(cx + w * 0.175, cy - h * 0.155, w * 0.016, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)';
  context.beginPath();
  context.ellipse(cx - w * 0.1, cy + h * 0.06, w * 0.11, h * 0.09, -0.4, 0, Math.PI * 2);
  context.fill();

  context.restore();
}

function drawShapeOnCanvas(context, shape, color, canvasW, canvasH, cellSize, alpha = 1) {
  context.clearRect(0, 0, canvasW, canvasH);
  context.fillStyle = 'rgba(0,0,0,0.06)';
  context.fillRect(0, 0, canvasW, canvasH);

  const offsetX = Math.floor((canvasW / cellSize - shape[0].length) / 2);
  const offsetY = Math.floor((canvasH / cellSize - shape.length) / 2);

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        drawDuck(context, offsetX + c, offsetY + r, color, cellSize, alpha);
      }
    }
  }
}

function drawBoard() {
  ctx.fillStyle = '#f8fbff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= GRID; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(canvas.width, i * CELL);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, canvas.height);
    ctx.stroke();
  }

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (board[r][c]) drawDuck(ctx, c, r, board[r][c]);
    }
  }

  if (selectedIndex !== null && hoverCell && trayPieces[selectedIndex]) {
    const piece = trayPieces[selectedIndex];
    const valid = canPlace(piece.shape, hoverCell.r, hoverCell.c);
    const alpha = valid ? 0.55 : 0.25;
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          drawDuck(ctx, hoverCell.c + c, hoverCell.r + r, piece.color, CELL, alpha);
        }
      }
    }
  }
}

function drawTray() {
  traySlots.forEach((slot, i) => {
    const cvs = slot.querySelector('canvas');
    const c = cvs.getContext('2d');
    slot.classList.toggle('selected', selectedIndex === i);
    slot.classList.toggle('used', trayPieces[i] === null);

    if (trayPieces[i]) {
      const cellSize = Math.min(22, Math.floor(90 / Math.max(trayPieces[i].shape.length, trayPieces[i].shape[0].length)));
      drawShapeOnCanvas(c, trayPieces[i].shape, trayPieces[i].color, 100, 100, cellSize);
    } else {
      c.clearRect(0, 0, 100, 100);
    }
  });
}

function drawAll() {
  drawBoard();
  drawTray();
}

function updateStats() {
  scoreEl.textContent = score;
  clearsEl.textContent = clears;
  comboEl.textContent = combo;
}

function showOverlay(title, message, btnText) {
  overlayTitle.textContent = title;
  overlayMessage.textContent = message;
  startBtn.textContent = btnText;
  overlay.classList.remove('hidden');
}

function hideOverlay() {
  overlay.classList.add('hidden');
}

function getBoardCell(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (clientX - rect.left) * scaleX;
  const y = (clientY - rect.top) * scaleY;
  const col = Math.floor(x / CELL);
  const row = Math.floor(y / CELL);
  if (row < 0 || row >= GRID || col < 0 || col >= GRID) return null;
  return { r: row, c: col };
}

function startGame() {
  GameAudio.resume().then(() => {
    board = createBoard();
    score = 0;
    clears = 0;
    combo = 0;
    selectedIndex = null;
    hoverCell = null;
    lastGameRank = null;
    lastMadeBoard = false;
    refillTray();
    updateStats();
    hideOverlay();
    gameState = 'playing';
    document.body.dataset.gameStatePlaying = 'true';
    pauseBtn.disabled = false;
    pauseBtn.textContent = t('pause');
    GameAudio.startBgm();
    drawAll();
  });
}

function endGame() {
  gameState = 'gameover';
  delete document.body.dataset.gameStatePlaying;
  GameAudio.stopBgm();
  GameAudio.playGameOver();
  pauseBtn.disabled = true;
  const result = saveScoreRecord(score, clears);
  lastGameRank = result.rank;
  lastMadeBoard = result.madeBoard;
  renderLeaderboard();
  showOverlay(t('gameOver'), getGameOverMessage(), t('restart'));
}

function togglePause() {
  if (gameState === 'playing') {
    gameState = 'paused';
    GameAudio.pauseBgm();
    pauseBtn.textContent = t('continue');
    showOverlay(t('paused'), t('pausedMsg'), t('continue'));
  } else if (gameState === 'paused') {
    gameState = 'playing';
    hideOverlay();
    pauseBtn.textContent = t('pause');
    GameAudio.startBgm();
    drawAll();
  }
}

canvas.addEventListener('mousemove', (e) => {
  if (gameState !== 'playing' || selectedIndex === null) return;
  hoverCell = getBoardCell(e.clientX, e.clientY);
  drawBoard();
});

canvas.addEventListener('mouseleave', () => {
  hoverCell = null;
  if (gameState === 'playing') drawBoard();
});

canvas.addEventListener('click', (e) => {
  if (gameState !== 'playing' || selectedIndex === null) return;
  const cell = getBoardCell(e.clientX, e.clientY);
  if (cell) {
    if (!placePiece(selectedIndex, cell.r, cell.c)) {
      GameAudio.playInvalid();
    }
  }
});

canvas.addEventListener('touchstart', (e) => {
  if (gameState !== 'playing') return;
  e.preventDefault();
  const touch = e.touches[0];
  if (selectedIndex !== null) {
    const cell = getBoardCell(touch.clientX, touch.clientY);
    if (cell && !placePiece(selectedIndex, cell.r, cell.c)) {
      GameAudio.playInvalid();
    }
  }
}, { passive: false });

traySlots.forEach((slot) => {
  const index = Number(slot.dataset.index);
  slot.addEventListener('click', () => {
    if (gameState !== 'playing' || !trayPieces[index]) return;
    selectedIndex = index;
    GameAudio.playSelect();
    drawTray();
    drawBoard();
  });
});

document.addEventListener('keydown', (e) => {
  if (gameState === 'idle' || gameState === 'gameover') {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      startGame();
    }
    return;
  }
  if (e.code === 'KeyP') togglePause();
});

startBtn.addEventListener('click', () => {
  if (gameState === 'paused') togglePause();
  else startGame();
});

pauseBtn.addEventListener('click', togglePause);
langSelect.addEventListener('change', (e) => setLanguage(e.target.value));

function updateSoundButtons() {
  musicToggle.classList.toggle('off', !GameAudio.musicEnabled);
  musicToggle.setAttribute('aria-pressed', String(GameAudio.musicEnabled));
  sfxToggle.classList.toggle('off', !GameAudio.sfxEnabled);
  sfxToggle.setAttribute('aria-pressed', String(GameAudio.sfxEnabled));
}

musicToggle.addEventListener('click', async () => {
  await GameAudio.resume();
  GameAudio.setMusicEnabled(!GameAudio.musicEnabled);
  if (GameAudio.musicEnabled && gameState === 'playing') GameAudio.startBgm();
  updateSoundButtons();
});

sfxToggle.addEventListener('click', async () => {
  await GameAudio.resume();
  GameAudio.setSfxEnabled(!GameAudio.sfxEnabled);
  if (GameAudio.sfxEnabled) GameAudio.playSelect();
  updateSoundButtons();
});

playerNameInput.addEventListener('change', () => {
  localStorage.setItem(NICKNAME_KEY, getPlayerName());
});

updateSoundButtons();
playerNameInput.value = localStorage.getItem(NICKNAME_KEY) || '';
setLanguage(currentLang);
drawAll();
