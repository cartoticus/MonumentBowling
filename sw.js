// Monument Bowling — service worker
// Bump CACHE_NAME whenever the site's own files change so clients pick up the update.
const CACHE_NAME = "mb-cache-v12";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./schedule.html",
  "./standings.html",
  "./join.html",
  "./contact.html",
  "./assets/style.css?v=11",
  "./assets/share.js",
  "./assets/schedule.js",
  "./assets/quote.js",
  "./assets/banner-1800.jpg",
  "./assets/banner-900.jpg",
  "./assets/standings.js",
  "./assets/standings-view.js",
  "./assets/quotes.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Network-first for everything on this site, so edits always show up when online.
// The cache is only a fallback for when the device is offline.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((res) => res || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
      )
  );
});
