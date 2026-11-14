import React from 'react';
import UserAvatar from './components/UserAvatar';
import { useProfileStore } from './store/useProfileStore';
import { useThemeStore } from './store/useThemeStore';
import useSecurityStore from './store/useSecurityStore';
import { useNavigationStore } from './store/useNavigationStore';
import {
  ArrowLeft, ChevronRight, MapPin, Palette, ShieldCheck, Bell, Info, CheckCircle2
} from 'lucide-react';

export default function SettingsProfileLightMode({ setActiveTab, goBack }) {
  const profile = useProfileStore();
  const currentTheme = useThemeStore((s) => s.theme);
  const isAppLockActive = useSecurityStore((s) => s.isAppLockActive);

  // ─── Unified Navigation ─────────────────────────────────────────────────────
  const navigateTo = (target) => {
    if (setActiveTab) {
      setActiveTab(target);
    } else {
      useNavigationStore.getState().navigateTo(target);
    }
  };

  const handleBack = () => {
    if (goBack) goBack('more_light_mode');
    else if (setActiveTab) setActiveTab('more_light_mode');
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
    <div className="min-h-screen bg-[#F8FAFC] pb-36 font-sans text-slate-900">
      {/* ── TOP HEADER BAR ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Settings &amp; Profile</h1>
        </div>
      </div>

      {/* ── TOP COMPACT PROFILE CARD ────────────────────────────────────────── */}
      <div
        onClick={() => navigateTo('edit_profile_light_mode')}
        className="block mx-5 my-4 p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm cursor-pointer pointer-events-auto transition-all active:scale-[0.99] hover:border-slate-300 select-none"
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
                <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug whitespace-nowrap">{displayName}</h2>
                <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20 shrink-0" />
              </div>
              <p className="text-xs font-normal text-slate-500 leading-snug mt-0.5 whitespace-nowrap">Personal profile &amp; credentials</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigateTo('edit_profile_light_mode'); }}
            aria-label="Edit Profile"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer pointer-events-auto flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── SECTION HEADER: SYSTEM & PREFERENCES ──────────────────────────── */}
      <div className="px-5 mb-3 mt-6">
        <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">System &amp; Preferences</span>
      </div>

      {/* ── 5 SINGLE-ROW CATEGORY CARDS ────────────────────────────────────── */}
      <div className="space-y-3 px-5 mb-6">

        {/* 1. Location & Timezone */}
        <div
          onClick={() => navigateTo('city_selection_light_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:border-emerald-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap">Location &amp; Timezone</span>
              <span className="text-[12px] text-slate-500 leading-tight whitespace-nowrap">City &amp; prayer coordinates</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-600">{locationSummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>
        </div>

        {/* 2. Appearance & Visuals */}
        <div
          onClick={() => navigateTo('appearance_light_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:border-indigo-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap">Appearance &amp; Visuals</span>
              <span className="text-[12px] text-slate-500 leading-tight whitespace-nowrap">Theme, colors &amp; wallpapers</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-indigo-600">{appearanceSummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>
        </div>

        {/* 3. Security & App Lock */}
        <div
          onClick={() => navigateTo('app_lock_light_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:border-teal-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap">Security &amp; App Lock</span>
              <span className="text-[12px] text-slate-500 leading-tight whitespace-nowrap">PIN code &amp; biometric vault</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-teal-600">{securitySummary}</span>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>
        </div>

        {/* 4. Notifications & Alerts */}
        <div
          onClick={() => navigateTo('notifications_settings_light_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:border-amber-500/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap">Notifications &amp; Alerts</span>
              <span className="text-[12px] text-slate-500 leading-tight whitespace-nowrap">Adhan &amp; daily reminders</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>
        </div>

        {/* 5. About Momentum */}
        <div
          onClick={() => navigateTo('about_momentum_light_mode')}
          className="flex items-center justify-between w-full p-4 rounded-3xl active:scale-[0.98] transition-all cursor-pointer pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:border-blue-400/30 select-none"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 pr-2">
              <span className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight whitespace-nowrap">About Momentum</span>
              <span className="text-[12px] text-slate-500 leading-tight whitespace-nowrap">Version, philosophy &amp; legal</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-normal text-slate-400">v1.0</span>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>
        </div>

      </div>

      {/* ── SUBTLE BRANDING FOOTER ─────────────────────────────────────────── */}
      <div className="px-5 text-center pt-2 pb-6">
        <p className="text-[11px] font-medium text-slate-400">
          Momentum • Version 1.0 • Crafted for intentional living
        </p>
      </div>
    </div>
  );
}
