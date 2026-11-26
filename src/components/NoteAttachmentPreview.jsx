import {useEffect,useState} from 'react';
import {Image,FileText,Music,Film,Paperclip} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {resolveAttachmentUrl} from '../storage/attachmentStorage.js';

function ImagePreview({attachment}) {
  const [url,setUrl]=useState('');
  useEffect(()=>{
    let live=true;
    setUrl('');
    resolveAttachmentUrl(attachment).then(value=>{
      if(live && /^(blob:|data:image\/(png|jpeg|gif|webp|bmp);base64,|https:\/\/)/i.test(value)) setUrl(value);
    }).catch(()=>{});
    return ()=>{live=false;};
  },[attachment]);
  return url ? <img src={url} alt={attachment.name||''} loading="lazy" decoding="async" className="w-full h-24 object-cover rounded-lg" onError={()=>setUrl('')}/> :
    <div className="h-24 flex items-center justify-center rounded-lg bg-slate-500/10"><Image className="w-6 h-6 opacity-60"/></div>;
}

export default function NoteAttachmentPreview({attachments}) {
  const {t}=useTranslation();
  const list=Array.isArray(attachments)?attachments.filter(Boolean):[];
  if(!list.length)return null;
  return <div className="mt-1 min-w-0 space-y-1.5" data-testid="note-attachment-preview">
    <div className="grid grid-cols-2 gap-2 min-w-0">
      {list.slice(0,4).map((att,i)=>{
        const Icon=att.type==='audio'?Music:att.type==='video'?Film:att.type==='image'?Image:FileText;
        return <div key={att.id||i} className="min-w-0 rounded-xl overflow-hidden border border-current/10 p-1.5">
          {att.type==='image'&&<ImagePreview attachment={att}/>}
          <div className="flex gap-1 items-center py-1 min-w-0">
            <Icon className="w-4 h-4 shrink-0 opacity-70"/>
            <span className="text-[11px] truncate" title={att.name}>{att.name||t('notes.attachmentDetails','Attachment')}</span>
          </div>
        </div>;
      })}
    </div>
    {list.length>4&&<div className="text-xs flex gap-1 items-center opacity-75"><Paperclip className="w-3 h-3"/>+{list.length-4}</div>}
  </div>;
}
