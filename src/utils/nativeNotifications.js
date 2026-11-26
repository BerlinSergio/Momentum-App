import { App } from '@capacitor/app';
/**
 * Momentum Unified Notification Engine
 * Dual-adapter delivery for Windows Desktop (HTML5 Web Notifications)
 * and Android Native (@capacitor/local-notifications).
 * Integrates with In-App Notification Center, task/routine/prayer/calendar
 * source modules, active web scheduler, and secure App Lock-guarded routing.
 */

import { LocalNotifications } from '@capacitor/local-notifications';
import { isNativePlatform } from './nativeLifecycle.js';
import { useTaskStore } from '../store/useTaskStore.js';
import { useRoutineStore, isRoutineScheduledForDate, isRoutineCompletedForDate } from '../store/useRoutineStore.js';
import { usePrayerStore } from '../store/usePrayerStore.js';
import { useCalendarStore } from '../store/useCalendarStore.js';
import { useLocationStore } from '../store/useLocationStore.js';
import { useSettingsStore } from '../store/useSettingsStore.js';
import { useNavigationStore } from '../store/useNavigationStore.js';
import { useNotificationStore } from '../store/useNotificationStore.js';
import useSecurityStore from '../store/useSecurityStore.js';
import { calculatePrayerTimes } from './prayerTimes.js';
import { getLocalDateKey } from './timeService.js';

let areChannelsCreated = false;
let isActionListenerRegistered = false;
let webSchedulerIntervalId = null;
let isVisibilityListenerAttached = false;

const FIRED_STORAGE_KEY = 'momentum_fired_notifications_v1';

// Android Notification Channels
export const CHANNELS = {
  TASKS: {
    id: 'momentum_tasks',
    name: 'Tasks & Reminders',
    description: 'Notifications for upcoming task deadlines and to-dos',
    importance: 4, // High
    visibility: 0, // Private on lock screen
    vibration: true,
  },
  ROUTINES: {
    id: 'momentum_routines',
    name: 'Daily Routines',
    description: 'Auditory and visual cues for daily mindful routines',
    importance: 4,
    visibility: 0,
    vibration: true,
  },
  PRAYERS: {
    id: 'momentum_prayers',
    name: 'Prayer Times & Adhan',
    description: 'Prayer time reminders and call to prayer alerts',
    importance: 5, // Max
    visibility: 0,
    vibration: true,
  },
  SYSTEM: {
    id: 'momentum_system',
    name: 'System & Calm Alerts',
    description: 'Mindful system notifications and verification tests',
    importance: 3,
    visibility: 0,
    vibration: true,
  },
};

/**
 * Deterministic integer hash code generator for 32-bit integer notification IDs
 */
export function hashStringToInt(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const pos = hash & 0x7fffffff;
  return pos === 0 ? 1 : pos;
}

/**
 * Fired notifications cache to prevent duplicate triggers in browser
 */
export function getFiredNotifications() {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(FIRED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function recordNotificationFired(key) {
  try {
    if (typeof localStorage === 'undefined') return;
    const fired = getFiredNotifications();
    fired[key] = Date.now();
    // Prune records older than 48 hours
    const cutoff = Date.now() - 48 * 3600 * 1000;
    for (const k of Object.keys(fired)) {
      if (fired[k] < cutoff) delete fired[k];
    }
    localStorage.setItem(FIRED_STORAGE_KEY, JSON.stringify(fired));
  } catch {
    // Ignore storage quota errors
  }
}

export function isNotificationFired(key) {
  const fired = getFiredNotifications();
  return Boolean(fired[key]);
}

/**
 * Ensure Android Notification Channels exist
 */
export async function initializeNotificationChannels() {
  if (!isNativePlatform() || areChannelsCreated) return;
  try {
    for (const channel of Object.values(CHANNELS)) {
      await LocalNotifications.createChannel(channel);
    }
    areChannelsCreated = true;
  } catch (err) {
    console.warn('[NativeNotifications] Channel creation failed:', err.message);
  }
}

/**
 * Check if notifications are supported on the current platform/browser
 */
export function isNotificationSupported() {
  if (isNativePlatform()) return true;
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Check notification permissions status
 * Returns 'granted' | 'denied' | 'prompt' | 'unsupported'
 */
export async function checkNotificationPermission() {
  if (!isNativePlatform()) {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') return 'granted';
      if (Notification.permission === 'denied') return 'denied';
      return 'prompt';
    }
    return 'unsupported';
  }

  try {
    const status = await LocalNotifications.checkPermissions();
    return status.display; // 'granted' | 'denied' | 'prompt' | 'prompt-with-rationale'
  } catch (err) {
    console.warn('[NativeNotifications] Check permissions failed:', err.message);
    return 'denied';
  }
}

/**
 * Request notification permissions (Must be called in response to a user gesture on Desktop Web)
 */
export async function requestNotificationPermission() {
  if (!isNativePlatform()) {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        return res === 'granted' ? 'granted' : 'denied';
      } catch (err) {
        console.warn('[NativeNotifications] Web permission request error:', err);
        return 'denied';
      }
    }
    return 'unsupported';
  }

  try {
    const status = await LocalNotifications.requestPermissions();
    return status.display;
  } catch (err) {
    console.warn('[NativeNotifications] Request permissions failed:', err.message);
    return 'denied';
  }
}

