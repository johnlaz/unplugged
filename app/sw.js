// ══════════════════════════════════════════
//  UNPLUGGED — Service Worker
//  Caches app shell for full offline use
// ══════════════════════════════════════════

// IMPORTANT: bump this version string any time index.html (or anything in
// CACHE_URLS) changes. The browser only checks for service-worker updates by
// comparing sw.js byte-for-byte — if THIS file doesn't change, the browser
// never knows there's anything new to fetch, and cache-first below means it
// will happily keep serving a months-old index.html forever, even after
// dozens of real deploys. Bumping this string is what forces a refresh.
// Keep VERSION in sync with APP_VERSION in index.html (the in-app version stamp).
const VERSION = '2.7';
const CACHE_NAME = 'unplugged-v' + VERSION;
const XLSX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
const CACHE_URLS = [
  './index.html',
  './',
  './manifest.json',
  './icon-512.png',
  './icon-192.png',
  XLSX_URL,
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

// ── FETCH: network-first for the app shell (so real updates always reach
//    the user immediately), cache-first for static assets that rarely
//    change (icons, CDN libs), network-first for API calls. ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never intercept Groq API calls — must go to network
  if (url.hostname === 'api.groq.com') {
    return; // let it pass through normally
  }

  // Never intercept the lyrics lookup — must go to network
  if (url.hostname === 'api.lyrics.ovh') {
    return;
  }

  // Only same-origin files and the pinned SheetJS build are ever cached. Everything else
  // cross-origin (Wikipedia/Commons/Discogs/Picsum photos, APIs) goes straight to the network,
  // so photo lookups never go stale and the cache cannot grow without bound.
  if (url.origin !== self.location.origin && url.href !== XLSX_URL) {
    return;
  }

  // App shell (the HTML itself, and any direct navigation) — ALWAYS try the
  // network first so updates land immediately. Only fall back to the cached
  // copy if the network is unreachable (offline use).
  const isAppShell = event.request.mode === 'navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/');
  if (isAppShell) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  // Everything else (same-origin icons, the pinned SheetJS build) — cache-first, since these are static
  // and versioned by filename/CDN path, not expected to change silently.
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
