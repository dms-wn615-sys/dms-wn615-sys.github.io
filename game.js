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
    level: '레벨',
    levelGoal: '목표 {current}/{target}줄 제거',
    levelStartMsg: '레벨 {level} · 목표 {target}줄 제거',
    levelComplete: '레벨 클리어!',
    levelCompleteMsg: '레벨 {level} 완료 · 다음 레벨 {next}',
    nextLevel: '다음 레벨',
    retryLevel: '다시 도전',
    maxLevel: '축하합니다! 10,000레벨 클리어!',
    modeCampaign: '캠페인',
    modeTournament: '토너먼트',
    tournamentRankings: '일일 토너먼트',
    tournamentStartMsg: '{day} · 5라운드 · 합산 점수 경쟁',
    tournamentStart: '토너먼트 시작',
    tournamentRoundGoal: 'R{round}/{max} · 합계 {total} · 목표 {current}/{target}줄',
    tournamentRoundComplete: '라운드 클리어!',
    tournamentRoundCompleteMsg: 'R{round}/{max} 완료 · 합계 {total}점',
    tournamentNextRound: '다음 라운드',
    tournamentComplete: '토너먼트 우승!',
    tournamentCompleteMsg: '합계 {total}점 · {clears}줄 · {rank}위',
    tournamentFail: '토너먼트 종료',
    tournamentFailMsg: 'R{round}/{max} · 합계 {total}점 · {rank}위',
    tournamentRetry: '다시 도전',
    noTournamentRecords: '오늘 기록 없음',
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
    level: 'Level',
    levelGoal: 'Goal {current}/{target} clears',
    levelStartMsg: 'Level {level} · Clear {target} lines',
    levelComplete: 'Level Clear!',
    levelCompleteMsg: 'Level {level} done · Next {next}',
    nextLevel: 'Next Level',
    retryLevel: 'Try Again',
    maxLevel: 'Congrats! All 10,000 levels cleared!',
    modeCampaign: 'Campaign',
    modeTournament: 'Tournament',
    tournamentRankings: 'Daily Tournament',
    tournamentStartMsg: '{day} · 5 rounds · highest total score',
    tournamentStart: 'Start Tournament',
    tournamentRoundGoal: 'R{round}/{max} · Total {total} · Goal {current}/{target}',
    tournamentRoundComplete: 'Round Clear!',
    tournamentRoundCompleteMsg: 'R{round}/{max} done · Total {total}',
    tournamentNextRound: 'Next Round',
    tournamentComplete: 'Tournament Champion!',
    tournamentCompleteMsg: 'Total {total} · {clears} lines · Rank #{rank}',
    tournamentFail: 'Tournament Over',
    tournamentFailMsg: 'R{round}/{max} · Total {total} · Rank #{rank}',
    tournamentRetry: 'Try Again',
    noTournamentRecords: 'No scores today',
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
    level: 'レベル',
    levelGoal: '目標 {current}/{target} ライン',
    levelStartMsg: 'Lv.{level} · {target}ライン消去',
    levelComplete: 'クリア！',
    levelCompleteMsg: 'Lv.{level} 完了 · 次 {next}',
    nextLevel: '次のレベル',
    retryLevel: 'リトライ',
    maxLevel: '全10,000レベルクリア！',
    modeCampaign: 'キャンペーン',
    modeTournament: 'トーナメント',
    tournamentRankings: '日次トーナメント',
    tournamentStartMsg: '{day} · 5ラウンド · 合計スコア',
    tournamentStart: 'トーナメント開始',
    tournamentRoundGoal: 'R{round}/{max} · 合計{total} · 目標{current}/{target}',
    tournamentRoundComplete: 'ラウンドクリア！',
    tournamentRoundCompleteMsg: 'R{round}/{max} 完了 · 合計{total}',
    tournamentNextRound: '次のラウンド',
    tournamentComplete: 'トーナメント優勝！',
    tournamentCompleteMsg: '合計{total} · {clears}ライン · {rank}位',
    tournamentFail: 'トーナメント終了',
    tournamentFailMsg: 'R{round}/{max} · 合計{total} · {rank}位',
    tournamentRetry: 'リトライ',
    noTournamentRecords: '今日の記録なし',
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
    level: '关卡',
    levelGoal: '目标 {current}/{target} 行',
    levelStartMsg: '第{level}关 · 消除{target}行',
    levelComplete: '过关！',
    levelCompleteMsg: '第{level}关完成 · 下一关 {next}',
    nextLevel: '下一关',
    retryLevel: '重试',
    maxLevel: '恭喜！10000关全部通关！',
    modeCampaign: '战役',
    modeTournament: '锦标赛',
    tournamentRankings: '每日锦标赛',
    tournamentStartMsg: '{day} · 5轮 · 总分排名',
    tournamentStart: '开始锦标赛',
    tournamentRoundGoal: 'R{round}/{max} · 总分{total} · 目标{current}/{target}',
    tournamentRoundComplete: '轮次过关！',
    tournamentRoundCompleteMsg: 'R{round}/{max} 完成 · 总分{total}',
    tournamentNextRound: '下一轮',
    tournamentComplete: '锦标赛冠军！',
    tournamentCompleteMsg: '总分{total} · {clears}行 · 第{rank}名',
    tournamentFail: '锦标赛结束',
    tournamentFailMsg: 'R{round}/{max} · 总分{total} · 第{rank}名',
    tournamentRetry: '重试',
    noTournamentRecords: '今日暂无记录',
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
    level: 'Nivel',
    levelGoal: 'Meta {current}/{target} líneas',
    levelStartMsg: 'Nivel {level} · Elimina {target} líneas',
    levelComplete: '¡Nivel superado!',
    levelCompleteMsg: 'Nivel {level} · Siguiente {next}',
    nextLevel: 'Siguiente',
    retryLevel: 'Reintentar',
    maxLevel: '¡10.000 niveles completados!',
    modeCampaign: 'Campaña',
    modeTournament: 'Torneo',
    tournamentRankings: 'Torneo diario',
    tournamentStartMsg: '{day} · 5 rondas · mayor puntuación total',
    tournamentStart: 'Iniciar torneo',
    tournamentRoundGoal: 'R{round}/{max} · Total {total} · Meta {current}/{target}',
    tournamentRoundComplete: '¡Ronda superada!',
    tournamentRoundCompleteMsg: 'R{round}/{max} · Total {total}',
    tournamentNextRound: 'Siguiente ronda',
    tournamentComplete: '¡Campeón del torneo!',
    tournamentCompleteMsg: 'Total {total} · {clears} líneas · Puesto #{rank}',
    tournamentFail: 'Torneo terminado',
    tournamentFailMsg: 'R{round}/{max} · Total {total} · Puesto #{rank}',
    tournamentRetry: 'Reintentar',
    noTournamentRecords: 'Sin puntuaciones hoy',
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
    level: 'Niveau',
    levelGoal: 'Objectif {current}/{target} lignes',
    levelStartMsg: 'Niveau {level} · {target} lignes',
    levelComplete: 'Niveau réussi !',
    levelCompleteMsg: 'Niveau {level} · Suivant {next}',
    nextLevel: 'Suivant',
    retryLevel: 'Réessayer',
    maxLevel: '10 000 niveaux terminés !',
    modeCampaign: 'Campagne',
    modeTournament: 'Tournoi',
    tournamentRankings: 'Tournoi du jour',
    tournamentStartMsg: '{day} · 5 manches · score total',
    tournamentStart: 'Lancer le tournoi',
    tournamentRoundGoal: 'R{round}/{max} · Total {total} · Objectif {current}/{target}',
    tournamentRoundComplete: 'Manche réussie !',
    tournamentRoundCompleteMsg: 'R{round}/{max} · Total {total}',
    tournamentNextRound: 'Manche suivante',
    tournamentComplete: 'Champion du tournoi !',
    tournamentCompleteMsg: 'Total {total} · {clears} lignes · {rank}e',
    tournamentFail: 'Tournoi terminé',
    tournamentFailMsg: 'R{round}/{max} · Total {total} · {rank}e',
    tournamentRetry: 'Réessayer',
    noTournamentRecords: 'Aucun score aujourd\'hui',
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
    level: 'Level',
    levelGoal: 'Ziel {current}/{target} Linien',
    levelStartMsg: 'Level {level} · {target} Linien löschen',
    levelComplete: 'Level geschafft!',
    levelCompleteMsg: 'Level {level} · Weiter {next}',
    nextLevel: 'Nächstes Level',
    retryLevel: 'Nochmal',
    maxLevel: 'Alle 10.000 Level geschafft!',
    modeCampaign: 'Kampagne',
    modeTournament: 'Turnier',
    tournamentRankings: 'Tägliches Turnier',
    tournamentStartMsg: '{day} · 5 Runden · Gesamtpunkte',
    tournamentStart: 'Turnier starten',
    tournamentRoundGoal: 'R{round}/{max} · Gesamt {total} · Ziel {current}/{target}',
    tournamentRoundComplete: 'Runde geschafft!',
    tournamentRoundCompleteMsg: 'R{round}/{max} · Gesamt {total}',
    tournamentNextRound: 'Nächste Runde',
    tournamentComplete: 'Turniersieger!',
    tournamentCompleteMsg: 'Gesamt {total} · {clears} Linien · Platz {rank}',
    tournamentFail: 'Turnier beendet',
    tournamentFailMsg: 'R{round}/{max} · Gesamt {total} · Platz {rank}',
    tournamentRetry: 'Nochmal',
    noTournamentRecords: 'Keine Einträge heute',
  },
};

