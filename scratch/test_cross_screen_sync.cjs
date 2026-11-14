const assert = require('assert');

async function testCrossScreenSync() {
  console.log('=== Testing Global Cross-Screen Real-Time Sync for Gregorian Calendar ===\n');

  const [cal, tsk, fin, rtn] = await Promise.all([
    import('../src/store/useCalendarStore.js'),
    import('../src/store/useTaskStore.js'),
    import('../src/store/useFinanceStore.js'),
    import('../src/store/useRoutineStore.js')
  ]);

  const calStore = cal.useCalendarStore;
  const taskStore = tsk.useTaskStore;
  const finStore = fin.useFinanceStore;
  const routineStore = rtn.useRoutineStore;

  // 1. Initial State Check
  const initialTaskCount = taskStore.getState().tasks.length;
  const initialTxCount = finStore.getState().transactions.length;
  console.log(`[Init] Tasks in store: ${initialTaskCount}, Finance transactions: ${initialTxCount}`);

  // 2. Add Task in Task Store (simulating Tasks screen)
  console.log('\n--- Action: Adding Task on Tasks screen ---');
  taskStore.getState().addTask({
    id: 'test-sync-task-999',
    title: 'Deliver Cloud Architecture Blueprint',
    category: 'Work',
    priority: 'High',
    dueDate: '2026-11-20',
    startTime: '03:30 PM',
    description: 'Finalize serverless specs and AWS diagrams.',
    status: 'todo',
  });

  const addedTask = taskStore.getState().tasks.find(t => t.id === 'test-sync-task-999');
  assert(addedTask, 'Task must exist in taskStore');
  console.log('[Task Store] Added task successfully:', addedTask.title);

  // 3. Add Transaction in Finance Store (simulating Finance screen)
  console.log('\n--- Action: Adding Transaction on Finance screen ---');
  finStore.getState().addTransaction({
    id: 'test-sync-tx-888',
    title: 'Cloud Infrastructure Subscription',
    amount: 180,
    currency: 'USD',
    category: 'Software & Cloud',
    type: 'expense',
    date: '2026-11-20',
    notes: 'Monthly AWS server usage bill',
    status: 'Settled',
  });

  const addedTx = finStore.getState().transactions.find(t => t.id === 'test-sync-tx-888');
  assert(addedTx, 'Transaction must exist in finStore');
  console.log('[Finance Store] Added transaction successfully:', addedTx.title);

  // 4. Verify derivation as done in Gregorian Calendar component
  console.log('\n--- Deriving Calendar Events from All Global Stores ---');
  const allEvents = [];
  const seen = new Set();

  calStore.getState().events.forEach((evt) => {
    let gYear = Number(evt.gregorianYear);
    let gMonth = Number(evt.gregorianMonth);
    let gDay = Number(evt.gregorianDay);
    if ((!gYear || !gMonth || !gDay) && evt.date) {
      const parts = evt.date.split('-');
      if (parts.length === 3) {
        gYear = parseInt(parts[0], 10);
        gMonth = parseInt(parts[1], 10);
        gDay = parseInt(parts[2], 10);
      }
    }
    if (gYear && gMonth && gDay) {
      const key = `${evt.title.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
      seen.add(key);
      allEvents.push({ ...evt, source: 'calendar' });
    }
  });

  taskStore.getState().tasks.forEach((t) => {
    if (t.dueDate) {
      const parts = t.dueDate.split('-');
      if (parts.length === 3) {
        const gYear = parseInt(parts[0], 10);
        const gMonth = parseInt(parts[1], 10);
        const gDay = parseInt(parts[2], 10);
        const key = `${t.title.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
        if (!seen.has(key)) {
          seen.add(key);
          allEvents.push({
            id: `task-${t.id}`,
            sourceId: t.id,
            source: 'task',
            title: t.title,
            date: t.dueDate,
            gregorianYear: gYear,
            gregorianMonth: gMonth,
            gregorianDay: gDay,
            time: t.startTime,
            category: t.category,
            completed: t.status === 'done',
          });
        }
      }
    }
  });

  finStore.getState().transactions.forEach((tx) => {
    if (tx.date) {
      const parts = tx.date.split('-');
      if (parts.length === 3) {
        const gYear = parseInt(parts[0], 10);
        const gMonth = parseInt(parts[1], 10);
        const gDay = parseInt(parts[2], 10);
        const displayTitle = `${tx.title || 'Transaction'} ($${tx.amount})`;
        const key = `${displayTitle.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
        if (!seen.has(key)) {
          seen.add(key);
          allEvents.push({
            id: `fin-${tx.id}`,
            sourceId: tx.id,
            source: 'finance',
            title: displayTitle,
            date: tx.date,
            gregorianYear: gYear,
            gregorianMonth: gMonth,
            gregorianDay: gDay,
            time: 'Expense Recorded',
            category: 'Finance',
            completed: tx.status === 'Settled',
          });
        }
      }
    }
  });

  // Verify that the task and finance item for Nov 20, 2026 appear in the calendar!
  const nov20Events = allEvents.filter(e => e.gregorianYear === 2026 && e.gregorianMonth === 11 && e.gregorianDay === 20);
  console.log(`Found ${nov20Events.length} events on Nov 20, 2026:`);
  nov20Events.forEach(e => console.log(` - [${e.source.toUpperCase()}] ${e.title} (${e.category})`));

  assert(nov20Events.some(e => e.title.includes('Deliver Cloud Architecture Blueprint')), 'New task must be present on Nov 20');
  assert(nov20Events.some(e => e.title.includes('Cloud Infrastructure Subscription')), 'New finance transaction must be present on Nov 20');

  // 5. Test real-time toggle
  console.log('\n--- Action: Toggling Task Status on Tasks screen ---');
  taskStore.getState().toggleTaskStatus('test-sync-task-999');
  const toggledTask = taskStore.getState().tasks.find(t => t.id === 'test-sync-task-999');
  assert(toggledTask.status === 'done', 'Task should now be done');
  console.log('[Task Store] Toggled task status to done successfully');

  // 6. Test cleanup / deletion from store
  console.log('\n--- Action: Deleting Task and Transaction ---');
  taskStore.getState().deleteTask('test-sync-task-999');
  finStore.getState().deleteTransaction('test-sync-tx-888');
  assert(!taskStore.getState().tasks.some(t => t.id === 'test-sync-task-999'), 'Task should be removed');
  assert(!finStore.getState().transactions.some(t => t.id === 'test-sync-tx-888'), 'Transaction should be removed');
  console.log('[Cleanup] Items deleted from global persistent stores successfully.');

  console.log('\nALL CROSS-SCREEN SYNC TESTS PASSED WITH 100% SUCCESS!');
}

testCrossScreenSync().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

