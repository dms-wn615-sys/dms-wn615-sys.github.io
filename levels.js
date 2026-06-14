const LevelSystem = (() => {
  const GRID = 8;
  const MAX_LEVEL = 10000;
  const PROGRESS_KEY = 'blockgame-unlocked-level';

  function createRng(seed) {
    let s = (seed >>> 0) || 1;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickPiece(rng, piecePool) {
    const src = piecePool[Math.floor(rng() * piecePool.length)];
    return {
      shape: src.shape.map(row => [...row]),
      color: src.color,
    };
  }

  function hasFullLine(board) {
    for (let r = 0; r < GRID; r++) {
      if (board[r].every(cell => cell !== null)) return true;
    }
    for (let c = 0; c < GRID; c++) {
      if (board.every(row => row[c] !== null)) return true;
    }
    return false;
  }

  function cloneBoard(board) {
    return board.map(row => [...row]);
  }

  function generateInitialBoard(rng, piecePool, obstacleCount) {
    const board = Array.from({ length: GRID }, () => Array(GRID).fill(null));
    let placed = 0;
    let attempts = 0;
    while (placed < obstacleCount && attempts < 800) {
      attempts += 1;
      const r = Math.floor(rng() * GRID);
      const c = Math.floor(rng() * GRID);
      if (board[r][c]) continue;
      board[r][c] = piecePool[Math.floor(rng() * piecePool.length)].color;
      if (hasFullLine(board)) {
        board[r][c] = null;
        continue;
      }
      placed += 1;
    }
    return board;
  }

  function getTargetClears(levelNum) {
    const base = 1 + Math.floor(Math.sqrt(levelNum) * 0.11);
    const milestone = levelNum % 25 === 0 ? 1 : 0;
    const boss = levelNum % 100 === 0 ? 1 : 0;
    return Math.min(base + milestone + boss, 18);
  }

  function getObstacleCount(levelNum) {
    const base = Math.floor(levelNum / 35);
    const wave = Math.floor(Math.sin(levelNum * 0.17) * 3 + 3);
    return Math.min(base + wave, 26);
  }

  function generateLevel(levelNum, piecePool) {
    const level = Math.max(1, Math.min(MAX_LEVEL, Math.floor(levelNum) || 1));
    const rng = createRng(level * 2654435761);
    const targetClears = getTargetClears(level);
    const obstacleCount = getObstacleCount(level);
    const board = generateInitialBoard(rng, piecePool, obstacleCount);
    const trayPieces = [
      pickPiece(rng, piecePool),
      pickPiece(rng, piecePool),
      pickPiece(rng, piecePool),
    ];

    return {
      level,
      targetClears,
      board: cloneBoard(board),
      trayPieces,
      seed: level,
    };
  }

  function loadProgress() {
    try {
      const n = parseInt(localStorage.getItem(PROGRESS_KEY), 10);
      if (Number.isFinite(n) && n >= 1) return Math.min(n, MAX_LEVEL);
    } catch {
      /* ignore */
    }
    return 1;
  }

  function saveProgress(unlockedLevel) {
    const next = Math.max(1, Math.min(MAX_LEVEL, Math.floor(unlockedLevel) || 1));
    const prev = loadProgress();
    if (next > prev) {
      localStorage.setItem(PROGRESS_KEY, String(next));
    }
  }

  return {
    MAX_LEVEL,
    GRID,
    createRng,
    generateLevel,
    loadProgress,
    saveProgress,
    pickPiece,
  };
})();
