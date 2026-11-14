import React, { useState, useEffect, useRef } from 'react';
import UserAvatar from './components/UserAvatar';
import { CheckSquare, ArrowLeft } from 'lucide-react';
import { useTaskStore } from './store/useTaskStore';

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

export default function AddEditTaskDarkMode({ setActiveTab, goBack }) {
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
  const [persistentAlert, setPersistentAlert] = useState(() => Boolean(existingTask?.persistentAlert));
  const [description, setDescription] = useState(existingTask?.description || '');
  const [subTasks, setSubTasks] = useState(existingTask?.subTasks ? [...existingTask.subTasks] : []);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isReminderMenuOpen, setIsReminderMenuOpen] = useState(false);

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const reminderDropdownRef = useRef(null);

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || '');
      setCategory(existingTask.category || 'Work');
      setPriority(existingTask.priority || 'High');
      setDueDate(existingTask.dueDate || getCurrentIsoDate());
      setStartTime(existingTask.startTime || getCurrentDisplayTime());
      setEstimate(existingTask.estimate || '45 mins');
      setReminder(existingTask.reminder || '15 minutes before');
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
      alert('Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
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

  const handleOpenDatePicker = (e) => {
    if (dateInputRef.current) {
      try {
        if (typeof dateInputRef.current.showPicker === 'function') {
          dateInputRef.current.showPicker();
          return;
        }
      } catch (err) {
        // Fallback
      }
      dateInputRef.current.focus();
    }
  };

  const handleOpenTimePicker = (e) => {
    if (timeInputRef.current) {
      try {
        if (typeof timeInputRef.current.showPicker === 'function') {
          timeInputRef.current.showPicker();
          return;
        }
      } catch (err) {
        // Fallback
      }
      timeInputRef.current.focus();
    }
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

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const cleanTitle = title.trim() || 'Untitled Task';
    const finalDueDate = dueDate || getCurrentIsoDate();
    const finalStartTime = startTime || getCurrentDisplayTime();
    if (isEditing && existingTask) {
      const updatedTask = {
        ...existingTask,
        title: cleanTitle,
        category,
        priority,
        dueDate: finalDueDate,
        startTime: finalStartTime,
        estimate,
        reminder,
        persistentAlert: Boolean(persistentAlert),
        description,
        subTasks,
      };
      updateTask(updatedTask);
    } else {
      addTask({
        title: cleanTitle,
        category,
        priority,
        dueDate: finalDueDate,
        startTime: finalStartTime,
        estimate,
        reminder,
        persistentAlert: Boolean(persistentAlert),
        description,
        subTasks,
      });
    }
    setEditingTaskId(null);
    if (setActiveTab) {
      setActiveTab('tasks_reminders_dark_mode');
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    if (goBack) {
      goBack('tasks_reminders_dark_mode');
    } else if (setActiveTab) {
      setActiveTab('tasks_reminders_dark_mode');
    }
  };

  const handleDelete = () => {
    if (isEditing && existingTask) {
      deleteTask(existingTask.id);
    }
    setEditingTaskId(null);
    if (setActiveTab) {
      setActiveTab('tasks_reminders_dark_mode');
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {isEditing ? 'Edit Task' : 'Add Task'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCancel} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 space-y-5 pb-20 relative">
        {/* Ambient Backdrop Glow Spots */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-[100px]"></div>
          <div className="absolute top-2/3 -right-20 w-80 h-80 rounded-full bg-teal-900/10 blur-[120px]"></div>
        </div>

        {/* Status Bar */}
        <div className="flex flex-row items-center justify-between w-full px-2 pt-2">
          <span className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-slate-900/80 border border-slate-800 text-teal-400 text-xs font-medium shadow-sm whitespace-nowrap shrink-0">
            &bull; {isEditing ? `EDITING TASK #${taskNumber}` : 'NEW TASK'}
          </span>
          {isEditing && (
            <button onClick={handleDelete} aria-label="Delete Task" className="h-9 px-3.5 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0" type="button">
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete</span>
            </button>
          )}
        </div>

        {/* Main Task Form Surface */}
        <form className="flex flex-col gap-5" id="task-edit-form" onSubmit={handleSave}>
          
          {/* Card: Basic Info */}
          <div className="rounded-3xl p-5 space-y-5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            {/* Task Title Field */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold tracking-wide text-white flex items-center justify-between mb-2.5" htmlFor="task-title">
                <span>Task Title</span>
                <span className="text-xs text-slate-400 font-medium tracking-normal">Required</span>
              </label>
              <div className="text-white placeholder-slate-500 rounded-2xl px-4 py-3 flex items-center justify-between focus-within:border-primary transition-all bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <input 
                  className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-sm" 
                  id="task-title" 
                  type="text" 
                  placeholder="e.g. Review Q4 product roadmap"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <button onClick={() => setTitle('')} aria-label="Clear Title" className="btn-secondary" type="button">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                  <button 
                    onClick={toggleListening} 
                    aria-label={isListening ? "Listening... click to stop" : "Voice Input"} 
                    title={isListening ? "Listening... click to stop" : "Voice Input"}
                    className={`${isListening ? 'text-rose-400 animate-pulse' : 'text-slate-500 hover:text-slate-300'} transition-colors flex items-center justify-center`} 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">mic</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold tracking-wide text-white flex items-center justify-between mb-2.5">Category</label>
              <div aria-label="Task Category" className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="radiogroup">
                {[
                  { name: 'Work', icon: 'work' },
                  { name: 'Personal', icon: 'person' },
                  { name: 'Spiritual', icon: 'star' },
                  { name: 'Health', icon: 'favorite' },
                ].map((cat) => (
                  <button 
                    key={cat.name}
                    aria-checked={category === cat.name} 
                    onClick={() => setCategory(cat.name)}
                    className={`rounded-2xl px-4 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors shrink-0 ${
                      category === cat.name ? 'bg-primary text-white shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`} 
                    role="radio" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: category === cat.name ? '"FILL" 1' : 'normal' }}>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Level */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold tracking-wide text-white flex items-center justify-between mb-2.5">Priority Level</label>
              <div className="grid grid-cols-4 p-1 rounded-2xl gap-1 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl" role="radiogroup">
                {['Low', 'Medium', 'High', 'Urgent'].map((lvl) => (
                  <button 
                    key={lvl}
                    aria-checked={priority === lvl} 
                    onClick={() => setPriority(lvl)}
                    className={`rounded-2xl py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                      priority === lvl ? 'font-semibold bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
                    }`} 
                    role="radio" 
                    type="button"
                  >
                    {priority === lvl && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    <span>{lvl}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Schedule Container */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <label className="text-sm font-semibold tracking-wide text-white flex items-center justify-between mb-2.5">Date &amp; Duration</label>
            
            <div className="grid grid-cols-3 gap-2.5">
              {/* Due Date Tile */}
              <label 
                htmlFor="task-due-date-input"
                onClick={handleOpenDatePicker}
                className="relative overflow-hidden rounded-2xl p-3 flex flex-col items-start gap-1 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer hover:bg-white/5 active:scale-[0.98] transition-all select-none w-full"
              >
                <input 
                  ref={dateInputRef}
                  id="task-due-date-input"
                  type="date" 
                  value={getIsoDate(dueDate)} 
                  onChange={handleDateChange} 
                  className="sr-only [color-scheme:dark]" 
                  tabIndex={-1}
                  aria-label="Select due date" 
                />
                <div className="w-8 h-8 rounded-full bg-blue-950/60 text-blue-400 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                </div>
                <span className="text-xs text-slate-400 font-medium pointer-events-none">Due Date</span>
                <span className="text-xs font-semibold text-white whitespace-nowrap truncate w-full pointer-events-none">
                  {formatDisplayDate(dueDate)}
                </span>
              </label>

              {/* Start Time Tile */}
              <label 
                htmlFor="task-start-time-input"
                onClick={handleOpenTimePicker}
                className="relative overflow-hidden rounded-2xl p-3 flex flex-col items-start gap-1 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer hover:bg-white/5 active:scale-[0.98] transition-all select-none w-full"
              >
                <input 
                  ref={timeInputRef}
                  id="task-start-time-input"
                  type="time" 
                  value={getIsoTime(startTime)} 
                  onChange={handleTimeChange} 
                  className="sr-only [color-scheme:dark]" 
                  tabIndex={-1}
                  aria-label="Select start time" 
                />
                <div className="w-8 h-8 rounded-full bg-teal-950/60 text-teal-400 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                </div>
                <span className="text-xs text-slate-400 font-medium pointer-events-none">Start Time</span>
                <span className="text-xs font-semibold text-white whitespace-nowrap truncate w-full pointer-events-none">
                  {formatDisplayTime(startTime)}
                </span>
              </label>

              {/* Estimate Tile */}
              <button 
                type="button"
                onClick={() => setIsEstimateModalOpen(true)}
                className="rounded-2xl p-3 flex flex-col items-start gap-1 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl cursor-pointer hover:bg-white/5 active:scale-[0.98] transition-all text-left w-full select-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[16px]">timelapse</span>
                </div>
                <span className="text-xs text-slate-400 font-medium pointer-events-none">Estimate</span>
                <span className="text-xs font-semibold text-white whitespace-nowrap truncate w-full pointer-events-none">
                  {estimate || '45 mins'}
                </span>
              </button>
            </div>
          </div>

          {/* Card: Alerts */}
          <div className={`rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative ${isReminderMenuOpen ? 'z-40' : 'z-10'}`}>
            <div className={`flex items-center justify-between p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative ${isReminderMenuOpen ? 'z-30' : 'z-0'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Reminder</span>
                  <span className="text-xs text-slate-400">{reminder}</span>
                </div>
              </div>
              <div className="relative z-50" ref={reminderDropdownRef}>
                <button 
                  onClick={toggleReminderMenu} 
                  className="flex items-center gap-0.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-primary text-xs font-semibold transition-colors" 
                  type="button"
                  aria-expanded={isReminderMenuOpen}
                  aria-haspopup="listbox"
                >
                  <span>Change</span>
                  <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${isReminderMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {isReminderMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl p-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150">
                    {reminderOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectReminder(option)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                          reminder === option
                            ? 'bg-primary text-white font-semibold shadow-sm'
                            : 'text-slate-300 hover:bg-white/10'
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
              className="flex items-center justify-between p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative z-0 cursor-pointer select-none"
              onClick={() => setPersistentAlert((prev) => !prev)}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Persistent Alert</span>
                <span className="text-xs text-slate-400 mt-0.5">Keep alert visible until checked</span>
              </div>
              <button 
                aria-checked={persistentAlert} 
                onClick={(e) => { e.stopPropagation(); setPersistentAlert((prev) => !prev); }}
                className={`w-12 h-6 rounded-full relative p-0.5 transition-colors duration-200 shadow-inner flex items-center ${persistentAlert ? 'bg-emerald-500' : 'bg-slate-700'}`} 
                role="switch" 
                type="button"
              >
                <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 block ${persistentAlert ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>

          {/* Card: Description & Notes Field */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <label className="text-sm font-semibold tracking-wide text-white flex items-center justify-between mb-2.5" htmlFor="task-desc">
              <span>Description &amp; Notes</span>
              <span className="text-xs text-slate-400 font-medium tracking-normal">{description.length} / 200</span>
            </label>
            <textarea 
              className="bg-slate-900/60 border border-slate-800 text-white placeholder-slate-500 rounded-2xl p-4 w-full focus:outline-none focus:border-primary shadow-inner resize-none text-sm transition-all min-h-[100px]" 
              id="task-desc" 
              rows="3" 
              placeholder="Add details, links, or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            ></textarea>
          </div>

          {/* Card: Sub-tasks Section */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="text-sm font-semibold tracking-wide text-white flex items-center justify-between mb-2.5">
              <span>Sub-tasks ({subTasks.length})</span>
              <button onClick={handleAddStep} className="btn-primary" type="button">
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Step</span>
              </button>
            </div>
            
            {subTasks.length === 0 ? (
              <p className="text-xs text-slate-400 py-1">No sub-tasks added yet. Tap "+ Add Step" to create one.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {subTasks.map((step) => (
                  <div key={step.id} className="flex items-center justify-between p-3 rounded-2xl transition-colors bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleSubTask(step.id);
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer ${
                          step.completed ? 'bg-primary text-white' : 'bg-slate-900 border border-slate-700'
                        }`}
                      >
                        {step.completed && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                      </button>
                      <input
                        type="text"
                        placeholder="Enter step title..."
                        value={step.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSubTasks(subTasks.map((s) => (s.id === step.id ? { ...s, title: val } : s)));
                        }}
                        className={`text-sm bg-transparent border-none p-0 focus:outline-none flex-1 ${
                          step.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                        }`}
                      />
                    </label>
                    <button 
                      type="button"
                      onClick={() => handleDeleteSubTask(step.id)} 
                      aria-label="Delete step" 
                      className="btn-secondary text-slate-400 hover:text-slate-300 transition-colors p-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions Area */}
          <div className="flex flex-col gap-3 pt-2">
            <button onClick={handleSave} className="btn-primary w-full" type="button">
              <span>{isEditing ? 'Save Task Changes' : 'Create Task'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <div className={isEditing ? "grid grid-cols-2 gap-3" : "w-full"}>
              <button onClick={handleCancel} className="btn-secondary w-full" type="button">
                Cancel
              </button>
              {isEditing && (
                <button onClick={handleDelete} className="btn-danger w-full" type="button">
                  <span className="material-symbols-outlined text-[16px]">delete_outline</span>
                  Delete Task
                </button>
              )}
            </div>
          </div>

        </form>
      </main>

      {/* Estimate Picker Modal */}
      {isEstimateModalOpen && (
        <div 
          onClick={() => setIsEstimateModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-3xl p-5 space-y-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">timelapse</span>
                </div>
                <h3 className="text-sm font-bold text-white">Task Estimate</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEstimateModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Quick Presets</label>
              <div className="grid grid-cols-3 gap-2">
                {['15 mins', '30 mins', '45 mins', '1 hour', '1.5 hours', '2 hours'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setEstimate(preset);
                      setIsEstimateModalOpen(false);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                      estimate === preset
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Custom Duration</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. 25 mins or 3 hours"
                  value={estimate}
                  onChange={(e) => setEstimate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setIsEstimateModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-primary text-white shadow-sm hover:bg-primary transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
