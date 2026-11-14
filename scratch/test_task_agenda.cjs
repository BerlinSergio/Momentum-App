const { useTaskStore } = require('../src/store/useTaskStore.js');
const { useRoutineStore } = require('../src/store/useRoutineStore.js');

const tasks = useTaskStore.getState().tasks;
const routines = useRoutineStore.getState().routines;

const parseTimeToMinutes = (timeStr, estimateStr) => {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const cleaned = timeStr.trim().toLowerCase();
  if (cleaned.includes('all day') || cleaned.includes('throughout')) {
    return { startMinutes: 0, endMinutes: 1440, isAllDay: true };
  }
  const match12 = cleaned.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const period = match12[3];
    if (period) {
      if (period.toLowerCase() === 'pm' && hours < 12) hours += 12;
      if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
    }
    const startMinutes = hours * 60 + minutes;
    let duration = 45;
    if (estimateStr) {
      const est = estimateStr.toLowerCase();
      if (est.includes('hour') || est.includes('hr')) {
        duration = Math.round((parseFloat(est) || 1) * 60);
      } else {
        const m = est.match(/(\d+)\s*min/);
        if (m) duration = parseInt(m[1], 10);
      }
    }
    return { startMinutes, endMinutes: Math.min(startMinutes + duration, 1440), isAllDay: false };
  }
  return null;
};

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const todayStr = `${year}-${month}-${day}`;

const todayTasks = (tasks || []).filter((t) => !t.dueDate || t.dueDate === todayStr || t.dueDate.startsWith(todayStr));
console.log('Today tasks from useTaskStore:', todayTasks.length);

const agendaItems = todayTasks.map((t) => {
  const parsed = parseTimeToMinutes(t.startTime, t.estimate);
  return {
    id: t.id,
    title: t.title,
    description: t.description,
    time: t.startTime || 'All day',
    category: t.category || 'General',
    status: t.status || 'todo',
    completed: t.status === 'done',
    parsed,
  };
});

agendaItems.sort((a, b) => {
  const aTime = a.parsed ? a.parsed.startMinutes : 9999;
  const bTime = b.parsed ? b.parsed.startMinutes : 9999;
  return aTime - bTime;
});

console.log('Sorted Agenda Items:');
agendaItems.forEach((it) => {
  console.log(`  [${it.time.padEnd(14)}] (${it.category.padEnd(10)}) ${it.title} [Status: ${it.status}]`);
});

