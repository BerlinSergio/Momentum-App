/**
 * Momentum Locale Zustand Store
 * Manages active language, RTL state, and document synchronization
 * with non-destructive IndexedDB persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';
import i18n from '../i18n/config.js';
import {
  LOCALE_MAP,
  DEFAULT_LOCALE,
  isRtl,
  getDirection,
  syncDocumentLocale,
} from '../i18n/localeUtils.js';

const localeStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-locale-storage',
});

export const useLocaleStore = create(
  persist(
    (set, get) => ({
      currentLocale: DEFAULT_LOCALE,
      locale: DEFAULT_LOCALE, // Compatibility alias
      isRTL: false,
      direction: 'ltr',
      fontFamily: LOCALE_MAP[DEFAULT_LOCALE].fontFamily,
      fontClass: LOCALE_MAP[DEFAULT_LOCALE].fontClass,
      numberSystem: 'latn', // 'latn' | 'arabext'

      /**
       * Switch the active application language.
       * Synchronizes i18next and DOM document attributes immediately.
       * @param {string} localeCode ('en' | 'ps-AF' | 'fa-AF')
       */
      setLocale: (localeCode) => {
        const targetLocale = LOCALE_MAP[localeCode] ? localeCode : DEFAULT_LOCALE;
        const meta = LOCALE_MAP[targetLocale];
        const rtl = meta.dir === 'rtl';

        set({
          currentLocale: targetLocale,
          locale: targetLocale,
          isRTL: rtl,
          direction: meta.dir,
          fontFamily: meta.fontFamily,
          fontClass: meta.fontClass,
        });

        // Sync i18next
        try {
          i18n.changeLanguage(targetLocale);
        } catch (err) {
          console.warn('[LocaleStore] i18n changeLanguage failed:', err);
        }

        // Sync HTML document lang, dir, data-attributes
        syncDocumentLocale(targetLocale);
      },

      /**
       * Toggle or set the numeral display system.
       * @param {'latn' | 'arabext'} system
       */
      setNumberSystem: (system) => {
        const numberSystem=system==='arabext'?'arabext':'latn';
        if(typeof document!=='undefined')document.documentElement.dataset.numberSystem=numberSystem;
        return set({numberSystem});
      },

      /**
       * Initialize locale state on startup / rehydration.
       */
      initLocale: () => {
        const { currentLocale, numberSystem } = get();
        if(typeof document!=='undefined')document.documentElement.dataset.numberSystem=numberSystem==='arabext'?'arabext':'latn';
        const valid = LOCALE_MAP[currentLocale] ? currentLocale : DEFAULT_LOCALE;
        syncDocumentLocale(valid);
        try {
          if (i18n.language !== valid) {
            i18n.changeLanguage(valid);
          }
        } catch (err) {
          void err;
        }
      },
    }),
    {
      name: 'momentum-locale-storage',
      storage: createJSONStorage(() => localeStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initLocale();
        } else {
          syncDocumentLocale(DEFAULT_LOCALE);
        }
      },
    }
  )
);

if (typeof window !== 'undefined') {
  window.useLocaleStore = useLocaleStore;
  // Initialize on load
  const initial = useLocaleStore.getState().currentLocale || DEFAULT_LOCALE;
  syncDocumentLocale(initial);
}
