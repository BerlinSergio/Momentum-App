import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { getCommittedStoreRecord } from '../storage/db.js';
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
import { getLocalDateKey, getTimezoneOffsetMinutes, addCalendarDays } from './timeService.js';
import { calculateTaskTriggerDate, calculateRoutineTriggerDate, occurrenceKey, isCivilQuiet } from './reminderRules.js';
export { calculateTaskTriggerDate, calculateRoutineTriggerDate } from './reminderRules.js';

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
export async function checkExactReminderPermission() {
  if(Capacitor.getPlatform()!=='android')return 'not_applicable';
  try{return (await LocalNotifications.checkExactNotificationSetting()).exact_alarm||'unknown';}catch{return 'unknown';}
}
export async function openExactReminderSettings() {
  if(Capacitor.getPlatform()!=='android')return 'not_applicable';
  await LocalNotifications.changeExactNotificationSetting();
  return checkExactReminderPermission();
}

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
    const record=(notification)=>{
      const extra=notification?.extra||{};
      if(!extra.momentumManaged||!extra.key||!Number.isFinite(extra.at))return;
      const id=occurrenceKey(extra.key,new Date(extra.at));
      if(useNotificationStore.getState().notifications?.some(entry=>entry.id===id))return;
      useNotificationStore.getState().addNotification({id,title:notification.title,body:notification.body,sourceType:extra.type,sourceId:extra.params?.taskId??extra.params?.routineId??extra.params?.eventId??extra.params?.prayer??null,targetScreen:extra.targetScreen,params:extra.params,timestamp:new Date().toISOString()});
    };
    LocalNotifications.addListener('localNotificationReceived', notification=>record(notification)).catch(err=>console.warn('[Notifications] Receipt listener failed',err));
    LocalNotifications.addListener('localNotificationActionPerformed', ({ notification }) => {
      record(notification);
      handleNotificationRoute(notification.extra || {});
    }).catch(err=>{isActionListenerRegistered=false;console.warn('[Notifications] Tap listener failed',err);});
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
// Native and web use the same occurrence planner, including recurrence and quiet hours.
let webTickRunning=false;
export async function tickNotificationScheduler() {
  if(isNativePlatform()||webTickRunning)return;
  webTickRunning=true;
  try {
    const now=new Date();
    const run=async()=>{
      const snapshot=await readReminderSnapshot();
      const plan=buildNativeReminderPlan(now,{lookbackMs:15*60000,limit:Infinity,snapshot});
      for(const item of plan){
        if(item.schedule.at>now)continue;
        const key=occurrenceKey(item.extra.key,item.schedule.at);
        if(isNotificationFired(key))continue;
        const result=await deliverNotification({id:key,title:item.title,body:item.body,
          sourceType:item.extra.type,sourceId:item.extra.params.taskId??item.extra.params.routineId??item.extra.params.eventId??item.extra.params.prayer??null,
          targetScreen:item.extra.targetScreen,params:item.extra.params,channelId:item.channelId});
        if(result.success===true)recordNotificationFired(key);
      }
    };
    if(typeof navigator!=='undefined'&&navigator.locks?.request)await navigator.locks.request('momentum-web-reminder-delivery',run);
    else await run();
  } finally {webTickRunning=false;}
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
  if(!sourceId)return;
  // Rebuild from the committed edit rather than marking a future occurrence as fired.
  // Completing one routine occurrence must not cancel its future days.
  if(isNativePlatform())return scheduleAllActiveNotifications();
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
const REMINDER_STORES=[
  ['settings','momentum_settings_store',useSettingsStore],
  ['tasks','momentum-task-storage',useTaskStore],
  ['routines','momentum-routine-storage',useRoutineStore],
  ['calendar','momentum-calendar-storage-v1',useCalendarStore],
  ['location','momentum-location-storage',useLocationStore],
  ['prayer','momentum-prayer-storage',usePrayerStore],
];
async function readReminderSnapshot(){
  const entries=await Promise.all(REMINDER_STORES.map(async ([key,name,store])=>{
    if(!store.persist.hasHydrated())throw Error('Reminder data not hydrated');
    const record=await getCommittedStoreRecord(name);
    const defaults=store.getInitialState();
    if(!record)return [key,defaults];
    const value=typeof record.value==='string'?JSON.parse(record.value):record.value;
    if(!value?.state||typeof value.state!=='object')throw Error('Invalid committed reminder data');
    return [key,{...defaults,...value.state}];
  }));
  return Object.fromEntries(entries);
}
export function buildNativeReminderPlan(now=new Date(),{includeAlarmOnly=false,lookbackMs=0,limit=60,snapshot=null}={}) {
  const settings=snapshot?.settings||useSettingsStore.getState();
  if (settings.masterEnabled === false) return [];
  const notifications=[];
  const add=(key,at,title,body,channelId,type,params,targetScreen)=>{
    if (!(at instanceof Date) || !Number.isFinite(at.getTime()) || at.getTime()<=now.getTime()-lookbackMs || (type!=='prayer' && isCivilQuiet(settings,at))) return;
    if(!includeAlarmOnly && settings.alarmOnlyOccurrences?.[key]===at.getTime())return;
    notifications.push({
      id:hashStringToInt(occurrenceKey(key,at)),title,body,channelId,smallIcon:'ic_stat_momentum',
      schedule:{at,allowWhileIdle:true},
      extra:{momentumManaged:true,key,type,params,targetScreen,at:at.getTime()},
    });
  };
  if(settings.dueTaskAlerts!==false) {
    for(const task of (snapshot?.tasks||useTaskStore.getState()).tasks||[]) {
      if(task.completed||task.status==='done'||task.archived||task.isDeleted) continue;
      add('task-'+task.id,calculateTaskTriggerDate(task),'Task reminder',task.title||'Upcoming task',CHANNELS.TASKS.id,'task',{taskId:task.id},'task_details');
    }
  }
  const routines=(snapshot?.routines||useRoutineStore.getState()).routines||[];
  const loc=(snapshot?.location||useLocationStore.getState()).selectedCity;
  const prayer=snapshot?.prayer||usePrayerStore.getState();
  const enabled=(settings.enabledPrayerAlerts||[]).map(value=>String(value).toLowerCase());
  for(let offset=lookbackMs>0?-1:0;offset<8;offset++){
    const day=new Date(now.getFullYear(),now.getMonth(),now.getDate()+offset,12);
    const dateKey=getLocalDateKey(day);
    for(const [flag,hour,minute,title,body,screen] of DAILY_NUDGES) {
      if(settings[flag]!==true)continue;
      const at=new Date(day.getFullYear(),day.getMonth(),day.getDate(),hour,minute);
      add('nudge-'+flag+'-'+dateKey,at,title,body,CHANNELS.ROUTINES.id,'nudge',{},screen);
    }
    for(const routine of routines){
      if(settings.routineAlertsEnabled===false||routine.reminderEnabled===false||routine.reminder==='None'||!isRoutineScheduledForDate(routine,dateKey)||isRoutineCompletedForDate(routine,dateKey))continue;
      add('routine-'+routine.id+'-'+dateKey,calculateRoutineTriggerDate(routine,day),'Daily routine',routine.title||'Scheduled routine',CHANNELS.ROUTINES.id,'routine',{routineId:routine.id,dateKey},'routine_details');
    }
    if(loc && Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude) && settings.prayerAlertsEnabled!==false && prayer.prayerAlertsEnabled!==false){
      const prayerDayKey=addCalendarDays(getLocalDateKey(now,loc.timezone),offset);
      const [py,pm,pd]=prayerDayKey.split('-').map(Number);
      const noonUtc=new Date(Date.UTC(py,pm-1,pd,12));
      const prayerDay=new Date(noonUtc.getTime()-getTimezoneOffsetMinutes(loc.timezone,noonUtc)*60000);
      const result=calculatePrayerTimes({baseDate:prayerDay,latitude:loc.latitude,longitude:loc.longitude,timezone:loc.timezone,
        calculationMethod:prayer.calculationMethod,madhab:prayer.madhab,highLatitudeRule:prayer.highLatitudeRule,
        polarCircleResolution:prayer.polarCircleResolution,adjustments:prayer.prayerAdjustments});
      if(result.status!=='unavailable') for(const entry of result.prayers){
        if(!enabled.includes(entry.id)||!(entry.prayerDate instanceof Date))continue;
        const minutes=Number(prayer.adhanOffset ?? settings.adhanOffset ?? 0);
        if(!Number.isInteger(minutes)||minutes<0||minutes>1440)continue;
        const at=new Date(entry.prayerDate.getTime()-minutes*60000);
        add('prayer-'+entry.id+'-'+result.civilDateKey,at,entry.name+' prayer',minutes?'Prayer reminder ('+minutes+' min before)':'It is time for prayer',CHANNELS.PRAYERS.id,'prayer',{prayer:entry.id},'prayer_times_dark_mode');
      }
    }
  }
  for(const event of settings.calendarAlertsEnabled===false?[]:((snapshot?.calendar||useCalendarStore.getState()).events||[])){
    if(event.completed||!event.date||!event.time||event.reminderEnabled===false)continue;
    const at=calculateTaskTriggerDate({dueDate:event.date,startTime:String(event.time).split('–')[0].trim(),reminder:event.reminder??'10 minutes before',reminderOffsetMinutes:event.reminderOffsetMinutes});
    add('calendar-'+event.id+'-'+event.date,at,'Calendar reminder',event.title||'Upcoming event',CHANNELS.TASKS.id,'calendar',{eventId:event.id},'calendars_main_dark_mode');
  }
  // Android has a limited pending-alarm budget; retain the soonest 60.
  // Allocate deterministic distinct native IDs even if two hashes collide.
  const used=new Set();
  return notifications.sort((a,b)=>a.schedule.at-b.schedule.at||a.extra.key.localeCompare(b.extra.key)).filter((item,index,all)=>index===0||item.extra.key!==all[index-1].extra.key||item.extra.at!==all[index-1].extra.at).slice(0,limit).map(item=>{while(used.has(item.id))item.id=item.id===0x7fffffff?1:item.id+1;used.add(item.id);return item;});
}

