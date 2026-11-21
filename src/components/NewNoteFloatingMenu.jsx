import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';

/**
 * NewNoteFloatingMenu
 * Stacked Speed-Dial Pill Design:
 * - NO background dimming or blur overlay (100% clear dashboard)
 * - Two distinct separate floating pill buttons (Long Note on top, Quick Note on bottom)
 * - Purple circular icon for Long Note, Orange circular icon for Quick Note
 * - Caret tail pointing down from Quick Note
 */
export default function NewNoteFloatingMenu({
  isOpen,
  onClose,
  onSelectQuickNote,
  onSelectLongNote,
  isDarkMode = true
}) {
  const { t } = useTranslation();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Invisible Click-Outside Dismissal Layer (NO blur, NO dark overlay) */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-transparent cursor-default pointer-events-auto"
        aria-hidden="true"
      />

      {/* 2. Stacked Pill Buttons Container */}
      <div
        ref={menuRef}
        role="menu"
        aria-label="Create note options"
        className="absolute bottom-full right-0 mb-3 z-50 flex flex-col items-end gap-2 pointer-events-auto select-none"
      >
        {/* Top Pill: Long Note */}
        <button
          type="button"
          onClick={onSelectLongNote}
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl border transition-all duration-150 cursor-pointer active:scale-95 animate-speed-dial-1 ${
            isDarkMode
              ? 'bg-slate-900/95 backdrop-blur-md border-white/10 text-white shadow-black/50 hover:bg-slate-800 hover:border-purple-500/40'
              : 'bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-800 shadow-slate-300/60 hover:bg-white hover:border-purple-300'
          }`}
        >
          {/* Purple circular icon */}
          <div
            className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-150 group-hover:scale-105 ${
              isDarkMode
                ? 'bg-purple-950/60 border border-purple-500/30 text-purple-400'
                : 'bg-purple-100 border border-purple-200 text-purple-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span className="text-xs font-semibold tracking-tight pr-1 whitespace-nowrap">
            {t('notes.longNote', 'Long Note')}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* Bottom Pill: Quick Note */}
        <div className="relative flex flex-col items-end">
          <button
            type="button"
            onClick={onSelectQuickNote}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl border transition-all duration-150 cursor-pointer active:scale-95 animate-speed-dial-2 ${
              isDarkMode
                ? 'bg-slate-900/95 backdrop-blur-md border-white/10 text-white shadow-black/50 hover:bg-slate-800 hover:border-orange-500/40'
                : 'bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-800 shadow-slate-300/60 hover:bg-white hover:border-orange-300'
            }`}
          >
            {/* Orange circular icon */}
            <div
              className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-150 group-hover:scale-105 ${
                isDarkMode
                  ? 'bg-orange-950/60 border border-orange-500/30 text-orange-400'
                  : 'bg-orange-100 border border-orange-200 text-orange-600'
              }`}
            >
              <Zap className="w-3.5 h-3.5 stroke-[2.2] fill-current" />
            </div>
            <span className="text-xs font-semibold tracking-tight pr-1 whitespace-nowrap">
              {t('notes.quickNote', 'Quick Note')}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* Downward Caret Pointer Tail directly below Quick Note */}
          <div className="flex justify-end pr-8 -mt-1 pointer-events-none animate-speed-dial-2">
            <svg
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
              className="drop-shadow-xs"
            >
              <path
                d="M6 6L0 0H12L6 6Z"
                className={isDarkMode ? 'fill-slate-900 stroke-white/10' : 'fill-white stroke-slate-200/90'}
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
