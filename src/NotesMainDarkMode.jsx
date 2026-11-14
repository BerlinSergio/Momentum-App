import React, { useState, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import NotePreviewCard from './components/NotePreviewCard';
import NewNoteFloatingMenu from './components/NewNoteFloatingMenu';
import { useNotesStore } from './store/useNotesStore';
import {
  PenTool, Search, ChevronRight, BookOpen,
  FolderArchive, Folder, X, SearchX, Plus
} from 'lucide-react';

export default function NotesMainDarkMode({ setActiveTab }) {
  const notes = useNotesStore((s) => s.notes);
  const setActiveNoteId = useNotesStore((s) => s.setActiveNoteId);
  const archiveNote = useNotesStore((s) => s.archiveNote);
  const unarchiveNote = useNotesStore((s) => s.unarchiveNote);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCreateQuickNote = () => {
    const store = useNotesStore.getState();
    if (store.clearActiveNote) store.clearActiveNote();
    else if (setActiveNoteId) setActiveNoteId(null);
    setIsMenuOpen(false);
    if (setActiveTab) setActiveTab('quick_note_editor_dark_mode', { isNew: true });
  };

  const handleCreateLongNote = () => {
    const store = useNotesStore.getState();
    if (store.clearActiveNote) store.clearActiveNote();
    else if (setActiveNoteId) setActiveNoteId(null);
    setIsMenuOpen(false);
    if (setActiveTab) setActiveTab('long_note_editor_dark_mode', { isNew: true });
  };

  const getMilestoneProgress = (note) => {
    const ms = Array.isArray(note.milestones) ? note.milestones : (Array.isArray(note.checklist) ? note.checklist : []);
    if (ms.length === 0) return null;
    const done = ms.filter((m) => m.completed).length;
    return `${done}/${ms.length} Done`;
  };

  const activeNotes = useMemo(() => notes.filter((n) => !n.isArchived), [notes]);
  const archivedNotes = useMemo(() => notes.filter((n) => Boolean(n.isArchived)), [notes]);

  const totalCount = activeNotes.length;
  const pinnedCount = activeNotes.filter((n) => n.isPinned).length;
  const quickCount = activeNotes.filter((n) => n.type === 'quick' || (!n.type && n.type !== 'long')).length;
  const longCount = activeNotes.filter((n) => n.type === 'long').length;

  const filteredNotes = useMemo(() => {
    return activeNotes.filter((note) => {
      if (activeFilter === 'pinned' && !note.isPinned) return false;
      if (activeFilter === 'quick' && !(note.type === 'quick' || (!note.type && note.type !== 'long'))) return false;
      if (activeFilter === 'long' && note.type !== 'long') return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (note.title || '').toLowerCase().includes(q);
      const bodyMatch = (note.body || note.content || '').toLowerCase().includes(q);
      const tagMatch = Array.isArray(note.tags) && note.tags.some((t) => t.toLowerCase().includes(q));
      const catMatch = (note.category || '').toLowerCase().includes(q);
      return titleMatch || bodyMatch || tagMatch || catMatch;
    });
  }, [activeNotes, searchQuery, activeFilter]);

  const quickNotes = filteredNotes.filter((n) => n.type === 'quick' || (!n.type && n.type !== 'long'));
  const longNotes = filteredNotes.filter((n) => n.type === 'long');

  const handleOpenNote = (note) => {
    if (setActiveNoteId) setActiveNoteId(note.id);
    const isQuick = note.type === 'quick' || (!note.type && note.type !== 'long');
    const target = isQuick ? 'quick_note_editor_dark_mode' : 'long_note_editor_dark_mode';
    if (setActiveTab) setActiveTab(target, { isNew: false, noteId: note.id });
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans pb-36">
      {/* 1. TOP HEADER */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <PenTool className="w-5 h-5 text-white"/>
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">Notes Dashboard</h1>
        </div>
        <UserAvatar setActiveTab={setActiveTab} />
      </div>

      {/* 2. SEARCH BAR & HORIZONTAL FILTER CHIPS */}
      <div className="px-5 mt-6 mb-3">
        <div className="w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <Search className="w-4 h-4 text-slate-500 shrink-0"/>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, tags, or voice memos..."
            className="w-full bg-transparent text-xs font-normal text-white focus:outline-none placeholder-slate-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5"/>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 mb-5 overflow-x-auto scrollbar-none">
        <button onClick={() => setActiveFilter('all')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'all' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>
          All Notes ({totalCount})
        </button>
        <button onClick={() => setActiveFilter('pinned')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'pinned' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>
          📌 Pinned ({pinnedCount})
        </button>
        <button onClick={() => setActiveFilter('quick')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'quick' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>
          ⚡ Quick Notes ({quickCount})
        </button>
        <button onClick={() => setActiveFilter('long')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'long' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>
          📖 Long Notes ({longCount})
        </button>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="mx-5 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-slate-900/60 border-white/10 shadow-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
            <SearchX className="w-8 h-8"/>
          </div>
          <h3 className="text-base font-semibold mb-1 text-white">
            {activeNotes.length === 0 ? 'No Notes Yet' : 'No Notes Found'}
          </h3>
          <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-400">
            {activeNotes.length === 0 ? 'Your mindful sanctuary is ready. Tap New Note to create your first reflection.' : 'No notes match your filter or search query. Try another keyword or reset the filter.'}
          </p>
          <button
            onClick={() => {
              if (activeNotes.length === 0) {
                setIsMenuOpen(true);
              } else {
                setSearchQuery('');
                setActiveFilter('all');
              }
            }}
            className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
          >
            {activeNotes.length === 0 ? 'Create First Note' : 'Clear Search Filter'}
          </button>
        </div>
      ) : (
        <>
          {/* 3. QUICK NOTES SECTION */}
          {activeFilter !== 'long' && quickNotes.length > 0 && (
            <>
              <div className="flex items-center justify-between px-5 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">⚡</span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Notes</h3>
                  <span className="text-xs text-slate-500">• Fleeting</span>
                </div>
                <button onClick={() => setActiveFilter('quick')} className="text-xs font-semibold text-primary hover:text-primary flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none">
                  See all ({quickCount}) <ChevronRight className="w-3.5 h-3.5"/>
                </button>
              </div>

              <div className="space-y-3 px-5 mb-6">
                {quickNotes.map((note) => (
                  <NotePreviewCard
                    key={note.id}
                    note={note}
                    onOpen={handleOpenNote}
                    onArchive={(n) => archiveNote(n.id)}
                    isDarkMode={true}
                  />
                ))}
              </div>
            </>
          )}

          {/* 4. LONG NOTES SECTION */}
          {activeFilter !== 'quick' && longNotes.length > 0 && (
            <>
              <div className="flex items-center justify-between px-5 mb-3">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-primary"/>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Long Notes</h3>
                  <span className="text-xs text-slate-500">• Journal & Studies</span>
                </div>
                <span className="text-xs font-medium text-slate-500">{longNotes.length} Total</span>
              </div>

              <div className="space-y-3 px-5 mb-6">
                {longNotes.map((note) => (
                  <NotePreviewCard
                    key={note.id}
                    note={note}
                    onOpen={handleOpenNote}
                    onArchive={(n) => archiveNote(n.id)}
                    isDarkMode={true}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* 5. STANDARDIZED ARCHIVE CONTAINER */}
      <div className="block mx-5 mb-8 p-6 rounded-3xl text-center space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="block w-12 h-12 rounded-2xl text-primary flex items-center justify-center mx-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <FolderArchive className="w-6 h-6 text-primary"/>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">
            {archivedNotes.length === 0 ? 'No archived notes yet' : `${archivedNotes.length} Archived Note${archivedNotes.length === 1 ? '' : 's'}`}
          </h4>
          <p className="text-xs font-normal text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
            {archivedNotes.length === 0
              ? 'Keep writing! Your mindful library expands and grows with every gentle thought, ayah reflection, and daily goal.'
              : 'Safely preserved reflections stored away from your main active notes workspace.'}
          </p>
        </div>
        <button
          onClick={() => setIsArchiveOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-primary inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none shadow-2xs"
        >
          <Folder className="w-3.5 h-3.5 text-primary"/>
          View Archive Drawer {archivedNotes.length > 0 && `(${archivedNotes.length})`}
        </button>
      </div>

      {/* 6. PREMIUM EXTENDED FLOATING NEW NOTE FAB & COMPACT POPOVER */}
      <div className="fixed bottom-24 right-5 z-50">
        {/* Floating Pop-up Menu */}
        <NewNoteFloatingMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSelectQuickNote={handleCreateQuickNote}
          onSelectLongNote={handleCreateLongNote}
          isDarkMode={true}
        />

        {/* FAB Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="New Note"
          aria-expanded={isMenuOpen}
          className={`group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-500 text-white text-[14px] font-semibold tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95 transition-all duration-200 ease-out border border-white/20 cursor-pointer select-none ${
            isMenuOpen ? 'ring-2 ring-primary/60 scale-[1.02]' : 'hover:scale-[1.03]'
          }`}
        >
          <PenTool className={`w-4 h-4 stroke-[2.2] text-white transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : 'group-hover:rotate-6'}`}/>
          <span>New Note</span>
        </button>
      </div>

      {/* 7. INTERACTIVE ARCHIVE DRAWER MODAL */}
      {isArchiveOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div onClick={() => setIsArchiveOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer" />
          <div className="relative z-10 w-full max-w-md max-h-[85vh] bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 shadow-2xl flex flex-col space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-slate-700/80 rounded-full mx-auto shrink-0 mb-1" />
            
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FolderArchive className="w-5 h-5 text-primary"/>
                <h3 className="text-base font-bold text-white">Archived Notes & Journals</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                  {archivedNotes.length}
                </span>
              </div>
              <button 
                onClick={() => setIsArchiveOpen(false)} 
                aria-label="Close Archive Drawer"
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4"/>
              </button>
            </div>

            {archivedNotes.length === 0 ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <FolderArchive className="w-6 h-6 text-primary/70"/>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">No archived notes yet</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                    Notes you archive from the dashboard or editor will be safely preserved here away from your active dashboard.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto space-y-3 pr-1 max-h-[50vh] scrollbar-thin">
                {archivedNotes.map((note) => (
                  <NotePreviewCard
                    key={note.id}
                    note={note}
                    onOpen={(n) => {
                      setIsArchiveOpen(false);
                      handleOpenNote(n);
                    }}
                    onArchive={(n) => unarchiveNote(n.id)}
                    isDarkMode={true}
                  />
                ))}
              </div>
            )}

            <button 
              onClick={() => setIsArchiveOpen(false)} 
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer shrink-0 mt-2"
            >
              Back to Notes Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}