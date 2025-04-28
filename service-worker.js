// service-worker.js

const CACHE_NAME = 'renttech-cache-v2';    // ← incrementa este sufijo cuando cambies
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './dist/script.js',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png'
];

// Al instalar, guarda todos los assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Al activar, borra caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Al hacer fetch, responde desde caché o va a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});
