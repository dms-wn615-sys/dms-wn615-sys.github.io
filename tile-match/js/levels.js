const MAX_LEVELS = 20000;
const LEVELS_PER_CHAPTER = 20;

const TILE_TYPES = [
  { emoji: '🍎', name: '사과' },
  { emoji: '🍰', name: '케이크' },
  { emoji: '🐱', name: '고양이' },
  { emoji: '🌸', name: '벚꽃' },
  { emoji: '🍋', name: '레몬' },
  { emoji: '🐶', name: '강아지' },
  { emoji: '🍩', name: '도넛' },
  { emoji: '🦋', name: '나비' },
  { emoji: '🍇', name: '포도' },
  { emoji: '🐰', name: '토끼' },
];

const LOCATIONS = [
  {
    name: '🌸 벚꽃 정원',
    bg: '#2a1a4e',
    decor: ['🌸', '🌺', '🍃', '🦋'],
    scene: {
      gradient: 'linear-gradient(180deg, #ffd6ec 0%, #fff0f7 28%, #eaffea 28%, #b8e8b8 100%)',
      overlay: 'radial-gradient(ellipse at 50% 18%, rgba(255,182,193,0.55) 0%, transparent 52%), radial-gradient(ellipse at 15% 75%, rgba(255,192,203,0.35) 0%, transparent 45%)',
      hero: { emoji: '🌸', x: 50, y: 38, size: 20, opacity: 0.2 },
      bigDecors: [
        { emoji: '🦋', x: 10, y: 22, size: 8, opacity: 0.38, delay: 0 },
        { emoji: '🌺', x: 84, y: 28, size: 7.5, opacity: 0.35, delay: 1.2 },
        { emoji: '🌸', x: 6, y: 68, size: 6.5, opacity: 0.3, delay: 2.4 },
        { emoji: '🍃', x: 90, y: 72, size: 7, opacity: 0.32, delay: 0.8 },
      ],
    },
  },
  {
    name: '🏖️ 해변 리조트',
    bg: '#1a3a4e',
    decor: ['🌊', '🐚', '☀️', '🏖️'],
    scene: {
      gradient: 'linear-gradient(180deg, #87ceeb 0%, #b8e4ff 32%, #ffe8a8 32%, #ffd88a 52%, #4ecdc4 52%, #2ba8a0 100%)',
      overlay: 'radial-gradient(circle at 82% 12%, rgba(255,230,120,0.65) 0%, transparent 28%), radial-gradient(ellipse at 50% 90%, rgba(46,168,160,0.35) 0%, transparent 55%)',
      hero: { emoji: '🏖️', x: 50, y: 44, size: 18, opacity: 0.22 },
      bigDecors: [
        { emoji: '☀️', x: 80, y: 10, size: 8.5, opacity: 0.42, delay: 0 },
        { emoji: '🌊', x: 8, y: 58, size: 9, opacity: 0.36, delay: 1.5 },
        { emoji: '🐚', x: 88, y: 62, size: 6, opacity: 0.34, delay: 2.2 },
        { emoji: '🌊', x: 42, y: 78, size: 7.5, opacity: 0.3, delay: 3 },
      ],
    },
  },
  {
    name: '🏔️ 설원 마을',
    bg: '#1a2a4e',
    decor: ['❄️', '🏔️', '⛄', '🌨️'],
    scene: {
      gradient: 'linear-gradient(180deg, #dceeff 0%, #eef6ff 35%, #f5f9ff 35%, #c8ddf0 70%, #a8c4e8 100%)',
      overlay: 'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.7) 0%, transparent 40%), radial-gradient(ellipse at 70% 15%, rgba(200,220,255,0.45) 0%, transparent 38%)',
      hero: { emoji: '🏔️', x: 50, y: 36, size: 19, opacity: 0.2 },
      bigDecors: [
        { emoji: '❄️', x: 12, y: 18, size: 7, opacity: 0.38, delay: 0 },
        { emoji: '⛄', x: 78, y: 55, size: 8, opacity: 0.35, delay: 1.8 },
        { emoji: '🌨️', x: 85, y: 20, size: 6.5, opacity: 0.32, delay: 2.5 },
        { emoji: '❄️', x: 8, y: 72, size: 6, opacity: 0.3, delay: 1 },
      ],
    },
  },
  {
    name: '🌴 열대 정글',
    bg: '#1a4e2a',
    decor: ['🌴', '🦜', '🐒', '🌿'],
    scene: {
      gradient: 'linear-gradient(180deg, #87e8a8 0%, #b8f0c8 30%, #5cb868 30%, #2d8a48 65%, #1a6030 100%)',
      overlay: 'radial-gradient(ellipse at 50% 10%, rgba(255,255,200,0.4) 0%, transparent 35%), radial-gradient(ellipse at 20% 80%, rgba(0,80,40,0.25) 0%, transparent 50%)',
      hero: { emoji: '🌴', x: 50, y: 40, size: 20, opacity: 0.18 },
      bigDecors: [
        { emoji: '🦜', x: 14, y: 24, size: 7.5, opacity: 0.38, delay: 0.5 },
        { emoji: '🐒', x: 82, y: 35, size: 7, opacity: 0.35, delay: 1.5 },
        { emoji: '🌿', x: 6, y: 65, size: 8, opacity: 0.32, delay: 2.8 },
        { emoji: '🌴', x: 88, y: 70, size: 7.5, opacity: 0.3, delay: 0.2 },
      ],
    },
  },
  {
    name: '🏰 동화 성',
    bg: '#4e1a3a',
    decor: ['🏰', '👑', '✨', '🦄'],
    scene: {
      gradient: 'linear-gradient(180deg, #e8d0ff 0%, #f5e8ff 35%, #ffd6f0 35%, #e8b8f0 70%, #c898e0 100%)',
      overlay: 'radial-gradient(ellipse at 50% 20%, rgba(255,220,255,0.55) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(200,150,255,0.3) 0%, transparent 40%)',
      hero: { emoji: '🏰', x: 50, y: 38, size: 19, opacity: 0.22 },
      bigDecors: [
        { emoji: '🦄', x: 10, y: 28, size: 8, opacity: 0.36, delay: 0 },
        { emoji: '👑', x: 86, y: 22, size: 7, opacity: 0.38, delay: 1.2 },
        { emoji: '✨', x: 8, y: 70, size: 6.5, opacity: 0.35, delay: 2.5 },
        { emoji: '✨', x: 88, y: 68, size: 6, opacity: 0.32, delay: 1.8 },
      ],
    },
  },
  {
    name: '🌃 야경 도시',
    bg: '#1a1a4e',
    decor: ['🌃', '🌉', '✨', '🚕'],
    scene: {
      gradient: 'linear-gradient(180deg, #1a1a4e 0%, #2a2a6e 40%, #3a3a8e 40%, #4a4ab0 70%, #2a2a5e 100%)',
      overlay: 'radial-gradient(ellipse at 50% 15%, rgba(100,120,255,0.35) 0%, transparent 45%), radial-gradient(ellipse at 50% 85%, rgba(255,200,100,0.2) 0%, transparent 50%)',
      hero: { emoji: '🌃', x: 50, y: 40, size: 18, opacity: 0.25 },
      bigDecors: [
        { emoji: '🌉', x: 12, y: 55, size: 8.5, opacity: 0.35, delay: 0 },
        { emoji: '🚕', x: 82, y: 60, size: 7, opacity: 0.38, delay: 1.5 },
        { emoji: '✨', x: 20, y: 18, size: 6, opacity: 0.4, delay: 2.2 },
        { emoji: '✨', x: 75, y: 15, size: 5.5, opacity: 0.38, delay: 3 },
      ],
    },
  },
  {
    name: '🍭 사탕 왕국',
    bg: '#4e2a1a',
    decor: ['🍭', '🍬', '🧁', '🎀'],
    scene: {
      gradient: 'linear-gradient(135deg, #ffd6f0 0%, #ffe8b8 25%, #d6f0ff 50%, #ffd6e8 75%, #e8d6ff 100%)',
      overlay: 'radial-gradient(circle at 25% 25%, rgba(255,150,200,0.4) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(150,200,255,0.35) 0%, transparent 42%)',
      hero: { emoji: '🍭', x: 50, y: 42, size: 19, opacity: 0.22 },
      bigDecors: [
        { emoji: '🧁', x: 10, y: 25, size: 8, opacity: 0.36, delay: 0 },
        { emoji: '🍬', x: 85, y: 28, size: 7.5, opacity: 0.35, delay: 1.3 },
        { emoji: '🎀', x: 8, y: 68, size: 7, opacity: 0.34, delay: 2.6 },
        { emoji: '🍬', x: 88, y: 72, size: 6.5, opacity: 0.32, delay: 0.8 },
      ],
    },
  },
  {
    name: '🌙 달빛 호수',
    bg: '#2a1a4e',
    decor: ['🌙', '⭐', '🦉', '💫'],
    scene: {
      gradient: 'linear-gradient(180deg, #1a1040 0%, #2a2060 35%, #3a3080 35%, #4a4090 65%, #1a2050 100%)',
      overlay: 'radial-gradient(circle at 75% 18%, rgba(255,255,220,0.45) 0%, transparent 25%), radial-gradient(ellipse at 50% 80%, rgba(100,150,255,0.25) 0%, transparent 55%)',
      hero: { emoji: '🌙', x: 72, y: 18, size: 14, opacity: 0.35 },
      bigDecors: [
        { emoji: '⭐', x: 15, y: 15, size: 6, opacity: 0.4, delay: 0 },
        { emoji: '💫', x: 85, y: 35, size: 7, opacity: 0.35, delay: 1.5 },
        { emoji: '🦉', x: 10, y: 60, size: 7.5, opacity: 0.32, delay: 2.8 },
        { emoji: '⭐', x: 88, y: 75, size: 5.5, opacity: 0.38, delay: 1 },
      ],
    },
  },
  {
    name: '🌋 용암 협곡',
    bg: '#4e1a1a',
    decor: ['🌋', '🔥', '💎', '🪨'],
    scene: {
      gradient: 'linear-gradient(180deg, #4a2020 0%, #6a3030 30%, #8a4040 30%, #c85030 55%, #ff6030 55%, #ff9040 100%)',
      overlay: 'radial-gradient(ellipse at 50% 70%, rgba(255,120,40,0.45) 0%, transparent 50%), radial-gradient(circle at 30% 20%, rgba(255,80,40,0.25) 0%, transparent 35%)',
      hero: { emoji: '🌋', x: 50, y: 42, size: 19, opacity: 0.22 },
      bigDecors: [
        { emoji: '🔥', x: 12, y: 55, size: 8.5, opacity: 0.38, delay: 0.5 },
        { emoji: '💎', x: 84, y: 30, size: 7, opacity: 0.36, delay: 1.8 },
        { emoji: '🔥', x: 85, y: 68, size: 7.5, opacity: 0.34, delay: 2.2 },
        { emoji: '🪨', x: 8, y: 25, size: 6.5, opacity: 0.32, delay: 1 },
      ],
    },
  },
  {
    name: '🎪 서커스 마을',
    bg: '#4e3a1a',
    decor: ['🎪', '🎠', '🤡', '🎈'],
    scene: {
      gradient: 'linear-gradient(180deg, #ff6060 0%, #ff8080 15%, #ffe040 15%, #fff080 35%, #60c060 35%, #40a040 100%)',
      overlay: 'radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.35) 0%, transparent 45%)',
      hero: { emoji: '🎪', x: 50, y: 38, size: 20, opacity: 0.2 },
      bigDecors: [
        { emoji: '🎠', x: 10, y: 55, size: 8, opacity: 0.36, delay: 0 },
        { emoji: '🎈', x: 85, y: 22, size: 7.5, opacity: 0.38, delay: 1.2 },
        { emoji: '🤡', x: 82, y: 65, size: 7, opacity: 0.34, delay: 2.5 },
        { emoji: '🎈', x: 8, y: 28, size: 6.5, opacity: 0.35, delay: 0.8 },
      ],
    },
  },
  {
    name: '🏜️ 사막 오아시스',
    bg: '#4e4e1a',
    decor: ['🏜️', '🌵', '🐪', '☀️'],
    scene: {
      gradient: 'linear-gradient(180deg, #ffe8a0 0%, #ffd870 35%, #e8c050 35%, #c8a040 65%, #40b0d0 65%, #2080a8 100%)',
      overlay: 'radial-gradient(circle at 85% 12%, rgba(255,240,150,0.6) 0%, transparent 28%), radial-gradient(ellipse at 50% 85%, rgba(32,128,168,0.35) 0%, transparent 45%)',
      hero: { emoji: '🏜️', x: 50, y: 40, size: 18, opacity: 0.2 },
      bigDecors: [
        { emoji: '🐪', x: 12, y: 50, size: 8.5, opacity: 0.35, delay: 0 },
        { emoji: '🌵', x: 85, y: 45, size: 8, opacity: 0.36, delay: 1.5 },
        { emoji: '☀️', x: 82, y: 10, size: 7.5, opacity: 0.4, delay: 0.5 },
        { emoji: '🌵', x: 8, y: 72, size: 6.5, opacity: 0.32, delay: 2.8 },
      ],
    },
  },
  {
    name: '🚂 증기 기관차',
    bg: '#3a2a1a',
    decor: ['🚂', '🛤️', '💨', '⚙️'],
    scene: {
      gradient: 'linear-gradient(180deg, #c8b898 0%, #a89878 30%, #887858 30%, #685838 60%, #486028 60%, #385018 100%)',
      overlay: 'radial-gradient(ellipse at 50% 30%, rgba(255,240,200,0.35) 0%, transparent 45%), radial-gradient(ellipse at 20% 70%, rgba(100,80,60,0.25) 0%, transparent 40%)',
      hero: { emoji: '🚂', x: 50, y: 44, size: 19, opacity: 0.22 },
      bigDecors: [
        { emoji: '💨', x: 8, y: 35, size: 8, opacity: 0.35, delay: 0 },
        { emoji: '🛤️', x: 50, y: 78, size: 9, opacity: 0.28, delay: 1.5 },
        { emoji: '⚙️', x: 85, y: 28, size: 7, opacity: 0.34, delay: 2.2 },
        { emoji: '💨', x: 88, y: 65, size: 6.5, opacity: 0.32, delay: 0.8 },
      ],
    },
  },
];

