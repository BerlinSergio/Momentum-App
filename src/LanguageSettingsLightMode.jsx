import React from 'react';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Globe, Sparkles, Hash, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from './store/useLocaleStore';
import { SUPPORTED_LOCALES } from './i18n/localeUtils';
import { toast } from './components/ui/toast/index.js';

/**
 * Premium Responsive Language Settings Screen (Light Mode)
 * Allows real-time switching between Simple English, Afghan Pashto, and Afghan Dari.
 * Features responsive glassmorphism, readable typography, and numeral system configuration.
 */
export default function LanguageSettingsLightMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const numberSystem = useLocaleStore((s) => s.numberSystem);
  const setNumberSystem = useLocaleStore((s) => s.setNumberSystem);

  const handleBack = () => {
    if (goBack) goBack('settings_profile_light_mode');
    else if (setActiveTab) setActiveTab('settings_profile_light_mode');
    else window.history.back();
  };

  const handleSelectLocale = (code) => {
    if (code === currentLocale) return;
    setLocale(code);
    const selected = SUPPORTED_LOCALES.find((l) => l.code === code);
    toast.success(t('toasts.languageUpdated', { lang: selected ? selected.nativeName : code }));
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans select-none pb-28 relative overflow-x-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── STICKY TOP HEADER BAR ── */}
      <MomentumGlassHeader isDarkMode={false}>
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-testid="language-settings-back-btn"
            onClick={handleBack}
            aria-label={t('common.back')} className="p-2 -ml-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer pointer-events-auto active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180 transition-transform" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t('settings.language')}</span>
              <span className="text-[10px] font-mono font-normal uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {currentLocale}
              </span>
            </h1>
            <p className="text-xs text-slate-500">{t('settings.chooseLanguage')}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
          <Languages className="w-5 h-5" />
        </div>
      </MomentumGlassHeader>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="flex-1 px-4 sm:px-6 pt-6 space-y-6 max-w-2xl mx-auto w-full relative z-10">
        {/* ── INTENTIONAL NOTICE BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-md flex items-start gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              {t('settings.languageNoticeTitle', { defaultValue: 'Seamless Localization' })}
            </h2>
            <p className="text-xs leading-relaxed text-slate-600">
              {t('settings.languageNotice')}
            </p>
          </div>
        </motion.div>

        {/* ── LANGUAGE LIST ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('settings.chooseLanguage')}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              3 {t('common.all', { defaultValue: 'Languages' })}
            </span>
          </div>
          <div className="space-y-3">
            {SUPPORTED_LOCALES.map((locale) => {
              const isSelected = currentLocale === locale.code;
              const isPashto = locale.code === 'ps-AF';
              const isDari = locale.code === 'fa-AF';

              return (
                <motion.button
                  key={locale.code}
                  type="button"
                  data-locale-code={locale.code}
                  onClick={() => handleSelectLocale(locale.code)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-3xl transition-all cursor-pointer pointer-events-auto border text-left rtl:text-right relative overflow-hidden ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/30'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Active highlight glow */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="flex items-center gap-4 min-w-0 z-10">
                    {/* Badge Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-tr from-primary to-orange-500 text-white shadow-md shadow-primary/25'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {locale.code === 'en' ? 'EN' : locale.code === 'ps-AF' ? 'پښ' : 'دری'}
                    </div>

                    {/* Language Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-base sm:text-lg font-bold text-slate-900 tracking-tight ${isPashto ? 'font-pashto' : isDari ? 'font-dari' : 'font-sans'}`}>
                          {locale.nativeName}
                        </span>
                        {locale.code !== 'en' && (
                          <span className="text-xs text-slate-500 font-normal">
                            ({locale.name})
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {locale.dir.toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-xs text-slate-500 mt-1 truncate ${isPashto ? 'font-pashto' : isDari ? 'font-dari' : 'font-sans'}`}>
                        {locale.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Radio Selection State */}
                  <div className="z-10 pl-2 rtl:pr-2 rtl:pl-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-md shadow-primary/25'
                          : 'border-2 border-slate-300 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── NUMBER FORMAT PREFERENCE ── */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            {t('settings.numeralsTitle')}
          </span>
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                  <Hash className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {t('settings.numeralSystem')}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {numberSystem === 'arabext'
                      ? t('settings.numeralEastern')
                      : t('settings.numeralWestern')}
                  </div>
                </div>
              </div>

              {/* Segmented Switcher */}
              <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setNumberSystem('latn')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    numberSystem === 'latn'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  123
                </button>
                <button
                  type="button"
                  onClick={() => setNumberSystem('arabext')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-dari ${
                    numberSystem === 'arabext'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ۱۲۳
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
