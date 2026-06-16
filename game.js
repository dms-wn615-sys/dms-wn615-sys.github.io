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
    pickBlock: '다음 블록',
    controls: '조작법',
    controlsHint: '보드를 터치/클릭하여 블록을 배치하세요.',
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
    newHighScore: '🏆 새 최고 기록!',
    highScore: '최고 점수',
    highScoreTournament: '토너먼트 최고',
    highScoreFreeplay: '자유 모드 최고',
    noHighScore: '—',
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
    modeFreeplay: '자유',
    freeplayStartMsg: '빈 보드에서 자유롭게 플레이하세요!',
    freeplayGoal: '제거 {clears}줄 · 목표 없음',
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
    pickBlock: 'Next block',
    controls: 'How to play',
    controlsHint: 'Tap the board to place the current block.',
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
    newHighScore: '🏆 New best!',
    highScore: 'Best Score',
    highScoreTournament: 'Tournament Best',
    highScoreFreeplay: 'Free Play Best',
    noHighScore: '—',
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
    modeFreeplay: 'Free',
    freeplayStartMsg: 'Play freely on an empty board!',
    freeplayGoal: '{clears} clears · No goal',
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
    pickBlock: '次のブロック',
    controls: '操作',
    controlsHint: 'ボードをタップしてブロックを配置',
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
    newHighScore: '🏆 自己ベスト更新!',
    highScore: '最高スコア',
    highScoreTournament: 'トーナメント最高',
    highScoreFreeplay: 'フリーモード最高',
    noHighScore: '—',
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
    modeFreeplay: 'フリー',
    freeplayStartMsg: '空のボードで自由にプレイ！',
    freeplayGoal: '消去 {clears} · 目標なし',
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
    pickBlock: '下一个方块',
    controls: '操作',
    controlsHint: '点击棋盘放置当前方块',
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
    newHighScore: '🏆 刷新最高分!',
    highScore: '最高分',
    highScoreTournament: '锦标赛最高',
    highScoreFreeplay: '自由模式最高',
    noHighScore: '—',
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
    modeFreeplay: '自由',
    freeplayStartMsg: '在空棋盘上自由游玩！',
    freeplayGoal: '消除 {clears} 行 · 无目标',
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
    pickBlock: 'Siguiente bloque',
    controls: 'Controles',
    controlsHint: 'Toca el tablero para colocar el bloque actual.',
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
    newHighScore: '🏆 ¡Nuevo récord!',
    highScore: 'Mejor puntuación',
    highScoreTournament: 'Mejor torneo',
    highScoreFreeplay: 'Mejor modo libre',
    noHighScore: '—',
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
    modeFreeplay: 'Libre',
    freeplayStartMsg: '¡Juega libremente en un tablero vacío!',
    freeplayGoal: '{clears} líneas · Sin meta',
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
    pickBlock: 'Bloc suivant',
    controls: 'Commandes',
    controlsHint: 'Touchez le plateau pour placer le bloc actuel.',
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
    newHighScore: '🏆 Nouveau record !',
    highScore: 'Meilleur score',
    highScoreTournament: 'Record tournoi',
    highScoreFreeplay: 'Record mode libre',
    noHighScore: '—',
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
    modeFreeplay: 'Libre',
    freeplayStartMsg: 'Jouez librement sur un plateau vide !',
    freeplayGoal: '{clears} lignes · Sans objectif',
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
    pickBlock: 'Nächster Block',
    controls: 'Steuerung',
    controlsHint: 'Tippe aufs Brett, um den aktuellen Block zu legen.',
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
    newHighScore: '🏆 Neuer Rekord!',
    highScore: 'Highscore',
    highScoreTournament: 'Turnier-Rekord',
    highScoreFreeplay: 'Freispiel-Rekord',
    noHighScore: '—',
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
    modeFreeplay: 'Frei',
    freeplayStartMsg: 'Spiele frei auf einem leeren Brett!',
    freeplayGoal: '{clears} Linien · Kein Ziel',
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
const scoreBoxEl = document.querySelector('.stat-box--score');
const highScoreEl = document.getElementById('highScore');
const highScoreRow = document.getElementById('highScoreRow');
const highScoreLabel = document.getElementById('highScoreLabel');
const clearsEl = document.getElementById('clears');
const comboEl = document.getElementById('combo');
const comboBoxEl = document.getElementById('comboBox');
const levelNumEl = document.getElementById('levelNum');
const levelGoalEl = document.getElementById('levelGoal');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const startBtn = document.getElementById('startBtn');
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
const modeFreeplayBtn = document.getElementById('modeFreeplay');
const levelLabelEl = document.querySelector('.stat-box--level .stat-label');

