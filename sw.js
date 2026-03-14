// ══════════════════════════════════════════
//  UNPLUGGED — Service Worker
//  Caches app shell for full offline use
// ══════════════════════════════════════════

const CACHE_NAME = 'unplugged-v3';
const CACHE_URLS = [
  './index.html',
  './',
  './manifest.json',
  './icons/unplugged.ico',
  './icons/icon-512.png',
  './icons/icon-192.png',
  './icons/icon-180.png',
  './icons/icon-152.png',
  './icons/icon-120.png',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

// ── INSTALL: cache everything ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        CACHE_URLS.map(url =>
          cache.add(url).catch(err => console.warn('SW: could not cache', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: cache-first for app shell, network-first for API calls ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never intercept Groq API calls — must go to network
  if (url.hostname === 'api.groq.com') {
    return; // let it pass through normally
  }

  // Never cache Google Fonts CSS (changes frequently), but DO cache font files
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for everything else (app shell, icons, CDN libs, font files)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
