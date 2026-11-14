const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('=== RUNNING AGENDA FIX AUDIT SUITE ===');

const lightCode = fs.readFileSync(path.resolve('src/CalendarsMainLightMode.jsx'), 'utf8');
const darkCode = fs.readFileSync(path.resolve('src/CalendarsMainDarkMode.jsx'), 'utf8');

for (const [mode, code] of [['Light', lightCode], ['Dark', darkCode]]) {
  // 1. State & Conditional Rendering Fix
  assert(code.includes("const [viewMode, setViewMode] = useState('Agenda')"), `${mode} mode must initialize viewMode to Agenda`);
  assert(code.includes("viewMode === 'Agenda' &&"), `${mode} mode must conditionally render agenda view on viewMode === 'Agenda'`);
  assert(code.includes('id="agendaViewSection"'), `${mode} mode must render agendaViewSection`);
  assert(code.includes('Harmonized Flow'), `${mode} mode must render Harmonized Flow title`);

  // 2. Scroll Trap Fix
  assert(code.includes('flex-1 overflow-y-auto w-full px-margin pb-32'), `${mode} mode <main> must have flex-1, overflow-y-auto, and pb-32`);
  assert(code.includes('flex-1 overflow-y-auto pb-32 space-y-3'), `${mode} mode agendaViewSection must have flex-1, overflow-y-auto, and pb-32`);

  // 3. Live Timer Safe Loop (1 minute interval, empty deps, clearInterval)
  assert(code.includes('60000'), `${mode} mode setInterval must update once per minute (60000ms)`);
  assert(code.includes('return () => clearInterval(timer);'), `${mode} mode useEffect must clear interval on cleanup`);
  assert(code.includes('}, []);'), `${mode} mode useEffect must have empty dependency array to avoid infinite re-renders`);

  // 4. Data Mapping
  assert(code.includes('Array.isArray(AGENDA_EVENTS) && AGENDA_EVENTS.map('), `${mode} mode must safely check Array.isArray before mapping`);
  assert(code.includes('key={evt.id || `agenda-milestone-${idx}`}'), `${mode} mode items must have unique key prop`);
}
console.log('✓ Verified State, Conditional Rendering, Scroll Trap, Safe Loop, and Data Mapping in both Light and Dark modes');

// 5. CalendarsAndTime.jsx wrapper verification
const timeCode = fs.readFileSync(path.resolve('src/CalendarsAndTime.jsx'), 'utf8');
assert(timeCode.includes('CalendarsMainDarkMode'), 'CalendarsAndTime must import CalendarsMainDarkMode');
assert(timeCode.includes('CalendarsMainLightMode'), 'CalendarsAndTime must import CalendarsMainLightMode');
assert(timeCode.includes('useThemeStore'), 'CalendarsAndTime must support useThemeStore');
console.log('✓ CalendarsAndTime.jsx wrapper verified');

console.log('=== ALL AGENDA AUDIT TESTS PASSED! ===');

