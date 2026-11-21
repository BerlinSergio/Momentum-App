/**
 * Momentum Internationalization Subsystem
 * Unified export point for i18n instance, React hooks, store, utils, and formatters.
 */

import i18n from './config.js';

export { default as i18n } from './config.js';
export { useTranslation, Trans } from 'react-i18next';
export { useLocaleStore } from '../store/useLocaleStore.js';

export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_MAP,
  isRtl,
  getDirection,
  getLocaleFontFamily,
  syncDocumentLocale,
} from './localeUtils.js';

export {
  SHAMSI_MONTHS,
  HIJRI_MONTHS,
  toEasternDigits,
  toLatinDigits,
  formatNumber,
  formatCurrency,
  formatDate,
  formatTime,
} from './formatters.js';

/**
 * Convenient standalone translator function bound to the active i18n instance.
 * @param {string} key
 * @param {Object} [options]
 * @returns {string}
 */
export const t = (key, options) => i18n.t(key, options);

export default i18n;
