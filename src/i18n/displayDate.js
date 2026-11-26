import { getShamsiDate } from '../utils/afghanCalendar.js';
import { toEasternDigits, toLatinDigits, SHAMSI_MONTHS } from './formatters.js';

const WEEKDAYS = {
  'fa-AF': ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه'],
  'ps-AF': ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'],
};

export function displayDigits(value, numberSystem='latn') {
  const latin = toLatinDigits(String(value ?? '')).replace(/[٠-٩]/g,d=>String(d.charCodeAt(0)-0x660));
  return numberSystem==='arabext' ? toEasternDigits(latin) : latin;
}

export function formatHomeDate(date, locale='en', numberSystem='latn', timeZone, monthOnly=false) {
  if (locale==='fa-AF' || locale==='ps-AF') {
    const {jm,jd,weekdayIndex}=getShamsiDate(date,timeZone);
    const month=SHAMSI_MONTHS[locale][jm-1];
    return monthOnly ? month : displayDigits(`${WEEKDAYS[locale][weekdayIndex]}، ${jd} ${month}`,numberSystem);
  }
  return displayDigits(new Intl.DateTimeFormat('en-US',{
    timeZone,calendar:'gregory',numberingSystem:'latn',
    ...(monthOnly ? {month:'long'} : {weekday:'long',month:'short',day:'numeric'})
  }).format(date),numberSystem);
}

const GREGORIAN_MONTHS={
 'fa-AF':['جنوری','فبروری','مارچ','اپریل','می','جون','جولای','اگست','سپتمبر','اکتوبر','نومبر','دسمبر'],
 'ps-AF':['جنوري','فبروري','مارچ','اپرېل','مې','جون','جولای','اګست','سپتمبر','اکتوبر','نومبر','دسمبر'],
};
export function formatFinanceMonth(monthKey,locale='en',numberSystem='latn'){
 const m=/^(\d{4})-(\d{2})$/.exec(monthKey||'');
 if(!m||+m[2]<1||+m[2]>12)return '';
 const label=GREGORIAN_MONTHS[locale]?.[+m[2]-1]||new Intl.DateTimeFormat('en-US',{month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(+m[1],+m[2]-1,1)));
 return displayDigits(label+' '+m[1],numberSystem);
}
