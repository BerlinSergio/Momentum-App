import React, { useEffect } from 'react';
import { Zap, BookOpen, X, ChevronRight, PenTool } from 'lucide-react';

/**
 * NewNoteActionSheet
 * Sleek bottom sheet modal for choosing note creation mode:
 * 1. ⚡️ Quick Note (fleeting thoughts, checklists, sketches)
 * 2. 📖 Long Note / Journal (deep reflections, Quranic study, rich formatted notes)
 */
export default function NewNoteActionSheet({
  isOpen,
  onClose,
  onSelectQuickNote,
  onSelectLongNote,
  isDarkMode = true,
}) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-note-modal-title"
    >
      {/* Backdrop with blur & quick one-tap dismissal */}
      <div
        onClick={onClose}
        className={`fixed inset-0 transition-opacity cursor-pointer ${
          isDarkMode
            ? 'bg-black/70 backdrop-blur-sm'
            : 'bg-slate-900/40 backdrop-blur-sm'
        }`}
      />

      {/* Action Sheet Container */}
      <div
        className={`relative z-10 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border space-y-4 animate-in slide-in-from-bottom duration-200 ${
          isDarkMode
            ? 'bg-slate-900/95 backdrop-blur-xl border-white/10 text-white'
            : 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900'
        }`}
      >
        {/* Top drag handle indicator for mobile sheet feel */}
        <div
          className={`w-12 h-1.5 rounded-full mx-auto -mt-1 mb-2 sm:hidden ${
            isDarkMode ? 'bg-slate-700/80' : 'bg-slate-300'
          }`}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-md ${
                isDarkMode
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              <PenTool className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3
                id="new-note-modal-title"
                className={`text-base font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Create New Note
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Select the format that fits your thought
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDarkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-1">
          {/* Option 1: ⚡️ Quick Note */}
          <button
            type="button"
            onClick={onSelectQuickNote}
            className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer select-none group border active:scale-[0.98] ${
              isDarkMode
                ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-950/20'
                : 'bg-amber-50/40 hover:bg-amber-50 border-amber-200/70 hover:border-amber-400/80 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5 pr-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 ${
                  isDarkMode
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                }`}
              >
                <Zap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    ⚡️ Quick Note
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                      isDarkMode
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    Fleeting
                  </span>
                </div>
                <p
                  className={`text-xs mt-0.5 leading-relaxed ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Fleeting thoughts, quick checklists, scratchpads & sketches
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 shrink-0 group-hover:translate-x-1 transition-all duration-200 ${
                isDarkMode
                  ? 'text-slate-500 group-hover:text-amber-400'
                  : 'text-slate-400 group-hover:text-amber-600'
              }`}
            />
          </button>

          {/* Option 2: 📖 Long Note / Journal */}
          <button
            type="button"
            onClick={onSelectLongNote}
            className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer select-none group border active:scale-[0.98] ${
              isDarkMode
                ? 'bg-slate-800/60 hover:bg-slate-800 border-white/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'
                : 'bg-indigo-50/40 hover:bg-indigo-50 border-indigo-200/70 hover:border-indigo-400/80 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5 pr-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 ${
                  isDarkMode
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-primary text-white shadow-md shadow-primary/25'
                }`}
              >
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    📖 Long Note / Journal
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                      isDarkMode
                        ? 'bg-primary/15 text-primary border border-primary/30'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}
                  >
                    Deep Study
                  </span>
                </div>
                <p
                  className={`text-xs mt-0.5 leading-relaxed ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  In-depth reflections, Quranic study, rich formatting & attachments
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 shrink-0 group-hover:translate-x-1 transition-all duration-200 ${
                isDarkMode
                  ? 'text-slate-500 group-hover:text-primary'
                  : 'text-slate-400 group-hover:text-primary'
              }`}
            />
          </button>
        </div>

        {/* Dismiss Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer select-none active:scale-95 border ${
              isDarkMode
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-white/5'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