function hslColor(h, s, l, a) {
  if (a !== undefined) return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/** 레벨마다 고유 배경 생성 (시드 기반) */
function getLevelBackground(levelNum) {
  const rng = createRng(levelNum * 7919 + 13);
  const chapter = Math.ceil(levelNum / LEVELS_PER_CHAPTER);
  const loc = LOCATIONS[(chapter - 1) % LOCATIONS.length];
  const base = hexToHsl(loc.bg);

  const levelInChapter = ((levelNum - 1) % LEVELS_PER_CHAPTER);
  const hueShift = levelInChapter * 1.35 + (levelNum % 7) * 0.5;
  const h1 = (base.h + hueShift) % 360;
  const h2 = (h1 + 28 + rng() * 42) % 360;
  const h3 = (h1 + 155 + rng() * 45) % 360;

  const sat = Math.min(58, 32 + (levelNum % 22));
  const lTop = 86 + (levelNum % 10);
  const lMid = 76 + (levelNum % 12);
  const lBot = 80 + (levelNum % 14);
  const angle = Math.floor(130 + rng() * 100);

  const top = hslColor(h1, sat, lTop);
  const mid = hslColor(h2, Math.max(20, sat - 10), lMid);
  const bottom = hslColor(h3, Math.max(18, sat - 6), lBot);

  const glowX = 15 + rng() * 70;
  const glowY = 8 + rng() * 45;
  const glowX2 = 10 + rng() * 80;
  const glowY2 = 50 + rng() * 45;
  const glowHue1 = (h1 + 50 + rng() * 40) % 360;
  const glowHue2 = (h3 + 30 + rng() * 50) % 360;

  const gradient = `linear-gradient(${angle}deg, ${top} 0%, ${mid} 45%, ${bottom} 100%)`;
  const overlay = [
    `radial-gradient(ellipse at ${glowX}% ${glowY}%, ${hslColor(glowHue1, 55, 78, 0.5)} 0%, transparent 58%)`,
    `radial-gradient(ellipse at ${glowX2}% ${glowY2}%, ${hslColor(glowHue2, 50, 85, 0.4)} 0%, transparent 52%)`,
    `radial-gradient(circle at 50% 100%, ${hslColor(h3, 35, 92, 0.55)} 0%, transparent 70%)`,
  ].join(', ');

  const decorEmojis = loc.decor;
  const decorations = [];
  const decorCount = 4 + (levelNum % 4);

  for (let i = 0; i < decorCount; i++) {
    decorations.push({
      emoji: decorEmojis[Math.floor(rng() * decorEmojis.length)],
      x: 5 + rng() * 88,
      y: 5 + rng() * 75,
      size: 1.2 + rng() * 1.8,
      opacity: 0.15 + rng() * 0.2,
      delay: rng() * 5,
    });
  }

  const stars = [];
  if (levelNum % 3 !== 0 || loc.decor.includes('⭐')) {
    const starCount = 8 + (levelNum % 12);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: rng() * 100,
        y: rng() * 65,
        size: 1 + rng() * 2.5,
        opacity: 0.2 + rng() * 0.35,
        delay: rng() * 4,
      });
    }
  }

  return {
    gradient,
    overlay,
    decorations,
    stars,
    bg: top,
    accent: hslColor(glowHue1, 70, 60),
  };
}

