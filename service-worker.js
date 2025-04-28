self.addEventListener('install', (e) => {
    console.log('Service Worker instalado');
    e.waitUntil(
        caches.open('renttech-cache').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './css/style.css',
                './dist/script.js',
                './manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
