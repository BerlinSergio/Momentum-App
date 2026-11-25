import {generateWallpaperBatch} from '../data/defaultWallpapers.js';
import {processImageForStorage} from './wallpaperStorage.js';
import {useThemeStore} from '../store/useThemeStore.js';

let inFlight = null;
const IMAGE_FIELDS = ['thumbnail','thumbnailUrl','thumb','lightImage','darkImage','lightThumb','darkThumb','lightUrl','darkUrl','fallback'];
const isLocal = item => item?.isDownloaded === true && /^data:image\/(webp|jpeg|png);base64,/.test(item.url || '');

async function downloadOne(item) {
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(),15000);
  try {
    const sourceUrl = item.lightImage || item.url;
    const response = await fetch(sourceUrl,{signal:controller.signal,credentials:'omit'});
    if (!response.ok) throw new Error('Image request failed');
    const blob = await response.blob();
    if (!blob.type.startsWith('image/') || !blob.size || blob.size>5*1024*1024) throw new Error('Invalid image');
    // Decode before persisting; never label a remote URL as downloaded.
    const image = new Image();
    const temporaryUrl = URL.createObjectURL(blob);
    try {
      image.src=temporaryUrl;
      await image.decode();
      if (!image.naturalWidth || !image.naturalHeight) throw new Error('Image decode failed');
    } finally {URL.revokeObjectURL(temporaryUrl);}
    const {dataUrl} = await processImageForStorage(blob,720,0.65);
    if (!/^data:image\/(webp|jpeg|png);base64,/.test(dataUrl) || dataUrl.length > 256*1024) throw new Error('Image cache limit exceeded');
    const result = {...item,sourceUrl,url:dataUrl,isDownloaded:true};
    for (const field of IMAGE_FIELDS) delete result[field];
    return result;
  } finally {clearTimeout(timeout);}
}

export function downloadCloudWallpaperPack() {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    const candidates = generateWallpaperBatch('cloud-catalog');
    const previous = useThemeStore.getState().downloadedWallpapers || [];
    const cached = new Map(previous.filter(isLocal).map(item=>[item.id,item]));
    const output = new Array(candidates.length);
    let cursor=0,newCount=0,failed=0;
    await Promise.all(Array.from({length:3},async()=>{
      while(cursor<candidates.length) {
        const index=cursor++;
        const item=candidates[index];
        if(cached.has(item.id)) {output[index]=cached.get(item.id);continue;}
        try {output[index]=await downloadOne(item);newCount++;}
        catch(error){failed++;output[index]={...item,isDownloaded:false};}
      }
    }));
    if (!newCount && !cached.size) throw new Error('No wallpaper could be downloaded');
    await useThemeStore.getState().setDownloadedWallpapers(output);
    return {wallpapers:output,newCount,downloadedCount:output.filter(isLocal).length,failed,total:output.length};
  })().finally(()=>{inFlight=null;});
  return inFlight;
}
