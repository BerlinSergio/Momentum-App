import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState } from 'react';
import { useTaskStore, getConsistencyScore } from './store/useTaskStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useAppTime } from './hooks/useAppTime';
import UserAvatar from './components/UserAvatar';
import DailyRoutineLightMode from './DailyRoutineLightMode';
import { toast } from './components/ui/toast/index.js';

import {
  Sparkles,
  Bell,
  CheckCircle2,
  Plus,
  Circle,
  MoreVertical,
  Sun,
  SlidersHorizontal,
  Calendar,
  ChevronRight,
  ChevronDown,
  History,
  CheckSquare,
  Clock,
} from 'lucide-react';

const getDayOfWeekAbbr = (dateStr) => {
  if (!dateStr) return new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const d = new Date(dateStr + 'T00:00:00');
  return isNaN(d.getTime()) ? new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() : d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
};

const getDayOfMonth = (dateStr) => {
  if (!dateStr) return String(new Date().getDate());
  const d = new Date(dateStr + 'T00:00:00');
  return isNaN(d.getTime()) ? String(new Date().getDate()) : String(d.getDate());
};

const getCategoryBadgeClass = (category) => {
  switch (category) {
    case 'Work': return 'bg-slate-100 text-slate-600';
    case 'Spiritual': return 'bg-violet-50 text-violet-700';
    case 'Health':
    case 'Wellness': return 'bg-teal-50 text-teal-700';
    case 'Personal': return 'bg-purple-50 text-purple-700';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'High': return 'bg-rose-50 text-rose-700';
    case 'Medium': return 'bg-amber-50 text-amber-700';
    case 'Low': return 'bg-slate-100 text-slate-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getTaskCircleColor = (task) => {
  if (task.category === 'Work') return 'text-violet-500';
  if (task.category === 'Spiritual') return 'text-teal-500';
  if (task.category === 'Health' || task.category === 'Wellness') return 'text-cyan-500';
  if (task.category === 'Personal') return 'text-purple-500';
  return 'text-slate-300';
};

export default function TasksRemindersLightMode({ setActiveTab, initialSubTab = 'tasks', goBack }) {
  const { t } = useTranslation();
  const storeTasksSubTab = useNavigationStore((s) => s.tasksSubTab);
  const setTasksSubTab = useNavigationStore((s) => s.setTasksSubTab);

  const activeSubTab = storeTasksSubTab || initialSubTab || 'tasks';

  const handleSubTabChange = (tab) => {
    setTasksSubTab(tab);
  };
  const [activeFilter, setActiveFilter] = useState('today');
  const [sortByTime, setSortByTime] = useState(false);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(true);
  const { tasks, toggleTaskStatus, setEditingTaskId } = useTaskStore();

  const handleTaskToggle = (task) => {
    const willBeDone = task.status !== 'done';
    toggleTaskStatus(task.id);
    if (willBeDone) {
      toast.success(t('tasks.taskMarkedDone', 'Task marked as done'));
    } else {
      toast.info(t('tasks.taskMarkedTodo', 'Task marked as to-do'));
    }
  };
  const { currentDateKey } = useAppTime();

  const todayStr = currentDateKey;
  const todayTasks = tasks.filter((t) => t.dueDate && (t.dueDate === todayStr || t.dueDate.startsWith(todayStr)));
  const upcomingTasks = tasks.filter((t) => t.dueDate && t.dueDate > todayStr).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const completedTasks = tasks.filter((t) => t.status === 'done');

  const totalToday = todayTasks.length;
  const completedToday = todayTasks.filter((t) => t.status === 'done').length;
  const progressPercentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  const remainingToday = Math.max(0, totalToday - completedToday);
  const consistency = getConsistencyScore(tasks, false);

  let displayTasks = activeFilter === 'today'
    ? todayTasks
    : activeFilter === 'upcoming'
    ? upcomingTasks
    : completedTasks;

  if (sortByTime) {
    displayTasks = [...displayTasks].sort((a, b) => {
      const timeA = a.startTime || '99:99';
      const timeB = b.startTime || '99:99';
      return timeA.localeCompare(timeB);
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
      <div className="flex-1 pb-32">
        
        {/* Top Header & Title Row (Hidden on desktop since DesktopSidebar provides branding & navigation) */}
        <MomentumGlassHeader isDarkMode={false} className="lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
              <Sparkles className="w-5 h-5 text-white"/>
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
              {activeSubTab === 'routine' ? t('routines.title', 'Daily Routine') : t('tasks.title', 'Tasks & Reminders')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label={t('notifications.title', 'Notifications')} className="p-2 rounded-full text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer">
              <Bell className="w-5 h-5"/>
            </button>
            <UserAvatar 
              setActiveTab={setActiveTab} 
            />
          </div>
        </MomentumGlassHeader>

        {/* Sleek Glassmorphic Local Navigation Tabs */}
        <div className="px-5 lg:px-0 pt-1 pb-2 relative z-50">
          <div className="p-1 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={() => handleSubTabChange('tasks')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeSubTab === 'tasks' ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'}`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>{t('nav.tasks', 'Tasks')}</span>
            </button>
            <button 
              type="button"
              onClick={() => handleSubTabChange('routine')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeSubTab === 'routine' ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t('routines.title', 'Routine')}</span>
            </button>
          </div>
        </div>

        {activeSubTab === 'routine' ? (
          <DailyRoutineLightMode setActiveTab={setActiveTab} goBack={goBack} hideHeader={true} />
        ) : (
          <>
            {/* Title & Profile Avatar Banner */}
            <div className="flex items-center justify-between px-5 lg:px-0 pt-2 pb-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>{t('tasks.title', 'Tasks & Reminders')}</h1>
                <p className="text-xs font-normal text-slate-800 mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>{t('tasks.organizeDayFocus', 'Organize your day with mindful focus')}</p>
              </div>
              <UserAvatar 
                size="w-12 h-12" 
                textSize="text-lg" 
                setActiveTab={setActiveTab} 
              />
            </div>

            {/* Daily Momentum Hero Card */}
            <div className="block mx-5 lg:mx-0 mb-5 p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary"/>
                    {t('tasks.dailyMomentum', 'Daily Momentum')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">{completedToday} {t('common.of', 'of')} {totalToday}</h2>
                    <span className="text-xs font-medium text-slate-500">{t('common.completed', 'Completed')}</span>
                  </div>
                  <p className="text-[11px] font-medium text-primary mt-1 flex items-center gap-1">
                    {t('tasks.tasksRemainingToday', { count: remainingToday })}
                  </p>
                </div>
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-primary" strokeDasharray={`${progressPercentage}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-800">{progressPercentage}%</span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${consistency.textColor}`}>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${consistency.iconColor}`}/>
                  {t('tasks.consistencyScore', 'Consistency score')}: {consistency.score === 'Starting' ? t('tasks.scoreStarting', 'Starting') : consistency.score === 'High' ? t('tasks.scoreHigh', 'High') : consistency.score === 'Good' ? t('tasks.scoreGood', 'Good') : consistency.score === 'Building' ? t('tasks.scoreBuilding', 'Building') : consistency.score === 'Needs Focus' ? t('tasks.scoreNeedsFocus', 'Needs Focus') : consistency.score}
                </span>
                <button 
                  className="btn-primary flex items-center gap-1.5 cursor-pointer" 
                  onClick={() => {
                    setEditingTaskId(null);
                    setActiveTab && setActiveTab('add_edit_task_light_mode');
                  }}
                >
                  <Plus className="w-3.5 h-3.5"/>
                  <span>{t('tasks.addTask', 'Add Task')}</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 px-5 lg:px-0 mb-5">
              <button 
                onClick={() => setActiveFilter('today')}
                className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all cursor-pointer select-none active:scale-95 ${activeFilter === 'today' ? 'bg-primary text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'}`}
              >
                {t('common.today', 'Today')} ({todayTasks.length})
              </button>
              <button 
                onClick={() => setActiveFilter('upcoming')}
                className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all cursor-pointer select-none active:scale-95 ${activeFilter === 'upcoming' ? 'bg-primary text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'}`}
              >
                {t('tasks.upcoming', 'Upcoming')} ({upcomingTasks.length})
              </button>
              <button 
                onClick={() => setActiveFilter('done')}
                className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all cursor-pointer select-none active:scale-95 ${activeFilter === 'done' ? 'bg-primary text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'}`}
              >
                {t('tasks.done', 'Done')} ({completedTasks.length})
              </button>
            </div>

            {/* Today's Focus Section & Detailed Tiles */}
            <div className="flex items-center justify-between px-5 lg:px-0 mb-3">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-primary"/>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {activeFilter === 'today' ? t('tasks.todaysFocus', "Today's Focus") : activeFilter === 'upcoming' ? t('tasks.upcomingTasks', 'Upcoming Tasks') : t('tasks.completedTasks', 'Completed Tasks')}
                </h3>
              </div>
              <button 
                onClick={() => setSortByTime(!sortByTime)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none"
              >
                <SlidersHorizontal className="w-3.5 h-3.5"/>
                {sortByTime ? t('tasks.resetOrder', 'Reset Order') : t('tasks.timePriority', 'Time & Priority')}
              </button>
            </div>

            {/* Dynamic Task List / Empty State */}
            {displayTasks.length === 0 ? (
              <div className="mx-5 lg:mx-0 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/80 border-slate-200 shadow-sm">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                  <CheckCircle2 className="w-8 h-8"/>
                </div>
                <h3 className="text-base font-semibold mb-1 text-slate-900">
                  {activeFilter === 'done' ? t('tasks.allCaughtUp', 'All Caught Up!') : t('tasks.noTasksFound', 'No Tasks Found')}
                </h3>
                <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-500">
                  {activeFilter === 'done'
                    ? t('tasks.noPendingCompletedTasks', 'No pending completed tasks to archive. Enjoy your mindful peace.')
                    : t('tasks.noTasksViewDesc', 'No tasks found in this view. Create a new task to organize your day.')}
                </p>
                <button 
                  onClick={() => {
                    if (activeFilter === 'done') {
                      setActiveFilter('today');
                    } else {
                      setEditingTaskId(null);
                      setActiveTab && setActiveTab('add_edit_task_light_mode');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 bg-primary text-white shadow-md active:scale-95 transition-all cursor-pointer select-none"
                >
                  {activeFilter === 'done' ? t('tasks.backToToday', 'Back to Today') : t('tasks.addTask', 'Add Task')}
                </button>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {displayTasks.map((task) => {
                  const isDone = task.status === 'done';
                  return (
                    <div 
                      key={task.id}
                      onClick={() => {
                        setActiveTab && setActiveTab('task_details_light_mode', { taskId: task.id });
                      }}
                      className="block mx-5 lg:mx-0 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-2 bg-white/80 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={t('tasks.toggleStatus', 'Toggle task status')}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskToggle(task);
                            }}
                            className="p-0.5 rounded-full hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : (
                              <Circle className={`w-5 h-5 ${getTaskCircleColor(task)}`} />
                            )}
                          </button>
                          {task.priority && (
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${getPriorityBadgeClass(task.priority)}`}>
                              {task.priority} {t('common.priority', 'Priority')}
                            </span>
                          )}
                          {task.category && (
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${getCategoryBadgeClass(task.category)}`}>
                              {task.category}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label={t('tasks.editTask', 'Edit task')}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTaskId(task.id);
                            setActiveTab && setActiveTab('add_edit_task_light_mode');
                          }}
                          className="text-slate-400 hover:bg-slate-100 rounded-full p-1 cursor-pointer transition-colors"
                        >
                          <MoreVertical className="w-4 h-4"/>
                        </button>
                      </div>
                      <div className="pl-7">
                        <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {task.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {task.startTime || t('common.allDay', 'All day')}{task.reminder ? ` • 🔔 ${task.reminder}` : ''}{task.estimate ? ` • ⏱️ ${task.estimate}` : ''}
                        </p>
                        {task.subTasks && task.subTasks.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${Math.round((task.subTasks.filter((s) => s.completed).length / task.subTasks.length) * 100)}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-semibold text-slate-500">
                              {task.subTasks.filter((s) => s.completed).length}/{task.subTasks.length} {t('tasks.steps', 'steps')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Upcoming Days Section */}
            <div className="block mx-5 lg:mx-0 mb-4 p-5 rounded-3xl space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary"/>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t('routines.upcomingDays', 'Upcoming Days')}</h3>
                </div>
                <button 
                  onClick={() => setActiveFilter('upcoming')}
                  className="text-xs font-semibold text-primary hover:text-primary active:scale-95 transition-all cursor-pointer select-none"
                >
                  {t('tasks.viewWeek', 'View Week')}
                </button>
              </div>
              
              {upcomingTasks.length === 0 ? (
                <p className="text-xs text-slate-500 py-1">{t('tasks.noUpcomingTasks', 'No upcoming tasks scheduled.')}</p>
              ) : (
                upcomingTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => {
                      setActiveTab && setActiveTab('task_details_light_mode', { taskId: task.id });
                    }}
                    className="p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/80 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-700">
                        <span className="text-[9px] font-bold uppercase">{getDayOfWeekAbbr(task.dueDate)}</span>
                        <span className="text-sm font-bold">{getDayOfMonth(task.dueDate)}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{task.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{task.startTime || '10:00 AM'} • {task.category || t('common.general', 'General')}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400"/>
                  </div>
                ))
              )}
            </div>

            {/* Completed Earlier Section */}
            <div className="block mx-5 lg:mx-0 mb-32 p-5 rounded-3xl space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-md">
              <div 
                className="flex items-center justify-between pb-2 border-t-0 border-slate-100 cursor-pointer select-none"
                onClick={() => setIsCompletedExpanded(!isCompletedExpanded)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4"/>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{t('tasks.completedEarlier', 'Completed Earlier')}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {completedTasks.length}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${isCompletedExpanded ? 'rotate-180' : 'rotate-0'}`}/>
              </div>
              
              {isCompletedExpanded && (
                <>
                  {completedTasks.length === 0 ? (
                    <p className="text-xs text-slate-500 py-1">{t('tasks.noCompletedTasks', 'No completed tasks yet.')}</p>
                  ) : (
                    <div className="space-y-2.5">
                      {completedTasks.slice(0, 5).map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => {
                            setActiveTab && setActiveTab('task_details_light_mode', { taskId: task.id });
                          }}
                          className="flex items-center justify-between text-xs font-medium text-slate-500 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-teal-600 font-bold">✔</span>
                            <span className="line-through">{task.title}{task.startTime ? ` — ${task.startTime}` : ''}</span>
                          </div>
                          <button
                            type="button"
                            aria-label={t('tasks.markIncomplete', 'Mark incomplete')}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskToggle(task);
                            }}
                            className="text-[10px] text-primary hover:underline cursor-pointer"
                          >
                            {t('common.undo', 'Undo')}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {completedTasks.length > 0 && (
                    <div className="pt-3 border-t border-slate-100">
                      <button 
                        onClick={() => setActiveFilter('done')}
                        className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary w-full transition-colors cursor-pointer select-none"
                      >
                        <History className="w-3.5 h-3.5"/>
                        <span>{t('tasks.viewArchive', 'View Archive')} ({completedTasks.length})</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}