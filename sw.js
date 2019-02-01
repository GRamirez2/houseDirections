const VERSION = 'V16';

log('Installing Service Worker')

self.addEventListener('install', (event) =>  event.waitUntil(installServiceWorker()));

async function installServiceWorker(){

  const cache = await caches.open(getCacheName());

  return cache.addAll([
    // '/',
    '/css/index.css',
    '/css/project.css',
    '/sw-register.js',
    '/css/components/reset.css',
    '/css/components/reset-utils.css',
    '/css/components/typography.css',
    '/css/components/table.css',
    '/css/components/backgrounds.css',
    '/css/components/display.css',
    '/css/components/flex.css',
    '/css/components/form.css',
    '/css/components/grid.css',
    '/css/components/height-width.css',
    '/css/components/image.css',
    '/css/components/list.css',
    '/css/components/margin.css',
    '/css/components/padding.css',
    '/css/components/position.css',
    '/css/components/print.css',
    '/css/components/text-font.css',
    '/css/components/button.css',
    '/css/vars.css'
  ]);
}

function getCacheName(){
  return 'directions-cache-' + VERSION
}

self.addEventListener('activate', () => activeSW());

// need an async function to the await to work, so move it out of addEventListner
async function activeSW(){
  log('service worker activated');

  const cacheKeys = await caches.keys();

  cacheKeys.forEach(cacheKey => {
    if (cacheKey !== getCacheName()){
      caches.delete(cacheKey);
    }
  })
}

self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));

async function cacheThenNetwork(event){

  const cache = await caches.open(getCacheName());

  const cachedResponse = await cache.match(event.request);

  if(cachedResponse){
    log('From Cache: ' + event.request.url);
    return cachedResponse;
  }

  const networkResponse = await fetch(event.request);

  log('Calling Network: ' + event.request.url);

  return networkResponse;

}

function log(messages, ...data) {
  console.log (messages, ...data);
}