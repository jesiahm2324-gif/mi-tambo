const C="mitambo-v3",F=["./","index.html","manifest.webmanifest","icon-180.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;const u=new URL(q.url);if(u.origin!==location.origin)return;
  const html=q.mode==="navigate"||/\.html$/.test(u.pathname)||/\/$/.test(u.pathname);
  if(html){e.respondWith(fetch(q,{cache:"no-store"}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r}).catch(()=>caches.match(q).then(r=>r||caches.match("index.html")||caches.match("./"))));return}
  e.respondWith(caches.match(q).then(r=>{const n=fetch(q).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(q,c))}return res}).catch(()=>r);return r||n}))});
