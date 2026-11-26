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
