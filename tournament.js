const TournamentSystem = (() => {

  const MAX_ROUNDS = 5;

  const SCORES_KEY = 'blockgame-tournament-scores';

  const MAX_ENTRIES = 10;



  /** Local calendar day id, e.g. 2026-06-11 (resets at midnight local time). */

  function getDayId(date = new Date()) {

    const y = date.getFullYear();

    const m = String(date.getMonth() + 1).padStart(2, '0');

    const d = String(date.getDate()).padStart(2, '0');

    return `${y}-${m}-${d}`;

  }



  function getDaySeed(dayId = getDayId()) {

    let hash = 0;

    for (let i = 0; i < dayId.length; i += 1) {

      hash = (Math.imul(31, hash) + dayId.charCodeAt(i)) >>> 0;

    }

    return (hash % 9000) + 100;

  }



  function getRoundLevel(round, daySeed) {

    const base = daySeed + (round - 1) * 37;

    return Math.max(1, Math.min(LevelSystem.MAX_LEVEL, base));

  }



  function createState(dayId = getDayId()) {

    const daySeed = getDaySeed(dayId);

    return {

      dayId,

      daySeed,

      round: 1,

      maxRounds: MAX_ROUNDS,

      totalScore: 0,

      totalClears: 0,

      completed: false,

    };

  }



  function loadScores() {

    try {

      const data = JSON.parse(localStorage.getItem(SCORES_KEY));

      return Array.isArray(data) ? data : [];

    } catch {

      return [];

    }

  }



  function saveScores(entries) {

    localStorage.setItem(SCORES_KEY, JSON.stringify(entries.slice(0, 50)));

  }



  function entryDayId(entry) {

    return entry.dayId || entry.weekId || '';

  }



  function saveResult(name, totalScore, totalClears, dayId, completed) {

    const entry = {

      name,

      score: totalScore,

      clears: totalClears,

      dayId,

      completed,

      date: Date.now(),

    };

    const sorted = [...loadScores(), entry].sort((a, b) => {

      if (b.score !== a.score) return b.score - a.score;

      if (b.clears !== a.clears) return b.clears - a.clears;

      return b.date - a.date;

    });

    saveScores(sorted);

    const dayEntries = sorted.filter(e => entryDayId(e) === dayId);

    const rank = dayEntries.findIndex(e => e.date === entry.date) + 1;

    return { rank, madeBoard: rank > 0 && rank <= MAX_ENTRIES };

  }



  function getDayScores(dayId = getDayId()) {

    return loadScores()

      .filter(entry => entryDayId(entry) === dayId)

      .sort((a, b) => {

        if (b.score !== a.score) return b.score - a.score;

        if (b.clears !== a.clears) return b.clears - a.clears;

        return b.date - a.date;

      })

      .slice(0, MAX_ENTRIES);

  }



  return {

    MAX_ROUNDS,

    MAX_ENTRIES,

    getDayId,

    getDaySeed,

    getRoundLevel,

    createState,

    saveResult,

    getDayScores,

  };

})();

