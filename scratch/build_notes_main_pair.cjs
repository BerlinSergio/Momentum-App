const fs = require('fs');

function buildNotesMainPair() {
  const darkLines = [];
  const lightLines = [];

  function add(dark, light) {
    darkLines.push(dark);
    lightLines.push(light);
  }

  // 1. Imports
  add("import React, { useState, useMemo } from 'react';", "import React, { useState, useMemo } from 'react';");
  add("import UserAvatar from './components/UserAvatar';", "import UserAvatar from './components/UserAvatar';");
  add("import { useNotesStore } from './store/useNotesStore';", "import { useNotesStore } from './store/useNotesStore';");
  add("import {", "import {");
  add("  PenTool, Search, ChevronRight, Mic, BookOpen,", "  PenTool, Search, ChevronRight, Mic, BookOpen,");
  add("  FolderArchive, Folder, X, SearchX, Plus", "  FolderArchive, Folder, X, SearchX, Plus");
  add("} from 'lucide-react';", "} from 'lucide-react';");
  add("", "");

  // 2. Component Declaration
  add("export default function NotesMainDarkMode({ setActiveTab }) {", "export default function NotesMainLightMode({ setActiveTab }) {");
  add("  const notes = useNotesStore((s) => s.notes);", "  const notes = useNotesStore((s) => s.notes);");
  add("  const setActiveNoteId = useNotesStore((s) => s.setActiveNoteId);", "  const setActiveNoteId = useNotesStore((s) => s.setActiveNoteId);");
  add("  const [searchQuery, setSearchQuery] = useState('');", "  const [searchQuery, setSearchQuery] = useState('');");
  add("  const [activeFilter, setActiveFilter] = useState('all');", "  const [activeFilter, setActiveFilter] = useState('all');");
  add("  const [isArchiveOpen, setIsArchiveOpen] = useState(false);", "  const [isArchiveOpen, setIsArchiveOpen] = useState(false);");
  add("", "");

  // 3. Helper: Milestone Progress Calculation
  add("  const getMilestoneProgress = (note) => {", "  const getMilestoneProgress = (note) => {");
  add("    const ms = Array.isArray(note.milestones) ? note.milestones : (Array.isArray(note.checklist) ? note.checklist : []);", "    const ms = Array.isArray(note.milestones) ? note.milestones : (Array.isArray(note.checklist) ? note.checklist : []);");
  add("    if (ms.length === 0) return null;", "    if (ms.length === 0) return null挑戦;".replace('挑戦;', ''));
  add("    const done = ms.filter((m) => m.completed).length;", "    const done = ms.filter((m) => m.completed).length;");
  add("    return `${done}/${ms.length} Done`;", "    return `${done}/${ms.length} Done`;");
  add("  };", "  };");
  add("", "");

  // 4. Dynamic Counts Calculation
  add("  const totalCount = notes.length;", "  const totalCount = notes.length;");
  add("  const pinnedCount = notes.filter((n) => n.isPinned).length;", "  const pinnedCount = notes.filter((n) => n.isPinned).length;");
  add("  const quickCount = notes.filter((n) => n.type === 'quick' || (!n.type && ['Spiritual', 'Daily', 'Work'].includes(n.category))).length;", "  const quickCount = notes.filter((n) => n.type === 'quick' || (!n.type && ['Spiritual', 'Daily', 'Work'].includes(n.category))).length;");
  add("  const longCount = notes.filter((n) => n.type === 'long' || (!n.type && !['Spiritual', 'Daily', 'Work'].includes(n.category))).length;", "  const longCount = notes.filter((n) => n.type === 'long' || (!n.type && !['Spiritual', 'Daily', 'Work'].includes(n.category))).length;");
  add("", "");

  // 5. Filtering Logic
  add("  const filteredNotes = useMemo(() => {", "  const filteredNotes = useMemo(() => {");
  add("    return notes.filter((note) => {", "    return notes.filter((note) => {");
  add("      if (activeFilter === 'pinned' && !note.isPinned) return false;", "      if (activeFilter === 'pinned' && !note.isPinned) return false;");
  add("      if (activeFilter === 'quick' && !(note.type === 'quick' || (!note.type && ['Spiritual', 'Daily', 'Work'].includes(note.category)))) return false;", "      if (activeFilter === 'quick' && !(note.type === 'quick' || (!note.type && ['Spiritual', 'Daily', 'Work'].includes(note.category)))) return false;");
  add("      if (activeFilter === 'long' && !(note.type === 'long' || (!note.type && !['Spiritual', 'Daily', 'Work'].includes(note.category)))) return false;", "      if (activeFilter === 'long' && !(note.type === 'long' || (!note.type && !['Spiritual', 'Daily', 'Work'].includes(note.category)))) return false;");
  add("      if (!searchQuery.trim()) return true;", "      if (!searchQuery.trim()) return true;");
  add("      const q = searchQuery.toLowerCase().trim();", "      const q = searchQuery.toLowerCase().trim();");
  add("      const titleMatch = (note.title || '').toLowerCase().includes(q);", "      const titleMatch = (note.title || '').toLowerCase().includes(q);");
  add("      const bodyMatch = (note.body || note.content || '').toLowerCase().includes(q);", "      const bodyMatch = (note.body || note.content || '').toLowerCase().includes(q);");
  add("      const tagMatch = Array.isArray(note.tags) && note.tags.some((t) => t.toLowerCase().includes(q));", "      const tagMatch = Array.isArray(note.tags) && note.tags.some((t) => t.toLowerCase().includes(q));");
  add("      const catMatch = (note.category || '').toLowerCase().includes(q);", "      const catMatch = (note.category || '').toLowerCase().includes(q);");
  add("      return titleMatch || bodyMatch || tagMatch || catMatch;", "      return titleMatch || bodyMatch || tagMatch || catMatch;");
  add("    });", "    });");
  add("  }, [notes, searchQuery, activeFilter]);", "  }, [notes, searchQuery, activeFilter]);");
  add("", "");

  // 6. Partition Filtered Notes
  add("  const quickNotes = filteredNotes.filter((n) => n.type === 'quick' || (!n.type && ['Spiritual', 'Daily', 'Work'].includes(n.category)));", "  const quickNotes = filteredNotes.filter((n) => n.type === 'quick' || (!n.type && ['Spiritual', 'Daily', 'Work'].includes(n.category)));");
  add("  const longNotes = filteredNotes.filter((n) => n.type === 'long' || (!n.type && !['Spiritual', 'Daily', 'Work'].includes(n.category)));", "  const longNotes = filteredNotes.filter((n) => n.type === 'long' || (!n.type && !['Spiritual', 'Daily', 'Work'].includes(n.category)));");
  add("", "");

  // 7. Navigation Handler
  add("  const handleOpenNote = (note) => {", "  const handleOpenNote = (note) => {");
  add("    if (setActiveNoteId) setActiveNoteId(note.id);", "    if (setActiveNoteId) setActiveNoteId(note.id);");
  add("    const isQuick = note.type === 'quick' || (!note.type && ['Spiritual', 'Daily', 'Work'].includes(note.category));", "    const isQuick = note.type === 'quick' || (!note.type && ['Spiritual', 'Daily', 'Work'].includes(note.category));");
  add("    const target = isQuick ? 'quick_note_editor_dark_mode' : 'long_note_editor_dark_mode';", "    const target = isQuick ? 'quick_note_editor_light_mode' : 'long_note_editor_light_mode';");
  add("    if (setActiveTab) setActiveTab(target);", "    if (setActiveTab) setActiveTab(target);");
  add("  };", "  };");
  add("", "");

  // 8. Render Shell
  add("  return (", "  return (");
  add("    <div className=\"min-h-screen bg-slate-950 font-sans pb-36\">", "    <div className=\"min-h-screen bg-slate-50 font-sans pb-36\">");
  add("      {/* 1. TOP HEADER */}", "      {/* 1. TOP HEADER */}");
  add("      <div className=\"sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2\">", "      <div className=\"sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2\">");
  add("        <div className=\"flex items-center gap-3\">", "        <div className=\"flex items-center gap-3\">");
  add("          <div className=\"w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30\">", "          <div className=\"w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30\">");
  add("            <PenTool className=\"w-5 h-5 text-white\"/>", "            <PenTool className=\"w-5 h-5 text-white\"/>");
  add("          </div>", "          </div>");
  add("          <h1 className=\"text-base font-bold text-white tracking-tight\">Notes Dashboard</h1>", "          <h1 className=\"text-base font-bold text-slate-900 tracking-tight\">Notes Dashboard</h1>");
  add("        </div>", "        </div>");
  add("        <UserAvatar setActiveTab={setActiveTab} />", "        <UserAvatar setActiveTab={setActiveTab} />");
  add("      </div>", "      </div>");
  add("", "");

  // Search & Filter Pills
  add("      {/* 2. SEARCH BAR & HORIZONTAL FILTER CHIPS */}", "      {/* 2. SEARCH BAR & HORIZONTAL FILTER CHIPS */}");
  add("      <div className=\"px-5 mt-6 mb-3\">", "      <div className=\"px-5 mt-6 mb-3\">");
  add("        <div className=\"w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "        <div className=\"w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("          <Search className=\"w-4 h-4 text-slate-500 shrink-0\"/>", "          <Search className=\"w-4 h-4 text-slate-400 shrink-0\"/>");
  add("          <input", "          <input");
  add("            type=\"text\"", "            type=\"text\"");
  add("            value={searchQuery}", "            value={searchQuery}");
  add("            onChange={(e) => setSearchQuery(e.target.value)}", "            onChange={(e) => setSearchQuery(e.target.value)}");
  add("            placeholder=\"Search notes, tags, or voice memos...\"", "            placeholder=\"Search notes, tags, or voice memos...\"");
  add("            className=\"w-full bg-transparent text-xs font-normal text-white focus:outline-none placeholder-slate-500\"", "            className=\"w-full bg-transparent text-xs font-normal text-slate-900 focus:outline-none placeholder-slate-400\"");
  add("          />", "          />");
  add("          {searchQuery && (", "          {searchQuery && (");
  add("            <button onClick={() => setSearchQuery('')} className=\"text-slate-400 hover:text-white\">", "            <button onClick={() => setSearchQuery('')} className=\"text-slate-400 hover:text-slate-600\">");
  add("              <X className=\"w-3.5 h-3.5\"/>", "              <X className=\"w-3.5 h-3.5\"/>");
  add("            </button>", "            </button>");
  add("          )}", "          )}");
  add("        </div>", "        </div>");
  add("      </div>", "      </div>");
  add("", "");

  // Filter Chips Row
  add("      <div className=\"flex items-center gap-2 px-5 mb-5 overflow-x-auto scrollbar-none\">", "      <div className=\"flex items-center gap-2 px-5 mb-5 overflow-x-auto scrollbar-none\">");
  add("        <button onClick={() => setActiveFilter('all')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'all' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>", "        <button onClick={() => setActiveFilter('all')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'all' ? 'bg-primary text-white shadow-primary/20' : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 hover:bg-slate-50'}`}>");
  add("          All Notes ({totalCount})", "          All Notes ({totalCount})");
  add("        </button>", "        </button>");
  add("        <button onClick={() => setActiveFilter('pinned')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'pinned' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>", "        <button onClick={() => setActiveFilter('pinned')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'pinned' ? 'bg-primary text-white shadow-primary/20' : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 hover:bg-slate-50'}`}>");
  add("          📌 Pinned ({pinnedCount})", "          📌 Pinned ({pinnedCount})");
  add("        </button>", "        </button>");
  add("        <button onClick={() => setActiveFilter('quick')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'quick' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>", "        <button onClick={() => setActiveFilter('quick')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'quick' ? 'bg-primary text-white shadow-primary/20' : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 hover:bg-slate-50'}`}>");
  add("          ⚡ Quick Notes ({quickCount})", "          ⚡ Quick Notes ({quickCount})");
  add("        </button>", "        </button>");
  add("        <button onClick={() => setActiveFilter('long')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'long' ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900/85 border border-white/10 text-slate-400 hover:bg-slate-800'}`}>", "        <button onClick={() => setActiveFilter('long')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${activeFilter === 'long' ? 'bg-primary text-white shadow-primary/20' : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 hover:bg-slate-50'}`}>");
  add("          📖 Long Notes ({longCount})", "          📖 Long Notes ({longCount})");
  add("        </button>", "        </button>");
  add("      </div>", "      </div>");
  add("", "");

  // Empty State vs Content
  add("      {filteredNotes.length === 0 ? (", "      {filteredNotes.length === 0 ? (");
  add("        <div className=\"mx-5 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-slate-900/60 border-white/10 shadow-sm\">", "        <div className=\"mx-5 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-sm\">");
  add("          <div className=\"w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary\">", "          <div className=\"w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary\">");
  add("            <SearchX className=\"w-8 h-8\"/>", "            <SearchX className=\"w-8 h-8\"/>");
  add("          </div>", "          </div>");
  add("          <h3 className=\"text-base font-semibold mb-1 text-white\">", "          <h3 className=\"text-base font-semibold mb-1 text-slate-900\">");
  add("            {notes.length === 0 ? 'No Notes Yet' : 'No Notes Found'}", "            {notes.length === 0 ? 'No Notes Yet' : 'No Notes Found'}");
  add("          </h3>", "          </h3>");
  add("          <p className=\"text-xs max-w-[240px] leading-relaxed mb-5 text-slate-400\">", "          <p className=\"text-xs max-w-[240px] leading-relaxed mb-5 text-slate-600\">");
  add("            {notes.length === 0 ? 'Your mindful sanctuary is ready. Tap New Note to create your first reflection.' : 'No notes match your filter or search query. Try another keyword or reset the filter.'}", "            {notes.length === 0 ? 'Your mindful sanctuary is ready. Tap New Note to create your first reflection.' : 'No notes match your filter or search query. Try another keyword or reset the filter.'}");
  add("          </p>", "          </p>");
  add("          <button", "          <button");
  add("            onClick={() => { if (notes.length === 0) { if (setActiveTab) setActiveTab('quick_note_editor_dark_mode'); } else { setSearchQuery(''); setActiveFilter('all'); } }}", "            onClick={() => { if (notes.length === 0) { if (setActiveTab) setActiveTab('quick_note_editor_light_mode'); } else { setSearchQuery(''); setActiveFilter('all'); } }}");
  add("            className=\"px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none\"", "            className=\"px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none\"");
  add("          >", "          >");
  add("            {notes.length === 0 ? 'Create First Note' : 'Clear Search Filter'}", "            {notes.length === 0 ? 'Create First Note' : 'Clear Search Filter'}");
  add("          </button>", "          </button>");
  add("        </div>", "        </div>");
  add("      ) : (", "      ) : (");
  add("        <>", "        <>");

  // Quick Notes Section
  add("          {/* 3. QUICK NOTES SECTION */}", "          {/* 3. QUICK NOTES SECTION */}");
  add("          {activeFilter !== 'long' && quickNotes.length > 0 && (", "          {activeFilter !== 'long' && quickNotes.length > 0 && (");
  add("            <>", "            <>");
  add("              <div className=\"flex items-center justify-between px-5 mb-3\">", "              <div className=\"flex items-center justify-between px-5 mb-3\">");
  add("                <div className=\"flex items-center gap-1.5\">", "                <div className=\"flex items-center gap-1.5\">");
  add("                  <span className=\"text-amber-400\">⚡</span>", "                  <span className=\"text-amber-500\">⚡</span>");
  add("                  <h3 className=\"text-xs font-bold text-white uppercase tracking-wider\">Quick Notes</h3>", "                  <h3 className=\"text-xs font-bold text-slate-900 uppercase tracking-wider\">Quick Notes</h3>");
  add("                  <span className=\"text-xs text-slate-500\">• Fleeting</span>", "                  <span className=\"text-xs text-slate-400\">• Fleeting</span>");
  add("                </div>", "                </div>");
  add("                <button onClick={() => setActiveFilter('quick')} className=\"text-xs font-semibold text-primary hover:text-primary flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none\">", "                <button onClick={() => setActiveFilter('quick')} className=\"text-xs font-semibold text-primary hover:text-primary flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none\">");
  add("                  See all ({quickCount}) <ChevronRight className=\"w-3.5 h-3.5\"/>", "                  See all ({quickCount}) <ChevronRight className=\"w-3.5 h-3.5\"/>");
  add("                </button>", "                </button>");
  add("              </div>", "              </div>");
  add("", "");

  // Featured First Quick Note (dynamically rendered from quickNotes[0])
  add("              {quickNotes[0] && (", "              {quickNotes[0] && (");
  add("                <div onClick={() => handleOpenNote(quickNotes[0])} className=\"block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-2 bg-black/40 hover:bg-slate-800/70 backdrop-blur-xl border border-white/10 shadow-xl\">", "                <div onClick={() => handleOpenNote(quickNotes[0])} className=\"block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-2 bg-white/80 hover:bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("                  <div className=\"flex items-center justify-between\">", "                  <div className=\"flex items-center justify-between\">");
  add("                    <div className=\"flex items-center gap-2\">", "                    <div className=\"flex items-center gap-2\">");
  add("                      {(quickNotes[0].category || (quickNotes[0].tags && quickNotes[0].tags[0])) && (", "                      {(quickNotes[0].category || (quickNotes[0].tags && quickNotes[0].tags[0])) && (");
  add("                        <span className=\"px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold\">#{quickNotes[0].category || quickNotes[0].tags[0]}</span>", "                        <span className=\"px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold\">#{quickNotes[0].category || quickNotes[0].tags[0]}</span>");
  add("                      )}", "                      )}");
  add("                      {quickNotes[0].isPinned && <span className=\"text-[10px] font-semibold text-primary bg-primary/20 px-2 py-0.5 rounded-md\">📌 Pinned</span>}", "                      {quickNotes[0].isPinned && <span className=\"text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md\">📌 Pinned</span>}");
  add("                    </div>", "                    </div>");
  add("                    <span className=\"text-[10px] font-normal text-slate-500\">{quickNotes[0].savedAt || quickNotes[0].date || ''}</span>", "                    <span className=\"text-[10px] font-normal text-slate-400\">{quickNotes[0].savedAt || quickNotes[0].date || ''}</span>");
  add("                  </div>", "                  </div>");
  add("                  <h4 className=\"text-sm font-semibold text-white truncate\">{quickNotes[0].title}</h4>", "                  <h4 className=\"text-sm font-semibold text-slate-900 truncate\">{quickNotes[0].title}</h4>");
  add("                  {quickNotes[0].body && <p className=\"text-xs font-medium text-slate-400 italic line-clamp-2\">{quickNotes[0].body}</p>}", "                  {quickNotes[0].body && <p className=\"text-xs font-medium text-slate-500 italic line-clamp-2\">{quickNotes[0].body}</p>}");
  add("                  <div className=\"flex items-center justify-between pt-2 border-t border-slate-800/50\">", "                  <div className=\"flex items-center justify-between pt-2 border-t border-slate-100\">");
  add("                    <span className=\"text-[10px] font-semibold text-teal-400\">{quickNotes[0].footer || getMilestoneProgress(quickNotes[0]) || (quickNotes[0].category ? `🌱 ${quickNotes[0].category}` : '🌱 Reflection')}</span>", "                    <span className=\"text-[10px] font-semibold text-teal-600\">{quickNotes[0].footer || getMilestoneProgress(quickNotes[0]) || (quickNotes[0].category ? `🌱 ${quickNotes[0].category}` : '🌱 Reflection')}</span>");
  add("                    <PenTool className=\"w-3.5 h-3.5 text-slate-500\"/>", "                    <PenTool className=\"w-3.5 h-3.5 text-slate-400\"/>");
  add("                  </div>", "                  </div>");
  add("                </div>", "                </div>");
  add("              )}", "              )}");
  add("", "");

  // Grid for remaining quick notes dynamically mapped
  add("              {quickNotes.length > 1 && (", "              {quickNotes.length > 1 && (");
  add("                <div className=\"grid grid-cols-2 gap-3 mx-5 mb-6\">", "                <div className=\"grid grid-cols-2 gap-3 mx-5 mb-6\">");
  add("                  {quickNotes.slice(1).map((note) => {", "                  {quickNotes.slice(1).map((note) => {");
  add("                    const progress = getMilestoneProgress(note);", "                    const progress = getMilestoneProgress(note);");
  add("                    const ms = Array.isArray(note.milestones) ? note.milestones.slice(0, 3) : [];", "                    const ms = Array.isArray(note.milestones) ? note.milestones.slice(0, 3) : [];");
  add("                    return (", "                    return (");
  add("                      <div key={note.id} onClick={() => handleOpenNote(note)} className=\"p-3.5 rounded-2xl space-y-2 transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-black/40 hover:bg-slate-800/70 backdrop-blur-xl border border-white/10 shadow-xl\">", "                      <div key={note.id} onClick={() => handleOpenNote(note)} className=\"p-3.5 rounded-2xl space-y-2 transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/80 hover:bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("                        {(note.category || (note.tags && note.tags[0])) && (", "                        {(note.category || (note.tags && note.tags[0])) && (");
  add("                          <span className=\"text-[10px] font-semibold text-slate-400 bg-slate-800/50 px-1.5 py-0.5 rounded\">#{note.category || note.tags[0]}</span>", "                          <span className=\"text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded\">#{note.category || note.tags[0]}</span>");
  add("                        )}", "                        )}");
  add("                        <h4 className=\"text-xs font-semibold text-white truncate\">{note.title}</h4>", "                        <h4 className=\"text-xs font-semibold text-slate-900 truncate\">{note.title}</h4>");
  add("                        {ms.length > 0 ? (", "                        {ms.length > 0 ? (");
  add("                          <div className=\"flex flex-col gap-1 text-[11px] font-normal text-slate-400\">", "                          <div className=\"flex flex-col gap-1 text-[11px] font-normal text-slate-500\">");
  add("                            {ms.map((m) => (", "                            {ms.map((m) => (");
  add("                              <span key={m.id || m.text} className={m.completed ? 'line-through text-slate-500' : 'text-slate-300'}>", "                              <span key={m.id || m.text} className={m.completed ? 'line-through text-slate-400' : 'text-slate-700'}>");
  add("                                {m.completed ? '✔ ' : '⚪ '}{m.text}", "                                {m.completed ? '✔ ' : '⚪ '}{m.text}");
  add("                              </span>", "                              </span>");
  add("                            ))}", "                            ))}");
  add("                          </div>", "                          </div>");
  add("                        ) : (", "                        ) : (");
  add("                          <p className=\"text-[11px] font-normal text-slate-400 line-clamp-3\">{note.body}</p>", "                          <p className=\"text-[11px] font-normal text-slate-500 line-clamp-3\">{note.body}</p>");
  add("                        )}", "                        )}");
  add("                        <div className=\"flex items-center justify-between pt-1\">", "                        <div className=\"flex items-center justify-between pt-1\">");
  add("                          <span className=\"text-[10px] font-medium text-slate-500\">{note.savedAt || note.date || ''}</span>", "                          <span className=\"text-[10px] font-medium text-slate-400\">{note.savedAt || note.date || ''}</span>");
  add("                          {progress ? (", "                          {progress ? (");
  add("                            <span className=\"text-[10px] font-bold text-teal-400\">{progress}</span>", "                            <span className=\"text-[10px] font-bold text-teal-600\">{progress}</span>");
  add("                          ) : (note.hasAudio ? (", "                          ) : (note.hasAudio ? (");
  add("                            <Mic className=\"w-3.5 h-3.5 text-violet-400\"/>", "                            <Mic className=\"w-3.5 h-3.5 text-violet-600\"/>");
  add("                          ) : null)}", "                          ) : null)}");
  add("                        </div>", "                        </div>");
  add("                      </div>", "                      </div>");
  add("                    );", "                    );");
  add("                  })}", "                  })}");
  add("                </div>", "                </div>");
  add("              )}", "              )}");
  add("            </>", "            </>");
  add("          )}", "          )}");
  add("", "");

  // Long Notes Section dynamically mapped
  add("          {/* 4. LONG NOTES SECTION */}", "          {/* 4. LONG NOTES SECTION */}");
  add("          {activeFilter !== 'quick' && longNotes.length > 0 && (", "          {activeFilter !== 'quick' && longNotes.length > 0 && (");
  add("            <>", "            <>");
  add("              <div className=\"flex items-center justify-between px-5 mb-3\">", "              <div className=\"flex items-center justify-between px-5 mb-3\">");
  add("                <div className=\"flex items-center gap-1.5\">", "                <div className=\"flex items-center gap-1.5\">");
  add("                  <BookOpen className=\"w-4 h-4 text-primary\"/>", "                  <BookOpen className=\"w-4 h-4 text-primary\"/>");
  add("                  <h3 className=\"text-xs font-bold text-white uppercase tracking-wider\">Long Notes</h3>", "                  <h3 className=\"text-xs font-bold text-slate-900 uppercase tracking-wider\">Long Notes</h3>");
  add("                  <span className=\"text-xs text-slate-500\">• Journal & Studies</span>", "                  <span className=\"text-xs text-slate-400\">• Journal & Studies</span>");
  add("                </div>", "                </div>");
  add("                <span className=\"text-xs font-medium text-slate-500\">{longNotes.length} Total</span>", "                <span className=\"text-xs font-medium text-slate-500\">{longNotes.length} Total</span>");
  add("              </div>", "              </div>");
  add("", "");

  // Map each long note directly from the store
  add("              {longNotes.map((note) => {", "              {longNotes.map((note) => {");
  add("                const imgs = Array.isArray(note.attachments) ? note.attachments.filter((a) => a.type === 'image' || a.url) : [];", "                const imgs = Array.isArray(note.attachments) ? note.attachments.filter((a) => a.type === 'image' || a.url) : [];");
  add("                const hasVoice = note.hasAudio || (Array.isArray(note.attachments) && note.attachments.some((a) => a.type === 'audio'));", "                const hasVoice = note.hasAudio || (Array.isArray(note.attachments) && note.attachments.some((a) => a.type === 'audio'));");
  add("                const noteTags = Array.isArray(note.tags) ? note.tags : [];", "                const noteTags = Array.isArray(note.tags) ? note.tags : [];");
  add("                return (", "                return (");
  add("                  <div key={note.id} onClick={() => handleOpenNote(note)} className=\"block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-3 bg-black/40 hover:bg-slate-800/70 backdrop-blur-xl border border-white/10 shadow-xl\">", "                  <div key={note.id} onClick={() => handleOpenNote(note)} className=\"block mx-5 mb-3 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-3 bg-white/80 hover:bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("                    <div className=\"flex items-center gap-2\">", "                    <div className=\"flex items-center gap-2\">");
  add("                      {(note.category || noteTags[0]) && (", "                      {(note.category || noteTags[0]) && (");
  add("                        <span className=\"px-2 py-0.5 rounded-md bg-violet-950/40 text-violet-300 text-[10px] font-semibold\">{note.category || noteTags[0]}</span>", "                        <span className=\"px-2 py-0.5 rounded-md bg-violet-50 text-violet-600 text-[10px] font-semibold\">{note.category || noteTags[0]}</span>");
  add("                      )}", "                      )}");
  add("                      {note.isPinned && <span className=\"text-[10px] font-semibold text-primary bg-primary/20 px-2 py-0.5 rounded-md\">📌 Pinned</span>}", "                      {note.isPinned && <span className=\"text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md\">📌 Pinned</span>}");
  add("                    </div>", "                    </div>");
  add("                    <h4 className=\"text-sm font-semibold text-white truncate\">{note.title}</h4>", "                    <h4 className=\"text-sm font-semibold text-slate-900 truncate\">{note.title}</h4>");
  add("                    <p className=\"text-xs font-normal text-slate-400 line-clamp-2\">{note.body}</p>", "                    <p className=\"text-xs font-normal text-slate-500 line-clamp-2\">{note.body}</p>");
  add("                    {hasVoice && imgs.length > 0 && (", "                    {hasVoice && imgs.length > 0 && (");
  add("                      <div className=\"flex gap-2\">", "                      <div className=\"flex gap-2\">");
  add("                        <div className=\"flex-1 h-12 rounded-xl flex items-center px-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "                        <div className=\"flex-1 h-12 rounded-xl flex items-center px-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("                          <Mic className=\"w-4 h-4 text-primary mr-2\"/>", "                          <Mic className=\"w-4 h-4 text-primary mr-2\"/>");
  add("                          <span className=\"text-[10px] font-semibold text-slate-300\">Voice Note</span>", "                          <span className=\"text-[10px] font-semibold text-slate-600\">Voice Note</span>");
  add("                        </div>", "                        </div>");
  add("                        <div className=\"w-12 h-12 rounded-xl bg-slate-800 overflow-hidden shrink-0\">", "                        <div className=\"w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shrink-0\">");
  add("                          <img src={imgs[0].url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200'} alt={imgs[0].name || 'preview'} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = \"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23334155'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='11'>Note</text></svg>\"; }} className=\"w-full h-full object-cover\"/>", "                          <img src={imgs[0].url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200'} alt={imgs[0].name || 'preview'} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = \"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e2e8f0'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-size='11'>Note</text></svg>\"; }} className=\"w-full h-full object-cover\"/>");
  add("                        </div>", "                        </div>");
  add("                      </div>", "                      </div>");
  add("                    )}", "                    )}");
  add("                    {!hasVoice && imgs.length >= 2 && (", "                    {!hasVoice && imgs.length >= 2 && (");
  add("                      <div className=\"grid grid-cols-2 gap-2\">", "                      <div className=\"grid grid-cols-2 gap-2\">");
  add("                        <div className=\"h-16 rounded-xl bg-slate-800 overflow-hidden relative\">", "                        <div className=\"h-16 rounded-xl bg-slate-200 overflow-hidden relative\">");
  add("                          <img src={imgs[0].url || 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=300'} alt=\"calligraphy\" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = \"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%231e293b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='13'>Quranic Script</text></svg>\"; }} className=\"w-full h-full object-cover\"/>", "                          <img src={imgs[0].url || 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=300'} alt=\"calligraphy\" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = \"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='13'>Quranic Script</text></svg>\"; }} className=\"w-full h-full object-cover\"/>");
  add("                        </div>", "                        </div>");
  add("                        <div className=\"h-16 rounded-xl bg-slate-800 overflow-hidden relative\">", "                        <div className=\"h-16 rounded-xl bg-slate-200 overflow-hidden relative\">");
  add("                          <img src={imgs[1].url || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300'} alt=\"window\" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = \"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%231e293b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='13'>Sanctuary</text></svg>\"; }} className=\"w-full h-full object-cover\"/>", "                          <img src={imgs[1].url || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300'} alt=\"window\" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = \"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='13'>Sanctuary</text></svg>\"; }} className=\"w-full h-full object-cover\"/>");
  add("                        </div>", "                        </div>");
  add("                      </div>", "                      </div>");
  add("                    )}", "                    )}");
  add("                    {noteTags.length > 0 && imgs.length === 0 && (", "                    {noteTags.length > 0 && imgs.length === 0 && (");
  add("                      <div className=\"flex flex-wrap gap-2 pt-1\">", "                      <div className=\"flex flex-wrap gap-2 pt-1\">");
  add("                        {noteTags.map((tag) => (", "                        {noteTags.map((tag) => (");
  add("                          <span key={tag} className=\"px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-semibold flex items-center gap-1\">{tag}</span>", "                          <span key={tag} className=\"px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-[10px] font-semibold flex items-center gap-1 border border-slate-100\">{tag}</span>");
  add("                        ))}", "                        ))}");
  add("                      </div>", "                      </div>");
  add("                    )}", "                    )}");
  add("                    <div className=\"flex items-center justify-between pt-2 border-t border-slate-800/40\">", "                    <div className=\"flex items-center justify-between pt-2 border-t border-slate-100\">");
  add("                      <span className=\"text-[10px] font-medium text-slate-500\">{note.savedAt || note.date || 'Recently'}{note.readTime ? ` • ${note.readTime}` : ''}</span>", "                      <span className=\"text-[10px] font-medium text-slate-400\">{note.savedAt || note.date || 'Recently'}{note.readTime ? ` • ${note.readTime}` : ''}</span>");
  add("                      <button onClick={(e) => { e.stopPropagation(); handleOpenNote(note); }} className=\"text-[10px] font-bold text-primary flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none\">Read <ChevronRight className=\"w-3 h-3\"/></button>", "                      <button onClick={(e) => { e.stopPropagation(); handleOpenNote(note); }} className=\"text-[10px] font-bold text-primary flex items-center gap-0.5 active:scale-95 transition-all cursor-pointer select-none\">Read <ChevronRight className=\"w-3 h-3\"/></button>");
  add("                    </div>", "                    </div>");
  add("                  </div>", "                  </div>");
  add("                );", "                );");
  add("              })}", "              })}");
  add("            </>", "            </>");
  add("          )}", "          )}");
  add("        </>", "        </>");
  add("      )}", "      )}");
  add("", "");

  // 5. Standardized Archive Container
  add("      {/* 5. STANDARDIZED ARCHIVE EMPTY STATE CONTAINER */}", "      {/* 5. STANDARDIZED ARCHIVE EMPTY STATE CONTAINER */}");
  add("      <div className=\"block mx-5 mb-8 p-6 rounded-3xl text-center space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "      <div className=\"block mx-5 mb-8 p-6 rounded-3xl text-center space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("        <div className=\"block w-12 h-12 rounded-2xl text-primary flex items-center justify-center mx-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl\">", "        <div className=\"block w-12 h-12 rounded-2xl text-primary flex items-center justify-center mx-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg\">");
  add("          <FolderArchive className=\"w-6 h-6 text-primary\"/>", "          <FolderArchive className=\"w-6 h-6 text-primary\"/>");
  add("        </div>", "        </div>");
  add("        <div>", "        <div>");
  add("          <h4 className=\"text-sm font-bold text-white\">No archived notes yet</h4>", "          <h4 className=\"text-sm font-bold text-slate-900\">No archived notes yet</h4>");
  add("          <p className=\"text-xs font-normal text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed\">", "          <p className=\"text-xs font-normal text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed\">");
  add("            Keep writing! Your mindful library expands and grows with every gentle thought, ayah reflection, and daily goal.", "            Keep writing! Your mindful library expands and grows with every gentle thought, ayah reflection, and daily goal.");
  add("          </p>", "          </p>");
  add("        </div>", "        </div>");
  add("        <button onClick={() => setIsArchiveOpen(true)} className=\"px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-primary inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none shadow-2xs\">", "        <button onClick={() => setIsArchiveOpen(true)} className=\"px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-primary inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none shadow-2xs\">");
  add("          <Folder className=\"w-3.5 h-3.5 text-primary\"/>", "          <Folder className=\"w-3.5 h-3.5 text-primary\"/>");
  add("          View Archive Drawer", "          View Archive Drawer");
  add("        </button>", "        </button>");
  add("      </div>", "      </div>");
  add("", "");

  // 6. Floating Action Button
  add("      {/* 6. PREMIUM EXTENDED FLOATING NEW NOTE FAB */}", "      {/* 6. PREMIUM EXTENDED FLOATING NEW NOTE FAB */}");
  add("      <div className=\"fixed bottom-24 right-5 z-50\">", "      <div className=\"fixed bottom-24 right-5 z-50\">");
  add("        <button", "        <button");
  add("          onClick={() => setActiveTab && setActiveTab('quick_note_editor_dark_mode')}", "          onClick={() => setActiveTab && setActiveTab('quick_note_editor_light_mode')}");
  add("          className=\"group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-500 text-white text-[14px] font-semibold tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-out border border-white/20 cursor-pointer select-none\"", "          className=\"group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-500 text-white text-[14px] font-semibold tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-out border border-white/20 cursor-pointer select-none\"");
  add("        >", "        >");
  add("          <PenTool className=\"w-4 h-4 stroke-[2.2] text-white transition-transform duration-200 group-hover:rotate-6\"/>", "          <PenTool className=\"w-4 h-4 stroke-[2.2] text-white transition-transform duration-200 group-hover:rotate-6\"/>");
  add("          <span>New Note</span>", "          <span>New Note</span>");
  add("        </button>", "        </button>");
  add("      </div>", "      </div>");
  add("", "");

  // 7. Interactive Archive Drawer Modal
  add("      {/* 7. INTERACTIVE ARCHIVE DRAWER MODAL */}", "      {/* 7. INTERACTIVE ARCHIVE DRAWER MODAL */}");
  add("      {isArchiveOpen && (", "      {isArchiveOpen && (");
  add("        <div className=\"fixed inset-0 z-[100] flex items-end justify-center\">", "        <div className=\"fixed inset-0 z-[100] flex items-end justify-center\">");
  add("          <div onClick={() => setIsArchiveOpen(false)} className=\"fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer\" />", "          <div onClick={() => setIsArchiveOpen(false)} className=\"fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer\" />");
  add("          <div className=\"relative z-10 w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200\">", "          <div className=\"relative z-10 w-full max-w-md bg-white border-t border-slate-200 rounded-t-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200\">");
  add("            <div className=\"w-10 h-1 bg-slate-700/80 rounded-full mx-auto mb-2\" />", "            <div className=\"w-10 h-1 bg-slate-300 rounded-full mx-auto mb-2\" />");
  add("            <div className=\"flex items-center justify-between\">", "            <div className=\"flex items-center justify-between\">");
  add("              <div className=\"flex items-center gap-2\">", "              <div className=\"flex items-center gap-2\">");
  add("                <FolderArchive className=\"w-5 h-5 text-primary\"/>", "                <FolderArchive className=\"w-5 h-5 text-primary\"/>");
  add("                <h3 className=\"text-base font-bold text-white\">Archived Notes & Journals</h3>", "                <h3 className=\"text-base font-bold text-slate-900\">Archived Notes & Journals</h3>");
  add("              </div>", "              </div>");
  add("              <button onClick={() => setIsArchiveOpen(false)} className=\"p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors\">", "              <button onClick={() => setIsArchiveOpen(false)} className=\"p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors\">");
  add("                <X className=\"w-4 h-4\"/>", "                <X className=\"w-4 h-4\"/>");
  add("              </button>", "              </button>");
  add("            </div>", "            </div>");
  add("            <div className=\"py-6 text-center space-y-3\">", "            <div className=\"py-6 text-center space-y-3\">");
  add("              <div className=\"w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400\">", "              <div className=\"w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500\">");
  add("                <FolderArchive className=\"w-6 h-6 text-primary/70\"/>", "                <FolderArchive className=\"w-6 h-6 text-primary/70\"/>");
  add("              </div>", "              </div>");
  add("              <p className=\"text-xs text-slate-400 max-w-xs mx-auto leading-relaxed\">", "              <p className=\"text-xs text-slate-600 max-w-xs mx-auto leading-relaxed\">");
  add("                No archived notes currently. Notes you archive from the editor will be safely preserved here away from your active dashboard.", "                No archived notes currently. Notes you archive from the editor will be safely preserved here away from your active dashboard.");
  add("              </p>", "              </p>");
  add("            </div>", "            </div>");
  add("            <button onClick={() => setIsArchiveOpen(false)} className=\"w-full py-3 rounded-2xl bg-primary text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer\">", "            <button onClick={() => setIsArchiveOpen(false)} className=\"w-full py-3 rounded-2xl bg-primary text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer\">");
  add("              Back to Notes Dashboard", "              Back to Notes Dashboard");
  add("            </button>", "            </button>");
  add("          </div>", "          </div>");
  add("        </div>", "        </div>");
  add("      )}", "      )}");
  add("", "");
  add("    </div>", "    </div>");
  add("  );", "  );");
  add("}", "}");

  console.log(`Dark lines: ${darkLines.length}, Light lines: ${lightLines.length}`);
  if (darkLines.length !== lightLines.length) {
    throw new Error('Line count mismatch!');
  }

  fs.writeFileSync('src/NotesMainDarkMode.jsx', darkLines.join('\n'), 'utf8');
  fs.writeFileSync('src/NotesMainLightMode.jsx', lightLines.join('\n'), 'utf8');
  console.log('Successfully generated fully dynamic NotesMainDarkMode.jsx and NotesMainLightMode.jsx with 1-to-1 parity!');
}

buildNotesMainPair();
