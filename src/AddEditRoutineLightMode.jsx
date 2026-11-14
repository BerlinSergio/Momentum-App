import React from 'react';
import UserAvatar from './components/UserAvatar';
import { useRoutineStore } from './store/useRoutineStore';
import { useNavigationStore } from './store/useNavigationStore';
import { Clock, ArrowLeft } from 'lucide-react';

export default function AddEditRoutineLightMode({ setActiveTab, goBack }) {
  const { routines, editingRoutineId, setEditingRoutineId, addRoutine, updateRoutine, deleteRoutine } = useRoutineStore();
  const existingRoutine = editingRoutineId ? routines.find((r) => r.id === editingRoutineId) : null;
  const isEditing = Boolean(existingRoutine);

  const displayTime = existingRoutine ? existingRoutine.time : '08:30 PM';
  const timeParts = displayTime.split(' ');
  const timeNum = timeParts[0] || '08:30';
  const timeMod = timeParts[1] || 'PM';

  const handleCancel = () => {
    setEditingRoutineId(null);
    if (goBack) goBack('daily_routine_light_mode');
    else if (setActiveTab) setActiveTab('daily_routine_light_mode');
    else useNavigationStore.getState().navigateTo('daily_routine_light_mode');
  };

  const handleDelete = () => {
    if (existingRoutine) {
      deleteRoutine(existingRoutine.id);
    }
    setEditingRoutineId(null);
    if (goBack) goBack('daily_routine_light_mode');
    else if (setActiveTab) setActiveTab('daily_routine_light_mode');
    else useNavigationStore.getState().navigateTo('daily_routine_light_mode');
  };

  const handleSave = () => {
    const nameEl = document.getElementById('routine-name');
    const notesEl = document.getElementById('routine-notes');
    const title = (nameEl && nameEl.value.trim()) || (existingRoutine ? existingRoutine.title : 'Daily Routine');
    const notes = notesEl ? notesEl.value.trim() : (existingRoutine ? existingRoutine.notes : '');
    if (isEditing) {
      updateRoutine(existingRoutine.id, { title, notes });
    } else {
      addRoutine({ title, notes, category: 'Spiritual', time: '08:30 PM' });
    }
    setEditingRoutineId(null);
    if (goBack) goBack('daily_routine_light_mode');
    else if (setActiveTab) setActiveTab('daily_routine_light_mode');
    else useNavigationStore.getState().navigateTo('daily_routine_light_mode');
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)" }}>
            {isEditing ? 'Edit Routine' : 'Add Routine'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCancel} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"><ArrowLeft className="w-5 h-5"/></button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 space-y-5 pb-20">
        {/* Header Status Bar */}
        <div className="flex flex-row items-center justify-between w-full px-1 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="h-9 px-3 rounded-full bg-slate-100 text-slate-800 font-medium text-xs shadow-sm flex items-center justify-center gap-1.5 border border-slate-200/60 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {existingRoutine ? `ROUTINE #${existingRoutine.id.toUpperCase()}` : 'NEW ROUTINE'}
            </span>
            <span className="h-9 px-2.5 rounded-full bg-primary/10 text-slate-800 font-medium text-xs border border-primary/20 flex items-center justify-center whitespace-nowrap shrink-0">
              {isEditing ? 'Editing Mode' : 'New Routine'}
            </span>
          </div>
          <button onClick={handleDelete} aria-label="Delete Routine" className="h-9 px-3 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0" type="button">
            <span className="material-symbols-outlined text-[16px]">delete</span>
            <span>Delete</span>
          </button>
        </div>

        {/* Card 1: Routine Name & Sphere/Category Container */}
        <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-800 text-sm" htmlFor="routine-name">Routine Name</label>
              <span className="text-xs text-primary flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Smart Suggest
              </span>
            </div>
            <div className="text-slate-900 placeholder-slate-400 rounded-2xl px-4 py-3 flex items-center gap-3 focus-within:shadow-[0_0_0_2px_rgba(99,102,241,0.4)] transition-all bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <span className="material-symbols-outlined text-primary text-[20px] pointer-events-none shrink-0">menu_book</span>
              <input className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 focus:outline-none text-base" id="routine-name" type="text" key={existingRoutine ? existingRoutine.id : 'new'} defaultValue={existingRoutine ? existingRoutine.title : 'Evening Reading & Quran Reflection'}/>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <label className="block font-medium text-slate-800 text-sm">Sphere / Category</label>
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 scroll-smooth">
              <button className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium whitespace-nowrap bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/80 transition-colors shrink-0 shadow-sm" type="button">
                <span className="material-symbols-outlined text-[16px]">mosque</span>
                Spiritual
              </button>
              <button className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium whitespace-nowrap bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/80 transition-colors shrink-0 shadow-sm" type="button">
                <span className="material-symbols-outlined text-[16px]">fitness_center</span>
                Health &amp; Fitness
              </button>
              <button className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium whitespace-nowrap bg-primary text-white shadow-md shadow-primary/30 border border-primary hover:bg-primary transition-colors shrink-0" type="button">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                Work &amp; Study
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: 2-Column Split Card for Target Time & Duration */}
        <div className="rounded-3xl p-5 grid grid-cols-2 divide-x divide-slate-200/80 gap-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between text-primary text-xs font-semibold">
              <span>TARGET TIME</span>
              <span className="material-symbols-outlined text-[18px]">schedule</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{timeNum}</span>
              <span className="text-sm text-primary font-semibold">{timeMod}</span>
            </div>
            <span className="text-xs text-slate-500 mt-1">Immediately after Isha prayer</span>
          </div>
          
          <div className="flex flex-col justify-between pl-4">
            <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
              <span>DURATION</span>
              <span className="material-symbols-outlined text-[18px]">timelapse</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">25</span>
              <span className="text-sm text-slate-400 font-medium">min</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              <button className="rounded-full py-1 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/80 text-center transition-colors" type="button">15m</button>
              <button className="rounded-full py-1 text-xs font-medium bg-primary text-white shadow-md shadow-primary/30 text-center border border-primary" type="button">25m</button>
              <button className="rounded-full py-1 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/80 text-center transition-colors" type="button">45m</button>
              <button className="rounded-full py-1 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/80 text-center transition-colors" type="button">60m</button>
            </div>
          </div>
        </div>

        {/* Card 3: Cadence & Repeat Container */}
        <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-800 text-sm">Cadence &amp; Repeat</label>
            <span className="text-xs text-primary font-medium">{existingRoutine ? existingRoutine.frequency : '3 active days / week'}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <button className="py-2 rounded-lg text-slate-400 text-xs font-medium hover:bg-slate-800/50 transition-colors" type="button">Every Day</button>
            <button className="py-2 rounded-lg text-slate-400 text-xs font-medium hover:bg-slate-800/50 transition-colors" type="button">Mon &ndash; Fri</button>
            <button className="py-2 rounded-lg bg-slate-800/80 text-primary text-xs font-semibold shadow-sm border border-slate-700" type="button">Custom Days</button>
          </div>

          <div className="flex items-center justify-between w-full mt-3 px-1">
            <button className="w-9 h-9 rounded-full flex flex-col items-center justify-center font-medium text-xs transition-all bg-primary text-white shadow-md shadow-primary/30" type="button">
              <span className="leading-none">S</span>
              <span className="material-symbols-outlined text-[10px] leading-none mt-0.5">check</span>
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs transition-all bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200/80" type="button">M</button>
            <button className="w-9 h-9 rounded-full flex flex-col items-center justify-center font-medium text-xs transition-all bg-primary text-white shadow-md shadow-primary/30" type="button">
              <span className="leading-none">T</span>
              <span className="material-symbols-outlined text-[10px] leading-none mt-0.5">check</span>
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs transition-all bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200/80" type="button">W</button>
            <button className="w-9 h-9 rounded-full flex flex-col items-center justify-center font-medium text-xs transition-all bg-primary text-white shadow-md shadow-primary/30" type="button">
              <span className="leading-none">T</span>
              <span className="material-symbols-outlined text-[10px] leading-none mt-0.5">check</span>
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs transition-all bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200/80" type="button">F</button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs transition-all bg-slate-100 border border-slate-200/80 text-slate-600 hover:bg-slate-200/80" type="button">S</button>
          </div>
        </div>

        {/* Card 4: Alert & Awareness */}
        <div className="rounded-3xl p-5 space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-800 text-sm">Alert &amp; Awareness</label>
            <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Calming Tone
            </span>
          </div>

          <div className="rounded-2xl p-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Gentle Reminders</p>
                <p className="text-xs text-slate-400 mt-0.5">{existingRoutine && existingRoutine.reminder ? existingRoutine.reminder : 'Notify before routine commences'}</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-[#10b981] rounded-full relative p-0.5 transition-colors shadow-inner flex items-center justify-end" type="button">
              <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-slate-400 pl-1">Notify Timing</span>
              <div className="text-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between text-sm bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  At start ({timeNum} {timeMod})
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-500">expand_more</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-slate-400 pl-1">Auditory Cue</span>
              <div className="text-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between text-sm bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-primary">music_note</span>
                  Serenity Bell
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-500">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Mindful Intent & Notes */}
        <div className="rounded-3xl p-5 space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-800 text-sm" htmlFor="routine-notes">Mindful Intent &amp; Notes</label>
            <span className="text-xs text-slate-500 font-medium">Optional</span>
          </div>
          <div className="relative">
            <textarea className="bg-slate-50 border border-slate-200/80 text-slate-800 placeholder-slate-400 rounded-2xl p-4 w-full focus:outline-none focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4)] shadow-inner min-h-[100px] resize-none text-sm transition-all" id="routine-notes" rows="3" key={existingRoutine ? `notes-${existingRoutine.id}` : 'notes-new'} defaultValue={existingRoutine ? (existingRoutine.notes || '') : "Reflect upon Surah Al-Mulk and write 3 gratitude notes before sleep."}></textarea>
            <div className="absolute bottom-3 right-4 flex items-center text-slate-500 text-xs font-medium">
              <span>64/200</span>
            </div>
          </div>
        </div>

        {/* Card 6: Streak Protected Widget */}
        <div className="rounded-2xl p-4 mb-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-semibold text-slate-800 text-sm truncate">Streak Protected</p>
              <p className="text-xs text-slate-400 mt-0.5 truncate">Completed 14 of the last 16 target days</p>
            </div>
          </div>
          <span className="text-lg font-bold text-emerald-600 shrink-0 pl-3">{existingRoutine && existingRoutine.streak ? `${existingRoutine.streak}d` : '88%'}</span>
        </div>

        {/* Bottom Action Buttons */}
        <div className="space-y-3 pt-2">
          <button onClick={handleSave} className="btn-primary w-full" type="button">
            <span>{isEditing ? 'Update Routine' : 'Save Routine Changes'}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleCancel} className="btn-secondary w-full" type="button">
              Cancel
            </button>
            <button onClick={handleDelete} className="btn-danger w-full" type="button">
              <span className="material-symbols-outlined text-[16px]">delete_outline</span>
              Delete Routine
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
