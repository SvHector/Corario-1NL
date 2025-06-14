
const CACHE_NAME = "corario-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/letras.html",
  "/agregar.html",
  "/manifest.json",
  "/css/styles.css",
  "/js/firebase-config.js",
  "/js/letras.js",
  "/js/agregar.js",
  "/assets/videos/Bienvenido.mp4",
  "/assets/videos/1NL.mp4",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

// Install SW and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Serve from cache or fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Cleanup old cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