async function reconcileNativeReminders(){
  const permission=await checkNotificationPermission();
  if(permission!=='granted')return {success:false,reason:'permission_not_granted',permission};
  await initializeNotificationChannels();
  registerNotificationTapListener();
  const exactPermission=await checkExactReminderPermission();
  const exact=exactPermission==='granted';
  // Never open system settings from automatic background reconciliation.
  const snapshot=await readReminderSnapshot();
  const plan=buildNativeReminderPlan(new Date(),{snapshot}).map(item=>({...item,isExactNotification:Capacitor.getPlatform()==='android'?exact:undefined,extra:{...item.extra,exact:Capacitor.getPlatform()==='android'?exact:null}}));
  const pending=(await LocalNotifications.getPending()).notifications||[];
  const managed=pending.filter(item=>item.extra?.momentumManaged||['task','routine','prayer','calendar','nudge'].includes(item.extra?.type));
  const wanted=new Map(plan.map(item=>[item.id,item]));
  const same=(old,next)=>next&&old.extra?.key===next.extra.key&&old.extra?.at===next.extra.at&&old.extra?.exact===next.extra.exact&&old.title===next.title&&old.body===next.body&&old.channelId===next.channelId;
  const obsolete=managed.filter(item=>!same(item,wanted.get(item.id)));
  if(obsolete.length)await LocalNotifications.cancel({notifications:obsolete.map(({id})=>({id}))});
  const unchanged=new Set(managed.filter(item=>same(item,wanted.get(item.id))).map(item=>item.id));
  const changed=plan.filter(item=>!unchanged.has(item.id));
  let warning=null;
  if(changed.length){const result=await LocalNotifications.schedule({notifications:changed});warning=result?.warning?.code||null;}
  return {success:true,isNative:true,scheduledCount:plan.length,exactPermission,warning};
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
  watch(useSettingsStore,s=>[s.masterEnabled,s.dueTaskAlerts,s.routineAlertsEnabled,s.calendarAlertsEnabled,s.prayerAlertsEnabled,s.enabledPrayerAlerts,s.adhanOffset,s.adhanMode,s.morningIntention,s.dailyRadianceQuote,s.middayPause,s.dailyHabitCheckin,s.eveningWinddown,s.zenFocusDND,s.alarmOnlyOccurrences]);
  watch(usePrayerStore,s=>[s.prayerAlertsEnabled,s.adhanOffset,s.calculationMethod,s.madhab,s.highLatitudeRule,s.polarCircleResolution,s.prayerAdjustments]);
  setInterval(sync,60000);
  App.addListener('appStateChange',state=>{if(state.isActive)sync();}).catch(error=>console.warn('[Notifications] Resume listener failed',error));
}
export const scheduleAllReminders = scheduleAllActiveNotifications;
