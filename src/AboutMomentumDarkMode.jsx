import UserAvatar from './components/UserAvatar';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { 
  Info, 
  ArrowLeft, 
  Compass, 
  BadgeCheck, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Type, 
  Globe, 
  Palette, 
  Shield, 
  ChevronRight 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutMomentumDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            aria-label={t('common.back', 'Go back')}
            onClick={() => (goBack ? goBack('settings_profile_dark_mode') : (setActiveTab ? setActiveTab('settings_profile_dark_mode') : window.history.back()))}
            className="p-2 -ms-2 rounded-full text-slate-300 hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180 transition-transform" />
          </button>
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('about.aboutMomentum', 'About Momentum')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </MomentumGlassHeader>

      <main className="flex flex-col flex-1 relative w-full pb-safe bg-transparent">
        <div className="w-full max-w-md mx-auto px-4 py-4 space-y-6 pb-36 select-none relative">
          {/* Ambient Background Glow Accents */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary-container/10 blur-[100px] pointer-events-none -z-10" />
          <div className="absolute top-[480px] right-0 w-64 h-64 rounded-full bg-secondary-container/10 blur-[90px] pointer-events-none -z-10" />
          <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-tertiary-container/10 blur-[110px] pointer-events-none -z-10" />

          {/* 1. App Identity Hero Section */}
          <section className="flex flex-col items-center justify-center text-center pt-4 relative">
            {/* Radiant Brand Emblem */}
            <div className="relative group cursor-pointer mt-2 mb-3">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary opacity-40 blur-lg group-hover:opacity-75 transition-opacity duration-700" />
              <img 
                src="/logo.png" 
                alt={t('common.logoAlt', 'Momentum Logo')} 
                className="relative w-24 h-24 object-cover rounded-3xl aspect-square flex-shrink-0 shadow-2xl shadow-primary-container/20 active:scale-95 transition-transform duration-300 mx-auto"
              />
            </div>

            {/* Wordmark & Philosophy */}
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              Momentum
            </h2>

            <div className="w-fit max-w-[92%] mx-auto mt-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-sm text-center">
              <p className="text-center text-sm leading-relaxed text-slate-100 font-medium">
                {t('about.sacredTimePhilosophy', 'Where sacred time meets mindful living.')}
              </p>
            </div>

            {/* Version Release Pill */}
            <div className="mx-auto inline-flex items-center justify-center gap-2 mt-3 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="text-xs text-slate-200 uppercase tracking-wider font-semibold">
                {t('about.versionBuild', 'VERSION 1.0 (BUILD 2026)')}
              </span>
            </div>
          </section>

          {/* 2. Authorship & Vision Card */}
          <section>
            <div className="relative overflow-hidden rounded-2xl p-5 bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-start gap-3.5 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-tertiary mt-0.5">
                  <Compass className="w-5 h-5 text-tertiary" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs text-tertiary font-bold tracking-widest uppercase">
                    {t('about.visionCraft', 'Vision & Craft')}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5 leading-snug">
                    {t('about.createdBy', 'Created by Milad Wardak')}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {t('about.traditionDesign', 'Bridging timeless Islamic tradition with modern, mindful design.')}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold shadow-xs">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{t('about.designerTag', 'DESIGNER • MILAD WARDAK 2026')}</span>
                </span>
              </div>
            </div>
          </section>

          {/* 3. Core Philosophy Section */}
          <section>
            <div className="w-fit flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h3 className="text-xs text-slate-100 uppercase tracking-widest font-bold">
                {t('about.corePhilosophy', 'Core Philosophy')}
              </h3>
            </div>

            <div className="flex flex-col space-y-3">
              {/* Card 1 */}
              <div className="p-4 sm:p-5 rounded-2xl transition-colors duration-200 bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-secondary mt-0.5">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {t('about.triCalendarHarmony', 'Tri-Calendar Harmony')}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed break-words">
                      {t('about.triCalendarDesc', 'Unified flow of Gregorian, Hijri, and Afghan Solar calendars.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 sm:p-5 rounded-2xl transition-colors duration-200 bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-primary mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {t('about.privateSanctuary', 'Private Local Sanctuary')}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed break-words">
                      {t('about.privateSanctuaryDesc', 'Your sacred journals, financial records, and personal habit data are stored locally and privately on your device. No trackers, no data monetization.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 sm:p-5 rounded-2xl transition-colors duration-200 bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-amber-400 mt-0.5">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {t('about.atmosphericPresence', 'Atmospheric Presence')}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed break-words">
                      {t('about.atmosphericPresenceDesc', 'Adaptive themes crafted for visual calm and eye comfort.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Open Source & Craft Section */}
          <section>
            <div className="w-fit flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <h3 className="text-xs text-slate-100 uppercase tracking-widest font-bold">
                {t('about.openSourceCraft', 'Open Source & Craft')}
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-xl divide-y divide-white/5">
              {/* Row 1 */}
              <div className="flex items-center justify-between p-4 px-5 hover:bg-white/5 transition-colors gap-3">
                <div className="flex items-center gap-3 min-w-0 shrink">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-white">
                    <Type className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm text-white font-semibold truncate">
                    {t('about.typography', 'Typography')}
                  </span>
                </div>
                <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-white/10 border border-white/10 shrink-0 text-end shadow-xs">
                  {t('about.typographyDesc', 'Inter & Space Grotesk')}
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between p-4 px-5 hover:bg-white/5 transition-colors gap-3">
                <div className="flex items-center gap-3 min-w-0 shrink">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-secondary">
                    <Globe className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-xs sm:text-sm text-white font-semibold truncate">
                    {t('about.astronomicalEngine', 'Astronomical Engine')}
                  </span>
                </div>
                <span className="text-xs font-semibold text-secondary px-3 py-1 rounded-full bg-white/10 border border-white/10 shrink-0 text-end shadow-xs">
                  {t('about.astronomicalEngineDesc', 'PrayTimes & Umm al-Qura')}
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between p-4 px-5 hover:bg-white/5 transition-colors gap-3">
                <div className="flex items-center gap-3 min-w-0 shrink">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-tertiary">
                    <Palette className="w-4 h-4 text-tertiary" />
                  </div>
                  <span className="text-xs sm:text-sm text-white font-semibold truncate">
                    {t('about.designSystem', 'Design System')}
                  </span>
                </div>
                <span className="text-xs font-semibold text-tertiary px-3 py-1 rounded-full bg-white/10 border border-white/10 shrink-0 text-end shadow-xs">
                  {t('about.designSystemDesc', 'Luminous Serenity Nocturne')}
                </span>
              </div>
            </div>
          </section>

          {/* 5. Sanctuary & Trust Section */}
          <section>
            <div className="w-fit flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <h3 className="text-xs text-slate-100 uppercase tracking-widest font-bold">
                {t('about.sanctuaryTrust', 'Sanctuary & Trust')}
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
              <div className="w-full flex items-center justify-between p-4 px-5 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm text-white font-semibold truncate">
                    {t('about.zeroTracking', 'Privacy Sanctuary (Zero Data Tracking)')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors shrink-0 ms-2 rtl:rotate-180" />
              </div>
            </div>
          </section>

          {/* 6. Footer Section */}
          <footer className="flex flex-col items-center justify-center text-center w-full mt-auto pt-4 pb-8">
            {/* Dual Accent */}
            <div className="flex items-center justify-center gap-2 mb-2 text-primary/80">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs tracking-widest text-slate-100 uppercase font-bold">
                {t('about.mindfulFocus', 'Mindful Focus')}
              </span>
              <Sparkles className="w-4 h-4" />
            </div>

            {/* Closing Quote */}
            <p className="text-xs text-slate-300 italic max-w-xs mx-auto leading-relaxed">
              {t('about.craftedWithPeace', '“Crafted with peace for intentional minds everywhere.”')}
            </p>

            {/* Copyright */}
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {t('about.allRightsReserved', '© 2026 Momentum App • All Rights Reserved.')}
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
