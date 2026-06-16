const Auth = (function () {
  'use strict';

  const AUTH_KEY = 'tile-club-auth';
  const PLACEHOLDER_ID = '';

  let user = null;
  let callbacks = {};
  let gsiReady = false;
  let configured = false;

  function loadStoredUser() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) user = JSON.parse(raw);
    } catch (_) {}
  }

  function parseJwt(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  }

  function isConfigured() {
    const id = APP_CONFIG?.GOOGLE_CLIENT_ID;
    return !!(id && id !== PLACEHOLDER_ID && !id.includes('YOUR_CLIENT_ID'));
  }

  function waitForGsi() {
    return new Promise((resolve) => {
      if (window.google?.accounts?.id) {
        gsiReady = true;
        resolve();
        return;
      }
      let attempts = 0;
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          gsiReady = true;
          resolve();
        } else if (++attempts > 80) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  }

  function handleCredentialResponse(response) {
    try {
      const payload = parseJwt(response.credential);
      user = {
        id: payload.sub,
        name: payload.name || I18n.t('auth.player'),
        email: payload.email || '',
        picture: payload.picture || '',
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      callbacks.onLogin?.(user);
      renderUI();
      callbacks.showToast?.(I18n.t('auth.welcome', { name: user.name }));
    } catch (_) {
      callbacks.showToast?.(I18n.t('auth.loginFail'));
    }
  }

  function setupGsi() {
    if (!isConfigured() || !gsiReady) return;

    google.accounts.id.initialize({
      client_id: APP_CONFIG.GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      context: 'signin',
      ux_mode: 'popup',
      itp_support: true,
    });

    const btnEl = document.getElementById('google-signin-btn');
    if (btnEl) {
      btnEl.innerHTML = '';
      google.accounts.id.renderButton(btnEl, {
        type: 'standard',
        theme: 'filled_black',
        size: 'large',
        shape: 'pill',
        text: 'signin_with',
        logo_alignment: 'left',
        locale: typeof I18n !== 'undefined' ? I18n.getLang() : 'ko',
        width: 280,
      });
    }
  }

  function init(cbs) {
    callbacks = cbs || {};
    configured = isConfigured();
    loadStoredUser();

    waitForGsi().then(() => {
      if (configured) setupGsi();
      renderUI();
    });
  }

  function signOut() {
    user = null;
    localStorage.removeItem(AUTH_KEY);
    if (gsiReady && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
    }
    callbacks.onLogout?.();
    renderUI();
    callbacks.showToast?.(I18n.t('auth.logout'));
  }

  function getUser() {
    return user;
  }

  function isLoggedIn() {
    return !!user;
  }

  function renderUI() {
    const loggedIn = isLoggedIn();
    const homeCard = document.getElementById('home-account');
    const settingsAccount = document.getElementById('settings-account');
    const loginBlock = document.getElementById('auth-login-block');
    const profileBlock = document.getElementById('auth-profile-block');
    const setupNotice = document.getElementById('auth-setup-notice');

    if (setupNotice) {
      setupNotice.classList.toggle('hidden', configured);
    }

    if (loginBlock) loginBlock.classList.toggle('hidden', loggedIn || !configured);
    if (profileBlock) profileBlock.classList.toggle('hidden', !loggedIn);

    if (loggedIn) {
      const name = user.name || I18n.t('auth.player');
      const email = user.email || '';

      document.querySelectorAll('[data-auth-name]').forEach((el) => {
        el.textContent = name;
      });
      document.querySelectorAll('[data-auth-email]').forEach((el) => {
        el.textContent = email;
      });
      document.querySelectorAll('[data-auth-photo]').forEach((el) => {
        if (user.picture) {
          el.src = user.picture;
          el.classList.remove('hidden');
        } else {
          el.removeAttribute('src');
          el.classList.add('hidden');
        }
      });
      document.querySelectorAll('[data-auth-initial]').forEach((el) => {
        el.textContent = name.charAt(0).toUpperCase();
        el.style.display = user.picture ? 'none' : 'flex';
      });
    }

    if (homeCard) {
      homeCard.classList.toggle('logged-in', loggedIn);
      homeCard.classList.toggle('guest', !loggedIn);
    }

    const guestView = document.getElementById('account-guest-view');
    const userView = document.getElementById('account-user-view');
    if (guestView) guestView.classList.toggle('hidden', loggedIn);
    if (userView) userView.classList.toggle('hidden', !loggedIn);

    if (settingsAccount) {
      settingsAccount.classList.toggle('logged-in', loggedIn);
    }

    if (configured && !loggedIn && gsiReady) {
      setupGsi();
    }
  }

  function bindEvents() {
    document.getElementById('btn-signout')?.addEventListener('click', () => {
      signOut();
    });
  }

  loadStoredUser();

  return {
    init,
    bindEvents,
    renderUI,
    getUser,
    isLoggedIn,
    isConfigured,
    signOut,
  };
})();
