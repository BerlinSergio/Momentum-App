import ReminderTypePicker from './components/ReminderTypePicker.jsx';
import {useSettingsStore as useReminderSettings} from './store/useSettingsStore.js';
import {resolveReminderType,defaultReminderType,reminderDisabled} from './utils/reminderRules.js';
import React, { useState, useEffect, useRef } from 'react';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import UserAvatar from './components/UserAvatar';
import { useTranslation } from 'react-i18next';
import { CheckSquare, ArrowLeft } from 'lucide-react';
import { useTaskStore } from './store/useTaskStore';
import { MomentumDatePicker, MomentumTimePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';

const getCurrentIsoDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getCurrentDisplayDate = () => {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getCurrentIsoTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const getCurrentDisplayTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${meridiem}`;
};

const formatDisplayDate = (dateVal) => {
  if (!dateVal) return getCurrentDisplayDate();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
    const [y, m, d] = dateVal.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return dateVal;
};

const getIsoDate = (dateVal) => {
  if (!dateVal) return getCurrentIsoDate();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) return dateVal;
  const parsed = new Date(dateVal);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return getCurrentIsoDate();
};

const getIsoTime = (timeVal) => {
  if (!timeVal) return getCurrentIsoTime();
  if (/^\d{2}:\d{2}$/.test(timeVal)) return timeVal;
  const match = timeVal.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const meridiem = (match[3] || '').toUpperCase();
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }
  return getCurrentIsoTime();
};

const formatDisplayTime = (timeVal) => {
  if (!timeVal) return getCurrentDisplayTime();
  if (timeVal.toUpperCase().includes('AM') || timeVal.toUpperCase().includes('PM')) {
    return timeVal;
  }
  if (/^\d{1,2}:\d{2}$/.test(timeVal)) {
    const [h, m] = timeVal.split(':');
    let hours = parseInt(h, 10);
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${m} ${meridiem}`;
  }
  return timeVal;
};

