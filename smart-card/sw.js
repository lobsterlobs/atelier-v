const CACHE = 'winners-card-v2';
const ASSETS = ['./','./index.html','./style.css','./script.js','./manifest.json','./contact.vcf','./icon-192.png','./icon-512.png','./logo-crop.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
