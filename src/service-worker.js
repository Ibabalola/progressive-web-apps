// default cache
const cacheName = 'v1';
const cacheFiles = [
    './',
    './index.html',
    './styles.css',
    './images/background.jpg'
];

// install event
self.addEventListener('install', function(event) {
   console.log('[ServiceWorker] Installed');
});

// activate event
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activated');
});

// fetch event
self.addEventListener('fetching', function(event) {
    console.log('[ServiceWorker] Fetching', event.request.url);
});