/**
 * Route incoming notification tap action
 * Securely enforces App Lock protection.
 */
export function handleNotificationRoute(payload) {
  const extra = payload || {};
  const targetScreen = extra.targetScreen;
  const params = extra.params || {};

  if (!targetScreen) return { handled: false };

  const security = useSecurityStore.getState();
  const nav = useNavigationStore.getState();

  // If locked, save pending route to navigate immediately upon successful unlock
  if (security.isLocked && security.hasPin && security.isAppLockActive) {
    window.__pendingNotificationRoute = { targetScreen, params };
    return { queued: true };
  } else {
    if (nav?.navigateTo) {
      nav.navigateTo(targetScreen, params);
    } else if (nav?.setActiveTab) {
      nav.setActiveTab(targetScreen, params);
    }
    return { navigated: true };
  }
}

export function getPendingNotificationRoute() {
  return window.__pendingNotificationRoute || null;
}

export function flushPendingNotificationRoute() {
  const pending = window.__pendingNotificationRoute;
  if (!pending) return false;
  const security = useSecurityStore.getState();
  if (security.isLocked && security.hasPin && security.isAppLockActive) {
    return false;
  }
  window.__pendingNotificationRoute = null;
  const nav = useNavigationStore.getState();
  if (nav?.navigateTo) {
    nav.navigateTo(pending.targetScreen, pending.params);
  } else if (nav?.setActiveTab) {
    nav.setActiveTab(pending.targetScreen, pending.params);
  }
  return true;
}

/**
 * Register notification tap action handler for Capacitor Native
 */
export function registerNotificationTapListener() {
  if (!isNativePlatform() || isActionListenerRegistered) return;
  isActionListenerRegistered = true;

  try {
    LocalNotifications.addListener('localNotificationActionPerformed', ({ notification }) => {
      handleNotificationRoute(notification.extra || {});
    });
  } catch (err) {
    console.warn('[NativeNotifications] Action listener registration failed:', err.message);
  }
}

/**
 * Deliver a notification across In-App Center and the active OS adapter
 */
export async function deliverNotification({
  id,
  title,
  body,
  sourceType = 'system',
  sourceId = null,
  targetScreen = null,
  params = {},
  channelId = CHANNELS.SYSTEM.id,
}) {
  const notifId = id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const settings = useSettingsStore.getState();

  // 1. Check Master Notification switch
  if (settings.masterEnabled === false) {
    return { suppressed: true, reason: 'master_disabled' };
  }

  // 2. Record into In-App Notification Center
  try {
    useNotificationStore.getState().addNotification({
      id: notifId,
      title,
      body,
      sourceType,
      sourceId,
      targetScreen,
      params,
      timestamp: new Date().toISOString(),
      read: false,
    });
  } catch (err) {
    console.warn('[NotificationEngine] In-app recording failed:', err);
  }

  // 3. Deliver to OS
  if (isNativePlatform()) {
    try {
      if (await checkNotificationPermission() !== 'granted') return {success:false,reason:'permission_not_granted'};
      await initializeNotificationChannels();
      await LocalNotifications.schedule({
        notifications: [
          {
            id: hashStringToInt(notifId),
            title,
            body,
            channelId,
            extra: {
              targetScreen,
              params,
              sourceType,
              sourceId,
            },
            smallIcon: 'ic_stat_momentum',
          },
        ],
      });
      return { success: true, platform: 'native' };
    } catch (err) {
      console.warn('[NotificationEngine] Native delivery error:', err);
      return { success: false, error: err.message };
    }
  }

  // Desktop Web / Windows Notification Delivery
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          body,
          icon: '/logo.png',
          tag: notifId,
          data: { targetScreen, params, sourceType, sourceId },
        });

        notif.onclick = () => {
          try {
            window.focus();
            notif.close();
          } catch {
            // ignore
          }
          handleNotificationRoute({ targetScreen, params });
        };

        return { success: true, platform: 'web' };
      } catch (err) {
        console.warn('[NotificationEngine] Web notification constructor error:', err);
        return { success: false, error: err.message };
      }
    } else {
      return { success: true, platform: 'in_app_only', reason: 'web_permission_not_granted' };
    }
  }

  return { success: true, platform: 'in_app_only' };
}

