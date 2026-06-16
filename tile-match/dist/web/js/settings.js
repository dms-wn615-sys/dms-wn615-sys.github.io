const Settings = (function () {
  'use strict';

  const VIBRATION_PATTERNS = {
    tap: 12,
    match: [18, 40, 22],
    danger: [60, 40, 60, 40],
    win: [25, 35, 25, 35, 25, 80],
    lose: [90, 50, 90],
    click: 8,
    booster: [12, 30, 18],
    chat: 15,
  };

  let save = null;
  let callbacks = {};
  let vibrationSupported = typeof navigator !== 'undefined' && !!navigator.vibrate;

  function init(gameSave, cbs) {
    save = gameSave;
    callbacks = cbs;

    if (!save.settings) {
      save.settings = {
        music: save.audio?.music !== false,
        sfx: save.audio?.sfx !== false,
        vibration: true,
      };
    }

    apply(save.settings);
  }

  function apply(settings) {
    Audio.init(settings);
    if (settings.music) {
      Audio.startBgm();
    } else {
      Audio.stopBgm();
    }
  }

  function isOn(key) {
    return save?.settings?.[key] !== false;
  }

  function set(key, value) {
    save.settings[key] = value;
    apply(save.settings);
    callbacks.persistSave();
    renderUI();
  }

  function vibrate(type) {
    if (!isOn('vibration') || !vibrationSupported) return;
    const pattern = VIBRATION_PATTERNS[type];
    if (pattern !== undefined) {
      navigator.vibrate(pattern);
    }
  }

  function feedback(type) {
    Audio.play(type);
    vibrate(type);
  }

  function syncToggle(id, on) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('on', on);
    el.setAttribute('aria-checked', on ? 'true' : 'false');
  }

  function renderUI() {
    syncToggle('toggle-music', isOn('music'));
    syncToggle('toggle-sfx', isOn('sfx'));
    syncToggle('toggle-vibration', isOn('vibration'));

    const vibeRow = document.getElementById('setting-vibration-row');
    const vibeNote = document.getElementById('vibration-note');
    if (vibeRow) {
      vibeRow.classList.toggle('disabled', !vibrationSupported);
    }
    if (vibeNote) {
      vibeNote.textContent = vibrationSupported
        ? I18n.t('settings.vibrationOn')
        : I18n.t('settings.vibrationOff');
    }
    I18n.renderLanguagePicker();
  }

  function bindToggle(toggleId, key) {
    const toggle = document.getElementById(toggleId);
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      Audio.unlock().then(() => {
        const next = !isOn(key);
        set(key, next);
        if (isOn('sfx')) Audio.play('click');
        if (next && key === 'vibration') vibrate('click');
      });
    });
  }

  function bindEvents() {
    bindToggle('toggle-music', 'music');
    bindToggle('toggle-sfx', 'sfx');
    bindToggle('toggle-vibration', 'vibration');
  }

  return {
    init,
    apply,
    renderUI,
    bindEvents,
    feedback,
    vibrate,
    isOn,
    set,
    isVibrationSupported: () => vibrationSupported,
  };
})();
