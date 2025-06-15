const CACHE_NAME = 'hyundai-insurance-v1';
const urlsToCache = [
  '/index.html',
  '/products.html',
  '/appointment.html',
  '/faq.html',
  '/css/styles.css',
  '/js/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