/**
 * Dispatch a genuine Test Notification to verify Windows/Android delivery
 */
export async function sendTestNotification() {
  const perm = await requestNotificationPermission();
  const testId = `test-${Date.now()}`;
  const title = 'Momentum — System Verification';
  if (perm !== 'granted') return {success:false,permission:perm,delivery:{reason:'permission_not_granted'}};
  const body = 'Momentum notification delivery test.';

  const result = await deliverNotification({
    id: testId,
    title,
    body,
    sourceType: 'system',
    sourceId: 'test-verification',
    targetScreen: 'notifications_settings_light_mode',
    channelId: CHANNELS.SYSTEM.id,
  });

  return {
    success: result.success === true && result.platform !== 'in_app_only',
    permission: perm,
    delivery: result,
  };
}

/**
 * Parses task due time and reminder offset into a Date object
 */
export function calculateTaskTriggerDate(task) {
  if (!task || !task.dueDate || task.reminderEnabled === false || /^(none|off|no reminder)$/i.test(String(task.reminder || '').trim())) return null;
  const dueDateStr = task.dueDate; // YYYY-MM-DD
  const [year, month, day] = dueDateStr.split('-').map(Number);
  if (!year || !month || !day) return null;

  let hours = 9;
  let minutes = 0;

  if (task.startTime) {
    const timeClean = task.startTime.trim();
    const isPM = /pm/i.test(timeClean);
    const isAM = /am/i.test(timeClean);
    const nums = timeClean.replace(/[^0-9:]/g, '').split(':').map(Number);
    if (nums.length >= 2) {
      hours = nums[0];
      minutes = nums[1];
      if (isPM && hours < 12) hours += 12;
      if (isAM && hours === 12) hours = 0;
    }
  }

  if (!Number.isInteger(hours) || hours<0 || hours>23 || !Number.isInteger(minutes) || minutes<0 || minutes>59) return null;
  const baseDate = new Date(year, month - 1, day, hours, minutes, 0);
  if (baseDate.getFullYear()!==year || baseDate.getMonth()!==month-1 || baseDate.getDate()!==day) return null;

  // Compute offset in minutes
  let offsetMinutes = 0;
  const rem = String(task.reminder || '').toLowerCase();
  if (rem.includes('10')) offsetMinutes = 10;
  else if (rem.includes('15')) offsetMinutes = 15;
  else if (rem.includes('30')) offsetMinutes = 30;
  else if (rem.includes('1 hour') || rem.includes('60')) offsetMinutes = 60;
  else if (rem.includes('1 day') || rem.includes('day')) offsetMinutes = 1440;
  else if (Number(task.reminderOffsetMinutes) > 0) offsetMinutes = Number(task.reminderOffsetMinutes);

  return new Date(baseDate.getTime() - offsetMinutes * 60 * 1000);
}

/**
 * Parses routine scheduled time and reminder offset into a Date object for today
 */
export function calculateRoutineTriggerDate(routine, baseDate = new Date()) {
  if (!routine || routine.reminderEnabled === false || /^(none|off|no reminder)$/i.test(String(routine.reminder || '').trim()) || (!routine.targetTime && !routine.time)) return null;
  const timeStr = routine.targetTime || routine.time;
  const isPM = /pm/i.test(timeStr);
  const isAM = /am/i.test(timeStr);
  const parts = timeStr.replace(/[^0-9:]/g, '').split(':').map(Number);
  if (parts.length < 2) return null;

  let hours = parts[0];
  let minutes = parts[1];
  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  if (!Number.isInteger(hours) || hours<0 || hours>23 || !Number.isInteger(minutes) || minutes<0 || minutes>59) return null;
  const routineDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, minutes, 0);
  const offsetMin = Number(routine.reminderOffset ?? 0);
  if (!Number.isFinite(offsetMin) || offsetMin<0 || offsetMin>1440) return null;
  return new Date(routineDate.getTime() - offsetMin * 60 * 1000);
}

