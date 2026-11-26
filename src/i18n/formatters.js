/**
 * Momentum Locale Formatters
 * Formats numbers, dates, currencies, and calendar strings according to the active locale.
 */

import { LOCALE_MAP, DEFAULT_LOCALE } from './localeUtils.js';

// Afghan Solar Hijri (Shamsi) Months
export const SHAMSI_MONTHS = {
  'en': [
    'Hamal', 'Sawr', 'Jawza', 'Saratan', 'Asad', 'Sonbola',
    'Mizan', 'Aqrab', 'Qaws', 'Jadi', 'Dalwa', 'Hoot'
  ],
  'fa-AF': [
    'حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله',
    'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'
  ],
  'ps-AF': [
    'وری', 'غوی', 'غبرګولی', 'چنګاښ', 'زمری', 'وږی',
    'تله', 'لړم', 'لیندۍ', 'مرغومی', 'سلواغه', 'کب'
  ]
};

// Islamic Lunar Hijri Months
export const HIJRI_MONTHS = {
  'en': [
    'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'
  ],
  'fa-AF': [
    'محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی',
    'جمادی‌الاول', 'جمادی‌الثانی', 'رجب', 'شعبان',
    'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'
  ],
  'ps-AF': [
    'محرم', 'صفر', 'ربیع الاول', 'ربیع الثاني',
    'جمادي الاول', 'جمادي الثاني', 'رجب', 'شعبان',
    'رمضان', 'شوال', 'ذی القعده', 'ذی الحجه'
  ]
};

// Eastern Arabic / Perso-Arabic digit maps
const LATIN_TO_ARABIC_EXT = {
  '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
  '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
};

const ARABIC_EXT_TO_LATIN = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
};

/**
 * Converts Latin digits in a string to Eastern Arabic / Perso-Arabic digits.
 * @param {string|number} value
 * @returns {string}
 */
export function toEasternDigits(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[0-9]/g, (digit) => LATIN_TO_ARABIC_EXT[digit] || digit);
}

/**
 * Converts Eastern Arabic digits to Latin digits.
 * @param {string} value
 * @returns {string}
 */
export function toLatinDigits(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[۰-۹٠-٩]/g,digit=>ARABIC_EXT_TO_LATIN[digit] || String(digit.charCodeAt(0)-0x660));
}

/**
 * Format a number using the locale and numeral preference.
 * @param {number} num
 * @param {string} localeCode
 * @param {Object} options
 * @returns {string}
 */
export function formatNumber(num, localeCode = DEFAULT_LOCALE, options = {}) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  const { useEasternDigits = false, numberingSystem = useEasternDigits?'arabext':'latn', minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;

  const bcp47 = LOCALE_MAP[localeCode]?.bcp47 || 'en-US';
  try {
    let formatted = new Intl.NumberFormat(bcp47, {
      minimumFractionDigits,
      maximumFractionDigits,
      numberingSystem: numberingSystem==='arabext'?'arabext':'latn',
    }).format(num);

    if (numberingSystem==='arabext') {
      return toEasternDigits(formatted);
    }
    return formatted;
  } catch (err) {
    void err;
    return numberingSystem==='arabext'?toEasternDigits(num):String(num);
  }
}

/**
 * Format currency amount with currency code/symbol.
 * @param {number} amount
 * @param {string} currencyCode ('AFN', 'USD', etc.)
 * @param {string} localeCode
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = 'AFN', localeCode = DEFAULT_LOCALE) {
  const num = typeof amount === 'number' ? amount : Number(amount) || 0;
  const formattedNum = num.toLocaleString(localeCode === 'en' ? 'en-US' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (currencyCode === 'AFN') {
    if (localeCode === 'ps-AF') return `${formattedNum} افغانۍ`;
    if (localeCode === 'fa-AF') return `${formattedNum} افغانی`;
    return `${formattedNum} AFN`;
  }

  if (currencyCode === 'USD') return `$${formattedNum}`;
  if (currencyCode === 'EUR') return `€${formattedNum}`;
  return `${formattedNum} ${currencyCode}`;
}

/**
 * Format a Date object with locale-aware day, month, year.
 * @param {Date|string|number} date
 * @param {string} localeCode
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export function formatDate(date, localeCode = DEFAULT_LOCALE, options = {}) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';

  const bcp47 = LOCALE_MAP[localeCode]?.bcp47 || 'en-US';
  const defaultOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(bcp47, defaultOptions).format(d);
  } catch (err) {
    void err;
    return d.toDateString();
  }
}

/**
 * Format a time string (e.g. HH:mm or 12h format).
 * @param {Date|string} date
 * @param {string} localeCode
 * @param {boolean} is24Hour
 * @returns {string}
 */
export function formatTime(date, localeCode = DEFAULT_LOCALE, is24Hour = false) {
  if (!date) return '';
  let d;
  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'string' && date.includes(':')) {
    const [hh, mm] = date.split(':');
    d = new Date();
    d.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
  } else {
    d = new Date(date);
  }

  if (isNaN(d.getTime())) return '';
  const bcp47 = LOCALE_MAP[localeCode]?.bcp47 || 'en-US';

  try {
    return new Intl.DateTimeFormat(bcp47, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !is24Hour,
    }).format(d);
  } catch (err) {
    void err;
    return d.toLocaleTimeString();
  }
}
