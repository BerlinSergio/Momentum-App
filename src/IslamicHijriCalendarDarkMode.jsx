import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import {
  ArrowLeft, Moon, ChevronLeft, ChevronDown, ChevronRight,
  ArrowLeftRight, Sun, CheckCircle2, BookOpen, Clock,
  Heart, Plus, Trash2, X
} from 'lucide-react';
import { useCalendarStore } from './store/useCalendarStore.js';
import { useRoutineStore, isRoutineCompletedForDate, isRoutineScheduledForDate } from './store/useRoutineStore.js';
import { useAppTime } from './hooks/useAppTime.js';
import { getHijriDateParts, hijriToGregorian, getHijriMonthGrid, HIJRI_MONTHS, getShamsiDate } from './utils/afghanCalendar.js';
import { MomentumTimePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';

const HIJRI_WEEKDAYS = ['Ahad', 'Ith', 'Thul', 'Arba', 'Kham', 'Jum', 'Sabt'];

export default function IslamicHijriCalendarDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { now, effectiveTimezone, currentDateKey } = useAppTime();
  const todayHijri = useMemo(() => getHijriDateParts(now, effectiveTimezone), [now, effectiveTimezone]);
  const [viewHijriYear, setViewHijriYear] = useState(() => todayHijri.hy || 1448);
  const [viewHijriMonth, setViewHijriMonth] = useState(() => todayHijri.hm || 4);
  const [selectedHijriDay, setSelectedHijriDay] = useState(() => todayHijri.hd || 13);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  // Add Event Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Spiritual');
  const [formHijriDay, setFormHijriDay] = useState(() => todayHijri.hd || 13);
  const [formTime, setFormTime] = useState('04:45 PM – 05:45 PM');
  const [formNote, setFormNote] = useState('');

  // Global Persistent Stores (Zustand)
  const { events: calendarEvents, addEvent: addCalendarEvent, toggleEvent: toggleCalendarEvent, deleteEvent: deleteCalendarEvent } = useCalendarStore();
  const { routines, toggleRoutineCompletion } = useRoutineStore();

  const handlePrevMonth = () => {
    if (viewHijriMonth === 1) {
      setViewHijriMonth(12);
      setViewHijriYear((y) => y - 1);
    } else {
      setViewHijriMonth((m) => m - 1);
    }
    setSelectedHijriDay(1);
  };

  const handleNextMonth = () => {
    if (viewHijriMonth === 12) {
      setViewHijriMonth(1);
      setViewHijriYear((y) => y + 1);
    } else {
      setViewHijriMonth((m) => m + 1);
    }
    setSelectedHijriDay(1);
  };

  const currentMonthObj = useMemo(() => {
    return HIJRI_MONTHS[viewHijriMonth - 1] || HIJRI_MONTHS[3];
  }, [viewHijriMonth]);

  const monthGrid = useMemo(() => {
    return getHijriMonthGrid(viewHijriYear, viewHijriMonth);
  }, [viewHijriYear, viewHijriMonth]);

  const selectedGregorianDate = useMemo(() => {
    const clampedDay = Math.min(selectedHijriDay, monthGrid.totalDays);
    return hijriToGregorian(viewHijriYear, viewHijriMonth, clampedDay);
  }, [viewHijriYear, viewHijriMonth, selectedHijriDay, monthGrid.totalDays]);

  const selectedShamsiDate = useMemo(() => {
    return getShamsiDate(selectedGregorianDate, effectiveTimezone);
  }, [selectedGregorianDate, effectiveTimezone]);

  const crossCalendarSubtitle = useMemo(() => {
    const gMonth = selectedGregorianDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const sMonth = selectedShamsiDate?.monthInfo?.nameEn || 'Aqrab';
    const sYear = selectedShamsiDate?.jy || 1405;
    return `${gMonth} CE • ${sMonth} ${sYear} SH`;
  }, [selectedGregorianDate, selectedShamsiDate]);

  const dayHeaderStr = useMemo(() => {
    const weekday = selectedGregorianDate.toLocaleDateString('en-US', { weekday: 'long' });
    return `${weekday}, ${selectedHijriDay} ${currentMonthObj.nameEn} ${viewHijriYear} AH`;
  }, [selectedGregorianDate, selectedHijriDay, currentMonthObj, viewHijriYear]);

  const dayEquivalenceBadge = useMemo(() => {
    const gStr = selectedGregorianDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const sDay = selectedShamsiDate?.jd || 2;
    const sMonth = selectedShamsiDate?.monthInfo?.nameEn || 'Aqrab';
    return `${gStr} • ${sDay} ${sMonth}`;
  }, [selectedGregorianDate, selectedShamsiDate]);

  const daySignificanceNote = useMemo(() => {
    if (selectedHijriDay === 13 || selectedHijriDay === 14 || selectedHijriDay === 15) {
      return 'First of Ayyam al-Beed (White Days) • Qiyam & Sunnah Fasting';
    }
    const weekdayIdx = selectedGregorianDate.getDay();
    if (weekdayIdx === 5) return "Blessed Friday (Jumu'ah) • Surah Al-Kahf & Salawat";
    if (weekdayIdx === 1 || weekdayIdx === 4) return 'Sunnah Fasting Day (Monday/Thursday) • Good Deeds';
    return 'Daily spiritual mindfulness, beneficial study & righteous action';
  }, [selectedHijriDay, selectedGregorianDate]);

  const allUnifiedEvents = useMemo(() => {
    const list = [];
    const seen = new Set();
    (calendarEvents || []).forEach((evt) => {
      let hy = Number(evt.hijriYear);
      let hm = Number(evt.hijriMonth);
      let hd = Number(evt.hijriDay);
      if (!hy || !hm || !hd) {
        if (evt.date) {
          try {
            const gDate = new Date(evt.date + 'T12:00:00Z');
            const h = getHijriDateParts(gDate);
            hy = h.hy; hm = h.hm; hd = h.hd;
          } catch {
            // Ignore parse error
          }
        }
      }
      if (hy && hm && hd) {
        const key = `cal-${evt.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            id: evt.id,
            source: 'calendar',
            title: evt.title,
            category: evt.category || 'Spiritual',
            hijriYear: hy,
            hijriMonth: hm,
            hijriDay: hd,
            time: evt.time || '10:00 AM',
            note: evt.note || '',
            completed: !!evt.completed,
          });
        }
      }
    });
    (routines || []).forEach((rt) => {
      if ((rt.category === 'Spiritual' || rt.category === 'Personal') && isRoutineScheduledForDate(rt, currentDateKey)) {
        const key = `rt-${rt.id}-${selectedHijriDay}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            id: rt.id,
            source: 'routine',
            title: rt.title,
            category: 'Spiritual',
            hijriYear: viewHijriYear,
            hijriMonth: viewHijriMonth,
            hijriDay: selectedHijriDay,
            time: rt.time || '05:15 AM',
            note: rt.notes || '',
            completed: isRoutineCompletedForDate(rt, currentDateKey),
          });
        }
      }
    });
    return list;
  }, [calendarEvents, routines, viewHijriYear, viewHijriMonth, selectedHijriDay]);

  const monthEvents = useMemo(() => {
    return allUnifiedEvents.filter((e) => e.hijriYear === viewHijriYear && e.hijriMonth === viewHijriMonth);
  }, [allUnifiedEvents, viewHijriYear, viewHijriMonth]);

  const eventDaysSet = useMemo(() => {
    const set = new Set();
    monthEvents.forEach((e) => set.add(e.hijriDay));
    return set;
  }, [monthEvents]);

  const categoryCounts = useMemo(() => {
    const all = monthEvents.length;
    const spiritual = monthEvents.filter((e) => e.category === 'Spiritual' || e.category === 'Personal').length;
    const fasting = monthEvents.filter((e) => e.category === 'Fasting').length;
    return { all, spiritual, fasting };
  }, [monthEvents]);

  const visibleDayEvents = useMemo(() => {
    let evts = allUnifiedEvents.filter(
      (e) => e.hijriYear === viewHijriYear && e.hijriMonth === viewHijriMonth && e.hijriDay === selectedHijriDay
    );
    if (activeCategory === 'Spiritual') {
      evts = evts.filter((e) => e.category === 'Spiritual' || e.category === 'Personal');
    } else if (activeCategory === 'Fasting') {
      evts = evts.filter((e) => e.category === 'Fasting');
    }
    return evts;
  }, [allUnifiedEvents, viewHijriYear, viewHijriMonth, selectedHijriDay, activeCategory]);

  const handleToggle = (item) => {
    if (item.source === 'calendar') {
      toggleCalendarEvent(item.id);
    } else if (item.source === 'routine') {
      toggleRoutineCompletion(item.id, currentDateKey);
    }
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    addCalendarEvent({
      title: formTitle.trim(),
      category: formCategory,
      hijriYear: viewHijriYear,
      hijriMonth: viewHijriMonth,
      hijriDay: Number(formHijriDay) || selectedHijriDay,
      time: formTime.trim() || '10:00 AM',
      note: formNote.trim(),
      completed: false,
    });
    setFormTitle('');
    setFormNote('');
    setIsAddModalOpen(false);
    toast.success(t('toasts.eventAdded', 'Event added to calendar'));
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans pb-32 text-white relative">
      {/* TOP HEADER BAR */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Moon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">{t('calendar.islamicHijriCalendar', 'Islamic Hijri Calendar')}</h1>
</div>
<div className="flex items-center gap-2">
          <button onClick={() => (goBack ? goBack('calendars_main_dark_mode') : (setActiveTab ? setActiveTab('calendars_main_dark_mode') : window.history.back()))} aria-label="Go back" data-testid="calendar-back-btn" className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <UserAvatar setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* MAIN HIJRI CALENDAR CONTAINER */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Month Selector & Cross-Calendar Sync */}
        <div className="flex items-center justify-between">
          <button onClick={handlePrevMonth} aria-label="Previous month" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setIsMonthPickerOpen((v) => !v)} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            <h2 className="text-lg font-bold text-white">{currentMonthObj.nameEn} {viewHijriYear} AH</h2>
            <ChevronDown className="w-4 h-4 text-primary" />
          </button>
          <button onClick={handleNextMonth} aria-label="Next month" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <ArrowLeftRight className="w-3.5 h-3.5 text-primary" />
          <span>{crossCalendarSubtitle}</span>
        </div>

        {/* Event Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <button onClick={() => setActiveCategory('All')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCategory === 'All' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            All Events ({categoryCounts.all})
          </button>
          <button onClick={() => setActiveCategory('Spiritual')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCategory === 'Spiritual' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            Spiritual & Prayers ({categoryCounts.spiritual})
          </button>
          <button onClick={() => setActiveCategory('Fasting')} className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCategory === 'Fasting' ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            Fasting & Sunnah ({categoryCounts.fasting})
          </button>
        </div>

        {/* Calendar Days & Number Grid */}
        <div className="grid grid-cols-7 gap-1 text-center pt-2">
          {HIJRI_WEEKDAYS.map((w, idx) => (
            <div key={w} className={`text-xs font-semibold py-1 ${idx === 5 ? 'text-primary font-bold bg-primary/10 rounded-lg' : 'text-slate-400'}`}>
              {w}
            </div>
          ))}
          {monthGrid.prevSpacers.map((pad, i) => (
            <div key={`prev-${i}`} className="h-10 flex items-center justify-center text-slate-600 font-normal">
              {pad}
            </div>
          ))}
          {monthGrid.currentDays.map((d) => {
            const isSelected = d === selectedHijriDay;
            const dayIndex = (monthGrid.firstWeekday + d - 1) % 7;
            const isFriday = dayIndex === 5;
            const hasEvents = eventDaysSet.has(d);
            const isToday = viewHijriYear === todayHijri.hy && viewHijriMonth === todayHijri.hm && d === todayHijri.hd;
            return (
              <div key={`day-${d}`} onClick={() => setSelectedHijriDay(d)} className="h-10 flex items-center justify-center cursor-pointer pointer-events-auto">
                {isSelected ? (
                  <div className="w-9 h-9 mx-auto rounded-full bg-primary text-white font-bold flex flex-col items-center justify-center shadow-lg shadow-primary/30 relative">
                    <span>{d}</span>
                    {hasEvents && <span className="w-1 h-1 rounded-full bg-white absolute bottom-1"></span>}
                  </div>
                ) : isFriday ? (
                  <div className={`w-9 h-9 mx-auto rounded-lg text-primary font-bold bg-primary/10 flex flex-col items-center justify-center relative hover:bg-primary/20 transition-colors ${
                    isToday ? 'border border-primary' : ''
                  }`}>
                    <span>{d}</span>
                    {hasEvents && <span className="w-1 h-1 rounded-full bg-primary absolute bottom-1"></span>}
                  </div>
                ) : (
                  <div className={`w-9 h-9 mx-auto rounded-lg font-medium flex flex-col items-center justify-center relative hover:bg-white/5 transition-colors ${
                    isToday ? 'border border-primary/60 text-primary font-bold' : 'text-slate-200'
                  }`}>
                    <span>{d}</span>
                    {hasEvents && <span className="w-1 h-1 rounded-full bg-primary absolute bottom-1"></span>}
                  </div>
                )}
              </div>
            );
          })}
          {monthGrid.nextSpacers.map((pad, i) => (
            <div key={`next-${i}`} className="h-10 flex items-center justify-center text-slate-600 font-normal">
              {pad}
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED HIJRI DAY & EVENTS CONTAINER */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Day Header & Solar/CE Equivalence */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white leading-tight">{dayHeaderStr}</h3>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center justify-center bg-violet-500/20 border border-violet-500/30 text-violet-300 shadow-sm">
            {dayEquivalenceBadge}
          </span>
        </div>
        <p className="text-xs font-normal text-slate-400 mb-4">{daySignificanceNote}</p>

        {/* Standardized rounded-2xl Hijri Event Tiles */}
        {visibleDayEvents.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 bg-black/20 rounded-2xl border border-white/5">
            <Moon className="w-6 h-6 mx-auto mb-2 text-primary opacity-60" />
            <span>No events scheduled for this Hijri day. Tap `+ {t('calendar.addHijriEvent', 'Add Hijri Event')} to create one.</span>
          </div>
        ) : (
          visibleDayEvents.map((evt) => (
            <div key={evt.id} className="p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  evt.category === 'Fasting'
                    ? 'bg-amber-500/10 text-amber-400'
                    : evt.category === 'Spiritual'
                    ? 'bg-primary/10 text-primary'
                    : evt.category === 'Community' || evt.category === 'Personal'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-violet-500/10 text-violet-400'
                }`}>
                  {evt.category === 'Fasting' ? <Sun className="w-4 h-4" /> : evt.category === 'Spiritual' ? <BookOpen className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <h4 className={`text-xs font-semibold truncate ${evt.completed ? 'line-through text-slate-500' : 'text-white'}`}>{evt.title}</h4>
                  <p className="text-[11px] font-normal text-slate-400">{evt.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${
                  evt.category === 'Fasting'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : evt.category === 'Spiritual'
                    ? 'bg-primary/20 text-primary border-primary/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>{evt.category === 'Fasting' ? t('calendar.sunnah', 'Sunnah') : evt.category}</span>
                <button onClick={() => handleToggle(evt)} aria-label="Toggle event completion" className="p-1 cursor-pointer transition-transform active:scale-90">
                  {evt.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-slate-500 hover:text-primary" />}
                </button>
                {evt.source === 'calendar' && (
                  <button onClick={() => { deleteCalendarEvent(evt.id); toast.success(t('calendar.eventDeleted', 'Event deleted')); }} aria-label="Delete event" className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        {/* Primary Action Button */}
        <button onClick={() => { setFormHijriDay(selectedHijriDay); setIsAddModalOpen(true); }} className="w-full py-3.5 px-4 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer mt-2">
          <Plus className="w-4 h-4" />
          <span>{t('calendar.addHijriEvent', 'Add Hijri Event')}</span>
        </button>
      </div>

      {/* Hijri Month Picker Modal */}
      {isMonthPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl p-5 space-y-4 bg-slate-900 border border-white/10 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setViewHijriYear((y) => y - 1)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-primary">{viewHijriYear} AH</span>
                <button onClick={() => setViewHijriYear((y) => y + 1)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button onClick={() => setIsMonthPickerOpen(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto scrollbar-none py-1">
              {HIJRI_MONTHS.map((m) => (
                <button key={m.index} onClick={() => { setViewHijriMonth(m.index); setSelectedHijriDay(1); setIsMonthPickerOpen(false); }} className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${m.index === viewHijriMonth ? 'bg-primary text-white shadow-sm' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}`}>
                  <div className="truncate">{m.nameEn}</div>
                  <div className="text-[10px] opacity-75 font-normal">{m.nameAr}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD HIJRI EVENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl p-5 space-y-4 bg-slate-900 border border-white/10 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white">{t('calendar.addHijriEvent', 'Add Hijri Event')}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">{t('calendar.eventTitle', 'Event Title')}</label>
                <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder={t('calendar.ayyamAlBeedPlaceholder', 'e.g. Ayyam al-Beed Fasting')} className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">{t('calendar.category', 'Category')}</label>
                <div className="flex items-center gap-1.5">
                  {['Spiritual', 'Fasting', 'Community'].map((cat) => (
                    <button type="button" key={cat} onClick={() => setFormCategory(cat)} className={`flex-1 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${formCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                      {t('calendar.' + cat.toLowerCase(), cat)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">{t('calendar.hijriDay', 'Hijri Day')}</label>
                  <input type="number" min={1} max={monthGrid.totalDays} value={formHijriDay} onChange={(e) => setFormHijriDay(e.target.value)} className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">{t('calendar.time', 'Time')}</label>
                  <button
                    type="button"
                    onClick={() => setIsTimePickerOpen(true)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary cursor-pointer hover:bg-slate-750"
                  >
                    {formTime || t('calendar.selectTime', 'Select Time')}
                  </button>
                </div>
              </div>

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
                <label className="block text-[11px] font-medium text-slate-400 mb-1">{t('calendar.noteReflection', 'Note / Reflection')}</label>
                <textarea rows={2} value={formNote} onChange={(e) => setFormNote(e.target.value)} placeholder={t('calendar.optionalDetailsIntentions', 'Optional details or intentions...')} className="w-full px-3 py-2 rounded-xl text-xs bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">{t('common.cancel', 'Cancel')}</button>
                <button type="submit" className="flex-1 py-2 rounded-xl text-xs font-semibold bg-primary text-white shadow-md hover:bg-primary/90 cursor-pointer">{t('calendar.saveHijriEvent', 'Save Hijri Event')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
