import React, { useState } from 'react';
import { 
  Sparkles, 
  Bell, 
  Flame, 
  Check, 
  CheckCircle2, 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowLeft 
} from 'lucide-react';
import { useProfileStore } from './store/useProfileStore';
import UserAvatar from './components/UserAvatar';
import { useRoutineStore } from './store/useRoutineStore';
import { useNavigationStore } from './store/useNavigationStore';

export default function DailyRoutineLightMode({ setActiveTab, goBack, hideHeader = false }) {
  const profile = useProfileStore();
  const routines = useRoutineStore((s) => s.routines) || [];
  const streakCount = useRoutineStore((s) => s.streakCount) || 14;
  const toggleRoutineStatus = useRoutineStore((s) => s.toggleRoutineStatus || s.toggleRoutineCompletion);
  const deleteRoutine = useRoutineStore((s) => s.deleteRoutine);
  const setEditingRoutineId = useRoutineStore((s) => s.setEditingRoutineId);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const navigateScreen = (screen) => {
    if (setActiveTab) {
      setActiveTab(screen);
    } else {
      useNavigationStore.getState().navigateTo(screen);
    }
  };

  const getRoutinePeriod = (routine) => {
    if (!routine) return 'Morning';
    if (routine.period) {
      const p = routine.period.toLowerCase();
      if (p.includes('morn')) return 'Morning';
      if (p.includes('after')) return 'Afternoon';
      if (p.includes('even') || p.includes('night')) return 'Evening';
    }
    if (routine.time) {
      const match = routine.time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const modifier = (match[3] || '').toUpperCase();
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        const totalMinutes = hours * 60 + minutes;
        if (totalMinutes < 12 * 60) return 'Morning';
        if (totalMinutes < 16 * 60) return 'Afternoon';
        return 'Evening';
      }
    }
    const text = `${routine.title || ''} ${routine.category || ''}`.toLowerCase();
    if (text.includes('morning') || text.includes('fajr') || text.includes('sunrise') || text.includes('hydration')) return 'Morning';
    if (text.includes('afternoon') || text.includes('dhuhr') || text.includes('noon')) return 'Afternoon';
    if (text.includes('evening') || text.includes('asr') || text.includes('maghrib') || text.includes('isha') || text.includes('night')) return 'Evening';
    return 'Morning';
  };

  const totalCount = routines.length;
  const doneCount = routines.filter((r) => r.completed).length;
  const upcomingCount = Math.max(0, totalCount - doneCount);
  const percentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const morningCount = routines.filter((r) => getRoutinePeriod(r) === 'Morning').length;
  const afternoonCount = routines.filter((r) => getRoutinePeriod(r) === 'Afternoon').length;
  const eveningCount = routines.filter((r) => getRoutinePeriod(r) === 'Evening').length;

  const filterOptions = [
    { id: 'All', label: 'All', count: totalCount },
    { id: 'Morning', label: 'Morning', count: morningCount },
    { id: 'Afternoon', label: 'Afternoon', count: afternoonCount },
    { id: 'Evening', label: 'Evening', count: eveningCount },
  ];

  const filteredRoutines = routines.filter((r) => selectedFilter === 'All' || getRoutinePeriod(r) === selectedFilter);

  return (
    <div className="relative w-full pb-0 mb-0 bg-transparent font-sans">
      {/* Top Header Bar */}
      {!hideHeader && (
        <header className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)" }}>
              Daily Routine
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {goBack && (
              <button onClick={() => goBack()} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><Bell className="w-5 h-5"/></button>
            <UserAvatar setActiveTab={navigateScreen} />
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col relative w-full pb-32 bg-transparent z-10">
        <div className="px-5 mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)" }}>Daily Routine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 border border-primary/20 text-slate-900 uppercase tracking-wider shadow-sm" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)" }}>Active</span>
          </div>
          <p className="text-xs font-medium text-slate-800 mt-1" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)" }}>Build daily consistency and focus</p>
        </div>

        <div className="block mx-5 mb-5 p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200/80 text-amber-700 shadow-sm mb-1 whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                {streakCount}-Day Routine Streak
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{doneCount} of {totalCount} Done</h2>
              <p className="text-xs text-slate-500 font-medium">Keep steady. Small steps build profound growth.</p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {upcomingCount} upcoming today
              </div>
            </div>
            {/* Centered Circular Progress Ring */}
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${percentage}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">{percentage}%</span>
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mt-0.5">Today</span>
              </div>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => {
              setEditingRoutineId(null);
              navigateScreen('add_edit_routine_light_mode');
            }}
            className="btn-primary mt-4 w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Routine
          </button>
        </div>

        <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-2xl text-xs whitespace-nowrap transition-colors ${
                selectedFilter === f.id
                  ? 'bg-primary text-white font-bold shadow-sm'
                  : 'bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 hover:bg-slate-50 font-semibold'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {filteredRoutines.length === 0 ? (
          <div className="block mx-5 mb-3 p-8 rounded-3xl text-center bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md">
            <p className="text-sm font-semibold text-slate-700">No routines in this section</p>
            <p className="text-xs text-slate-500 mt-1">Tap Add Routine to create one</p>
          </div>
        ) : (
          filteredRoutines.map((routine) => (
            <div
              key={routine.id}
              className="cursor-pointer relative z-10 mx-5 mb-3 p-4 rounded-3xl transition-all flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  aria-label="Toggle routine completion"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleRoutineStatus(routine.id);
                  }}
                  className={`relative z-20 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all active:scale-90 hover:scale-105 cursor-pointer shadow-sm ${
                    routine.completed
                      ? 'bg-primary text-white shadow-primary/25'
                      : 'bg-white border border-slate-300 hover:border-primary text-transparent'
                  }`}
                >
                  <Check className={`w-4 h-4 stroke-[2.5] pointer-events-none ${routine.completed ? 'text-white' : 'text-transparent'}`} />
                </button>
                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    setEditingRoutineId(routine.id);
                    navigateScreen('add_edit_routine_light_mode');
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-bold truncate ${
                      routine.completed
                        ? 'text-slate-700 line-through decoration-primary/70'
                        : 'text-slate-900'
                    }`}>
                      {routine.title}
                    </h3>
                    <span className="text-xs font-semibold flex-shrink-0 text-primary">
                      {routine.time}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold whitespace-nowrap inline-flex items-center">
                      {routine.frequency || 'Every Day'}
                    </span>
                    {routine.reminder && routine.reminder !== 'None' && (
                      <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] font-medium">
                        <Bell className="w-3 h-3" />
                        <span>{routine.reminder}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 relative z-20">
                <button
                  type="button"
                  aria-label="Edit routine"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditingRoutineId(routine.id);
                    navigateScreen('add_edit_routine_light_mode');
                  }}
                  className="relative z-20 w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/10 transition-all active:scale-90 cursor-pointer"
                >
                  <Pencil className="w-4 h-4 pointer-events-none" />
                </button>
                <button
                  type="button"
                  aria-label="Delete routine"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteRoutine(routine.id);
                  }}
                  className="relative z-20 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 pointer-events-none" />
                </button>
              </div>
            </div>
          ))
        )}

        <div className="block mx-5 my-5 p-4 rounded-3xl flex items-start gap-3.5 text-slate-800 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-primary"/>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
              "Consistent small deeds lead to profound inner peace."
            </p>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mt-1.5">
              Daily Mindfulness Reflection
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}
