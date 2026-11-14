const assert = require('assert');

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
global.localStorage = localStorageMock;

// Test utils/afghanCalendar.js
const {
  HIJRI_MONTHS,
  getHijriDateParts,
  hijriToGregorian,
  getHijriMonthGrid
} = require('../src/utils/afghanCalendar.js');

console.log('Testing Afghan and Hijri Calendar utilities...');

// 1. Test HIJRI_MONTHS
assert.strictEqual(HIJRI_MONTHS.length, 12, 'Must have 12 Hijri months');
assert.strictEqual(HIJRI_MONTHS[3].nameEn, "Rabi' al-Thani", 'Month 4 must be Rabi al-Thani');

// 2. Test getHijriDateParts for a fixed date
// November 2, 2026 is Jumada al-Ula (month 5) or Rabi' al-Thani (month 4) 1448 AH
const testDate = new Date(2026, 10, 2); // 2 Nov 2026
const hijriParts = getHijriDateParts(testDate);
console.log('2 Nov 2026 Hijri parts:', hijriParts);
assert.strictEqual(hijriParts.hy, 1448, 'Year must be 1448 AH');
assert(hijriParts.hm >= 1 && hijriParts.hm <= 12, 'Month between 1 and 12');
assert(hijriParts.hd >= 1 && hijriParts.hd <= 30, 'Day between 1 and 30');

// 3. Test hijriToGregorian round-trip
const gregDate = hijriToGregorian(hijriParts.hy, hijriParts.hm, hijriParts.hd);
const verifyParts = getHijriDateParts(gregDate);
console.log('Round trip verifyParts:', verifyParts);
assert.strictEqual(verifyParts.hy, hijriParts.hy);
assert.strictEqual(verifyParts.hm, hijriParts.hm);
assert.strictEqual(verifyParts.hd, hijriParts.hd);

// 4. Test month grid generation
const grid = getHijriMonthGrid(1448, 4);
console.log('Month grid 1448/4:', {
  totalDays: grid.totalDays,
  firstWeekday: grid.firstWeekday,
  prevPadLength: grid.prevSpacers.length,
  nextPadLength: grid.nextSpacers.length,
  totalSlots: grid.prevSpacers.length + grid.totalDays + grid.nextSpacers.length
});
assert(grid.totalDays === 29 || grid.totalDays === 30, 'Hijri months have 29 or 30 days');
assert.strictEqual((grid.prevSpacers.length + grid.totalDays + grid.nextSpacers.length) % 7, 0, 'Grid must be multiple of 7');

// 5. Test useCalendarStore.js
const { useCalendarStore } = require('../src/store/useCalendarStore.js');

const state = useCalendarStore.getState();
console.log('Loaded calendar events count:', state.events.length);
assert(state.events.length > 0, 'Must have seed events');

// Find Hijri events
const hijriEvts = state.events.filter(e => e.hijriYear === 1448 && e.hijriMonth === 4);
console.log('Events in 1448/4:', hijriEvts.map(e => ({ id: e.id, title: e.title, day: e.hijriDay, cat: e.category })));
assert(hijriEvts.length >= 2, 'Should have multiple events in 1448 Rabi al-Thani');

// 6. Test adding an event
const newEvt = state.addEvent({
  title: 'Test Friday Tahajjud & Dua',
  category: 'Spiritual',
  hijriYear: 1448,
  hijriMonth: 4,
  hijriDay: 20,
  time: '04:00 AM',
  description: 'Special night prayer'
});
console.log('Added new event:', newEvt);
assert(newEvt.id, 'Event must have generated id');
assert.strictEqual(newEvt.hijriDay, 20);
assert(newEvt.date, 'Event must have cross-synced Gregorian date');
assert(newEvt.shamsiYear, 'Event must have cross-synced Solar Shamsi date');

// 7. Verify the event exists in store
const afterAdd = useCalendarStore.getState().events;
assert(afterAdd.some(e => e.id === newEvt.id), 'New event must exist in store');

// 8. Test toggling completion
useCalendarStore.getState().toggleEvent(newEvt.id);
const toggled = useCalendarStore.getState().events.find(e => e.id === newEvt.id);
assert.strictEqual(toggled.completed, true, 'Event must be completed');

// 9. Test deleting event
useCalendarStore.getState().deleteEvent(newEvt.id);
const afterDelete = useCalendarStore.getState().events;
assert(!afterDelete.some(e => e.id === newEvt.id), 'Event must be deleted from store');

console.log('ALL HIJRI CALENDAR TESTS PASSED SUCCESSFULLY! ✅');
