import {useTranslation} from 'react-i18next';
const CHECKLIST = /^(\s*[-*]\s+\[)([ xX])(\])(?:[ \t]?(.*))$/;
export function hasChecklist(body) {
  return String(body || '').split('\n').some(line => CHECKLIST.test(line));
}
export function toggleChecklistLine(body,index) {
  const lines=String(body || '').split('\n');
  const match=lines[index]?.match(CHECKLIST);
  if (!match) return body;
  lines[index]=match[1]+(match[2].toLowerCase()==='x'?' ':'x')+match[3]+' '+(match[4]||'');
  return lines.join('\n');
}
export default function QuickNoteChecklistBody({body,editing,onChange,onToggle,busy=false}) {
  const {t}=useTranslation();
  const lines=String(body || '').split('\n');
  const replace=(index,value)=>onChange(lines.map((line,i)=>i===index?value:line).join('\n'));
  return <div className="space-y-2 text-sm leading-relaxed select-text" data-testid="quick-note-checklist">
    {lines.map((line,index)=>{
      const match=line.match(CHECKLIST);
      if(!match) return editing
        ? <textarea key={index} rows={1} aria-label={t('notes.noteText','Note text')} value={line} onChange={event=>replace(index,event.target.value)} className="w-full min-h-8 resize-y bg-transparent text-current border-b border-current/10 p-1"/>
        : <p key={index} className="whitespace-pre-wrap min-h-2 break-words">{line}</p>;
      const checked=match[2].toLowerCase()==='x';
      return <div key={index} className="flex items-center gap-2 min-h-9">
        <input type="checkbox" checked={checked} disabled={busy} data-testid="quick-note-check-item" aria-label={match[4] || t('notes.checklistItem','Checklist item')}
          onChange={()=>editing?onChange(toggleChecklistLine(body,index)):onToggle(index)} className="w-5 h-5 shrink-0 accent-indigo-500 cursor-pointer"/>
        {editing ? <>
          <input autoFocus={index===lines.length-1&&!match[4]} type="text" value={match[4]||''} aria-label={t('notes.checklistItem','Checklist item')} placeholder={t('notes.checklistItem','Checklist item')} onChange={event=>replace(index,match[1]+match[2]+match[3]+' '+event.target.value)} className="flex-1 min-w-0 bg-transparent text-current p-1"/>
          <button type="button" aria-label={t('notes.removeChecklistItem','Remove checklist item')} onClick={()=>onChange(lines.filter((_,i)=>i!==index).join('\n'))} className="p-2 opacity-70">×</button>
        </> : <span className={checked?'line-through opacity-60 break-words':'break-words'}>{match[4]||t('notes.checklistItem','Checklist item')}</span>}
      </div>;
    })}
  </div>;
}
