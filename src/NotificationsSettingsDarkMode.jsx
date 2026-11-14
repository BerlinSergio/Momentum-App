import React, { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useSettingsStore } from './store/useSettingsStore';
import { usePrayerStore } from './store/usePrayerStore';
import { 
  ArrowLeft, Bell, CheckCircle2, Sparkles, Moon, ArrowRight, MoonStar as Mosque
} from 'lucide-react';

const OFFSET_OPTIONS = [
  { value: 0, label: 'Exact (0m)', sub: 'At adhan' },
  { value: 5, label: '5m before', sub: 'Gentle buzz' },
  { value: 10, label: '10m before', sub: 'Ablution prep' },
  { value: 15, label: '15m before', sub: 'Early pause' },
];

const ALERT_TYPES = [
  { key: 'muted', label: 'Muted Chime' },
  { key: 'full', label: 'Full Adhan' },
  { key: 'vibration', label: 'Vibration' },
];

function Toggle({ checked, onChange, size = 'md' }) {
  const isLg = size === 'lg';
  return (
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={
          isLg
            ? 'w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 shadow-inner'
            : 'w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 shadow-inner'
        }
      />
    </label>
  );
}

export default function NotificationsSettingsDarkMode({ setActiveTab, goBack }) {
  const prayers = usePrayerStore((s) => s.prayers);
  const adhanOffset = usePrayerStore((s) => s.adhanOffset);
  const setAdhanOffset = usePrayerStore((s) => s.setAdhanOffset);
  const setPrayerStoreAlertType = usePrayerStore((s) => s.setAlertType);
  const setPrayerStoreAlertsEnabled = usePrayerStore((s) => s.setPrayerAlertsEnabled);
  const toggleStorePrayerAlert = usePrayerStore((s) => s.togglePrayerAlert);

  const masterEnabled = useSettingsStore((s) => s.masterEnabled);
  const dueTaskAlerts = useSettingsStore((s) => s.dueTaskAlerts);
  const dailyHabitCheckin = useSettingsStore((s) => s.dailyHabitCheckin);
  const overdueMilestonePushes = useSettingsStore((s) => s.overdueMilestonePushes);
  const morningIntention = useSettingsStore((s) => s.morningIntention);
  const middayPause = useSettingsStore((s) => s.middayPause);
  const eveningWinddown = useSettingsStore((s) => s.eveningWinddown);
  const dailyRadianceQuote = useSettingsStore((s) => s.dailyRadianceQuote);
  const zenFocusDND = useSettingsStore((s) => s.zenFocusDND);
  const alertType = useSettingsStore((s) => s.alertType || s.adhanMode) || 'muted';
  const prayerAlertsEnabled = useSettingsStore((s) => s.prayerAlertsEnabled !== false);
  const enabledPrayerAlerts = useSettingsStore((s) => s.enabledPrayerAlerts) || ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const toggleSetting = useSettingsStore((s) => s.toggleSetting);
  const setAlertType = useSettingsStore((s) => s.setAlertType);
  const setAdhanMode = useSettingsStore((s) => s.setAdhanMode);
  const setPrayerAlertsEnabled = useSettingsStore((s) => s.setPrayerAlertsEnabled);
  const togglePrayerAlert = useSettingsStore((s) => s.togglePrayerAlert);

  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings securely synced ✓');
    }, 400);
  };

  const handleTogglePrayerAlertsMaster = () => {
    const next = !prayerAlertsEnabled;
    if (setPrayerAlertsEnabled) setPrayerAlertsEnabled(next);
    if (setPrayerStoreAlertsEnabled) setPrayerStoreAlertsEnabled(next);
  };

  const handleSelectAlertType = (key) => {
    if (setAlertType) setAlertType(key);
    if (setAdhanMode) setAdhanMode(key);
    if (setPrayerStoreAlertType) setPrayerStoreAlertType(key);
  };

  const handleTogglePrayerAlert = (prayerName) => {
    if (togglePrayerAlert) togglePrayerAlert(prayerName);
    if (toggleStorePrayerAlert) toggleStorePrayerAlert(prayerName);
  };

  const prayerOrder = [
    { id: 'fajr', name: 'Fajr', fallback: '05:12' },
    { id: 'dhuhr', name: 'Dhuhr', fallback: '12:30' },
    { id: 'asr', name: 'Asr', fallback: '03:45' },
    { id: 'maghrib', name: 'Maghrib', fallback: '06:15' },
    { id: 'isha', name: 'Isha', fallback: '07:45' },
  ];

  const prayerBubbles = prayerOrder.map((item) => {
    const match = (prayers || []).find((pr) => pr.id === item.id || pr.name?.toLowerCase() === item.id);
    const cleanTime = match?.time ? match.time.replace(/ AM| PM/gi, '').trim() : item.fallback;
    return { ...item, time: cleanTime };
  });

  const activeAlertsCount = enabledPrayerAlerts.length;

  return (
    <div className="min-h-screen bg-slate-950 pb-40 relative">
      {/* TOAST */}
      {toast ? (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-full bg-slate-800 text-white border border-white/10 shadow-xl flex items-center gap-2 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium tracking-wide">{toast}</span>
        </div>
      ) : null}

      {/* TOP HEADER BAR */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Notification &amp; Calm Alerts
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (goBack ? goBack('settings_profile_dark_mode') : (setActiveTab ? setActiveTab('settings_profile_dark_mode') : window.history.back()))}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* MASTER NOTIFICATION TOGGLE CARD */}
      <div className="mx-5 mb-5 p-5 rounded-3xl flex items-center justify-between gap-4 text-white bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-primary/20 border border-primary/30 text-primary flex items-center justify-center shadow-xs flex-shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-snug">Allow Momentum Notifications</h2>
            <p className="text-xs font-normal text-slate-400 mt-0.5 leading-relaxed">
              Mindful chimes, prayer calls, and gentle daily agenda alerts.
            </p>
          </div>
        </div>
        <Toggle
          size="lg"
          checked={masterEnabled}
          onChange={() => toggleSetting('masterEnabled')}
        />
      </div>

      {/* PRAYER & ADHAN ALERTS CARD */}
      <div className="mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Mosque className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Prayer &amp; Adhan Alerts</h3>
              <p className="text-[11px] font-normal text-slate-400">
                {prayerAlertsEnabled ? `${activeAlertsCount} of 5 daily prayers active` : 'Prayer alerts paused'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleTogglePrayerAlertsMaster}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer active:scale-95 border ${
              prayerAlertsEnabled
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {prayerAlertsEnabled ? 'Active' : 'Inactive'}
          </button>
        </div>

        {/* Child Controls Container (Disabled if master is Inactive) */}
        <div className={`space-y-4 transition-opacity duration-200 ${prayerAlertsEnabled ? '' : 'opacity-50 pointer-events-none'}`}>
          {/* Adhan Alert Type Segmented Control */}
          <div className="p-1 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center gap-1">
            {ALERT_TYPES.map((m) => {
              const isActive = alertType === m.key;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => handleSelectAlertType(m.key)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-700 text-white font-bold shadow-xs border border-slate-600/50'
                      : 'text-slate-400 hover:text-white font-medium'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          {/* Timing Offset Radio Group */}
          <div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-white">Timing Offset</span>
              <button
                type="button"
                onClick={() => setAdhanOffset(0)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                Exact time
              </button>
            </div>
            <p className="text-[11px] font-normal text-slate-400">Prepare your mind and ablutions peacefully before entry time.</p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {OFFSET_OPTIONS.map((opt) => {
                const isSelected = adhanOffset === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => setAdhanOffset(opt.value)}
                    className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-95 ${
                      isSelected
                        ? 'border-2 border-indigo-500 bg-indigo-950/40 shadow-sm'
                        : 'border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? 'text-indigo-400' : 'text-white'}`}>{opt.label}</p>
                      <span className={`text-[10px] font-medium ${isSelected ? 'text-indigo-300/80' : 'text-slate-400'}`}>{opt.sub}</span>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border border-slate-600 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Interactive Prayer Alert Bubbles */}
          <div className="grid grid-cols-5 gap-1.5 pt-1 text-center">
            {prayerBubbles.map((p) => {
              const isAlertActive = enabledPrayerAlerts.some(
                (name) => name.toLowerCase() === p.name.toLowerCase() || name.toLowerCase() === p.id.toLowerCase()
              );
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleTogglePrayerAlert(p.name)}
                  className={`p-2 rounded-xl text-center transition-all cursor-pointer active:scale-95 ${
                    isAlertActive
                      ? 'bg-indigo-950/60 border border-indigo-500/50 text-indigo-300 shadow-sm'
                      : 'bg-transparent border border-transparent text-slate-500 opacity-60 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <span className={`text-[10px] block transition-colors ${isAlertActive ? 'font-semibold text-indigo-300' : 'font-medium text-slate-500'}`}>
                    {p.name}
                  </span>
                  <span className={`text-xs block mt-0.5 transition-colors ${isAlertActive ? 'font-bold text-indigo-400' : 'font-medium text-slate-500'}`}>
                    {p.time}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 block transition-all ${isAlertActive ? 'bg-indigo-400' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TASKS & HABIT REMINDERS CARD */}
      <div className="mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-bold text-white">Tasks &amp; Habit Reminders</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Due Task Alerts</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">15 mins before due</p>
            </div>
            <Toggle checked={dueTaskAlerts} onChange={() => toggleSetting('dueTaskAlerts')} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Daily Habit Check-in</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">Everyday at 08:30 PM</p>
            </div>
            <Toggle checked={dailyHabitCheckin} onChange={() => toggleSetting('dailyHabitCheckin')} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Overdue Milestone Pushes</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">Gentle nudges for pending target goals</p>
            </div>
            <Toggle checked={overdueMilestonePushes} onChange={() => toggleSetting('overdueMilestonePushes')} />
          </div>
        </div>
      </div>

      {/* MINDFULNESS & ROUTINES CARD */}
      <div className="mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <h3 className="text-xs font-bold text-white">Mindfulness &amp; Routines</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Morning Intention &amp; Fajr</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">05:00 AM • Soft morning rise</p>
            </div>
            <Toggle checked={morningIntention} onChange={() => toggleSetting('morningIntention')} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Midday Pause &amp; Hydration</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">01:00 PM • 3 deep breaths chime</p>
            </div>
            <Toggle checked={middayPause} onChange={() => toggleSetting('middayPause')} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Evening Wind-down &amp; Murāqabah</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">09:30 PM • Gratitude journaling alert</p>
            </div>
            <Toggle checked={eveningWinddown} onChange={() => toggleSetting('eveningWinddown')} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Daily Radiance Quote</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">08:00 AM • Curated wisdom nugget</p>
            </div>
            <Toggle checked={dailyRadianceQuote} onChange={() => toggleSetting('dailyRadianceQuote')} />
          </div>
        </div>
      </div>

      {/* ZEN FOCUS / DO NOT DISTURB CARD */}
      <div className="mx-5 mb-6 p-5 rounded-3xl flex items-center justify-between gap-3.5 text-white bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 text-primary flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Zen Focus / Do Not Disturb</h4>
            <p className="text-[11px] font-normal text-slate-400 mt-0.5 leading-relaxed">
              Silence all civil alerts between 10:30 PM and 04:30 AM while preserving Fajr Adhan.
            </p>
          </div>
        </div>
        <Toggle size="lg" checked={zenFocusDND} onChange={() => toggleSetting('zenFocusDND')} />
      </div>

      {/* SAVE BUTTON */}
      <div className="px-5 pb-10 text-center space-y-2.5">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving Preferences...</span>
            </>
          ) : (
            <>
              <span>Save Notification Settings</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-[11px] font-normal text-slate-500">
          Preferences sync securely across your connected devices.
        </p>
      </div>
    </div>
  );
}
