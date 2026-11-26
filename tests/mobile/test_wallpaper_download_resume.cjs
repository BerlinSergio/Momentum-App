const assert=require('node:assert/strict');
const puppeteer=require('puppeteer');
(async()=>{
 const browser=await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-setuid-sandbox']});
 try{
  const page=await browser.newPage();
  await page.goto(process.env.MOMENTUM_URL||'http://127.0.0.1:5173/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('[data-app-startup-ready="true"]')&&window.useThemeStore?.persist?.hasHydrated(),{timeout:45000,polling:200});
  const result=await page.evaluate(async()=>{
   const {downloadCloudWallpaperPack}=await import('/src/utils/cloudWallpaperDownload.js');
   const {useThemeStore}=await import('/src/store/useThemeStore.js');
   const canvas=document.createElement('canvas');canvas.width=1920;canvas.height=1080;
   const ctx=canvas.getContext('2d');ctx.fillStyle='#366c80';ctx.fillRect(0,0,1920,1080);
   const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.85));
   const originalFetch=window.fetch;let phase=0;let attempts=0;
   const candidates=ids=>({query:{pages:Object.fromEntries(ids.map(id=>[id,{pageid:id,title:'File:Landscape photograph '+id+'.jpg',
      imageinfo:[{mime:'image/jpeg',width:1920,height:1080,size:blob.size,sha1:'test-'+id,url:'https://upload.wikimedia.org/original/'+id+'.jpg',thumburl:'https://upload.wikimedia.org/thumb/'+id+'.jpg',extmetadata:{LicenseShortName:{value:'CC BY-SA 4.0'},LicenseUrl:{value:'https://creativecommons.org/licenses/by-sa/4.0/'},Artist:{value:'<b>Visual QA</b>'}}}]}]))}});
   window.fetch=async(url,options)=>{
    if(String(url).startsWith('https://commons.wikimedia.org/w/api.php?')){
     const ids=phase===0?[1,2]:phase===1?Array.from({length:31},(_,i)=>i+1):Array.from({length:35},(_,i)=>i+32);
     return new Response(JSON.stringify(candidates(ids)),{headers:{'Content-Type':'application/json'}});
    }
    if(String(url).startsWith('https://upload.wikimedia.org/')){
     const id=Number(String(url).match(/(\d+)\.jpg$/)?.[1]);
     if(id===3&&attempts++===0)return new Response('',{status:503,headers:{'Retry-After':'1'}});
     return new Response(blob,{headers:{'Content-Type':'image/jpeg'}});
    }
    return originalFetch(url,options);
   };
   try{
    const partial=await downloadCloudWallpaperPack();
    const firstIds=partial.wallpapers.map(w=>w.sourceId);
    const pending=useThemeStore.getState().wallpaperPendingPackId;
    phase=1;
    const resumed=await downloadCloudWallpaperPack();
    const resumedIds=resumed.wallpapers.map(w=>w.sourceId);
    const completePending=useThemeStore.getState().wallpaperPendingPackId;
    await useThemeStore.getState().setActiveBackgroundId(resumed.wallpapers[0].id);
    phase=2;
    const fresh=await downloadCloudWallpaperPack();
    const freshIds=fresh.wallpapers.filter(w=>w.packId!==pending).map(w=>w.sourceId);
    const final=useThemeStore.getState();
    return {partial:partial.downloadedCount,partialPending:!!pending,firstIds,resumed:resumed.downloadedCount,resumedIds,completePending,fresh:fresh.downloadedCount,freshIds,
      activeRetained:final.downloadedWallpapers.some(w=>w.id===final.activeBackgroundId),
      allLocal:final.downloadedWallpapers.every(w=>w.isDownloaded&&/^data:image\//.test(w.url)&&w.artist==='Visual QA'),
      retries:attempts};
   }finally{window.fetch=originalFetch;}
  });
  assert.equal(result.partial,2);assert.equal(result.partialPending,true);
  assert.equal(result.resumed,30);assert.ok(result.firstIds.every(id=>result.resumedIds.includes(id)));
  assert.equal(new Set(result.resumedIds).size,30);assert.equal(result.completePending,null);
  assert.equal(result.fresh,30);assert.equal(new Set(result.freshIds).size,30);
  assert.ok(result.freshIds.every(id=>!result.resumedIds.includes(id)));
  assert.ok(result.activeRetained&&result.allLocal);assert.ok(result.retries>=2);
  console.log('PASS partial wallpaper pack resumes to 30, transient failures retry, fresh pack has unique IDs, selected offline image retained');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
