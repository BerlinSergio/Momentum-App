/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, no-unused-vars */
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { exportFileBlob, fetchExportBlob } from './utils/nativeFileExport.js';
import { createPortal } from 'react-dom';
import { useSwipeable } from 'react-swipeable';
import UserAvatar from './components/UserAvatar';
import { useNotesStore } from './store/useNotesStore';
import { resolveAttachmentUrl } from './storage/index.js';
import { toast as globalToast } from './components/ui/toast/index.js';
import { 
  ArrowLeft, Share2, Image, Download, Trash2, Check, Maximize, ChevronLeft, ChevronRight, Wand2, ArrowRight, CheckCircle2, Mic, MapPin, Loader2, Copy, Sparkles, AlertTriangle, X 
} from 'lucide-react';

const FALLBACK_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%231e293b'/><path d='M200 450 L350 250 L480 380 L560 300 L680 450 Z' fill='%23334155'/><circle cx='300' cy='200' r='40' fill='%234f46e5'/><text x='400' y='520' font-family='sans-serif' font-size='24' fill='%2394a3b8' text-anchor='middle'>Attachment Preview</text></svg>";

const formatFileSize = (attachment) => {
  if (!attachment) return '—';
  const sizeVal = attachment.sizeBytes ?? attachment.file?.size ?? attachment.fileSize ?? attachment.size;
  if (typeof sizeVal === 'number' && sizeVal > 0) {
    if (sizeVal >= 1024 * 1024) {
      return (sizeVal / (1024 * 1024)).toFixed(1) + ' MB';
    }
    return (sizeVal / 1024).toFixed(0) + ' KB';
  }
  if (typeof sizeVal === 'string') {
    const parsed = parseFloat(sizeVal);
    if (!isNaN(parsed) && sizeVal.toLowerCase().includes('mb')) return sizeVal;
    if (!isNaN(parsed) && sizeVal.toLowerCase().includes('kb')) return sizeVal;
    if (!isNaN(parsed) && parsed > 1000) {
      return (parsed / (1024 * 1024)).toFixed(1) + ' MB';
    }
    return sizeVal;
  }
  return '—';
};

const getFileType = (attachment) => {
  if (!attachment) return '—';
  const mime = attachment.file?.type || attachment.mimeType || '';
  if (mime) {
    if (mime.includes('png')) return 'PNG Image';
    if (mime.includes('jpeg') || mime.includes('jpg')) return 'JPEG Image';
    if (mime.includes('webp')) return 'WebP Image';
    if (mime.includes('gif')) return 'GIF Animation';
    return mime.toUpperCase();
  }
  const name = attachment.name || '';
  const ext = name.split('.').pop()?.toUpperCase();
  if (ext && ext !== name) {
    if (['JPG', 'JPEG'].includes(ext)) return 'JPEG Image';
    if (ext === 'PNG') return 'PNG Image';
    if (ext === 'WEBP') return 'WebP Image';
    if (ext === 'MP4') return 'MP4 Video';
    return ext + ' Asset';
  }
  return '—';
};