const LEADERBOARD_KEY = 'blockgame-leaderboard';
const NICKNAME_KEY = 'blockgame-nickname';
const PERSONAL_BEST_KEY = 'blockgame-personal-best';
const MAX_LEADERBOARD = 10;

let currentLang = detectLanguage();
let board = [];
let pieceQueue = [];
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
let lastNewHighScore = false;

function normalizeGameMode(mode) {
  if (mode === 'tournament') return 'tournament';
  if (mode === 'freeplay') return 'freeplay';
  return 'campaign';
}

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
    el.textContent = t(el.dataset.i18n);
  });
}

function refreshOverlayText() {
  if (gameState === 'idle') {
    showOverlay(t('title'), getModeStartMessage(), getModeStartButtonText());
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
      gameMode === 'tournament' ? t('tournamentRetry') : gameMode === 'freeplay' ? t('restart') : t('retryLevel'),
    );
  }
}

function getModeStartMessage() {
  if (gameMode === 'tournament') {
    return t('tournamentStartMsg', { day: TournamentSystem.getDayId() });
  }
  if (gameMode === 'freeplay') {
    return t('freeplayStartMsg');
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
  return appendHighScoreNote(t('tournamentCompleteMsg', {
    total: tournamentState?.totalScore ?? 0,
    clears: tournamentState?.totalClears ?? 0,
    rank: lastTournamentRank ?? '-',
  }));
}

function getTournamentFailMessage() {
  return appendHighScoreNote(t('tournamentFailMsg', {
    round: tournamentState?.round ?? 1,
    max: TournamentSystem.MAX_ROUNDS,
    total: tournamentState?.totalScore ?? 0,
    rank: lastTournamentRank ?? '-',
  }));
}

function getLevelStartMessage() {
  if (!levelConfig) return t('startMsg');
  return t('levelStartMsg', { level: currentLevel, target: levelConfig.targetClears });
}

function getLevelCompleteMessage() {
  if (currentLevel >= LevelSystem.MAX_LEVEL) return appendHighScoreNote(t('maxLevel'));
  return appendHighScoreNote(t('levelCompleteMsg', { level: currentLevel, next: currentLevel + 1 }));
}

function getLevelCompleteButtonText() {
  if (currentLevel >= LevelSystem.MAX_LEVEL) return t('restart');
  return t('nextLevel');
}

function updateLevelUI() {
  if (levelLabelEl) {
    levelLabelEl.textContent = gameMode === 'freeplay' ? t('modeFreeplay') : t('level');
  }

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

  if (gameMode === 'freeplay') {
    levelNumEl.textContent = '∞';
    if (gameState === 'idle') {
      levelGoalEl.textContent = t('freeplayStartMsg');
      return;
    }
    levelGoalEl.textContent = t('freeplayGoal', { clears });
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
  gameMode = normalizeGameMode(mode);
  modeCampaignBtn.classList.toggle('active', gameMode === 'campaign');
  modeTournamentBtn.classList.toggle('active', gameMode === 'tournament');
  modeFreeplayBtn.classList.toggle('active', gameMode === 'freeplay');
  tournamentBoard.hidden = gameMode !== 'tournament';
  document.getElementById('leaderboard').hidden = gameMode === 'tournament';
  if (gameMode === 'tournament') {
    tournamentState = TournamentSystem.createState();
    loadLevel(TournamentSystem.getRoundLevel(1, tournamentState.daySeed));
  } else if (gameMode === 'freeplay') {
    tournamentState = null;
    loadFreePlay();
  } else {
    tournamentState = null;
    loadLevel(currentLevel);
  }
  updateLevelUI();
  refreshOverlayText();
  renderTournamentLeaderboard();
  updateHighScoreUI();
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

function emptyPersonalRecord() {
  return { score: 0, clears: 0, date: 0 };
}

function normalizePersonalRecord(record) {
  if (!record || typeof record.score !== 'number') return emptyPersonalRecord();
  return {
    score: record.score,
    clears: record.clears || 0,
    date: record.date || 0,
  };
}

function loadPersonalBests() {
  try {
    const data = JSON.parse(localStorage.getItem(PERSONAL_BEST_KEY));
    return {
      campaign: normalizePersonalRecord(data?.campaign),
      tournament: normalizePersonalRecord(data?.tournament),
      freeplay: normalizePersonalRecord(data?.freeplay),
    };
  } catch {
    return {
      campaign: emptyPersonalRecord(),
      tournament: emptyPersonalRecord(),
      freeplay: emptyPersonalRecord(),
    };
  }
}

function getPersonalBestMode() {
  if (gameMode === 'tournament') return 'tournament';
  if (gameMode === 'freeplay') return 'freeplay';
  return 'campaign';
}

function getActiveHighScoreRecord() {
  return loadPersonalBests()[getPersonalBestMode()];
}

function savePersonalBest(mode, gameScore, gameClears) {
  if (gameScore <= 0) return { isNew: false, record: getActiveHighScoreRecord() };
  const bests = loadPersonalBests();
  const key = mode === 'tournament' ? 'tournament' : mode === 'freeplay' ? 'freeplay' : 'campaign';
  const current = bests[key];
  if (gameScore <= current.score) return { isNew: false, record: current };
  const record = { score: gameScore, clears: gameClears, date: Date.now() };
  bests[key] = record;
  localStorage.setItem(PERSONAL_BEST_KEY, JSON.stringify(bests));
  return { isNew: true, record };
}

function getComparableScore() {
  if (gameMode === 'tournament' && tournamentState) {
    return tournamentState.totalScore + (gameState === 'playing' ? score : 0);
  }
  return score;
}

function updateHighScoreUI() {
  if (!highScoreEl) return;
  const record = getActiveHighScoreRecord();
  highScoreEl.textContent = record.score > 0 ? record.score : t('noHighScore');
  if (highScoreLabel) {
    const labelKey = gameMode === 'tournament'
      ? 'highScoreTournament'
      : gameMode === 'freeplay'
        ? 'highScoreFreeplay'
        : 'highScore';
    highScoreLabel.dataset.i18n = labelKey;
    highScoreLabel.textContent = t(labelKey);
  }
}

function refreshBeatingRecordState() {
  const record = getActiveHighScoreRecord();
  const current = getComparableScore();
  const beating = gameState === 'playing' && current > record.score;
  highScoreRow?.classList.toggle('is-beating', beating);
  scoreBoxEl?.classList.toggle('is-beating-record', beating);
}

function recordPersonalBest(gameScore, gameClears, mode = getPersonalBestMode()) {
  const result = savePersonalBest(mode, gameScore, gameClears);
  lastNewHighScore = result.isNew;
  if (result.isNew) GameAudio.playClear(2, 2);
  updateHighScoreUI();
  refreshBeatingRecordState();
  return result;
}

function appendHighScoreNote(message) {
  if (!lastNewHighScore) return message;
  return `${message} · ${t('newHighScore')}`;
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
  return appendHighScoreNote(msg);
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
  updateHighScoreUI();
  updateLevelUI();
  refreshOverlayText();
  renderLeaderboard();
  renderTournamentLeaderboard();
  if (playerNameInput) playerNameInput.placeholder = t('playerName');
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

function ensurePieceQueue() {
  while (pieceQueue.length < 3) {
    pieceQueue.push(randomLevelPiece());
  }
}

function getCurrentPiece() {
  return pieceQueue[0] || null;
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
  if (gameMode === 'freeplay' || !levelConfig || gameState !== 'playing') return;
  if (levelConfig.targetClears <= 0) return;
  if (clears >= levelConfig.targetClears) {
    completeLevel();
  }
}

function completeLevel() {
  gameState = 'levelcomplete';
  delete document.body.dataset.gameStatePlaying;
  GameAudio.stopBgm();
  GameAudio.playClear(1, 1);

  if (gameMode === 'tournament' && tournamentState) {
    tournamentState.totalScore += score;
    tournamentState.totalClears += clears;
    showOverlay(t('tournamentRoundComplete'), getTournamentRoundCompleteMessage(), t('tournamentNextRound'));
    return;
  }

  LevelSystem.saveProgress(currentLevel + 1);
  saveScoreRecord(score, clears);
  recordPersonalBest(score, clears, gameMode === 'freeplay' ? 'freeplay' : 'campaign');
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
  recordPersonalBest(tournamentState.totalScore, tournamentState.totalClears, 'tournament');
  renderTournamentLeaderboard();
  gameState = completed ? 'tournamentcomplete' : 'gameover';
  delete document.body.dataset.gameStatePlaying;
  GameAudio.stopBgm();
  if (completed) GameAudio.playClear(2, 2);
  else GameAudio.playGameOver();
  if (completed) {
    showOverlay(t('tournamentComplete'), getTournamentCompleteMessage(), t('tournamentRetry'));
  } else {
    showOverlay(t('tournamentFail'), getTournamentFailMessage(), t('tournamentRetry'));
  }
}

function checkGameOver() {
  const piece = getCurrentPiece();
  if (!piece) return;
  if (!canPlaceAnywhere(piece.shape)) endGame();
}

function placePiece(row, col) {
  const piece = getCurrentPiece();
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

  pieceQueue.shift();
  ensurePieceQueue();

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

  if (pieceQueue.length === 0) {
    ensurePieceQueue();
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

  const currentPiece = getCurrentPiece();
  if (currentPiece && hoverCell && gameState === 'playing') {
    const piece = currentPiece;
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
    const piece = pieceQueue[i];
    slot.classList.toggle('selected', i === 0 && !!piece && gameState === 'playing');
    slot.classList.toggle('preview', i > 0 && !!piece);
    slot.classList.toggle('used', !piece);

    if (piece) {
      const cellSize = Math.min(22, Math.floor(90 / Math.max(piece.shape.length, piece.shape[0].length)));
      drawShapeOnCanvas(c, piece.shape, piece.color, 100, 100, cellSize);
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
  refreshBeatingRecordState();
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

function loadFreePlay() {
  levelConfig = LevelSystem.generateFreePlay(PIECE_POOL);
  levelRng = LevelSystem.createRng(levelConfig.seed + 99991);
  updateLevelUI();
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
  } else if (gameMode === 'freeplay') {
    loadFreePlay();
  } else {
    loadLevel(currentLevel);
  }
  board = levelConfig.board.map(row => [...row]);
  pieceQueue = levelConfig.trayPieces.map(piece => ({
    shape: piece.shape.map(row => [...row]),
    color: piece.color,
  }));
  ensurePieceQueue();
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
    hoverCell = null;
    lastGameRank = null;
    lastMadeBoard = false;
    lastNewHighScore = false;
    lastTournamentRank = null;
    updateStats();
    hideOverlay();
    gameState = 'playing';
    document.body.dataset.gameStatePlaying = 'true';
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
    hoverCell = null;
    updateStats();
    hideOverlay();
    gameState = 'playing';
    document.body.dataset.gameStatePlaying = 'true';
    GameAudio.startBgm();
    drawAll();
  });
}

function resetToIdle() {
  gameState = 'idle';
  if (gameMode === 'tournament') {
    tournamentState = TournamentSystem.createState();
    loadLevel(TournamentSystem.getRoundLevel(1, tournamentState.daySeed));
  } else if (gameMode === 'freeplay') {
    loadFreePlay();
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
  const result = saveScoreRecord(score, clears);
  lastGameRank = result.rank;
  lastMadeBoard = result.madeBoard;
  recordPersonalBest(score, clears, gameMode === 'freeplay' ? 'freeplay' : 'campaign');
  renderLeaderboard();
  showOverlay(t('gameOver'), getGameOverMessage(), t('retryLevel'));
}

canvas.addEventListener('mousemove', (e) => {
  if (gameState !== 'playing' || !getCurrentPiece()) return;
  hoverCell = getBoardCell(e.clientX, e.clientY);
  drawBoard();
});

canvas.addEventListener('mouseleave', () => {
  hoverCell = null;
  if (gameState === 'playing') drawBoard();
});

canvas.addEventListener('click', (e) => {
  if (gameState !== 'playing' || !getCurrentPiece()) return;
  const cell = getBoardCell(e.clientX, e.clientY);
  if (cell) {
    if (!placePiece(cell.r, cell.c)) {
      GameAudio.playInvalid();
    }
  }
});

canvas.addEventListener('touchstart', (e) => {
  if (gameState !== 'playing' || !getCurrentPiece()) return;
  e.preventDefault();
  const touch = e.touches[0];
  const cell = getBoardCell(touch.clientX, touch.clientY);
  if (cell && !placePiece(cell.r, cell.c)) {
    GameAudio.playInvalid();
  }
}, { passive: false });

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
});

startBtn.addEventListener('click', () => {
  if (gameState === 'levelcomplete') advanceLevel();
  else if (gameState === 'tournamentcomplete' || (gameState === 'gameover' && gameMode === 'tournament')) resetToIdle();
  else startGame();
});

modeCampaignBtn.addEventListener('click', () => setGameMode('campaign'));
modeTournamentBtn.addEventListener('click', () => setGameMode('tournament'));
modeFreeplayBtn.addEventListener('click', () => setGameMode('freeplay'));

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
updateHighScoreUI();
renderTournamentLeaderboard();
drawAll();