/**
 * Periodic Web/Desktop Scheduler Ticker
 * Evaluates active tasks, routines, prayers, and calendar reminders.
 */
export async function tickNotificationScheduler() {
  const settings = useSettingsStore.getState();
  if (settings.masterEnabled === false) return;

  const now = new Date();
  const todayKey = getLocalDateKey();
  const WINDOW_MS = 15 * 60 * 1000; // 15-minute lookback window for missed/due triggers

  // =========================================================================
  // 1. EVALUATE TASK REMINDERS
  // =========================================================================
  if (settings.dueTaskAlerts !== false) {
    const tasks = useTaskStore.getState().tasks || [];
    for (const task of tasks) {
      if (task.status === 'done' || task.completed) continue;
      if (!task.dueDate) continue;

      const triggerDate = calculateTaskTriggerDate(task);
      if (!triggerDate) continue;

      const diff = now.getTime() - triggerDate.getTime();
      // If trigger is due now (within the past 15 mins and not future by > 10s)
      if (diff >= -10000 && diff <= WINDOW_MS) {
        const fireKey = `task-${task.id}-${task.dueDate}`;
        if (!isNotificationFired(fireKey)) {
          recordNotificationFired(fireKey);
          deliverNotification({
            id: fireKey,
            title: `Task Reminder: ${task.title}`,
            body: task.description || `Scheduled for ${task.startTime || 'today'}. Small steps every day.`,
            sourceType: 'task',
            sourceId: task.id,
            targetScreen: 'tasks_reminders_light_mode',
            params: { taskId: task.id },
            channelId: CHANNELS.TASKS.id,
          });
        }
      }
    }
  }

  // =========================================================================
  // 2. EVALUATE ROUTINE REMINDERS
  // =========================================================================
  const routines = useRoutineStore.getState().routines || [];
  for (const routine of routines) {
    if (routine.reminderEnabled === false || routine.reminder === 'None') continue;
    if (!isRoutineScheduledForDate(routine, todayKey)) continue;
    if (isRoutineCompletedForDate(routine, todayKey)) continue; // Already completed today

    const triggerDate = calculateRoutineTriggerDate(routine, now);
    if (!triggerDate) continue;

    const diff = now.getTime() - triggerDate.getTime();
    if (diff >= -10000 && diff <= WINDOW_MS) {
      const fireKey = `routine-${routine.id}-${todayKey}`;
      if (!isNotificationFired(fireKey)) {
        recordNotificationFired(fireKey);
        deliverNotification({
          id: fireKey,
          title: `Daily Routine: ${routine.title}`,
          body: routine.description || `Time for your daily mindfulness routine (${routine.targetTime || routine.time || 'now'}).`,
          sourceType: 'routine',
          sourceId: routine.id,
          targetScreen: 'daily_routine_light_mode',
          params: { routineId: routine.id, dateKey: todayKey },
          channelId: CHANNELS.ROUTINES.id,
        });
      }
    }
  }

  // =========================================================================
  // 3. EVALUATE PRAYER TIME ALERTS
  // Note: Prayer notification firing MUST NEVER mark the prayer as completed!
  // =========================================================================
  const prayerAlertsEnabled = settings.prayerAlertsEnabled !== false;
  if (prayerAlertsEnabled) {
    const loc = useLocationStore.getState().selectedCity;
    const prayerSettings = usePrayerStore.getState();
    const enabledPrayers = settings.enabledPrayerAlerts || ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    if (loc && loc.latitude != null && loc.longitude != null) {
      const dayCalc = calculatePrayerTimes({
        baseDate: now,
        latitude: loc.latitude,
        longitude: loc.longitude,
        elevation: loc.elevationMeters || 0,
        calculationMethod: prayerSettings.calculationMethod,
        timezone:loc.timezone,
        madhab: prayerSettings.madhab,
        highLatitudeRule:prayerSettings.highLatitudeRule,
        polarCircleResolution:prayerSettings.polarCircleResolution,
        adjustments: prayerSettings.prayerAdjustments,
      });

      if (dayCalc?.pt) {
        const offsetMin = Number(prayerSettings.adhanOffset ?? settings.adhanOffset ?? 0);

        for (const [pName, pInstant] of Object.entries(dayCalc.pt)) {
          if (!(pInstant instanceof Date) || !Number.isFinite(pInstant.getTime())) continue;
          const capName = pName.charAt(0).toUpperCase() + pName.slice(1);
          if (!enabledPrayers.includes(capName)) continue;

          const triggerTime = new Date(pInstant.getTime() - offsetMin * 60 * 1000);
          const diff = now.getTime() - triggerTime.getTime();

          if (diff >= -10000 && diff <= WINDOW_MS) {
            const fireKey = `prayer-${pName}-${todayKey}`;
            if (!isNotificationFired(fireKey)) {
              recordNotificationFired(fireKey);
              const timeStr = pInstant.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              deliverNotification({
                id: fireKey,
                title: `Prayer Time: ${capName}`,
                body: `It is now time for ${capName} prayer (${timeStr}) in ${loc.name || 'your area'}.`,
                sourceType: 'prayer',
                sourceId: pName,
                targetScreen: 'prayer_times_light_mode',
                params: { prayer: pName },
                channelId: CHANNELS.PRAYERS.id,
              });
            }
          }
        }
      }
    }
  }

  // =========================================================================
  // 4. EVALUATE CALENDAR EVENT REMINDERS
  // =========================================================================
  const calendarEvents = useCalendarStore.getState().events || [];
  for (const evt of calendarEvents) {
    if (evt.completed || evt.date !== todayKey || !evt.time) continue;

    const timeParts = evt.time.split('–')[0].trim();
    const isPM = /pm/i.test(timeParts);
    const isAM = /am/i.test(timeParts);
    const nums = timeParts.replace(/[^0-9:]/g, '').split(':').map(Number);
    if (nums.length >= 2) {
      let h = nums[0];
      let m = nums[1];
      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;

      const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
      const triggerDate = new Date(eventDate.getTime() - 10 * 60 * 1000); // 10m before
      const diff = now.getTime() - triggerDate.getTime();

      if (diff >= -10000 && diff <= WINDOW_MS) {
        const fireKey = `calendar-${evt.id}-${todayKey}`;
        if (!isNotificationFired(fireKey)) {
          recordNotificationFired(fireKey);
          deliverNotification({
            id: fireKey,
            title: `Calendar Event: ${evt.title}`,
            body: evt.note || `Upcoming event at ${evt.time}.`,
            sourceType: 'calendar',
            sourceId: evt.id,
            targetScreen: 'calendars_main_light_mode',
            params: { eventId: evt.id },
            channelId: CHANNELS.TASKS.id,
          });
        }
      }
    }
  }
}

