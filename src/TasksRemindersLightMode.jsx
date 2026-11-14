import React, { useState, useEffect } from 'react';
import { useTaskStore, getConsistencyScore } from './store/useTaskStore';
import { useProfileStore } from './store/useProfileStore';
import UserAvatar from './components/UserAvatar';
import DailyRoutineLightMode from './DailyRoutineLightMode';

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

const getTodayIsoDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  const profile = useProfileStore();
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  useEffect(() => {
    if (initialSubTab) setActiveSubTab(initialSubTab);
  }, [initialSubTab]);
  const [activeFilter, setActiveFilter] = useState('today');
  const [sortByTime, setSortByTime] = useState(false);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(true);
  const { tasks, toggleTaskStatus, setEditingTaskId } = useTaskStore();

  const todayStr = getTodayIsoDate();
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
        
        {/* Top Header & Title Row */}
        <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
              <Sparkles className="w-5 h-5 text-white"/>
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
              {activeSubTab === 'routine' ? 'Daily Routine' : 'Tasks & Reminders'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5"/>
            </button>
            <UserAvatar 
              setActiveTab={setActiveTab} 
            />
          </div>
        </div>

        {/* Sleek Glassmorphic Local Navigation Tabs */}
        <div className="px-5 pt-1 pb-2 relative z-50">
          <div className="p-1 rounded-2xl bg-slate-200/60 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={() => setActiveSubTab('tasks')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeSubTab === 'tasks' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-medium'}`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tasks</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('routine')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${activeSubTab === 'routine' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-medium'}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Routine</span>
            </button>
          </div>
        </div>

        {activeSubTab === 'routine' ? (
          <DailyRoutineLightMode setActiveTab={setActiveTab} goBack={goBack} hideHeader={true} />
        ) : (
          <>

        {/* Title & Profile Avatar Banner */}
        <div className="flex items-center justify-between px-5 pt-2 pb-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>Tasks & Reminders</h1>
            <p className="text-xs font-normal text-slate-800 mt-0.5" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>Organize your day with mindful focus</p>
          </div>
          <UserAvatar 
            size="w-12 h-12" 
            textSize="text-lg" 
            setActiveTab={setActiveTab} 
          />
        </div>

        {/* Daily Momentum Hero Card */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary"/>
                Daily Momentum
              </span>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{completedToday} of {totalToday}</h2>
                <span className="text-xs font-medium text-slate-500">Completed</span>
              </div>
              <p className="text-[11px] font-medium text-primary mt-1 flex items-center gap-1">
                {remainingToday} task{remainingToday === 1 ? "" : "s"} remaining today • Keep your momentum ✨
              </p>
            </div>
            
            {/* Circular Mini Progress Ring */}
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${progressPercentage}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-xs font-bold text-slate-800">{progressPercentage}%</span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${consistency.textColor}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${consistency.iconColor}`}/>
              Consistency score: {consistency.score}
            </span>
            <button 
              className="btn-primary" 
              onClick={() => {
                setEditingTaskId(null);
                setActiveTab && setActiveTab('add_edit_task_light_mode');
              }}
            >
              <Plus className="w-3.5 h-3.5"/>
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Filter Pill Chips */}
        <div className="flex items-center gap-2 px-5 mb-5">
          <button 
            onClick={() => setActiveFilter('today')}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all cursor-pointer select-none active:scale-95 ${activeFilter === 'today' ? 'bg-primary text-white' : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'}`}
          >
            Today ({todayTasks.length})
          </button>
          <button 
            onClick={() => setActiveFilter('upcoming')}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all cursor-pointer select-none active:scale-95 ${activeFilter === 'upcoming' ? 'bg-primary text-white' : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'}`}
          >
            Upcoming ({upcomingTasks.length})
          </button>
          <button 
            onClick={() => setActiveFilter('done')}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-semibold shadow-sm text-center transition-all cursor-pointer select-none active:scale-95 ${activeFilter === 'done' ? 'bg-primary text-white' : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'}`}
          >
            Done ({completedTasks.length})
          </button>
        </div>

        {/* Today's Focus Section & Detailed Tiles */}
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-primary"/>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
              {activeFilter === 'today' ? "Today's Focus" : activeFilter === 'upcoming' ? "Upcoming Tasks" : "Completed Tasks"}
            </h3>
          </div>
          <button 
            onClick={() => setSortByTime(!sortByTime)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none"
          >
            <SlidersHorizontal className="w-3.5 h-3.5"/>
            {sortByTime ? "Reset Order" : "Time & Priority"}
          </button>
        </div>

        {/* Dynamic Task List / Empty State */}
        {displayTasks.length === 0 ? (
          <div className="mx-5 my-4 p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/60 border-white/60 shadow-sm">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
              <CheckCircle2 className="w-8 h-8"/>
            </div>
            <h3 className="text-base font-semibold mb-1 text-slate-900">
              {activeFilter === 'done' ? "All Caught Up!" : "No Tasks Found"}
            </h3>
            <p className="text-xs max-w-[240px] leading-relaxed mb-5 text-slate-600">
              {activeFilter === 'done'
                ? "No pending completed tasks to archive. Enjoy your mindful peace."
                : "No tasks found in this view. Create a new task to organize your day."}
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
              {activeFilter === 'done' ? "Back to Today" : "Add Task"}
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
                    setEditingTaskId(task.id);
                    setActiveTab && setActiveTab('add_edit_task_light_mode');
                  }}
                  className="block mx-5 p-4 rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none space-y-2 bg-white/80 hover:bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Toggle task status"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskStatus(task.id);
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
                          {task.priority} Priority
                        </span>
                      )}
                      {task.category && (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${getCategoryBadgeClass(task.category)}`}>
                          {task.category}
                        </span>
                      )}
                    </div>
                    <button 
                      aria-label="Edit task"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTaskId(task.id);
                        setActiveTab && setActiveTab('add_edit_task_light_mode');
                      }}
                      className="text-slate-400 hover:bg-slate-50 rounded-full p-1 cursor-pointer transition-colors"
                    >
                      <MoreVertical className="w-4 h-4"/>
                    </button>
                  </div>
                  <div className="pl-7">
                    <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">
                      🕒 {task.startTime || 'All day'}{task.reminder ? ` • 🔔 ${task.reminder}` : ''}{task.estimate ? ` • ⏱️ ${task.estimate}` : ''}
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
                          {task.subTasks.filter((s) => s.completed).length}/{task.subTasks.length} steps
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
        <div className="block mx-5 mb-4 p-5 rounded-3xl space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary"/>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Upcoming Days</h3>
            </div>
            <button 
              onClick={() => setActiveFilter('upcoming')}
              className="text-xs font-semibold text-primary hover:text-primary active:scale-95 transition-all cursor-pointer select-none"
            >
              View Week
            </button>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <p className="text-xs text-slate-500 py-1">No upcoming tasks scheduled.</p>
          ) : (
            upcomingTasks.slice(0, 3).map((task) => (
              <div 
                key={task.id}
                onClick={() => {
                  setEditingTaskId(task.id);
                  setActiveTab && setActiveTab('add_edit_task_light_mode');
                }}
                className="p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer select-none bg-white/80 hover:bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600">
                    <span className="text-[9px] font-bold uppercase">{getDayOfWeekAbbr(task.dueDate)}</span>
                    <span className="text-sm font-bold">{getDayOfMonth(task.dueDate)}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{task.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{task.startTime || '10:00 AM'} • {task.category || 'General'}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400"/>
              </div>
            ))
          )}
        </div>

        {/* Completed Earlier Accordion Card */}
        <div className="block mx-5 mb-32 p-5 rounded-3xl space-y-3 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
          <div 
            className="flex items-center justify-between pb-2 border-t-0 border-slate-100 cursor-pointer select-none"
            onClick={() => setIsCompletedExpanded(!isCompletedExpanded)}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4"/>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Completed Earlier</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                {completedTasks.length}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${isCompletedExpanded ? 'rotate-180' : 'rotate-0'}`}/>
          </div>
          
          {isCompletedExpanded && (
            <>
              {completedTasks.length === 0 ? (
                <p className="text-xs text-slate-500 py-1">No completed tasks yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {completedTasks.slice(0, 5).map((task) => (
                    <div 
                      key={task.id}
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setActiveTab && setActiveTab('add_edit_task_light_mode');
                      }}
                      className="flex items-center justify-between text-xs font-medium text-slate-500 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-teal-500 font-bold">✔</span>
                        <span className="line-through">{task.title}{task.startTime ? ` — ${task.startTime}` : ''}</span>
                      </div>
                      <button
                        type="button"
                        aria-label="Mark incomplete"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskStatus(task.id);
                        }}
                        className="text-[10px] text-primary hover:underline"
                      >
                        Undo
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
                    <History className="w-3.5 h-3.5"/>View Archive ({completedTasks.length})
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

