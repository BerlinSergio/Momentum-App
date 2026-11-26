import {useState,useEffect} from 'react';
import {Bookmark,Sparkles,RefreshCw} from 'lucide-react';
import {useLocaleStore} from '../store/useLocaleStore';
import {usePrayerStore} from '../store/usePrayerStore';
import {getDailyVerseReference,getDailyReflection} from '../data/dailyInspiration.js';
import {loadDailyVerse} from '../utils/quranDaily.js';
import {displayDigits} from '../i18n/displayDate.js';
import {toast} from './ui/toast/index.js';
const words={
en:{verse:'Verse of the day',quote:'Daily reflection',loading:'Loading verified translation…',offline:'Translation unavailable. Connect to the internet and try again.',retry:'Try again',saved:'Saved verses & inspirations',empty:'No saved verses yet.',save:'Save verse',remove:'Remove saved verse',footnotes:'Translation notes',source:'Translation',old:'Previously saved text (original saved language)',error:'Could not save safely.'},
'fa-AF':{verse:'آیت روز',quote:'اندیشهٔ روز',loading:'در حال دریافت ترجمهٔ معتبر…',offline:'ترجمه در دسترس نیست. به اینترنت وصل شوید و دوباره تلاش کنید.',retry:'تلاش دوباره',saved:'آیات و نوشته‌های ذخیره‌شده',empty:'هنوز آیتی ذخیره نشده است.',save:'ذخیرهٔ آیت',remove:'حذف آیت ذخیره‌شده',footnotes:'یادداشت‌های ترجمه',source:'ترجمه',old:'متن قبلاً ذخیره‌شده (به زبان قبلی)',error:'ذخیره نشد.'},
'ps-AF':{verse:'د ورځې آیت',quote:'د ورځې فکر',loading:'معتبره ژباړه ترلاسه کېږي…',offline:'ژباړه نشته. انټرنېټ سره ونښلئ او بیا هڅه وکړئ.',retry:'بیا هڅه',saved:'خوندي شوي آیتونه او لیکنې',empty:'لا کوم آیت نه دی خوندي شوی.',save:'آیت خوندي کړئ',remove:'خوندي آیت لرې کړئ',footnotes:'د ژباړې یادښتونه',source:'ژباړه',old:'مخکې خوندي شوی متن (په پخوانۍ ژبه)',error:'خوندي نه شو.'}};
const surface='momentum-neutral-card rounded-2xl border border-slate-200 dark:border-white/10 p-4 min-w-0';
function useVerse(ref,locale){
 const [result,setResult]=useState({key:'',status:'loading'});const [attempt,setAttempt]=useState(0);
 const key=ref?ref.sura+':'+ref.aya+':'+locale:'';
 useEffect(()=>{if(!ref)return;let alive=true;setResult({key,status:'loading'});loadDailyVerse(ref,locale).then(v=>alive&&setResult({key,status:'ready',v}),()=>alive&&setResult({key,status:'error'}));return()=>{alive=false};},[key,attempt]);
 return {...(result.key===key?result:{status:'loading'}),retry:()=>setAttempt(n=>n+1)};
}
function VerseText({v,w,numberSystem}){
 return <><p dir="rtl" lang="ar" className="text-lg leading-loose break-words">{v.arabic}</p><p dir="auto" className="mt-2 text-sm leading-relaxed whitespace-pre-wrap break-words">{v.ayah}</p><div className="mt-2 text-xs opacity-75">{displayDigits(v.surah,numberSystem)} · {w.source}: {v.author} · <a href={v.sourceUrl} target="_blank" rel="noreferrer" className="underline">QuranEnc</a></div>{v.footnotes&&<details className="mt-2 text-xs"><summary>{w.footnotes}</summary><p className="whitespace-pre-wrap">{v.footnotes}</p></details>}</>;
}
function SavedVerse({quote,locale,w,numberSystem,onRemove}){
 const ref=Number.isInteger(quote.suraNumber)&&Number.isInteger(quote.ayaNumber)?{sura:quote.suraNumber,aya:quote.ayaNumber}:null;
 const translated=useVerse(ref&&quote.locale!==locale?ref:null,locale);
 const v=ref&&quote.locale!==locale?translated.v:ref?quote:null;
 return <article className="border border-primary/15 rounded-xl p-3 min-w-0"><div className="flex justify-end"><button type="button" onClick={()=>onRemove(quote)} aria-label={w.remove}><Bookmark size={16} className="fill-current text-primary"/></button></div>{v?<VerseText v={v} w={w} numberSystem={numberSystem}/>:<><p className="text-xs opacity-70">{w.old}</p><p dir="auto" className="text-sm break-words">{quote.ayah}</p><p className="text-xs">{quote.surah}</p>{ref&&translated.status==='error'&&<button onClick={translated.retry} className="text-primary text-xs">{w.retry}</button>}</>}</article>;
}
export function DailyReflectionCard({date,timeZone}){
 const locale=useLocaleStore(s=>s.currentLocale);const w=words[locale]||words.en;const q=getDailyReflection(date,locale,timeZone);
 return <section className={surface+' mb-4'} data-testid="daily-reflection"><h3 className="text-primary text-xs font-bold flex items-center gap-2"><Sparkles size={16}/>{w.quote}</h3><p dir="auto" className="text-sm leading-relaxed mt-2 break-words">{q.quote}</p><p className="text-xs opacity-60 mt-2">Momentum</p></section>;
}
export default function DailyInspirationPanel({date,timeZone}){
 const locale=useLocaleStore(s=>s.currentLocale);const numberSystem=useLocaleStore(s=>s.numberSystem);const w=words[locale]||words.en;
 const ref=getDailyVerseReference(date,timeZone);const data=useVerse(ref,locale);
 const saved=usePrayerStore(s=>s.savedInspirations)||[];const [open,setOpen]=useState(false);
 const bookmarked=saved.some(x=>x.id===data.v?.surah);
 const toggle=async q=>{try{await usePrayerStore.getState().toggleSavedInspiration(q);}catch{toast.error(w.error);}};
 return <div className="mx-5 mb-5 space-y-3 min-w-0"><section className={surface} data-testid="daily-verse"><div className="flex items-center justify-between mb-3"><h3 className="text-primary text-xs font-bold flex gap-2 items-center"><Sparkles size={16}/>{w.verse}</h3><button disabled={!data.v} aria-label={w.save} aria-pressed={bookmarked} data-testid="save-daily-inspiration" onClick={()=>toggle(data.v)} className="disabled:opacity-30"><Bookmark size={18} className={bookmarked?'fill-current text-primary':''}/></button></div>{data.v?<VerseText v={data.v} w={w} numberSystem={numberSystem}/>:<div className="text-sm"><p>{data.status==='error'?w.offline:w.loading}</p><p className="text-xs opacity-70 mt-2">Quran {displayDigits(ref.sura+':'+ref.aya,numberSystem)}</p>{data.status==='error'&&<button className="text-primary mt-2 flex items-center gap-1" onClick={data.retry}><RefreshCw size={14}/>{w.retry}</button>}</div>}</section><DailyReflectionCard date={date} timeZone={timeZone}/><section className={surface} data-testid="saved-inspirations"><button type="button" onClick={()=>setOpen(!open)} aria-expanded={open} className="w-full text-sm flex justify-between gap-2 font-bold"><span>{w.saved}</span><span>{displayDigits(saved.length,numberSystem)} {open?'−':'+'}</span></button>{open&&<div className="space-y-2 mt-3">{saved.length?saved.map(q=><SavedVerse key={q.id} quote={q} locale={locale} w={w} numberSystem={numberSystem} onRemove={toggle}/>):<p className="text-xs">{w.empty}</p>}</div>}</section></div>;
}