/**
 * Start the Active Web Scheduler for Desktop Web (Windows)
 */
export function startNotificationScheduler() {
  if (isNativePlatform() || webSchedulerIntervalId) return;

  // Run initial tick immediately
  tickNotificationScheduler().catch((e) => console.warn('[NotificationEngine] Initial tick error:', e));

  // Ticker every 15 seconds
  webSchedulerIntervalId = setInterval(() => {
    tickNotificationScheduler().catch((e) => console.warn('[NotificationEngine] Ticker error:', e));
  }, 15000);

  // Also tick when browser tab becomes visible
  if (typeof document !== 'undefined' && !isVisibilityListenerAttached) {
    isVisibilityListenerAttached = true;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        tickNotificationScheduler().catch(() => {});
      }
    });
  }
}

export function stopNotificationScheduler() {
  if (webSchedulerIntervalId) {
    clearInterval(webSchedulerIntervalId);
    webSchedulerIntervalId = null;
  }
}

/**
 * Cancel a notification for a deleted or completed source item
 */
export async function cancelNotificationForSource(sourceType, sourceId) {
  if (!sourceId) return;

  if (isNativePlatform()) {
    try {
      const notifId = hashStringToInt(`${sourceType}-${sourceId}`);
      await LocalNotifications.cancel({ notifications: [{ id: notifId }] });
    } catch (err) {
      console.warn('[NotificationEngine] Cancel error:', err);
    }
  }

  // Also mark fired key in web storage so scheduler ignores it
  const todayKey = getLocalDateKey();
  recordNotificationFired(`${sourceType}-${sourceId}-${todayKey}`);
}

