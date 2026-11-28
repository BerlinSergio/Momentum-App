import {readdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const root='dist',base='/Momentum-App/';
async function walk(dir){const out=[];for(const ent of await readdir(dir,{withFileTypes:true})){const p=join(dir,ent.name);if(ent.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const manifest=JSON.parse(await readFile(root+'/manifest.json','utf8'));
Object.assign(manifest,{id:base,start_url:base,scope:base,display:'standalone',icons:[{src:base+'icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:base+'icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]});
await writeFile(root+'/manifest.json',JSON.stringify(manifest,null,2));
for(const file of await walk(root)){
 if(!/\.(html|js|css)$/.test(file)||file.endsWith('/sw.js'))continue;
 let s=await readFile(file,'utf8');
 s=s.replace(/(["'`(])\/(logo\.png|favicon\.svg|icons\.svg|manifest\.json|sw\.js|fonts\/[^"'`)]*)(?=["'`)])/g,(_,prefix,asset)=>prefix+base+asset);
 if(file.endsWith('/index.html'))s=s.replace(/(<link rel="apple-touch-icon" href=")[^"]+/, '$1'+base+'apple-touch-icon.png');
 await writeFile(file,s);
}
await writeFile(root+'/.nojekyll','');
const files=(await walk(root)).filter(p=>!p.endsWith('/sw.js')&&!p.endsWith('/.nojekyll')).sort();
const hash=createHash('sha256');
for(const file of files)hash.update(await readFile(file));
const version=hash.digest('hex').slice(0,20);
const urls=files.map(p=>base+p.slice(root.length+1).split('/').map(encodeURIComponent).join('/'));
await writeFile(root+'/sw.js',`const PREFIX='momentum-pwa-';const CACHE=PREFIX+${JSON.stringify(version)};const BASE=${JSON.stringify(base)};const ASSETS=${JSON.stringify(urls)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(BASE))return;
if(req.mode==='navigate'){event.respondWith(caches.open(CACHE).then(cache=>cache.match(BASE+'index.html')).then(hit=>hit||fetch(req)));return;}
event.respondWith(caches.open(CACHE).then(cache=>cache.match(req)).then(hit=>hit||fetch(req)));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(windows=>{const match=windows.find(w=>new URL(w.url).pathname.startsWith(BASE));return match?match.focus():clients.openWindow(BASE);}));});
`);
console.log('Precache version',version,'assets',urls.length);
