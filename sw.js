/**
 * Nine Gate — Service Worker
 * Provides offline support and caching strategy
 * Version: 1.0.0
 */

const CACHE_NAME = 'nine-gate-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/soluciones.html',
  '/como-trabajamos.html',
  '/contacto.html',
  '/privacidad.html',
  '/terminos.html',
  '/cookies.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/4-A.png',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/assets/og-default.jpg'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first - for static assets
  cacheFirst: async (request, cache) => {
    const cached = await cache.match(request);
    if (cached) return cached;
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch {
      return new Response('Offline', { status: 503 });
    }
  },
  
  // Network first - for HTML pages
  networkFirst: async (request, cache) => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      return new Response('Offline', { status: 503 });
    }
  },
  
  // Stale while revalidate - for fonts, images
  staleWhileRevalidate: async (request, cache) => {
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => cached);
    
    return cached || fetchPromise;
  }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - apply caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension, data:, blob: URLs
  if (!url.protocol.startsWith('http')) return;
  
  // Determine strategy based on request type
  let strategy;
  
  // HTML pages - network first
  if (request.destination === 'document' || 
      request.headers.get('accept')?.includes('text/html')) {
    strategy = CACHE_STRATEGIES.networkFirst;
  }
  // Static assets (CSS, JS, fonts) - cache first
  else if (request.destination === 'style' || 
           request.destination === 'script' ||
           request.destination === 'font' ||
           url.pathname.match(/\.(css|js|woff2?|ttf|eot)$/)) {
    strategy = CACHE_STRATEGIES.cacheFirst;
  }
  // Images - stale while revalidate
  else if (request.destination === 'image' ||
           url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|gif|ico)$/)) {
    strategy = CACHE_STRATEGIES.staleWhileRevalidate;
  }
  // API calls - network only (no cache)
  else if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/')) {
    return; // Let browser handle normally
  }
  // Default - network first
  else {
    strategy = CACHE_STRATEGIES.networkFirst;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => strategy(request, cache))
  );
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'getVersion') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data === 'clearCache') {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }
});

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'form-submission') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Implementation for offline form sync would go here
  // Store failed submissions in IndexedDB and retry when online
  console.log('[SW] Background sync triggered');
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/logo-192.png',
    badge: '/assets/badge-72.png',
    vibrate: [100, 50, 100],
    data: data.url ? { url: data.url } : {},
    actions: [
      { action: 'open', title: 'Abrir' },
      { action: 'close', title: 'Cerrar' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' && event.notification.data?.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});