const fs = require('fs');
const assert = require('assert');

async function testGregorianCalendar() {
  console.log('--- 1. Testing Store & Global Persistence ---');
  const { useCalendarStore } = await import('../src/store/useCalendarStore.js');

  const store = useCalendarStore.getState();
  assert(Array.isArray(store.events), 'Events should be an array');
  assert(store.events.length > 0, 'Store should have initial seed events');
  console.log(`Initial events count: ${store.events.length}`);

  // Test Oct 24, 2026 events
  const oct24Events = store.events.filter(
    (e) => Number(e.gregorianYear) === 2026 && Number(e.gregorianMonth) === 10 && Number(e.gregorianDay) === 24
  );
  assert(oct24Events.length === 3, `Expected 3 seed events on Oct 24, 2026, got ${oct24Events.length}`);
  console.log('Oct 24 seed events verified:', oct24Events.map(e => e.title));

  // Test Nov 2026 events
  const novEvents = store.events.filter(
    (e) => Number(e.gregorianYear) === 2026 && Number(e.gregorianMonth) === 11
  );
  assert(novEvents.length >= 6, `Expected at least 6 events in Nov 2026, got ${novEvents.length}`);
  console.log(`Nov 2026 events verified: ${novEvents.length} events found`);

  // Test Add Event
  console.log('--- 2. Testing Add Gregorian Event ---');
  store.addEvent({
    title: 'Executive Sync with Global Stakeholders',
    date: '2026-11-15',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 15,
    time: '04:00 PM',
    category: 'Work',
    note: 'Global operations and scaling milestones review.'
  });

  const updatedEvents = useCalendarStore.getState().events;
  const added = updatedEvents.find(e => e.title === 'Executive Sync with Global Stakeholders');
  assert(added, 'Newly added event must exist in store');
  assert(added.shamsiYear === 1405, `Expected shamsiYear 1405, got ${added.shamsiYear}`);
  assert(added.shamsiMonth === 8, `Expected shamsiMonth 8, got ${added.shamsiMonth}`);
  assert(added.shamsiDay === 24, `Expected shamsiDay 24, got ${added.shamsiDay}`);
  console.log('Added event automatically computed Shamsi date:', `${added.shamsiYear}/${added.shamsiMonth}/${added.shamsiDay}`);

  // Test Toggle Event
  console.log('--- 3. Testing Toggle Event Status ---');
  assert(!added.completed, 'Should start uncompleted');
  useCalendarStore.getState().toggleEvent(added.id);
  const toggled = useCalendarStore.getState().events.find(e => e.id === added.id);
  assert(toggled.completed, 'Event should now be completed');
  console.log('Toggle event succeeded:', toggled.completed);

  // Test Delete Event
  console.log('--- 4. Testing Delete Event ---');
  useCalendarStore.getState().deleteEvent(added.id);
  const afterDelete = useCalendarStore.getState().events.find(e => e.id === added.id);
  assert(!afterDelete, 'Event should be deleted');
  console.log('Delete event succeeded');

  // Test Parity between Dark and Light mode
  console.log('--- 5. Testing Line Parity (Pair #16) ---');
  const darkContent = fs.readFileSync('src/GregorianCalendarDarkMode.jsx', 'utf8');
  const lightContent = fs.readFileSync('src/GregorianCalendarLightMode.jsx', 'utf8');
  const darkLines = darkContent.split('\n');
  const lightLines = lightContent.split('\n');
  assert.strictEqual(darkLines.length, lightLines.length, `Line count mismatch: ${darkLines.length} vs ${lightLines.length}`);
  console.log(`Line parity MATCH! Both files have ${darkLines.length} lines.`);

  console.log('\nALL TESTS PASSED SUCCESSFULLY! 100% Verified.');
}

testGregorianCalendar().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

