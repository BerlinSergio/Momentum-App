import React, { useState } from 'react';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import UserAvatar from './components/UserAvatar';
import { useTranslation } from 'react-i18next';
import { useTasbeehStore } from './store/useTasbeehStore';
import { 
  ArrowLeft, Calendar, SlidersHorizontal, CheckCircle2, Upload, Play, Quote, PlusCircle, History, Trash2 
} from 'lucide-react';
import { toast } from './components/ui/toast/index.js';
import { confirm } from './components/ui/confirmation/index.js';

export default function DhikrHistoryLightMode({ setActiveTab }) {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-transparent flex flex-col justify-between relative select-none">
      
      {/* SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 pb-40">
        
        {/* 1. TOP HEADER BAR */}
        <MomentumGlassHeader isDarkMode={false}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
              <History className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
              {t('tasbeeh.dhikrHistory', 'Dhikr History')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('tasbeeh_main_light_mode')}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <UserAvatar 
            setActiveTab={setActiveTab} 
          />
          </div>
        </MomentumGlassHeader>

        {/* 2. SUB-BAR: DATE & DESCRIPTION */}
        <div className="px-5 pt-2 pb-3">
          <div className="flex flex-row items-center justify-between w-full mb-1.5">
            <div className="h-9 px-3.5 rounded-full flex items-center justify-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-primary"/>
              <span style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
                {activeFilter === 'Today' ? `${t('common.today', 'Today')} • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : activeFilter}
              </span>
            </div>
            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('tasbeeh_settings_light_mode')}
              className="h-9 w-9 rounded-full bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 shadow-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer select-none"
            >
              <SlidersHorizontal className="w-4 h-4"/>
            </button>
          </div>
          <p className="text-xs font-normal text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
            {t('tasbeeh.reflectMilestones', 'Reflect upon your daily dhikr milestones and spiritual consistency.')}
</p>
</div>

{/* 3. TODAY'S RECITATIONS HERO CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              {activeFilter === 'Today' ? t('tasbeeh.todaysRecitations', "Today's Recitations") : `${activeFilter} Recitations`}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/70">
              <CheckCircle2 className="w-3 h-3 text-teal-500"/>
              {totalRecited >= targetGoal ? t('tasbeeh.goalMet', 'Surpassed Goal') : t('common.active', 'On Track')}
            </span>
          </div>

          <div className="pt-0.5">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-primary">{totalRecited.toLocaleString()}</h2>
              <span className="text-xs font-medium text-slate-500">{t('tasbeeh.dhikrCompleted', 'dhikr completed')}</span>
            </div>
          </div>

          {/* 3-Column Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-2xl text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <span className="text-[10px] font-medium text-slate-400 block">{t('tasbeeh.sessions', 'Sessions')}</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{sessionCount}</span>
              <span className="text-[10px] text-slate-500 block">{targetSessions}</span>
            </div>
            <div className="p-2.5 rounded-2xl text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <span className="text-[10px] font-medium text-slate-400 block">{t('tasbeeh.activeStreak', 'Active Streak')}</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">14d 🔥</span>
              <span className="text-[10px] text-slate-500 block">{t('tasbeeh.personalBest', 'Personal best')}</span>
            </div>
            <div className="p-2.5 rounded-2xl text-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <span className="text-[10px] font-medium text-slate-400 block">{t('tasbeeh.goalMet', 'Goal Met')}</span>
              <span className="text-sm font-bold text-teal-600 mt-0.5 block">{goalPercentage}%</span>
              <span className="text-[10px] text-slate-500 block">{targetGoal.toLocaleString()} {t('tasbeeh.baseline', 'baseline')}</span>
            </div>
          </div>

          {/* Time Filter Segmented Tabs */}
          <div className="p-1 rounded-2xl bg-slate-100/80 border border-slate-200/70 flex items-center gap-1">
            {['Today', 'This Week', 'This Month', 'All Time'].map((tab) => {
              const tabLabel = tab === 'Today' ? t('common.today', 'Today') : tab === 'This Week' ? t('common.weekly', 'This Week') : tab === 'This Month' ? t('common.monthly', 'This Month') : t('common.all', 'All Time');
              return (
                <button 
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none text-center ${
                    activeFilter === tab 
                      ? 'bg-white text-primary shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. TIMELINE HEADER */}
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>{t('tasbeeh.timeline', 'Timeline')}</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 border border-primary/20 text-slate-900" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
              {sessionCount} {t('tasbeeh.recorded', 'Recorded')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {sessionCount > 0 && (
              <button 
                type="button"
                onClick={async () => {
                  const confirmed = await confirm({
                    variant: 'destructive',
                    titleKey: 'confirm.clearHistoryTitle',
                    messageKey: 'confirm.clearHistoryDescription',
                    confirmLabelKey: 'confirm.delete',
                    cancelLabelKey: 'confirm.cancel',
                  });
                  if (confirmed) {
                    clearHistory();
                    toast.success(t('toasts.historyCleared', 'Dhikr history cleared'));
                  }
                }}
                className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer select-none"
              >
                <Trash2 className="w-3.5 h-3.5"/>
                <span>{t('common.clear', 'Clear')}</span>
              </button>
            )}
            <button 
              type="button"
              onClick={() => toast.info(`Exporting ${t('tasbeeh.dhikrHistory', 'Dhikr History')}`)}
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary cursor-pointer select-none"
            >
              <span>{t('common.export', 'Export')}</span>
              <Upload className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>

        {/* 5. TIMELINE CARDS */}
        {sessionCount === 0 ? (
          <div className="mx-5 p-8 rounded-3xl text-center space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
            <p className="text-sm font-semibold text-slate-700">{t('tasbeeh.noDhikrSessions', 'No recorded Dhikr sessions yet.')}</p>
            <p className="text-xs text-slate-500">{t('tasbeeh.startSessionPrompt', 'Tap below to start your digital tasbeeh session.')}</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const formattedDate = formatLogDate(log.date);

            return (
              <div key={log.id} className="block mx-5 mb-3.5 p-4 rounded-3xl space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600"/>
                    <span className="text-xs font-medium text-slate-500">{formattedDate}</span>
                  </div>
                  <span className="text-xs font-semibold text-teal-600">{t('common.completed', 'Completed')}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{log.phrase}</h4>
                <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-100 pt-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('tasbeeh.totalRecited', 'Total Recited')}</span>
                    <span className="font-bold text-slate-900">{log.count} <span className="text-slate-400 font-normal">/ {log.target || log.count}</span></span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('common.duration', 'Duration')}</span>
                    <span className="font-semibold text-slate-700">{log.duration || t('tasbeeh.defaultDuration', '3m 15s')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('tasbeeh.sessionType', 'Session Type')}</span>
                    <span className="font-semibold text-slate-700 truncate block">{log.sessionType || t('tasbeeh.dailyDhikr', 'Daily Dhikr')}</span>
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
                    if (setActiveTab) setActiveTab('tasbeeh_main_light_mode');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer select-none active:scale-[0.99]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-700"/>
                  {t('common.repeat', 'Repeat')}
                </button>
              </div>
            );
          })
        )}

        {/* Quote Card */}
        <div className="block mx-5 mb-4 p-5 rounded-3xl space-y-2 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center shadow-2xs">
            <Quote className="w-4 h-4"/>
          </div>
          <p className="text-xs font-medium italic text-slate-900 leading-relaxed">
            {t('tasbeeh.spiritualPeaceQuote', 'The remembrance of Allah brings peace to the heart.')}
          </p>
          <span className="text-[11px] font-normal text-primary block text-right">
            — {t('tasbeeh.surahRadAyah', 'Surah Ar-Ra\'d 13:28')}
          </span>
        </div>

        {/* Action Button (In-flow, clean spacing above bottom nav) */}
        <div className="mx-5 pt-2">
          <button 
            type="button"
            onClick={() => setActiveTab && setActiveTab('tasbeeh_main_light_mode')}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary-container hover:from-primary hover:to-primary-container text-white font-semibold text-sm shadow-xl shadow-primary/35 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer select-none"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.2]"/>
            <span>+ {t('tasbeeh.startNewSession', 'Start New Session')}</span>
          </button>
        </div>

      </div>

    </div>
  );
}