/**
 * Central schedule coordinator across native and web platforms
 */
let nativeScheduleQueue=Promise.resolve();
let nativeSchedulingStarted=false;
let scheduleTimer=null;

// These times come from the existing Notification Settings screen.
// They are local-time nudges, not calculated prayer times.
const DAILY_NUDGES = [
  ['morningIntention',5,0,'Morning intention','Begin your day with a mindful intention.','daily_routine_dark_mode'],
  ['dailyRadianceQuote',8,0,'Daily radiance','Open Momentum for today’s inspiration.','prayer_times_dark_mode'],
  ['middayPause',13,0,'Midday pause','Take a moment to breathe and hydrate.','daily_routine_dark_mode'],
  ['dailyHabitCheckin',20,30,'Daily habit check-in','Review your daily routines.','daily_routine_dark_mode'],
  ['eveningWinddown',21,30,'Evening wind-down','Take a moment for gratitude and reflection.','notes_main_dark_mode'],
];
function civilAlertsQuiet(settings,at) {
  if(!settings.zenFocusDND)return false;
  const minute=at.getHours()*60+at.getMinutes();
  return minute>=22*60+30 || minute<4*60+30;
}

export function buildNativeReminderPlan(now=new Date(),{includeAlarmOnly=false}={}) {
  const settings=useSettingsStore.getState();
  if (settings.masterEnabled === false) return [];
  const notifications=[];
  const add=(key,at,title,body,channelId,type,params,targetScreen)=>{
    if (!(at instanceof Date) || !Number.isFinite(at.getTime()) || at<=now || (type!=='prayer' && civilAlertsQuiet(settings,at))) return;
    if(!includeAlarmOnly && settings.alarmOnlyOccurrences?.[key]===at.getTime())return;
    notifications.push({
      id:hashStringToInt(key),title,body,channelId,smallIcon:'ic_stat_momentum',
      schedule:{at,allowWhileIdle:true},
      extra:{momentumManaged:true,key,type,params,targetScreen},
    });
  };
  if(settings.dueTaskAlerts!==false) {
    for(const task of useTaskStore.getState().tasks||[]) {
      if(task.completed||task.status==='done') continue;
      add('task-'+task.id,calculateTaskTriggerDate(task),'Task reminder',task.title||'Upcoming task',CHANNELS.TASKS.id,'task',{taskId:task.id},'tasks_reminders_dark_mode');
    }
  }
  const routines=useRoutineStore.getState().routines||[];
  const loc=useLocationStore.getState().selectedCity;
  const prayer=usePrayerStore.getState();
  const enabled=(settings.enabledPrayerAlerts||[]).map(value=>String(value).toLowerCase());
  for(let offset=0;offset<7;offset++){
    const day=new Date(now.getFullYear(),now.getMonth(),now.getDate()+offset,12);
    const dateKey=getLocalDateKey(day);
    for(const [flag,hour,minute,title,body,screen] of DAILY_NUDGES) {
      if(settings[flag]!==true)continue;
      const at=new Date(day.getFullYear(),day.getMonth(),day.getDate(),hour,minute);
      add('nudge-'+flag+'-'+dateKey,at,title,body,CHANNELS.ROUTINES.id,'nudge',{},screen);
    }
    for(const routine of routines){
      if(routine.reminderEnabled===false||routine.reminder==='None'||!isRoutineScheduledForDate(routine,dateKey)||isRoutineCompletedForDate(routine,dateKey))continue;
      add('routine-'+routine.id+'-'+dateKey,calculateRoutineTriggerDate(routine,day),'Daily routine',routine.title||'Scheduled routine',CHANNELS.ROUTINES.id,'routine',{routineId:routine.id,dateKey},'daily_routine_dark_mode');
    }
    if(loc && Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude) && settings.prayerAlertsEnabled!==false && prayer.prayerAlertsEnabled!==false){
      const result=calculatePrayerTimes({baseDate:day,latitude:loc.latitude,longitude:loc.longitude,timezone:loc.timezone,
        calculationMethod:prayer.calculationMethod,madhab:prayer.madhab,highLatitudeRule:prayer.highLatitudeRule,
        polarCircleResolution:prayer.polarCircleResolution,adjustments:prayer.prayerAdjustments});
      if(result.status!=='unavailable') for(const entry of result.prayers){
        if(!enabled.includes(entry.id)||!(entry.prayerDate instanceof Date))continue;
        const minutes=Number(prayer.adhanOffset ?? settings.adhanOffset ?? 0);
        const at=new Date(entry.prayerDate.getTime()-minutes*60000);
        add('prayer-'+entry.id+'-'+result.civilDateKey,at,entry.name+' prayer',minutes?'Prayer reminder ('+minutes+' min before)':'It is time for prayer',CHANNELS.PRAYERS.id,'prayer',{prayer:entry.id},'prayer_times_dark_mode');
      }
    }
  }
  for(const event of useCalendarStore.getState().events||[]){
    if(event.completed||!event.date||!event.time||event.reminderEnabled===false)continue;
    const at=calculateTaskTriggerDate({dueDate:event.date,startTime:String(event.time).split('–')[0].trim(),reminder:'10 minutes before'});
    add('calendar-'+event.id+'-'+event.date,at,'Calendar reminder',event.title||'Upcoming event',CHANNELS.TASKS.id,'calendar',{eventId:event.id},'calendars_main_dark_mode');
  }
  // Android has a limited pending-alarm budget; retain the soonest 60.
  return notifications.sort((a,b)=>a.schedule.at-b.schedule.at).slice(0,60);
}

