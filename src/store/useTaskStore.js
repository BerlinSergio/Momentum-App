import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__momentum_task_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    console.warn('LocalStorage unavailable, falling back to memory store:', e);
  }
  const memoryStore = new Map();
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, value) => { memoryStore.set(key, String(value)); },
    removeItem: (key) => { memoryStore.delete(key); },
  };
};

export const getTodayIsoDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getOffsetIsoDate = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const initialTasks = [
  {
    id: 'task-1',
    title: 'Morning workout & stretch',
    category: 'Health',
    priority: 'Medium',
    dueDate: getTodayIsoDate(),
    startTime: '7:00 AM',
    estimate: '30 mins',
    reminder: '6:50 AM',
    persistentAlert: false,
    description: 'Light mobility stretching and 20 min cardio.',
    subTasks: [
      { id: 'sub-1', title: 'Warm-up stretch', completed: true },
      { id: 'sub-2', title: '20 min jog/cardio', completed: true },
    ],
    status: 'done',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Review Q4 product roadmap & quarterly OKRs',
    category: 'Work',
    priority: 'High',
    dueDate: getTodayIsoDate(),
    startTime: '11:00 AM',
    estimate: '45 mins',
    reminder: '15 minutes before',
    persistentAlert: true,
    description: 'Finalize mobile release milestones with design engineering team and prepare presentation deck.',
    subTasks: [
      { id: 'sub-3', title: 'Present slides 1-12', completed: true },
      { id: 'sub-4', title: 'Send recap email', completed: false },
    ],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Grocery run & meal prep',
    category: 'Personal',
    priority: 'Medium',
    dueDate: getTodayIsoDate(),
    startTime: '5:30 PM',
    estimate: '1 hour',
    reminder: 'At arrival',
    persistentAlert: false,
    description: 'Pick up fresh vegetables, fruits, and prepare dinners for the week.',
    subTasks: [],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Team Sprint Planning',
    category: 'Work',
    priority: 'High',
    dueDate: getOffsetIsoDate(1),
    startTime: '10:00 AM',
    estimate: '1 hour',
    reminder: '10 minutes before',
    persistentAlert: true,
    description: 'Product strategy and backlog grooming.',
    subTasks: [],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-7',
    title: 'Car maintenance checkup',
    category: 'Personal',
    priority: 'Low',
    dueDate: getOffsetIsoDate(2),
    startTime: '2:00 PM',
    estimate: '1.5 hours',
    reminder: '1 hour before',
    persistentAlert: false,
    description: 'Auto Service Center routine inspection.',
    subTasks: [],
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-8',
    title: 'Fajr prayer & gratitude journaling',
    category: 'Spiritual',
    priority: 'High',
    dueDate: getTodayIsoDate(),
    startTime: '5:12 AM',
    estimate: '30 mins',
    reminder: 'At time',
    persistentAlert: false,
    description: 'Early morning contemplation.',
    subTasks: [],
    status: 'done',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-9',
    title: 'Morning hydration (500ml)',
    category: 'Health',
    priority: 'Low',
    dueDate: getTodayIsoDate(),
    startTime: '5:45 AM',
    estimate: '5 mins',
    reminder: 'None',
    persistentAlert: false,
    description: '',
    subTasks: [],
    status: 'done',
    createdAt: new Date().toISOString(),
  },
];

const syncTaskToLocalStorage = (slice) => {
  try {
    const storageObj = typeof window !== 'undefined' && window.localStorage ? window.localStorage : (typeof localStorage !== 'undefined' ? localStorage : null);
    if (storageObj) {
      const raw = storageObj.getItem('momentum-task-storage');
      const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
      parsed.state = { ...(parsed.state || {}), ...slice };
      storageObj.setItem('momentum-task-storage', JSON.stringify(parsed));
    }
  } catch (e) {
    console.warn('[Momentum Tasks] Direct localStorage sync error:', e);
  }
};

const getInitialTaskState = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem('momentum-task-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.state && Array.isArray(parsed.state.tasks)) {
          return {
            tasks: parsed.state.tasks,
            editingTaskId: null,
            _hasHydrated: true,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse momentum-task-storage:', e);
    }
  }
  return {
    tasks: initialTasks,
    editingTaskId: null,
    _hasHydrated: true,
  };
};

