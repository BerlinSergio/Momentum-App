import {processImageForStorage} from './wallpaperStorage.js';
import {useThemeStore} from '../store/useThemeStore.js';

let inFlight = null;
const IMAGE_FIELDS = ['thumbnail','thumbnailUrl','thumb','lightImage','darkImage','lightThumb','darkThumb','lightUrl','darkUrl','fallback'];
const isLocal = item => item?.isDownloaded === true && /^data:image\/(webp|jpeg|png);base64,/.test(item.url || '');

const TERMS=['mountain landscape','forest landscape','lake landscape','desert landscape','ocean sunset','night sky landscape','waterfall landscape','flower field'];
const isWikimediaUrl=value=>{try{return new URL(value).protocol==='https:'&&new URL(value).hostname==='upload.wikimedia.org';}catch{return false;}};
const textOnly=value=>{const node=document.createElement('template');node.innerHTML=String(value||'');return node.content.textContent.trim();};
async function fetchWithTimeout(url,options={},ms=25000) {
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),ms);
  try {
    const {asJson,...request}=options;
    const response=await fetch(url,{...request,signal:controller.signal,credentials:'omit'});
    if(!response.ok)throw Error('Online wallpaper request failed');
    return await (options.asJson?response.json():response.blob());
  }finally{clearTimeout(timer);}
}

export function commonsCandidates(data,seen=new Set()) {
  return Object.values(data?.query?.pages||{}).flatMap(page=>{
    const info=page.imageinfo?.[0], meta=info?.extmetadata||{};
    const license=textOnly(meta.LicenseShortName?.value);
    // Public-domain or CC0 images can be locally resized without adding
    // share-alike requirements. Keep the credit and original source anyway.
    if(!info || !/^(Public domain|CC0|CC0 1\.0)$/i.test(license) ||
      !/^image\/(jpeg|png|webp)$/.test(info.mime||'') ||
      Math.min(info.width||0,info.height||0)<900 ||
      Math.max(info.width||0,info.height||0)<1920 ||
      !isWikimediaUrl(info.thumburl)||seen.has(String(page.pageid)))return [];
    const name=String(page.title||'Nature wallpaper').replace(/^File:/,'').replace(/\.(jpg|jpeg|png|webp)$/i,'').replaceAll('_',' ');
    return [{id:'dl-commons-'+page.pageid,sourceId:String(page.pageid),sourceUrl:info.thumburl,
      sourcePage:'https://commons.wikimedia.org/?curid='+page.pageid,license,
      artist:textOnly(meta.Artist?.value),name,title:name,category:'Calm Nature',mood:'Nature photography',url:info.thumburl,
      lightGradient:'linear-gradient(135deg,#f8fafc,#e2e8f0)',darkGradient:'linear-gradient(135deg,#0f172a,#020617)'}];
  });
}

async function discover(seen) {
  const result=[], start=Math.floor(Math.random()*TERMS.length);
  for(let pass=0;pass<8&&result.length<42;pass++){
    const term=TERMS[(start+pass)%TERMS.length];
    const params=new URLSearchParams({action:'query',format:'json',origin:'*',generator:'search',
      gsrnamespace:'6',gsrsearch:term+' filetype:bitmap',gsrlimit:'50',
      gsroffset:String(Math.floor(Math.random()*8)*50),prop:'imageinfo',
      iiprop:'url|size|mime|extmetadata',iiurlwidth:'1920',iiextmetadatafilter:'LicenseShortName|Artist'});
    const data=await fetchWithTimeout('https://commons.wikimedia.org/w/api.php?'+params,{asJson:true});
    for(const item of commonsCandidates(data,seen)){seen.add(item.sourceId);result.push(item);}
  }
  return result.slice(0,42);
}

async function downloadOne(item) {
  const blob=await fetchWithTimeout(item.sourceUrl);
  if(!/^image\/(jpeg|png|webp)$/.test(blob.type)||!blob.size||blob.size>15*1024*1024)throw Error('Invalid image');
  const image=new Image(), temporaryUrl=URL.createObjectURL(blob);
  try{
    image.src=temporaryUrl;await image.decode();
    if(Math.max(image.naturalWidth,image.naturalHeight)<1280)throw Error('Image quality too low');
  }finally{URL.revokeObjectURL(temporaryUrl);}
  let dataUrl='';
  for(const quality of [0.85,0.76,0.67,0.58]){
    ({dataUrl}=await processImageForStorage(blob,1920,quality));
    if(dataUrl.length<=768*1024)break;
  }
  if(!/^data:image\/(webp|jpeg|png);base64,/.test(dataUrl)||dataUrl.length>768*1024)throw Error('Image cache limit exceeded');
  const result={...item,url:dataUrl,isDownloaded:true};
  for(const field of IMAGE_FIELDS)delete result[field];
  return result;
}

export function downloadCloudWallpaperPack() {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    const state=useThemeStore.getState();
    const previous=(state.downloadedWallpapers||[]).filter(isLocal);
    const seen=new Set([...(state.wallpaperSeenIds||[]),...previous.map(x=>x.sourceId).filter(Boolean)]);
    const candidates=await discover(seen);
    const output=[];
    let cursor=0;
    // A limited parallelism avoids flooding the public image host.
    await Promise.all(Array.from({length:2},async()=>{
      while(cursor<candidates.length&&output.length<30){
        const item=candidates[cursor++];
        try{const downloaded=await downloadOne(item);if(output.length<30)output.push(downloaded);}catch{}
      }
    }));
    if(!output.length)throw Error('No new wallpaper could be downloaded; existing wallpapers retained');
    const latest=useThemeStore.getState();
    const active=(latest.downloadedWallpapers||[]).find(x=>x.id===latest.activeBackgroundId&&isLocal(x));
    const next=active?[active,...output]:output;
    const saved=await state.setDownloadedWallpapers(next,output.map(x=>x.sourceId));
    if(saved!==true)throw Error('Wallpaper storage commit failed');
    return {wallpapers:next,newCount:output.length,downloadedCount:output.length,failed:30-output.length,total:30};
  })().finally(()=>{inFlight=null;});
  return inFlight;
}
