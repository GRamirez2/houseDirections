function log(messages) {
  console.log (messages);
}

log('Installing Service Worker ')

self.addEventListener('install', (event) =>  event.waitUntil(installServiceWorker())

);

async function installServiceWorker(){
  log('Service Worker installation started');
  const request = new Request('offline.html')
  const response = await fetch(request)
  log('response received after loading offline.html') // adding the response to this log didn't work
  log(response)

  if (response.status !== 200){
    throw new Error ('Could not load offline page!');
  }

  const cache = await caches.open('app-cache');
  cache.put(request, response);
  log('Cached offline.html');

}

self.addEventListener('activate', () => {
  log('service worker activated')
});