const langSelect = document.getElementById('langSelect');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const clearsEl = document.getElementById('clears');
const comboEl = document.getElementById('combo');
const comboBoxEl = document.getElementById('comboBox');
const levelNumEl = document.getElementById('levelNum');
const levelGoalEl = document.getElementById('levelGoal');
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
const tournamentBoard = document.getElementById('tournamentBoard');
const tournamentList = document.getElementById('tournamentList');
const tournamentDayEl = document.getElementById('tournamentDay');
const modeCampaignBtn = document.getElementById('modeCampaign');
const modeTournamentBtn = document.getElementById('modeTournament');

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
let currentLevel = 1;
let levelConfig = null;
let levelRng = null;
let gameMode = 'campaign';
let tournamentState = null;
let lastTournamentRank = null;
let lastTournamentCompleted = false;

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
    showOverlay(t('title'), getModeStartMessage(), getModeStartButtonText());
  } else if (gameState === 'paused') {
    showOverlay(t('paused'), t('pausedMsg'), t('continue'));
  } else if (gameState === 'levelcomplete') {
    if (gameMode === 'tournament') {
      showOverlay(t('tournamentRoundComplete'), getTournamentRoundCompleteMessage(), t('tournamentNextRound'));
    } else {
      showOverlay(t('levelComplete'), getLevelCompleteMessage(), getLevelCompleteButtonText());
    }
  } else if (gameState === 'tournamentcomplete') {
    showOverlay(t('tournamentComplete'), getTournamentCompleteMessage(), t('tournamentRetry'));
  } else if (gameState === 'gameover') {
    showOverlay(
      gameMode === 'tournament' ? t('tournamentFail') : t('gameOver'),
      gameMode === 'tournament' ? getTournamentFailMessage() : getGameOverMessage(),
      gameMode === 'tournament' ? t('tournamentRetry') : t('retryLevel'),
    );
  }
}

