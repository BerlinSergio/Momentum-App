// Shared civil-time rules for notification and alarm occurrences.
const OFF = /^(none|off|no reminder|disabled)$/i;
export function parseReminderClock(value) {
  const text = String(value ?? '').trim();
  const match = /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i.exec(text);
  if (!match) return null;
  let h = Number(match[1]); const m = Number(match[2]);
  if (m > 59 || (match[3] ? h < 1 || h > 12 : h > 23)) return null;
  if (match[3]) h = h % 12 + (/pm/i.test(match[3]) ? 12 : 0);
  return [h,m];
}
export function civilReminderDate(key, clock) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(key ?? ''));
  const time = parseReminderClock(clock);
  if (!m || !time) return null;
  const y=Number(m[1]), month=Number(m[2]), day=Number(m[3]);
  const [h,min]=time;
  const at=new Date(y,month-1,day,h,min,0,0);
  // A nonexistent DST wall time must not silently turn into another hour.
  if(at.getFullYear()!==y||at.getMonth()!==month-1||at.getDate()!==day||at.getHours()!==h||at.getMinutes()!==min)return null;
  return at;
}
export function reminderDisabled(item) {
  return !item || item.reminderEnabled===false || OFF.test(String(item.reminder??'').trim());
}
export function parseReminderOffset(value, explicit) {
  if (explicit !== undefined && explicit !== null && explicit !== '') {
    const n=Number(explicit);return Number.isInteger(n)&&n>=0&&n<=1440?n:null;
  }
  const text=String(value??'').trim().toLowerCase();
  if(!text || /^(at time( of event)?|at start|at arrival|on time)$/.test(text))return 0;
  const match=/^(\d+)\s*(m|min|mins|minute|minutes|h|hr|hour|hours|d|day|days)(?:\s+before)?$/.exec(text);
  if(!match)return null;
  const multiplier=/^(h|hr|hour|hours)$/.test(match[2])?60:/^(d|day|days)$/.test(match[2])?1440:1;
  const n=Number(match[1])*multiplier;
  return n<=1440?n:null;
}
export function calculateTaskTriggerDate(task) {
  if(reminderDisabled(task)||!task.dueDate)return null;
  const base=civilReminderDate(task.dueDate,task.startTime||'09:00');
  if(!base)return null;
  const legacyClock=parseReminderClock(task.reminder);
  if(legacyClock)return civilReminderDate(task.dueDate,task.reminder);
  const offset=parseReminderOffset(task.reminder,task.reminderOffsetMinutes);
  return offset===null?null:new Date(base.getTime()-offset*60000);
}
export function calculateRoutineTriggerDate(routine, day=new Date()) {
  if(reminderDisabled(routine))return null;
  const key=[day.getFullYear(),String(day.getMonth()+1).padStart(2,'0'),String(day.getDate()).padStart(2,'0')].join('-');
  const base=civilReminderDate(key,routine.targetTime||routine.time);
  const offset=parseReminderOffset(routine.reminder,routine.reminderOffset);
  return !base||offset===null?null:new Date(base.getTime()-offset*60000);
}
export function occurrenceKey(key, at) {return key+'@'+at.getTime();}
export function isCivilQuiet(settings,at) {
  if(!settings.zenFocusDND)return false;
  const minute=at.getHours()*60+at.getMinutes();
  return minute>=22*60+30||minute<4*60+30;
}
export function matchesReminderSource(item,type,id) {
  const extra=item?.extra||{};
  if(extra.type!==type)return false;
  const field={task:'taskId',routine:'routineId',calendar:'eventId',prayer:'prayer'}[type];
  return Boolean(field)&&String(extra.params?.[field])===String(id);
}

// Stable preferences follow the source item, not an individual occurrence date.
export function reminderPreferenceKey(type,params={}) {
  const id=({task:params.taskId,routine:params.routineId,calendar:params.eventId,prayer:params.prayer,nudge:params.nudgeId})[type];
  return id===undefined||id===null?null:type+':'+String(id);
}
export function validReminderType(value){return value==='notification'||value==='alarm';}
export function resolveReminderType(settings={},type,itemType,params={},ringEligible=true) {
  const key=reminderPreferenceKey(type,params);
  const override=key?settings.reminderTypes?.[key]:undefined;
  if(validReminderType(itemType))return itemType;
  if(validReminderType(override))return override;
  // Legacy category choices and silent/vibration preferences are preserved.
  if(settings.ringingAlarmSources?.[type]===true&&ringEligible)return 'alarm';
  return 'notification';
}
export function defaultReminderType(settings={},type){
  const value=settings.reminderSourceDefaults?.[type]??settings.defaultReminderType;
  return validReminderType(value)?value:'notification';
}
// Recent occurrences retain native snooze state; only future items inside the
// selected native queue may create new alarms.
export function selectRingingOccurrences(future,recent,sources={},language='en',now=new Date()){
  const futureKeys=new Set(future.map(item=>occurrenceKey(item.extra.key,item.schedule.at)));
  const seen=new Set();
  return recent.flatMap(item=>{
    const key=occurrenceKey(item.extra.key,item.schedule.at);
    const explicit=item.extra.reminderType;
    if((validReminderType(explicit)?explicit!=='alarm':sources?.[item.extra.type]!==true||item.extra.ringEligible===false)||seen.has(key))return [];
    if(item.schedule.at>now&&!futureKeys.has(key))return [];
    seen.add(key);
    return [{key,at:item.schedule.at.getTime(),title:item.body||item.title,language}];
  }).slice(0,1000);
}
