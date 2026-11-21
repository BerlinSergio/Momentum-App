/**
 * Momentum i18next Configuration
 * Bundles offline translations for English (en), Afghan Pashto (ps-AF), and Afghan Dari (fa-AF).
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import psAF from '../locales/ps-AF.json';
import faAF from '../locales/fa-AF.json';
import { DEFAULT_LOCALE } from './localeUtils.js';

export const resources = {
  en: { translation: en },
  'ps-AF': { translation: psAF },
  'fa-AF': { translation: faAF },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
