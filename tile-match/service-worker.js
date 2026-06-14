const CACHE = 'tile-club-v8';
const ASSETS = [
  './',
  './index.html',
  './privacy.html',
  './css/style.css',
  './js/config.js',
  './js/i18n.js',
  './js/game.js',
  './js/levels.js',
  './js/audio.js',
  './js/auth.js',
  './js/settings.js',
  './js/social.js',
  './js/mobile.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/logo-flower.svg',
  './.well-known/assetlinks.json',
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
