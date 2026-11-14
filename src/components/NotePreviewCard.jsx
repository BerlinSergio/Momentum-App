import React from 'react';
import { ChevronRight, Pin, Archive, ArchiveRestore } from 'lucide-react';
import { useNotesStore } from '../store/useNotesStore';

const TINT_STYLES = {
  emerald: {
    light: {
      card: 'bg-emerald-50/90 border-emerald-200/80 shadow-sm hover:shadow-md hover:border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      border: 'border-emerald-200/60',
      title: 'text-emerald-950',
      preview: 'text-emerald-800/80',
      time: 'text-emerald-600/70',
      read: 'text-emerald-700 hover:text-emerald-800',
    },
    dark: {
      card: 'bg-emerald-950/40 hover:bg-emerald-900/50 backdrop-blur-xl border-emerald-500/30 shadow-xl shadow-emerald-950/20',
      badge: 'bg-emerald-900/50 text-emerald-300 border-emerald-500/40',
      border: 'border-emerald-800/50',
      title: 'text-white',
      preview: 'text-emerald-200/70',
      time: 'text-emerald-400/60',
      read: 'text-emerald-400 hover:text-emerald-300',
    },
  },
  green: {
    light: {
      card: 'bg-emerald-50/90 border-emerald-200/80 shadow-sm hover:shadow-md hover:border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      border: 'border-emerald-200/60',
      title: 'text-emerald-950',
      preview: 'text-emerald-800/80',
      time: 'text-emerald-600/70',
      read: 'text-emerald-700 hover:text-emerald-800',
    },
    dark: {
      card: 'bg-emerald-950/40 hover:bg-emerald-900/50 backdrop-blur-xl border-emerald-500/30 shadow-xl shadow-emerald-950/20',
      badge: 'bg-emerald-900/50 text-emerald-300 border-emerald-500/40',
      border: 'border-emerald-800/50',
      title: 'text-white',
      preview: 'text-emerald-200/70',
      time: 'text-emerald-400/60',
      read: 'text-emerald-400 hover:text-emerald-300',
    },
  },
  violet: {
    light: {
      card: 'bg-violet-50/90 border-violet-200/80 shadow-sm hover:shadow-md hover:border-violet-300',
      badge: 'bg-violet-100 text-violet-800 border-violet-200',
      border: 'border-violet-200/60',
      title: 'text-violet-950',
      preview: 'text-violet-800/80',
      time: 'text-violet-600/70',
      read: 'text-violet-700 hover:text-violet-800',
    },
    dark: {
      card: 'bg-violet-950/40 hover:bg-violet-900/50 backdrop-blur-xl border-violet-500/30 shadow-xl shadow-violet-950/20',
      badge: 'bg-violet-900/50 text-violet-300 border-violet-500/40',
      border: 'border-violet-800/50',
      title: 'text-white',
      preview: 'text-violet-200/70',
      time: 'text-violet-400/60',
      read: 'text-violet-400 hover:text-violet-300',
    },
  },
  purple: {
    light: {
      card: 'bg-violet-50/90 border-violet-200/80 shadow-sm hover:shadow-md hover:border-violet-300',
      badge: 'bg-violet-100 text-violet-800 border-violet-200',
      border: 'border-violet-200/60',
      title: 'text-violet-950',
      preview: 'text-violet-800/80',
      time: 'text-violet-600/70',
      read: 'text-violet-700 hover:text-violet-800',
    },
    dark: {
      card: 'bg-violet-950/40 hover:bg-violet-900/50 backdrop-blur-xl border-violet-500/30 shadow-xl shadow-violet-950/20',
      badge: 'bg-violet-900/50 text-violet-300 border-violet-500/40',
      border: 'border-violet-800/50',
      title: 'text-white',
      preview: 'text-violet-200/70',
      time: 'text-violet-400/60',
      read: 'text-violet-400 hover:text-violet-300',
    },
  },
  sky: {
    light: {
      card: 'bg-sky-50/90 border-sky-200/80 shadow-sm hover:shadow-md hover:border-sky-300',
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      border: 'border-sky-200/60',
      title: 'text-sky-950',
      preview: 'text-sky-800/80',
      time: 'text-sky-600/70',
      read: 'text-sky-700 hover:text-sky-800',
    },
    dark: {
      card: 'bg-sky-950/40 hover:bg-sky-900/50 backdrop-blur-xl border-sky-500/30 shadow-xl shadow-sky-950/20',
      badge: 'bg-sky-900/50 text-sky-300 border-sky-500/40',
      border: 'border-sky-800/50',
      title: 'text-white',
      preview: 'text-sky-200/70',
      time: 'text-sky-400/60',
      read: 'text-sky-400 hover:text-sky-300',
    },
  },
  blue: {
    light: {
      card: 'bg-sky-50/90 border-sky-200/80 shadow-sm hover:shadow-md hover:border-sky-300',
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      border: 'border-sky-200/60',
      title: 'text-sky-950',
      preview: 'text-sky-800/80',
      time: 'text-sky-600/70',
      read: 'text-sky-700 hover:text-sky-800',
    },
    dark: {
      card: 'bg-sky-950/40 hover:bg-sky-900/50 backdrop-blur-xl border-sky-500/30 shadow-xl shadow-sky-950/20',
      badge: 'bg-sky-900/50 text-sky-300 border-sky-500/40',
      border: 'border-sky-800/50',
      title: 'text-white',
      preview: 'text-sky-200/70',
      time: 'text-sky-400/60',
      read: 'text-sky-400 hover:text-sky-300',
    },
  },
  amber: {
    light: {
      card: 'bg-amber-50/90 border-amber-200/80 shadow-sm hover:shadow-md hover:border-amber-300',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      border: 'border-amber-200/60',
      title: 'text-amber-950',
      preview: 'text-amber-800/80',
      time: 'text-amber-600/70',
      read: 'text-amber-700 hover:text-amber-800',
    },
    dark: {
      card: 'bg-amber-950/40 hover:bg-amber-900/50 backdrop-blur-xl border-amber-500/30 shadow-xl shadow-amber-950/20',
      badge: 'bg-amber-900/50 text-amber-300 border-amber-500/40',
      border: 'border-amber-800/50',
      title: 'text-white',
      preview: 'text-amber-200/70',
      time: 'text-amber-400/60',
      read: 'text-amber-400 hover:text-amber-300',
    },
  },
  yellow: {
    light: {
      card: 'bg-amber-50/90 border-amber-200/80 shadow-sm hover:shadow-md hover:border-amber-300',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      border: 'border-amber-200/60',
      title: 'text-amber-950',
      preview: 'text-amber-800/80',
      time: 'text-amber-600/70',
      read: 'text-amber-700 hover:text-amber-800',
    },
    dark: {
      card: 'bg-amber-950/40 hover:bg-amber-900/50 backdrop-blur-xl border-amber-500/30 shadow-xl shadow-amber-950/20',
      badge: 'bg-amber-900/50 text-amber-300 border-amber-500/40',
      border: 'border-amber-800/50',
      title: 'text-white',
      preview: 'text-amber-200/70',
      time: 'text-amber-400/60',
      read: 'text-amber-400 hover:text-amber-300',
    },
  },
  rose: {
    light: {
      card: 'bg-rose-50/90 border-rose-200/80 shadow-sm hover:shadow-md hover:border-rose-300',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      border: 'border-rose-200/60',
      title: 'text-rose-950',
      preview: 'text-rose-800/80',
      time: 'text-rose-600/70',
      read: 'text-rose-700 hover:text-rose-800',
    },
    dark: {
      card: 'bg-rose-950/40 hover:bg-rose-900/50 backdrop-blur-xl border-rose-500/30 shadow-xl shadow-rose-950/20',
      badge: 'bg-rose-900/50 text-rose-300 border-rose-500/40',
      border: 'border-rose-800/50',
      title: 'text-white',
      preview: 'text-rose-200/70',
      time: 'text-rose-400/60',
      read: 'text-rose-400 hover:text-rose-300',
    },
  },
  slate: {
    light: {
      card: 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200',
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      border: 'border-slate-100',
      title: 'text-slate-800',
      preview: 'text-slate-500',
      time: 'text-slate-400',
      read: 'text-primary hover:text-primary/80',
    },
    dark: {
      card: 'bg-black/40 hover:bg-slate-800/70 backdrop-blur-xl border-white/10 shadow-xl',
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      border: 'border-slate-800/60',
      title: 'text-white',
      preview: 'text-slate-400',
      time: 'text-slate-400',
      read: 'text-primary hover:text-primary/80',
    },
  },
};

