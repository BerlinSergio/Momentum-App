import ReminderAlarmCard from './components/ReminderAlarmCard.jsx';
import { Capacitor } from '@capacitor/core';
import { scheduleAllActiveNotifications } from './utils/nativeNotifications.js';
import React, { useState, useEffect } from 'react';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import UserAvatar from './components/UserAvatar';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from './store/useSettingsStore';
import { usePrayerStore } from './store/usePrayerStore';
import { useNotificationStore } from './store/useNotificationStore';
import {
  checkNotificationPermission,
  requestNotificationPermission,
  sendTestNotification,
  handleNotificationRoute,
  isNotificationSupported,
} from './utils/nativeNotifications';
import { toast as globalToast } from './components/ui/toast/index.js';
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Sparkles,
  Moon,
  ArrowRight,
  MoonStar as Mosque,
  Sliders,
  CheckCheck,
  Trash2,
  Calendar,
  Flame,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  X,
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
            ? 'w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner'
            : 'w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner'
        }
      />
    </label>
  );
}

function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays}d ago`;
}

function getSourceIcon(sourceType) {
  switch (sourceType) {
    case 'task':
      return { icon: CheckCircle2, color: 'text-blue-600 bg-blue-50 border-blue-200' };
    case 'routine':
      return { icon: Flame, color: 'text-amber-600 bg-amber-50 border-amber-200' };
    case 'prayer':
      return { icon: Mosque, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    case 'calendar':
      return { icon: Calendar, color: 'text-purple-600 bg-purple-50 border-purple-200' };
    default:
      return { icon: Bell, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
  }
}

export default function NotificationsSettingsLightMode({
  setActiveTab,
  goBack,
  initialSubTab = 'notifications',
}) {
  const { t } = useTranslation();
  const isNative = Capacitor.isNativePlatform();
  const [subTab, setSubTab] = useState(initialSubTab); // 'notifications' | 'preferences'
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // In-App Notification Store
  const notifications = useNotificationStore((s) => s.notifications) || [];
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const removeNotification = useNotificationStore((s) => s.removeNotification);
  const clearAllNotifications = useNotificationStore((s) => s.clearAllNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications;

  // Settings Store
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

  // Prayer Store
  const prayers = usePrayerStore((s) => s.prayers);
  const adhanOffset = usePrayerStore((s) => s.adhanOffset);
  const setAdhanOffset = usePrayerStore((s) => s.setAdhanOffset);
  const setPrayerStoreAlertType = usePrayerStore((s) => s.setAlertType);
  const setPrayerStoreAlertsEnabled = usePrayerStore((s) => s.setPrayerAlertsEnabled);
  const toggleStorePrayerAlert = usePrayerStore((s) => s.togglePrayerAlert);

  useEffect(() => {
    checkNotificationPermission().then((perm) => {
      setPermissionStatus(perm);
    });
  }, []);

  const handleRequestPermission = async () => {
    try {
      const res = await requestNotificationPermission();
      setPermissionStatus(res);
      if (res === 'granted') {
        await scheduleAllActiveNotifications();
        globalToast.success((isNative ? t('notifications.mobilePermissionGranted','Mobile notifications enabled') : t('notifications.permissionGranted', 'Desktop notifications enabled')));
      } else if (res === 'denied') {
        globalToast.error((isNative ? t('notifications.mobilePermissionDenied','Notifications blocked in Android settings') : t('notifications.permissionDenied', 'Notifications blocked in browser settings')));
      }
    } catch {
      // ignore
    }
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);
    try {
      const res = await sendTestNotification();
      setPermissionStatus(res.permission);
      if (res.success) globalToast.success(t('notifications.testDispatched', 'Test notification dispatched!'));
      else globalToast.error(t('notifications.testFailed', 'Test notification was not sent. Check notification permissions and master switch.'));
    } catch (err) {
      globalToast.error('Failed to send test: ' + err.message);
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleNotificationClick = (item) => {
    markAsRead(item.id);
    if (item.targetScreen) {
      handleNotificationRoute({ targetScreen: item.targetScreen, params: item.params });
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      globalToast.success(t('toasts.settingsSynced', 'Settings securely synced ✓'));
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
    <div className="min-h-0 bg-slate-50 pb-2 relative font-sans">
      {/* TOP HEADER BAR */}
      <MomentumGlassHeader isDarkMode={false}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 relative">
            <Bell className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
              {t('notifications.title', 'Notifications')}
            </h1>
            <p className="text-[11px] text-slate-500">
              {unreadCount > 0
                ? t('notifications.unreadBadge', { count: unreadCount, defaultValue: `${unreadCount} unread` })
                : t('notifications.allCaughtUp', 'All caught up')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (goBack ? goBack('settings_profile_light_mode') : (setActiveTab ? setActiveTab('settings_profile_light_mode') : window.history.back()))}
            aria-label="Back"
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </MomentumGlassHeader>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4">
        {/* SEGMENTED TAB SELECTOR: NOTIFICATIONS FEED vs PREFERENCES */}
        <div className="p-1 rounded-2xl bg-slate-200/70 border border-slate-300/60 flex items-center gap-1 mb-5">
          <button
            type="button"
            onClick={() => setSubTab('notifications')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              subTab === 'notifications'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{t('notifications.center', 'Notification Center')}</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-primary text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubTab('preferences')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              subTab === 'preferences'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('notifications.preferences', 'Preferences')}</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: IN-APP NOTIFICATION CENTER FEED                              */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {subTab === 'notifications' && (
          <div className="space-y-4">
            {/* Action Bar: Filter Pills + Mark Read / Clear */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filter === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t('notifications.all', 'All')} ({notifications.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filter === 'unread'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t('notifications.unread', 'Unread')} ({unreadCount})
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      markAllAsRead();
                      globalToast.info(t('notifications.markAllAsRead', 'Mark all as read'));
                    }}
                    title={t('notifications.markAllAsRead', 'Mark all as read')}
                    className="p-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('notifications.markAllAsRead', 'Mark all read')}</span>
                  </button>
                )}

                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      clearAllNotifications();
                      globalToast.info(t('notifications.clearAll', 'Notifications cleared'));
                    }}
                    title={t('notifications.clearAll', 'Clear all')}
                    className="p-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('notifications.clearAll', 'Clear all')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Notification Permission Banner */}
            {permissionStatus !== 'granted' && (
              <div className="p-4 rounded-3xl bg-indigo-50/90 border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bell className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-indigo-950">
                      {(isNative ? t('notifications.enableMobileTitle','Enable Mobile Notifications') : t('notifications.enableDesktopTitle', 'Enable Desktop Notifications'))}
                    </h3>
                    <p className="text-[11px] text-indigo-700 mt-0.5 leading-relaxed">
                      {(isNative ? t('notifications.enableMobileDesc','Allow Android reminders for tasks, routines and prayer times.') : t('notifications.enableDesktopDesc', 'Receive reminders on your Windows computer for scheduled tasks, daily routines, and prayer times.'))}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer text-center"
                >
                  {(isNative ? t('notifications.enableMobileButton','Enable mobile reminders') : t('notifications.enableButton', 'Enable Desktop Reminders'))}
                </button>
              </div>
            )}

            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-800">
                    {t('notifications.noNotifications', 'No notifications yet')}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    {t('notifications.allCaughtUp', 'You are completely caught up. Mindful peace.')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={isSendingTest}
                  className="mt-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSendingTest ? 'animate-spin' : ''}`} />
                  <span>{t('notifications.sendTest', 'Send Test Notification')}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredNotifications.map((item) => {
                  const { icon: SourceIcon, color } = getSourceIcon(item.sourceType);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex items-start gap-3.5 ${
                        item.read
                          ? 'bg-white/70 hover:bg-white border-slate-200/70 shadow-2xs'
                          : 'bg-white hover:bg-indigo-50/30 border-indigo-200/80 shadow-xs ring-1 ring-indigo-500/10'
                      }`}
                    >
                      {/* Left category badge */}
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${color}`}>
                        <SourceIcon className="w-4.5 h-4.5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {t(`notifications.${item.sourceType}`, item.sourceType)}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[10px] text-slate-400">
                            {formatRelativeTime(item.timestamp)}
                          </span>
                        </div>
                        <h4 className={`text-xs font-bold leading-tight ${item.read ? 'text-slate-700' : 'text-slate-900'}`}>
                          {item.title}
                        </h4>
                        {item.body && (
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {item.body}
                          </p>
                        )}
                      </div>

                      {/* Right actions: Unread dot + Dismiss button */}
                      <div className="flex items-center gap-1.5 self-center">
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(item.id);
                          }}
                          aria-label={t('notifications.dismiss', 'Dismiss')}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-all cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: NOTIFICATION PREFERENCES & SYSTEM CONFIG                     */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {subTab === 'preferences' && (
          <div className="space-y-5">
            {/* MASTER NOTIFICATION TOGGLE CARD */}
            <div className="p-5 rounded-3xl flex items-center justify-between gap-4 text-slate-900 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shadow-xs flex-shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">
                    {t('prayer.allowNotifications', 'Allow Momentum Notifications')}
                  </h2>
                  <p className="text-xs font-normal text-slate-500 mt-0.5 leading-relaxed">
                    {t('prayer.mindfulChimes', 'Mindful chimes, prayer calls, and gentle daily agenda alerts.')}
                  </p>
                </div>
              </div>
              <Toggle
                size="lg"
                checked={masterEnabled}
                onChange={() => toggleSetting('masterEnabled')}
              />
            </div>

            <ReminderAlarmCard isNative={isNative}/>

            {/* SYSTEM VERIFICATION & TEST NOTIFICATION CARD */}
            <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {t('notifications.sendTest', 'Send Test Notification')}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {permissionStatus === 'granted'
                        ? (isNative ? t('notifications.mobilePermissionGranted','Mobile notifications enabled') : t('notifications.permissionGranted', 'Desktop notifications enabled'))
                        : permissionStatus === 'denied'
                        ? (isNative ? t('notifications.mobilePermissionDenied','Notifications blocked in Android settings') : t('notifications.permissionDenied', 'Notifications blocked in browser settings'))
                        : (isNative ? t('notifications.mobilePermissionPrompt','Allow notifications in device settings') : t('notifications.permissionPrompt', 'Desktop notifications pending permission'))}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={isSendingTest}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSendingTest ? 'animate-spin' : ''}`} />
                  <span>{isSendingTest ? 'Sending...' : t('notifications.sendTest', 'Send Test')}</span>
                </button>
              </div>
            </div>

            {/* PRAYER & ADHAN ALERTS CARD */}
            <div className="p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Mosque className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {t('prayer.prayerAdhanAlerts', 'Prayer & Adhan Alerts')}
                    </h3>
                    <p className="text-[11px] font-normal text-slate-500">
                      {prayerAlertsEnabled ? `${activeAlertsCount} of 5 daily prayers active` : t('prayer.prayerAlertsPaused', 'Prayer alerts paused')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTogglePrayerAlertsMaster}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer active:scale-95 border ${
                    prayerAlertsEnabled
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                  }`}
                >
                  {prayerAlertsEnabled ? t('common.active', 'Active') : t('common.inactive', 'Inactive')}
                </button>
              </div>

              {/* Child Controls Container (Disabled if master is Inactive) */}
              <div className={`space-y-4 transition-opacity duration-200 ${prayerAlertsEnabled ? '' : 'opacity-50 pointer-events-none'}`}>
                {/* Adhan Alert Type Segmented Control */}
                <div className="p-1 rounded-2xl bg-slate-100 border border-slate-200 flex items-center gap-1">
                  {ALERT_TYPES.map((m) => {
                    const isActive = alertType === m.key;
                    return (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => handleSelectAlertType(m.key)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/50'
                            : 'text-slate-500 hover:text-slate-800 font-medium'
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
                    <span className="text-xs font-semibold text-slate-900">{t('prayer.timingOffset', 'Timing Offset')}</span>
                    <button
                      type="button"
                      onClick={() => setAdhanOffset(0)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                      {t('prayer.exactTime', 'Exact time')}
                    </button>
                  </div>
                  <p className="text-[11px] font-normal text-slate-500">{t('prayer.prepareMindAblution', 'Prepare your mind and ablutions peacefully before entry time.')}</p>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {OFFSET_OPTIONS.map((opt) => {
                      const isSelected = adhanOffset === opt.value;
                      return (
                        <div
                          key={opt.value}
                          onClick={() => setAdhanOffset(opt.value)}
                          className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-95 ${
                            isSelected
                              ? 'border-2 border-indigo-500 bg-indigo-50/80 shadow-sm'
                              : 'border border-slate-200/90 bg-white shadow-xs hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <p className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-900'}`}>{opt.label}</p>
                            <span className={`text-[10px] font-medium ${isSelected ? 'text-indigo-600/80' : 'text-slate-500'}`}>{opt.sub}</span>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600 flex-shrink-0" />
                          ) : (
                            <div className="w-4.5 h-4.5 rounded-full border border-slate-300 flex-shrink-0" />
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
                            ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-xs'
                            : 'bg-transparent border border-transparent text-slate-400 opacity-60 hover:opacity-100 hover:bg-slate-100/50'
                        }`}
                      >
                        <span className={`text-[10px] block transition-colors ${isAlertActive ? 'font-semibold text-indigo-600' : 'font-medium text-slate-400'}`}>
                          {p.name}
                        </span>
                        <span className={`text-xs block mt-0.5 transition-colors ${isAlertActive ? 'font-bold text-indigo-700' : 'font-medium text-slate-400'}`}>
                          {p.time}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 block transition-all ${isAlertActive ? 'bg-indigo-500' : 'bg-transparent'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TASKS & HABIT REMINDERS CARD */}
            <div className="p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-slate-900">
                  {t('prayer.tasksHabitReminders', 'Tasks & Habit Reminders')}
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {t('prayer.dueTaskAlerts', 'Due Task Alerts')}
                    </p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.dueTaskOffset', '15 mins before due')}</p>
                  </div>
                  <Toggle checked={dueTaskAlerts} onChange={() => toggleSetting('dueTaskAlerts')} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{t('prayer.dailyHabitCheckin', 'Daily Habit Check-in')}</p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.dailyHabitCheckinTime', 'Everyday at 08:30 PM')}</p>
                  </div>
                  <Toggle checked={dailyHabitCheckin} onChange={() => toggleSetting('dailyHabitCheckin')} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {t('prayer.overdueMilestonePushes', 'Overdue Milestone Pushes')}
                    </p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.gentleNudgesGoals', 'Gentle nudges for pending target goals')}</p>
                  </div>
                  <Toggle checked={overdueMilestonePushes} onChange={() => toggleSetting('overdueMilestonePushes')} />
                </div>
              </div>
            </div>

            {/* MINDFULNESS & ROUTINES CARD */}
            <div className="p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900">
                  {t('prayer.mindfulnessRoutines', 'Mindfulness & Routines')}
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {t('prayer.morningIntention', 'Morning Intention & Fajr')}
                    </p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.softMorningRise', '05:00 AM • Soft morning rise')}</p>
                  </div>
                  <Toggle checked={morningIntention} onChange={() => toggleSetting('morningIntention')} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {t('prayer.middayPause', 'Midday Pause & Hydration')}
                    </p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.deepBreathsChime', '01:00 PM • 3 deep breaths chime')}</p>
                  </div>
                  <Toggle checked={middayPause} onChange={() => toggleSetting('middayPause')} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {t('prayer.eveningWindDown', 'Evening Wind-down & Murāqabah')}
                    </p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.gratitudeAlert', '09:30 PM • Gratitude journaling alert')}</p>
                  </div>
                  <Toggle checked={eveningWinddown} onChange={() => toggleSetting('eveningWinddown')} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{t('prayer.dailyRadianceQuote', 'Daily Radiance Quote')}</p>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{t('prayer.curatedWisdom', '08:00 AM • Curated wisdom nugget')}</p>
                  </div>
                  <Toggle checked={dailyRadianceQuote} onChange={() => toggleSetting('dailyRadianceQuote')} />
                </div>
              </div>
            </div>

            {/* ZEN FOCUS / DO NOT DISTURB CARD */}
            <div className="p-5 rounded-3xl flex items-center justify-between gap-3.5 text-slate-900 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 text-primary flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t('prayer.zenFocusDnd', 'Zen Focus / Do Not Disturb')}
                  </h4>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5 leading-relaxed">
                    {t('prayer.zenFocusDesc', 'Silence all civil alerts between 10:30 PM and 04:30 AM while preserving Fajr Adhan.')}
                  </p>
                </div>
              </div>
              <Toggle size="lg" checked={zenFocusDND} onChange={() => toggleSetting('zenFocusDND')} />
            </div>

            {/* SAVE BUTTON */}
            <div className="pt-2 pb-10 text-center space-y-2.5">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('common.saving', 'Saving Preferences...')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('prayer.saveNotificationSettings', 'Save Notification Settings')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] font-normal text-slate-500">
                {t('settings.preferencesSyncSecurely', 'Preferences sync securely across your connected devices.')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
