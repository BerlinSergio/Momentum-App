import { useTranslation } from 'react-i18next';
import { useState, useMemo, useRef } from 'react';
import { 
  ArrowLeft, CheckCircle2, Clock, Calendar, 
  AlertCircle, Check, RotateCcw, Pencil, Trash2, 
  Tag, Bell, CheckSquare 
} from 'lucide-react';
import { useTaskStore } from './store/useTaskStore';
import { useNavigationStore } from './store/useNavigationStore';
import { getLocalDateKey } from './utils/timeService';
import { toast } from './components/ui/toast/index.js';

export default function TaskDetailsLightMode({ setActiveTab, goBack, route }) {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const pendingMutation = useRef(false);
  const [isMutating, setIsMutating] = useState(false);
  const [deletingSnapshot, setDeletingSnapshot] = useState(null);
  const routeParams = useNavigationStore((s) => s.routeParams) || route?.params || {};
  const taskId = routeParams.taskId;
  
  const rawTasks = useTaskStore((s) => s.tasks);
  const tasks = useMemo(() => rawTasks || [], [rawTasks]);
  const toggleTaskStatus = useTaskStore((s) => s.toggleTaskStatus);
  const toggleSubTask = useTaskStore((s) => s.toggleSubTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const setEditingTaskId = useTaskStore((s) => s.setEditingTaskId);

  const task = useMemo(() => {
    return tasks.find((t) => t.id === taskId) || (deletingSnapshot?.id === taskId ? deletingSnapshot : undefined);
  }, [tasks, taskId, deletingSnapshot]);

  const handleBack = () => {
    if (pendingMutation.current) return;
    if (typeof goBack === 'function') {
      goBack('tasks_reminders_light_mode');
    } else if (setActiveTab) {
      setActiveTab('tasks_reminders_light_mode');
    } else {
      useNavigationStore.getState().navigateTo('tasks_reminders_light_mode');
    }
  };

  const handleEdit = () => {
    if (!task || pendingMutation.current) return;
    setEditingTaskId(task.id);
    const nav = setActiveTab || useNavigationStore.getState().navigateTo;
    nav('add_edit_task_light_mode', { taskId: task.id });
  };

  const runMutation = async (operation, onCommitted) => {
    if (pendingMutation.current) return false;
    pendingMutation.current = true;
    setIsMutating(true);
    try {
      if (await operation() !== true) throw new Error('Task commit not confirmed');
    } catch {
      toast.error(t('toasts.taskSaveFailed', 'Task change was not safely saved. Reload before trying again.'));
      return false;
    } finally {
      pendingMutation.current = false;
      setIsMutating(false);
    }
    onCommitted?.();
    return true;
  };

  const handleConfirmDelete = () => {
    if (!task || pendingMutation.current) return;
    // Keep the original detail visible until the optimistic deletion commits.
    setDeletingSnapshot(task);
    return runMutation(() => deleteTask(task.id), () => {
      toast.success(t('tasks.taskDeleted', 'Task deleted'));
      setIsDeleteModalOpen(false);
      handleBack();
    });
  };

  const handleToggleStatus = () => {
    if (!task) return;
    const willBeDone = !isDone;
    return runMutation(() => toggleTaskStatus(task.id), () => {
      if (willBeDone) {
        toast.success(t('tasks.taskMarkedDone', 'Task marked as done'));
      } else {
        toast.info(t('tasks.taskMarkedTodo', 'Task marked as to-do'));
      }
    });
  };

  const handleToggleSubTask = (subId) => {
    if (!task) return;
    return runMutation(() => toggleSubTask(task.id, subId));
  };

  const todayKey = getLocalDateKey();
  const isDone = task?.status === 'done' || task?.status === 'completed';
  const isOverdue = !isDone && Boolean(task?.dueDate && task.dueDate < todayKey);
  const isDueToday = task?.dueDate === todayKey;

  const subTasks = task?.subTasks || [];
  const completedSubTasks = subTasks.filter((s) => s.completed).length;
  const subTasksPercent = subTasks.length > 0 ? Math.round((completedSubTasks / subTasks.length) * 100) : 0;

  const displayDate = useMemo(() => {
    const dVal = task?.dueDate;
    if (!dVal) return t('tasks.noDueDate', 'No due date');
    try {
      const parts = dVal.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dVal;
    } catch {
      return dVal;
    }
  }, [task, t]);

  const getPriorityBadgeClass = (priority) => {
    const p = String(priority || '').toLowerCase();
    if (p === 'high' || p === 'urgent') return 'bg-rose-500/10 text-rose-600 border border-rose-500/20';
    if (p === 'medium') return 'bg-amber-500/10 text-amber-700 border border-amber-500/20';
    return 'bg-blue-500/10 text-blue-700 border border-blue-500/20';
  };

  const getCategoryBadgeClass = (cat) => {
    const c = String(cat || '').toLowerCase();
    if (c.includes('work')) return 'bg-indigo-500/10 text-indigo-700 border border-indigo-500/20';
    if (c.includes('health')) return 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20';
    if (c.includes('spirit')) return 'bg-amber-500/10 text-amber-700 border border-amber-500/20';
    if (c.includes('person')) return 'bg-purple-500/10 text-purple-700 border border-purple-500/20';
    return 'bg-slate-100 text-slate-700 border border-slate-200';
  };

  if (!task) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen relative font-sans text-slate-900 p-5 flex flex-col justify-between pb-32">
        <div className="flex items-center justify-between pt-2 mb-8">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t('common.back', 'Back')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/50 text-slate-700 hover:bg-white transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 tracking-wide">{t('tasks.taskDetails', 'Task Details')}</h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl my-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">{t('tasks.taskNotFound', 'Task Not Found')}</h2>
          <p className="text-xs text-slate-500 max-w-xs mb-6">
            {t('tasks.taskNotFoundDesc', 'The requested task could not be found. It may have been completed, deleted, or the link is invalid.')}
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer"
          >
            {t('tasks.returnToTasks', 'Return to Tasks')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen relative font-sans text-slate-900 p-5 flex flex-col pb-36">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-2 mb-6">
        <button
          type="button"
          onClick={handleBack}
          aria-label={t('common.back', 'Back')}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/50 text-slate-700 hover:bg-white transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-900 tracking-wide">{t('tasks.taskDetails', 'Task Details')}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleEdit} disabled={isMutating}
            aria-label={t('tasks.editTask', 'Edit Task')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/50 text-slate-600 hover:text-slate-900 hover:bg-white transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)} disabled={isMutating}
            aria-label={t('tasks.deleteTask', 'Delete Task')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/50 text-rose-500 hover:bg-rose-50 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status & Badges Banner */}
        <div className="p-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {isDone ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t('tasks.statusCompleted', 'Completed')}
              </span>
            ) : isOverdue ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {t('tasks.statusOverdue', 'Overdue')}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {t('tasks.statusTodo', 'To Do')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {task.priority && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getPriorityBadgeClass(task.priority)}`}>
                {task.priority} {t('common.priority', 'Priority')}
              </span>
            )}
            {task.category && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getCategoryBadgeClass(task.category)}`}>
                {task.category}
              </span>
            )}
          </div>
        </div>

        {/* Task Title & Description Card */}
        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg space-y-3">
          <h2 className={`text-xl font-bold leading-snug break-words ${isDone ? 'line-through text-slate-400 decoration-primary/70' : 'text-slate-900'}`}>
            {task.title}
          </h2>
          {task.description ? (
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
              {task.description}
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic">
              {t('tasks.noNotesProvided', 'No additional notes or description provided.')}
            </p>
          )}
        </div>

        {/* Schedule & Details Card */}
        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('tasks.scheduleDetails', 'Schedule & Details')}</h3>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                <Calendar className="w-3.5 h-3.5 text-primary" /> {t('tasks.dueDate', 'Due Date')}
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">
                {displayDate}
              </p>
              {isDueToday && (
                <span className="text-[10px] font-semibold text-primary mt-0.5 inline-block">{t('common.today', 'Today')}</span>
              )}
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> {t('tasks.startTime', 'Start Time')}
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">
                {task.startTime || '--:--'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                <Tag className="w-3.5 h-3.5 text-primary" /> {t('common.duration', 'Duration')}
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">
                {task.estimate || `30 ${t('common.mins', 'mins')}`}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                <Bell className="w-3.5 h-3.5 text-primary" /> {t('tasks.reminder', 'Reminder')}
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">
                {task.reminder || t('common.none', 'None')}
              </p>
              {task.persistentAlert && (
                <span className="text-[10px] font-semibold text-amber-700 mt-0.5 inline-block">{t('tasks.persistent', 'Persistent')}</span>
              )}
            </div>
          </div>
        </div>

        {/* Subtasks Section */}
        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t('tasks.subtasksSteps', 'Subtasks & Steps')}</h3>
            </div>
            {subTasks.length > 0 && (
              <span className="text-[11px] font-semibold text-slate-500">
                {completedSubTasks} {t('common.of', 'of')} {subTasks.length} ({subTasksPercent}%)
              </span>
            )}
          </div>

          {subTasks.length > 0 && (
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${subTasksPercent}%` }}
              />
            </div>
          )}

          {subTasks.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              {t('tasks.noSubtasksDefined', 'No subtasks or checklist steps defined.')}
            </p>
          ) : (
            <div className="space-y-2 pt-1">
              {subTasks.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => handleToggleSubTask(sub.id)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all cursor-pointer select-none"
                >
                  <button
                    type="button"
                    aria-label={`Toggle ${sub.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSubTask(sub.id);
                    }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                      sub.completed 
                        ? 'bg-primary border-primary text-white shadow-sm' 
                        : 'border-slate-300 hover:border-primary text-transparent'
                    }`}
                  >
                    {sub.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </button>
                  <span className={`text-xs font-medium flex-1 truncate ${sub.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {sub.title || t('tasks.addStep', 'Step')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-6 left-0 right-0 max-w-md mx-auto px-5 z-40 flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggleStatus} disabled={isMutating}
          aria-label={isDone ? t('tasks.undoCompletion', 'Undo Completion') : t('tasks.markDone', 'Mark as Done')}
          className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
            isDone
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 shadow-emerald-500/10'
              : 'bg-primary text-white shadow-primary/25 hover:bg-primary/90'
          }`}
        >
          {isDone ? (
            <>
              <RotateCcw className="w-4 h-4" /> {t('tasks.completedUndo', 'Completed — Undo')}
            </>
          ) : (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" /> {t('tasks.markDone', 'Mark as Done')}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleEdit} disabled={isMutating}
          aria-label={t('tasks.editTask', 'Edit Task')}
          className="py-3.5 px-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95 shadow-md cursor-pointer"
        >
          <Pencil className="w-4 h-4" /> {t('common.edit', 'Edit')}
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-xs w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t('tasks.deleteTaskTitle', 'Delete Task?')}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {t('tasks.deleteTaskConfirm', { defaultValue: 'Are you sure you want to delete "{{title}}"? This action cannot be undone.', title: task.title })}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)} disabled={isMutating}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-all active:scale-95 cursor-pointer"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete} disabled={isMutating}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all active:scale-95 cursor-pointer"
              >
                {t('common.delete', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}