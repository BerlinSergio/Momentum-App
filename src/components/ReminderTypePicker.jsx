import {Bell,AlarmClock} from 'lucide-react';
import {useLocaleStore} from '../store/useLocaleStore.js';
export const reminderLabels={
 en:{type:'Reminder type',notification:'Notification',alarm:'Alarm',hint:'Alarm rings with Stop and Snooze; notification is a normal alert.'},
 'fa-AF':{type:'نوع یادآوری',notification:'اعلان',alarm:'زنگ',hint:'زنگ با توقف و تعویق؛ اعلان یک هشدار عادی است.'},
 'ps-AF':{type:'د یادونې ډول',notification:'خبرتیا',alarm:'الارم',hint:'الارم غږ، بندول او ځنډول لري؛ خبرتیا عادي یادونه ده.'}
};
export default function ReminderTypePicker({value,onChange,disabled=false,compact=false}){
 const locale=useLocaleStore(s=>s.currentLocale);
 const c=reminderLabels[locale]||reminderLabels.en;
 return <div className="space-y-1.5 min-w-0">
 {!compact&&<div className="text-xs font-semibold opacity-80">{c.type}</div>}
 <div role="group" aria-label={c.type} className="grid grid-cols-2 gap-1 rounded-xl p-1 border border-current/10">
 {[[ 'notification',Bell],['alarm',AlarmClock]].map(([type,Icon])=><button key={type} type="button" data-testid={'reminder-type-'+type} aria-pressed={value===type} disabled={disabled} onClick={()=>onChange(type)} className={'min-w-0 flex items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold disabled:opacity-40 '+(value===type?'bg-indigo-600 text-white':'opacity-80') }><Icon className="w-4 h-4 shrink-0"/><span className="break-words">{c[type]}</span></button>)}
 </div>
 {!compact&&<p className="text-xs opacity-65">{c.hint}</p>}
 </div>;
}