export default function AddEditTaskLightMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { tasks, editingTaskId, setEditingTaskId, addTask, updateTask, deleteTask } = useTaskStore();
  
  const getTargetTask = () => {
    if (editingTaskId) {
      const found = tasks.find((t) => t.id === editingTaskId);
      if (found) return found;
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('taskId') || params.get('id');
      if (urlId) {
        const found = tasks.find((t) => t.id === urlId);
        if (found) return found;
      }
    }
    return null;
  };

  const existingTask = getTargetTask();
  const isEditing = Boolean(existingTask);
  const taskNumber = isEditing ? tasks.findIndex((t) => t.id === existingTask.id) + 1 || 1 : 1;

  const [title, setTitle] = useState(existingTask?.title || '');
  const [category, setCategory] = useState(existingTask?.category || 'Work');
  const [priority, setPriority] = useState(existingTask?.priority || 'High');
  const [dueDate, setDueDate] = useState(() => existingTask?.dueDate || getCurrentIsoDate());
  const [startTime, setStartTime] = useState(() => existingTask?.startTime || getCurrentDisplayTime());
  const [estimate, setEstimate] = useState(existingTask?.estimate || '45 mins');
  const [reminder, setReminder] = useState(existingTask?.reminder || '15 minutes before');
  const initialReminderType = task => task ? resolveReminderType(useReminderSettings.getState(),'task',task.reminderType,{taskId:task.id}) : defaultReminderType(useReminderSettings.getState(),'task');
  const [reminderType,setReminderType]=useState(()=>initialReminderType(existingTask));
  const [persistentAlert, setPersistentAlert] = useState(() => Boolean(existingTask?.persistentAlert));
  const [description, setDescription] = useState(existingTask?.description || '');
  const [subTasks, setSubTasks] = useState(existingTask?.subTasks ? [...existingTask.subTasks] : []);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isReminderMenuOpen, setIsReminderMenuOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const [isMutating, setIsMutating] = useState(false);
  const mutationPending = useRef(false);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const reminderDropdownRef = useRef(null);

  useEffect(() => {
    // Optimistic store updates must not reset the form during a pending commit.
    if (mutationPending.current) return;
    if (existingTask) {
      setTitle(existingTask.title || '');
      setCategory(existingTask.category || 'Work');
      setPriority(existingTask.priority || 'High');
      setDueDate(existingTask.dueDate || getCurrentIsoDate());
      setStartTime(existingTask.startTime || getCurrentDisplayTime());
      setEstimate(existingTask.estimate || '45 mins');
      setReminder(existingTask.reminder || '15 minutes before');
      setReminderType(initialReminderType(existingTask));
      setPersistentAlert(Boolean(existingTask.persistentAlert));
      setDescription(existingTask.description || '');
      setSubTasks(existingTask.subTasks ? [...existingTask.subTasks] : []);
    } else {
      setTitle('');
      setCategory('Work');
      setPriority('High');
      setDueDate(getCurrentIsoDate());
      setStartTime(getCurrentDisplayTime());
      setEstimate('45 mins');
      setReminder('15 minutes before');
      setReminderType(initialReminderType(null));
      setPersistentAlert(false);
      setDescription('');
      setSubTasks([]);
    }
  }, [existingTask?.id, editingTaskId]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!isReminderMenuOpen) return;
    const handleClickOutside = (event) => {
      if (reminderDropdownRef.current && !reminderDropdownRef.current.contains(event.target)) {
        setIsReminderMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isReminderMenuOpen]);

  const toggleListening = () => {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      toast.warning(t('toasts.voiceNotSupported', 'Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'));
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const speechResult = event.results?.[0]?.[0]?.transcript;
        if (speechResult) {
          setTitle((prev) => (prev && prev.trim() ? `${prev.trim()} ${speechResult.trim()}` : speechResult.trim()));
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const reminderOptions = [
    'None',
    'At time of event',
    '5 minutes before',
    '15 minutes before',
    '30 minutes before',
    '1 hour before',
    '1 day before',
  ];

  const toggleReminderMenu = () => {
    setIsReminderMenuOpen((prev) => !prev);
  };

  const handleSelectReminder = (option) => {
    setReminder(option);
    setIsReminderMenuOpen(false);
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleOpenTimePicker = () => {
    setIsTimePickerOpen(true);
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (val) {
      setDueDate(val);
    }
  };

  const handleTimeChange = (e) => {
    const val = e.target.value;
    if (val) {
      setStartTime(formatDisplayTime(val));
    }
  };

  const handleToggleSubTask = (subId) => {
    setSubTasks(subTasks.map((s) => (s.id === subId ? { ...s, completed: !s.completed } : s)));
  };

  const handleDeleteSubTask = (subId) => {
    setSubTasks(subTasks.filter((s) => s.id !== subId));
  };

  const handleAddStep = () => {
    const nextNum = subTasks.length + 1;
    const newStep = {
      id: `sub-${Date.now()}-${nextNum}`,
      title: '',
      completed: false,
    };
    setSubTasks([...subTasks, newStep]);
  };
  const handleAddSubTask = handleAddStep;

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (mutationPending.current) return;
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      toast.error(t('toasts.taskTitleRequired', 'Task title is required'));
      return;
    }
    mutationPending.current = true;
    setIsMutating(true);
    try {
      const payload = {
        title: cleanTitle,
        category,
        priority,
        dueDate: dueDate || getCurrentIsoDate(),
        startTime: startTime || getCurrentDisplayTime(),
        estimate,
        reminder,
        reminderType,
        persistentAlert: Boolean(persistentAlert),
        description,
        subTasks,
      };
      const saved = isEditing && existingTask
        ? await updateTask({ ...existingTask, ...payload })
        : await addTask(payload);
      if (saved !== true) throw new Error('Task commit not confirmed');
      toast.success(isEditing ? t('toasts.taskUpdated', 'Task updated successfully') : t('toasts.taskSaved', 'Task created successfully'));
      if (typeof goBack === 'function') {
        goBack('tasks_reminders_light_mode');
      } else if (setActiveTab) {
        setActiveTab('tasks_reminders_light_mode');
      }
    } catch {
      toast.error(t('toasts.taskSaveFailed', 'Task was not safely saved. Reload before trying again.'));
    } finally {
      mutationPending.current = false;
      setIsMutating(false);
    }
  };

  const isDirty = isEditing
    ? (reminderType !== initialReminderType(existingTask) || title !== (existingTask?.title || '') || description !== (existingTask?.description || '') || subTasks.length !== (existingTask?.subTasks?.length || 0))
    : (title.trim() !== '' || description.trim() !== '' || subTasks.length > 0);

  const handleCancel = async () => {
    if (mutationPending.current) return;
    if (isDirty) {
      const confirmed = await confirm({
        variant: 'warning',
        titleKey: 'confirm.discardTaskTitle',
        messageKey: 'confirm.discardTaskDescription',
        confirmLabelKey: 'confirm.discard',
        cancelLabelKey: 'confirm.keepEditing',
      });
      if (!confirmed) return;
    }
    setEditingTaskId(null);
    if (goBack) {
      goBack('tasks_reminders_light_mode');
    } else if (setActiveTab) {
      setActiveTab('tasks_reminders_light_mode');
    }
  };

  const handleDelete = async () => {
    if (mutationPending.current || !isEditing || !existingTask) return;
    mutationPending.current = true;
    setIsMutating(true);
    try {
      const confirmed = await confirm({
        variant: 'destructive',
        titleKey: 'confirm.deleteTaskTitle',
        messageKey: 'confirm.deleteTaskDescription',
        confirmLabelKey: 'confirm.delete',
        cancelLabelKey: 'confirm.cancel',
      });
      if (!confirmed) return;
      if (await deleteTask(existingTask.id) !== true) throw new Error('Task deletion not confirmed');
      toast.success(t('toasts.taskDeleted', 'Task deleted'));
      if (typeof goBack === 'function') {
        goBack('tasks_reminders_light_mode');
      } else if (setActiveTab) {
        setActiveTab('tasks_reminders_light_mode');
      }
    } catch {
      toast.error(t('toasts.taskDeleteFailed', 'Task was not safely deleted. Reload before trying again.'));
    } finally {
      mutationPending.current = false;
      setIsMutating(false);
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={false} data-testid="add-edit-task-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {isEditing ? t('tasks.editTask', 'Edit Task') : t('tasks.addTask', 'Add Task')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCancel} disabled={isMutating} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>
      <main className="flex-1 w-full min-w-0 max-w-md lg:max-w-5xl mx-auto px-4 lg:px-8 py-4 pb-28 relative">
        {/* Ambient Backdrop Glow Spots */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-[100px]"></div>
          <div className="absolute top-2/3 -right-20 w-80 h-80 rounded-full bg-teal-100/30 blur-[120px]"></div>
        </div>

        {/* Status Bar */}
        <div className="flex flex-row items-center justify-between w-full px-2 pt-2">
          <span className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium shadow-sm whitespace-nowrap shrink-0" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            {isEditing ? t('tasks.editingTaskNum', { number: taskNumber }) : t('tasks.newTask', 'NEW TASK')}
          </span>
          {isEditing && (
            <button onClick={handleDelete} disabled={isMutating} aria-label={t('tasks.deleteTask', 'Delete Task')} className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>{t('common.delete', 'Delete')}</span>
            </button>
          )}
        </div>

        {/* Main Task Form Surface */}
        <form className="w-full" id="task-edit-form" onSubmit={handleSave}>
          {/* Responsive Layout: 2-Column Grid on Desktop (>= 1024px), Single Column on Mobile */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 items-start gap-5">
            {/* ── LEFT COLUMN (Cols 1-7 on Desktop): Basic Info & Sub-tasks ── */}
            <div className="w-full lg:col-span-7 flex flex-col gap-5">
              {/* Card: Basic Info */}
          <div className="rounded-3xl p-5 space-y-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            {/* Task Title Field */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5" htmlFor="task-title">
                <span>{t('tasks.taskTitle', 'Task Title')}</span>
                <span className="text-xs text-slate-500 font-medium tracking-normal">{t('common.required', 'Required')}</span>
              </label>
              <div className="min-w-0 w-full text-slate-900 placeholder-slate-400 rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between focus-within:border-primary transition-all bg-white border border-slate-200 shadow-sm">
                <input 
                  className="min-w-0 w-0 flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:outline-none text-sm" 
                  id="task-title" 
                  data-testid="task-title-input"
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('tasks.taskTitlePlaceholder', 'e.g. Review Q4 product roadmap')} 
                  autoComplete="off"
                />
                <div className="flex shrink-0 items-center gap-1.5 ps-2 border-s border-slate-200/80">
                  <button onClick={() => setTitle('')} aria-label={t('common.clear', 'Clear')} className="btn-secondary !w-8 !h-8 !min-w-8 !p-1.5" type="button">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                  <button 
                    onClick={toggleListening} 
                    aria-label={isListening ? t('common.listeningClickToStop', 'Listening... click to stop') : t('common.voiceInput', 'Voice Input')} 
                    title={isListening ? t('common.listeningClickToStop', 'Listening... click to stop') : t('common.voiceInput', 'Voice Input')}
                    className={`${isListening ? 'text-rose-500 animate-pulse' : 'text-slate-400 hover:text-slate-600'} transition-colors flex items-center justify-center cursor-pointer`} 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">mic</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">
                {t('tasks.category', 'Category')}
              </label>
              <div aria-label={t('tasks.category', 'Category')} className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="radiogroup">
                {[
                  { name: 'Work', key: 'tasks.work', icon: 'work' },
                  { name: 'Personal', key: 'tasks.personal', icon: 'person' },
                  { name: 'Spiritual', key: 'tasks.spiritual', icon: 'star' },
                  { name: 'Health', key: 'tasks.health', icon: 'favorite' },
                ].map((cat) => (
                  <button 
                    key={cat.name}
                    aria-checked={category === cat.name} 
                    onClick={() => setCategory(cat.name)}
                    className={`rounded-2xl px-4 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
                      category === cat.name ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`} 
                    role="radio" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: category === cat.name ? '"FILL" 1' : 'normal' }}>{cat.icon}</span>
                    <span>{t(cat.key, cat.name)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Level */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">
                {t('tasks.priorityLevel', 'Priority Level')}
              </label>
              <div className="grid grid-cols-4 p-1 rounded-2xl gap-1 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg" role="radiogroup">
                {[
                  { lvl: 'Low', key: 'tasks.priorityLow' },
                  { lvl: 'Medium', key: 'tasks.priorityMed' },
                  { lvl: 'High', key: 'tasks.priorityHigh' },
                  { lvl: 'Urgent', key: 'tasks.priorityUrgent' },
                ].map(({ lvl, key }) => (
                  <button 
                    key={lvl}
                    aria-checked={priority === lvl} 
                    onClick={() => setPriority(lvl)}
                    className={`rounded-2xl py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      priority === lvl ? 'font-semibold bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                    }`} 
                    role="radio" 
                    type="button"
                  >
                    {priority === lvl && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    <span>{t(key, lvl)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
              {/* Sub-tasks Section */}
          <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">
              <span>{t('tasks.subtasks', 'Sub-tasks')} ({subTasks.length})</span>
              <button onClick={handleAddSubTask} className="text-xs text-primary hover:text-primary-light flex items-center gap-1 font-semibold transition-colors cursor-pointer" type="button">
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>{t('tasks.addStep', 'Add Step')}</span>
              </button>
            </div>

            {subTasks.length === 0 ? (
              <span className="text-xs text-slate-500 py-1 block">
                {t('tasks.noSubtasksYet', 'No sub-tasks added yet. Tap "+ Add Step" to create one.')}
              </span>
            ) : (
              <div className="flex flex-col gap-2">
                {subTasks.map((step) => (
                  <div key={step.id} className="flex items-center justify-between p-3 rounded-2xl transition-colors bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleSubTask(step.id);
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer ${
                          step.completed ? 'bg-primary text-white' : 'bg-white border border-slate-300'
                        }`}
                      >
                        {step.completed && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                      </button>
                      <input
                        type="text"
                        placeholder={t('tasks.enterStepTitle', 'Enter step title...')}
                        value={step.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSubTasks(subTasks.map((s) => (s.id === step.id ? { ...s, title: val } : s)));
                        }}
                        className={`text-sm bg-transparent border-none p-0 focus:outline-none flex-1 ${
                          step.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                        }`}
                      />
                    </label>
                    <button 
                      type="button"
                      onClick={() => handleDeleteSubTask(step.id)} 
                      aria-label={t('common.delete', 'Delete')} 
                      className="btn-secondary text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
            </div>

            {/* ── RIGHT COLUMN (Cols 8-12 on Desktop): Schedule, Alerts, Notes & Actions ── */}
            <div className="w-full lg:col-span-5 flex flex-col gap-5">
              {/* Card: Schedule Container */}
          <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5">
              {t('tasks.dateDuration', 'Date & Duration')}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Due Date Tile */}
              <div 
                role="button"
                tabIndex={0}
                data-testid="task-due-date-tile"
                onClick={handleOpenDatePicker}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenDatePicker(); } }}
                aria-label={`Due Date: ${formatDisplayDate(dueDate)}. Tap to change`}
                className="relative overflow-hidden rounded-2xl p-3 flex flex-col items-start gap-1 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg cursor-pointer hover:bg-white/90 active:scale-[0.98] transition-all select-none w-full"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                </div>
                <span className="text-xs text-slate-500 font-medium pointer-events-none">
                  {t('tasks.dueDate', 'Due Date')}
                </span>
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap truncate w-full pointer-events-none">
                  {formatDisplayDate(dueDate)}
                </span>
              </div>

              {/* Start Time Tile */}
              <div 
                role="button"
                tabIndex={0}
                data-testid="task-start-time-tile"
                onClick={handleOpenTimePicker}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenTimePicker(); } }}
                aria-label={`Start Time: ${formatDisplayTime(startTime)}. Tap to change`}
                className="relative overflow-hidden rounded-2xl p-3 flex flex-col items-start gap-1 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg cursor-pointer hover:bg-white/90 active:scale-[0.98] transition-all select-none w-full"
              >
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                </div>
                <span className="text-xs text-slate-500 font-medium pointer-events-none">
                  {t('tasks.startTime', 'Start Time')}
                </span>
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap truncate w-full pointer-events-none">
                  {formatDisplayTime(startTime)}
                </span>
              </div>

              {/* Estimate Tile */}
              <button 
                type="button"
                onClick={() => setIsEstimateModalOpen(true)}
                className="rounded-2xl p-3 flex flex-col items-start gap-1 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg cursor-pointer hover:bg-white/90 active:scale-[0.98] transition-all text-left w-full select-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px]">timelapse</span>
                </div>
                <span className="text-xs text-slate-500 font-medium pointer-events-none">
                  {t('tasks.estimate', 'Estimate')}
                </span>
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap truncate w-full pointer-events-none">
                  {estimate || `45 ${t('common.mins', 'mins')}`}
                </span>
              </button>
            </div>
          </div>
              {/* Card: Alerts */}
          <div className={`rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg relative ${isReminderMenuOpen ? 'z-40' : 'z-10'}`}>
            <div className={`flex items-center justify-between p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg relative ${isReminderMenuOpen ? 'z-30' : 'z-0'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-800">{t('tasks.reminder', 'Reminder')}</span>
                  <span className="text-xs text-slate-500">{reminder}</span>
                </div>
              </div>
              <div className="relative z-50" ref={reminderDropdownRef}>
                <button 
                  onClick={toggleReminderMenu} 
                  className="flex items-center gap-0.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-primary text-xs font-semibold transition-colors cursor-pointer" 
                  type="button"
                  aria-expanded={isReminderMenuOpen}
                  aria-haspopup="listbox"
                >
                  <span>{t('common.change', 'Change')}</span>
                  <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${isReminderMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {isReminderMenuOpen && (
                  <div className="absolute end-0 top-full mt-2 w-48 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl p-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150">
                    {reminderOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectReminder(option)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                          reminder === option
                            ? 'bg-primary text-white font-semibold shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{option}</span>
                        {reminder === option && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div 
              className="flex items-center justify-between p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg relative z-0 cursor-pointer select-none"
              onClick={() => setPersistentAlert((prev) => !prev)}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">{t('routines.persistentAlert', 'Persistent Alert')}</span>
                <span className="text-xs text-slate-500 mt-0.5">{t('routines.keepAlertVisible', 'Keep alert visible until checked')}</span>
              </div>
              <button 
                aria-checked={persistentAlert} 
                onClick={(e) => { e.stopPropagation(); setPersistentAlert((prev) => !prev); }}
                className={`w-12 h-6 rounded-full relative p-0.5 transition-colors duration-200 shadow-inner flex items-center cursor-pointer ${persistentAlert ? 'bg-emerald-500' : 'bg-slate-300'}`} 
                role="switch" 
                type="button"
              >
                <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 block ${persistentAlert ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
              <ReminderTypePicker value={reminderType} onChange={setReminderType} disabled={reminderDisabled({reminder})||isMutating}/>
          {/* Card: Description & Notes Field */}
          <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <label className="text-sm font-semibold tracking-wide text-slate-900 flex items-center justify-between mb-2.5" htmlFor="task-desc">
              <span>{t('tasks.descriptionNotes', 'Description & Notes')}</span>
              <span className="text-xs text-slate-500 font-medium tracking-normal">{description.length} / 200</span>
            </label>
            <textarea 
              className="bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl p-4 w-full focus:outline-none focus:border-primary shadow-inner resize-none text-sm transition-all min-h-[100px]" 
              id="task-desc" 
              rows="3" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('tasks.addDetailsPlaceholder', 'Add details, links, or notes...')} 
            />
          </div>
              {/* Actions Area */}
          <div className="flex flex-col gap-3 pt-2">
            <button data-testid="save-task-btn" onClick={handleSave} disabled={isMutating} className="btn-primary w-full cursor-pointer" type="button">
              <span>{isMutating ? t('common.loading', 'Saving...') : (isEditing ? t('tasks.saveChanges', 'Save Task Changes') : t('tasks.createTask', 'Create Task'))}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <div className={isEditing ? "grid grid-cols-2 gap-3" : "w-full"}>
              <button onClick={handleCancel} disabled={isMutating} className="btn-secondary w-full cursor-pointer" type="button">
                {t('common.cancel', 'Cancel')}
              </button>
              {isEditing && (
                <button onClick={handleDelete} disabled={isMutating} className="btn-danger w-full flex items-center justify-center gap-1.5 cursor-pointer" type="button">
                  <span className="material-symbols-outlined text-[16px]">delete_outline</span>
                  <span>{t('tasks.deleteTask', 'Delete Task')}</span>
                </button>
              )}
            </div>
          </div>
            </div>
          </div>
        </form>
      </main>

      {/* Estimate Picker Modal */}
      {isEstimateModalOpen && (
        <div 
          onClick={() => setIsEstimateModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-3xl p-5 space-y-4 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">timelapse</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{t('tasks.taskEstimate', 'Task Estimate')}</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsEstimateModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">{t('tasks.quickPresets', 'Quick Presets')}</label>
              <div className="grid grid-cols-3 gap-2">
                {['15 mins', '30 mins', '45 mins', '1 hour', '1.5 hours', '2 hours'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setEstimate(preset);
                      setIsEstimateModalOpen(false);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      estimate === preset
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">{t('tasks.customDuration', 'Custom Duration')}</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={t('tasks.estimatePlaceholder', 'e.g. 25 mins or 3 hours')}
                  defaultValue={estimate}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (e.target.value.trim()) setEstimate(e.target.value.trim());
                      setIsEstimateModalOpen(false);
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-900 focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling;
                    if (input && input.value.trim()) setEstimate(input.value.trim());
                    setIsEstimateModalOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-sm hover:bg-primary transition-colors cursor-pointer"
                >
                  {t('common.done', 'Done')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Universal Date Picker Modal */}
      <MomentumDatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        value={getIsoDate(dueDate)}
        onSelect={(newDate) => setDueDate(newDate)}
        title={t('tasks.selectDueDate', 'Select Due Date')}
        isDark={false}
      />

      {/* Universal Time Picker Modal */}
      <MomentumTimePicker
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
        value={startTime}
        onSelect={(newTime) => setStartTime(newTime)}
        title={t('tasks.selectStartTime', 'Select Start Time')}
        isDark={false}
      />
    </>
  );
}