async function reconcileNativeReminders(){
  const permission=await checkNotificationPermission();
  if(permission!=='granted')return {success:false,reason:'permission_not_granted',permission};
  await initializeNotificationChannels();
  registerNotificationTapListener();
  const plan=buildNativeReminderPlan();
  const pending=(await LocalNotifications.getPending()).notifications||[];
  const managed=pending.filter(item=>item.extra?.momentumManaged||['task','routine','prayer','calendar','nudge'].includes(item.extra?.type));
  const wanted=new Set(plan.map(item=>item.id));
  const obsolete=managed.filter(item=>!wanted.has(item.id));
  if(obsolete.length)await LocalNotifications.cancel({notifications:obsolete.map(({id})=>({id}))});
  if(plan.length)await LocalNotifications.schedule({notifications:plan});
  return {success:true,isNative:true,scheduledCount:plan.length};
}
export function scheduleAllActiveNotifications(){
  if(!isNativePlatform()){
    startNotificationScheduler();
    return Promise.resolve({success:true,isNative:false,schedulerRunning:true});
  }
  const run=nativeScheduleQueue.catch(()=>{}).then(reconcileNativeReminders);
  nativeScheduleQueue=run;
  return run.catch(error=>({success:false,error:error.message}));
}

export function startNativeReminderSynchronization(){
  if(!isNativePlatform()||nativeSchedulingStarted)return;
  nativeSchedulingStarted=true;
  const sync=()=>{
    clearTimeout(scheduleTimer);
    scheduleTimer=setTimeout(()=>scheduleAllActiveNotifications().then(result=>{
      if(!result.success&&result.reason!=='permission_not_granted')console.warn('[Notifications] Native schedule failed',result.error);
    }),500);
  };
  const watch=(store,select)=>{let previous=JSON.stringify(select(store.getState()));store.subscribe(state=>{
    const next=JSON.stringify(select(state));
    if(next!==previous){previous=next;sync();}
  });};
  watch(useTaskStore,s=>s.tasks);
  watch(useRoutineStore,s=>s.routines);
  watch(useCalendarStore,s=>s.events);
  watch(useLocationStore,s=>s.selectedCity);
  watch(useSettingsStore,s=>[s.masterEnabled,s.dueTaskAlerts,s.prayerAlertsEnabled,s.enabledPrayerAlerts,s.adhanOffset,s.adhanMode,s.morningIntention,s.dailyRadianceQuote,s.middayPause,s.dailyHabitCheckin,s.eveningWinddown,s.zenFocusDND,s.alarmOnlyOccurrences]);
  watch(usePrayerStore,s=>[s.prayerAlertsEnabled,s.adhanOffset,s.calculationMethod,s.madhab,s.highLatitudeRule,s.polarCircleResolution,s.prayerAdjustments]);
  App.addListener('appStateChange',state=>{if(state.isActive)sync();}).catch(error=>console.warn('[Notifications] Resume listener failed',error));
}
export const scheduleAllReminders = scheduleAllActiveNotifications;
