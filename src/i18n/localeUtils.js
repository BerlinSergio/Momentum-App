/**
 * Momentum Internationalization - Locale Utilities & Configuration
 * Provides locale constants, RTL detection, and font-family helpers.
 */

export const SUPPORTED_LOCALES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    subtitle: 'Everyday Simple English',
    dir: 'ltr',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontClass: 'font-sans',
    numberSystem: 'latn',
    bcp47: 'en-US',
  },
  {
    code: 'ps-AF',
    name: 'Pashto',
    nativeName: 'پښتو',
    subtitle: 'افغان پښتو (رسمي لیکدود)',
    dir: 'rtl',
    fontFamily: "'Noto Sans Arabic', system-ui, -apple-system, sans-serif",
    fontClass: 'font-pashto',
    numberSystem: 'latn', // default standard numerals with optional eastern switch
    bcp47: 'ps-AF',
  },
  {
    code: 'fa-AF',
    name: 'Dari',
    nativeName: 'دری',
    subtitle: 'فارسی دری افغانستان',
    dir: 'rtl',
    fontFamily: "'Vazirmatn', system-ui, -apple-system, sans-serif",
    fontClass: 'font-dari',
    numberSystem: 'latn',
    bcp47: 'fa-AF',
  },
];

export const DEFAULT_LOCALE = 'en';

export const LOCALE_MAP = Object.freeze(
  SUPPORTED_LOCALES.reduce((acc, locale) => {
    acc[locale.code] = locale;
    return acc;
  }, {})
);

/**
 * Returns true if the given locale code is right-to-left.
 * @param {string} localeCode
 * @returns {boolean}
 */
export function isRtl(localeCode = DEFAULT_LOCALE) {
  const locale = LOCALE_MAP[localeCode];
  return locale ? locale.dir === 'rtl' : false;
}

/**
 * Returns 'rtl' or 'ltr' based on the locale code.
 * @param {string} localeCode
 * @returns {'rtl' | 'ltr'}
 */
export function getDirection(localeCode = DEFAULT_LOCALE) {
  return isRtl(localeCode) ? 'rtl' : 'ltr';
}

/**
 * Returns the CSS font-family string configured for the locale.
 * @param {string} localeCode
 * @returns {string}
 */
export function getLocaleFontFamily(localeCode = DEFAULT_LOCALE) {
  const locale = LOCALE_MAP[localeCode];
  return locale ? locale.fontFamily : LOCALE_MAP[DEFAULT_LOCALE].fontFamily;
}

/**
 * Synchronizes HTML document attributes (lang, dir, and font dataset)
 * to match the active locale.
 * @param {string} localeCode
 */
export function syncDocumentLocale(localeCode = DEFAULT_LOCALE) {
  if (typeof document === 'undefined') return;

  const validLocale = LOCALE_MAP[localeCode] ? localeCode : DEFAULT_LOCALE;
  const dir = getDirection(validLocale);

  document.documentElement.setAttribute('lang', validLocale);
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.dataset.locale = validLocale;
  document.documentElement.dataset.direction = dir;

  // Sync body styling if needed
  if (document.body) {
    document.body.setAttribute('dir', dir);
    if (dir === 'rtl') {
      document.body.classList.add('rtl-layout');
      document.body.classList.remove('ltr-layout');
    } else {
      document.body.classList.add('ltr-layout');
      document.body.classList.remove('rtl-layout');
    }
  }
}
