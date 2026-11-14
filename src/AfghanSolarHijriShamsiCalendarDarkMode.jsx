import { useState, useMemo } from 'react';
import UserAvatar from './components/UserAvatar';
import {
  Calendar, ArrowLeft, ChevronLeft, ChevronRight, Plus, Clock, Trash2, X, Sparkles, Sun, CalendarClock
} from 'lucide-react';
import { useCalendarStore } from './store/useCalendarStore';
import {
  AFGHAN_WEEKDAYS,
  AFGHAN_SOLAR_MONTHS,
  getShamsiDate,
  getIslamicDateParts,
  generateShamsiMonthGrid,
  toPersianDigits
} from './utils/afghanCalendar';

export default function AfghanSolarHijriShamsiCalendarDarkMode({ setActiveTab, goBack }) {
  const todayShamsi = useMemo(() => getShamsiDate(new Date()), []);
  const [viewYear, setViewYear] = useState(todayShamsi.jy);
  const [viewMonth, setViewMonth] = useState(todayShamsi.jm);
  const [selectedDay, setSelectedDay] = useState(todayShamsi.jd);

  const { events, addEvent, deleteEvent } = useCalendarStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
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
      shamsiYear: viewYear,
      shamsiMonth: Number(newMonth) || viewMonth,
      shamsiDay: Number(newDay) || selectedDay,
      time: newTime || '10:00 AM',
      category: newCategory,
      note: newNote.trim(),
    });
    setIsAddModalOpen(false);
  };

  const selectedDayItem = useMemo(() => {
    const found = monthGrid.currentMonthDays.find((d) => d.shamsiDay === selectedDay);
    if (found) return found;
    return monthGrid.currentMonthDays[0] || null;
  }, [monthGrid, selectedDay]);

  const selectedIslamic = useMemo(() => {
    if (!selectedDayItem || !selectedDayItem.gregorianDate) return { formatted: '' };
    return getIslamicDateParts(selectedDayItem.gregorianDate);
  }, [selectedDayItem]);

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
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            Afghan Solar Calendar
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => (goBack ? goBack('calendars_main_dark_mode') : (setActiveTab ? setActiveTab('calendars_main_dark_mode') : window.history.back()))} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>
      <main className="flex flex-col relative w-full pb-safe min-h-screen px-4 pt-2">
        <div className="flex flex-col w-full pb-28 space-y-4">
          {/* Atmospheric Backdrop Glow & Seasonal Top Banner */}
          <div className="relative w-full rounded-3xl p-5 overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg space-y-4">
            <div className="flex flex-row justify-between items-center w-full gap-2 p-1">
              <span className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold flex items-center gap-1 shrink-0 shadow-sm">
                <span>{monthInfo.seasonIcon}</span>
                <span className="truncate">{monthInfo.season}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium shrink-0 text-center">
                Month {monthInfo.index} of 12
              </span>
              <div className="flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold text-center truncate shadow-sm">
                <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-xs text-center truncate max-w-[120px]">{monthInfo.seasonNote}</span>
              </div>
            </div>

            {/* Month & Year Interactive Controls */}
            <div className="flex items-center justify-between pt-1">
              <button type="button" onClick={handlePrevMonth} aria-label="Previous Month" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center px-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-white">{monthInfo.nameEn} {viewYear} SH</h2>
                  <span className="text-base font-semibold text-primary">{monthInfo.nameFa} {toPersianDigits(viewYear)}</span>
                </div>
                <p className="text-xs font-normal mt-0.5 text-slate-400">
                  {monthInfo.zodiac} ({monthInfo.namePs}) • {monthInfo.daysCount} Days
                </p>
              </div>
              <button type="button" onClick={handleNextMonth} aria-label="Next Month" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live Solar Calendar Grid */}
          <div className="rounded-3xl p-5 flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg space-y-2">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1 pb-1 border-b border-slate-200/60">
              {AFGHAN_WEEKDAYS.map((wd) => (
                <div key={wd.key} className={`flex flex-col py-1 ${wd.isFriday ? ('bg-primary/20 text-primary rounded-lg') : ('text-slate-400')}`}>
                  <span className="text-xs font-semibold uppercase">{wd.en}</span>
                  <span className="text-[11px] font-medium font-bahij" dir="rtl">{wd.fa}</span>
                </div>
              ))}
            </div>

            {/* Day Cells Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Leading Previous Month Spacer Cells */}
              {monthGrid.prevSpacers.map((sp, idx) => (
                <div key={'prev-' + idx} className="aspect-square p-1 flex flex-col items-center justify-center text-center rounded-2xl opacity-30 select-none bg-slate-900/40 border border-slate-800 text-slate-600">
                  <span className="text-xs font-bold font-mono leading-none">{sp.shamsiDayFa}</span>
                  <div className="flex items-center justify-center gap-0.5 text-[9px] leading-none mt-1 opacity-75">
                    <span>{sp.gregorianDay}</span>
                    <span>•</span>
                    <span>{sp.hijriDay}</span>
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
                        ? 'bg-primary/20 border-2 border-primary text-white shadow-md'
                        : 'bg-slate-900/60 backdrop-blur-xl border border-slate-800 text-slate-200 hover:bg-slate-800/90 shadow-sm'
                    }`}
                  >
                    {hasEvent ? (
                      <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                        day.isToday ? 'bg-amber-300' : 'bg-primary'
                      }`} />
                    ) : null}
                    <span className={`text-sm font-bold font-mono leading-none text-center ${
                      day.isToday ? 'text-white' : (isSelected ? 'text-white' : (day.isFriday ? 'text-primary' : ''))
                    }`}>
                      {day.shamsiDayFa}
                    </span>
                    <div className={`flex items-center justify-center gap-0.5 text-[9px] leading-none mt-1 ${
                      day.isToday ? 'text-white/85' : 'text-slate-400'
                    }`}>
                      <span>{day.gregorianDay}</span>
                      <span>•</span>
                      <span>{day.hijriDay}</span>
                    </div>
                  </button>
                );
              })}

              {/* Trailing Next Month Spacer Cells */}
              {monthGrid.nextSpacers.map((sp, idx) => (
                <div key={'next-' + idx} className="aspect-square p-1 flex flex-col items-center justify-center text-center rounded-2xl opacity-30 select-none bg-slate-900/40 border border-slate-800 text-slate-600">
                  <span className="text-xs font-bold font-mono leading-none">{sp.shamsiDayFa}</span>
                  <div className="flex items-center justify-center gap-0.5 text-[9px] leading-none mt-1 opacity-75">
                    <span>{sp.gregorianDay}</span>
                    <span>•</span>
                    <span>{sp.hijriDay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Details Card */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
            <div className="flex flex-row justify-between items-start w-full gap-3">
              <div className="flex flex-col items-start min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
                  <h3 className="text-base font-bold tracking-tight text-white truncate">
                    {selectedWeekdayInfo.longEn}, {selectedDay} {monthInfo.nameEn} {viewYear}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-400 mt-1 pl-4.5">
                  {selectedDayItem ? selectedDayItem.gregorianDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : ''} • {selectedIslamic.formatted}
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold shrink-0 self-start shadow-sm whitespace-nowrap">
                {selectedDayItem?.isToday ? 'امروز • TODAY' : `${selectedWeekdayInfo.fa} • روز ${toPersianDigits(selectedDay)}`}
              </span>
            </div>

            {/* Astronomical & Seasonal Insights */}
            <div className="flex items-center gap-6 pt-1 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-slate-200">{daylightHoursText}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-slate-200">{monthInfo.seasonNote}</span>
              </div>
            </div>
          </div>

          {/* Cultural & National Occasions Ahead */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span className="text-base font-bold tracking-tight text-white">Afghan Solar Highlights</span>
              <span className="text-xs font-medium text-slate-400">{monthInfo.nameEn} ({monthInfo.nameFa}) Festivals</span>
            </div>
            <div className="space-y-3">
              {monthInfo.events.map((evt, idx) => (
                <div key={idx} onClick={() => setSelectedDay(evt.day)} className="flex items-start gap-3 cursor-pointer group">
                  <div className="rounded-2xl w-12 h-12 bg-primary/20 border border-primary/30 text-primary flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-sm font-bold leading-none">{toPersianDigits(evt.day)}</span>
                    <span className="text-[9px] uppercase mt-0.5">{monthInfo.nameEn}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-white truncate">{evt.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                        {evt.badge}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-400 line-clamp-2 mt-0.5">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Routines for Selected Day */}
          <div className="rounded-3xl p-5 space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span className="text-base font-bold tracking-tight text-white">Daily Schedule ({selectedWeekdayInfo.fa}، {toPersianDigits(selectedDay)} {monthInfo.nameFa})</span>
              <span className="text-xs font-semibold text-slate-400">{dailyEvents.length} Reminders</span>
            </div>
            <div className="space-y-2">
              {dailyEvents.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-center text-xs text-slate-400">
                  No scheduled tasks for this day. Tap 'Add Solar Event' below to schedule a reminder.
                </div>
              ) : (
                dailyEvents.map((evt) => (
                  <div key={evt.id} className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/70 shadow-sm flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <CalendarClock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-white truncate">{evt.title}</span>
                        <span className="text-[11px] text-slate-400">{evt.time} • {evt.category}{evt.note ? ` • ${evt.note}` : ''}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteEvent(evt.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
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
            <span>Schedule Afghan Solar Event</span>
          </button>
        </div>
      </main>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-slate-900/90 backdrop-blur-xl border border-white/10/80 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">New Solar Reminder</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Nawruz Family Gathering"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Month</label>
                  <select
                    value={newMonth}
                    onChange={(e) => setNewMonth(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-primary"
                  >
                    {AFGHAN_SOLAR_MONTHS.map((m) => (
                      <option key={m.index} value={m.index}>
                        {m.nameEn} ({m.nameFa})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Solar Day</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Reminder">Reminder</option>
                    <option value="National">National</option>
                    <option value="Religious">Religious</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Family">Family</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes (Optional)</label>
                <textarea
                  rows="2"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add brief notes or details..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer select-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary text-white font-semibold text-xs shadow-md shadow-primary/20 transition-all cursor-pointer select-none"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
