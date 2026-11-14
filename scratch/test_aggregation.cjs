async function testAggregation() {
  const [cal, tsk, fin, rtn] = await Promise.all([
    import('../src/store/useCalendarStore.js'),
    import('../src/store/useTaskStore.js'),
    import('../src/store/useFinanceStore.js'),
    import('../src/store/useRoutineStore.js')
  ]);

  const calendarEvents = cal.useCalendarStore.getState().events;
  const tasks = tsk.useTaskStore.getState().tasks;
  const transactions = fin.useFinanceStore.getState().transactions;
  const routines = rtn.useRoutineStore.getState().routines;

  const today = new Date();
  const list = [];
  const seen = new Set();

  // 1. Calendar Store
  (calendarEvents || []).forEach((evt) => {
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
      list.push({
        id: evt.id,
        sourceId: evt.id,
        source: 'calendar',
        title: evt.title,
        date: evt.date,
        gregorianYear: gYear,
        gregorianMonth: gMonth,
        gregorianDay: gDay,
        time: evt.time || '10:00 AM',
        category: evt.category || 'Personal',
        completed: !!evt.completed,
        note: evt.note || '',
      });
    }
  });

  // 2. Tasks Store
  (tasks || []).forEach((t) => {
    if (t.dueDate) {
      const parts = t.dueDate.split('-');
      if (parts.length === 3) {
        const gYear = parseInt(parts[0], 10);
        const gMonth = parseInt(parts[1], 10);
        const gDay = parseInt(parts[2], 10);
        const key = `${t.title.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            id: `task-${t.id}`,
            sourceId: t.id,
            source: 'task',
            title: t.title,
            date: t.dueDate,
            gregorianYear: gYear,
            gregorianMonth: gMonth,
            gregorianDay: gDay,
            time: t.startTime ? `${t.startTime}${t.estimate ? ` (${t.estimate})` : ''}` : 'Task Due',
            category: t.category || 'Work',
            completed: t.status === 'done',
            note: t.description || '',
          });
        }
      }
    }
  });

  // 3. Finance Store
  (transactions || []).forEach((tx) => {
    if (tx.date) {
      const parts = tx.date.split('-');
      if (parts.length === 3) {
        const gYear = parseInt(parts[0], 10);
        const gMonth = parseInt(parts[1], 10);
        const gDay = parseInt(parts[2], 10);
        const formattedAmount = `${tx.type === 'income' ? '+' : '-'}${tx.currency === 'AFN' ? `${tx.amount} افـ` : tx.currency === 'EUR' ? `€${tx.amount}` : `$${tx.amount}`}`;
        const displayTitle = `${tx.title || tx.category || 'Transaction'} (${formattedAmount})`;
        const key = `${displayTitle.toLowerCase().trim()}_${gYear}-${gMonth}-${gDay}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            id: `fin-${tx.id}`,
            sourceId: tx.id,
            source: 'finance',
            title: displayTitle,
            date: tx.date,
            gregorianYear: gYear,
            gregorianMonth: gMonth,
            gregorianDay: gDay,
            time: tx.time || (tx.type === 'income' ? 'Income' : 'Expense'),
            category: 'Finance',
            completed: tx.status === 'Settled' || tx.status === 'Paid',
            note: tx.notes || tx.payerName || '',
          });
        }
      }
    }
  });

  // 4. Daily Routines (active for today)
  const todayY = today.getFullYear();
  const todayM = today.getMonth() + 1;
  const todayD = today.getDate();
  (routines || []).forEach((r) => {
    const key = `${r.title.toLowerCase().trim()}_${todayY}-${todayM}-${todayD}`;
    if (!seen.has(key)) {
      seen.add(key);
      list.push({
        id: `routine-${r.id}`,
        sourceId: r.id,
        source: 'routine',
        title: r.title,
        date: `${todayY}-${String(todayM).padStart(2, '0')}-${String(todayD).padStart(2, '0')}`,
        gregorianYear: todayY,
        gregorianMonth: todayM,
        gregorianDay: todayD,
        time: r.time || 'Daily Routine',
        category: r.category && r.category.toLowerCase().includes('work') ? 'Work' : 'Personal',
        completed: !!r.completed,
        note: r.notes || '',
      });
    }
  });

  console.log(`Total aggregated events: ${list.length}`);
  const novEvents = list.filter(e => e.gregorianYear === 2026 && e.gregorianMonth === 11);
  console.log(`Nov 2026 aggregated events: ${novEvents.length}`);

  let work = 0, finance = 0, personal = 0;
  novEvents.forEach(e => {
    const cat = (e.category || '').toLowerCase();
    if (cat.includes('work') || cat.includes('task') || cat.includes('logistics') || cat.includes('business')) {
      work++;
    } else if (cat.includes('finance')) {
      finance++;
    } else {
      personal++;
    }
  });
  console.log(`Nov counts -> All: ${novEvents.length}, Work: ${work}, Finance: ${finance}, Personal: ${personal}`);
}

testAggregation().catch(console.error);

