const GameAudio = {
  ctx: null,
  bgmTimer: null,
  bgmStep: 0,
  musicEnabled: localStorage.getItem('blockgame-music') !== 'off',
  sfxEnabled: localStorage.getItem('blockgame-sfx') !== 'off',

  MELODY: [
    { freq: 523.25, dur: 0.22 },
    { freq: 587.33, dur: 0.22 },
    { freq: 659.25, dur: 0.22 },
    { freq: 587.33, dur: 0.22 },
    { freq: 523.25, dur: 0.22 },
    { freq: 440.0, dur: 0.44 },
    { freq: 493.88, dur: 0.22 },
    { freq: 523.25, dur: 0.22 },
    { freq: 587.33, dur: 0.44 },
    { freq: 659.25, dur: 0.22 },
    { freq: 587.33, dur: 0.22 },
    { freq: 523.25, dur: 0.44 },
  ],

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  },

  async resume() {
    this.init();
    if (this.ctx?.state === 'suspended') await this.ctx.resume();
  },

  setMusicEnabled(on) {
    this.musicEnabled = on;
    localStorage.setItem('blockgame-music', on ? 'on' : 'off');
    if (on && document.querySelector('[data-game-state-playing]')) this.startBgm();
    else this.stopBgm();
  },

  setSfxEnabled(on) {
    this.sfxEnabled = on;
    localStorage.setItem('blockgame-sfx', on ? 'on' : 'off');
  },

  playTone(freq, duration, type = 'sine', volume = 0.12, when = 0) {
    if (!this.sfxEnabled || !this.ctx) return;
    const t = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  },

  playSelect() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.playTone(880, 0.06, 'triangle', 0.08);
    this.playTone(1174, 0.05, 'sine', 0.05, 0.03);
  },

  playPlace(cellCount = 1) {
    if (!this.sfxEnabled || !this.ctx) return;
    const base = 180 + Math.min(cellCount, 6) * 25;
    this.playTone(base, 0.08, 'square', 0.06);
    this.playTone(base * 1.5, 0.06, 'triangle', 0.04, 0.02);
  },

  playInvalid() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.playTone(150, 0.1, 'sawtooth', 0.04);
  },

  playClear(count = 1, combo = 1) {
    if (!this.sfxEnabled || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 987.77];
    const vol = Math.min(0.14 + combo * 0.02, 0.22);
    for (let i = 0; i < Math.min(count + 1, 4); i++) {
      this.playTone(notes[i], 0.12, 'triangle', vol, i * 0.07);
    }
  },

  playGameOver() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.playTone(392, 0.2, 'sine', 0.1);
    this.playTone(330, 0.25, 'sine', 0.08, 0.15);
    this.playTone(262, 0.35, 'triangle', 0.07, 0.35);
  },

  playBgmNote(note) {
    if (!this.musicEnabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + note.dur + 0.05);
  },

  startBgm() {
    if (!this.musicEnabled || !this.ctx) return;
    this.stopBgm();
    const playNext = () => {
      if (!this.musicEnabled || !this.ctx) return;
      const note = this.MELODY[this.bgmStep % this.MELODY.length];
      this.playBgmNote(note);
      this.bgmStep += 1;
      this.bgmTimer = setTimeout(playNext, note.dur * 1000);
    };
    playNext();
  },

  stopBgm() {
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  },

  pauseBgm() {
    this.stopBgm();
  },
};
