import q1 from './reflectionsQuarter1.js';
import q2 from './reflectionsQuarter2.js';
import q3 from './reflectionsQuarter3.js';
import q4 from './reflectionsQuarter4.js';
export const REFLECTIONS = Object.freeze([...q1,...q2,...q3,...q4]);
const chapters = [[1,7],[49,18],[55,78],[67,30],[76,31],[84,25],[87,19],[93,11],[94,8],[95,8],[96,19],[97,5],[98,8],[99,8],[100,11],[101,11],[102,8],[103,3],[104,9],[105,5],[106,4],[107,7],[108,3],[109,6],[110,3],[111,5],[112,4],[113,5],[114,6]];
export const VERSE_REFERENCES = Object.freeze(chapters.flatMap(([sura,count])=>Array.from({length:count},(_,i)=>Object.freeze({sura,aya:i+1}))));
export function civilDay(date=new Date(), timeZone) {
  const parts=new Intl.DateTimeFormat('en-US',{calendar:'gregory',numberingSystem:'latn',year:'numeric',month:'numeric',day:'numeric',...(timeZone?{timeZone}:{})}).formatToParts(date);
  const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));
  return Math.floor(Date.UTC(+p.year,+p.month-1,+p.day)/86400000);
}
export function dailyIndex(date=new Date(),timeZone) {
  const n=civilDay(date,timeZone)-Math.floor(Date.UTC(2026,0,1)/86400000);
  return ((n%365)+365)%365;
}
export function getDailyReflection(date=new Date(),locale='en',timeZone) {
  const index=dailyIndex(date,timeZone);
  const column=locale==='fa-AF'?1:locale==='ps-AF'?2:0;
  return {id:index+1,quote:REFLECTIONS[index][column],surah:'Momentum',category:'Reflection'};
}
export function getDailyVerseReference(date=new Date(),timeZone) { return VERSE_REFERENCES[dailyIndex(date,timeZone)]; }
