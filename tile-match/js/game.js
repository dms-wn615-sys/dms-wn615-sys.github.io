(function () {
  'use strict';

  const SAVE_KEY_GUEST = 'tile-club-save';

  const defaultSave = {
    currentLevel: 1,
    unlockedLevel: 1,
    stars: 0,
    coins: 100,
    levelStars: {},
    boosters: { undo: 3, shuffle: 2, hint: 3, extra: 1 },
    settings: { music: true, sfx: true, vibration: true, language: 'ko' },
  };

  const MAX_SLOTS = 7;
  const TILE_OVERLAP = 0.55;
  const LEVELS_PAGE_SIZE = 20;
  const TIME_LIMIT = 60;

  const BOOSTER_SHOP = {
    undo: { icon: '↩', key: 'undo', price: 50, amount: 1 },
    shuffle: { icon: '🔀', key: 'shuffle', price: 60, amount: 1 },
    hint: { icon: '💡', key: 'hint', price: 40, amount: 1 },
    extra: { icon: '➕', key: 'extra', price: 100, amount: 1 },
  };

  function boosterInfo(type) {
    const item = BOOSTER_SHOP[type];
    return {
      ...item,
      name: I18n.t(`booster.${item.key}.name`),
      desc: I18n.t(`booster.${item.key}.desc`),
    };
  }

  let save = loadSave();
  let state = null;
  let levelBrowser = { chapter: 1, page: 0 };
  let gameTimerInterval = null;
  let returnScreen = 'home';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    home: $('#screen-home'),
    levels: $('#screen-levels'),
    club: $('#screen-club'),
    tournament: $('#screen-tournament'),
    settings: $('#screen-settings'),
    game: $('#screen-game'),
  };

  function getSaveKey() {
    const user = Auth.getUser();
    return user ? `${SAVE_KEY_GUEST}-${user.id}` : SAVE_KEY_GUEST;
  }

  function normalizeSave(data) {
    const merged = { ...defaultSave, ...data };
    if (merged.boosters) merged.boosters = { ...defaultSave.boosters, ...merged.boosters };
    if (merged.settings) merged.settings = { ...defaultSave.settings, ...merged.settings };
    else if (merged.audio) {
      merged.settings = {
        ...defaultSave.settings,
        music: merged.audio.music !== false,
        sfx: merged.audio.sfx !== false,
      };
    }
    return merged;
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem(getSaveKey());
      if (raw) return normalizeSave(JSON.parse(raw));
    } catch (_) {}
    return { ...defaultSave };
  }

  function persistSave() {
    localStorage.setItem(getSaveKey(), JSON.stringify(save));
  }

  function mergeGuestSaveToUser(userId) {
    const userKey = `${SAVE_KEY_GUEST}-${userId}`;
    if (localStorage.getItem(userKey)) return;

    const guestRaw = localStorage.getItem(SAVE_KEY_GUEST);
    if (guestRaw) {
      localStorage.setItem(userKey, guestRaw);
    }
  }

  function applyUserToSocial(user) {
    if (!user?.name) return;
    if (!save.social) save.social = { playerName: '플레이어' };
    save.social.playerName = user.name.slice(0, 12);
    persistSave();
  }

  function reloadGameData() {
    save = loadSave();
    Social.init(save, {
      persistSave,
      showToast,
      startTournament,
    });
    applyUserToSocial(Auth.getUser());
    Settings.apply(save.settings);
    if (save.settings?.language) I18n.setLang(save.settings.language);
    updateHomeUI();
    Auth.renderUI();
  }

  function onGoogleLogin(user) {
    mergeGuestSaveToUser(user.id);
    reloadGameData();
  }

  function onGoogleLogout() {
    reloadGameData();
  }

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    screens[name].classList.add('active');

    $$('.nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.screen === name);
    });

    $('#bottom-nav').style.display = name === 'game' ? 'none' : 'flex';

    if (name === 'club') {
      Social.renderClubScreen();
      Social.startAmbientChat();
    } else {
      Social.stopAmbientChat();
    }

    if (name === 'tournament') {
      Social.renderTournamentScreen();
    }

    if (name === 'settings') {
      Settings.renderUI();
      Auth.renderUI();
    }

    if (name === 'game' || name === 'home') {
      Audio.startBgm();
    }
  }

  function bindAudioUnlock() {
    const unlockOnce = () => {
      Audio.unlock();
      document.removeEventListener('pointerdown', unlockOnce);
      document.removeEventListener('keydown', unlockOnce);
    };
    document.addEventListener('pointerdown', unlockOnce);
    document.addEventListener('keydown', unlockOnce);
  }

  function showToast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => el.classList.add('hidden'), 2200);
  }

  function updateHomeUI() {
    $('#home-level').textContent = save.currentLevel.toLocaleString();
    $('#home-stars').textContent = save.stars.toLocaleString();
    $('#home-coins').textContent = save.coins.toLocaleString();

    const info = getChapterInfo(save.currentLevel);
    $('#home-chapter').textContent = info.levelTitle;
    $('#home-chapter-sub').textContent = I18n.t('chapter.progress', {
      current: info.indexInChapter,
      total: LEVELS_PER_CHAPTER,
      level: save.currentLevel.toLocaleString(),
    });
    const pct = (info.indexInChapter / LEVELS_PER_CHAPTER) * 100;
    $('#home-chapter-fill').style.width = `${pct}%`;
    applyLevelBackground(getChapterSceneBackground(getChapterForLevel(save.currentLevel)), '#home-chapter-preview', { compact: true });
    renderBoosterShop();
  }

  function applyLevelBackground(background, containerSel, options = {}) {
    const el = $(containerSel);
    if (!el || !background) return;

    const scale = options.compact ? 0.14 : 1;
    el.style.background = `${background.overlay}, ${background.gradient}`;

    let html = '';
    if (background.hero) {
      const h = background.hero;
      const size = h.size * scale;
      html += `<span class="bg-hero" style="left:${h.x}%;top:${h.y}%;font-size:${size}rem;opacity:${h.opacity};animation-delay:${h.delay || 0}s">${h.emoji}</span>`;
    }
    background.decorations.forEach((d) => {
      const size = d.size * scale;
      html += `<span class="bg-decor bg-decor-lg" style="left:${d.x}%;top:${d.y}%;font-size:${size}rem;opacity:${d.opacity};animation-delay:${d.delay}s">${d.emoji}</span>`;
    });
    background.stars.forEach((s) => {
      html += `<span class="bg-star" style="left:${s.x}%;top:${s.y}%;width:${s.size}px;height:${s.size}px;opacity:${s.opacity};animation-delay:${s.delay}s"></span>`;
    });
    el.innerHTML = html;
  }

  function getChapterForLevel(levelNum) {
    return Math.ceil(levelNum / LEVELS_PER_CHAPTER);
  }

  function renderLevelGrid() {
    const grid = $('#level-grid');
    grid.innerHTML = '';

    const chapter = levelBrowser.chapter;
    const chapterStart = (chapter - 1) * LEVELS_PER_CHAPTER + 1;
    const chapterEnd = Math.min(chapter * LEVELS_PER_CHAPTER, MAX_LEVELS);
    const pageStart = chapterStart + levelBrowser.page * LEVELS_PAGE_SIZE;
    const pageEnd = Math.min(pageStart + LEVELS_PAGE_SIZE - 1, chapterEnd);

    const info = getChapterInfo(chapterStart);
    applyLevelBackground(getChapterSceneBackground(chapter), '#levels-chapter-bg');
    $('#chapter-title').textContent = I18n.t('levels.chapter', {
      chapter,
      location: info.location,
    });
    $('#chapter-range').textContent = I18n.t('levels.range', {
      start: chapterStart.toLocaleString(),
      end: chapterEnd.toLocaleString(),
    });
    $('#page-info').textContent =
      `${pageStart.toLocaleString()} – ${pageEnd.toLocaleString()}`;

    $('#btn-chapter-prev').disabled = chapter <= 1;
    $('#btn-chapter-next').disabled = chapter >= getTotalChapters();
    $('#btn-page-prev').disabled = pageStart <= chapterStart;
    $('#btn-page-next').disabled = pageEnd >= chapterEnd;

    for (let i = pageStart; i <= pageEnd; i++) {
      const btn = document.createElement('button');
      btn.className = 'level-btn';
      const stars = save.levelStars[i] || 0;
      const starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);

      if (i <= save.unlockedLevel) {
        btn.classList.add('unlocked');
        btn.innerHTML = `${i}<span class="stars">${starStr}</span>`;
        btn.addEventListener('click', () => startLevel(i));
      } else {
        btn.classList.add('locked');
        btn.innerHTML = `${i}<span class="stars">🔒</span>`;
      }

      if (i === save.currentLevel) btn.classList.add('current');
      grid.appendChild(btn);
    }
  }

  function openLevelBrowser(levelNum) {
    levelBrowser.chapter = getChapterForLevel(levelNum || save.currentLevel);
    const indexInChapter = ((levelNum || save.currentLevel) - 1) % LEVELS_PER_CHAPTER;
    levelBrowser.page = Math.floor(indexInChapter / LEVELS_PAGE_SIZE);
    renderLevelGrid();
    showScreen('levels');
  }

  function startLevel(levelNum, options = {}) {
    if (!options.tournament && levelNum > save.unlockedLevel) return;

    save.currentLevel = levelNum;
    persistSave();

    const levelData = options.tournament
      ? Social.getTournamentLevelForToday()
      : getLevelData(levelNum);

    state = createGameState(levelData);
    state.mode = options.tournament ? 'tournament' : 'normal';
    state.startTime = Date.now();
    state.moves = 0;
    returnScreen = options.returnScreen || 'home';

    if (state.mode === 'tournament') {
      $('#game-mode-label').innerHTML = I18n.t('game.tournament');
      $('#game-score-wrap').classList.remove('hidden');
    } else {
      $('#game-mode-label').innerHTML =
        `${I18n.t('game.level')} <span id="game-level">${levelNum.toLocaleString()}</span>`;
      $('#game-score-wrap').classList.add('hidden');
    }

    $('#game-timer-hud').classList.remove('hidden', 'timer-danger', 'timer-critical');
    $('#game-timer').textContent = `${Math.floor(TIME_LIMIT / 60)}:${(TIME_LIMIT % 60).toString().padStart(2, '0')}`;
    startGameTimer();

    $('#game-location').textContent = levelData.chapterTitle || levelData.location;
    $('#game-coins').textContent = save.coins.toLocaleString();
    applyLevelBackground(
      getChapterSceneBackground(getChapterForLevel(levelNum)),
      '#game-bg'
    );
    $('#screen-game').style.background = 'transparent';

    updateBoosterUI();
    renderBoard();
    renderSlots();
    showScreen('game');
  }

  function startTournament() {
    startLevel(save.currentLevel, { tournament: true, returnScreen: 'tournament' });
  }

  function createGameState(levelData) {
    return {
      levelData,
      board: levelData.tiles.map((t) => ({ ...t, removed: false })),
      slots: [],
      maxSlots: MAX_SLOTS,
      history: [],
      locked: false,
      hintTileId: null,
      mode: 'normal',
    };
  }

  function startGameTimer() {
    stopGameTimer();
    updateGameTimer();
    gameTimerInterval = setInterval(updateGameTimer, 1000);
  }

  function updateGameTimer() {
    if (!state || state.locked) return;

    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const remaining = Math.max(0, TIME_LIMIT - elapsed);
    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;
    $('#game-timer').textContent = `${min}:${sec.toString().padStart(2, '0')}`;

    const hud = $('#game-timer-hud');
    hud.classList.toggle('timer-danger', remaining <= 10 && remaining > 0);
    hud.classList.toggle('timer-critical', remaining <= 5 && remaining > 0);

    if (state.mode === 'tournament') {
      $('#game-live-score').textContent = calcLiveScore(elapsed).toLocaleString();
    }

    if (remaining <= 0) {
      stopGameTimer();
      onTimeUp();
    }
  }

  function calcLiveScore(elapsedSec) {
    const base = 10000;
    const movePenalty = state.moves * 8;
    const timePenalty = elapsedSec * 12;
    return Math.max(0, base - movePenalty - timePenalty);
  }

  function stopGameTimer() {
    if (gameTimerInterval) {
      clearInterval(gameTimerInterval);
      gameTimerInterval = null;
    }
  }

  function getActiveTiles() {
    return state.board.filter((t) => !t.removed);
  }

  function isTileBlocked(tile) {
    const active = getActiveTiles();
    return active.some((other) => {
      if (other.id === tile.id || other.layer <= tile.layer) return false;
      return tilesOverlap(tile, other);
    });
  }

  function tilesOverlap(a, b) {
    const size = 1 / 7;
    return Math.abs(a.x - b.x) < size * TILE_OVERLAP &&
           Math.abs(a.y - b.y) < size * TILE_OVERLAP;
  }

  function getFreeTiles() {
    return getActiveTiles().filter((t) => !isTileBlocked(t));
  }

  function renderBoard() {
    const board = $('#game-board');
    board.innerHTML = '';
    const active = getActiveTiles().sort((a, b) => a.layer - b.layer);

    active.forEach((tile) => {
      const el = document.createElement('div');
      const blocked = isTileBlocked(tile);
      el.className = `tile${blocked ? ' blocked' : ' free'}${state.hintTileId === tile.id ? ' hint' : ''}`;
      el.dataset.id = tile.id;
      el.dataset.type = tile.type;
      el.textContent = TILE_TYPES[tile.type].emoji;
      el.style.left = `calc(${tile.x * 100}% - var(--tile-size) / 2)`;
      el.style.top = `calc(${tile.y * 100}% - var(--tile-size) / 2)`;
      el.style.zIndex = tile.layer * 10 + 1;

      if (!blocked && !state.locked) {
        el.addEventListener('click', () => onTileClick(tile.id));
      }

      board.appendChild(el);
    });
  }

  function renderSlots() {
    const slotEls = $$('.slot');
    slotEls.forEach((slot, i) => {
      slot.className = 'slot';
      slot.innerHTML = '';
      if (state.slots[i] !== undefined) {
        slot.classList.add('filled');
        slot.textContent = TILE_TYPES[state.slots[i]].emoji;
        slot.dataset.type = state.slots[i];
      }
    });

    slotEls.forEach((slot, i) => {
      slot.style.display = i < state.maxSlots ? 'flex' : 'none';
    });
  }

  function onTileClick(tileId) {
    if (state.locked) return;

    const tile = state.board.find((t) => t.id === tileId);
    if (!tile || tile.removed || isTileBlocked(tile)) return;

    if (state.slots.length >= state.maxSlots) {
      flashSlotBar();
      Audio.play('danger');
      Settings.vibrate('danger');
      showToast(I18n.t('toast.slotsFull'));
      return;
    }

    state.history.push({
      tileId,
      slots: [...state.slots],
      board: state.board.map((t) => ({ ...t })),
    });

    tile.removed = true;
    state.slots.push(tile.type);
    state.moves++;
    state.hintTileId = null;
    Settings.feedback('tap');

    animateTileToSlot(tileId, () => {
      renderBoard();
      renderSlots();
      processMatches();
    });
  }

  function animateTileToSlot(tileId, callback) {
    const tileEl = document.querySelector(`.tile[data-id="${tileId}"]`);
    if (!tileEl) {
      callback();
      return;
    }

    const slotIndex = state.slots.length - 1;
    const slotEl = document.querySelector(`.slot[data-index="${slotIndex}"]`);
    if (!slotEl) {
      callback();
      return;
    }

    const tileRect = tileEl.getBoundingClientRect();
    const slotRect = slotEl.getBoundingClientRect();

    tileEl.classList.add('moving-to-slot');
    tileEl.style.position = 'fixed';
    tileEl.style.left = tileRect.left + 'px';
    tileEl.style.top = tileRect.top + 'px';
    tileEl.style.width = tileRect.width + 'px';
    tileEl.style.height = tileRect.height + 'px';

    requestAnimationFrame(() => {
      tileEl.style.left = slotRect.left + 'px';
      tileEl.style.top = slotRect.top + 'px';
      tileEl.style.width = slotRect.width + 'px';
      tileEl.style.height = slotRect.height + 'px';
    });

    setTimeout(() => {
      tileEl.remove();
      callback();
    }, 350);
  }

  function processMatches() {
    state.locked = true;
    const counts = {};
    state.slots.forEach((type, idx) => {
      if (!counts[type]) counts[type] = [];
      counts[type].push(idx);
    });

    for (const indices of Object.values(counts)) {
      if (indices.length >= 3) {
        const toRemove = indices.slice(0, 3);
        toRemove.forEach((idx) => {
          const slotEl = document.querySelector(`.slot[data-index="${idx}"]`);
          if (slotEl) slotEl.classList.add('matching');
        });

        setTimeout(() => {
          state.slots = state.slots.filter((_, i) => !toRemove.includes(i));
          Settings.feedback('match');
          renderSlots();
          checkWinOrLose();
          state.locked = false;
        }, 400);
        return;
      }
    }

    state.locked = false;
    checkWinOrLose();
  }

  function checkWinOrLose() {
    if (getActiveTiles().length === 0) {
      onWin();
      return;
    }

    if (state.slots.length >= state.maxSlots) {
      const counts = {};
      state.slots.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
      const hasMatch = Object.values(counts).some((c) => c >= 3);
      if (!hasMatch) onLose();
    }
  }

  function onWin() {
    state.locked = true;
    stopGameTimer();
    Settings.feedback('win');

    const elapsed = (Date.now() - state.startTime) / 1000;
    const moves = state.moves;
    const level = state.levelData.level;

    let stars = 1;
    if (moves <= state.levelData.tiles.length * 0.6) stars = 3;
    else if (moves <= state.levelData.tiles.length * 0.85) stars = 2;

    let rewardText = '';
    let coinReward = 0;

    if (state.mode === 'tournament') {
      const result = Social.recordTournamentScore(moves, elapsed, stars);
      rewardText = result.improved
        ? I18n.t('toast.tournamentReward', {
          coins: result.coinReward.toLocaleString(),
          rank: result.rank,
        }) + ` · ${result.score.toLocaleString()}`
        : I18n.t('toast.tournamentScore', {
          score: result.score.toLocaleString(),
          rank: result.rank,
        });
      showModal({
        win: true,
        stars,
        reward: rewardText,
        level,
        tournament: true,
        rank: result.rank,
      });
      return;
    }

    const prevStars = save.levelStars[level] || 0;
    if (stars > prevStars) {
      save.stars += stars - prevStars;
      save.levelStars[level] = stars;
    }

    coinReward = 10 + stars * 5;
    save.coins += coinReward;

    if (level >= save.unlockedLevel && level < MAX_LEVELS) {
      save.unlockedLevel = level + 1;
    }

    persistSave();
    rewardText = `+${coinReward} 🪙`;

    showModal({ win: true, stars, reward: rewardText, level });
  }

  function onTimeUp() {
    if (state.locked) return;
    state.locked = true;
    stopGameTimer();
    Settings.feedback('lose');
    showModal({
      win: false,
      stars: 0,
      reward: '',
      level: state.levelData.level,
      tournament: state.mode === 'tournament',
      timeUp: true,
    });
  }

  function onLose() {
    state.locked = true;
    stopGameTimer();
    Settings.feedback('lose');
    showModal({
      win: false,
      stars: 0,
      reward: '',
      level: state.levelData.level,
      tournament: state.mode === 'tournament',
    });
  }

  function showModal({ win, stars, reward, level, tournament, timeUp }) {
    const overlay = $('#modal-overlay');
    overlay.classList.remove('hidden');

    if (timeUp) {
      $('#modal-icon').textContent = '⏰';
      $('#modal-title').textContent = I18n.t('modal.timeUp');
      $('#modal-message').textContent = I18n.t('modal.timeUpMsg');
    } else if (tournament) {
      $('#modal-icon').textContent = win ? '🏆' : '😢';
      $('#modal-title').textContent = win ? I18n.t('modal.tournamentWin') : I18n.t('modal.tournamentLose');
      $('#modal-message').textContent = win
        ? I18n.t('modal.tournamentWinMsg')
        : I18n.t('modal.tournamentLoseMsg');
    } else {
      $('#modal-icon').textContent = win ? '🎉' : '😢';
      $('#modal-title').textContent = win ? I18n.t('modal.levelWin') : I18n.t('modal.levelLose');
      $('#modal-message').textContent = win
        ? I18n.t('modal.levelWinMsg')
        : I18n.t('modal.levelLoseMsg');
    }

    $('#modal-stars').textContent = win
      ? '★'.repeat(stars) + '☆'.repeat(3 - stars)
      : '';

    $('#modal-reward').textContent = reward;

    $('#btn-modal-home').textContent = I18n.t('modal.home');
    const nextBtn = $('#btn-modal-next');

    if (tournament) {
      nextBtn.style.display = '';
      nextBtn.textContent = win ? I18n.t('modal.leaderboard') : I18n.t('modal.retry');
      nextBtn.onclick = () => {
        overlay.classList.add('hidden');
        if (win) {
          updateHomeUI();
          showScreen('tournament');
        } else {
          startTournament();
        }
      };
    } else if (win && level < MAX_LEVELS) {
      nextBtn.style.display = '';
      nextBtn.textContent = I18n.t('modal.next');
      nextBtn.onclick = () => {
        overlay.classList.add('hidden');
        startLevel(level + 1);
      };
    } else if (win) {
      nextBtn.style.display = '';
      nextBtn.textContent = I18n.t('modal.replay');
      nextBtn.onclick = () => {
        overlay.classList.add('hidden');
        startLevel(level);
      };
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent = I18n.t('modal.retry');
      nextBtn.onclick = () => {
        overlay.classList.add('hidden');
        startLevel(level);
      };
    }

    $('#btn-modal-home').onclick = () => {
      overlay.classList.add('hidden');
      updateHomeUI();
      showScreen(tournament ? 'tournament' : returnScreen);
    };
  }

  function flashSlotBar() {
    const bar = $('#slot-bar');
    bar.classList.add('danger');
    setTimeout(() => bar.classList.remove('danger'), 400);
  }

  function updateBoosterUI() {
    $('#undo-count').textContent = save.boosters.undo;
    $('#shuffle-count').textContent = save.boosters.shuffle;
    $('#hint-count').textContent = save.boosters.hint;
    $('#extra-count').textContent = save.boosters.extra;

    $('#btn-undo').disabled = save.boosters.undo > 0 && (!state?.history.length || state?.locked);
    $('#btn-shuffle').disabled = save.boosters.shuffle > 0 && state?.locked;
    $('#btn-hint').disabled = save.boosters.hint > 0 && state?.locked;
    $('#btn-extra').disabled = save.boosters.extra > 0 && (state?.maxSlots > MAX_SLOTS || state?.locked);

    ['undo', 'shuffle', 'hint', 'extra'].forEach((key) => {
      const btn = $(`#btn-${key}`);
      if (btn) btn.classList.toggle('booster-empty', save.boosters[key] <= 0);
    });
  }

  function renderBoosterShop(highlightType) {
    const coinsEl = (id) => {
      const el = $(id);
      if (el) el.textContent = save.coins.toLocaleString();
    };
    coinsEl('#shop-coins-home');
    coinsEl('#shop-coins-modal');

    ['home', 'modal'].forEach((context) => {
      const grid = $(`#shop-grid-${context}`);
      if (!grid) return;
      grid.innerHTML = '';

      Object.entries(BOOSTER_SHOP).forEach(([key]) => {
        const item = boosterInfo(key);
        const owned = save.boosters[key];
        const canAfford = save.coins >= item.price;
        const row = document.createElement('div');
        row.className = 'shop-item';
        row.dataset.booster = key;
        if (highlightType === key) row.classList.add('highlight');

        row.innerHTML = `
          <span class="shop-item-icon">${item.icon}</span>
          <div class="shop-item-info">
            <span class="shop-item-name">${item.name}</span>
            <span class="shop-item-desc">${item.desc}</span>
            <span class="shop-item-owned">${I18n.t('shop.owned', { count: owned, amount: item.amount })}</span>
          </div>
          <button type="button" class="btn-shop-buy${canAfford ? '' : ' disabled'}" data-booster="${key}">
            🪙 ${item.price}
          </button>
        `;

        row.querySelector('.btn-shop-buy').addEventListener('click', () => purchaseBooster(key));
        grid.appendChild(row);
      });
    });
  }

  function purchaseBooster(type) {
    const item = boosterInfo(type);
    if (!item) return;

    if (save.coins < item.price) {
      showToast(I18n.t('toast.noCoins'));
      Settings.feedback('lose');
      return;
    }

    save.coins -= item.price;
    save.boosters[type] += item.amount;
    persistSave();
    updateHomeUI();
    updateBoosterUI();
    renderBoosterShop();
    $('#game-coins').textContent = save.coins.toLocaleString();
    Settings.feedback('booster');
    showToast(I18n.t('toast.bought', { name: item.name, amount: item.amount }));
  }

  function openBoosterShop(highlightType) {
    renderBoosterShop(highlightType);
    $('#shop-overlay').classList.remove('hidden');
  }

  function closeBoosterShop() {
    $('#shop-overlay').classList.add('hidden');
  }

  function onBoosterTap(type, useFn) {
    if (save.boosters[type] <= 0) {
      openBoosterShop(type);
      return;
    }
    useFn();
  }

  function useUndo() {
    if (save.boosters.undo <= 0 || !state.history.length || state.locked) return;
    const prev = state.history.pop();
    state.board = prev.board;
    state.slots = prev.slots;
    save.boosters.undo--;
    persistSave();
    renderBoard();
    renderSlots();
    updateBoosterUI();
    Settings.feedback('booster');
    showToast(I18n.t('toast.undo'));
  }

  function useShuffle() {
    if (save.boosters.shuffle <= 0 || state.locked) return;
    const active = getActiveTiles();
    if (active.length < 2) return;
    const types = active.map((t) => t.type);
    shuffleArray(types);
    active.forEach((t, i) => { t.type = types[i]; });
    save.boosters.shuffle--;
    persistSave();
    state.hintTileId = null;
    renderBoard();
    updateBoosterUI();
    Settings.feedback('booster');
    showToast(I18n.t('toast.shuffle'));
  }

  function useHint() {
    if (save.boosters.hint <= 0 || state.locked) return;
    const free = getFreeTiles();
    const slotCounts = {};
    state.slots.forEach((t) => { slotCounts[t] = (slotCounts[t] || 0) + 1; });

    let bestTile = null;
    let bestScore = -1;

    for (const tile of free) {
      const inSlot = slotCounts[tile.type] || 0;
      const score = inSlot >= 2 ? 100 : inSlot >= 1 ? 50 : 10;
      if (score > bestScore) {
        bestScore = score;
        bestTile = tile;
      }
    }

    if (!bestTile && free.length) {
      bestTile = free[Math.floor(Math.random() * free.length)];
    }

    if (bestTile) {
      state.hintTileId = bestTile.id;
      save.boosters.hint--;
      persistSave();
      renderBoard();
      updateBoosterUI();
      Settings.feedback('booster');
      showToast(I18n.t('toast.hint'));
      setTimeout(() => {
        if (state.hintTileId === bestTile.id) {
          state.hintTileId = null;
          renderBoard();
        }
      }, 3000);
    }
  }

  function useExtra() {
    if (save.boosters.extra <= 0 || state.maxSlots > MAX_SLOTS || state.locked) return;
    state.maxSlots = MAX_SLOTS + 1;
    save.boosters.extra--;
    persistSave();
    renderSlots();
    updateBoosterUI();
    Settings.feedback('booster');
    showToast(I18n.t('toast.extraSlot'));
  }

  Social.init(save, {
    persistSave,
    showToast,
    startTournament,
  });
  Social.bindEvents();

  applyUserToSocial(Auth.getUser());

  Settings.init(save, { persistSave });
  Settings.bindEvents();
  bindAudioUnlock();

  Auth.init({
    onLogin: onGoogleLogin,
    onLogout: onGoogleLogout,
    showToast,
  });
  Auth.bindEvents();
  Auth.renderUI();

  document.querySelectorAll('[data-goto="settings"]').forEach((btn) => {
    btn.addEventListener('click', () => showScreen('settings'));
  });

  document.getElementById('app').addEventListener('click', (e) => {
    const t = e.target.closest('button, .nav-item, .shortcut-btn, .club-chip, .quick-chat');
    if (
      t &&
      !t.classList.contains('btn-play') &&
      !t.classList.contains('level-btn') &&
      !t.classList.contains('toggle')
    ) {
      Settings.feedback('click');
    }
  });

  $('#btn-play').addEventListener('click', () => {
    Audio.unlock().then(() => startLevel(save.currentLevel));
  });
  $('#btn-back').addEventListener('click', () => {
    stopGameTimer();
    updateHomeUI();
    showScreen(returnScreen);
  });

  $$('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      if (screen === 'levels') {
        openLevelBrowser(save.currentLevel);
      } else {
        showScreen(screen);
        if (screen === 'home') updateHomeUI();
      }
    });
  });

  $$('.nav-back').forEach((btn) => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });

  $('#shortcut-club').addEventListener('click', () => showScreen('club'));
  $('#shortcut-tournament').addEventListener('click', () => showScreen('tournament'));

  $('#btn-chapter-prev').addEventListener('click', () => {
    if (levelBrowser.chapter > 1) {
      levelBrowser.chapter--;
      levelBrowser.page = 0;
      renderLevelGrid();
    }
  });

  $('#btn-chapter-next').addEventListener('click', () => {
    if (levelBrowser.chapter < getTotalChapters()) {
      levelBrowser.chapter++;
      levelBrowser.page = 0;
      renderLevelGrid();
    }
  });

  $('#btn-page-prev').addEventListener('click', () => {
    if (levelBrowser.page > 0) {
      levelBrowser.page--;
      renderLevelGrid();
    }
  });

  $('#btn-page-next').addEventListener('click', () => {
    levelBrowser.page++;
    renderLevelGrid();
  });

  $('#btn-level-jump').addEventListener('click', () => {
    const val = parseInt($('#level-jump-input').value, 10);
    if (val >= 1 && val <= MAX_LEVELS) {
      if (val <= save.unlockedLevel) {
        startLevel(val);
      } else {
        openLevelBrowser(val);
        showToast(I18n.t('toast.levelLocked', { level: val }));
      }
    }
  });

  $('#btn-undo').addEventListener('click', () => onBoosterTap('undo', useUndo));
  $('#btn-shuffle').addEventListener('click', () => onBoosterTap('shuffle', useShuffle));
  $('#btn-hint').addEventListener('click', () => onBoosterTap('hint', useHint));
  $('#btn-extra').addEventListener('click', () => onBoosterTap('extra', useExtra));
  $('#btn-game-shop').addEventListener('click', () => openBoosterShop());
  $('#btn-shop-close').addEventListener('click', closeBoosterShop);
  $('#shop-overlay').addEventListener('click', (e) => {
    if (e.target === $('#shop-overlay')) closeBoosterShop();
  });

  setInterval(() => {
    if ($('#screen-tournament').classList.contains('active')) {
      Social.renderTournamentScreen();
    }
  }, 1000);

  updateHomeUI();
  I18n.init(save, persistSave);
  I18n.onChange(() => {
    updateHomeUI();
    renderBoosterShop();
    Settings.renderUI();
    Auth.renderUI();
    if ($('#screen-club').classList.contains('active')) Social.renderClubScreen();
    if ($('#screen-tournament').classList.contains('active')) Social.renderTournamentScreen();
    if ($('#screen-levels').classList.contains('active')) renderLevelGrid();
    if (typeof Mobile !== 'undefined') Mobile.refreshInstallBanner();
  });
  showScreen('home');
})();
