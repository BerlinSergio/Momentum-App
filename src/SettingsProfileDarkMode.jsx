import UserAvatar from './components/UserAvatar';
import { useProfileStore } from './store/useProfileStore';
import { useThemeStore } from './store/useThemeStore';
import useSecurityStore from './store/useSecurityStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from './store/useLocaleStore';
import { SUPPORTED_LOCALES } from './i18n/localeUtils';
import {
  ArrowLeft, ChevronRight, MapPin, Palette, ShieldCheck, Bell, Info, CheckCircle2, HardDrive, Compass, Globe
} from 'lucide-react';

export default function SettingsProfileDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const profile = useProfileStore();
  const currentTheme = useThemeStore((s) => s.theme);
  const isAppLockActive = useSecurityStore((s) => s.isAppLockActive);
  const currentLocale = useLocaleStore((s) => s.currentLocale);
  const currentLocaleMeta = SUPPORTED_LOCALES.find((l) => l.code === currentLocale) || SUPPORTED_LOCALES[0];
  const languageSummary = currentLocaleMeta.nativeName;

  // ─── Unified Navigation ─────────────────────────────────────────────────────
  const navigateTo = (target) => {
    if (setActiveTab) {
      setActiveTab(target);
    } else {
      useNavigationStore.getState().navigateTo(target);
    }
  };

  const handleBack = () => {
    if (goBack) goBack('more_dark_mode');
    else if (setActiveTab) setActiveTab('more_dark_mode');
    else window.history.back();
  };

  // ─── Capitalized User Name ──────────────────────────────────────────────────
  const rawName = (profile.fullName || '').trim();
  const displayName = !rawName || rawName.toLowerCase() === 'milad wardak'
    ? 'Milad Wardak'
    : rawName;

  // ─── Clean, Compact Module Values (No title crush) ──────────────────────────
  const cityDisplay = (profile.city || 'Kabul').split(',')[0].trim();
  const locationSummary = cityDisplay;
  const appearanceSummary = currentTheme === 'dark' ? 'Dark' : 'Light';
  const securitySummary = isAppLockActive ? 'Active' : 'Off';

  return (
    <div className="min-h-screen bg-[#0B0F19] pb-36 font-sans text-white">
      {/* ── TOP HEADER BAR (Hidden on desktop since DesktopSidebar provides branding & navigation) ── */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex lg:hidden items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t('common.back', 'Go back')}
            className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('settings.profileSettings', 'Settings & Profile')}
          </h1>
        </div>
      </div>

      {/* ── TOP COMPACT PROFILE CARD ────────────────────────────────────────── */}
      <div
        onClick={() => navigateTo('edit_profile_dark_mode')}
        className="block mx-5 lg:mx-0 my-4 p-5 rounded-[24px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer pointer-events-auto transition-all active:scale-[0.99] hover:border-white/20 select-none"
      >
        <div className="flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <UserAvatar
              size="w-16 h-16"
              textSize="text-xl"
              setActiveTab={setActiveTab}
            />
            <div className="flex flex-col justify-center min-w-0 flex-1 pr-2">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-white tracking-tight leading-snug whitespace-nowrap">{displayName}</h2>
                <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20 shrink-0" />
              </div>
              <p className="text-xs font-normal text-slate-400 leading-snug mt-0.5 whitespace-nowrap">{t('settings.personalProfileDesc', 'Personal profile & credentials')}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigateTo('edit_profile_dark_mode'); }}
            aria-label={t('settings.editProfile', 'Edit Profile')}
            className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer pointer-events-auto flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── SECTION HEADER: SYSTEM & PREFERENCES ──────────────────────────── */}
      <div className="px-5 lg:px-0 mb-3 mt-6">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">{t('settings.systemPreferences', 'System & Preferences')}</span>
      </div>

      {/* ── 5 SINGLE-ROW CATEGORY CARDS ────────────────────────────────────── */}
      <div className="space-y-3 px-5 lg:px-0 mb-6">

        {/* 1. Location & Timezone */}
        <div
          onClick={() => navigateTo('city_selection_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-emerald-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.locationTimezone', 'Location & Timezone')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.cityPrayerCoordinates', 'City & prayer coordinates')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-400">{locationSummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

        {/* 2. Appearance & Visuals */}
        <div
          onClick={() => navigateTo('appearance_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-indigo-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.appearance')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.appearanceThemeDesc', 'Theme, colors & wallpapers')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-indigo-400">{appearanceSummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0 rtl:rotate-180" />
          </div>
        </div>

        {/* 2.5 Language & Localization */}
        <div
          data-testid="settings-language-row"
          onClick={() => navigateTo('language_settings_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-blue-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.language', 'Language & Localization')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.chooseLanguage', 'Choose display language & script')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-blue-400">{languageSummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0 rtl:rotate-180" />
          </div>
        </div>

        {/* 3. Security & App Lock */}
        <div
          onClick={() => navigateTo('app_lock_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-teal-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.security', 'Security & App Lock')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.securityLockDesc', 'PIN code & biometric lock')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-teal-400">{securitySummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

        {/* 4. Backup & Data Recovery */}
        <div
          onClick={() => navigateTo('backup_restore_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-emerald-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.backupRestore', 'Backup & Data Recovery')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.backupRecoveryDesc', 'Encrypted backup & cross-device restore')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

        {/* 4. Notifications & Alerts */}
        <div
          onClick={() => navigateTo('notifications_settings_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-amber-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.notifications', 'Notifications & Alerts')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.notificationAlertsDesc', 'Adhan & daily reminders')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

        {/* 5. About Momentum */}
        <div
          onClick={() => navigateTo('about_momentum_dark_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl hover:border-blue-400/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-primary/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.aboutMomentum', 'About Momentum')}</span>
              <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.aboutMomentumDesc', 'Version, philosophy & legal')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-normal text-slate-400">v1.0</span>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
        </div>

      </div>

      {/* ── SECTION: DEVELOPER TOOLS (DEV ONLY) ───────────────────────────── */}
      {Boolean(import.meta.env.DEV) && (
        <>
          <div className="px-5 lg:px-0 mb-3 mt-6 flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-primary uppercase">{t('settings.developerTools', 'Developer Tools')}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">{t('settings.devOnly', 'DEV ONLY')}</span>
          </div>

          <div className="space-y-3 px-5 lg:px-0 mb-6">
            <div
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('momentum:open-dev-navigator'));
                }
              }}
              data-testid="dev-screen-navigator-entry"
              className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-primary/30 shadow-xl hover:border-primary/60 select-none"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-2xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
                  <span className="text-[15px] font-semibold text-slate-100 tracking-tight leading-tight whitespace-nowrap">{t('settings.screenNavigator', 'Screen Navigator')}</span>
                  <span className="text-[12px] text-slate-400 leading-tight whitespace-nowrap">{t('settings.screenNavigatorDesc', 'Browse and switch between all application screens')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-xs font-semibold text-primary">{t('common.open', 'Open')}</span>
                <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── SUBTLE BRANDING FOOTER ─────────────────────────────────────────── */}
      <div className="px-5 text-center pt-2 pb-6">
        <p className="text-[11px] font-medium text-slate-500">
          {t('settings.craftedForLiving', 'Momentum • Version 1.0 • Crafted for intentional living')}
        </p>
      </div>
    </div>
  );
}
