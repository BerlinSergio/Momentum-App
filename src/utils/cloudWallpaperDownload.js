import {processImageForStorage} from './wallpaperStorage.js';
import {useThemeStore} from '../store/useThemeStore.js';
let inFlight=null;
const TARGET=30;
const TERMS=['mountain landscape photograph','forest landscape photograph','lake landscape photograph','desert landscape photograph','ocean sunset photograph','waterfall photograph','flower field photograph','coast landscape photograph','national park landscape photograph','river landscape photograph','green valley photograph','snow mountain photograph'];
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const isLocal=item=>item?.isDownloaded===true&&/^data:image\/(webp|jpeg|png);base64,/.test(item.url||'');
const isWikimediaUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&u.hostname==='upload.wikimedia.org';}catch{return false;}};
const textOnly=value=>{const node=document.createElement('template');node.innerHTML=String(value||'');return node.content.textContent.trim();};
const permittedLicense=name=>/^(Public domain|CC0(?: 1\.0)?|CC BY(?:-SA)? (?:2\.0|2\.5|3\.0|4\.0))$/i.test(name);
async function fetchWithRetry(url,asJson=false){
  let error;
  for(let attempt=0;attempt<3;attempt++){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),22000);
    try{
      const response=await fetch(url,{signal:controller.signal,credentials:'omit'});
      if(response.ok)return await (asJson?response.json():response.blob());
      if(response.status===429||response.status===503){
        const seconds=Number(response.headers.get('Retry-After'));
        // Respect long rate limits by stopping instead of hammering the host.
        if(seconds>20)throw Object.assign(Error('Wallpaper source rate limited'),{stop:true});
        await wait(Math.max(1500,Number.isFinite(seconds)?seconds*1000:0,2000*(attempt+1)));
      }else if(response.status===404||response.status===403)throw Object.assign(Error('Image unavailable'),{permanent:true});
      else throw Error('Wallpaper HTTP '+response.status);
    }catch(e){error=e;if(e.stop||e.permanent)throw e;if(attempt<2)await wait(1000*(attempt+1));}
    finally{clearTimeout(timer);}
  }
  throw error||Error('Download failed');
}
export function commonsCandidates(data,seen=new Set()){
  return Object.values(data?.query?.pages||{}).flatMap(page=>{
    const info=page.imageinfo?.[0],meta=info?.extmetadata||{};
    const license=textOnly(meta.LicenseShortName?.value),sourceId=String(page.pageid);
    const hash=String(info?.sha1||'');
    const rawTitle=String(page.title||'Nature wallpaper');
    if(!info||!Number.isInteger(page.pageid)||!permittedLicense(license)||
      !/^image\/(jpeg|png|webp)$/.test(info.mime||'')||
      Math.min(info.width||0,info.height||0)<800||Math.max(info.width||0,info.height||0)<1920||
      (!isWikimediaUrl(info.thumburl)&&!isWikimediaUrl(info.url))||seen.has(sourceId)||(hash&&seen.has('sha1:'+hash))||
      /\b(painting|illustration|drawing|stained glass|map|poster|engraving|logo)\b/i.test(rawTitle))return [];
    const name=rawTitle.replace(/^File:/,'').replace(/\.(jpg|jpeg|png|webp)$/i,'').replaceAll('_',' ');
    const artist=textOnly(meta.Artist?.value);
    const licenseUrl=textOnly(meta.LicenseUrl?.value);
    if(/^CC BY/i.test(license)&&(!artist||!/^https?:\/\/creativecommons\.org\//i.test(licenseUrl)))return [];
    return [{id:'dl-commons-'+sourceId,sourceId,sourceHash:hash,sourceUrl:info.thumburl||info.url,
      originalUrl:isWikimediaUrl(info.url)&&info.size<=12*1024*1024?info.url:null,
      sourcePage:'https://commons.wikimedia.org/?curid='+sourceId,license,licenseUrl,artist,
      name,title:name,category:'Calm Nature',mood:'Nature photography',
      lightGradient:'linear-gradient(135deg,#f8fafc,#e2e8f0)',darkGradient:'linear-gradient(135deg,#0f172a,#020617)'}];
  });
}
async function discoverPage(term,offset,seen){
  const params=new URLSearchParams({action:'query',format:'json',origin:'*',generator:'search',gsrnamespace:'6',
    gsrsearch:term+' filetype:bitmap',gsrlimit:'50',gsroffset:String(offset),prop:'imageinfo',
    iiprop:'url|size|mime|sha1|extmetadata',iiurlwidth:'1920',
    iiextmetadatafilter:'LicenseShortName|LicenseUrl|Artist'});
  return commonsCandidates(await fetchWithRetry('https://commons.wikimedia.org/w/api.php?'+params,true),seen);
}
async function downloadOne(item){
  let blob;
  // Try the standardized thumbnail first and a bounded original only if necessary.
  try{blob=await fetchWithRetry(item.sourceUrl);}catch(e){if(e.stop||!item.originalUrl||item.originalUrl===item.sourceUrl)throw e;blob=await fetchWithRetry(item.originalUrl);}
  if(!/^image\/(jpeg|png|webp)$/.test(blob.type)||!blob.size||blob.size>15*1024*1024)throw Error('Invalid image');
  const image=new Image(),temp=URL.createObjectURL(blob);
  try{image.src=temp;await image.decode();if(Math.max(image.naturalWidth,image.naturalHeight)<1280||Math.min(image.naturalWidth,image.naturalHeight)<650)throw Error('Image quality too low');}finally{URL.revokeObjectURL(temp);}
  let dataUrl='';
  for(const quality of [0.85,0.76,0.67,0.58]){({dataUrl}=await processImageForStorage(blob,1920,quality));if(dataUrl.length<=768*1024)break;}
  if(!/^data:image\/(webp|jpeg|png);base64,/.test(dataUrl)||dataUrl.length>768*1024)throw Error('Image cache limit exceeded');
  const {originalUrl,...metadata}=item;
  return {...metadata,url:dataUrl,isDownloaded:true,modified:true};
}
export function downloadCloudWallpaperPack(onProgress){
 if(inFlight)return inFlight;
 inFlight=(async()=>{
  const state=useThemeStore.getState();
  const previous=(state.downloadedWallpapers||[]).filter(isLocal);
  // If the last request was incomplete, continue that pack instead of
  // discarding the files already downloaded successfully.
  const packId=state.wallpaperPendingPackId||('pack-'+Date.now());
  const output=state.wallpaperPendingPackId?previous.filter(x=>x.packId===packId):[];
  const seen=new Set([...(state.wallpaperSeenIds||[]),...previous.flatMap(x=>[x.sourceId,x.sourceHash?'sha1:'+x.sourceHash:null]).filter(Boolean)]);
  const fetched=[];
  let stopped=false;
  const start=Math.floor(Math.random()*TERMS.length);
  const deadline=Date.now()+240000;
  const progress=()=>{try{onProgress?.({downloaded:output.length,total:TARGET});}catch{}};
  progress();
  for(let pass=0;pass<24&&output.length<TARGET&&!stopped&&Date.now()<deadline;pass++){
    let candidates;
    try{candidates=await discoverPage(TERMS[(start+pass)%TERMS.length],Math.floor(pass/TERMS.length)*50,seen);}catch(e){if(e.stop)break;continue;}
    for(const item of candidates){
      if(output.length>=TARGET||Date.now()>=deadline)break;
      if(seen.has(item.sourceId)||(item.sourceHash&&seen.has('sha1:'+item.sourceHash)))continue;
      seen.add(item.sourceId);if(item.sourceHash)seen.add('sha1:'+item.sourceHash);
      try{
        const downloaded={...await downloadOne(item),packId};
        output.push(downloaded);fetched.push(downloaded);progress();
      }catch(e){if(e.stop){stopped=true;break;}}
      await wait(250);
    }
  }
  if(!fetched.length&&!output.length)throw Error('No new wallpaper could be downloaded; existing wallpapers retained');
  const latest=useThemeStore.getState();
  const active=(latest.downloadedWallpapers||[]).find(x=>x.id===latest.activeBackgroundId&&isLocal(x));
  const next=active&&!output.some(x=>x.id===active.id)?[active,...output]:output;
  const newIds=fetched.flatMap(x=>[x.sourceId,x.sourceHash?'sha1:'+x.sourceHash:null]).filter(Boolean);
  const saved=await latest.setDownloadedWallpapers(next,newIds,output.length<TARGET?packId:null);
  if(saved!==true)throw Error('Wallpaper storage commit failed');
  return {wallpapers:next,newCount:fetched.length,downloadedCount:output.length,failed:TARGET-output.length,total:TARGET};
 })().finally(()=>{inFlight=null;});
 return inFlight;
}