export const useTaskStore = create(
  persist(
    (set, get) => ({
      ...getInitialTaskState(),

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      setEditingTaskId: (id) => set({ editingTaskId: id }),

      addTask: (taskData) =>
        set(
          produce((state) => {
            const newTask = {
              id: taskData.id || uuidv4(),
              title: taskData.title || 'Untitled Task',
              category: taskData.category || 'Work',
              priority: taskData.priority || 'Medium',
              dueDate: taskData.dueDate || getTodayIsoDate(),
              startTime: taskData.startTime || '12:00 PM',
              estimate: taskData.estimate || '30 mins',
              reminder: taskData.reminder || '15 minutes before',
              persistentAlert: Boolean(taskData.persistentAlert),
              description: taskData.description || '',
              subTasks: Array.isArray(taskData.subTasks) ? taskData.subTasks : [],
              status: taskData.status || 'todo',
              createdAt: taskData.createdAt || new Date().toISOString(),
            };
            state.tasks.unshift(newTask);
            state.editingTaskId = null;
            syncTaskToLocalStorage({ tasks: state.tasks });
          })
        ),

      updateTask: (taskOrId, updates = {}) =>
        set(
          produce((state) => {
            const id = typeof taskOrId === 'object' && taskOrId !== null ? taskOrId.id : taskOrId;
            const changes = typeof taskOrId === 'object' && taskOrId !== null ? taskOrId : updates;
            const index = state.tasks.findIndex((t) => t.id === id);
            if (index !== -1) {
              state.tasks[index] = { ...state.tasks[index], ...changes };
            }
            state.editingTaskId = null;
            syncTaskToLocalStorage({ tasks: state.tasks });
          })
        ),

      deleteTask: (taskIdOrObj) =>
        set(
          produce((state) => {
            const id = typeof taskIdOrObj === 'object' && taskIdOrObj !== null ? taskIdOrObj.id : taskIdOrObj;
            state.tasks = state.tasks.filter((t) => t.id !== id);
            if (state.editingTaskId === id) {
              state.editingTaskId = null;
            }
            syncTaskToLocalStorage({ tasks: state.tasks });
          })
        ),

      toggleTaskStatus: (taskId) =>
        set(
          produce((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (task) {
              task.status = task.status === 'done' ? 'todo' : 'done';
            }
            syncTaskToLocalStorage({ tasks: state.tasks });
          })
        ),

      toggleSubTask: (taskId, subTaskId) =>
        set(
          produce((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (task && task.subTasks) {
              const sub = task.subTasks.find((s) => s.id === subTaskId);
              if (sub) {
                sub.completed = !sub.completed;
              }
            }
            syncTaskToLocalStorage({ tasks: state.tasks });
          })
        ),

      clearCompleted: () =>
        set(
          produce((state) => {
            state.tasks = state.tasks.filter((t) => t.status !== 'done');
            syncTaskToLocalStorage({ tasks: state.tasks });
          })
        ),
    }),
    {
      name: 'momentum-task-storage',
      storage: createJSONStorage(getSafeStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eagerly rehydrate synchronously if in browser to prevent initial render flicker
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-task-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        useTaskStore.setState({
          ...parsed.state,
          _hasHydrated: true,
        });
      } else {
        useTaskStore.setState({ _hasHydrated: true });
      }
    } else {
      useTaskStore.setState({ _hasHydrated: true });
    }
  } catch {
    useTaskStore.setState({ _hasHydrated: true });
  }
}

export const getConsistencyScore = (tasks = [], isDark = false) => {
  const windowDates = [];
  for (let i = 0; i <= 3; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    windowDates.push(`${year}-${month}-${day}`);
  }

  const windowTasks = tasks.filter((t) => t.dueDate && windowDates.includes(t.dueDate.slice(0, 10)));
  const total = windowTasks.length;
  const completed = windowTasks.filter((t) => t.status === 'done').length;

  if (total === 0 || (total <= 2 && completed === 0)) {
    return {
      score: 'Starting',
      rate: 0,
      total,
      completed,
      textColor: isDark ? 'text-amber-400' : 'text-amber-600',
      iconColor: isDark ? 'text-amber-400' : 'text-amber-500',
    };
  }

  const rate = Math.round((completed / total) * 100);

  if (rate >= 80) {
    return {
      score: 'High',
      rate,
      total,
      completed,
      textColor: isDark ? 'text-teal-400' : 'text-teal-700',
      iconColor: isDark ? 'text-teal-500' : 'text-teal-600',
    };
  }
  if (rate >= 50) {
    return {
      score: 'Good',
      rate,
      total,
      completed,
      textColor: isDark ? 'text-emerald-400' : 'text-emerald-700',
      iconColor: isDark ? 'text-emerald-500' : 'text-emerald-600',
    };
  }
  return {
    score: 'Needs Focus',
    rate,
    total,
    completed,
    textColor: isDark ? 'text-rose-400' : 'text-rose-600',
    iconColor: isDark ? 'text-rose-500' : 'text-rose-500',
  };
};

import { useRoutineStore } from './useRoutineStore';

export { useTaskStore as useTasksStore, useRoutineStore };


