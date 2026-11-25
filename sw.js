const key='turaq-app-1f860b0381c2';
const shell=['./index.html','./app.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(key).then(c=>c.addAll(shell))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('turaq-app-')&&k!==key).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.open(key).then(c=>c.match('./index.html'))));return}
if(shell.some(p=>new URL(p,self.registration.scope).href===e.request.url))e.respondWith(caches.open(key).then(async c=>(await c.match(e.request))||fetch(e.request)))});
