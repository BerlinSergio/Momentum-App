import {useState,useEffect} from 'react';
import {registerPlugin} from '@capacitor/core';
import {AlarmClock} from 'lucide-react';
import {useLocaleStore} from '../store/useLocaleStore.js';
import {useSettingsStore} from '../store/useSettingsStore.js';
import {buildNativeReminderPlan,scheduleAllActiveNotifications} from '../utils/nativeNotifications.js';
import {toast} from './ui/toast/index.js';
const Device=registerPlugin('MomentumDevice');
const EXTRA={en:['I saved this alarm — disable its notification','Use notification again','Alarm-only for this occurrence. If you edit or cancel it in Clock, enable the notification again here.','Reminder preference saved.','Could not update reminder scheduling.'], 'fa-AF':['زنگ را ذخیره کردم؛ اعلان آن خاموش شود','فعال کردن دوبارهٔ اعلان','فقط برای همین نوبت. اگر زنگ را در ساعت تغییر یا لغو کردید، اعلان را دوباره فعال کنید.','ترجیح یادآوری ذخیره شد.','تنظیم یادآوری انجام نشد.'], 'ps-AF':['الارم مې خوندي کړ؛ خبرتیا یې بنده کړئ','خبرتیا بیا فعاله کړئ','یوازې د همدې وخت لپاره. که په ساعت کې الارم بدل یا لغوه کړئ، دلته خبرتیا بیا فعاله کړئ.','د یادونې انتخاب خوندي شو.','یادونه تنظیم نه شوه.']};
const COPY={
 en:['Alarm clock','Choose an upcoming reminder, then confirm the alarm in your Android Clock app. Alarms are managed separately from notifications.','Choose a reminder','Open alarm editor','No eligible reminders in the next 24 hours','Android Clock opened. Confirm the alarm there.','Unable to open Android Clock.'],
 'fa-AF':['زنگ هشدار','یک یادآوری آینده را انتخاب کنید و زنگ را در برنامه ساعت اندروید تأیید نمایید. زنگ‌ها جدا از اعلان‌ها مدیریت می‌شوند.','انتخاب یادآوری','باز کردن ساعت','در ۲۴ ساعت آینده یادآوری مناسب وجود ندارد','ساعت باز شد. زنگ را در آن تأیید کنید.','باز کردن ساعت اندروید ممکن نشد.'],
 'ps-AF':['الارم','راتلونکې یادونه وټاکئ او د Android ساعت په اپلکېشن کې الارم تایید کړئ. الارمونه له خبرتیاوو جلا اداره کېږي.','یادونه وټاکئ','د ساعت خلاصول','په راتلونکو ۲۴ ساعتونو کې مناسبه یادونه نشته','ساعت خلاص شو. الارم هلته تایید کړئ.','د Android ساعت خلاص نه شو.']
};
export default function ReminderAlarmCard({isNative}) {
 const locale=useLocaleStore(s=>s.currentLocale);
 const system=useLocaleStore(s=>s.numberSystem);
 const c=COPY[locale]||COPY.en;
 const e=EXTRA[locale]||EXTRA.en;
 const alarmOnly=useSettingsStore(s=>s.alarmOnlyOccurrences)||{};
 const [openedOccurrence,setOpenedOccurrence]=useState('');
 const [items,setItems]=useState([]);
 const [selected,setSelected]=useState('');
 const [busy,setBusy]=useState(false);
 useEffect(()=>{
   if(!isNative)return;
   const refresh=()=>{
     const now=new Date();
     setItems(buildNativeReminderPlan(now,{includeAlarmOnly:true}).filter(x=>x.schedule.at-now<86400000));
   };
   refresh();const id=setInterval(refresh,60000);
   return ()=>clearInterval(id);
 },[isNative]);
 if(!isNative)return null;
 const item=items.find(x=>String(x.id)===selected);
 const occurrence=item?item.extra.key+':'+item.schedule.at.getTime():'';
 const suppressed=item&&alarmOnly[item.extra.key]===item.schedule.at.getTime();
 const changeMode=async enabled=>{
   if(!item||busy)return;setBusy(true);
   try {const saved=await useSettingsStore.getState().setAlarmOnlyOccurrence(item.extra.key,item.schedule.at.getTime(),enabled);if(saved===false)throw Error('Save failed');const result=await scheduleAllActiveNotifications();if(!result.success)throw Error('Schedule failed');toast.info(e[3]);}catch{toast.error(e[4]);}finally{setBusy(false);}
 };
 const open=async()=>{
   if(!item||busy)return;
   setBusy(true);
   try {
     const at=item.schedule.at;
     if(at<=new Date()||at-Date.now()>=86400000)throw Error('Expired reminder');
     const result=await Device.openAlarmEditor({hour:at.getHours(),minute:at.getMinutes(),label:'Momentum'});
     if(result.opened){setOpenedOccurrence(occurrence);toast.info(c[5]);}else throw Error('Clock unavailable');
   }catch{toast.error(c[6]);}finally{setBusy(false);}
 };
 return <section className="rounded-3xl p-5 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 space-y-3">
   <h3 className="font-semibold text-sm flex gap-2 items-center"><AlarmClock className="w-5 h-5 text-primary"/>{c[0]}</h3>
   <p className="text-xs opacity-75">{c[1]}</p>
   <select aria-label={c[2]} value={selected} onChange={e=>setSelected(e.target.value)} className="w-full min-w-0 rounded-xl p-2 bg-white dark:bg-slate-800 border border-current/15 text-sm">
     <option value="">{items.length?c[2]:c[4]}</option>
     {items.map(x=><option key={x.id} value={x.id}>{x.body} — {new Intl.DateTimeFormat(locale,{hour:'2-digit',minute:'2-digit',numberingSystem:system}).format(x.schedule.at)}</option>)}
   </select>
   <button type="button" disabled={!item||busy} onClick={open} className="w-full rounded-xl px-3 py-2 bg-indigo-600 text-white text-sm font-semibold disabled:opacity-40">{c[3]}</button>
   {item&&(suppressed||openedOccurrence===occurrence)&&<div className="space-y-2"><p className="text-xs opacity-75">{e[2]}</p><button type="button" disabled={busy} onClick={()=>changeMode(!suppressed)} className="w-full rounded-xl px-3 py-2 border border-primary/30 text-sm font-semibold text-primary disabled:opacity-40">{suppressed?e[1]:e[0]}</button></div>}
 </section>;
}
