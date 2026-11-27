import {useState,useEffect} from 'react';
import {registerPlugin,Capacitor} from '@capacitor/core';
import {AlarmClock} from 'lucide-react';
import {useLocaleStore} from '../store/useLocaleStore.js';
import {useSettingsStore} from '../store/useSettingsStore.js';
import {useTaskStore} from '../store/useTaskStore.js';
import {useRoutineStore} from '../store/useRoutineStore.js';
import {usePrayerStore} from '../store/usePrayerStore.js';
import {useCalendarStore} from '../store/useCalendarStore.js';
import {useLocationStore} from '../store/useLocationStore.js';
import {buildNativeReminderPlan,scheduleAllActiveNotifications,checkExactReminderPermission,openExactReminderSettings} from '../utils/nativeNotifications.js';
import {toast} from './ui/toast/index.js';
const Device=registerPlugin('MomentumDevice');
const RING={en:['Momentum ringing alarms','Choose categories that should ring with the phone alarm sound. Stop or snooze from the alarm notification. Silent routines and vibration-only prayers keep normal notifications.','Ringing alarms need notification and exact-alarm permission.','Sound stops automatically after two minutes. Snooze is five minutes.'], 'fa-AF':['زنگ‌های Momentum','بخش‌هایی را که با صدای زنگ گوشی هشدار بدهند انتخاب کنید. توقف یا تعویق در اعلان زنگ امکان دارد. برنامه‌های بی‌صدا و نمازهای لرزشی اعلان عادی دارند.','برای زنگ، مجوز اعلان و زمان دقیق لازم است.','صدا پس از دو دقیقه قطع می‌شود؛ تعویق پنج دقیقه است.'], 'ps-AF':['د Momentum خپل الارمونه','هغه برخې وټاکئ چې د موبایل د الارم غږ وکړي. زنګ د خبرتیا له لارې بند یا وځنډوئ. خاموش روټینونه او یوازې رپېدونکي لمونځونه عادي خبرتیا لري.','الارم د خبرتیا او دقیق وخت اجازې ته اړتیا لري.','غږ دوه دقیقې وروسته درېږي؛ ځنډ پنځه دقیقې دی.']};
const EXACT={en:['Exact reminder timing','Android may delay reminders until exact alarms are allowed.','Open alarms & reminders settings'],'fa-AF':['زمان دقیق یادآوری','اندروید ممکن است یادآوری‌ها را تا زمان صدور مجوز زنگ دقیق به تأخیر بیندازد.','باز کردن تنظیمات زنگ و یادآوری'],'ps-AF':['د یادونې دقیق وخت','تر دقیق الارم اجازې پورې Android ښايي یادونې وځنډوي.','د الارم او یادونو تنظیمات خلاص کړئ']};
const COPY={
 en:{title:'Reminder schedule',intro:'Upcoming reminders from all sections, in time order. Android Clock alarms are separate and must be confirmed in Clock.',routine:'Routine reminders',calendar:'Calendar reminders',all:'All',task:'Tasks',prayer:'Prayers',nudge:'Daily check-ins',empty:'No upcoming reminders.',choose:'Choose a reminder',clock:'Open Android Clock',opened:'Clock opened. Confirm the alarm there; Momentum cannot verify it.',failed:'Could not open Android Clock.',saved:'Reminder preference saved.',error:'Could not update reminder scheduling.',restore:'Restore Momentum notification',external:'Notification disabled for this occurrence by an earlier Clock preference.',limited:'Android schedules the next 60 eligible reminders. The queue refreshes while Momentum is active.',clockHint:'Clock can only set a time within the next 24 hours. It is not managed or cancelled by Momentum.',enabled:'Enabled',disabled:'Disabled'},
 'fa-AF':{title:'برنامه یادآوری‌ها',intro:'یادآوری‌های همه بخش‌ها به ترتیب زمان. زنگ ساعت اندروید جداگانه است و باید در برنامه ساعت تأیید شود.',routine:'یادآوری برنامه روزانه',calendar:'یادآوری تقویم',all:'همه',task:'وظایف',prayer:'نمازها',nudge:'یادآوری روزانه',empty:'یادآوری آینده وجود ندارد.',choose:'انتخاب یادآوری',clock:'باز کردن ساعت اندروید',opened:'ساعت باز شد. زنگ را در آن تأیید کنید؛ ثبت آن قابل بررسی نیست.',failed:'باز کردن ساعت ممکن نشد.',saved:'تنظیم یادآوری ذخیره شد.',error:'تنظیم یادآوری انجام نشد.',restore:'فعال کردن دوباره اعلان Momentum',external:'اعلان این نوبت قبلاً برای زنگ ساعت خاموش شده است.',limited:'اندروید ۶۰ یادآوری بعدی را تنظیم می‌کند. فهرست هنگام فعال بودن برنامه به‌روز می‌شود.',clockHint:'ساعت فقط زمان ۲۴ ساعت آینده را تنظیم می‌کند و Momentum آن را مدیریت یا لغو نمی‌کند.',enabled:'فعال',disabled:'غیرفعال'},
 'ps-AF':{title:'د یادونو مهال‌وېش',intro:'د ټولو برخو راتلونکې یادونې د وخت په ترتیب. د Android ساعت الارم جلا دی او هلته باید تایید شي.',routine:'د ورځنیو روټینونو یادونې',calendar:'د کلیزې یادونې',all:'ټولې',task:'تاسکونه',prayer:'لمونځونه',nudge:'ورځنۍ یادونې',empty:'راتلونکې یادونه نشته.',choose:'یادونه وټاکئ',clock:'د Android ساعت خلاص کړئ',opened:'ساعت خلاص شو. الارم هلته تایید کړئ؛ Momentum یې ثبت نه شي تاییدولی.',failed:'ساعت خلاص نه شو.',saved:'د یادونې تنظیم خوندي شو.',error:'یادونه تنظیم نه شوه.',restore:'د Momentum خبرتیا بېرته فعاله کړئ',external:'د دې نوبت خبرتیا مخکې د ساعت الارم لپاره بنده شوې.',limited:'Android راتلونکې ۶۰ وړ یادونې تنظیموي. لېست د اپلېکېشن د فعالېدو پر مهال تازه کېږي.',clockHint:'ساعت یوازې د راتلونکو ۲۴ ساعتونو وخت ټاکي؛ Momentum یې نه اداره کوي او نه لغوه کوي.',enabled:'فعال',disabled:'بند'}
};
export default function ReminderAlarmCard({isNative}) {
 const locale=useLocaleStore(s=>s.currentLocale);
 const system=useLocaleStore(s=>s.numberSystem);
 const c=COPY[locale]||COPY.en;
 const settings=useSettingsStore();
 useTaskStore(s=>s.tasks);
 useRoutineStore(s=>s.routines);
 usePrayerStore();
 useCalendarStore(s=>s.events);
 useLocationStore(s=>s.selectedCity);
 const [now,setNow]=useState(()=>new Date());
 const [selected,setSelected]=useState('');
 const [filter,setFilter]=useState('all');
 const [busy,setBusy]=useState(false);
 const [exact,setExact]=useState('unknown');
 const android=Capacitor.getPlatform()==='android';
 const ec=EXACT[locale]||EXACT.en;
 const rc=RING[locale]||RING.en;
 const toggleRing=async type=>{
   if(busy)return;setBusy(true);
   try{await settings.setSetting('ringingAlarmSources',{...settings.ringingAlarmSources,[type]:settings.ringingAlarmSources?.[type]!==true});const result=await scheduleAllActiveNotifications();if(!result.success||result.warning)throw Error('Schedule failed');toast.info(c.saved);}catch{toast.error(c.error);}finally{setBusy(false);}
 };
 useEffect(()=>{if(!android)return;let active=true;const refresh=()=>checkExactReminderPermission().then(value=>{if(active)setExact(value);});refresh();window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);return()=>{active=false;window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};},[android]);
 useEffect(()=>{const refresh=()=>setNow(new Date());const timer=setInterval(refresh,15000);window.addEventListener('focus',refresh);return()=>{clearInterval(timer);window.removeEventListener('focus',refresh);};},[]);
 const items=buildNativeReminderPlan(now,{includeAlarmOnly:true,limit:Infinity});
 const keyOf=x=>x.extra.key+'@'+x.extra.at;
 const filtered=items.filter(x=>filter==='all'||x.extra.type===filter);
 const item=items.find(x=>keyOf(x)===selected);
 const suppressed=item&&settings.alarmOnlyOccurrences?.[item.extra.key]===item.extra.at;
 const label=type=>({task:c.task,routine:c.routine,prayer:c.prayer,calendar:c.calendar,nudge:c.nudge}[type]||type);
 const format=at=>new Intl.DateTimeFormat(locale,{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',numberingSystem:system}).format(at);
 const toggle=async key=>{
   if(busy)return;setBusy(true);
   try{await settings.setSetting(key,settings[key]===false);const result=await scheduleAllActiveNotifications();if(!result.success)throw Error('Schedule failed');toast.info(c.saved);}catch{toast.error(c.error);}finally{setBusy(false);}
 };
 const restore=async()=>{
   if(!item||!suppressed||busy)return;setBusy(true);
   try{const saved=await settings.setAlarmOnlyOccurrence(item.extra.key,item.extra.at,false);if(saved===false)throw Error('Save failed');const result=await scheduleAllActiveNotifications();if(!result.success)throw Error('Schedule failed');toast.info(c.saved);}catch{toast.error(c.error);}finally{setBusy(false);}
 };
 const canOpen=android&&item&&item.extra.at>Date.now()&&item.extra.at-Date.now()<86400000;
 const open=async()=>{
   if(!canOpen||busy)return;setBusy(true);
   try{const at=item.schedule.at;if(at<=new Date()||at-Date.now()>=86400000)throw Error('Expired reminder');const result=await Device.openAlarmEditor({hour:at.getHours(),minute:at.getMinutes(),label:'Momentum'});if(!result.opened)throw Error('Clock unavailable');toast.info(c.opened);}catch{toast.error(c.failed);}finally{setBusy(false);}
 };
 return <section className="rounded-3xl p-5 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 space-y-3">
   <h3 className="font-semibold text-sm flex gap-2 items-center"><AlarmClock className="w-5 h-5 text-primary"/>{c.title}</h3>
   <p className="text-xs opacity-75">{c.intro}</p>
   {[['routineAlertsEnabled',c.routine],['calendarAlertsEnabled',c.calendar]].map(([key,name])=><label key={key} className="flex items-center justify-between gap-3 text-sm"><span>{name}</span><input type="checkbox" checked={settings[key]!==false} disabled={busy} onChange={()=>toggle(key)}/></label>)}
   <div className="flex flex-wrap gap-2">{['all','task','routine','prayer','calendar','nudge'].map(type=><button key={type} type="button" aria-pressed={filter===type} onClick={()=>setFilter(type)} className={'rounded-full px-3 py-1 text-xs border '+(filter===type?'bg-indigo-600 text-white border-indigo-600':'border-current/20')}>{type==='all'?c.all:label(type)}</button>)}</div>
   <div className="max-h-64 overflow-auto space-y-1">
   {!filtered.length&&<p className="text-xs opacity-75">{c.empty}</p>}
   {filtered.map(x=><button key={keyOf(x)} type="button" onClick={()=>setSelected(keyOf(x))} aria-pressed={selected===keyOf(x)} className={'w-full text-start rounded-xl p-2 border '+(selected===keyOf(x)?'border-indigo-500':'border-current/10')}><span className="block text-xs opacity-75">{label(x.extra.type)} · {format(x.schedule.at)}</span><span className="block text-sm break-words">{x.body}</span>{settings.alarmOnlyOccurrences?.[x.extra.key]===x.extra.at&&<span className="block text-xs opacity-75">{c.external}</span>}</button>)}
   </div>
   {android&&<section className="rounded-xl border border-current/15 p-3 space-y-2"><p className="text-sm font-semibold">{rc[0]}</p><p className="text-xs opacity-75">{rc[1]}</p>{['task','routine','prayer','calendar','nudge'].map(type=><label key={type} className="flex items-center justify-between gap-3 text-sm"><span>{label(type)}</span><input type="checkbox" checked={settings.ringingAlarmSources?.[type]===true} disabled={busy} onChange={()=>toggleRing(type)}/></label>)}<p className="text-xs opacity-75">{rc[2]} {rc[3]}</p></section>}
   {android&&<div className="rounded-xl border border-current/15 p-3 space-y-2"><p className="text-sm font-semibold">{ec[0]} · {exact==='granted'?c.enabled:c.disabled}</p>{exact!=='granted'&&<><p className="text-xs opacity-75">{ec[1]}</p><button type="button" className="text-xs underline" onClick={async()=>{try{setExact(await openExactReminderSettings());await scheduleAllActiveNotifications();}catch{toast.error(c.error);}}}>{ec[2]}</button></>}</div>}
   {isNative&&<p className="text-xs opacity-75">{c.limited}</p>}{android&&<><p className="text-xs opacity-75">{c.clockHint}</p><button type="button" disabled={!canOpen||busy} onClick={open} className="w-full rounded-xl px-3 py-2 bg-indigo-600 text-white text-sm font-semibold disabled:opacity-40">{c.clock}</button></>}
   {suppressed&&<button type="button" disabled={busy} onClick={restore} className="w-full rounded-xl px-3 py-2 border border-primary/30 text-sm font-semibold text-primary disabled:opacity-40">{c.restore}</button>}
 </section>;
}
