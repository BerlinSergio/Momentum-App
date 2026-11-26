/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, no-unused-vars */
import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useRef, useMemo, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { useNotesStore } from './store/useNotesStore';
import { useNavigationStore } from './store/useNavigationStore';
import { saveAttachmentFile } from './storage/index.js';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';
import {
  ArrowLeft, CloudCheck, Pin, Calendar, Clock, Trash2, Bold, Italic,
  Type, List, ListOrdered, Quote, Image as ImageIcon, Mic, Plus,
  Check, X, MoreVertical, Pencil, Edit3,
  Archive, ArchiveRestore
} from 'lucide-react';

export default function LongNoteEditorDarkMode({ setActiveTab, goBack, noteId: propNoteId, isNew: propIsNew, route = { params: {} } }) {
  const { t } = useTranslation();
  const storeNoteId = useNotesStore((s) => s.activeNoteId);
  const routeParams = route?.params || {};
  const routeNoteId = routeParams?.noteId;
  const isExplicitlyNew = Boolean(propIsNew || routeParams?.isNew);
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
    const idStr = String(effectiveNoteId);
    const found = notes.find((n) => String(n.id) === idStr && n.type === 'long') || notes.find((n) => String(n.id) === idStr);
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
  const [isNewMilestoneOpen, setIsNewMilestoneOpen] = useState(false);
  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [isNewTagOpen, setIsNewTagOpen] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(isNew ? false : (currentNote.isPinned || false));
  const [attachments, setAttachments] = useState(isNew ? [] : (currentNote.attachments || []));
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    heading: false,
    bulletList: false,
    orderedList: false,
    quote: false,
  });

  const editorRef = useRef(null);
  const titleTextareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const editorImageInputRef = useRef(null);
  const menuRef = useRef(null);
  const recognitionRef = useRef(null);

  const adjustTitleHeight = () => {
    if (titleTextareaRef.current) {
      titleTextareaRef.current.style.height = 'auto';
      titleTextareaRef.current.style.height = `${titleTextareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTitleHeight();
  }, [title, isEditing]);

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
  };

  useEffect(() => {
    if (!routeParams?.noteId) {
      resetAllState();
      setIsEditing(true);
    }
  }, [routeParams?.noteId]);

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
      if (editorRef.current && (editorRef.current.innerHTML !== currentNote.body)) {
        editorRef.current.innerHTML = currentNote.body || '';
      }
      setIsEditing(false);
    }
  }, [route?.params?.noteId, route?.params?.isNew, propNoteId, storeNoteId, currentNote?.id, isNew]);

  // Initialize the uncontrolled contentEditable when entering edit mode.
  // Rewriting on each input would disturb the caret and undo history.
  useEffect(() => {
    if (isEditing && editorRef.current) editorRef.current.innerHTML = body || '';
  }, [isEditing]);

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
    if (typeof msg === 'string') {
      const lower = msg.toLowerCase();
      if (lower.includes('fail') || lower.includes('error')) {
        toast.error(msg);
      } else if (lower.includes('success') || lower.includes('saved') || lower.includes('updated') || lower.includes('added') || lower.includes('applied') || lower.includes('enabled') || lower.includes('restored') || lower.includes('pinned')) {
        toast.success(msg);
      } else {
        toast.info(msg);
      }
    } else {
      toast.info(String(msg));
    }
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
      showToast(t('toasts.standardText', 'Standard text format'));
    } else {
      executeFormat('formatBlock', '<h2>');
      showToast(t('toasts.headingApplied', 'Heading style applied'));
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
      showToast(t('toasts.quoteApplied', 'Quote block applied'));
    } else {
      executeFormat('formatBlock', '<blockquote>');
      showToast(t('toasts.quoteApplied', 'Quote block applied'));
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

  // This is dictation, not audio-file recording. Never invent a transcript.
  const stopDictation = () => {
    const rec=recognitionRef.current;
    recognitionRef.current=null;
    if(rec) {
      rec.onresult=null; rec.onerror=null; rec.onend=null; rec.onstart=null;
      try {rec.abort();} catch {}
    }
    setIsRecording(false);
  };
  useEffect(()=>{
    const onHidden=()=>{if(document.hidden)stopDictation();};
    document.addEventListener('visibilitychange',onHidden);
    return ()=>{
      document.removeEventListener('visibilitychange',onHidden);
      const rec=recognitionRef.current;
      recognitionRef.current=null;
      if(rec){rec.onresult=null;rec.onerror=null;rec.onend=null;rec.onstart=null;try{rec.abort();}catch{}}
    };
  },[effectiveNoteId]);
  useEffect(()=>{if(!isEditing)stopDictation();},[isEditing]);

  const handleToggleVoice = (e) => {
    e.preventDefault();
    if(recognitionRef.current) {
      try {recognitionRef.current.stop();}
      catch {stopDictation();}
      return;
    }
    const SpeechRec=window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRec){toast.error(t('notes.dictationUnavailable','Voice dictation is unavailable on this device. You can type or attach an audio file.'));return;}
    try{
      const rec=new SpeechRec();
      recognitionRef.current=rec;
      rec.continuous=true;
      rec.interimResults=false;
      rec.lang=document.documentElement.lang || navigator.language || 'en-US';
      let committedResults=0;
      const active=()=>recognitionRef.current===rec && !document.hidden;
      const finish=()=>{if(recognitionRef.current===rec){recognitionRef.current=null;setIsRecording(false);}};
      rec.onstart=()=>{if(active())toast.info(t('toasts.listeningSpeakNow','Listening... Speak now'));};
      rec.onresult=evt=>{
        if(!active()||!editorRef.current)return;
        // Results are cumulative. Append only new, final segments.
        const parts=[];
        for(let index=committedResults;index<evt.results.length;index++){
          const result=evt.results[index];
          if(!result.isFinal)break;
          if(result[0]?.transcript?.trim())parts.push(result[0].transcript.trim());
          committedResults=index+1;
        }
        if(parts.length){
          editorRef.current.focus();
          document.execCommand('insertText',false,' '+parts.join(' '));
          setBody(editorRef.current.innerHTML);
        }
      };
      rec.onerror=()=>{if(active())toast.error(t('notes.dictationFailed','Voice dictation failed. Check microphone permission or type your note.'));finish();};
      rec.onend=finish;
      setIsRecording(true);
      rec.start();
    }catch{stopDictation();toast.error(t('notes.dictationFailed','Voice dictation failed. Check microphone permission or type your note.'));}
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
      id: Date.now().toString(),
      text: newMilestoneText.trim(),
      completed: false,
    };
    if (currentNote.id && currentNote.id !== 'new') {
      addMilestoneStore(currentNote.id, newMilestoneText.trim());
    }
    setMilestones((prev) => [...prev, newM]);
    setNewMilestoneText('');
    setIsNewMilestoneOpen(false);
    showToast(t('notes.milestoneAdded', 'Milestone added'));
  };

  const handleDeleteMilestone = (mId) => {
    if (currentNote.id && currentNote.id !== 'new') {
      deleteMilestoneStore(currentNote.id, mId);
    }
    setMilestones((prev) => prev.filter((m) => m.id !== mId));
    showToast(t('notes.milestoneDeleted', 'Milestone removed'));
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
    showToast(t('toasts.tagAdded', 'Tag added'));
  };

  const handleRemoveTag = (tag) => {
    if (currentNote.id && currentNote.id !== 'new') {
      removeTagStore(currentNote.id, tag);
    }
    setTags((prev) => prev.filter((t) => t !== tag));
    showToast(t('toasts.tagRemoved', 'Tag removed'));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const isImg = file.type.startsWith('image/');
      const savedAtt = await saveAttachmentFile(file, {
        noteId: currentNote.id,
        name: file.name,
        subtitle: isImg ? 'Uploaded photo' : 'Uploaded document',
      });
      if (currentNote.id && currentNote.id !== 'new') {
        addAttachmentStore(currentNote.id, savedAtt);
      }
      setAttachments((prev) => [...prev, savedAtt]);
      showToast(`Added: ${file.name}`);
    } catch (err) {
      console.warn('Failed to persist attachment:', err);
      showToast(err.message || 'Failed to attach file');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteAttachment = (attId) => {
    if (currentNote.id && currentNote.id !== 'new') {
      deleteAttachmentStore(currentNote.id, attId);
    }
    setAttachments((prev) => prev.filter((a) => a.id !== attId));
    showToast(t('toasts.attachmentRemoved', 'Attachment removed'));
  };

  const saveInFlight=useRef(false);
  const [savingNote,setSavingNote]=useState(false);
  const handleSaveNote = async () => {
    if(saveInFlight.current)return;
    saveInFlight.current=true;setSavingNote(true);
    stopDictation();
    try {
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
      if(!useNotesStore.getState().notes.some(note=>String(note.id)===String(currentNote.id)))throw Error('Note no longer exists');
      if (await updateNote(currentNote.id, notePayload) !== true) throw Error('Note update not committed');
      setIsEditing(false);
      showToast(t('toasts.noteUpdated', 'Note updated successfully!'));
    } else {
      if (await addNote(notePayload) !== true) throw Error('Note creation not committed');
      showToast(t('toasts.noteSaved', 'Note saved successfully!'));
        if (goBack) goBack('notes_main_dark_mode');
        else if (setActiveTab) setActiveTab('notes_main_dark_mode');
        else window.history.back();
    }
    }catch{toast.error(t('notes.saveFailed','Note could not be saved safely'));}
    finally{saveInFlight.current=false;setSavingNote(false);}
  };

  const handleCancelDraft = async () => {
    if(saveInFlight.current)return;
    stopDictation();
    if (!isEditing) {
      if (goBack) goBack('notes_main_dark_mode');
      else if (setActiveTab) setActiveTab('notes_main_dark_mode');
      else window.history.back();
      return;
    }

    const currentHtml = editorRef.current ? editorRef.current.innerHTML : body;
    const hasUnsavedChanges = isNew
      ? Boolean(title.trim() || currentHtml.trim() || section1Title.trim() || quote.trim() || section2Title.trim() || section2Body.trim() || milestones.length > 0 || attachments.length > 0)
      : (
          title !== (currentNote.title || '') ||
          currentHtml !== (currentNote.body || '') ||
          section1Title !== (currentNote.section1Title || '') ||
          quote !== (currentNote.quote || '') ||
          quoteAttribution !== (currentNote.quoteAttribution || '') ||
          section2Title !== (currentNote.section2Title || '') ||
          section2Body !== (currentNote.section2Body || '') ||
          milestones.length !== (currentNote.milestones?.length || 0) ||
          attachments.length !== (currentNote.attachments?.length || 0)
        );

    if (hasUnsavedChanges) {
      const shouldDiscard = await confirm({
        variant: 'warning',
        title: t('confirm.discardTitle', 'Discard unsaved changes?'),
        description: t('confirm.discardChangesDescription', 'Any unsaved changes made to this note will be lost.'),
        confirmText: t('common.discard', 'Discard'),
        cancelText: t('common.keepEditing', 'Keep Editing'),
      });
      if (!shouldDiscard) return;
    }

    if (isNew) {
      resetAllState();
      showToast(t('toasts.draftDiscarded', 'Draft discarded'));
      setTimeout(() => {
        if (goBack) goBack('notes_main_dark_mode');
        else if (setActiveTab) setActiveTab('notes_main_dark_mode');
        else window.history.back();
      }, 250);
    } else {
      // Revert to existing note values and switch back to view mode
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
      if (editorRef.current) {
        editorRef.current.innerHTML = currentNote.body || '';
      }
      setIsEditing(false);
      showToast(t('notes.changesDiscarded', 'Changes discarded'));
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
      showToast(t('toasts.noteArchived', 'Note archived'));
    } else {
      if (unarchiveNote) unarchiveNote(targetId);
      else updateNote(targetId, { isArchived: false });
      showToast(t('toasts.noteRestored', 'Note restored from archive'));
    }
    setTimeout(() => {
      if (goBack) goBack('notes_main_dark_mode');
      else if (setActiveTab) setActiveTab('notes_main_dark_mode');
      else window.history.back();
    }, 200);
  };

  const handleDeleteNote = async () => {
    setIsMenuOpen(false);
    // Resolve targetId from all available sources so we never lose the note reference
    const rawTarget = (currentNote?.id && currentNote.id !== 'new')
      ? currentNote.id
      : (effectiveNoteId && effectiveNoteId !== 'new'
        ? effectiveNoteId
        : (storeNoteId && storeNoteId !== 'new' ? storeNoteId : null));
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
      // A new, unsaved draft has nothing to remove from storage.
      if (goBack) goBack('notes_main_dark_mode');
      else if (setActiveTab) setActiveTab('notes_main_dark_mode');
      else window.history.back();
      return;
    }

    try {
      const removed = await deleteNote(targetId);
      if (!removed) {
        toast.error(t('notes.deleteFailed', 'Note was not safely deleted. Reload saved data before trying again.'));
        return;
      }
      showToast(t('toasts.noteDeleted', 'Note deleted'));
      if (goBack) goBack('notes_main_dark_mode');
      else if (setActiveTab) setActiveTab('notes_main_dark_mode');
      else window.history.back();
    } catch (error) {
      console.error('[Momentum Notes] Deletion failed:', error);
      toast.error(t('notes.deleteFailed', 'Note was not safely deleted. Reload saved data before trying again.'));
    }
  };

  return (
    <div className="w-full min-h-full font-sans relative text-slate-100 flex flex-col items-center pb-24 sm:pb-32 px-3 sm:px-6 py-2 sm:py-4">
      <div className="w-full max-w-4xl lg:max-w-5xl flex flex-col gap-4 sm:gap-6">
        {/* TOP FLOATING GLASS HEADER */}
        <MomentumGlassHeader isDarkMode={true} className="w-full !px-0" capsuleClassName="w-full">
          {/* Left Section */}
          <div className="flex flex-row items-center gap-2">
            <button 
              type="button" 
              onClick={handleCancelDraft} 
              aria-label="Back to Notes" 
              className="w-8 h-8 -ml-1 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate min-w-0">
              {isEditing ? (isNew ? t('notes.newNote', 'New Note') : t('notes.editNote', 'Edit Note')) : t('notes.note', 'Note')}
            </h1>
          </div>

          {/* Right Section (Actions: Clean, Distraction-Free Header) */}
          <div className="flex flex-row items-center gap-1.5 sm:gap-3 shrink-0">
            {/* 1. Primary Clean Edit / Done Action */}
            {!isEditing ? (
              <button
                type="button"
                data-testid="long-note-edit" onClick={() => setIsEditing(true)}
                aria-label={t('notes.editNote', 'Edit Note')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/20 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-2xs"
                title={t('notes.editNote', 'Edit Note')}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t('common.edit', 'Edit')}</span>
              </button>
            ) : (
              <button
                type="button"
                data-testid="long-note-save" onClick={handleSaveNote} disabled={savingNote}
                aria-label={t('notes.doneEditing', 'Done Editing')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/20 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-2xs"
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
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={t('notes.moreOptions', 'More Options')}
              >
                <MoreVertical className="w-4.5 h-4.5" />
              </button>
              {isMenuOpen && (
                <div className="absolute end-0 top-11 w-48 max-w-[min(12rem,calc(100vw-2rem))] rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-1.5 z-50 text-xs font-medium space-y-1 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                  <button 
                    type="button" 
                    onClick={() => { handleTogglePin(); setIsMenuOpen(false); }} 
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <Pin className={`w-4 h-4 text-slate-400 ${isPinned ? 'fill-indigo-400 text-indigo-400 rotate-45' : ''}`} />
                    <span>{isPinned ? t('notes.unpinNote', 'Unpin Note') : t('notes.pinNote', 'Pin Note')}</span>
                  </button>

                  {currentNote.id && currentNote.id !== 'new' && (
                    <button 
                      type="button" 
                      onClick={() => { setIsMenuOpen(false); handleToggleArchive(); }} 
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 text-left transition-colors cursor-pointer"
                    >
                      {isArchived ? (
                        <ArchiveRestore className="w-4 h-4 text-primary" />
                      ) : (
                        <Archive className="w-4 h-4 text-slate-400" />
                      )}
                      <span>{isArchived ? t('notes.unarchiveNote', 'Unarchive Note') : t('notes.archiveNote', 'Archive Note')}</span>
                    </button>
                  )}

                  <div className="my-1 border-t border-slate-800"></div>

                  <button 
                    type="button" 
                    onClick={handleDeleteNote} 
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-left transition-colors cursor-pointer font-medium"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>{t('notes.deleteNote', 'Delete Note')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </MomentumGlassHeader>

        {/* ELEGANT STRUCTURED FLOATING GLASS SHEET */}
        <div className="note-sheet-card flex-1 bg-[rgba(15,23,42,0.68)] backdrop-blur-2xl rounded-[28px] sm:rounded-[36px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.08)] px-5 sm:px-8 pt-6 pb-8 space-y-6 w-full">
          {/* CLEAN STRUCTURED METADATA ROW */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium shadow-xs">
              <CloudCheck className="w-3.5 h-3.5" />
              <span>{t('common.saved', 'Saved')}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{displayDate}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{displayReadTime}</span>
            </span>
          </div>

          {/* TITLE: EDITABLE AUTO-EXPANDING TEXTAREA IN EDIT MODE, ARTICLE H1 IN VIEW MODE */}
          <div className="pt-1">
            {isEditing ? (
              <textarea
                ref={titleTextareaRef}
                rows={1}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  adjustTitleHeight();
                }}
                placeholder={t('notes.noteTitle', 'Note Title') + '...'}
                className="w-full text-2xl sm:text-3xl font-extrabold bg-transparent text-white placeholder-slate-500 outline-none border-none p-0 focus:ring-0 leading-tight tracking-tight resize-none overflow-hidden"
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight select-text break-words">
                {title || t('notes.untitledReflection', 'Untitled Reflection')}
              </h1>
            )}
          </div>

          {/* TAGS ROW: ONLY PILLS IN VIEW MODE, +TAG IN EDIT MODE */}
          {(tags.length > 0 || isEditing) && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/15 border border-indigo-400/20 text-indigo-300 flex items-center gap-1.5 transition-colors shadow-2xs">
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
                    <input type="text" autoFocus value={newTagText} onChange={(e) => setNewTagText(e.target.value)} placeholder={t('notes.tagNamePlaceholder', 'Tag name...')} className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-400 w-24" />
                    <button type="submit" aria-label="Confirm Tag" className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"><Check className="w-3.5 h-3.5" /></button>
                    <button type="button" onClick={() => setIsNewTagOpen(false)} aria-label="Cancel Tag" className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-3.5 h-3.5" /></button>
                  </form>
                ) : (
                  <button type="button" onClick={() => setIsNewTagOpen(true)} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-indigo-500/15 transition-colors cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('common.tags', 'Tag')}</span>
                  </button>
                )
              )}
            </div>
          )}

        {/* RICH TEXT FORMATTING TOOLBAR IN EDIT MODE */}
        {isEditing && (
          <div className="sticky top-16 sm:top-20 z-20 p-1.5 sm:p-2 rounded-2xl bg-[rgba(15,23,42,0.85)] backdrop-blur-xl border border-white/10 flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none shadow-lg">
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleBold} aria-label="Bold" className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.bold ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-400/30 shadow-xs' : 'hover:bg-white/10 text-slate-300'}`}><Bold className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleItalic} aria-label="Italic" className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.italic ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-400/30 shadow-xs' : 'hover:bg-white/10 text-slate-300'}`}><Italic className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleHeading} aria-label="Heading" className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.heading ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-400/30 shadow-xs' : 'hover:bg-white/10 text-slate-300'}`}><Type className="w-3.5 h-3.5" /></button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleBulletList} aria-label="Bullet List" className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.bulletList ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-400/30 shadow-xs' : 'hover:bg-white/10 text-slate-300'}`}><List className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleNumberedList} aria-label="Numbered List" className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.orderedList ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-400/30 shadow-xs' : 'hover:bg-white/10 text-slate-300'}`}><ListOrdered className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleQuote} aria-label="Quote" className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${activeFormats.quote ? 'bg-indigo-500/25 text-indigo-300 font-bold border border-indigo-400/30 shadow-xs' : 'hover:bg-white/10 text-slate-300'}`}><Quote className="w-3.5 h-3.5" /></button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editorImageInputRef.current?.click()} aria-label="Insert Image" className="w-8 h-8 rounded-xl hover:bg-white/10 text-indigo-400 flex items-center justify-center shrink-0 transition-colors cursor-pointer"><ImageIcon className="w-3.5 h-3.5" /></button>
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleVoice} aria-label="Voice dictation" aria-pressed={isRecording} disabled={savingNote} className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ml-auto transition-all cursor-pointer ${isRecording ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400/50 scale-105' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}><Mic className="w-3.5 h-3.5" /></button>
          </div>
        )}
        <input type="file" ref={editorImageInputRef} onChange={handleInsertEditorImage} className="hidden" accept="image/*" />

        {/* STREAMLINED CONTENT BLOCKS */}
        <div className="space-y-4">
          {/* Section 1 Title */}
          {isEditing ? (
            <input type="text" value={section1Title} onChange={(e) => setSection1Title(e.target.value)} placeholder={t('notes.sectionTitle1', '1. Section Title...')} className="w-full text-base font-bold text-white bg-transparent outline-none border-none p-0 focus:ring-0" />
          ) : (
            section1Title ? <h2 className="text-base font-bold text-white tracking-tight">{section1Title}</h2> : null
          )}

          {/* Main Body */}
          {isEditing ? (
            <div className="relative">
              {(!body || body === '<br>' || body.trim() === '') && (
                <span className="absolute top-3.5 left-3.5 text-sm sm:text-base text-slate-500 pointer-events-none select-none">
                  {t('notes.writeThoughts', 'Write your thoughts...')}
                </span>
              )}
              <div
                ref={editorRef}
                data-testid="long-note-body-editor"
                contentEditable
                onInput={handleEditorInput}
                className="w-full min-h-[160px] text-sm sm:text-base leading-relaxed p-4 rounded-2xl bg-slate-950/40 focus:bg-slate-950/70 border border-white/10 focus:border-indigo-500/60 text-slate-100 outline-none transition-all font-normal [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-indigo-400 [&_h2]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_blockquote]:border-l-3 [&_blockquote]:border-indigo-400 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-indigo-950/40 [&_blockquote]:rounded-r-lg [&_blockquote]:py-1 [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-2" 
              />
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: body || `<p class="text-slate-500 italic">${t('notes.noNotesYetTapEdit', 'No notes yet. Tap Edit to add your thoughts.')}</p>` }} 
              className="w-full text-sm sm:text-base leading-relaxed text-slate-100 select-text font-normal [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-indigo-400 [&_h2]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_blockquote]:border-l-3 [&_blockquote]:border-indigo-400 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-indigo-950/40 [&_blockquote]:rounded-r-lg [&_blockquote]:py-1 [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-2 py-1" 
            />
          )}

          {/* Quote Block */}
          {isEditing ? (
            <div className="border-l-4 border-indigo-400 pl-4 py-2.5 my-3 bg-indigo-950/40 rounded-r-2xl border border-indigo-500/20 space-y-1 backdrop-blur-sm">
              <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder={t('notes.quotePlaceholder', 'Quote or reflection highlight...')} className="w-full text-sm sm:text-base italic font-medium text-slate-200 bg-transparent outline-none border-none p-0 focus:ring-0" />
              <input type="text" value={quoteAttribution} onChange={(e) => setQuoteAttribution(e.target.value)} placeholder={t('notes.quoteSourcePlaceholder', 'Quote source / author...')} className="w-full text-xs text-indigo-400 font-medium bg-transparent outline-none border-none p-0 focus:ring-0" />
            </div>
          ) : (
            quote ? (
              <blockquote className="border-l-4 border-indigo-400 pl-4 py-3 my-3 bg-indigo-950/40 rounded-r-2xl border border-indigo-500/20 select-text space-y-1.5 backdrop-blur-sm">
                <p className="text-sm sm:text-base italic font-medium text-slate-200">"{quote}"</p>
                {quoteAttribution && (
                  <p className="text-xs text-indigo-400 font-semibold not-italic">— {quoteAttribution}</p>
                )}
              </blockquote>
            ) : null
          )}

          {/* Section 2 Title & Body */}
          {isEditing ? (
            <>
              <input type="text" value={section2Title} onChange={(e) => setSection2Title(e.target.value)} placeholder={t('notes.sectionTitle2', '2. Section Title...')} className="w-full text-base font-bold text-white bg-transparent outline-none border-none p-0 focus:ring-0 pt-2" />
              <textarea rows={3} value={section2Body} onChange={(e) => setSection2Body(e.target.value)} className="w-full text-sm sm:text-base leading-relaxed text-slate-200 bg-transparent outline-none border-none p-0 focus:ring-0 resize-y font-normal" placeholder={t('notes.secondaryNotesPlaceholder', 'Add secondary reflection notes...')} />
            </>
          ) : (section2Title || section2Body) ? (
            <div className="space-y-2 pt-2">
              {section2Title && <h2 className="text-base font-bold text-white">{section2Title}</h2>}
              {section2Body && <p className="text-sm sm:text-base leading-relaxed text-slate-200 select-text whitespace-pre-wrap">{section2Body}</p>}
            </div>
          ) : null}
        </div>

        {/* INTEGRATED MILESTONES CHECKLIST */}
        {(milestones.length > 0 || isEditing) && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-200">{t('notes.keyMilestones', 'Key Milestones')}</h3>
                <span className="text-xs text-slate-400 font-normal">({milestones.filter(m => m.completed).length}/{milestones.length} done)</span>
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsNewMilestoneOpen(true)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('notes.milestone', 'Milestone')}</span>
                </button>
              )}
            </div>
            {isEditing && isNewMilestoneOpen && (
              <form onSubmit={handleAddMilestone} className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/5 border border-white/10 mb-3 shadow-2xs">
                <input
                  type="text"
                  autoFocus
                  value={newMilestoneText}
                  onChange={(e) => setNewMilestoneText(e.target.value)}
                  placeholder={t('notes.newMilestonePlaceholder', 'New milestone objective...')}
                  className="flex-1 text-xs bg-transparent text-white outline-none px-1"
                />
                <button type="submit" className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white cursor-pointer hover:bg-indigo-500 transition-colors">{t('common.add', 'Add')}</button>
                <button type="button" onClick={() => setIsNewMilestoneOpen(false)} className="px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer">{t('common.cancel', 'Cancel')}</button>
              </form>
            )}
            <div className="space-y-1.5">
              {milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleToggleMilestone(m.id)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className={`w-4.5 h-4.5 rounded-lg flex items-center justify-center transition-all ${m.completed ? 'bg-indigo-600 text-white shadow-xs' : 'border border-slate-600 bg-slate-800'}`}>
                    {m.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-sm flex-1 leading-snug transition-colors ${m.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{m.text}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMilestone(m.id);
                      }}
                      title={t('notes.deleteMilestone', 'Delete milestone')}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 transition-opacity p-1 cursor-pointer"
                    >
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
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-200">{t('notes.attachments', 'Attachments')}</h3>
                <span className="text-xs text-slate-400 font-normal">({attachments.length})</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,audio/*,.pdf" />
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {isEditing && (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="h-24 w-24 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-white/5 hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-400 flex flex-col items-center justify-center gap-1 shrink-0 transition-all cursor-pointer">
                  <Plus className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{t('common.add', 'Add Item')}</span>
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
                  className={`h-24 min-w-[130px] rounded-2xl p-2.5 flex flex-col justify-between shrink-0 relative group bg-white/5 border border-white/10 shadow-xs transition-all ${
                    att.type === 'image' || att.url ? 'cursor-pointer hover:border-indigo-400 hover:bg-white/10 hover:scale-[1.02]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {att.type === 'image' ? (
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
                        <img src={att.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80'} alt={att.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
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
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 transition-opacity p-0.5 cursor-pointer z-10"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">{att.name}</p>
                    <p className="text-[10px] text-slate-400">{att.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS IN EDIT MODE */}
        {isEditing && (
          <div className="pt-2 space-y-3">
            <button type="button" data-testid="long-note-save-bottom" onClick={handleSaveNote} disabled={savingNote} className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 active:scale-[0.99] transition-all cursor-pointer">
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{t('common.save', 'Save Note')}</span>
            </button>
            <button type="button" onClick={handleCancelDraft} className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors cursor-pointer">
              {t('common.cancel', 'Cancel')}
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