export default function NotePreviewCard({ note, onOpen, onArchive, isDarkMode = false }) {
  if (!note) return null;

  const handleArchiveToggle = (e) => {
    e.stopPropagation();
    if (onArchive) {
      onArchive(note);
    } else {
      const store = useNotesStore.getState();
      if (note.isArchived) {
        if (store.unarchiveNote) store.unarchiveNote(note.id);
        else store.updateNote(note.id, { isArchived: false });
      } else {
        if (store.archiveNote) store.archiveNote(note.id);
        else store.updateNote(note.id, { isArchived: true });
      }
    }
  };

  // 1. Resolve dynamic tint theme
  const tintKey = (note.tint || '').toLowerCase();
  const tintConfig = TINT_STYLES[tintKey] || TINT_STYLES.slate;
  const theme = isDarkMode ? tintConfig.dark : tintConfig.light;

  // 2. Extract clean primary tag
  const tag = note.category || (Array.isArray(note.tags) && note.tags[0]) || null;

  // 3. Extract content preview (guarantee body text is shown, not duplicating title)
  const rawBody = (note.body || note.content || '').trim();
  const noteTitle = (note.title || 'Untitled Note').trim();
  const previewText = rawBody;

  // 4. Extract real image attachment (if any)
  const imageAttachment = Array.isArray(note.attachments)
    ? note.attachments.find((a) => (a.type === 'image' || a.url) && a.url)
    : null;

  // 5. Format timestamp
  const displayTime = note.savedAt || note.date || 'Recently';

  return (
    <div
      onClick={() => onOpen(note)}
      className={`block w-full rounded-2xl p-3.5 sm:p-4 transition-all duration-200 ease-out active:scale-[0.99] cursor-pointer select-none border ${theme.card}`}
    >
      <div className="flex flex-col gap-2">
        {/* 1. TOP ROW: COMPACT TAG AT TOP LEFT & PIN INDICATOR */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {tag && (
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide border ${theme.badge}`}
              >
                {tag}
              </span>
            )}
            {note.isPinned && (
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 border ${
                  isDarkMode
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                    : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}
              >
                <Pin className="w-2.5 h-2.5 fill-current" />
                <span>Pinned</span>
              </span>
            )}
          </div>
        </div>

        {/* 2. TITLE: BOLD & CLAMPED */}
        <h4 className={`text-base font-semibold tracking-tight line-clamp-1 ${theme.title}`}>
          {noteTitle}
        </h4>

        {/* 3. PREVIEW TEXT: MUTED & CLAMPED TO 2 LINES */}
        {previewText ? (
          <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${theme.preview}`}>
            {previewText}
          </p>
        ) : null}

        {/* 4. SLEEK BANNER IMAGE CONTAINER (FULL INNER WIDTH, FIXED HEIGHT, OBJECT-COVER) */}
        {imageAttachment?.url && (
          <div className="w-full h-36 rounded-[12px] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xs mt-1">
            <img
              src={imageAttachment.url}
              alt={imageAttachment.name || noteTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) parent.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* 5. METADATA ROW: TIME & READ LINK */}
        <div
          className={`flex justify-between items-center pt-2.5 mt-1 border-t ${theme.border}`}
        >
          <span className={`text-xs ${theme.time}`}>{displayTime}</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleArchiveToggle}
              aria-label={note.isArchived ? "Unarchive Note" : "Archive Note"}
              title={note.isArchived ? "Unarchive Note" : "Archive Note"}
              className={`p-1.5 rounded-lg transition-all duration-150 cursor-pointer active:scale-90 flex items-center justify-center ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              {note.isArchived ? (
                <ArchiveRestore className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Archive className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
              )}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(note);
              }}
              className={`text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none ${theme.read}`}
            >
              <span>Read</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
