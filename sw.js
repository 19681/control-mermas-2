const CACHE_NAME = 'mermas-fc-v3';
const ARCHIVOS_A_GUARDAR = [
  './',
  './index.html',
  './manifest.json',
  './html5-qrcode.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS_A_GUARDAR))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(respuesta => {
      return respuesta || fetch(event.request);
    }).catch(() => caches.match('./index.html'))
  );
});
