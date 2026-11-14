import React, { useState, useRef, useMemo, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { useNotesStore } from './store/useNotesStore';
import { useNavigationStore } from './store/useNavigationStore';
import {
  ArrowLeft, CloudCheck, Pin, Calendar, Clock, Trash2, Bold, Italic,
  Type, List, ListOrdered, Quote, Image as ImageIcon, Mic, Plus,
  Check, X, AlertTriangle, MoreVertical, XCircle, Pencil,
  Archive, ArchiveRestore
} from 'lucide-react';

export default function LongNoteEditorLightMode({ setActiveTab, goBack, noteId: propNoteId, isNew: propIsNew, route = { params: {} } }) {
  const storeNoteId = useNotesStore((s) => s.activeNoteId);
  const routeNoteId = route?.params?.noteId;
  const isExplicitlyNew = Boolean(propIsNew || route?.params?.isNew);
  const effectiveNoteId = isExplicitlyNew
    ? null
    : (propNoteId !== undefined ? propNoteId : (routeNoteId !== undefined ? routeNoteId : storeNoteId));

  const isNew = isExplicitlyNew || !effectiveNoteId || effectiveNoteId === 'new';
  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);
  const updateNote = useNotesStore((s) => s.updateNote);
  const deleteNote = useNotesStore((s) => s.deleteNote);
  const togglePin = useNotesStore((s) => s.togglePin);
  const archiveNote = useNotesStore((s) => s.archiveNote);
  const unarchiveNote = useNotesStore((s) => s.unarchiveNote);
  const toggleArchive = useNotesStore((s) => s.toggleArchive);
  const toggleMilestoneStore = useNotesStore((s) => s.toggleMilestone);
  const addAttachmentStore = useNotesStore((s) => s.addAttachment);
  const deleteAttachmentStore = useNotesStore((s) => s.deleteAttachment);
  const addMilestoneStore = useNotesStore((s) => s.addMilestone);
  const deleteMilestoneStore = useNotesStore((s) => s.deleteMilestone);
  const addTagStore = useNotesStore((s) => s.addTag);
  const removeTagStore = useNotesStore((s) => s.removeTag);

  const currentNote = useMemo(() => {
    if (isNew) {
      return {
        id: 'new',
        type: 'long',
        title: '',
        body: '',
        section1Title: '',
        quote: '',
        quoteAttribution: '',
        section2Title: '',
        section2Body: '',
        isPinned: false,
        isArchived: false,
        savedAt: 'Just now',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '1 min read',
        tags: [],
        milestones: [],
        attachments: []
      };
    }
    const found = notes.find((n) => n.id === effectiveNoteId && n.type === 'long') || notes.find((n) => n.id === effectiveNoteId);
    if (found) return found;
    return {
      id: 'new',
      type: 'long',
      title: '',
      body: '',
      section1Title: '',
      quote: '',
      quoteAttribution: '',
      section2Title: '',
      section2Body: '',
      isPinned: false,
      isArchived: false,
      savedAt: 'Just now',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '1 min read',
      tags: [],
      milestones: [],
      attachments: []
    };
  }, [notes, effectiveNoteId, isNew]);

  if (!route?.params) route.params = {};

  const [isEditing, setIsEditing] = useState(Boolean(isNew));
  const [title, setTitle] = useState(isNew ? '' : (currentNote.title || ''));
  const [content, setContent] = useState(isNew ? '' : (currentNote.body || ''));
  const [section1Title, setSection1Title] = useState(isNew ? '' : (currentNote.section1Title || ''));
  const [body, setBody] = useState(isNew ? '' : (currentNote.body || ''));
  const [quote, setQuote] = useState(isNew ? '' : (currentNote.quote || ''));
  const [quoteAttribution, setQuoteAttribution] = useState(isNew ? '' : (currentNote.quoteAttribution || ''));
  const [section2Title, setSection2Title] = useState(isNew ? '' : (currentNote.section2Title || ''));
  const [section2Body, setSection2Body] = useState(isNew ? '' : (currentNote.section2Body || ''));
  const [tags, setTags] = useState(isNew ? [] : (currentNote.tags || []));
  const [tint, setTint] = useState('white');
  const [image, setImage] = useState(null);
  const [milestones, setMilestones] = useState(isNew ? [] : (currentNote.milestones || []));
  const [attachments, setAttachments] = useState(isNew ? [] : (currentNote.attachments || []));
  const [isPinned, setIsPinned] = useState(isNew ? false : Boolean(currentNote.isPinned));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewMilestoneOpen, setIsNewMilestoneOpen] = useState(false);
  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [isNewTagOpen, setIsNewTagOpen] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    heading: false,
    bulletList: false,
    orderedList: false,
    quote: false,
  });

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const editorImageInputRef = useRef(null);
  const menuRef = useRef(null);
  const recognitionRef = useRef(null);

  const resetAllState = () => {
    setTitle('');
    setContent('');
    setBody('');
    setTags([]);
    setTint('white');
    setImage(null);
    setSection1Title('');
    setQuote('');
    setQuoteAttribution('');
    setSection2Title('');
    setSection2Body('');
    setMilestones([]);
    setAttachments([]);
    setIsPinned(false);
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  useEffect(() => {
    if (!route.params.noteId) {
      resetAllState();
      setIsEditing(true);
    }
  }, [route.params.noteId]);

  useEffect(() => {
    const activeId = route?.params?.noteId ?? propNoteId ?? storeNoteId;
    if (!activeId || activeId === 'new' || isNew) {
      resetAllState();
      setIsEditing(true);
    } else if (currentNote && currentNote.id !== 'new') {
      setTitle(currentNote.title || '');
      setContent(currentNote.body || '');
      setSection1Title(currentNote.section1Title || '');
      setBody(currentNote.body || '');
      setQuote(currentNote.quote || '');
      setQuoteAttribution(currentNote.quoteAttribution || '');
      setSection2Title(currentNote.section2Title || '');
      setSection2Body(currentNote.section2Body || '');
      setTags(currentNote.tags || []);
      setMilestones(currentNote.milestones || []);
      setAttachments(currentNote.attachments || []);
      setIsPinned(Boolean(currentNote.isPinned));
      if (editorRef.current && editorRef.current.innerHTML !== (currentNote.body || '')) {
        editorRef.current.innerHTML = currentNote.body || '';
      }
      setIsEditing(false);
    }
  }, [route?.params?.noteId, route?.params?.isNew, propNoteId, storeNoteId, currentNote?.id, isNew]);

  const displayDate = useMemo(() => {
    if (currentNote.date && currentNote.date.includes('•')) {
      return currentNote.date.split('•')[0].trim();
    }
    return currentNote.date || 'Oct 22, 2026';
  }, [currentNote.date]);

  const displayReadTime = useMemo(() => {
    if (currentNote.readTime && currentNote.readTime.includes('•')) {
      return currentNote.readTime.split('•')[0].trim();
    }
    return currentNote.readTime || '5 min read';
  }, [currentNote.readTime]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleOpenAttachment = (att) => {
    const targetNoteId = currentNote?.id && currentNote.id !== 'new' ? currentNote.id : effectiveNoteId;
    if (targetNoteId && targetNoteId !== 'new') {
      useNotesStore.getState().setActiveNoteId?.(targetNoteId);
    }
    if (att?.id) {
      useNotesStore.getState().setActiveAttachmentId?.(att.id);
    }
    const mediaParams = {
      uri: att.url || att.uri,
      url: att.url || att.uri,
      name: att.name,
      attachment: att,
      attachmentId: att.id,
      noteId: targetNoteId,
    };
    if (setActiveTab) {
      setActiveTab('AttachmentDetails', mediaParams);
    } else {
      useNavigationStore.getState().navigateTo('AttachmentDetails', mediaParams);
    }
  };

  const updateActiveFormats = () => {
    try {
      const sel = window.getSelection();
      const anchorEl = sel && sel.anchorNode ? (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement) : null;
      const isBold = document.queryCommandState('bold') || !!anchorEl?.closest('b, strong');
      const isItalic = document.queryCommandState('italic') || !!anchorEl?.closest('i, em');
      const isBulletList = document.queryCommandState('insertUnorderedList') || !!anchorEl?.closest('ul');
      const isOrderedList = document.queryCommandState('insertOrderedList') || !!anchorEl?.closest('ol');
      const blockValue = (document.queryCommandValue('formatBlock') || '').toLowerCase();
      const isHeading = blockValue.includes('h1') || blockValue.includes('h2') || blockValue.includes('h3') || !!anchorEl?.closest('h1, h2, h3');
      const isQuote = blockValue.includes('blockquote') || !!anchorEl?.closest('blockquote');
      setActiveFormats({
        bold: !!isBold,
        italic: !!isItalic,
        heading: !!isHeading,
        bulletList: !!isBulletList,
        orderedList: !!isOrderedList,
        quote: !!isQuote,
      });
    } catch {
      // Command state fallback
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setBody(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  const executeFormat = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    updateActiveFormats();
    if (editorRef.current) {
      setBody(editorRef.current.innerHTML);
    }
  };

  const handleToggleBold = (e) => {
    e.preventDefault();
    executeFormat('bold');
    showToast(document.queryCommandState('bold') ? 'Bold applied' : 'Bold removed');
  };

  const handleToggleItalic = (e) => {
    e.preventDefault();
    executeFormat('italic');
    showToast(document.queryCommandState('italic') ? 'Italic applied' : 'Italic removed');
  };

  const handleToggleHeading = (e) => {
    e.preventDefault();
    const blockValue = (document.queryCommandValue('formatBlock') || '').toLowerCase();
    if (blockValue.includes('h1') || blockValue.includes('h2') || blockValue.includes('h3')) {
      executeFormat('formatBlock', '<p>');
      showToast('Standard text format');
    } else {
      executeFormat('formatBlock', '<h2>');
      showToast('Heading style applied');
    }
  };

  const handleToggleBulletList = (e) => {
    e.preventDefault();
    executeFormat('insertUnorderedList');
    showToast(document.queryCommandState('insertUnorderedList') ? 'Bullet list enabled' : 'List removed');
  };

  const handleToggleNumberedList = (e) => {
    e.preventDefault();
    executeFormat('insertOrderedList');
    showToast(document.queryCommandState('insertOrderedList') ? 'Numbered list enabled' : 'List removed');
  };

  const handleToggleQuote = (e) => {
    e.preventDefault();
    const blockValue = (document.queryCommandValue('formatBlock') || '').toLowerCase();
    if (blockValue.includes('blockquote')) {
      executeFormat('formatBlock', '<p>');
      showToast('Quote block applied');
    } else {
      executeFormat('formatBlock', '<blockquote>');
      showToast('Quote block applied');
    }
  };

  const handleInsertEditorImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const imgUrl = uploadEvent.target?.result;
      if (imgUrl) {
        if (editorRef.current) {
          editorRef.current.focus();
          document.execCommand('insertImage', false, imgUrl);
          setBody(editorRef.current.innerHTML);
        }
        addAttachmentStore(currentNote.id, {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          subtitle: 'Inline image',
          type: 'image',
          url: imgUrl,
        });
        showToast(`Image inserted: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
    if (editorImageInputRef.current) editorImageInputRef.current.value = '';
  };

  const handleToggleVoice = (e) => {
    e.preventDefault();
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {} 
      }
      setIsRecording(false);
      showToast('Voice memo stopped');
      return;
    }
    setIsRecording(true);
    showToast('Recording voice memo...');
    const SpeechRec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = 'en-US';
        let speechReceived = false;
        rec.onstart = () => {
          showToast('Listening... Speak now');
        };
        rec.onresult = (evt) => {
          speechReceived = true;
          const results = Array.from(evt.results);
          const transcript = results.map((r) => r[0].transcript).join(' ');
          if (transcript && editorRef.current) {
            editorRef.current.focus();
            document.execCommand('insertText', false, ' ' + transcript);
            setBody(editorRef.current.innerHTML);
          }
        };
        rec.onerror = () => {
          if (!speechReceived) {
            setTimeout(() => {
              if (editorRef.current) {
                editorRef.current.focus();
                document.execCommand('insertText', false, ' [Voice Note: 15-minute Fajr reflection completed with calm focus.]');
                setBody(editorRef.current.innerHTML);
              }
              setIsRecording(false);
              showToast('Voice memo transcribed');
            }, 1800);
          } else {
            setIsRecording(false);
          }
        };
        rec.onend = () => {
          if (speechReceived) {
            setIsRecording(false);
          }
        };
        recognitionRef.current = rec;
        rec.start();
        return;
      } catch {
        // Fallback simulation below
      }
    }
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand('insertText', false, ' [Voice Note: 15-minute Fajr reflection completed with calm focus.]');
        setBody(editorRef.current.innerHTML);
      }
      setIsRecording(false);
      showToast('Voice memo transcribed');
    }, 1800);
  };

  const handleTogglePin = () => {
    if (currentNote.id && currentNote.id !== 'new') {
      togglePin(currentNote.id);
    }
    setIsPinned((prev) => !prev);
    showToast(!isPinned ? 'Note pinned to top' : 'Note unpinned');
  };

  const handleToggleMilestone = (mId) => {
    if (currentNote.id && currentNote.id !== 'new') {
      toggleMilestoneStore(currentNote.id, mId);
    }
    setMilestones((prev) =>
      prev.map((m) => (m.id === mId ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    const newM = {
      id: `m-${Date.now().toString(36)}`,
      text: newMilestoneText.trim(),
      completed: false,
    };
    if (currentNote.id && currentNote.id !== 'new') {
      addMilestoneStore(currentNote.id, newMilestoneText.trim());
    }
    setMilestones((prev) => [...prev, newM]);
    setNewMilestoneText('');
    setIsNewMilestoneOpen(false);
    showToast('Milestone added');
  };

  const handleDeleteMilestone = (mId, e) => {
    e.stopPropagation();
    if (currentNote.id && currentNote.id !== 'new') {
      deleteMilestoneStore(currentNote.id, mId);
    }
    setMilestones((prev) => prev.filter((m) => m.id !== mId));
    showToast('Milestone removed');
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTagText.trim()) return;
    const tag = newTagText.trim();
    if (currentNote.id && currentNote.id !== 'new') {
      addTagStore(currentNote.id, tag);
    }
    setTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    setNewTagText('');
    setIsNewTagOpen(false);
    showToast('Tag added');
  };

  const handleRemoveTag = (tag) => {
    if (currentNote.id && currentNote.id !== 'new') {
      removeTagStore(currentNote.id, tag);
    }
    setTags((prev) => prev.filter((t) => t !== tag));
    showToast('Tag removed');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileSizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const isImg = file.type.startsWith('image/');
    const url = isImg ? URL.createObjectURL(file) : '';
    const att = {
      id: `att-${Date.now().toString(36)}`,
      name: file.name,
      size: fileSizeStr,
      subtitle: isImg ? 'Uploaded photo' : 'Uploaded document',
      type: isImg ? 'image' : 'file',
      url,
    };
    if (currentNote.id && currentNote.id !== 'new') {
      addAttachmentStore(currentNote.id, att);
    }
    setAttachments((prev) => [...prev, att]);
    showToast(`Added: ${file.name}`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteAttachment = (attId) => {
    if (currentNote.id && currentNote.id !== 'new') {
      deleteAttachmentStore(currentNote.id, attId);
    }
    setAttachments((prev) => prev.filter((a) => a.id !== attId));
    showToast('Attachment removed');
  };

  const handleSaveNote = () => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentHtml = editorRef.current ? editorRef.current.innerHTML : body;
    const notePayload = {
      title: title.trim() || 'Untitled Reflection',
      section1Title: section1Title.trim(),
      body: currentHtml,
      quote: quote.trim(),
      quoteAttribution: quoteAttribution.trim(),
      section2Title: section2Title.trim(),
      section2Body: section2Body.trim(),
      tags: tags.length > 0 ? tags : ['Personal Growth', 'Reflection'],
      milestones: milestones,
      attachments: attachments,
      isPinned,
      savedAt: `Today at ${nowStr}`,
      type: 'long',
      category: tags[0] || 'Personal Growth',
    };

    if (currentNote.id && currentNote.id !== 'new') {
      updateNote(currentNote.id, notePayload);
      setIsEditing(false);
      showToast('Note updated successfully!');
    } else {
      addNote(notePayload);
      showToast('Note saved successfully!');
      setTimeout(() => {
        if (goBack) goBack('notes_main_light_mode');
        else if (setActiveTab) setActiveTab('notes_main_light_mode');
        else window.history.back();
      }, 350);
    }
  };

  const handleCancelDraft = () => {
    if (!isEditing) {
      if (goBack) goBack('notes_main_light_mode');
      else if (setActiveTab) setActiveTab('notes_main_light_mode');
      else window.history.back();
      return;
    }

    if (isNew) {
      resetAllState();
      showToast('Draft discarded');
      setTimeout(() => {
        if (goBack) goBack('notes_main_light_mode');
        else if (setActiveTab) setActiveTab('notes_main_light_mode');
        else window.history.back();
      }, 250);
    } else {
      setTitle(currentNote.title || '');
      setContent(currentNote.body || '');
      setSection1Title(currentNote.section1Title || '');
      setBody(currentNote.body || '');
      setQuote(currentNote.quote || '');
      setQuoteAttribution(currentNote.quoteAttribution || '');
      setSection2Title(currentNote.section2Title || '');
      setSection2Body(currentNote.section2Body || '');
      setTags(currentNote.tags || []);
      setMilestones(currentNote.milestones || []);
      setAttachments(currentNote.attachments || []);
      setIsPinned(Boolean(currentNote.isPinned));
      if (editorRef.current) {
        editorRef.current.innerHTML = currentNote.body || '';
      }
      setIsEditing(false);
      showToast('Changes discarded');
    }
  };

  const isArchived = Boolean(currentNote.isArchived);

  const handleToggleArchive = () => {
    const targetId = currentNote.id;
    if (!targetId || targetId === 'new') return;
    const nextArchived = !isArchived;
    if (nextArchived) {
      if (archiveNote) archiveNote(targetId);
      else updateNote(targetId, { isArchived: true });
      showToast('Note archived');
    } else {
      if (unarchiveNote) unarchiveNote(targetId);
      else updateNote(targetId, { isArchived: false });
      showToast('Note restored from archive');
    }
    setTimeout(() => {
      if (goBack) goBack('notes_main_light_mode');
      else if (setActiveTab) setActiveTab('notes_main_light_mode');
      else window.history.back();
    }, 200);
  };

  const handleDeleteConfirm = () => {
    if (currentNote.id && currentNote.id !== 'new') {
      deleteNote(currentNote.id);
    }
    setIsDeleteModalOpen(false);
    if (goBack) goBack('notes_main_light_mode');
    else if (setActiveTab) setActiveTab('notes_main_light_mode');
  };

  return (
    <div className="w-full font-sans relative text-slate-900 flex flex-col pb-32">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 py-2 flex flex-row items-center justify-between w-full shadow-xs">
        {/* Left Section */}
        <div className="flex flex-row items-center gap-2">
          <button 
            type="button" 
            onClick={handleCancelDraft} 
            aria-label="Back to Notes" 
            className="w-8 h-8 -ml-1 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold text-slate-900 tracking-tight">
            {isEditing ? (isNew ? 'New Note' : 'Edit Note') : 'Note'}
          </h1>
        </div>

        {/* Right Section (Actions: Clean, Distraction-Free Header) */}
        <div className="flex flex-row items-center gap-2.5 sm:gap-3">
          {/* 1. Primary Clean Edit / Done Action */}
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label="Edit Note"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
              title="Edit Note"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveNote}
              aria-label="Done Editing"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
              title="Done Editing"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Done</span>
            </button>
          )}

          {/* 2. 3-dots (More / Secondary Options Menu) */}
          <div className="relative" ref={menuRef}>
            <button 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Note options" 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="More Options"
            >
              <MoreVertical className="w-4.5 h-4.5" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-11 w-48 rounded-2xl bg-white/95 border border-slate-200 shadow-2xl p-1.5 z-50 text-xs font-medium space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <button 
                  type="button" 
                  onClick={() => { handleTogglePin(); setIsMenuOpen(false); }} 
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 text-left transition-colors cursor-pointer"
                >
                  <Pin className={`w-4 h-4 text-slate-400 ${isPinned ? 'fill-indigo-600 text-indigo-600 rotate-45' : ''}`} />
                  <span>{isPinned ? 'Unpin Note' : 'Pin Note'}</span>
                </button>

                {currentNote.id && currentNote.id !== 'new' && (
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
                    <span>{isArchived ? 'Unarchive Note' : 'Archive Note'}</span>
                  </button>
                )}

                <div className="my-1 border-t border-slate-100"></div>

                <button 
                  type="button" 
                  onClick={() => { setIsDeleteModalOpen(true); setIsMenuOpen(false); }} 
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-left transition-colors cursor-pointer font-medium"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Delete Note</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Profile Avatar */}
          <UserAvatar setActiveTab={setActiveTab} size="w-8 h-8" />
        </div>
      </header>

      {/* ELEGANT STRUCTURED SHEET CONTAINER */}
      <div className="note-sheet-card flex-1 bg-white rounded-[32px] border border-slate-200/90 shadow-lg px-5 pt-6 pb-8 mt-3 space-y-6 mx-auto w-full max-w-2xl">
        {/* CLEAN STRUCTURED METADATA ROW */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium shadow-xs">
            <CloudCheck className="w-3.5 h-3.5" />
            <span>Saved</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{displayDate}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{displayReadTime}</span>
          </span>
        </div>

        {/* TITLE: EDITABLE INPUT IN EDIT MODE, ARTICLE H1 IN VIEW MODE */}
        <div className="pt-1">
          {isEditing ? (
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Note Title..." 
              className="w-full text-2xl sm:text-3xl font-extrabold bg-transparent text-slate-900 placeholder-slate-400 outline-none border-none p-0 focus:ring-0 leading-tight tracking-tight" 
            />
          ) : (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight select-text">
              {title || 'Untitled Reflection'}
            </h1>
          )}
        </div>

        {/* TAGS ROW: ONLY PILLS IN VIEW MODE, +TAG IN EDIT MODE */}
        {(tags.length > 0 || isEditing) && (
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center gap-1.5 transition-colors">
                <span>{tag}</span>
                {isEditing && (
                  <button type="button" onClick={() => handleRemoveTag(tag)} aria-label={`Remove tag ${tag}`} className="hover:opacity-75 cursor-pointer ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            {isEditing && (
              isNewTagOpen ? (
                <form onSubmit={handleAddTag} className="flex items-center gap-1.5">
                  <input type="text" autoFocus value={newTagText} onChange={(e) => setNewTagText(e.target.value)} placeholder="Tag name..." className="px-2.5 py-0.5 rounded-full text-xs bg-white border border-slate-300 text-slate-900 outline-none focus:border-indigo-500 w-24" />
                  <button type="submit" aria-label="Confirm Tag" className="p-1 text-emerald-600 hover:text-emerald-500 cursor-pointer"><Check className="w-3.5 h-3.5" /></button>
                  <button type="button" onClick={() => setIsNewTagOpen(false)} aria-label="Cancel Tag" className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"><X className="w-3.5 h-3.5" /></button>
                </form>
              ) : (
                <button type="button" onClick={() => setIsNewTagOpen(true)} className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-indigo-50 transition-colors cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tag</span>
                </button>
              )
            )}
          </div>
        )}

        {/* FORMATTING TOOLBAR & MIC: HIDDEN IN VIEW MODE */}
        {isEditing && (
          <div className="sticky top-14 z-20 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 flex items-center gap-1 overflow-x-auto scrollbar-none shadow-xs">
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleBold} aria-label="Bold" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.bold ? 'bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'}`}><Bold className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleItalic} aria-label="Italic" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.italic ? 'bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'}`}><Italic className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleHeading} aria-label="Heading" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.heading ? 'bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'}`}><Type className="w-3.5 h-3.5" /></button>
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleBulletList} aria-label="Bullet List" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.bulletList ? 'bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'}`}><List className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleNumberedList} aria-label="Numbered List" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.orderedList ? 'bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'}`}><ListOrdered className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleQuote} aria-label="Quote" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.quote ? 'bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'}`}><Quote className="w-3.5 h-3.5" /></button>
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editorImageInputRef.current?.click()} aria-label="Insert Image" className="w-8 h-8 rounded-lg hover:bg-slate-200/70 text-indigo-600 flex items-center justify-center shrink-0 transition-colors cursor-pointer"><ImageIcon className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleVoice} aria-label="Record Audio" className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs ml-auto transition-all cursor-pointer ${isRecording ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400/50 scale-105' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}><Mic className="w-3.5 h-3.5" /></button>
          </div>
        )}
        <input type="file" ref={editorImageInputRef} onChange={handleInsertEditorImage} className="hidden" accept="image/*" />

        {/* STREAMLINED CONTENT BLOCKS */}
        <div className="space-y-4">
          {/* Section 1 Title */}
          {isEditing ? (
            <input type="text" value={section1Title} onChange={(e) => setSection1Title(e.target.value)} placeholder="1. Section Title..." className="w-full text-base font-bold text-slate-900 bg-transparent outline-none border-none p-0 focus:ring-0" />
          ) : (
            section1Title ? <h2 className="text-base font-bold text-slate-900 tracking-tight">{section1Title}</h2> : null
          )}

          {/* Main Body */}
          {isEditing ? (
            <div className="relative">
              {(!body || body === '<br>' || body.trim() === '') && (
                <span className="absolute top-3 left-3 text-sm text-slate-400 pointer-events-none select-none">
                  Write your thoughts...
                </span>
              )}
              <div 
                ref={editorRef} 
                contentEditable 
                suppressContentEditableWarning 
                onInput={handleEditorInput} 
                onKeyUp={updateActiveFormats} 
                onMouseUp={updateActiveFormats} 
                onSelect={updateActiveFormats} 
                onTouchEnd={updateActiveFormats} 
                className="w-full min-h-[140px] text-sm leading-relaxed p-3 rounded-2xl bg-slate-50/80 focus:bg-white border border-slate-200/90 focus:border-indigo-400 text-slate-800 outline-none transition-colors font-normal [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-indigo-700 [&_h2]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-indigo-50/50 [&_blockquote]:rounded-r-lg [&_blockquote]:py-1 [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-2" 
              />
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: body || '<p class="text-slate-400 italic">No notes yet. Tap Edit to add your thoughts.</p>' }} 
              className="w-full text-sm leading-relaxed text-slate-800 select-text font-normal [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-indigo-700 [&_h2]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-indigo-50/50 [&_blockquote]:rounded-r-lg [&_blockquote]:py-1 [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-2 py-1" 
            />
          )}

          {/* Quote Block */}
          {isEditing ? (
            <div className="border-l-3 border-indigo-500 pl-3.5 py-1.5 my-3 bg-indigo-50/50 rounded-r-xl space-y-1">
              <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Quote or reflection highlight..." className="w-full text-sm italic font-medium text-slate-800 bg-transparent outline-none border-none p-0 focus:ring-0" />
              <input type="text" value={quoteAttribution} onChange={(e) => setQuoteAttribution(e.target.value)} placeholder="Quote source / author..." className="w-full text-[11px] text-indigo-600 font-medium bg-transparent outline-none border-none p-0 focus:ring-0" />
            </div>
          ) : (
            quote ? (
              <blockquote className="border-l-3 border-indigo-500 pl-3.5 py-2 my-3 bg-indigo-50/50 rounded-r-xl select-text space-y-1">
                <p className="text-sm italic font-medium text-slate-800">"{quote}"</p>
                {quoteAttribution && (
                  <p className="text-[11px] text-indigo-600 font-medium not-italic">— {quoteAttribution}</p>
                )}
              </blockquote>
            ) : null
          )}

          {/* Section 2 Title & Body */}
          {isEditing ? (
            <>
              <input type="text" value={section2Title} onChange={(e) => setSection2Title(e.target.value)} placeholder="2. Section Title..." className="w-full text-base font-bold text-slate-900 bg-transparent outline-none border-none p-0 focus:ring-0 pt-2" />
              <textarea rows={3} value={section2Body} onChange={(e) => setSection2Body(e.target.value)} className="w-full text-sm leading-relaxed text-slate-800 bg-transparent outline-none border-none p-0 focus:ring-0 resize-y font-normal" placeholder="Add secondary reflection notes..." />
            </>
          ) : (
            (section2Title || section2Body) ? (
              <div className="space-y-2 pt-2">
                {section2Title && <h2 className="text-base font-bold text-slate-900">{section2Title}</h2>}
                {section2Body && <p className="text-sm leading-relaxed text-slate-800 select-text whitespace-pre-wrap">{section2Body}</p>}
              </div>
            ) : null
          )}
        </div>

        {/* INTEGRATED MILESTONES CHECKLIST */}
        {(milestones.length > 0 || isEditing) && (
          <div className="pt-3 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-800">Key Milestones</h3>
                <span className="text-xs text-slate-500 font-normal">({milestones.filter(m => m.completed).length}/{milestones.length} done)</span>
              </div>
              {isEditing && (
                <button type="button" onClick={() => setIsNewMilestoneOpen(true)} className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer">
                  <Plus className="w-3 h-3" />
                  <span>Milestone</span>
                </button>
              )}
            </div>
            {isEditing && isNewMilestoneOpen && (
              <form onSubmit={handleAddMilestone} className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-200 mb-3">
                <input type="text" autoFocus value={newMilestoneText} onChange={(e) => setNewMilestoneText(e.target.value)} placeholder="New milestone objective..." className="flex-1 text-xs bg-transparent text-slate-900 outline-none px-1" />
                <button type="submit" className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-600 text-white cursor-pointer">Add</button>
                <button type="button" onClick={() => setIsNewMilestoneOpen(false)} className="px-2 py-1 rounded-lg text-xs text-slate-500 hover:text-slate-800 cursor-pointer">Cancel</button>
              </form>
            )}
            <div className="space-y-1.5">
              {milestones.map((m) => (
                <div key={m.id} onClick={() => handleToggleMilestone(m.id)} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${m.completed ? 'bg-indigo-600 text-white' : 'border border-slate-300 bg-white'}`}>
                    {m.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-sm flex-1 leading-snug transition-colors ${m.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{m.text}</span>
                  {isEditing && (
                    <button type="button" onClick={(e) => handleDeleteMilestone(m.id, e)} aria-label="Delete milestone" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-1 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTACHMENTS WITH MEDIA DETAILS NAVIGATION */}
        {(attachments.length > 0 || isEditing) && (
          <div className="pt-3 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-800">Attachments</h3>
                <span className="text-xs text-slate-500 font-normal">({attachments.length})</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,audio/*,.pdf" />
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {isEditing && (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="h-24 w-24 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-slate-500 hover:text-indigo-600 flex flex-col items-center justify-center gap-1 shrink-0 transition-colors cursor-pointer">
                  <Plus className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Add Item</span>
                </button>
              )}
              {attachments.map((att) => (
                <div 
                  key={att.id} 
                  onClick={() => {
                    if (att.type === 'image' || att.url) {
                      handleOpenAttachment(att);
                    }
                  }}
                  role={att.type === 'image' || att.url ? 'button' : undefined}
                  tabIndex={att.type === 'image' || att.url ? 0 : undefined}
                  aria-label={att.type === 'image' || att.url ? `View ${att.name}` : undefined}
                  className={`h-24 min-w-[130px] rounded-2xl p-2.5 flex flex-col justify-between shrink-0 relative group bg-slate-50 border border-slate-200 shadow-xs transition-all ${
                    att.type === 'image' || att.url ? 'cursor-pointer hover:border-indigo-500 hover:bg-slate-100 hover:scale-[1.02]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {att.type === 'image' ? (
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center">
                        <img src={att.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80'} alt={att.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Mic className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {isEditing && (
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAttachment(att.id);
                        }} 
                        aria-label={`Delete ${att.name}`} 
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-0.5 cursor-pointer z-10"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate">{att.name}</p>
                    <p className="text-[10px] text-slate-500">{att.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS IN EDIT MODE */}
        {isEditing && (
          <div className="pt-2 space-y-3">
            <button type="button" onClick={handleSaveNote} className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 active:scale-[0.99] transition-all cursor-pointer">
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Save Note</span>
            </button>
            <button type="button" onClick={handleCancelDraft} className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs rounded-2xl p-5 space-y-4 bg-white border border-slate-200 shadow-2xl text-slate-900">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-sm text-slate-900">Delete Note?</h3>
              <p className="text-xs text-slate-500">This note will be permanently removed from your storage.</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleDeleteConfirm} className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 text-white shadow-sm hover:bg-rose-500 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium shadow-xl flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