function getModeStartMessage() {
  if (gameMode === 'tournament') {
    return t('tournamentStartMsg', { day: TournamentSystem.getDayId() });
  }
  return getLevelStartMessage();
}

function getModeStartButtonText() {
  return gameMode === 'tournament' ? t('tournamentStart') : t('start');
}

function getTournamentRoundCompleteMessage() {
  return t('tournamentRoundCompleteMsg', {
    round: tournamentState?.round ?? 1,
    max: TournamentSystem.MAX_ROUNDS,
    total: tournamentState?.totalScore ?? 0,
  });
}

function getTournamentCompleteMessage() {
  return t('tournamentCompleteMsg', {
    total: tournamentState?.totalScore ?? 0,
    clears: tournamentState?.totalClears ?? 0,
    rank: lastTournamentRank ?? '-',
  });
}

function getTournamentFailMessage() {
  return t('tournamentFailMsg', {
    round: tournamentState?.round ?? 1,
    max: TournamentSystem.MAX_ROUNDS,
    total: tournamentState?.totalScore ?? 0,
    rank: lastTournamentRank ?? '-',
  });
}

function getLevelStartMessage() {
  if (!levelConfig) return t('startMsg');
  return t('levelStartMsg', { level: currentLevel, target: levelConfig.targetClears });
}

function getLevelCompleteMessage() {
  if (currentLevel >= LevelSystem.MAX_LEVEL) return t('maxLevel');
  return t('levelCompleteMsg', { level: currentLevel, next: currentLevel + 1 });
}

function getLevelCompleteButtonText() {
  if (currentLevel >= LevelSystem.MAX_LEVEL) return t('restart');
  return t('nextLevel');
}

