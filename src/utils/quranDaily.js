import {Capacitor, CapacitorHttp} from '@capacitor/core';
const editions={
  en:{key:'english_rwwad',author:'Rowwad Translation Center'},
  'fa-AF':{key:'dari_badkhashani',author:'مولوی محمد انور بدخشانی'},
  'ps-AF':{key:'pashto_sarfaraz',author:'مولوي جان باز سرفراز'},
};
const cacheKey='momentum-quran-verse-cache-v1';
const maxEntries=120;
function readCache(){try{return JSON.parse(localStorage.getItem(cacheKey)||'{}')||{}}catch{return {}}}
function writeCache(key,value){try{const c=readCache();delete c[key];c[key]=value;const keys=Object.keys(c);for(const k of keys.slice(0,Math.max(0,keys.length-maxEntries)))delete c[k];localStorage.setItem(cacheKey,JSON.stringify(c));}catch{}}
export function validateVerse(payload,sura,aya){
  const v=payload?.result;
  if(!v||Number(v.sura)!==sura||Number(v.aya)!==aya||typeof v.translation!=='string'||!v.translation.trim()||typeof v.arabic_text!=='string'||!v.arabic_text.trim())throw Error('Invalid QuranEnc response');
  return {arabic:v.arabic_text,ayah:v.translation,footnotes:typeof v.footnotes==='string'?v.footnotes:''};
}
async function fetchJson(url){
  const ctrl=new AbortController();const timeout=setTimeout(()=>ctrl.abort(),15000);
  try{const response=await fetch(url,{signal:ctrl.signal});if(!response.ok)throw Error('HTTP '+response.status);return await response.json();}
  catch(e){if(!Capacitor.isNativePlatform())throw e;const r=await CapacitorHttp.get({url,connectTimeout:12000,readTimeout:15000});if(r.status!==200)throw Error('HTTP '+r.status);return typeof r.data==='string'?JSON.parse(r.data):r.data;}
  finally{clearTimeout(timeout);}
}
export async function loadDailyVerse({sura,aya},locale='en'){
  if(!Number.isInteger(sura)||sura<1||sura>114||!Number.isInteger(aya)||aya<1||aya>286)throw Error('Invalid verse reference');
  const edition=editions[locale]||editions.en;
  const key=edition.key+':'+sura+':'+aya;
  const cached=readCache()[key];
  try{
    const data=await fetchJson('https://quranenc.com/api/v1/translation/aya/'+edition.key+'/'+sura+'/'+aya);
    const v={...validateVerse(data,sura,aya),surah:'Quran '+sura+':'+aya,suraNumber:sura,ayaNumber:aya,locale:editions[locale]?locale:'en',author:edition.author,translationKey:edition.key,sourceUrl:'https://quranenc.com/'+(locale==='fa-AF'?'fa':locale==='ps-AF'?'ps':'en')+'/browse/'+edition.key+'/'+sura,source:'QuranEnc'};
    writeCache(key,v);return v;
  }catch(e){if(cached?.suraNumber===sura&&cached?.ayaNumber===aya&&cached?.translationKey===edition.key&&typeof cached.ayah==='string'&&typeof cached.arabic==='string')return cached;throw e;}
}
