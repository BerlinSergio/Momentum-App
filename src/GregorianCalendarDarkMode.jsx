import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import {
  ArrowLeft, Calendar, ChevronLeft, ChevronDown, ChevronRight,
  ArrowLeftRight, Banknote, CheckCircle2, Briefcase, Clock,
  Heart, Plus, Trash2, X, CalendarDays
} from 'lucide-react';
import { useCalendarStore } from './store/useCalendarStore.js';
import { useTaskStore } from './store/useTaskStore.js';
import { useFinanceStore } from './store/useFinanceStore.js';
import { useRoutineStore, isRoutineScheduledForDate, isRoutineCompletedForDate } from './store/useRoutineStore.js';
import { useAppTime } from './hooks/useAppTime.js';
import { getShamsiDate, getIslamicDateParts } from './utils/afghanCalendar.js';
import { MomentumDatePicker, MomentumTimePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDayOfYearStats(date) {
  const year = date.getFullYear();
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000) + 1;
  const daysRemaining = totalDays - dayOfYear;
  const weekNumber = Math.ceil((dayOfYear + startOfYear.getDay()) / 7);
  return { dayOfYear, totalDays, daysRemaining, weekNumber };
}

export default function GregorianCalendarDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { currentYear, currentMonth, currentDay, effectiveTimezone } = useAppTime();
  const [viewYear, setViewYear] = useState(() => currentYear);
  const [viewMonth, setViewMonth] = useState(() => currentMonth - 1);
  const [selectedDay, setSelectedDay] = useState(() => currentDay);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  // Add Event Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Work');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('10:00 AM – 11:00 AM');
  const [formNote, setFormNote] = useState('');

  // Global Persistent Stores (Zustand)
  const { events: calendarEvents, addEvent: addCalendarEvent, toggleEvent: toggleCalendarEvent, deleteEvent: deleteCalendarEvent } = useCalendarStore();
  const { tasks, addTask, toggleTaskStatus, deleteTask } = useTaskStore();
  const { transactions, addTransaction, deleteTransaction } = useFinanceStore();
  const { routines, toggleRoutineCompletion } = useRoutineStore();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDay(1);
  };

  const selectedDate = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const clampedDay = Math.min(selectedDay, daysInMonth);
    return new Date(viewYear, viewMonth, clampedDay, 12, 0, 0);
  }, [viewYear, viewMonth, selectedDay]);

  const selectedIslamic = useMemo(() => {
    return getIslamicDateParts(selectedDate, effectiveTimezone);
  }, [selectedDate, effectiveTimezone]);

  const selectedShamsi = useMemo(() => {
    return getShamsiDate(selectedDate, effectiveTimezone);
  }, [selectedDate, effectiveTimezone]);

  const dayOfYearStats = useMemo(() => {
    return getDayOfYearStats(selectedDate);
  }, [selectedDate]);

  const calendarGrid = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const prevMonthTotalDays = new Date(viewYear, viewMonth, 0).getDate();
    const prevSpacers = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      prevSpacers.push(prevMonthTotalDays - i);
    }
    const currentDays = [];
    for (let d = 1; d <= daysInMonth; d++) {
      currentDays.push(d);
    }
    const totalCells = prevSpacers.length + currentDays.length;
    const totalRows = Math.ceil(totalCells / 7);
    const nextSpacersCount = totalRows * 7 - totalCells;
    const nextSpacers = [];
    for (let i = 1; i <= nextSpacersCount; i++) {
      nextSpacers.push(i);
    }
    return { prevSpacers, currentDays, nextSpacers };
  }, [viewYear, viewMonth]);

  const allGlobalEvents = useMemo(() => {
    const list = [];
    const seen = new Set();
    (calendarEvents || []).forEach((evt) => {
      let gYear = Number(evt.gregorianYear);
      let gMonth = Number(evt.gregorianMonth);
      let gDay = Number(evt.gregorianDay);
      if ((!gYear || !gMonth || !gDay) && evt.date) {
        const parts = evt.date.split('-');
        if (parts.length === 3) {
          gYear = parseInt(parts[0], 10);
          gMonth = parseInt(parts[1], 10);
          gDay = parseInt(parts[2], 10);
        }
      }
      if (gYear && gMonth && gDay) {
        const key = `${evt.title.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
        seen.add(key);
        list.push({
          id: evt.id,
          sourceId: evt.id,
          source: 'calendar',
          title: evt.title,
          date: evt.date,
          gregorianYear: gYear,
          gregorianMonth: gMonth,
          gregorianDay: gDay,
          time: evt.time || '10:00 AM',
          category: evt.category || 'Personal',
          completed: !!evt.completed,
          note: evt.note || '',
        });
      }
    });
    (tasks || []).forEach((t) => {
      if (t.dueDate) {
        const parts = t.dueDate.split('-');
        if (parts.length === 3) {
          const gYear = parseInt(parts[0], 10);
          const gMonth = parseInt(parts[1], 10);
          const gDay = parseInt(parts[2], 10);
          const key = `${t.title.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
          if (!seen.has(key)) {
            seen.add(key);
            list.push({
              id: `task-${t.id}`,
              sourceId: t.id,
              source: 'task',
              title: t.title,
              date: t.dueDate,
              gregorianYear: gYear,
              gregorianMonth: gMonth,
              gregorianDay: gDay,
              time: t.startTime ? `${t.startTime}${t.estimate ? ` (${t.estimate})` : ''}` : 'Task Due',
              category: t.category || 'Work',
              completed: t.status === 'done',
              note: t.description || '',
            });
          }
        }
      }
    });
    (transactions || []).forEach((tx) => {
      if (tx.date) {
        const parts = tx.date.split('-');
        if (parts.length === 3) {
          const gYear = parseInt(parts[0], 10);
          const gMonth = parseInt(parts[1], 10);
          const gDay = parseInt(parts[2], 10);
          const formattedAmount = `${tx.type === 'income' ? '+' : '-'}${tx.currency === 'AFN' ? `${tx.amount} افـ` : tx.currency === 'EUR' ? `€${tx.amount}` : `$${tx.amount}`}`;
          const displayTitle = `${tx.title || tx.category || 'Transaction'} (${formattedAmount})`;
          const key = `${displayTitle.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
          if (!seen.has(key)) {
            seen.add(key);
            list.push({
              id: `fin-${tx.id}`,
              sourceId: tx.id,
              source: 'finance',
              title: displayTitle,
              date: tx.date,
              gregorianYear: gYear,
              gregorianMonth: gMonth,
              gregorianDay: gDay,
              time: tx.time || (tx.type === 'income' ? 'Income Scheduled' : 'Expense Recorded'),
              category: 'Finance',
              completed: tx.status === 'Settled' || tx.status === 'Paid',
              note: tx.notes || tx.payerName || '',
            });
          }
        }
      }
    });
    const todayY = currentYear;
    const todayM = currentMonth;
    const todayD = currentDay;
    const routineDateKey = `${todayY}-${String(todayM).padStart(2, '0')}-${String(todayD).padStart(2, '0')}`;
    (routines || []).forEach((r) => {
      if (!isRoutineScheduledForDate(r, routineDateKey)) return;
      const key = `${r.title.toLowerCase().trim()}_${routineDateKey}`;
      if (!seen.has(key)) {
        seen.add(key);
        list.push({
          id: `routine-${r.id}`,
          sourceId: r.id,
          source: 'routine',
          title: r.title,
          date: routineDateKey,
          gregorianYear: todayY,
          gregorianMonth: todayM,
          gregorianDay: todayD,
          time: r.time || 'Daily Routine',
          category: r.category && r.category.toLowerCase().includes('work') ? 'Work' : 'Personal',
          completed: isRoutineCompletedForDate(r, routineDateKey),
          note: r.notes || '',
        });
      }
    });
    return list;
  }, [calendarEvents, tasks, transactions, routines, currentYear, currentMonth, currentDay]);

  const monthEvents = useMemo(() => {
    return allGlobalEvents.filter((e) => {
      const gYear = Number(e.gregorianYear);
      const gMonth = Number(e.gregorianMonth);
      return gYear === viewYear && gMonth === viewMonth + 1;
    });
  }, [allGlobalEvents, viewYear, viewMonth]);

  const daysWithEvents = useMemo(() => {
    const set = new Set();
    monthEvents.forEach((e) => {
      set.add(Number(e.gregorianDay));
    });
    return set;
  }, [monthEvents]);

  const dayEvents = useMemo(() => {
    return monthEvents.filter((e) => Number(e.gregorianDay) === selectedDay);
  }, [monthEvents, selectedDay]);

  const filteredEvents = useMemo(() => {
    return dayEvents.filter((e) => {
      if (activeCategory === 'All') return true;
      const cat = (e.category || '').toLowerCase();
      if (activeCategory === 'Work') {
        return cat.includes('work') || cat.includes('task') || cat.includes('logistics') || cat.includes('business');
      }
      if (activeCategory === 'Finance') {
        return cat.includes('finance');
      }
      if (activeCategory === 'Personal') {
        return cat.includes('personal') || cat.includes('cultural') || cat.includes('home') || cat.includes('family') || cat.includes('health') || cat.includes('spiritual');
      }
      return cat === activeCategory.toLowerCase();
    });
  }, [dayEvents, activeCategory]);

  const categoryCounts = useMemo(() => {
    let work = 0;
    let finance = 0;
    let personal = 0;
    monthEvents.forEach((e) => {
      const cat = (e.category || '').toLowerCase();
      if (cat.includes('work') || cat.includes('task') || cat.includes('logistics') || cat.includes('business')) {
        work++;
      } else if (cat.includes('finance')) {
        finance++;
      } else {
        personal++;
      }
    });
    return { all: monthEvents.length, work, finance, personal };
  }, [monthEvents]);

  const handleToggleEvent = (evt) => {
    if (evt.source === 'task') {
      toggleTaskStatus(evt.sourceId);
    } else if (evt.source === 'routine') {
      toggleRoutineCompletion(evt.sourceId, evt.date);
    } else if (evt.source === 'calendar') {
      toggleCalendarEvent(evt.sourceId);
    }
  };

  const handleDeleteEvent = (evt) => {
    if (evt.source === 'task') {
      deleteTask(evt.sourceId);
      toast.success(t('toasts.taskDeleted', 'Task deleted'));
    } else if (evt.source === 'finance') {
      deleteTransaction(evt.sourceId);
      toast.success(t('toasts.transactionDeleted', 'Transaction deleted'));
    } else if (evt.source === 'calendar') {
      deleteCalendarEvent(evt.sourceId);
      toast.success(t('toasts.eventDeleted', 'Event deleted'));
    }
  };

  const handleOpenAddModal = () => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(selectedDay).padStart(2, '0');
    setFormDate(`${viewYear}-${mStr}-${dStr}`);
    setFormTitle('');
    setFormCategory('Work');
    setFormTime('10:00 AM – 11:00 AM');
    setFormNote('');
    setIsAddModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    if (e) e.preventDefault();
    if (!formTitle.trim()) return;
    let targetYear = viewYear;
    let targetMonth = viewMonth + 1;
    let targetDay = selectedDay;
    if (formDate) {
      const parts = formDate.split('-');
      if (parts.length === 3) {
        targetYear = parseInt(parts[0], 10);
        targetMonth = parseInt(parts[1], 10);
        targetDay = parseInt(parts[2], 10);
      }
    }
    addCalendarEvent({
      title: formTitle.trim(),
      date: formDate,
      gregorianYear: targetYear,
      gregorianMonth: targetMonth,
      gregorianDay: targetDay,
      time: formTime || '10:00 AM',
      category: formCategory,
      note: formNote.trim(),
      completed: false,
    });
    if (formCategory === 'Work') {
      addTask({
        title: formTitle.trim(),
        dueDate: formDate,
        startTime: formTime || '10:00 AM',
        category: 'Work',
        description: formNote.trim(),
        status: 'todo',
      });
    } else if (formCategory === 'Finance') {
      addTransaction({
        title: formTitle.trim(),
        date: formDate,
        amount: 0,
        currency: 'USD',
        type: 'expense',
        category: 'General',
        notes: formNote.trim(),
        status: 'Scheduled',
      });
    }
    setViewYear(targetYear);
    setViewMonth(targetMonth - 1);
    setSelectedDay(targetDay);
    setIsAddModalOpen(false);
    toast.success(t('toasts.eventAdded', 'Event added to calendar'));
  };

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('calendar.gregorianCalendar', 'Gregorian Calendar')}</h1>
</div>
<div className="flex items-center gap-2">
          <button type="button" aria-label="Go back" data-testid="calendar-back-btn" onClick={() => (goBack ? goBack('calendars_main_dark_mode') : (setActiveTab ? setActiveTab('calendars_main_dark_mode') : window.history.back()))} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"><ArrowLeft className="w-5 h-5 rtl:rotate-180 transition-transform"/></button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </MomentumGlassHeader>

      <main className="flex-1 flex flex-col w-full pb-[120px] bg-transparent relative z-10">
        {/* MAIN CALENDAR CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button onClick={handlePrevMonth} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <ChevronLeft className="w-4 h-4"/>
              </button>
              <button onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)} className="flex items-center gap-1.5 px-3 py-1 rounded-xl hover:bg-white/5 transition-colors">
                <h2 className="text-lg font-bold text-white">{MONTH_NAMES[viewMonth]} {viewYear}</h2>
                <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-200 ${isMonthPickerOpen ? 'rotate-180' : ''}`}/>
              </button>
              <button onClick={handleNextMonth} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <ChevronRight className="w-4 h-4"/>
              </button>
            </div>

            {/* Month Picker Dropdown */}
            {isMonthPickerOpen && (
              <div className="p-4 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl space-y-3 z-30 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <button onClick={() => setViewYear((y) => y - 1)} className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-300 hover:bg-slate-700">&larr; {viewYear - 1}</button>
                  <span className="text-sm font-bold text-white">{t('calendar.selectMonth', 'Select Month')}</span>
                  <button onClick={() => setViewYear((y) => y + 1)} className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-300 hover:bg-slate-700">{viewYear + 1} &rarr;</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {MONTH_SHORT.map((mName, idx) => (
                    <button key={mName} onClick={() => { setViewMonth(idx); setIsMonthPickerOpen(false); setSelectedDay(1); }} className={`py-1.5 text-xs font-semibold rounded-xl transition-colors ${viewMonth === idx ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{mName}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-primary"/>
              <span>{selectedIslamic.hm} {selectedIslamic.hy} AH • {selectedShamsi.monthInfo.nameEn} {selectedShamsi.jy} SH</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button onClick={() => setActiveCategory('All')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex-shrink-0 transition-all ${activeCategory === 'All' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {t('calendar.allEvents', 'All Events')} {categoryCounts.all}
            </button>
            <button onClick={() => setActiveCategory('Work')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex-shrink-0 transition-all ${activeCategory === 'Work' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {t('calendar.workTasks', 'Work & Tasks')} {categoryCounts.work}
            </button>
            <button onClick={() => setActiveCategory('Finance')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex-shrink-0 transition-all ${activeCategory === 'Finance' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {t('calendar.finance', 'Finance')} {categoryCounts.finance}
            </button>
            <button onClick={() => setActiveCategory('Personal')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex-shrink-0 transition-all ${activeCategory === 'Personal' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {t('calendar.personal', 'Personal')} {categoryCounts.personal}
            </button>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 mt-2">
            {WEEKDAY_NAMES.map((day) => (
              <div key={day} className={`text-xs text-center pb-2 ${day === 'Fri' ? 'text-primary font-bold' : 'font-semibold text-slate-500'}`}>
                {day}
              </div>
            ))}

            {/* Previous Month Days */}
            {calendarGrid.prevSpacers.map((d) => (
              <button key={`prev-${d}`} onClick={() => { handlePrevMonth(); setSelectedDay(d); }} className="aspect-square flex flex-col items-center justify-center rounded-full text-slate-600 font-normal hover:bg-slate-800/60 transition-colors">
                {d}
              </button>
            ))}

            {/* Current Month Days */}
            {calendarGrid.currentDays.map((d) => {
              const isSelected = d === selectedDay;
              const hasEvents = daysWithEvents.has(d);
              const isToday = viewYear === currentYear && (viewMonth + 1) === currentMonth && d === currentDay;
              if (isSelected) {
                return (
                  <button key={`curr-${d}`} onClick={() => setSelectedDay(d)} className="aspect-square w-9 h-9 mx-auto rounded-full bg-primary text-white font-bold flex flex-col items-center justify-center shadow-lg shadow-primary/30 relative">
                    <span>{d}</span>
                    <span className="w-1 h-1 rounded-full bg-white absolute bottom-1.5"></span>
                  </button>
                );
              }
              return (
                <button
                  key={`curr-${d}`}
                  onClick={() => setSelectedDay(d)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-full font-medium hover:bg-slate-800 transition-colors relative ${
                    isToday ? 'border border-primary/60 text-primary font-bold' : 'text-slate-200'
                  }`}
                >
                  <span>{d}</span>
                  {hasEvents && <span className="w-1 h-1 rounded-full bg-primary mt-0.5"></span>}
                </button>
              );
            })}

            {/* Next Month Days */}
            {calendarGrid.nextSpacers.map((d) => (
              <button key={`next-${d}`} onClick={() => { handleNextMonth(); setSelectedDay(d); }} className="aspect-square flex flex-col items-center justify-center rounded-full text-slate-600 font-normal hover:bg-slate-800/60 transition-colors">
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* SELECTED DAY & EVENTS CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex flex-col gap-1.5 mb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white leading-tight">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/15 border border-violet-500/30 text-violet-400">
                {selectedIslamic.hd} {selectedIslamic.hm} • {selectedShamsi.jd} {selectedShamsi.monthInfo.nameEn}
              </span>
            </div>
            <p className="text-xs font-normal text-slate-400">
              {t('calendar.dayOfYearStats', 'Day {{day}} of {{total}} • Week {{week}} • {{remaining}} days remaining in {{year}}', {
                day: dayOfYearStats.dayOfYear,
                total: dayOfYearStats.totalDays,
                week: dayOfYearStats.weekNumber,
                remaining: dayOfYearStats.daysRemaining,
                year: viewYear
              })}
            </p>
          </div>

          {/* Event Items */}
          {filteredEvents.length === 0 ? (
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
              <CalendarDays className="w-10 h-10 text-slate-600 stroke-1" />
              <p className="text-xs font-medium text-slate-400">{t('calendar.noEventsDay', 'No events scheduled for this day')}</p>
              <p className="text-[11px] text-slate-500">{t('calendar.tapAddGregorianEvent', 'Tap below to add a new Gregorian event')}</p>
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const cat = (evt.category || '').toLowerCase();
              const isFinance = cat.includes('finance');
              const isPersonal = cat.includes('personal') || cat.includes('cultural') || cat.includes('home') || cat.includes('family') || cat.includes('health') || cat.includes('spiritual');
              return (
                <div key={evt.id} className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isFinance ? 'bg-teal-500/15 text-teal-400' : isPersonal ? 'bg-violet-500/15 text-violet-400' : 'bg-primary/15 text-primary'}`}>
                      {isFinance ? <Banknote className="w-4 h-4"/> : isPersonal ? <Heart className="w-4 h-4"/> : <Briefcase className="w-4 h-4"/>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-white truncate">{evt.title}</h4>
                      <p className="text-[11px] font-normal text-slate-400 truncate">{evt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0 gap-1.5">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${isFinance ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30' : isPersonal ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30' : 'bg-primary/15 text-primary border border-primary/30'}`}>
                      {evt.category ? t('calendar.' + evt.category.toLowerCase(), evt.category) : t('calendar.work', 'Work')}
                    </span>
                    <button onClick={() => handleToggleEvent(evt)} className="p-1 rounded-lg hover:bg-white/10 transition-colors" title={t('calendar.toggleStatus', 'Toggle status')}>
                      {evt.completed ? <CheckCircle2 className="w-4 h-4 text-teal-500"/> : <Clock className="w-4 h-4 text-slate-500"/>}
                    </button>
                    <button onClick={() => handleDeleteEvent(evt)} className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title={t('calendar.deleteEvent', 'Delete event')}>
                      <Trash2 className="w-3.5 h-3.5"/>
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* Add Gregorian Event Button */}
          <button
            type="button"
            data-testid="add-event-btn"
            aria-label="Add Event"
            onClick={handleOpenAddModal} 
            className="btn-primary w-full mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t('calendar.addGregorianEvent', 'Add Gregorian Event')}</span>
          </button>
        </div>
      </main>

        {/* Add Event Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl p-5 shadow-2xl relative bg-slate-900 border border-white/10 text-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{t('calendar.addGregorianEvent', 'Add Gregorian Event')}</h3>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
              </div>
            <form onSubmit={handleSaveEvent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{t('calendar.eventTitle', 'Event Title')}</label>
                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder={t('calendar.eventTitlePlaceholder', 'e.g. Quarterly Investment Review')} required autoFocus className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{t('calendar.category', 'Category')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Work', 'Finance', 'Personal'].map((cat) => (
                    <button type="button" key={cat} onClick={() => setFormCategory(cat)} className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${formCategory === cat ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30' : 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700'}`}>{t('calendar.' + cat.toLowerCase(), cat)}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('calendar.date', 'Date')}</label>
                  <button
                    type="button"
                    data-testid="event-date-tile"
                    onClick={() => setIsDatePickerOpen(true)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-white focus:outline-none focus:border-primary cursor-pointer hover:bg-slate-750"
                  >
                    {formDate || t('calendar.selectDate', 'Select Date')}
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('calendar.time', 'Time')}</label>
                  <button
                    type="button"
                    data-testid="event-time-tile"
                    onClick={() => setIsTimePickerOpen(true)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary cursor-pointer hover:bg-slate-750"
                  >
                    {formTime || t('calendar.selectTime', 'Select Time')}
                  </button>
                </div>
              </div>

              <MomentumDatePicker
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                value={formDate}
                onSelect={(newDate) => setFormDate(newDate)}
                title={t('calendar.selectEventDate', 'Select Event Date')}
                isDark={true}
              />

              <MomentumTimePicker
                isOpen={isTimePickerOpen}
                onClose={() => setIsTimePickerOpen(false)}
                value={formTime}
                onSelect={(newTime) => setFormTime(newTime)}
                title={t('calendar.selectEventTime', 'Select Event Time')}
                isDark={true}
                outputFormat="auto"
              />
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{t('calendar.notesOptional', 'Notes (Optional)')}</label>
                <textarea value={formNote} onChange={(e) => setFormNote(e.target.value)} rows={2} placeholder={t('calendar.agendaNotes', 'Agenda or notes...')} className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors">{t('common.cancel', 'Cancel')}</button>
                <button type="submit" className="flex-1 btn-primary py-2.5 text-xs font-semibold">{t('calendar.saveEvent', 'Save Event')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}