var doCache = true;

var CACHE_NAME = "cache-v1";

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            console.log("Deleting cache: " + key);

            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("install", function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        fetch(`${self.registration.scope}asset-manifest.json`)
          .then((response) => response.json())
          .then((assets) => {
            console.log(self)
            console.log(`${self.registration.scope}asset-manifest.json`)
            const urlsToCache = ["/"].concat(Object.values(assets.files));
            
            console.log(urlsToCache)
            cache.addAll(urlsToCache);

            console.log("cached");
          });
      })
    );
  }
});

self.addEventListener("fetch", function (event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
