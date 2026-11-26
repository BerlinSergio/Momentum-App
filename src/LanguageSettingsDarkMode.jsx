import React from 'react';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Globe, Sparkles, Hash, Languages, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from './store/useLocaleStore';
import { SUPPORTED_LOCALES } from './i18n/localeUtils';
import { toast } from './components/ui/toast/index.js';

/**
 * Premium Responsive Language Settings Screen (Dark Mode)
 * Allows real-time switching between Simple English, Afghan Pashto, and Afghan Dari.
 * Features responsive glassmorphism, readable typography, and numeral system configuration.
 */
export default function LanguageSettingsDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const numberSystem = useLocaleStore((s) => s.numberSystem);
  const setNumberSystem = useLocaleStore((s) => s.setNumberSystem);

  const handleBack = () => {
    if (goBack) goBack('settings_profile_dark_mode');
    else if (setActiveTab) setActiveTab('settings_profile_dark_mode');
    else window.history.back();
  };

  const handleSelectLocale = (code) => {
    if (code === currentLocale) return;
    setLocale(code);
    const selected = SUPPORTED_LOCALES.find((l) => l.code === code);
    toast.success(t('toasts.languageUpdated', { lang: selected ? selected.nativeName : code }));
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-28 relative overflow-x-hidden">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── STICKY TOP HEADER BAR ── */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-testid="language-settings-back-btn"
            onClick={handleBack}
            aria-label={t('common.back')} className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/70 transition-all cursor-pointer pointer-events-auto active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180 transition-transform" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{t('settings.language')}</span>
              <span className="text-[10px] font-mono font-normal uppercase px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                {currentLocale}
              </span>
            </h1>
            <p className="text-xs text-slate-400">{t('settings.chooseLanguage')}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-sm shadow-primary/20">
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
          className="p-4 sm:p-5 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg flex items-start gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xs font-bold text-white tracking-wide uppercase">
              {t('settings.languageNoticeTitle', { defaultValue: 'Seamless Localization' })}
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              {t('settings.languageNotice')}
            </p>
          </div>
        </motion.div>

        {/* ── LANGUAGE LIST ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('settings.chooseLanguage')}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
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
                      ? 'bg-primary/20 border-primary shadow-xl shadow-primary/15 ring-1 ring-primary/40'
                      : 'bg-black/40 hover:bg-slate-900/60 border-white/10 hover:border-white/20 shadow-md'
                  }`}
                >
                  {/* Active highlight glow */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="flex items-center gap-4 min-w-0 z-10">
                    {/* Badge Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-tr from-primary to-orange-500 text-white shadow-lg shadow-primary/30'
                          : 'bg-slate-800/90 text-slate-300 border border-white/5'
                      }`}
                    >
                      {locale.code === 'en' ? 'EN' : locale.code === 'ps-AF' ? 'پښ' : 'دری'}
                    </div>

                    {/* Language Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-base sm:text-lg font-bold text-white tracking-tight ${isPashto ? 'font-pashto' : isDari ? 'font-dari' : 'font-sans'}`}>
                          {locale.nativeName}
                        </span>
                        {locale.code !== 'en' && (
                          <span className="text-xs text-slate-400 font-normal">
                            ({locale.name})
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">
                          {locale.dir.toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-xs text-slate-400 mt-1 truncate ${isPashto ? 'font-pashto' : isDari ? 'font-dari' : 'font-sans'}`}>
                        {locale.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Radio Selection State */}
                  <div className="z-10 pl-2 rtl:pr-2 rtl:pl-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-md shadow-primary/30'
                          : 'border-2 border-slate-700 bg-transparent'
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            {t('settings.numeralsTitle')}
          </span>
          <div className="p-4 sm:p-5 rounded-3xl bg-black/40 border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center border border-white/5">
                  <Hash className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {t('settings.numeralSystem')}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {numberSystem === 'arabext'
                      ? t('settings.numeralEastern')
                      : t('settings.numeralWestern')}
                  </div>
                </div>
              </div>

              {/* Segmented Switcher */}
              <div className="flex items-center bg-slate-900/90 rounded-2xl p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setNumberSystem('latn')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    numberSystem === 'latn'
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  123
                </button>
                <button
                  type="button"
                  onClick={() => setNumberSystem('arabext')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-dari ${
                    numberSystem === 'arabext'
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'text-slate-400 hover:text-white'
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