function updateLevelUI() {
  if (gameMode === 'tournament' && tournamentState) {
    levelNumEl.textContent = tournamentState.round;
    if (gameState === 'idle') {
      levelGoalEl.textContent = t('tournamentStartMsg', { day: tournamentState.dayId });
      return;
    }
    const total = tournamentState.totalScore + (gameState === 'playing' ? score : 0);
    levelGoalEl.textContent = t('tournamentRoundGoal', {
      round: tournamentState.round,
      max: tournamentState.maxRounds,
      total,
      current: Math.min(clears, levelConfig?.targetClears ?? 0),
      target: levelConfig?.targetClears ?? 0,
    });
    return;
  }

  levelNumEl.textContent = currentLevel;
  if (!levelConfig || gameState === 'idle') {
    if (levelConfig) {
      levelGoalEl.textContent = t('levelGoal', { current: 0, target: levelConfig.targetClears });
    } else {
      levelGoalEl.textContent = '';
    }
    return;
  }
  levelGoalEl.textContent = t('levelGoal', {
    current: Math.min(clears, levelConfig.targetClears),
    target: levelConfig.targetClears,
  });
}

function setGameMode(mode) {
  if (gameState !== 'idle') return;
  gameMode = mode === 'tournament' ? 'tournament' : 'campaign';
  modeCampaignBtn.classList.toggle('active', gameMode === 'campaign');
  modeTournamentBtn.classList.toggle('active', gameMode === 'tournament');
  tournamentBoard.hidden = gameMode !== 'tournament';
  document.getElementById('leaderboard').hidden = gameMode === 'tournament';
  if (gameMode === 'tournament') {
    tournamentState = TournamentSystem.createState();
    loadLevel(TournamentSystem.getRoundLevel(1, tournamentState.daySeed));
  } else {
    tournamentState = null;
    loadLevel(currentLevel);
  }
  updateLevelUI();
  refreshOverlayText();
  renderTournamentLeaderboard();
}