/** 여행지 장면 — 큰 그림 배경 (레벨 선택·홈 미리보기용) */
function getChapterSceneBackground(chapter) {
  const loc = LOCATIONS[(chapter - 1) % LOCATIONS.length];
  const scene = loc.scene;
  if (!scene) {
    const levelNum = (chapter - 1) * LEVELS_PER_CHAPTER + 1;
    return getLevelBackground(levelNum);
  }

  return {
    gradient: scene.gradient,
    overlay: scene.overlay,
    hero: scene.hero,
    decorations: scene.bigDecors || [],
    stars: scene.stars || [],
    bg: scene.bg || loc.bg,
    accent: scene.accent,
  };
}

function createRng(seed) {
  let s = seed >>> 0;
  return function next() {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function seededShuffle(arr, rng) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getChapterInfo(levelNum) {
  const chapter = Math.ceil(levelNum / LEVELS_PER_CHAPTER);
  const indexInChapter = ((levelNum - 1) % LEVELS_PER_CHAPTER) + 1;
  const locIndex = (chapter - 1) % LOCATIONS.length;
  const locName = typeof I18n !== 'undefined'
    ? I18n.getLocationName(locIndex)
    : LOCATIONS[locIndex].name;
  const background = getLevelBackground(levelNum);
  const levelStr = levelNum.toLocaleString();
  const chapterLabel = typeof I18n !== 'undefined'
    ? I18n.t('levels.chapter', { chapter, location: locName })
    : `${chapter}장 · ${locName}`;
  const levelTitle = typeof I18n !== 'undefined'
    ? I18n.t('chapter.levelTitle', { level: levelStr, location: locName })
    : `레벨 ${levelStr} · ${locName}`;
  return {
    chapter,
    indexInChapter,
    location: locName,
    bg: background.bg,
    background,
    title: chapterLabel,
    levelTitle,
  };
}

function generateLevel(levelNum) {
  const rng = createRng(levelNum * 9973 + 42);
  const chapterInfo = getChapterInfo(levelNum);
  const progress = levelNum / MAX_LEVELS;

  const typeCount = Math.min(3 + Math.floor(progress * 70), TILE_TYPES.length);
  const layerCount = Math.min(2 + Math.floor(progress * 80), 9);
  const tilesPerLayer = Math.min(6 + Math.floor(progress * 120), 21);

  const totalTiles = layerCount * tilesPerLayer;
  const triplets = Math.floor(totalTiles / 3);
  const adjustedTotal = triplets * 3;

  const types = [];
  for (let i = 0; i < triplets; i++) {
    const type = i % typeCount;
    types.push(type, type, type);
  }

  seededShuffle(types, rng);

  const tiles = [];
  let typeIndex = 0;

  for (let layer = 0; layer < layerCount; layer++) {
    const count = layer === layerCount - 1
      ? adjustedTotal - typeIndex
      : Math.min(tilesPerLayer, adjustedTotal - typeIndex);

    const positions = getLayerPositions(count, layer, layerCount, rng);
    for (const pos of positions) {
      if (typeIndex >= types.length) break;
      tiles.push({
        id: `t-${levelNum}-${typeIndex}`,
        type: types[typeIndex],
        x: pos.x,
        y: pos.y,
        layer,
      });
      typeIndex++;
    }
  }

  return {
    level: levelNum,
    chapter: chapterInfo.chapter,
    location: chapterInfo.location,
    chapterTitle: chapterInfo.levelTitle,
    bg: chapterInfo.bg,
    background: chapterInfo.background,
    tiles,
    typeCount,
  };
}

function getLayerPositions(count, layer, totalLayers, rng) {
  const positions = [];
  const gridSize = Math.ceil(Math.sqrt(count * 1.5));
  const offset = layer * 0.07;
  const spread = Math.max(0.45, 0.75 - layer * 0.04);

  const candidates = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = offset + (col / (gridSize - 1 || 1)) * spread + (rng() - 0.5) * 0.05;
      const y = offset + (row / (gridSize - 1 || 1)) * spread + (rng() - 0.5) * 0.05;
      if (x >= 0.02 && x <= 0.98 && y >= 0.02 && y <= 0.98) {
        candidates.push({ x, y });
      }
    }
  }

  return seededShuffle(candidates, rng).slice(0, count);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const TUTORIAL_LEVEL = (() => {
  const bg = getLevelBackground(1);
  return {
    level: 1,
    chapter: 1,
    location: '🌸 벚꽃 정원',
    chapterTitle: '레벨 1 · 🌸 벚꽃 정원',
    bg: bg.bg,
    background: bg,
    typeCount: 3,
    tiles: [
    { id: 't1-0', type: 0, x: 0.15, y: 0.2, layer: 0 },
    { id: 't1-1', type: 1, x: 0.42, y: 0.2, layer: 0 },
    { id: 't1-2', type: 2, x: 0.69, y: 0.2, layer: 0 },
    { id: 't1-3', type: 0, x: 0.28, y: 0.45, layer: 0 },
    { id: 't1-4', type: 1, x: 0.55, y: 0.45, layer: 0 },
    { id: 't1-5', type: 2, x: 0.15, y: 0.7, layer: 0 },
    { id: 't1-6', type: 0, x: 0.42, y: 0.7, layer: 0 },
    { id: 't1-7', type: 1, x: 0.69, y: 0.7, layer: 0 },
    { id: 't1-8', type: 2, x: 0.28, y: 0.55, layer: 1 },
    { id: 't1-9', type: 0, x: 0.55, y: 0.55, layer: 1 },
    { id: 't1-10', type: 1, x: 0.42, y: 0.35, layer: 1 },
    { id: 't1-11', type: 2, x: 0.42, y: 0.6, layer: 1 },
  ],
  };
})();

function getLevelData(levelNum) {
  const num = Math.max(1, Math.min(levelNum, MAX_LEVELS));
  if (num === 1) return structuredClone(TUTORIAL_LEVEL);
  return generateLevel(num);
}

function getTotalChapters() {
  return Math.ceil(MAX_LEVELS / LEVELS_PER_CHAPTER);
}

function getTournamentLevel(daySeed) {
  const level = (daySeed % 5000) + 500;
  return generateLevel(level);
}