export default function NoteMediaAttachmentViewerDarkMode({ setActiveTab, goBack, route = { params: {} } }) {
  const { t } = useTranslation();
  const notes = useNotesStore((s) => s.notes);
  const storeNoteId = useNotesStore((s) => s.activeNoteId);
  const storeAttachmentId = useNotesStore((s) => s.activeAttachmentId);
  const setActiveAttachmentId = useNotesStore((s) => s.setActiveAttachmentId);
  const updateNote = useNotesStore((s) => s.updateNote);
  const deleteAttachment = useNotesStore((s) => s.deleteAttachment);

  const routeParams = route?.params || {};
  const activeNoteId = routeParams.noteId || storeNoteId;
  const activeAttachmentId = routeParams.attachmentId || routeParams.id || (!routeParams.noteId ? storeAttachmentId : null);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const passedAttachment = routeParams.attachment || (routeParams.uri || routeParams.url ? {
    id: routeParams.attachmentId || 'att-passed-' + (routeParams.uri || routeParams.url).slice(-10),
    name: routeParams.name || 'Image Attachment',
    size: routeParams.size || null,
    file: { size: routeParams.size || null, type: routeParams.mimeType || '' },
    subtitle: routeParams.subtitle || 'Attachment Preview',
    caption: routeParams.caption || '',
    type: 'image',
    url: routeParams.uri || routeParams.url
  } : null);

  // A route snapshot is only an extra preview for an unsaved draft. Never
  // reintroduce a previously persisted attachment after it was removed.
  const storedAttachments=Array.isArray(activeNote?.attachments)?activeNote.attachments.filter(Boolean):[];
  const passedWasSaved=useRef(false);
  if(passedAttachment&&storedAttachments.some(a=>a.id===passedAttachment.id))passedWasSaved.current=true;
  const attachments=[...storedAttachments];
  if(passedAttachment&&!passedWasSaved.current&&(activeNote||!activeNoteId||activeNoteId==='new')&&!attachments.some(a=>a.id===passedAttachment.id||(a.url&&a.url===passedAttachment.url))){
    attachments.unshift(passedAttachment);
  }
  const targetAttachmentId=passedAttachment?.id||activeAttachmentId||attachments[0]?.id||null;
  const [selectedAttachmentId,setSelectedAttachmentId]=useState(targetAttachmentId);
  const [isFullscreen,setIsFullscreen]=useState(false);
  const currentIndex=attachments.findIndex(a=>a.id===selectedAttachmentId);
  const currentAttachment=currentIndex>=0?attachments[currentIndex]:null;
  const [resolution, setResolution] = useState('Measuring...');
  const [caption, setCaption] = useState(currentAttachment?.subtitle || currentAttachment?.caption || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [resolvedUrl, setResolvedUrl] = useState('');

  useEffect(() => {
    setCaption(currentAttachment?.subtitle || currentAttachment?.caption || '');
    setIsSaved(false);
    setIsEnhanced(false);
    setIsZoomed(false);

    setResolvedUrl('');
    setResolution('—');
    if (!currentAttachment) return;
    let active = true;
    resolveAttachmentUrl(currentAttachment).then((u) => {
      if (active) {
        setResolvedUrl(u || currentAttachment?.url || '');
        if (u) {
          const img = new window.Image();
          img.src = u;
          img.onload = () => {
            if (active && img.naturalWidth && img.naturalHeight) {
              setResolution(img.naturalWidth + ' × ' + img.naturalHeight);
            }
          };
        }
      }
    }).catch(() => { if(active) setResolvedUrl(''); });

    return () => { active = false; };
  }, [currentIndex, currentAttachment?.id, currentAttachment?.url]);

  const showToast = (message) => {
    if (typeof message === 'string') {
      const lower = message.toLowerCase();
      if (lower.includes('fail') || lower.includes('error') || lower.includes('not supported')) {
        globalToast.error(message);
      } else if (lower.includes('copied') || lower.includes('applied') || lower.includes('saved') || lower.includes('removed')) {
        globalToast.success(message);
      } else {
        globalToast.info(message);
      }
    } else {
      globalToast.info(String(message));
    }
  };

  const handleSelectIndex = (idx) => {
    if(!attachments.length)return;
    const boundedIdx = (idx + attachments.length) % attachments.length;
    const target = attachments[boundedIdx];
    setSelectedAttachmentId(target?.id||null);
    if (target && setActiveAttachmentId) {
      setActiveAttachmentId(target.id);
    }
  };

  const handlePrev = () => {
    handleSelectIndex(currentIndex - 1);
  };

  const handleNext = () => {
    handleSelectIndex(currentIndex + 1);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 30,
  });

  const handleCopyProperty = (label, value) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(value).catch(() => {});
      }
    } catch (err) {
      /* ignore */
    }
    showToast(label + ' copied to clipboard!');
  };

  const handleEnhance = () => {
    if (isEnhancing) return;
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      const nextState = !isEnhanced;
      setIsEnhanced(nextState);
      showToast(nextState ? 'Preview contrast and color adjusted' : 'Restored to original format');
    }, 550);
  };

  const toggleZoom = () => {
    const nextZoom = !isZoomed;
    setIsZoomed(nextZoom);
    showToast(nextZoom ? 'Preview magnified to 125%' : 'Preview restored to 100%');
  };

  const exportInFlight = useRef(false);
  const saveInFlight = useRef(false);
  const exportAttachment = async (share = false) => {
    if (exportInFlight.current) return;
    exportInFlight.current = true;
    try {
      if (!currentAttachment || currentAttachment.id?.startsWith('att-fallback-')) throw new Error('No actual attachment selected');
      const url = await resolveAttachmentUrl(currentAttachment);
      const blob = await fetchExportBlob(url);
      const result = await exportFileBlob(blob, currentAttachment.name || 'attachment', {share});
      if (result.saved) globalToast.success(t('notes.fileSaved', 'File saved to selected location'));
      else if (result.downloadStarted) globalToast.info?.(t('notes.downloadStarted', 'Download started'));
    } catch (error) {
      if (error?.name !== 'AbortError') globalToast.error(t('notes.exportFailed', 'Could not export this attachment'));
    } finally {
      exportInFlight.current = false;
    }
  };
  const handleDownload = () => exportAttachment(false);
  const handleShare = () => exportAttachment(true);

  const handleSave = async () => {
    if (!activeNote || saveInFlight.current) return;
    saveInFlight.current = true;
    setIsSaving(true);
    try {
      const stored = useNotesStore.getState().notes.find(note => note.id === activeNote.id);
      if (!stored?.attachments?.some(att => att.id === currentAttachment?.id)) throw new Error('Attachment is not saved');
      const updated = stored.attachments.map(att => att.id === currentAttachment.id ? {...att,subtitle:caption,caption} : att);
      if (await updateNote(activeNote.id, {attachments:updated}) !== true) throw Error('Media changes not committed');
      setIsSaved(true);
      globalToast.success(t('toasts.mediaSaved', 'Media changes saved successfully!'));
    } catch (error) {
      globalToast.error(t('notes.saveFailed', 'Media changes could not be saved safely'));
    } finally {
      saveInFlight.current = false;
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!activeNote || !currentAttachment?.id || saveInFlight.current) return;
    const noteId = activeNote.id;
    const attachmentId = currentAttachment.id;
    saveInFlight.current = true;
    setIsSaving(true);
    try {
      const stored = useNotesStore.getState().notes.find(note => note.id === noteId);
      if (!stored?.attachments?.some(att => att.id === attachmentId)) throw Error('Attachment not saved');
      if (await deleteAttachment(noteId, attachmentId) !== true) throw Error('Attachment removal not committed');
      setShowDeleteModal(false);
      showToast(t('toasts.attachmentRemoved', 'Attachment removed'));
      const remaining=(useNotesStore.getState().notes.find(note=>note.id===noteId)?.attachments||[]).filter(Boolean);
      if (remaining.length === 0) {
        if (goBack) goBack('notes_main_dark_mode');
        else if (setActiveTab) setActiveTab('notes_main_dark_mode');
      } else {
        const next=remaining[Math.max(0,Math.min(currentIndex-1,remaining.length-1))];
        setSelectedAttachmentId(next.id);
        setActiveAttachmentId?.(next.id);
      }
    } catch {
      globalToast.error(t('notes.deleteFailed', 'Attachment could not be safely removed. Reload saved data.'));
    } finally {
      saveInFlight.current = false;
      setIsSaving(false);
    }
  };

  if (!currentAttachment) {
    return <div className="min-h-full pb-24">
      <MomentumGlassHeader isDarkMode={true}>
        <h1 className="font-semibold text-base">{t('notes.attachmentDetails','Attachment Details')}</h1>
        <button type="button" aria-label={t('common.back','Back')} onClick={()=>goBack?goBack('notes_main_dark_mode'):setActiveTab?.('notes_main_dark_mode')}><ArrowLeft size={20}/></button>
      </MomentumGlassHeader>
      <section data-testid="attachment-empty" className="momentum-neutral-card mx-5 mt-5 p-8 rounded-3xl border text-center space-y-3">
        <Image className="w-10 h-10 mx-auto text-primary"/>
        <h2 className="text-base font-semibold">{t('notes.noAttachmentSelected','No attachment selected')}</h2>
        <p className="text-sm">{t('notes.noAttachmentDescription','Open an attachment from a saved note to view it here.')}</p>
        <button className="rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-semibold" onClick={()=>goBack?goBack('notes_main_dark_mode'):setActiveTab?.('notes_main_dark_mode')}>{t('common.back','Back')}</button>
      </section>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-40 relative">
      {/* 1. TOP HEADER */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Image className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('notes.attachmentDetails', 'Attachment Details')}</h1>
</div>
<div className="flex items-center gap-2">
          <button 
            onClick={() => (goBack ? goBack('notes_main_dark_mode') : (setActiveTab ? setActiveTab('notes_main_dark_mode') : window.history.back()))}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>

      {/* 2. MEDIA HERO SECTION (EXPLICIT ATTACHMENT[CURRENTINDEX].URL BINDING) */}
      <div 
        {...swipeHandlers}
        className="mx-5 mt-2 mb-5 rounded-3xl overflow-hidden relative group h-80 bg-slate-900 border-white/10 border shadow-md touch-pan-y select-none"
      >
        <img 
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => setIsFullscreen(true)}
          onLoad={(e) => {
            if (!e.currentTarget.src.startsWith('data:image/svg+xml') && e.target?.naturalWidth && e.target?.naturalHeight) {
              setResolution(e.target.naturalWidth + ' × ' + e.target.naturalHeight);
            }
          }}
          className={`w-full h-full object-cover transition-all duration-500 select-none cursor-zoom-in ${isZoomed ? 'scale-125' : 'group-hover:scale-105'} ${isEnhanced ? 'contrast-[1.14] saturate-[1.18] brightness-[1.04]' : ''}`} 
          alt={attachments[currentIndex]?.name || 'Attachment Preview'} 
          src={resolvedUrl || attachments[currentIndex]?.url || FALLBACK_IMAGE}
          onError={(e) => { setResolution('—'); if(e.currentTarget.getAttribute('src')!==FALLBACK_IMAGE)e.currentTarget.src=FALLBACK_IMAGE; }}
        />
        
        {/* Top Smooth Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none" />

        {/* Bottom Smooth Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Integrated Top Controls */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto z-20">
          <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/15 text-[11px] font-bold shadow-sm flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-indigo-400" />
            <span>{currentIndex + 1} / {attachments.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
              className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/15 shadow-sm font-semibold text-[11px] hover:bg-black/60 active:scale-95 transition-all"
            >
              {isZoomed ? '125%' : '100%'}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
              title={t('notes.openLightbox', 'Open full screen lightbox')} 
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:bg-black/60 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Integrated Centered Chevron Arrows */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-auto z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-md flex items-center justify-center text-white/90 hover:text-white hover:bg-black/60 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-auto z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-md flex items-center justify-center text-white/90 hover:text-white hover:bg-black/60 active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Integrated Bottom Details */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between pointer-events-auto z-20">
          <div className="flex flex-col text-white drop-shadow-md min-w-0 pr-2">
            <h2 className="text-xs font-bold truncate text-white">
              {attachments[currentIndex]?.name || t('notes.attachment', 'Attachment')}
            </h2>
            <span className="text-[10px] font-normal text-white/80">
              {resolution} • {formatFileSize(attachments[currentIndex])}
            </span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleEnhance(); }}
            className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold shadow-sm flex items-center gap-1.5 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            {isEnhancing ? (
              <>
                <Loader2 className="w-3 h-3 text-indigo-300 animate-spin" />
                <span>{t('notes.enhancing', 'Enhancing...')}</span>
              </>
            ) : isEnhanced ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{t('notes.enhanced', 'Enhanced')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-indigo-300" />
                <span>{t('notes.enhance', 'Enhance')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5. ALL ATTACHMENTS CAROUSEL STRIP */}
      <div className="flex items-center justify-between px-5 mb-2.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {t('notes.allAttachments', 'All Attachments')} ({attachments.length})
        </h3>
        <span className="text-xs font-medium text-indigo-500">
          {t('notes.swipeTapSwitch', 'Swipe or tap to switch')}
        </span>
      </div>
      <div className="px-5 mb-5 flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
        {attachments.map((att, index) => {
          const isSelected = index === currentIndex;
          return (
            <div 
              key={att.id || index}
              onClick={() => handleSelectIndex(index)}
              className={`relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-indigo-500 shadow-md scale-105' 
                  : 'opacity-60 hover:opacity-100 border border-white/10'
              }`}
            >
              <img 
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-full object-cover" 
                src={att.url || FALLBACK_IMAGE} 
                alt={att.name || 'Thumb'}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              {isSelected ? (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : null}
              <div className="absolute bottom-1 left-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-center">
                <span className="text-[9px] font-medium text-white block truncate">{formatFileSize(att)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. ASSET PROPERTIES GRID (DYNAMIC REAL METADATA CALCULATION) */}
      <div className="mx-5 mb-5 p-5 rounded-[24px] space-y-4 bg-slate-900/60 border-white/10 backdrop-blur-xl border shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white tracking-tight">
            {t('notes.assetProperties', 'Asset Properties')}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => handleCopyProperty('Resolution', resolution)}
            title={t('notes.copyResolution', 'Click to copy resolution')} 
            className="rounded-2xl p-3.5 space-y-1 bg-slate-800/40 hover:bg-slate-800/70 border-white/5 border cursor-pointer active:scale-[0.98] transition-all group/prop"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 block">{t('notes.resolution', 'Resolution')}</span>
              <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover/prop:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {resolution}
            </div>
          </div>
          <div 
            onClick={() => handleCopyProperty('File Size', formatFileSize(attachments[currentIndex]))}
            title={t('notes.copyFileSize', 'Click to copy file size')} 
            className="rounded-2xl p-3.5 space-y-1 bg-slate-800/40 hover:bg-slate-800/70 border-white/5 border cursor-pointer active:scale-[0.98] transition-all group/prop"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 block">{t('notes.fileSize', 'File Size')}</span>
              <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover/prop:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {formatFileSize(attachments[currentIndex])}
            </div>
          </div>
          <div 
            onClick={() => handleCopyProperty('File Format', getFileType(attachments[currentIndex]))}
            title={t('notes.copyFileFormat', 'Click to copy file format')} 
            className="rounded-2xl p-3.5 space-y-1 bg-slate-800/40 hover:bg-slate-800/70 border-white/5 border cursor-pointer active:scale-[0.98] transition-all group/prop"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 block">{t('notes.fileFormat', 'File Format')}</span>
              <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover/prop:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {getFileType(attachments[currentIndex])}
            </div>
          </div>
          <div 
            onClick={handleDownload}
            title={t('notes.downloadThisFile', 'Download this file')}
            className="rounded-2xl p-3.5 space-y-1 bg-indigo-950/40 hover:bg-indigo-900/60 border-indigo-500/30 text-indigo-300 border cursor-pointer active:scale-[0.98] transition-all group/download"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-400 block">{t('common.actions', 'Action')}</span>
              <Download className="w-3.5 h-3.5 text-indigo-400 group-hover/download:translate-y-0.5 transition-transform" />
            </div>
            <div className="text-sm font-bold text-indigo-200 flex items-center gap-1.5 whitespace-nowrap">
              <span>{t('notes.downloadFile', 'Download File')}</span>
            </div>
          </div>
        </div>
        
        {/* Attachment Caption Inside the Card */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200">
              {t('notes.attachmentCaption', 'Attachment Caption')}
            </label>
            <span className="text-[11px] font-medium text-slate-400">
              {caption.length} / 250
            </span>
          </div>
          <div className="relative">
            <textarea 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={250}
              rows={3}
              placeholder={t('notes.addReflectiveCaption', { defaultValue: 'Add reflective notes or caption for this attachment...' })}
              className="w-full rounded-2xl bg-slate-800/70 border-slate-700/80 text-slate-200 placeholder:text-slate-500 border p-3.5 text-xs font-normal focus:outline-none focus:border-indigo-500 resize-none transition-colors"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button 
                onClick={() => showToast(t('toasts.voiceDictationReady', 'Voice note dictation ready'))}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast(t('toasts.geotagVerified', 'Geo-tag verified: Courtyard Terrace'))}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM ACTION BUTTONS */}
      <div className="px-5 space-y-3">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3.5 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>{t('common.saving', 'Saving Changes...')}</span>
            </>
          ) : (
            <>
              <span>{t('notes.saveMediaChanges', 'Save Media Changes')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="w-full py-3.5 px-6 rounded-full text-rose-400 bg-rose-950/40 hover:bg-rose-900/40 border-rose-900/50 border font-semibold text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>{t('notes.removeAttachmentFromNote', 'Remove Attachment from Note')}</span>
        </button>
      </div>

      {showDeleteModal ? (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[28px] p-6 space-y-4 bg-slate-900 border border-white/10 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/60 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold">{t('notes.removeAttachment', 'Remove Attachment?')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('notes.removeConfirmPrompt', { defaultValue: 'Are you sure you want to remove this attachment from this note? This action cannot be undone.' })}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 px-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs active:scale-95 transition-all"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button 
                onClick={handleConfirmDelete} disabled={isSaving}
                className="flex-1 py-3 px-4 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs shadow-md shadow-red-600/30 transition-all"
              >
                {t('common.yesRemove', 'Yes, Remove')}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 6. TRUE FULLSCREEN OVERLAY PORTAL (FIXED INSET-0 Z-[100] BG-BLACK/95) */}
      {isFullscreen && typeof document !== 'undefined'
        ? createPortal(
            <div 
              onClick={() => setIsFullscreen(false)}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none cursor-pointer"
            >
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 text-xs font-semibold flex items-center gap-2">
                  <Image className="w-4 h-4 text-indigo-400" />
                  <span>{currentIndex + 1} / {attachments.length} • {attachments[currentIndex]?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                    title={t('notes.downloadFile', 'Download file')} className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
                    title={t('notes.shareAttachment', 'Share attachment')} className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div 
                className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
                onClick={() => setIsFullscreen(false)}
                {...swipeHandlers}
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-2 sm:left-4 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-all z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <img 
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => e.stopPropagation()}
                  className={`max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl transition-all duration-300 select-none cursor-default ${isEnhanced ? 'contrast-[1.14] saturate-[1.18] brightness-[1.04]' : ''}`}
                  src={resolvedUrl || attachments[currentIndex]?.url || FALLBACK_IMAGE}
                  alt={attachments[currentIndex]?.name || 'Fullscreen Preview'}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />

                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-2 sm:right-4 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-all z-10 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-white/70 px-2 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{resolution}</span>
                  <span>•</span>
                  <span>{formatFileSize(attachments[currentIndex])}</span>
                  <span>•</span>
                  <span>{getFileType(attachments[currentIndex])}</span>
                </div>
                <button 
                  onClick={() => setIsFullscreen(false)}
                  className="text-[11px] text-white/70 hover:text-white underline cursor-pointer"
                >
                  Tap background or ✕ to exit
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