function renderTournamentLeaderboard() {
  const dayId = TournamentSystem.getDayId();
  tournamentDayEl.textContent = dayId;
  const entries = TournamentSystem.getDayScores(dayId);
  if (!entries.length) {
    tournamentList.innerHTML = `<li class="leaderboard-empty">${escapeHtml(t('noTournamentRecords'))}</li>`;
    return;
  }
  tournamentList.innerHTML = entries.map((entry, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
    const badge = entry.completed ? '🏆' : '';
    return `<li class="leaderboard-item${index < 3 ? ' top' : ''}">
      <span class="leaderboard-rank">${medal}</span>
      <span class="leaderboard-name">${escapeHtml(entry.name)}${badge}</span>
      <span class="leaderboard-score">${entry.score}</span>
    </li>`;
  }).join('');
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
  renderTournamentLeaderboard();
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

function randomLevelPiece() {
  if (!levelRng) return randomPiece();
  return LevelSystem.pickPiece(levelRng, PIECE_POOL);
}

function refillTray() {
  trayPieces = [randomLevelPiece(), randomLevelPiece(), randomLevelPiece()];
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

function checkLevelWin() {
  if (!levelConfig || gameState !== 'playing') return;
  if (clears >= levelConfig.targetClears) {
    completeLevel();
  }
}

function completeLevel() {
  gameState = 'levelcomplete';
  delete document.body.dataset.gameStatePlaying;
  GameAudio.stopBgm();
  GameAudio.playClear(1, 1);
  pauseBtn.disabled = true;

  if (gameMode === 'tournament' && tournamentState) {
    tournamentState.totalScore += score;
    tournamentState.totalClears += clears;
    showOverlay(t('tournamentRoundComplete'), getTournamentRoundCompleteMessage(), t('tournamentNextRound'));
    return;
  }

  LevelSystem.saveProgress(currentLevel + 1);
  saveScoreRecord(score, clears);
  renderLeaderboard();
  showOverlay(t('levelComplete'), getLevelCompleteMessage(), getLevelCompleteButtonText());
}

function finishTournament(completed) {
  if (!tournamentState) return;
  if (!completed) {
    tournamentState.totalScore += score;
    tournamentState.totalClears += clears;
  }
  tournamentState.completed = completed;
  const result = TournamentSystem.saveResult(
    getPlayerName(),
    tournamentState.totalScore,
    tournamentState.totalClears,
    tournamentState.dayId,
    completed,
  );
  lastTournamentRank = result.rank;
  lastTournamentCompleted = completed;
  renderTournamentLeaderboard();
  gameState = completed ? 'tournamentcomplete' : 'gameover';
  delete document.body.dataset.gameStatePlaying;
  GameAudio.stopBgm();
  if (completed) GameAudio.playClear(2, 2);
  else GameAudio.playGameOver();
  pauseBtn.disabled = true;
  if (completed) {
    showOverlay(t('tournamentComplete'), getTournamentCompleteMessage(), t('tournamentRetry'));
  } else {
    showOverlay(t('tournamentFail'), getTournamentFailMessage(), t('tournamentRetry'));
  }
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
  checkLevelWin();
  if (gameState !== 'playing') return;
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
  comboBoxEl?.classList.toggle('is-active', combo > 0);
  updateLevelUI();
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

function loadLevel(levelNum) {
  currentLevel = Math.max(1, Math.min(LevelSystem.MAX_LEVEL, levelNum));
  levelConfig = LevelSystem.generateLevel(currentLevel, PIECE_POOL);
  levelRng = LevelSystem.createRng(levelConfig.seed + 99991);
  updateLevelUI();
}

function beginRound() {
  if (gameMode === 'tournament' && tournamentState) {
    const levelNum = TournamentSystem.getRoundLevel(tournamentState.round, tournamentState.daySeed);
    loadLevel(levelNum);
  } else {
    loadLevel(currentLevel);
  }
  board = levelConfig.board.map(row => [...row]);
  trayPieces = levelConfig.trayPieces.map(piece => ({
    shape: piece.shape.map(row => [...row]),
    color: piece.color,
  }));
}

function startGame() {
  GameAudio.resume().then(() => {
    if (gameMode === 'tournament') {
      tournamentState = TournamentSystem.createState();
    }
    beginRound();
    score = 0;
    clears = 0;
    combo = 0;
    selectedIndex = null;
    hoverCell = null;
    lastGameRank = null;
    lastMadeBoard = false;
    lastTournamentRank = null;
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

function advanceLevel() {
  if (gameMode === 'tournament') {
    advanceTournamentRound();
    return;
  }
  if (currentLevel >= LevelSystem.MAX_LEVEL) {
    currentLevel = LevelSystem.MAX_LEVEL;
    gameState = 'idle';
    refreshOverlayText();
    return;
  }
  currentLevel += 1;
  startGame();
}

function advanceTournamentRound() {
  if (!tournamentState) return;
  if (tournamentState.round >= tournamentState.maxRounds) {
    finishTournament(true);
    return;
  }
  tournamentState.round += 1;
  GameAudio.resume().then(() => {
    beginRound();
    score = 0;
    clears = 0;
    combo = 0;
    selectedIndex = null;
    hoverCell = null;
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

function resetToIdle() {
  gameState = 'idle';
  pauseBtn.disabled = true;
  if (gameMode === 'tournament') {
    tournamentState = TournamentSystem.createState();
    loadLevel(TournamentSystem.getRoundLevel(1, tournamentState.daySeed));
  } else {
    loadLevel(currentLevel);
  }
  updateLevelUI();
  refreshOverlayText();
}

function endGame() {
  if (gameMode === 'tournament' && tournamentState) {
    finishTournament(false);
    return;
  }
  gameState = 'gameover';
  delete document.body.dataset.gameStatePlaying;
  GameAudio.stopBgm();
  GameAudio.playGameOver();
  pauseBtn.disabled = true;
  const result = saveScoreRecord(score, clears);
  lastGameRank = result.rank;
  lastMadeBoard = result.madeBoard;
  renderLeaderboard();
  showOverlay(t('gameOver'), getGameOverMessage(), t('retryLevel'));
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
  if (gameState === 'idle' || gameState === 'gameover' || gameState === 'levelcomplete' || gameState === 'tournamentcomplete') {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      if (gameState === 'levelcomplete') advanceLevel();
      else if (gameState === 'tournamentcomplete' || gameState === 'gameover') resetToIdle();
      else startGame();
    }
    return;
  }
  if (e.code === 'KeyP') togglePause();
});

startBtn.addEventListener('click', () => {
  if (gameState === 'paused') togglePause();
  else if (gameState === 'levelcomplete') advanceLevel();
  else if (gameState === 'tournamentcomplete' || (gameState === 'gameover' && gameMode === 'tournament')) resetToIdle();
  else startGame();
});

modeCampaignBtn.addEventListener('click', () => setGameMode('campaign'));
modeTournamentBtn.addEventListener('click', () => setGameMode('tournament'));

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
currentLevel = LevelSystem.loadProgress();
loadLevel(currentLevel);
setLanguage(currentLang);
renderTournamentLeaderboard();
drawAll();
