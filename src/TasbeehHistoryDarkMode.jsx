import React, { useState } from 'react';
import UserAvatar from './components/UserAvatar';
import { useTasbeehStore } from './store/useTasbeehStore';
import { 
  ArrowLeft, Calendar, SlidersHorizontal, CheckCircle2, Upload, Play, Quote, PlusCircle, History, Trash2 
} from 'lucide-react';

export default function TasbeehHistoryDarkMode({ setActiveTab, goBack }) {
  const { historyLogs, currentCount, dailyGoal, clearHistory, setActivePreset } = useTasbeehStore();
  const [activeFilter, setActiveFilter] = useState('Today');

  // Filter logs dynamically based on the active timeframe tab
  const filteredLogs = (historyLogs || []).filter((log) => {
    if (activeFilter === 'All Time') return true;
    if (!log.date) return activeFilter === 'Today';

    const logDate = new Date(log.date);
    if (isNaN(logDate.getTime())) return activeFilter === 'Today' || activeFilter === 'All Time';

    const now = new Date();

    if (activeFilter === 'Today') {
      return (
        logDate.getFullYear() === now.getFullYear() &&
        logDate.getMonth() === now.getMonth() &&
        logDate.getDate() === now.getDate()
      );
    }

    if (activeFilter === 'This Week') {
      const diffMs = now.getTime() - logDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    }

    if (activeFilter === 'This Month') {
      return (
        logDate.getFullYear() === now.getFullYear() &&
        logDate.getMonth() === now.getMonth()
      );
    }

    return true;
  });

  // Calculate statistics dynamically based on filtered logs
  const completedRecited = filteredLogs.reduce((sum, item) => sum + (Number(item.count) || 0), 0);
  const totalRecited = completedRecited + (Number(currentCount) || 0);
  const sessionCount = filteredLogs.length;
  const baselineGoal = dailyGoal || 1000;
  const targetGoal = activeFilter === 'Today' ? baselineGoal : activeFilter === 'This Week' ? baselineGoal * 7 : activeFilter === 'This Month' ? baselineGoal * 30 : baselineGoal;
  const goalPercentage = targetGoal > 0 ? Math.min(999, Math.round((totalRecited / targetGoal) * 100)) : 0;
  const targetSessions = activeFilter === 'Today' ? 'Target 6' : activeFilter === 'This Week' ? 'Target 30' : activeFilter === 'This Month' ? 'Target 120' : 'Target 6';

  const formatLogDate = (dateStr) => {
    if (!dateStr) return 'Today • 08:45 PM';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Today • 08:45 PM';

    const now = new Date();
    const isToday = (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = (
      d.getFullYear() === yesterday.getFullYear() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getDate() === yesterday.getDate()
    );

    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) return `Today • ${timeStr}`;
    if (isYesterday) return `Yesterday • ${timeStr}`;
    return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })} • ${timeStr}`;
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col justify-between relative select-none">
      
      {/* SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 pb-40">
        
        {/* 1. TOP HEADER BAR */}
        <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
              <History className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Dhikr History
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => (goBack ? goBack('tasbeeh_main_dark_mode') : (setActiveTab ? setActiveTab('tasbeeh_main_dark_mode') : window.history.back()))}
              className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer select-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <UserAvatar 
            setActiveTab={setActiveTab} 
          />
          </div>
        </div>

        {/* 2. SUB-BAR: DATE & DESCRIPTION */}
        <div className="px-5 pt-2 pb-3">
          <div className="flex flex-row items-center justify-between w-full mb-1.5">
            <div className="h-9 px-3.5 rounded-full flex items-center justify-center gap-2 text-xs font-semibold text-primary bg-slate-900 border border-slate-800 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-primary"/>
              <span>
                {activeFilter === 'Today' ? `Today • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : activeFilter}
              </span>
            </div>
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('tasbeeh_settings_dark_mode')}
              className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 shadow-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer select-none"
            >
              <SlidersHorizontal className="w-4 h-4"/>
            </button>
          </div>
          <p className="text-xs font-normal text-slate-400">
            Reflect upon your daily dhikr milestones and spiritual consistency.
          </p>
        </div>

        {/* 3. TODAY'S RECITATIONS HERO CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {activeFilter === 'Today' ? "Today's Recitations" : `${activeFilter} Recitations`}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-300 bg-teal-950/40 px-2.5 py-0.5 rounded-full border border-teal-500/30">
              <CheckCircle2 className="w-3 h-3 text-teal-400"/>
              {totalRecited >= targetGoal ? 'Surpassed Goal' : 'On Track'}
            </span>
          </div>

          <div className="pt-0.5">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-primary">{totalRecited.toLocaleString()}</h2>
              <span className="text-xs font-medium text-slate-400">dhikr completed</span>
            </div>
          </div>

          {/* 3-Column Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
            <div className="p-2.5 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <span className="text-[10px] font-medium text-slate-400 block">Sessions</span>
              <span className="text-sm font-bold text-white mt-0.5 block">{sessionCount}</span>
              <span className="text-[10px] text-slate-400 block">{targetSessions}</span>
            </div>
            <div className="p-2.5 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <span className="text-[10px] font-medium text-slate-400 block">Active Streak</span>
              <span className="text-sm font-bold text-white mt-0.5 block">14d 🔥</span>
              <span className="text-[10px] text-slate-400 block">Personal best</span>
            </div>
            <div className="p-2.5 rounded-2xl text-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <span className="text-[10px] font-medium text-slate-400 block">Goal Met</span>
              <span className="text-sm font-bold text-teal-400 mt-0.5 block">{goalPercentage}%</span>
              <span className="text-[10px] text-slate-400 block">{targetGoal.toLocaleString()} baseline</span>
            </div>
          </div>

          {/* Time Filter Segmented Tabs */}
          <div className="p-1 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center gap-1">
            {['Today', 'This Week', 'This Month', 'All Time'].map((tab) => (
              <button 
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none text-center ${
                  activeFilter === tab 
                    ? 'bg-slate-700 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white font-medium'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4. TIMELINE HEADER */}
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Timeline</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 border border-primary/30 text-primary">
              {sessionCount} Recorded
            </span>
          </div>
          <div className="flex items-center gap-2">
            {sessionCount > 0 && (
              <button 
                type="button"
                onClick={() => {
                  if (window.confirm('Clear all logged Dhikr history?')) {
                    clearHistory();
                  }
                }}
                className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer select-none"
              >
                <Trash2 className="w-3.5 h-3.5"/>
                <span>Clear</span>
              </button>
            )}
            <button 
              type="button"
              onClick={() => alert('Exporting Dhikr History... Coming Soon!')}
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary cursor-pointer select-none"
            >
              <span>Export</span>
              <Upload className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>

        {/* 5. TIMELINE CARDS */}
        {sessionCount === 0 ? (
          <div className="mx-5 p-8 rounded-3xl text-center space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <p className="text-sm font-semibold text-slate-300">No recorded Dhikr sessions yet.</p>
            <p className="text-xs text-slate-500">Tap below to start your digital tasbeeh session.</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const formattedDate = formatLogDate(log.date);

            return (
              <div key={log.id} className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400"/>
                    <span className="text-xs font-medium text-slate-400">{formattedDate}</span>
                  </div>
                  <span className="text-xs font-semibold text-teal-400">Completed</span>
                </div>
                <h4 className="text-sm font-bold text-white">{log.phrase}</h4>
                <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-800 pt-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Recited</span>
                    <span className="font-bold text-white">{log.count} <span className="text-slate-500 font-normal">/ {log.target || log.count}</span></span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Duration</span>
                    <span className="font-semibold text-slate-300">{log.duration || '3m 15s'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Session Type</span>
                    <span className="font-semibold text-slate-300 truncate block">{log.sessionType || 'Daily Dhikr'}</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setActivePreset({
                      id: log.id,
                      arabic: log.arabic || '',
                      transliteration: log.phrase,
                      meaning: '',
                      target: log.target || 33,
                    });
                    if (setActiveTab) setActiveTab('tasbeeh_main_dark_mode');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer select-none active:scale-[0.99]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-200"/>
                  Repeat
                </button>
              </div>
            );
          })
        )}

        {/* Quote Card */}
        <div className="block mx-5 mb-4 p-5 rounded-3xl space-y-2 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-primary flex items-center justify-center shadow-2xs">
            <Quote className="w-4 h-4"/>
          </div>
          <p className="text-xs font-medium italic text-primary/70 leading-relaxed">
            "The remembrance of Allah brings peace to the heart."
          </p>
          <span className="text-[11px] font-normal text-primary block text-right">
            — Surah Ar-Ra'd 13:28
          </span>
        </div>

        {/* Action Button (In-flow, clean spacing above bottom nav) */}
        <div className="mx-5 pt-2">
          <button 
            type="button"
            onClick={() => setActiveTab && setActiveTab('tasbeeh_main_dark_mode')}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary-container hover:brightness-105 text-white font-semibold text-sm shadow-xl shadow-black/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer select-none"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.2]"/>
            <span>+ Start New Dhikr Session</span>
          </button>
        </div>

      </div>

    </div>
  );
}