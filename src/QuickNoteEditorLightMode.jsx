/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, no-unused-vars */
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { useNavigationStore } from './store/useNavigationStore';
import { saveAttachmentFile } from './storage/index.js';
import UserAvatar from './components/UserAvatar';
import { MomentumDatePicker, MomentumTimePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';
import { 
  ArrowLeft, Sparkles, Pin, Trash2, X, 
  Camera, CheckSquare, List, Edit3, Bell, BellOff, Clock, ArrowRight, Check,
  RotateCcw, Pencil, MoreVertical, XCircle, Archive, ArchiveRestore
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Idea', label: 'Idea', emoji: '💡' },
  { id: 'Checklist', label: 'Checklist', emoji: '✅' },
  { id: 'Spiritual', label: 'Spiritual', emoji: '✨' },
  { id: 'Work', label: 'Work', emoji: '💼' },
  { id: 'Personal', label: 'Personal', emoji: '🌱' },
];

const TINT_OPTIONS = [
  { 
    id: 'slate', 
    label: 'Slate', 
    btnBg: 'bg-white border border-slate-200', 
    cardBg: 'bg-white/80 border-white/50 shadow-lg',
    dotBg: 'bg-teal-500' 
  },
  { 
    id: 'emerald', 
    label: 'Emerald', 
    btnBg: 'bg-emerald-100 border border-emerald-200', 
    cardBg: 'bg-emerald-50/80 border-emerald-200/80 shadow-lg shadow-emerald-100/50',
    dotBg: 'bg-emerald-500' 
  },
  { 
    id: 'violet', 
    label: 'Violet', 
    btnBg: 'bg-violet-100 border border-violet-200', 
    cardBg: 'bg-violet-50/80 border-violet-200/80 shadow-lg shadow-violet-100/50',
    dotBg: 'bg-violet-500' 
  },
  { 
    id: 'sky', 
    label: 'Sky', 
    btnBg: 'bg-sky-100 border border-sky-200', 
    cardBg: 'bg-sky-50/80 border-sky-200/80 shadow-lg shadow-sky-100/50',
    dotBg: 'bg-sky-500' 
  },
  { 
    id: 'amber', 
    label: 'Amber', 
    btnBg: 'bg-amber-100 border border-amber-200', 
    cardBg: 'bg-amber-50/80 border-amber-200/80 shadow-lg shadow-amber-100/50',
    dotBg: 'bg-amber-500' 
  },
];

function ScribbleModal({ isOpen, onClose, onSaveSketch, isDarkMode }) {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(isDarkMode ? '#ffffff' : '#0f172a');
  const [lineWidth, setLineWidth] = useState(3);
  const [strokesHistory, setStrokesHistory] = useState([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = isDarkMode 
    ? ['#ffffff', '#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ef4444'] 
    : ['#0f172a', '#2563eb', '#059669', '#7c3aed', '#d97706', '#dc2626'];

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = isDarkMode ? '#0f172a' : '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      setStrokesHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      setHasDrawn(false);
    }
  }, [isOpen, isDarkMode]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    setStrokesHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = isDarkMode ? '#0f172a' : '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
    setStrokesHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const handleUndo = () => {
    if (strokesHistory.length <= 1) {
      clearCanvas();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newHistory = strokesHistory.slice(0, -1);
    ctx.putImageData(newHistory[newHistory.length - 1], 0, 0);
    setStrokesHistory(newHistory);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSaveSketch(dataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer" />
      <div className={`relative z-10 w-full max-w-sm rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 border ${
        isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold tracking-tight">{t('notes.handwrittenScribble', 'Handwritten Scribble')}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              type="button"
              onClick={handleUndo}
              aria-label="Undo stroke"
              title={t('common.undo', 'Undo')}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={clearCanvas}
              aria-label="Clear canvas"
              title={t('notes.clearCanvas', 'Clear Canvas')}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-rose-950/40 text-slate-400 hover:text-rose-400' : 'hover:bg-rose-50 text-slate-500 hover:text-rose-600'
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className={`w-full h-56 rounded-2xl overflow-hidden border shadow-inner relative touch-none ${
          isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
        }`}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none"
          />
          {!hasDrawn && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-400/60 select-none">
              {t('notes.drawSketchPlaceholder', 'Draw or sketch here with finger/mouse...')}
            </div>
          )}
        </div>

        {/* Toolbar (Colors & Sizes) */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                  color === c ? 'scale-125 ring-2 ring-primary ring-offset-2 ring-offset-white' : 'hover:scale-110 opacity-80'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {[2, 4, 7].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setLineWidth(size)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  lineWidth === size 
                    ? 'bg-primary text-white font-bold' 
                    : isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <span style={{ width: size * 1.5, height: size * 1.5 }} className="rounded-full bg-current block" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 h-10 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all"
          >
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary flex-1 h-10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-primary/20"
          >
            <Check className="w-4 h-4" />
            <span>{t('notes.attachSketch', 'Attach Sketch')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ReminderModal({ isOpen, onClose, reminder, onSaveReminder, isDarkMode }) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(reminder?.enabled ?? true);
  const [date, setDate] = useState(reminder?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(reminder?.time || '17:00');
  const [label, setLabel] = useState(reminder?.displayTime || 'Today at 5:00 PM');
  const [subtext, setSubtext] = useState(reminder?.subtext || 'Triggers 1 hour before Asr prayer');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const presets = [
    { label: 'Today at 5:00 PM', time: '17:00', subtext: 'Triggers 1 hour before Asr prayer' },
    { label: 'Tonight at 8:30 PM', time: '20:30', subtext: 'Triggers after Isha prayer' },
    { label: 'Tomorrow at 5:15 AM', time: '05:15', subtext: 'Triggers before Fajr prayer' },
    { label: 'Tomorrow at 9:00 AM', time: '09:00', subtext: 'Morning focus reminder' },
  ];

  const handleApplyPreset = (preset) => {
    setTime(preset.time);
    setLabel(preset.label);
    setSubtext(preset.subtext);
    setEnabled(true);
  };

  const handleSave = () => {
    onSaveReminder({
      enabled,
      date,
      time,
      displayTime: label,
      subtext,
    });
    onClose();
  };

  const handleRemove = () => {
    onSaveReminder({
      enabled: false,
      date,
      time,
      displayTime: 'No Reminder Set',
      subtext: 'Tap Edit to schedule an alert',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer" />
      <div className={`relative z-10 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 border-t sm:border ${
        isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto sm:hidden" />
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {t('notes.setReminder', 'Set Note Reminder')}
              </h3>
              <p className="text-[10px] text-slate-500">
                {t('notes.receiveAlertDesc', 'Receive an alert before prayer or task')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toggle Switch */}
        <div className={`flex items-center justify-between p-3 rounded-2xl border ${
          isDarkMode ? 'bg-black/30 border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            {enabled ? <Bell className="w-4 h-4 text-violet-600" /> : <BellOff className="w-4 h-4 text-slate-400" />}
            <span className="text-xs font-semibold">{t('notes.reminderAlert', 'Reminder Alert')}</span>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              enabled ? 'bg-violet-600' : 'bg-slate-300'
            }`}
          >
            <span className={`w-4 h-4 rounded-full bg-white block transition-transform absolute top-1 ${
              enabled ? 'left-6' : 'left-1'
            }`} />
          </button>
        </div>

        {/* Presets */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-1">{t('routines.quickPresets', 'Quick Presets')}</label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p) => {
              const isSelected = enabled && label === p.label;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-violet-500 bg-violet-50 text-violet-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight truncate">{p.label}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{p.subtext}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Date & Time Inputs */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-1">{t('notes.customSchedule', 'Custom Schedule')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              data-testid="reminder-date-tile"
              onClick={() => setIsDatePickerOpen(true)}
              className={`p-2.5 rounded-xl border flex flex-col gap-1 text-left cursor-pointer transition-all ${
                isDarkMode ? 'bg-black/30 border-white/5 hover:border-violet-500/50' : 'bg-slate-50 border-slate-200 hover:border-violet-500/50'
              }`}
            >
              <span className="text-[10px] text-slate-400">{t('common.date', 'Date')}</span>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{date}</span>
            </button>
            <button
              type="button"
              data-testid="reminder-time-tile"
              onClick={() => setIsTimePickerOpen(true)}
              className={`p-2.5 rounded-xl border flex flex-col gap-1 text-left cursor-pointer transition-all ${
                isDarkMode ? 'bg-black/30 border-white/5 hover:border-violet-500/50' : 'bg-slate-50 border-slate-200 hover:border-violet-500/50'
              }`}
            >
              <span className="text-[10px] text-slate-400">{t('common.time', 'Time')}</span>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{time}</span>
            </button>
          </div>
        </div>

        <MomentumDatePicker
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          value={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setLabel(`Scheduled on ${newDate}`);
            setEnabled(true);
          }}
          title={t('notes.reminderDate', 'Reminder Date')}
          isDark={isDarkMode}
        />

        <MomentumTimePicker
          isOpen={isTimePickerOpen}
          onClose={() => setIsTimePickerOpen(false)}
          value={time}
          onSelect={(newTime) => {
            setTime(newTime);
            setLabel('Custom timed reminder');
            setEnabled(true);
          }}
          title={t('notes.reminderTime', 'Reminder Time')}
          isDark={isDarkMode}
          outputFormat="auto"
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {enabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="btn-danger flex-1 h-10 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all"
            >
              {t('notes.removeAlert', 'Remove Alert')}
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary flex-1 h-10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-primary/20"
          >
            <Check className="w-4 h-4" />
            <span>{t('notes.saveReminder', 'Save Reminder')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QuickNoteEditorLightMode({ setActiveTab, goBack, noteId: propNoteId, isNew: propIsNew, route = { params: {} } }) {
  const { t } = useTranslation();
  const storeActiveNoteId = useNotesStore((s) => s.activeNoteId);
  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);
  const updateNote = useNotesStore((s) => s.updateNote);
  const deleteNote = useNotesStore((s) => s.deleteNote);
  const archiveNote = useNotesStore((s) => s.archiveNote);
  const unarchiveNote = useNotesStore((s) => s.unarchiveNote);
  const toggleArchive = useNotesStore((s) => s.toggleArchive);

  const routeNoteId = route?.params?.noteId;
  const isExplicitlyNew = Boolean(propIsNew || route?.params?.isNew);
  const effectiveNoteId = isExplicitlyNew
    ? null
    : (propNoteId !== undefined ? propNoteId : (routeNoteId !== undefined ? routeNoteId : storeActiveNoteId));

  const isNew = isExplicitlyNew || !effectiveNoteId || effectiveNoteId === 'new';

  const existingNote = useMemo(() => {
    if (isNew) return null;
    const idStr = String(effectiveNoteId);
    return notes.find((n) => String(n.id) === idStr && (n.type === 'quick' || !n.type)) || notes.find((n) => String(n.id) === idStr) || null;
  }, [notes, effectiveNoteId, isNew]);

  const routeParams = route?.params || {};

  const [isEditing, setIsEditing] = useState(Boolean(isNew));

  // Note fields state
  const [title, setTitle] = useState(
    existingNote ? (existingNote.title || '') : ''
  );
  const [content, setContent] = useState(
    existingNote ? (existingNote.body || existingNote.content || '') : ''
  );
  const [body, setBody] = useState(
    existingNote ? (existingNote.body || existingNote.content || '') : ''
  );
  const [tags, setTags] = useState(
    Array.isArray(existingNote?.tags) ? existingNote.tags : (existingNote?.category ? [existingNote.category] : [])
  );
  const [selectedCategory, setSelectedCategory] = useState(
    existingNote?.category || 'Checklist'
  );
  const [tint, setTint] = useState(
    existingNote?.tint || 'white'
  );
  const [selectedTint, setSelectedTint] = useState(
    existingNote?.tint || 'slate'
  );
  const [isPinned, setIsPinned] = useState(
    Boolean(existingNote?.isPinned)
  );

  // Image Attachment State
  const initialImage = useMemo(() => {
    if (existingNote?.attachments) {
      return existingNote.attachments.find((a) => a.type === 'image' && a.url) || null;
    }
    return null;
  }, [existingNote]);

  const [image, setImage] = useState(initialImage);
  const [imageAttachment, setImageAttachment] = useState(initialImage);
  const fileInputRef = useRef(null);
  const bodyTextareaRef = useRef(null);

  // Modals state
  const [isScribbleOpen, setIsScribbleOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reminder State
  const [reminder, setReminder] = useState(() => {
    if (existingNote?.reminder) {
      return existingNote.reminder;
    }
    return {
      enabled: false,
      date: new Date().toISOString().split('T')[0],
      time: '17:00',
      displayTime: 'No Reminder Set',
      subtext: 'Tap Edit to schedule an alert',
    };
  });

  const resetAllState = () => {
    setTitle('');
    setContent('');
    setBody('');
    setTags([]);
    setTint('white');
    setSelectedTint('white');
    setImage(null);
    setImageAttachment(null);
    setIsPinned(false);
    setSelectedCategory('Idea');
    setReminder({
      enabled: false,
      date: new Date().toISOString().split('T')[0],
      time: '17:00',
      displayTime: 'No Reminder Set',
      subtext: 'Tap Edit to schedule an alert',
    });
  };

  useEffect(() => {
    if (!routeParams?.noteId) {
      resetAllState();
      setIsEditing(true);
    }
  }, [routeParams?.noteId]);

  useEffect(() => {
    const activeId = route?.params?.noteId ?? propNoteId ?? storeActiveNoteId;
    if (!activeId || activeId === 'new' || isNew) {
      resetAllState();
      setIsEditing(true);
    } else if (existingNote) {
      setTitle(existingNote.title || '');
      setContent(existingNote.body || existingNote.content || '');
      setBody(existingNote.body || existingNote.content || '');
      setTags(Array.isArray(existingNote.tags) ? existingNote.tags : [existingNote.category || 'Checklist']);
      setTint(existingNote.tint || 'white');
      setSelectedTint(existingNote.tint || 'slate');
      setIsPinned(Boolean(existingNote.isPinned));
      const img = existingNote.attachments?.find((a) => a.type === 'image' && a.url) || null;
      setImage(img);
      setImageAttachment(img);
      setReminder(
        existingNote.reminder || {
          enabled: false,
          date: new Date().toISOString().split('T')[0],
          time: '17:00',
          displayTime: 'No Reminder Set',
          subtext: 'Tap Edit to schedule an alert',
        }
      );
      setIsEditing(false);
    }
  }, [route?.params?.noteId, route?.params?.isNew, propNoteId, storeActiveNoteId, existingNote?.id, isNew]);

  // Dynamic Word & Character Count
  const wordCount = useMemo(() => {
    const text = `${title} ${body}`.trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }, [title, body]);

  const charCount = useMemo(() => {
    return `${title} ${body}`.trim().length;
  }, [title, body]);

  const creationTimeText = useMemo(() => {
    if (existingNote?.savedAt) {
      return `Created ${existingNote.savedAt.replace('Today at ', 'Today • ')}`;
    }
    return 'Created Just now';
  }, [existingNote]);

  const activeTintObj = useMemo(() => {
    return TINT_OPTIONS.find((t) => t.id === selectedTint) || TINT_OPTIONS[0];
  }, [selectedTint]);

  const handleNavigateBack = () => {
    if (goBack) {
      goBack('notes_main_light_mode');
    } else if (setActiveTab) {
      setActiveTab('notes_main_light_mode');
    } else if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  const handleOpenAttachment = (att) => {
    const targetNoteId = existingNote?.id && existingNote.id !== 'new' ? existingNote.id : effectiveNoteId;
    if (targetNoteId && targetNoteId !== 'new') {
      useNotesStore.getState().setActiveNoteId?.(targetNoteId);
    }
    if (att?.id) {
      useNotesStore.getState().setActiveAttachmentId?.(att.id);
    }
    const mediaParams = {
      uri: att?.url || att?.uri,
      url: att?.url || att?.uri,
      name: att?.name || 'Photo attachment',
      attachment: att,
      attachmentId: att?.id,
      noteId: targetNoteId,
    };
    if (setActiveTab) {
      setActiveTab('AttachmentDetails', mediaParams);
    } else {
      useNavigationStore.getState().navigateTo('AttachmentDetails', mediaParams);
    }
  };

  const handleSave = () => {
    const finalAttachments = [];
    if (imageAttachment) {
      finalAttachments.push(imageAttachment);
    }

    const notePayload = {
      title: title.trim() || 'Untitled Quick Note',
      body: body.trim(),
      category: selectedCategory,
      tint: selectedTint,
      isPinned,
      type: 'quick',
      reminder,
      tags: [selectedCategory],
      attachments: finalAttachments,
      savedAt: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (existingNote?.id) {
      updateNote(existingNote.id, notePayload);
      setIsEditing(false);
      toast.success(t('toasts.noteUpdated', 'Note updated'));
    } else {
      addNote(notePayload);
      toast.success(t('toasts.noteSaved', 'Note saved'));
      handleNavigateBack();
    }
  };

  const handleCancel = () => {
    if (!isEditing) {
      handleNavigateBack();
      return;
    }
    if (isNew) {
      handleNavigateBack();
    } else {
      setTitle(existingNote.title || '');
      setBody(existingNote.body || existingNote.content || '');
      setSelectedCategory(existingNote.category || 'Checklist');
      setSelectedTint(existingNote.tint || 'slate');
      setIsPinned(Boolean(existingNote.isPinned));
      const img = existingNote.attachments?.find((a) => a.type === 'image' && a.url) || null;
      setImageAttachment(img);
      setIsEditing(false);
    }
  };

  const isArchived = Boolean(existingNote?.isArchived);

  const handleToggleArchive = () => {
    const targetId = existingNote?.id;
    if (!targetId || targetId === 'new') return;
    const nextArchived = !isArchived;
    if (nextArchived) {
      if (archiveNote) archiveNote(targetId);
      else updateNote(targetId, { isArchived: true });
    } else {
      if (unarchiveNote) unarchiveNote(targetId);
      else updateNote(targetId, { isArchived: false });
    }
    setTimeout(() => {
      handleNavigateBack();
    }, 200);
  };

  const handleDeleteNote = async () => {
    setIsMenuOpen(false);
    const rawTarget = (existingNote?.id && existingNote.id !== 'new')
      ? existingNote.id
      : (effectiveNoteId && effectiveNoteId !== 'new'
        ? effectiveNoteId
        : (storeActiveNoteId && storeActiveNoteId !== 'new' ? storeActiveNoteId : null));
    const targetId = rawTarget ? String(rawTarget) : null;

    const confirmed = await confirm({
      variant: 'destructive',
      title: t('notes.deleteNoteTitle', 'Delete Note?'),
      description: t('notes.deleteNotePermanent', 'This note will be permanently removed from your storage.'),
      confirmText: t('common.delete', 'Delete'),
      cancelText: t('common.cancel', 'Cancel'),
    });
    if (!confirmed) return;

    if (!targetId) {
      handleNavigateBack();
      return;
    }

    try {
      const removed = deleteNote(targetId);
      if (!removed) {
        toast.error(t('notes.deleteFailed', 'Could not delete this note. Please try again.'));
        return;
      }
      toast.success(t('toasts.noteDeleted', 'Note deleted'));
      handleNavigateBack();
    } catch (error) {
      console.error('[Momentum Quick Note] Deletion failed:', error);
      toast.error(t('notes.deleteFailed', 'Could not delete this note. Please try again.'));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const savedAtt = await saveAttachmentFile(file, {
          noteId: existingNote?.id || null,
          name: file.name,
          subtitle: 'Photo attachment',
        });
        setImageAttachment(savedAtt);
      } catch (err) {
        console.warn('Failed to save image attachment:', err);
      }
    }
  };

  // 1. Checklist Insertion Logic
  const handleInsertChecklist = () => {
    const textarea = bodyTextareaRef.current;
    if (!textarea) {
      setBody((prev) => (prev ? `${prev}\n- [ ] ` : '- [ ] '));
      return;
    }
    const start = textarea.selectionStart ?? body.length;
    const end = textarea.selectionEnd ?? body.length;
    const before = body.substring(0, start);
    const after = body.substring(end);
    const prefix = (before.length === 0 || before.endsWith('\n')) ? '- [ ] ' : '\n- [ ] ';
    const newBody = before + prefix + after;
    setBody(newBody);
    setTimeout(() => {
      textarea.focus();
      const newCursor = start + prefix.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  // 2. Bullet Point Insertion Logic
  const handleInsertBullet = () => {
    const textarea = bodyTextareaRef.current;
    if (!textarea) {
      setBody((prev) => (prev ? `${prev}\n• ` : '• '));
      return;
    }
    const start = textarea.selectionStart ?? body.length;
    const end = textarea.selectionEnd ?? body.length;
    const before = body.substring(0, start);
    const after = body.substring(end);
    const prefix = (before.length === 0 || before.endsWith('\n')) ? '• ' : '\n• ';
    const newBody = before + prefix + after;
    setBody(newBody);
    setTimeout(() => {
      textarea.focus();
      const newCursor = start + prefix.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  // 3. Save Drawn Scribble to Note Attachment
  const handleSaveSketch = (dataUrl) => {
    setImageAttachment({
      id: `sketch-${Date.now()}`,
      name: 'Handwritten_Sketch.png',
      type: 'image',
      url: dataUrl,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Hidden File Input for Image Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="hidden" 
      />

      {/* 1. TOP HEADER & STATUS BAR */}
      <MomentumGlassHeader isDarkMode={false}>
        {/* Left Section */}
        <div className="flex flex-row items-center gap-2">
          <button 
            type="button" 
            onClick={handleCancel}
            aria-label="Back to Notes"
            className="w-8 h-8 -ml-1 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight truncate min-w-0">
            {isEditing ? (isNew ? t('notes.newNote', 'New Note') : t('notes.editNote', 'Edit Note')) : t('notes.note', 'Note')}
          </h1>
        </div>

        {/* Right Section (Actions: Clean, Distraction-Free Header) */}
        <div className="flex flex-row items-center gap-1.5 sm:gap-3 shrink-0">
          {/* 1. Primary Clean Edit / Done Action */}
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={t('notes.editNote', 'Edit Note')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
              title={t('notes.editNote', 'Edit Note')}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('common.edit', 'Edit')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              aria-label={t('notes.doneEditing', 'Done Editing')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
              title={t('notes.doneEditing', 'Done Editing')}
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t('common.done', 'Done')}</span>
            </button>
          )}

          <div className="relative" ref={menuRef}>
            <button 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Note options" 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title={t('notes.moreOptions', 'More Options')}
            >
              <MoreVertical className="w-4.5 h-4.5" />
            </button>
            {isMenuOpen && (
              <div className="absolute end-0 top-11 w-48 max-w-[min(12rem,calc(100vw-2rem))] rounded-2xl bg-white/95 border border-slate-200 shadow-2xl p-1.5 z-50 text-xs font-medium space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <button 
                  type="button" 
                  onClick={() => { setIsPinned((prev) => !prev); setIsMenuOpen(false); }} 
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 text-left transition-colors cursor-pointer"
                >
                  <Pin className={`w-4 h-4 text-slate-400 ${isPinned ? 'fill-indigo-600 text-indigo-600 rotate-45' : ''}`} />
                  <span>{isPinned ? t('notes.unpinNote', 'Unpin Note') : t('notes.pinNote', 'Pin Note')}</span>
                </button>

                {existingNote?.id && existingNote.id !== 'new' && (
                  <button 
                    type="button" 
                    onClick={() => { setIsMenuOpen(false); handleToggleArchive(); }} 
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 text-left transition-colors cursor-pointer"
                  >
                    {isArchived ? (
                      <ArchiveRestore className="w-4 h-4 text-primary" />
                    ) : (
                      <Archive className="w-4 h-4 text-slate-500" />
                    )}
                    <span>{isArchived ? t('notes.unarchiveNote', 'Unarchive Note') : t('notes.archiveNote', 'Archive Note')}</span>
                  </button>
                )}

                <div className="my-1 border-t border-slate-100"></div>

                <button 
                  type="button" 
                  onClick={handleDeleteNote} 
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-left transition-colors cursor-pointer font-medium"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>{t('notes.deleteNote', 'Delete Note')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </MomentumGlassHeader>

      {/* 2. AUTOSAVED SUB-BAR */}
      <div className="flex flex-row items-center justify-between w-full px-5 py-2.5">
        <span className="h-9 px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-emerald-50 border border-emerald-200/80 text-emerald-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600"/>
          {existingNote?.savedAt ? `Autosaved • ${existingNote.savedAt.replace('Today at ', '')}` : 'Autosaved • 10:45 AM'}
        </span>
      </div>

      {/* 3. CATEGORY TAGS ROW */}
      <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none pb-1">
        {isEditing ? (
          CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button 
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs whitespace-nowrap flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer select-none ${
                  isSelected 
                    ? 'bg-primary text-white font-semibold shadow-sm shadow-primary/20' 
                    : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 font-medium hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            );
          })
        ) : (
          (() => {
            const catObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
            return (
              <span className="px-3.5 py-1.5 rounded-2xl text-xs whitespace-nowrap flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary font-semibold shadow-xs">
                <span>{catObj.emoji}</span> {catObj.label}
              </span>
            );
          })()
        )}
      </div>

      {/* 4. MAIN QUICK NOTE CARD */}
      <div className={`block mx-5 mb-4 p-5 rounded-3xl space-y-4 backdrop-blur-xl border transition-all duration-300 ${activeTintObj.cardBg}`}>
        {/* Title Row */}
        <div className="flex items-center justify-between gap-3">
          {isEditing ? (
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('notes.noteTitle', 'Note Title')} className="text-lg font-bold text-slate-900 bg-transparent w-full focus:outline-none placeholder-slate-400"
            />
          ) : (
            <h2 className="text-lg font-bold text-slate-900 select-text">
              {title || t('notes.untitledQuickNote', 'Untitled Quick Note')}
            </h2>
          )}
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-300 ${activeTintObj.dotBg}`}></span>
        </div>
        
        {/* Color Tint Selector (HIDDEN IN VIEW MODE) */}
        {isEditing && (
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-medium text-slate-400">{t('common.color', 'Tint:')}</span>
            <div className="flex items-center gap-2">
              {TINT_OPTIONS.map((tint) => {
                const isSelected = selectedTint === tint.id;
                return (
                  <button
                    key={tint.id}
                    type="button"
                    onClick={() => setSelectedTint(tint.id)}
                    aria-label={`Select ${tint.label} tint`}
                    className={`w-6 h-6 rounded-full ${tint.btnBg} transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-2 border-primary ring-2 ring-primary/30 scale-110 shadow-xs' 
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Body Textarea in Edit Mode, Clean paragraph in View Mode */}
        {isEditing ? (
          <textarea 
            ref={bodyTextareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t('notes.jotDownPlaceholder', 'Jot down quick thoughts, checklists, or spiritual reflections...')}
            rows={3}
            className="w-full bg-transparent text-sm font-normal text-slate-700 leading-relaxed pt-1 focus:outline-none resize-none placeholder-slate-400"
          />
        ) : (
          <p className="w-full text-sm font-normal text-slate-700 leading-relaxed whitespace-pre-wrap select-text py-1">
            {body || t('common.noContent', 'No content')}
          </p>
        )}

        {/* Embedded Photo Attachment or Placeholder */}
        {imageAttachment?.url ? (
          <div 
            onClick={() => handleOpenAttachment(imageAttachment)}
            role="button"
            tabIndex={0}
            aria-label={`View ${imageAttachment.name || 'Photo attachment'}`}
            className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs group bg-slate-100 cursor-pointer transition-transform hover:scale-[1.01]"
          >
            <img 
              src={imageAttachment.url} 
              alt={imageAttachment.name || t('notes.photoAttachmentFallback', 'Photo attachment')} 
              className="w-full h-44 object-cover"
              onError={() => setImageAttachment(null)}
            />
            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-xl text-white text-[11px] font-medium flex items-center gap-1.5 max-w-[80%]">
              <Camera className="w-3.5 h-3.5 flex-shrink-0"/>
              <span className="truncate">{imageAttachment.name || t('notes.photoAttachmentFallback', 'Photo attachment')}</span>
            </div>
            {isEditing && (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageAttachment(null);
                  setImage(null);
                }}
                aria-label="Remove Photo Attachment"
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-xl bg-black/60 backdrop-blur-xl text-white/80 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4"/>
              </button>
            )}
          </div>
        ) : (
          isEditing && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-2xl border border-dashed border-slate-300/80 bg-white/40 hover:bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-700 transition-all cursor-pointer group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Camera className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-700">{t('notes.addPhotoAttachment', 'Add Photo Attachment')}</span>
                <span className="text-[10px] text-slate-400">{t('notes.tapToAttach', 'Tap to browse or attach an image')}</span>
              </div>
            </button>
          )
        )}

        {/* Action Toolbar */}
        {isEditing && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500">
              <button 
                type="button"
                onClick={handleInsertChecklist}
                aria-label="Add Checklist Item"
                className="p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all cursor-pointer hover:text-slate-900"
                title={t('notes.addChecklist', 'Add Checklist')}
              >
                <CheckSquare className="w-4 h-4"/>
              </button>
              <button 
                type="button"
                onClick={handleInsertBullet}
                aria-label="Add Bullet Item"
                className="p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all cursor-pointer hover:text-slate-900"
                title={t('notes.addBullet', 'Add Bullet')}
              >
                <List className="w-4 h-4"/>
              </button>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach Photo"
                className="p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all cursor-pointer hover:text-slate-900"
                title={t('notes.attachPhoto', 'Attach Photo')}
              >
                <Camera className="w-4 h-4"/>
              </button>
            </div>
            <button 
              type="button"
              onClick={() => setIsScribbleOpen(true)}
              aria-label="Open Scribble Canvas"
              className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/15 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5 text-primary"/>
              Scribble
            </button>
          </div>
        )}
      </div>

      {/* 5. REMINDER SETTING CARD */}
      <div className="block mx-5 mb-4 p-4 rounded-3xl flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg transition-all">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xs transition-colors ${
            reminder.enabled ? 'bg-violet-50 text-violet-600' : 'bg-slate-100 text-slate-400'
          }`}>
            {reminder.enabled ? <Bell className="w-5 h-5"/> : <BellOff className="w-5 h-5"/>}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              {reminder.enabled ? `${t('notes.reminderLabel', 'Reminder')}: ${reminder.displayTime}` : t('notes.noReminderSet', 'No Reminder Set')}
            </h4>
            <p className="text-[11px] font-normal text-slate-500 mt-0.5">
              {reminder.subtext}
            </p>
          </div>
        </div>
        <button 
          type="button"
          data-testid="open-reminder-btn"
          onClick={() => setIsReminderModalOpen(true)}
          aria-label="Edit Reminder"
          className="px-3 py-1 rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer active:scale-95"
        >
          {reminder.enabled ? 'Edit' : 'Add'}
        </button>
      </div>

      {/* 6. METADATA ROW */}
      <div className="px-5 mb-4">
        <div className="flex justify-between items-center w-full px-1 text-xs font-medium tracking-wide text-slate-700">
          <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <Clock className="w-3.5 h-3.5 text-slate-700 flex-shrink-0"/>
            <span>{creationTimeText}</span>
          </div>
          <span className="whitespace-nowrap shrink-0">
            {wordCount} {t('common.words', 'words')} • {charCount} {t('common.chars', 'chars')}
          </span>
        </div>
      </div>

      {/* 7. STANDARDIZED ACTION BUTTONS CONTAINER (EDIT MODE ONLY) */}
      {isEditing && (
        <div className="px-5 pb-10 space-y-3">
          <button 
            type="button"
            onClick={handleSave}
            className="btn-primary w-full h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-all shadow-md shadow-primary/20"
          >
            <span>{t('notes.saveQuickNote', 'Save Quick Note')}</span>
            <ArrowRight className="w-4 h-4"/>
          </button>

          <div className="flex flex-row items-center justify-between gap-3 w-full">
            <button 
              type="button"
              onClick={handleCancel}
              className="btn-secondary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer active:scale-[0.99] transition-all"
            >
              <X className="w-4 h-4 text-slate-500"/>
              <span>{t('common.cancel', 'Cancel')}</span>
            </button>
            <button 
              type="button"
              onClick={handleDeleteNote}
              className="btn-danger flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer active:scale-[0.99] transition-all"
            >
              <Trash2 className="w-4 h-4 text-rose-500"/>
              <span>{t('notes.deleteNote', 'Delete Note')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Scribble Modal */}
      <ScribbleModal 
        isOpen={isScribbleOpen} 
        onClose={() => setIsScribbleOpen(false)} 
        onSaveSketch={handleSaveSketch} 
        isDarkMode={false} 
      />

      {/* Reminder Picker Modal */}
      <ReminderModal 
        isOpen={isReminderModalOpen} 
        onClose={() => setIsReminderModalOpen(false)} 
        reminder={reminder} 
        onSaveReminder={(newReminder) => setReminder(newReminder)} 
        isDarkMode={false} 
      />
    </div>
  );
}
