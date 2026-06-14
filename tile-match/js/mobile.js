/**
 * Android / iOS 모바일 지원 — PWA 설치 안내, Capacitor 네이티브, iOS UI
 */
const Mobile = (function () {
  'use strict';

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  const isNative = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

  let deferredInstallPrompt = null;
  let bannerBound = false;

  function init() {
    document.documentElement.classList.toggle('platform-ios', isIOS);
    document.documentElement.classList.toggle('platform-android', isAndroid);
    document.documentElement.classList.toggle('is-standalone', isStandalone || isNative());

    initCapacitorNative();
    refreshInstallBanner();
  }

  function initCapacitorNative() {
    if (!isNative()) return;

    document.documentElement.classList.add('is-native');

    const statusBar = window.Capacitor?.Plugins?.StatusBar;
    if (statusBar) {
      statusBar.setStyle({ style: 'LIGHT' }).catch(() => {});
      statusBar.setBackgroundColor({ color: '#fff5fb' }).catch(() => {});
    }

    const splash = window.Capacitor?.Plugins?.SplashScreen;
    if (splash) {
      splash.hide().catch(() => {});
    }
  }

  function refreshInstallBanner() {
    if (isStandalone || isNative()) return;
    if (localStorage.getItem('tile-match-install-dismissed')) return;

    const banner = document.getElementById('install-banner');
    const text = document.getElementById('install-banner-text');
    const btnInstall = document.getElementById('btn-install');
    const btnDismiss = document.getElementById('btn-install-dismiss');
    if (!banner || !text || !btnInstall) return;

    banner.classList.add('hidden');

    if (isIOS) {
      text.textContent = I18n.t('install.ios');
      btnInstall.textContent = I18n.t('install.ok');
    } else if (isAndroid) {
      text.textContent = I18n.t('install.androidManual');
      btnInstall.textContent = I18n.t('install.ok');
    } else {
      return;
    }

    banner.classList.remove('hidden');

    if (!bannerBound) {
      btnInstall.addEventListener('click', dismissInstallBanner);
      btnDismiss?.addEventListener('click', dismissInstallBanner);
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;
        text.textContent = I18n.t('install.androidPrompt');
        btnInstall.textContent = I18n.t('install.install');
        btnInstall.onclick = async () => {
          if (!deferredInstallPrompt) {
            dismissInstallBanner();
            return;
          }
          deferredInstallPrompt.prompt();
          await deferredInstallPrompt.userChoice;
          deferredInstallPrompt = null;
          dismissInstallBanner();
        };
        banner.classList.remove('hidden');
      });
      bannerBound = true;
    }
  }

  function dismissInstallBanner() {
    localStorage.setItem('tile-match-install-dismissed', '1');
    document.getElementById('install-banner')?.classList.add('hidden');
  }

  return { init, refreshInstallBanner, isIOS, isAndroid, isNative, isStandalone };
})();

document.addEventListener('DOMContentLoaded', () => Mobile.init());
