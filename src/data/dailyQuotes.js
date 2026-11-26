import {REFLECTIONS,dailyIndex,getDailyReflection,civilDay} from './dailyInspiration.js';
export const DAILY_QUOTES=REFLECTIONS.map((q,i)=>({id:i+1,quote:q[0],surah:'Momentum',category:'Reflection'}));
export function getDayOfYear(date=new Date()){return civilDay(date)-civilDay(new Date(date.getFullYear(),0,1))+1;}
export function getDailyQuoteIndex(date=new Date(),timeZone){return dailyIndex(date,timeZone);}
export function getDailyQuote(date=new Date(),locale='en',timeZone){return getDailyReflection(date,locale,timeZone);}
