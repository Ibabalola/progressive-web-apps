// default cache
const cacheName = 'v2';
const cacheFiles = [
    '/dist/',
    '/dist/styles.css',
    '/dist/index.html',
    '/dist/app.bundle.js',
    '/dist/images/background.jpg'
];

// install event
self.addEventListener('install', e => {
    console.log('[ServiceWorker] Installed');

    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
        .catch(e => {
            console.log(e.message);
            console.log(e.stackTrace);
        })
    );
});

// activate event
self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(caches.keys()
        .then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheName => {
                if (thisCacheName !== cacheName) {
                    console.log('[Service Worker] Removing Cached Files from ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        }))
});

// fetch event
self.addEventListener('fetch', e => {

    console.log('[ServiceWorker] Fetch');
    console.log('[ServiceWorker] Fetch', e.request.url);

    e.respondWith(caches.match(e.request).then(function(response) {
        if (response) {
             console.log('[ServiceWorker] Found in cache', e.request,url);
             return response;
        }

        return fetch(e.request);
    }))
});