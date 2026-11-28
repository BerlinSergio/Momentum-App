import ReminderTypePicker from './components/ReminderTypePicker.jsx';
import {useSettingsStore as useReminderSettings} from './store/useSettingsStore.js';
import {defaultReminderType} from './utils/reminderRules.js';
import {useDisplayDigits} from './hooks/useDisplayDigits.js';
import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import {
  Calendar, ArrowLeft, ChevronLeft, ChevronRight, Plus, Clock, Trash2, X, Sparkles, Sun, CalendarClock
} from 'lucide-react';
import { useCalendarStore } from './store/useCalendarStore';
import { useAppTime } from './hooks/useAppTime';
import {
  AFGHAN_WEEKDAYS,
  AFGHAN_SOLAR_MONTHS,
  getShamsiDate,
  getIslamicDateParts,
  generateShamsiMonthGrid,
  toPersianDigits
} from './utils/afghanCalendar';
import { MomentumTimePicker } from './components/ui/picker/index.js';
import { toast } from './components/ui/toast/index.js';

export default function AfghanSolarHijriShamsiCalendarLightMode({ setActiveTab, goBack }) {
  const digits=useDisplayDigits();
  const { t } = useTranslation();
  const { now, effectiveTimezone } = useAppTime();
  const todayShamsi = useMemo(() => getShamsiDate(now, effectiveTimezone), [now, effectiveTimezone]);
  const [viewYear, setViewYear] = useState(todayShamsi.jy);
  const [viewMonth, setViewMonth] = useState(todayShamsi.jm);
  const [selectedDay, setSelectedDay] = useState(todayShamsi.jd);

  const { events, addEvent, deleteEvent } = useCalendarStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [reminderType,setReminderType]=useState(()=>defaultReminderType(useReminderSettings.getState(),'calendar'));
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newCategory, setNewCategory] = useState('Reminder');
  const [newNote, setNewNote] = useState('');
  const [newDay, setNewDay] = useState(todayShamsi.jd);
  const [newMonth, setNewMonth] = useState(todayShamsi.jm);

  const monthGrid = useMemo(() => {
    return generateShamsiMonthGrid(viewYear, viewMonth, todayShamsi);
  }, [viewYear, viewMonth, todayShamsi]);

  const monthInfo = monthGrid.monthInfo;

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
    setSelectedDay(1);
  };

  const handleOpenAddModal = () => {
    setReminderType(defaultReminderType(useReminderSettings.getState(),'calendar'));
    setNewDay(selectedDay);
    setNewMonth(viewMonth);
    setNewTitle('');
    setNewTime('10:00 AM');
    setNewCategory('Reminder');
    setNewNote('');
    setIsAddModalOpen(true);
  };

  const handleCreateEvent = (e) => {
    if (e) e.preventDefault();
    if (!newTitle.trim()) return;
    addEvent({
      title: newTitle.trim(),
      reminderType,
      shamsiYear: viewYear,
      shamsiMonth: Number(newMonth) || viewMonth,
      shamsiDay: Number(newDay) || selectedDay,
      time: newTime || '10:00 AM',
      category: newCategory,
      note: newNote.trim(),
    });
    setIsAddModalOpen(false);
    toast.success(t('toasts.eventAdded', 'Event added to calendar'));
  };

  const selectedDayItem = useMemo(() => {
    const found = monthGrid.currentMonthDays.find((d) => d.shamsiDay === selectedDay);
    if (found) return found;
    return monthGrid.currentMonthDays[0] || null;
  }, [monthGrid, selectedDay]);

  const selectedIslamic = useMemo(() => {
    if (!selectedDayItem || !selectedDayItem.gregorianDate) return { formatted: '' };
    return getIslamicDateParts(selectedDayItem.gregorianDate, effectiveTimezone);
  }, [selectedDayItem, effectiveTimezone]);

  const selectedWeekdayInfo = useMemo(() => {
    if (!selectedDayItem) return AFGHAN_WEEKDAYS[0];
    return AFGHAN_WEEKDAYS[selectedDayItem.afghanWeekday] || AFGHAN_WEEKDAYS[0];
  }, [selectedDayItem]);

  const dailyEvents = useMemo(() => {
    return (events || []).filter(
      (e) => Number(e.shamsiYear) === viewYear && Number(e.shamsiMonth) === viewMonth && Number(e.shamsiDay) === selectedDay
    );
  }, [events, viewYear, viewMonth, selectedDay]);

  const daysWithEvents = useMemo(() => {
    const set = new Set();
    (events || []).forEach((e) => {
      if (Number(e.shamsiYear) === viewYear && Number(e.shamsiMonth) === viewMonth) {
        set.add(Number(e.shamsiDay));
      }
    });
    return set;
  }, [events, viewYear, viewMonth]);

  const daylightHoursText = useMemo(() => {
    if (viewMonth >= 1 && viewMonth <= 3) return '12h 45m Daylight';
    if (viewMonth >= 4 && viewMonth <= 6) return '14h 20m Daylight';
    if (viewMonth >= 7 && viewMonth <= 9) return '10h 52m Daylight';
    return '9h 48m Daylight';
  }, [viewMonth]);

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={false}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {t('calendar.afghanSolarCalendar', 'Afghan Solar Calendar')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => (goBack ? goBack('calendars_main_light_mode') : (setActiveTab ? setActiveTab('calendars_main_light_mode') : window.history.back()))} aria-label="Go back" data-testid="calendar-back-btn" className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"><ArrowLeft className="w-5 h-5 rtl:rotate-180"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>
      <main className="flex flex-col relative w-full pb-safe min-h-screen px-4 pt-2">
        <div className="flex flex-col w-full pb-28 space-y-4">
          {/* Atmospheric Backdrop Glow & Seasonal Top Banner */}
          <div className="relative w-full rounded-3xl p-5 overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg space-y-4">
            <div className="flex flex-row justify-between items-center w-full gap-2 p-1">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-1 shrink-0 shadow-sm">
                <span>{monthInfo.seasonIcon}</span>
                <span className="truncate">{monthInfo.season}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium shrink-0 text-center">
                {t('calendar.monthOf12', 'Month {{month}} of 12', { month: monthInfo.index })}
              </span>
              <div className="flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold text-center truncate shadow-sm">
                <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-xs text-center truncate max-w-[120px]">{monthInfo.seasonNote}</span>
              </div>
            </div>

            {/* Month & Year Interactive Controls */}
            <div className="flex items-center justify-between pt-1">
              <button type="button" onClick={handlePrevMonth} aria-label="Previous Month" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center px-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">{monthInfo.nameEn} {digits(viewYear)} SH</h2>
                  <span className="text-base font-semibold text-primary">{monthInfo.nameFa} {toPersianDigits(viewYear)}</span>
                </div>
                <p className="text-xs font-normal mt-0.5 text-slate-500">
                  {monthInfo.zodiac} ({monthInfo.namePs}) • {t('calendar.daysCount', '{{count}} Days', { count: monthInfo.daysCount })}
                </p>
              </div>
              <button type="button" onClick={handleNextMonth} aria-label="Next Month" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live Solar Calendar Grid */}
          <div className="rounded-3xl p-5 flex flex-col bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg space-y-2">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1 pb-1 border-b border-slate-200/60">
              {AFGHAN_WEEKDAYS.map((wd) => (
                <div key={wd.key} className={`flex flex-col py-1 ${wd.isFriday ? ('bg-primary/10 text-primary rounded-lg') : ('text-slate-600')}`}>
                  <span className="text-xs font-semibold uppercase">{wd.en}</span>
                  <span className="text-[11px] font-medium font-bahij" dir="rtl">{wd.fa}</span>
                </div>
              ))}
            </div>

            {/* Day Cells Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Leading Previous Month Spacer Cells */}
              {monthGrid.prevSpacers.map((sp, idx) => (
                <div key={'prev-' + idx} className="aspect-square p-1 flex flex-col items-center justify-center text-center rounded-2xl opacity-30 select-none bg-slate-50 border border-slate-100 text-slate-400">
                  <span className="text-xs font-bold font-mono leading-none">{sp.shamsiDayFa}</span>
                  <div className="flex items-center justify-center gap-0.5 text-[9px] leading-none mt-1 opacity-75">
                    <span>{digits(sp.gregorianDay)}</span>
                    <span>•</span>
                    <span>{digits(sp.hijriDay)}</span>
                  </div>
                </div>
              ))}

              {/* Active Current Month Days */}
              {monthGrid.currentMonthDays.map((day) => {
                const isSelected = day.shamsiDay === selectedDay;
                const hasEvent = daysWithEvents.has(day.shamsiDay);
                return (
                  <button
                    key={'day-' + day.shamsiDay}
                    type="button"
                    onClick={() => setSelectedDay(day.shamsiDay)}
                    className={`aspect-square p-1 flex flex-col items-center justify-center text-center rounded-2xl transition-all cursor-pointer relative select-none ${
                      day.isToday
                        ? 'bg-gradient-to-br from-primary via-primary to-primary text-white shadow-md ring-2 ring-primary'
                        : isSelected
                        ? 'bg-primary/10 border-2 border-primary text-slate-900 shadow-md'
                        : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-700 hover:bg-slate-100/90 shadow-sm'
                    }`}
                  >
                    {hasEvent ? (
                      <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                        day.isToday ? 'bg-amber-300' : 'bg-primary'
                      }`} />
                    ) : null}
                    <span className={`text-sm font-bold font-mono leading-none text-center ${
                      day.isToday ? 'text-white' : (isSelected ? 'text-primary' : (day.isFriday ? 'text-primary' : ''))
                    }`}>
                      {digits(day.shamsiDayFa)}
                    </span>
                    <div className={`flex items-center justify-center gap-0.5 text-[9px] leading-none mt-1 ${
                      day.isToday ? 'text-white/85' : 'text-slate-500'
                    }`}>
                      <span>{digits(day.gregorianDay)}</span>
                      <span>•</span>
                      <span>{digits(day.hijriDay)}</span>
                    </div>
                  </button>
                );
              })}

              {/* Trailing Next Month Spacer Cells */}
              {monthGrid.nextSpacers.map((sp, idx) => (
                <div key={'next-' + idx} className="aspect-square p-1 flex flex-col items-center justify-center text-center rounded-2xl opacity-30 select-none bg-slate-50 border border-slate-100 text-slate-400">
                  <span className="text-xs font-bold font-mono leading-none">{sp.shamsiDayFa}</span>
                  <div className="flex items-center justify-center gap-0.5 text-[9px] leading-none mt-1 opacity-75">
                    <span>{digits(sp.gregorianDay)}</span>
                    <span>•</span>
                    <span>{digits(sp.hijriDay)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Details Card */}
          <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex flex-row justify-between items-start w-full gap-3">
              <div className="flex flex-col items-start min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
                  <h3 className="text-base font-bold tracking-tight text-slate-900 truncate">
                    {selectedWeekdayInfo.longEn}, {digits(selectedDay)} {monthInfo.nameEn} {digits(viewYear)}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-1 pl-4.5">
                  {selectedDayItem ? selectedDayItem.gregorianDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : ''} • {selectedIslamic.formatted}
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold shrink-0 self-start shadow-sm whitespace-nowrap">
                {selectedDayItem?.isToday ? `امروز • ${t('calendar.todayUpper', 'TODAY')}` : `${selectedWeekdayInfo.fa} • روز ${toPersianDigits(selectedDay)}`}
              </span>
            </div>

            {/* Astronomical & Seasonal Insights */}
            <div className="flex items-center gap-6 pt-1 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-slate-800">{daylightHoursText}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-slate-800">{monthInfo.seasonNote}</span>
              </div>
            </div>
          </div>

          {/* Cultural & National Occasions Ahead */}
          <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span className="text-base font-bold tracking-tight text-slate-900">{t('calendar.afghanSolarHighlights', 'Afghan Solar Highlights')}</span>
              <span className="text-xs font-medium text-slate-500">{monthInfo.nameEn} ({monthInfo.nameFa}) {t('calendar.festivals', 'Festivals')}</span>
            </div>
            <div className="space-y-3">
              {monthInfo.events.map((evt, idx) => (
                <div key={idx} onClick={() => setSelectedDay(evt.day)} className="flex items-start gap-3 cursor-pointer group">
                  <div className="rounded-2xl w-12 h-12 bg-primary/10 border border-primary/20 text-primary flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-sm font-bold leading-none">{toPersianDigits(evt.day)}</span>
                    <span className="text-[9px] uppercase mt-0.5">{monthInfo.nameEn}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{evt.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                        {evt.badge}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 line-clamp-2 mt-0.5">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Routines for Selected Day */}
          <div className="rounded-3xl p-5 space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span className="text-base font-bold tracking-tight text-slate-900">{t('calendar.dailySchedule', 'Daily Schedule')} ({selectedWeekdayInfo.fa}، {toPersianDigits(selectedDay)} {monthInfo.nameFa})</span>
              <span className="text-xs font-semibold text-slate-500">{dailyEvents.length} {t('calendar.reminders', 'Reminders')}</span>
            </div>
            <div className="space-y-2">
              {dailyEvents.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-500">
                  {t('calendar.noScheduledTasksForDay', "No scheduled tasks for this day. Tap 'Add Solar Event' below to schedule a reminder.")}
                </div>
              ) : (
                dailyEvents.map((evt) => (
                  <div key={evt.id} className="p-3 rounded-2xl bg-white/80 border border-slate-200/70 shadow-sm flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <CalendarClock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-900 truncate">{evt.title}</span>
                        <span className="text-[11px] text-slate-500">{evt.time} • {evt.category}{evt.note ? ` • ${evt.note}` : ''}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        deleteEvent(evt.id);
                        toast.success(t('calendar.eventDeleted', 'Event deleted'));
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Button: Add Solar Event */} 
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-container hover:brightness-105 text-white font-bold text-sm shadow-lg shadow-primary/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <Plus className="w-4 h-4" />
            <span>{t('calendar.scheduleAfghanEvent', 'Schedule Afghan Solar Event')}</span>
          </button>
        </div>
      </main>

      {/* Add Afghan Solar Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{t('calendar.newSolarReminder', 'New Solar Reminder')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <ReminderTypePicker value={reminderType} onChange={setReminderType}/>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calendar.eventTitle', 'Event Title')}</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t('calendar.eventTitlePlaceholder', 'e.g. Nawruz Family Gathering')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calendar.month', 'Month')}</label>
                  <select
                    value={newMonth}
                    onChange={(e) => setNewMonth(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  >
                    {AFGHAN_SOLAR_MONTHS.map((m) => (
                      <option key={m.index} value={m.index}>
                        {m.nameEn} ({m.nameFa})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calendar.solarDay', 'Solar Day')}</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{t('common.time', 'Time')}</label>
                  <button
                    type="button"
                    onClick={() => setIsTimePickerOpen(true)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary cursor-pointer hover:bg-slate-100"
                  >
                    {newTime || '10:00 AM'}
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{t('common.category', 'Category')}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  >
                    <option value="Reminder">{t('calendar.reminders', 'Reminder')}</option>
                    <option value="National">{t('calendar.national', 'National')}</option>
                    <option value="Religious">{t('calendar.religious', 'Religious')}</option>
                    <option value="Cultural">{t('calendar.cultural', 'Cultural')}</option>
                    <option value="Family">{t('calendar.family', 'Family')}</option>
                    <option value="Personal">{t('calendar.personal', 'Personal')}</option>
                  </select>
                </div>
              </div>

              <MomentumTimePicker
                isOpen={isTimePickerOpen}
                onClose={() => setIsTimePickerOpen(false)}
                value={newTime}
                onSelect={(selectedT) => setNewTime(selectedT)}
                title={t('calendar.selectEventTime', 'Select Event Time')}
                isDark={false}
                outputFormat="auto"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('calendar.notesOptional', 'Notes (Optional)')}</label>
                <textarea
                  rows="2"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={t('calendar.addNotesPlaceholder', 'Add brief notes or details...')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer select-none"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary text-white font-semibold text-xs shadow-md shadow-primary/20 transition-all cursor-pointer select-none"
                >
                  {t('calendar.saveEvent', 'Save Event')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
