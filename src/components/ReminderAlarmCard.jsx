import {useState,useEffect} from 'react';
import {Capacitor} from '@capacitor/core';
import {AlarmClock} from 'lucide-react';
import {useLocaleStore} from '../store/useLocaleStore.js';
import {useSettingsStore} from '../store/useSettingsStore.js';
import {useTaskStore} from '../store/useTaskStore.js';
import {useRoutineStore} from '../store/useRoutineStore.js';
import {usePrayerStore} from '../store/usePrayerStore.js';
import {useCalendarStore} from '../store/useCalendarStore.js';
import {useLocationStore} from '../store/useLocationStore.js';
import {buildNativeReminderPlan,scheduleAllActiveNotifications,checkExactReminderPermission,openExactReminderSettings} from '../utils/nativeNotifications.js';
import {defaultReminderType,reminderPreferenceKey,resolveReminderType,reminderDisabled} from '../utils/reminderRules.js';
import ReminderTypePicker from './ReminderTypePicker.jsx';
import {toast} from './ui/toast/index.js';
const COPY={
 en:{title:'Reminders',intro:'Choose Notification or Alarm for each item. Repeated reminders keep the same choice.',types:['Tasks','Routines','Prayers','Calendar','Daily check-ins'],empty:'No reminders in this section.',defaults:'Default for new items',advanced:'Section defaults',active:'Enabled',exact:'Exact alarm permission',open:'Open Android alarm settings',fallback:'Without exact alarm permission, Momentum uses an ordinary notification. Android settings may affect delivery.',web:'Ringing alarms are available on Android. On this device reminders use notifications while Momentum is active.',sound:'Alarm: phone alarm sound · Stop · 5-minute Snooze · stops after 2 minutes. Notification sound and vibration follow Android notification settings.',saved:'Reminder preference saved.',error:'Could not save reminder preference.',warning:'Saved, but delivery needs attention. Check device permissions.',restore:'Restore this previously suppressed occurrence',limited:'Android queues the next 60 eligible reminders; the queue refreshes while Momentum is active.',quiet:'Quiet hours and section switches still apply.'},
 'fa-AF':{title:'یادآوری‌ها',intro:'برای هر مورد اعلان یا زنگ را انتخاب کنید. انتخاب برای نوبت‌های تکراری حفظ می‌شود.',types:['وظایف','برنامه‌های روزانه','نمازها','تقویم','یادآوری‌های روزانه'],empty:'در این بخش یادآوری وجود ندارد.',defaults:'پیش‌فرض موارد جدید',advanced:'پیش‌فرض بخش‌ها',active:'فعال',exact:'مجوز زنگ دقیق',open:'تنظیمات زنگ اندروید',fallback:'بدون مجوز زنگ دقیق، اعلان عادی استفاده می‌شود. تنظیمات اندروید بر دریافت اثر دارد.',web:'زنگ صوتی در اندروید در دسترس است. در این دستگاه اعلان هنگام فعال بودن Momentum ارائه می‌شود.',sound:'زنگ: صدای زنگ گوشی، توقف، تعویق پنج دقیقه، قطع خودکار پس از دو دقیقه. صدا و لرزش اعلان تابع تنظیمات اندروید است.',saved:'تنظیم یادآوری ذخیره شد.',error:'ذخیره یادآوری انجام نشد.',warning:'ذخیره شد، اما مجوزهای دستگاه را بررسی کنید.',restore:'فعال کردن دوباره این نوبت قبلاً خاموش‌شده',limited:'اندروید ۶۰ یادآوری بعدی را تنظیم می‌کند؛ فهرست هنگام فعال بودن برنامه تازه می‌شود.',quiet:'ساعات سکوت و کلیدهای بخش‌ها همچنان اعمال می‌شوند.'},
 'ps-AF':{title:'یادونې',intro:'د هرې یادونې لپاره خبرتیا یا الارم وټاکئ. تکراري یادونې خپل انتخاب ساتي.',types:['تاسکونه','روټینونه','لمونځونه','کلیزه','ورځنۍ یادونې'],empty:'په دې برخه کې یادونه نشته.',defaults:'د نویو یادونو اصلي ډول',advanced:'د برخو اصلي ډول',active:'فعال',exact:'د دقیق الارم اجازه',open:'د Android الارم تنظیمات خلاص کړئ',fallback:'له دقیق الارم اجازې پرته عادي خبرتیا کارول کېږي. د Android تنظیمات په رسېدو اغېز لري.',web:'غږیز الارم په Android کې شته. په دې وسیله کې خبرتیا د Momentum د فعالېدو پر مهال رسېږي.',sound:'الارم: د موبایل غږ، بندول، پنځه دقیقې ځنډ، دوه دقیقې وروسته درېدل. د خبرتیا غږ او رپېدل د Android تنظیماتو پورې اړه لري.',saved:'د یادونې انتخاب خوندي شو.',error:'د یادونې انتخاب خوندي نه شو.',warning:'انتخاب خوندي شو، خو د وسیلې اجازې وګورئ.',restore:'دا پخوانۍ بنده شوې یادونه بېرته فعاله کړئ',limited:'Android راتلونکې ۶۰ وړ یادونې تنظیموي؛ لېست د اپلېکېشن د فعالېدو پر مهال تازه کېږي.',quiet:'د خاموشۍ ساعتونه او د برخو سویچونه لا هم پلي کېږي.'}
};
const TYPES=['task','routine','prayer','calendar','nudge'];
const NUDGES=['morningIntention','dailyRadianceQuote','middayPause','dailyHabitCheckin','eveningWinddown'];
const NUDGE_NAMES={
 en:['Morning intention','Daily radiance','Midday pause','Daily habit check-in','Evening wind-down'],
 'fa-AF':['نیت صبح','الهام روزانه','وقفه ظهر','بررسی عادت‌ها','آرامش شام'],
 'ps-AF':['د سهار نیت','ورځنی الهام','د غرمې وقفه','د عادتونو کتنه','د ماښام آرامتیا']
};
export default function ReminderAlarmCard(){
 const locale=useLocaleStore(s=>s.currentLocale);
 const c=COPY[locale]||COPY.en;
 const settings=useSettingsStore();
 const tasks=useTaskStore(s=>s.tasks);
 const routines=useRoutineStore(s=>s.routines);
 const events=useCalendarStore(s=>s.events);
 usePrayerStore();
 useLocationStore(s=>s.selectedCity);
 const [type,setType]=useState('task');
 const [busy,setBusy]=useState(false);
 const [exact,setExact]=useState('unknown');
 const android=Capacitor.getPlatform()==='android';
 const flags={task:'dueTaskAlerts',routine:'routineAlertsEnabled',prayer:'prayerAlertsEnabled',calendar:'calendarAlertsEnabled'};
 useEffect(()=>{if(!android)return;let active=true;const refresh=()=>checkExactReminderPermission().then(value=>{if(active)setExact(value);});refresh();window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);return()=>{active=false;window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};},[android]);
 const entries={
 task:(tasks||[]).filter(t=>!t.completed&&t.status!=='done'&&!t.archived&&!t.isDeleted&&!reminderDisabled(t)).map(t=>({id:t.id,title:t.title,params:{taskId:t.id},value:t.reminderType})),
 routine:(routines||[]).filter(t=>!reminderDisabled(t)).map(t=>({id:t.id,title:t.title,params:{routineId:t.id},value:t.reminderType,eligible:t.reminderSound!=='Silent'})),
 calendar:(events||[]).filter(t=>!t.completed&&!reminderDisabled(t)).map(t=>({id:t.id,title:t.title,params:{eventId:t.id},value:t.reminderType})),
 prayer:['fajr','dhuhr','asr','maghrib','isha'].map(id=>({id,title:id.charAt(0).toUpperCase()+id.slice(1),params:{prayer:id},eligible:settings.adhanMode!=='vibration'})),
 nudge:NUDGES.map((id,i)=>({id,title:(NUDGE_NAMES[locale]||NUDGE_NAMES.en)[i],params:{nudgeId:id}}))
 };
 const save=async action=>{
   if(busy)return;setBusy(true);
   try{const result=await action();if(result===false)throw Error('Save failed');const plan=await scheduleAllActiveNotifications();if(!plan.success||plan.warning)toast.info(c.warning);else toast.info(c.saved);}catch{toast.error(c.error);}finally{setBusy(false);}
 };
 const setValue=(entry,value)=>save(()=>{
   if(type==='task')return useTaskStore.getState().updateTask(entry.id,{reminderType:value});
   if(type==='routine')return useRoutineStore.getState().updateRoutine(entry.id,{reminderType:value});
   if(type==='calendar')return useCalendarStore.getState().setEventReminderType(entry.id,value);
   const key=reminderPreferenceKey(type,entry.params);
   return settings.setSetting('reminderTypes',{...useSettingsStore.getState().reminderTypes,[key]:value});
 });
 const suppressed=buildNativeReminderPlan(new Date(),{includeAlarmOnly:true,limit:Infinity}).filter(x=>settings.alarmOnlyOccurrences?.[x.extra.key]===x.extra.at);
 return <section className="rounded-3xl p-4 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 space-y-4">
 <h3 className="font-semibold text-sm flex gap-2 items-center"><AlarmClock className="w-5 h-5 text-primary"/>{c.title}</h3>
 <p className="text-xs opacity-75">{c.intro}</p>
 <div className="flex flex-wrap gap-1.5">{TYPES.map((key,i)=><button key={key} type="button" aria-pressed={type===key} onClick={()=>setType(key)} className={'rounded-full px-3 py-1.5 text-xs border '+(type===key?'bg-indigo-600 text-white border-indigo-600':'border-current/20')}>{c.types[i]}</button>)}</div>
 {flags[type]&&<label className="flex items-center justify-between gap-2 text-sm"><span>{c.active}</span><input type="checkbox" disabled={busy} checked={settings[flags[type]]!==false} onChange={()=>save(()=>settings.setSetting(flags[type],settings[flags[type]]===false))}/></label>}
 <div className="space-y-2 max-h-96 overflow-auto">
 {!entries[type].length&&<p className="text-xs opacity-70">{c.empty}</p>}
 {entries[type].map(entry=><div key={entry.id} className="rounded-xl border border-current/10 p-2 space-y-1">
 <div className="flex items-center justify-between gap-2"><p className="text-sm font-medium break-words">{entry.title}</p>
 {type==='prayer'&&<input aria-label={entry.title+' '+c.active} type="checkbox" disabled={busy} checked={(settings.enabledPrayerAlerts||[]).some(n=>String(n).toLowerCase()===entry.id)} onChange={()=>save(()=>settings.togglePrayerAlert(entry.id))}/>}
 {type==='nudge'&&<input aria-label={entry.title+' '+c.active} type="checkbox" disabled={busy} checked={settings[entry.id]===true} onChange={()=>save(()=>settings.setSetting(entry.id,settings[entry.id]!==true))}/>}</div>
 <ReminderTypePicker compact value={resolveReminderType(settings,type,entry.value,entry.params,entry.eligible!==false)} onChange={value=>setValue(entry,value)} disabled={busy}/>
 </div>)}</div>
 <details className="rounded-xl border border-current/10 p-3 space-y-2"><summary className="text-sm font-semibold cursor-pointer">{c.defaults}</summary>
 <ReminderTypePicker compact value={defaultReminderType(settings,'')} disabled={busy} onChange={value=>save(()=>settings.setSetting('defaultReminderType',value))}/>
 <p className="text-xs opacity-70">{c.advanced}</p>
 {TYPES.filter(t=>['task','routine','calendar'].includes(t)).map(t=><div key={t}><p className="text-xs">{c.types[TYPES.indexOf(t)]}</p><ReminderTypePicker compact value={defaultReminderType(settings,t)} disabled={busy} onChange={value=>save(()=>settings.setSetting('reminderSourceDefaults',{...useSettingsStore.getState().reminderSourceDefaults,[t]:value}))}/></div>)}
 </details>
 <details className="rounded-xl border border-current/10 p-3 space-y-2"><summary className="text-sm font-semibold cursor-pointer">{c.exact}</summary>
 {android?<><p className="text-xs opacity-75">{c.fallback}</p>{exact!=='granted'&&<button type="button" className="text-xs underline" onClick={async()=>{try{setExact(await openExactReminderSettings());await scheduleAllActiveNotifications();}catch{toast.error(c.error);}}}>{c.open}</button>}<p className="text-xs opacity-75">{c.sound} {c.limited}</p></>:<p className="text-xs opacity-75">{c.web}</p>}
 <p className="text-xs opacity-75">{c.quiet}</p>
 {suppressed.map(x=><button type="button" key={x.extra.key} disabled={busy} className="block text-xs underline" onClick={()=>save(()=>settings.setAlarmOnlyOccurrence(x.extra.key,x.extra.at,false))}>{x.body}: {c.restore}</button>)}
 </details>
 </section>;
}
