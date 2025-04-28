// service-worker.js

const CACHE_NAME = 'renttech-v2';         // ← cambia a “v2”
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './dist/script.js',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png'
];

// Al instalar, cachea todo
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Al activar, borra cachés anteriores
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Al buscar un recurso, primero caché, luego red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
