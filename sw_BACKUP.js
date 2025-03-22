'use strict';

const cacheName = 'franz_marc-v1.0.0';


const precacheResources = [
  '/index.html',
  '/scripts.js',
  '/styles.css'
];


const staticResources = [
  '/site.webmanifest',
  '/favicon.ico',
  '/hammer.min.js',
  '/franz-marc.jpeg',
  '/imgs/favicons/android-chrome-192x192.png',
  '/imgs/favicons/apple-touch-icon.png',
  '/imgs/favicons/favicon-32x32.png',
  '/imgs/favicons/favicon-16x16.png',
  '/imgs/favicons/maskable_icon.png',
  '/imgs/(Painting-with)-Cattle-I-1913.png',
  '/imgs/blauer-reiter-back.png',
  '/imgs/blauer-reiter.png',
  '/imgs/Fairy-Tale-Animals-(Horse&Dog)-1913.png',
  '/imgs/Mandrill-1913.png',
  '/imgs/Reh-im-Klostergarten-1912.png',
  '/imgs/Tirol-1914.png'
];


// add new cache(s)
addEventListener('install', event => {
  console.log('[Service Worker] installing...');
  event.waitUntil( cacheAllThings() );
  skipWaiting();
});


// delete old cache(s)
addEventListener('activate', event => {
  console.log('[Service Worker] activating...');
  const whitelist = [cacheName];
  event.waitUntil(
    caches.keys().then( names => {
      return Promise.all(
        names.map( cn => {
          if (whitelist.indexOf(cn) === -1) {
            console.log('[Service Worker] deleting ', cn);
            return caches.delete(cn);
          }
        })
      );
    })
  );
  // event.waitUntil(requestReload());
});


// addEventListener('sync', event => {
//   console.log('[Service Worker] Synced by', event.tag);
//   if (event.tag == 'update-assets') {
//     event.waitUntil(
//       cacheAssets(cacheName, precacheResources)
//     );
//   }
// });

addEventListener('sync', event => {
  if ((event.tag).includes('contribution')) {
    console.log('contribution sync event triggered');
    const order = (event.tag).slice(13);
    console.log(event.tag);
    console.log(`[SW] ${order}`);
    // event.waitUntil(updateCacheWith(thing));
  }
});

async function updateCacheWith(thing) {
  const cache = await caches.open(cacheName);
  return cache.add(thing);
}


// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
// addEventListener('fetch', event => {
//   // console.log('[Service Worker] Fetching ', event.request.url);
//   event.respondWith(caches.match(event.request)
//     .then(cachedResponse => {
//         // CACHE > NETWORK
//         if (cachedResponse) {
//           // console.log('[Service Worker] from CACHE');
//           return cachedResponse
//         } else {
//           console.log('[Service Worker] Fetch from NETWORK ', event.request.url);
//           // updateDataResources();
//           return fetch(event.request)
//         }
//         // return cachedResponse || fetch(event.request);
//       })
//     );
// });


addEventListener('fetch', event => {
  // console.log('[Service Worker] fetching/serving assets');
  // respondWith() for ASAP answer from cache
  event.respondWith(
    serveFromCache(event.request)
  );
  // don't put SW to sleep until we've done the following
  event.waitUntil(
    updateCacheFromNetwork(event.request)
      // .then(requestRefresh)
  );
});



async function cacheAllThings() {
  console.log('[Service Worker] caching ...');
  const cache = await caches.open(cacheName);
  // cache.addAll(postcacheResources.concat(dataResources));
  // updateDataResources();
  return cache.addAll(precacheResources.concat(staticResources));
}


// CACHE, UPDATE AND REFRESH

async function serveFromCache(req) {
  // console.log(`[Service Worker] serving from CACHE: ${request.url}`);
  const cache = await caches.open(cacheName);
  // get it from cache or fetch from network if new
  return await cache.match(req) || await fetch(req);
}

async function updateCacheFromNetwork(req) {
  // console.log(`[Service Worker] updating CACHE from NETWORK: ${request.url}`);
  const cache = await caches.open(cacheName);
  const fullurl = new URL(req.url)
  const resource = fullurl.pathname;
  let thing = await cache.match(resource);
  const urlOri = fullurl.origin;
  // only adds new resources in, not updates out-of-date ones?
  // this line avoids things like "chrome-extension://xyz"
  if((urlOri.startsWith('http')) || (urlOri.startsWith('https'))){
    if (thing === undefined) {
      thing = await fetch(req.clone());
      await cache.put(req, thing);
    }
  }

}
