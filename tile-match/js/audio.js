const Audio = (function () {
  'use strict';

  const BGM_BPM = 88;
  const BEAT = 60 / BGM_BPM;

  const MELODY = [
    523.25, 587.33, 659.25, 587.33, 523.25, 440, 493.88, 523.25,
    659.25, 698.46, 783.99, 659.25, 587.33, 523.25, 493.88, 440,
    392, 440, 493.88, 523.25, 587.33, 523.25, 493.88, 440,
    523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88, 392,
  ];

  const CHORDS = [
    [261.63, 329.63, 392],
    [220, 277.18, 329.63],
    [349.23, 440, 523.25],
    [293.66, 369.99, 440],
  ];

  let ctx = null;
  let musicGain = null;
  let sfxGain = null;
  let musicOn = true;
  let sfxOn = true;
  let bgmInterval = null;
  let melodyStep = 0;
  let chordStep = 0;
  let padOscs = [];
  let unlocked = false;

  function ensureContext() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      musicGain = ctx.createGain();
      sfxGain = ctx.createGain();
      musicGain.connect(ctx.destination);
      sfxGain.connect(ctx.destination);
      musicGain.gain.value = 0.14;
      sfxGain.gain.value = 0.38;
    }
    if (ctx.state === 'suspended') {
      return ctx.resume();
    }
    return Promise.resolve();
  }

  function init(settings) {
    musicOn = settings?.music !== false;
    sfxOn = settings?.sfx !== false;
    updateGain();
  }

  function updateGain() {
    if (musicGain) musicGain.gain.value = musicOn ? 0.14 : 0;
    if (sfxGain) sfxGain.gain.value = sfxOn ? 0.38 : 0;
  }

  function unlock() {
    if (unlocked) return ensureContext();
    unlocked = true;
    return ensureContext().then(() => {
      if (musicOn) startBgm();
    });
  }

  function tone(freq, duration, type, volume, dest, delay) {
    if (!ctx || !dest) return;
    const t = ctx.currentTime + (delay || 0);
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(volume, 0.001), t + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  function noiseBurst(duration, volume) {
    if (!ctx || !sfxGain || !sfxOn) return;
    const t = ctx.currentTime;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + duration);
    src.connect(filter);
    filter.connect(g);
    g.connect(sfxGain);
    src.start(t);
    src.stop(t + duration);
  }

  function play(name) {
    if (!sfxOn) return;
    ensureContext().then(() => {
      if (!ctx || !sfxGain) return;

      switch (name) {
        case 'tap':
          tone(880, 0.08, 'sine', 0.25, sfxGain);
          tone(1320, 0.06, 'sine', 0.12, sfxGain, 0.01);
          break;

        case 'match':
          tone(523.25, 0.12, 'triangle', 0.3, sfxGain);
          tone(659.25, 0.12, 'triangle', 0.28, sfxGain, 0.07);
          tone(783.99, 0.18, 'triangle', 0.35, sfxGain, 0.14);
          tone(1046.5, 0.22, 'sine', 0.2, sfxGain, 0.2);
          break;

        case 'danger':
          tone(196, 0.15, 'sawtooth', 0.15, sfxGain);
          tone(185, 0.2, 'sawtooth', 0.12, sfxGain, 0.1);
          break;

        case 'win':
          [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
            tone(f, 0.25, 'triangle', 0.32 - i * 0.04, sfxGain, i * 0.1);
          });
          tone(1318.5, 0.4, 'sine', 0.25, sfxGain, 0.45);
          break;

        case 'lose':
          tone(392, 0.2, 'sine', 0.25, sfxGain);
          tone(349.23, 0.25, 'sine', 0.22, sfxGain, 0.15);
          tone(293.66, 0.35, 'sine', 0.2, sfxGain, 0.3);
          break;

        case 'click':
          tone(660, 0.05, 'sine', 0.15, sfxGain);
          break;

        case 'booster':
          tone(880, 0.1, 'sine', 0.2, sfxGain);
          tone(1108.73, 0.12, 'sine', 0.18, sfxGain, 0.06);
          tone(1318.5, 0.15, 'triangle', 0.22, sfxGain, 0.12);
          noiseBurst(0.08, 0.06);
          break;

        case 'chat':
          tone(740, 0.06, 'sine', 0.12, sfxGain);
          tone(988, 0.08, 'sine', 0.1, sfxGain, 0.05);
          break;
      }
    });
  }

  function updatePad() {
    if (!ctx || !musicGain || !musicOn) return;

    padOscs.forEach((o) => {
      try { o.stop(); } catch (_) {}
    });
    padOscs = [];

    const chord = CHORDS[chordStep % CHORDS.length];
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      g.gain.value = 0.025;
      osc.connect(g);
      g.connect(musicGain);
      osc.start();
      padOscs.push(osc);
    });

    chordStep++;
  }

  function tickBgm() {
    if (!ctx || !musicGain || !musicOn) return;

    const freq = MELODY[melodyStep % MELODY.length];
    const isAccent = melodyStep % 8 === 0;
    tone(freq, BEAT * 0.85, 'triangle', isAccent ? 0.09 : 0.055, musicGain);

    if (melodyStep % 8 === 0) {
      updatePad();
    }

    melodyStep++;
  }

  function startBgm() {
    if (!musicOn || bgmInterval) return;
    ensureContext().then(() => {
      if (bgmInterval || !musicOn) return;
      updatePad();
      tickBgm();
      bgmInterval = setInterval(tickBgm, BEAT * 1000);
    });
  }

  function stopBgm() {
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
    padOscs.forEach((o) => {
      try { o.stop(); } catch (_) {}
    });
    padOscs = [];
    melodyStep = 0;
    chordStep = 0;
  }

  function setMusic(on) {
    musicOn = on;
    updateGain();
    if (on) startBgm();
    else stopBgm();
  }

  function setSfx(on) {
    sfxOn = on;
    updateGain();
  }

  function isMusicOn() { return musicOn; }
  function isSfxOn() { return sfxOn; }

  return {
    init,
    unlock,
    play,
    startBgm,
    stopBgm,
    setMusic,
    setSfx,
    isMusicOn,
    isSfxOn,
  };
})();
