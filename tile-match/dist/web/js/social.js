const Social = (function () {
  'use strict';

  const CLUBS = [
    { id: 'star', name: '⭐ 별빛 클럽', emoji: '⭐', members: 12847 },
    { id: 'tile', name: '🀄 타일 마스터', emoji: '🀄', members: 9521 },
    { id: 'puzzle', name: '🧩 퍼즐 러버', emoji: '🧩', members: 11302 },
    { id: 'sweet', name: '🍰 달콤한 조', emoji: '🍰', members: 8764 },
    { id: 'world', name: '🌍 세계 여행', emoji: '🌍', members: 15420 },
  ];

  const BOT_MEMBERS = [
    { name: '민지', avatar: '🌸' },
    { name: '준호', avatar: '🎮' },
    { name: '수연', avatar: '✨' },
    { name: '태양', avatar: '☀️' },
    { name: '하늘', avatar: '🦋' },
    { name: '지우', avatar: '🍀' },
    { name: '서현', avatar: '💎' },
    { name: '유진', avatar: '🎪' },
  ];

  const BOT_NAMES = [
    '타일킹', '퍼즐여왕', '매치고수', '클리어마스터', '별빛플레이어',
    '달콤타일', '번개손', '행운의손', '두뇌풀가동', '챔피언99',
    '레벨헌터', '코인부자', '트리플마스터', '힌트없이', '속도왕',
  ];

  const CHAT_REPLIES = [
    '화이팅! 같이 힘내요 💪',
    '저도 그 레벨에서 막혔어요 ㅠㅠ',
    '위에서 가리는 타일부터 없애보세요!',
    '슬롯 2개만 남기고 매치하는 게 팁이에요',
    '부스터 아껴두세요, 뒤가 더 어려워요',
    '같은 타일 3개 모으면 자동으로 사라져요!',
    '오늘 토너먼트 점수 올려봐요 🏆',
    '클럽 레벨 올리면 보상 더 줘요!',
  ];

  const HELP_REPLIES = [
    '가장 위 레이어 타일부터 선택해보세요!',
    '슬롯에 같은 타일 2개 있으면 그 타일을 우선 찾으세요',
    '막히면 섞기 부스터를 써보세요 🔀',
    '7칸 다 차기 전에 매치를 만들어야 해요',
  ];

  let save = null;
  let callbacks = {};
  let chatTimer = null;

  function init(gameSave, cbs) {
    save = gameSave;
    callbacks = cbs;

    if (!save.social) {
      save.social = {
        playerName: '플레이어',
        clubId: null,
        chatMessages: [],
        tournamentDay: null,
        tournamentScore: 0,
        tournamentPlayed: false,
        tournamentRank: 0,
        leaderboard: [],
      };
    }

    ensureTournamentDay();
    if (!save.social.clubId) {
      save.social.clubId = CLUBS[0].id;
      addSystemMessage(I18n.t('club.welcome', { name: getClub().name }));
    }

    if (save.social.chatMessages.length === 0) {
      seedInitialChat();
    }
  }

  function getClub() {
    const c = CLUBS.find((club) => club.id === save.social.clubId) || CLUBS[0];
    return {
      ...c,
      name: typeof I18n !== 'undefined' ? I18n.getClubName(c.id) : c.name,
    };
  }

  function getDayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function ensureTournamentDay() {
    const today = getDayKey();
    if (save.social.tournamentDay !== today) {
      save.social.tournamentDay = today;
      save.social.tournamentScore = 0;
      save.social.tournamentPlayed = false;
      save.social.tournamentRank = 0;
      save.social.leaderboard = generateLeaderboard(today);
    }
  }

  function generateLeaderboard(dayKey) {
    const rng = createRng(dayKey.split('').reduce((a, c) => a + c.charCodeAt(0), 0));
    const board = BOT_NAMES.map((name, i) => ({
      name,
      avatar: ['🏅', '🥈', '🥉', '🎖️', '⭐'][i % 5],
      score: Math.floor(8000 + rng() * 12000 - i * 120),
      isPlayer: false,
    }));

    board.sort((a, b) => b.score - a.score);
    return board;
  }

  function createRng(seed) {
    let s = seed >>> 0;
    return function next() {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function seedInitialChat() {
    addBotMessage('민지', '🌸', '안녕하세요! 타일 매치에 오신 걸 환영해요~');
    addBotMessage('준호', '🎮', '어려운 레벨 있으면 여기서 같이 풀어요!');
    addBotMessage('수연', '✨', `현재 ${getClub().members.toLocaleString()}명이 활동 중이에요`);
  }

  function addSystemMessage(text) {
    save.social.chatMessages.push({
      type: 'system',
      text,
      time: Date.now(),
    });
    trimChat();
  }

  function addBotMessage(name, avatar, text) {
    save.social.chatMessages.push({
      type: 'bot',
      name,
      avatar,
      text,
      time: Date.now(),
    });
    trimChat();
  }

  function addPlayerMessage(text) {
    save.social.chatMessages.push({
      type: 'player',
      name: save.social.playerName,
      avatar: '😊',
      text,
      time: Date.now(),
    });
    trimChat();
  }

  function trimChat() {
    if (save.social.chatMessages.length > 80) {
      save.social.chatMessages = save.social.chatMessages.slice(-80);
    }
  }

  function sendChat(text) {
    if (!text.trim()) return;
    addPlayerMessage(text.trim());
    callbacks.persistSave();
    if (typeof Settings !== 'undefined') Settings.feedback('chat');
    else if (typeof Audio !== 'undefined') Audio.play('chat');
    renderChat();

    const bot = BOT_MEMBERS[Math.floor(Math.random() * BOT_MEMBERS.length)];
    const helpKeys = ['도움', 'help', 'hint', '힌트', 'ヒント', 'ヘルプ', 'ayuda', 'aide', 'hilfe', '帮助', '提示', 'pista', 'indice', 'tipp'];
    const lower = text.toLowerCase();
    const isHelp = helpKeys.some((k) => lower.includes(k.toLowerCase()));
    const pool = isHelp ? HELP_REPLIES : CHAT_REPLIES;
    const reply = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
      addBotMessage(bot.name, bot.avatar, reply);
      callbacks.persistSave();
      renderChat();
    }, 800 + Math.random() * 1200);
  }

  function startAmbientChat() {
    stopAmbientChat();
    chatTimer = setInterval(() => {
      if (Math.random() > 0.35) return;
      const bot = BOT_MEMBERS[Math.floor(Math.random() * BOT_MEMBERS.length)];
      const msg = CHAT_REPLIES[Math.floor(Math.random() * CHAT_REPLIES.length)];
      addBotMessage(bot.name, bot.avatar, msg);
      callbacks.persistSave();
      if (document.getElementById('screen-club')?.classList.contains('active')) {
        renderChat();
      }
    }, 12000);
  }

  function stopAmbientChat() {
    if (chatTimer) {
      clearInterval(chatTimer);
      chatTimer = null;
    }
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  function renderChat() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    container.innerHTML = '';
    save.social.chatMessages.forEach((msg) => {
      const el = document.createElement('div');

      if (msg.type === 'system') {
        el.className = 'chat-msg system';
        el.textContent = msg.text;
      } else {
        el.className = `chat-msg ${msg.type === 'player' ? 'mine' : 'other'}`;
        el.innerHTML = `
          <div class="chat-avatar">${msg.avatar}</div>
          <div class="chat-bubble">
            <span class="chat-name">${msg.name}</span>
            <span class="chat-text">${escapeHtml(msg.text)}</span>
            <span class="chat-time">${formatTime(msg.time)}</span>
          </div>`;
      }

      container.appendChild(el);
    });

    container.scrollTop = container.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderClubScreen() {
    const club = getClub();
    document.getElementById('club-name').textContent = club.name;
    document.getElementById('club-members').textContent =
      I18n.t('club.membersOnline', { count: club.members.toLocaleString() });
    document.getElementById('club-level-progress').textContent =
      I18n.t('club.goal', {
        current: save.unlockedLevel.toLocaleString(),
        max: MAX_LEVELS.toLocaleString(),
      });

    const clubList = document.getElementById('club-list');
    clubList.innerHTML = '';
    CLUBS.forEach((c) => {
      const btn = document.createElement('button');
      btn.className = `club-chip${c.id === club.id ? ' active' : ''}`;
      btn.textContent = I18n.getClubName(c.id);
      btn.addEventListener('click', () => {
        if (save.social.clubId === c.id) return;
        save.social.clubId = c.id;
        addSystemMessage(I18n.t('club.switched', { name: I18n.getClubName(c.id) }));
        callbacks.persistSave();
        renderClubScreen();
        renderChat();
        callbacks.showToast(I18n.t('club.joined', { name: I18n.getClubName(c.id) }));
      });
      clubList.appendChild(btn);
    });

    renderChat();
  }

  function getTournamentTimeLeft() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const diff = end - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return I18n.t('tournament.timeLeft', { h, m, s });
  }

  function calcTournamentScore(moves, elapsedSec, stars) {
    const base = 10000;
    const movePenalty = moves * 8;
    const timePenalty = Math.floor(elapsedSec * 12);
    const starBonus = stars * 500;
    return Math.max(100, base - movePenalty - timePenalty + starBonus);
  }

  function recordTournamentScore(moves, elapsedSec, stars) {
    ensureTournamentDay();
    const score = calcTournamentScore(moves, elapsedSec, stars);
    const prevBest = save.social.tournamentScore;
    const improved = score > prevBest;

    if (improved) {
      save.social.tournamentScore = score;
    }
    save.social.tournamentPlayed = true;

    const board = save.social.leaderboard.filter((e) => !e.isPlayer);
    board.push({
      name: save.social.playerName,
      avatar: '😊',
      score: save.social.tournamentScore,
      isPlayer: true,
    });

    board.sort((a, b) => b.score - a.score);
    save.social.leaderboard = board;
    save.social.tournamentRank = board.findIndex((e) => e.isPlayer) + 1;

    const rank = save.social.tournamentRank;
    let coinReward = 0;
    if (improved) {
      if (rank <= 3) coinReward = 200;
      else if (rank <= 10) coinReward = 100;
      else if (rank <= 50) coinReward = 50;
      else coinReward = 20;
      save.coins += coinReward;
    }

    callbacks.persistSave();

    return { score: save.social.tournamentScore, rank, coinReward, improved };
  }

  function renderTournamentScreen() {
    ensureTournamentDay();
    document.getElementById('tournament-timer').textContent = getTournamentTimeLeft();
    document.getElementById('tournament-my-score').textContent =
      save.social.tournamentScore > 0
        ? save.social.tournamentScore.toLocaleString()
        : '-';

    const rankEl = document.getElementById('tournament-my-rank');
    if (save.social.tournamentRank > 0) {
      rankEl.textContent = I18n.t('tournament.rankNum', { rank: save.social.tournamentRank });
    } else {
      rankEl.textContent = I18n.t('tournament.notJoined');
    }

    const daySeed = getDayKey().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const tLevel = getTournamentLevel(daySeed);
    document.getElementById('tournament-desc').textContent =
      I18n.t('tournament.todayDesc', {
        style: tLevel.chapterTitle || tLevel.location,
        tiles: tLevel.tiles.length,
      });

    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';

    save.social.leaderboard.slice(0, 20).forEach((entry, i) => {
      const row = document.createElement('div');
      row.className = `leaderboard-row${entry.isPlayer ? ' me' : ''}`;
      row.innerHTML = `
        <span class="lb-rank">${i + 1}</span>
        <span class="lb-avatar">${entry.avatar}</span>
        <span class="lb-name">${entry.name}${entry.isPlayer ? I18n.t('leaderboard.me') : ''}</span>
        <span class="lb-score">${entry.score.toLocaleString()}</span>`;
      list.appendChild(row);
    });
  }

  function getTournamentLevelForToday() {
    const daySeed = getDayKey().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return getTournamentLevel(daySeed);
  }

  function bindEvents() {
    document.getElementById('btn-send-chat')?.addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      sendChat(input.value);
      input.value = '';
    });

    document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = document.getElementById('chat-input');
        sendChat(input.value);
        input.value = '';
      }
    });

    document.querySelectorAll('.quick-chat').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.msgKey;
        sendChat(key ? I18n.t(key) : btn.dataset.msg);
      });
    });

    document.getElementById('btn-tournament-play')?.addEventListener('click', () => {
      callbacks.startTournament();
    });

    document.getElementById('btn-set-name')?.addEventListener('click', () => {
      const name = prompt(I18n.t('prompt.nickname'), save.social.playerName);
      if (name && name.trim()) {
        save.social.playerName = name.trim().slice(0, 12);
        callbacks.persistSave();
        callbacks.showToast(I18n.t('toast.nickname', { name: save.social.playerName }));
      }
    });
  }

  return {
    init,
    renderClubScreen,
    renderTournamentScreen,
    recordTournamentScore,
    getTournamentLevelForToday,
    startAmbientChat,
    stopAmbientChat,
    bindEvents,
    getClub,
  };
})();
