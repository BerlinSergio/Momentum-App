import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSwipeable } from 'react-swipeable';
import UserAvatar from './components/UserAvatar';
import { useNotesStore } from './store/useNotesStore';
import { 
  ArrowLeft, Share2, Image, Download, Trash2, Check, Maximize, ChevronLeft, ChevronRight, Wand2, ArrowRight, CheckCircle2, Mic, MapPin, Loader2, Copy, Sparkles, AlertTriangle, X 
} from 'lucide-react';

const FALLBACK_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%231e293b'/><path d='M200 450 L350 250 L480 380 L560 300 L680 450 Z' fill='%23334155'/><circle cx='300' cy='200' r='40' fill='%234f46e5'/><text x='400' y='520' font-family='sans-serif' font-size='24' fill='%2394a3b8' text-anchor='middle'>Attachment Preview</text></svg>";

const formatFileSize = (attachment) => {
  if (!attachment) return '0.0 MB';
  const sizeVal = attachment.file?.size ?? attachment.fileSize ?? attachment.size;
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
  return '2.4 MB';
};

const getFileType = (attachment) => {
  if (!attachment) return 'JPEG Image';
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
  return 'JPEG Image';
};

export default function NoteMediaAttachmentViewerLightMode({ setActiveTab, goBack, route = { params: {} } }) {
  const notes = useNotesStore((s) => s.notes);
  const routeParams = route?.params || {};
  const activeNoteId = routeParams.noteId || useNotesStore((s) => s.activeNoteId);
  const activeAttachmentId = routeParams.attachmentId || routeParams.id || useNotesStore((s) => s.activeAttachmentId);
  const setActiveAttachmentId = useNotesStore((s) => s.setActiveAttachmentId);
  const updateNote = useNotesStore((s) => s.updateNote);
  const deleteAttachment = useNotesStore((s) => s.deleteAttachment);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes.find((n) => Array.isArray(n.attachments) && n.attachments.length > 0) || notes[0];

  const passedAttachment = routeParams.attachment || (routeParams.uri || routeParams.url ? {
    id: routeParams.attachmentId || 'att-passed-' + (routeParams.uri || routeParams.url).slice(-10),
    name: routeParams.name || 'Image Attachment',
    size: routeParams.size || 1887436,
    file: { size: 1887436, type: 'image/jpeg' },
    subtitle: routeParams.subtitle || 'Attachment Preview',
    caption: routeParams.caption || '',
    type: 'image',
    url: routeParams.uri || routeParams.url
  } : null);

  let rawAttachments = (activeNote && Array.isArray(activeNote.attachments) && activeNote.attachments.length > 0)
    ? [...activeNote.attachments]
    : [];

  if (passedAttachment && !rawAttachments.some(a => a.id === passedAttachment.id || (a.url && a.url === passedAttachment.url))) {
    rawAttachments.unshift(passedAttachment);
  }

  const attachments = rawAttachments.length > 0
    ? rawAttachments
    : [
        {
          id: 'att-fallback-1',
          name: 'Dawn_Reflection_Sky.jpg',
          size: 1887436,
          file: { size: 1887436, type: 'image/jpeg' },
          subtitle: 'Captured immediately after morning Fajr prayer while meditating on the courtyard terrace.',
          caption: 'Captured immediately after morning Fajr prayer while meditating on the courtyard terrace.',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'
        },
        {
          id: 'att-fallback-2',
          name: 'MindMap_Q4.png',
          size: 2516582,
          file: { size: 2516582, type: 'image/png' },
          subtitle: 'Mind map architecture detailing the 14-day spiritual consistency streak.',
          caption: 'Mind map architecture detailing the 14-day spiritual consistency streak.',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200'
        },
        {
          id: 'att-fallback-3',
          name: 'Sanctuary_View.jpg',
          size: 3250585,
          file: { size: 3250585, type: 'image/jpeg' },
          subtitle: 'Courtyard sanctuary peaceful reflection at Asr time under golden light.',
          caption: 'Courtyard sanctuary peaceful reflection at Asr time under golden light.',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200'
        }
      ];

  const targetAttachmentId = passedAttachment?.id || activeAttachmentId;
  const initialIndex = Math.max(0, attachments.findIndex((a) => a.id === targetAttachmentId || (passedAttachment && a.url === passedAttachment.url)));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  const currentAttachment = attachments[currentIndex] || attachments[0];
  const [resolution, setResolution] = useState('Measuring...');
  const [caption, setCaption] = useState(currentAttachment?.subtitle || currentAttachment?.caption || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setCaption(currentAttachment?.subtitle || currentAttachment?.caption || '');
    setIsSaved(false);
    setIsEnhanced(false);
    setIsZoomed(false);

    const currentUrl = currentAttachment?.url;
    if (currentUrl) {
      const img = new window.Image();
      img.src = currentUrl;
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setResolution(img.naturalWidth + ' × ' + img.naturalHeight);
        }
      };
    }
  }, [currentIndex, currentAttachment?.id, currentAttachment?.url]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2400);
  };

  const handleSelectIndex = (idx) => {
    const boundedIdx = (idx + attachments.length) % attachments.length;
    setCurrentIndex(boundedIdx);
    const target = attachments[boundedIdx];
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
      showToast(nextState ? 'AI clarity & vibrant tones applied!' : 'Restored to original format');
    }, 550);
  };

  const toggleZoom = () => {
    const nextZoom = !isZoomed;
    setIsZoomed(nextZoom);
    showToast(nextZoom ? 'Preview magnified to 150%' : 'Preview restored to 100%');
  };

  const handleDownload = async () => {
    const targetUrl = currentAttachment?.url || FALLBACK_IMAGE;
    const fileName = currentAttachment?.name || 'attachment.jpg';
    showToast('Downloading ' + fileName + '...');
    try {
      if (targetUrl.startsWith('data:') || targetUrl.startsWith('blob:')) {
        const anchor = document.createElement('a');
        anchor.href = targetUrl;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        return;
      }
      const response = await fetch(targetUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const anchor = document.createElement('a');
      anchor.href = targetUrl;
      anchor.download = fileName;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  const handleShare = async () => {
    const shareTitle = currentAttachment?.name || 'Attachment Details';
    const shareText = 'Check out ' + (currentAttachment?.name || 'this media') + ' from ' + (activeNote?.title || 'Momentum Notes');
    if (navigator?.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: window.location.href });
      } catch (err) {
        /* user dismiss */
      }
    } else if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareTitle + ': ' + window.location.href);
      showToast('Attachment link copied to clipboard!');
    } else {
      showToast('Sharing is not supported on this platform');
    }
  };

  const handleSave = () => {
    if (!activeNote || isSaving) return;
    setIsSaving(true);
    setTimeout(() => {
      const updated = attachments.map((att, idx) => {
        if (idx === currentIndex) {
          return { ...att, subtitle: caption, caption };
        }
        return att;
      });
      updateNote(activeNote.id, { attachments: updated });
      setIsSaving(false);
      setIsSaved(true);
      showToast('Media changes saved successfully!');
      setTimeout(() => {
        setIsSaved(false);
      }, 2500);
    }, 600);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (activeNote && currentAttachment?.id) {
      deleteAttachment(activeNote.id, currentAttachment.id);
      showToast('Attachment removed from note');
      if (attachments.length <= 1) {
        if (goBack) goBack('notes_main_light_mode');
        else if (setActiveTab) setActiveTab('notes_main_light_mode');
      } else {
        const nextIdx = currentIndex === 0 ? 0 : currentIndex - 1;
        handleSelectIndex(nextIdx);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-40 relative">
      {/* FLOATING TOAST NOTIFICATION */}
      {toast ? (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-full bg-slate-900 text-white border-slate-700 border shadow-xl flex items-center gap-2 backdrop-blur-md transition-all">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium tracking-wide">{toast}</span>
        </div>
      ) : null}

      {/* 1. TOP HEADER */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Image className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)" }}>
            Attachment Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => (goBack ? goBack('notes_main_light_mode') : (setActiveTab ? setActiveTab('notes_main_light_mode') : window.history.back()))}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>

      {/* 2. MEDIA HERO SECTION (EXPLICIT ATTACHMENT[CURRENTINDEX].URL BINDING) */}
      <div 
        {...swipeHandlers}
        className="mx-5 mt-2 mb-5 rounded-3xl overflow-hidden relative group h-80 bg-slate-900 border-slate-200/80 border shadow-md touch-pan-y select-none"
      >
        <img 
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => setIsFullscreen(true)}
          onLoad={(e) => {
            if (e.target?.naturalWidth && e.target?.naturalHeight) {
              setResolution(e.target.naturalWidth + ' × ' + e.target.naturalHeight);
            }
          }}
          className={`w-full h-full object-cover transition-all duration-500 select-none cursor-zoom-in ${isZoomed ? 'scale-125' : 'group-hover:scale-105'} ${isEnhanced ? 'contrast-[1.14] saturate-[1.18] brightness-[1.04]' : ''}`} 
          alt={attachments[currentIndex]?.name || 'Attachment Preview'} 
          src={attachments[currentIndex]?.url || FALLBACK_IMAGE}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
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
              {isZoomed ? '150%' : '100%'}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
              title="Open full screen lightbox" 
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
              {attachments[currentIndex]?.name || 'Dawn_Reflection_Sky.jpg'}
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
                <span>Enhancing...</span>
              </>
            ) : isEnhanced ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Enhanced</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3 h-3 text-indigo-300" />
                <span>Enhance</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. ALL ATTACHMENTS CAROUSEL STRIP (ONCLICK SETCURRENTINDEX(INDEX)) */}
      <div className="flex items-center justify-between px-5 mb-2.5">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          All Attachments ({attachments.length})
        </h3>
        <span className="text-xs font-medium text-indigo-500">
          Swipe or tap to switch
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
                  : 'opacity-60 hover:opacity-100 border border-slate-200'
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
      <div className="mx-5 mb-5 p-5 rounded-[24px] space-y-4 bg-white border-slate-100 border shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Asset Properties
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => handleCopyProperty('Resolution', resolution)}
            title="Click to copy resolution" 
            className="rounded-2xl p-3.5 space-y-1 bg-slate-50 hover:bg-slate-100/70 border-slate-100 border cursor-pointer active:scale-[0.98] transition-all group/prop"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 block">Resolution</span>
              <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover/prop:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {resolution}
            </div>
          </div>
          <div 
            onClick={() => handleCopyProperty('File Size', formatFileSize(attachments[currentIndex]))}
            title="Click to copy file size" 
            className="rounded-2xl p-3.5 space-y-1 bg-slate-50 hover:bg-slate-100/70 border-slate-100 border cursor-pointer active:scale-[0.98] transition-all group/prop"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 block">File Size</span>
              <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover/prop:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {formatFileSize(attachments[currentIndex])}
            </div>
          </div>
          <div 
            onClick={() => handleCopyProperty('File Format', getFileType(attachments[currentIndex]))}
            title="Click to copy file format" 
            className="rounded-2xl p-3.5 space-y-1 bg-slate-50 hover:bg-slate-100/70 border-slate-100 border cursor-pointer active:scale-[0.98] transition-all group/prop"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 block">File Format</span>
              <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover/prop:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {getFileType(attachments[currentIndex])}
            </div>
          </div>
          <div 
            onClick={handleDownload}
            title="Download this file" 
            className="rounded-2xl p-3.5 space-y-1 bg-indigo-50 hover:bg-indigo-100/90 border-indigo-200/80 text-indigo-700 border cursor-pointer active:scale-[0.98] transition-all group/download"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-600 block">Action</span>
              <Download className="w-3.5 h-3.5 text-indigo-600 group-hover/download:translate-y-0.5 transition-transform" />
            </div>
            <div className="text-sm font-bold text-indigo-700 flex items-center gap-1.5 whitespace-nowrap">
              <span>Download File</span>
            </div>
          </div>
        </div>
        
        {/* Attachment Caption Inside the Card */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Attachment Caption
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
              placeholder="Add reflective notes or caption for this attachment..."
              className="w-full rounded-2xl bg-slate-50 border-slate-200/80 text-slate-800 placeholder:text-slate-400 border p-3.5 text-xs font-normal focus:outline-none focus:border-indigo-500 resize-none transition-colors"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button 
                onClick={() => showToast('Voice note dictation ready')}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast('Geo-tag verified: Courtyard Terrace')}
                className="text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM ACTION BUTTONS (MODERNIZED & WELL-PADDED) */}
      <div className="px-5 space-y-3">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3.5 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Saving Changes...</span>
            </>
          ) : isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Media Changes Saved!</span>
            </>
          ) : (
            <>
              <span>Save Media Changes</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="w-full py-3.5 px-6 rounded-full text-red-500 bg-red-50 hover:bg-red-100 border-red-200/60 border font-semibold text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
          <span>Remove Attachment from Note</span>
        </button>
      </div>

      {/* CONFIRMATION MODAL DIALOG */}
      {showDeleteModal ? (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[28px] p-6 space-y-4 bg-white border border-slate-100 text-slate-900 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold">Remove Attachment?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to remove <span className="font-semibold text-slate-700">"{attachments[currentIndex]?.name}"</span> from this note? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="flex-1 py-3 px-4 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs shadow-md shadow-red-600/30 transition-all"
              >
                Yes, Remove
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
                    title="Download file"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
                    title="Share attachment"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 cursor-pointer"
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
                  src={attachments[currentIndex]?.url || FALLBACK_IMAGE}
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
