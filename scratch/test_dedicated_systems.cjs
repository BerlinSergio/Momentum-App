const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('=== VERIFYING DEDICATED SYSTEMS RESTORATION ===');

const lightCode = fs.readFileSync(path.resolve('src/CalendarsMainLightMode.jsx'), 'utf8');
const darkCode = fs.readFileSync(path.resolve('src/CalendarsMainDarkMode.jsx'), 'utf8');

for (const [mode, code, gregTarget, islTarget, shamsiTarget] of [
  ['Light', lightCode, 'gregorian_calendar_light_mode', 'islamic_hijri_calendar_light_mode', 'afghan_solar_hijri_shamsi_calendar_light_mode'],
  ['Dark', darkCode, 'gregorian_calendar_dark_mode', 'islamic_hijri_calendar_dark_mode', 'afghan_solar_hijri_shamsi_calendar_dark_mode'],
]) {
  // 1. Header
  assert(code.includes('Dedicated Systems'), `${mode} mode must render "Dedicated Systems" header`);
  assert(code.includes('Tap to enter system'), `${mode} mode must render "Tap to enter system" subtext`);

  // 2. Card 1 (Gregorian)
  assert(code.includes('CIVIL • WORK'), `${mode} mode must render "CIVIL • WORK" tag`);
  assert(code.includes(gregTarget), `${mode} mode must route to ${gregTarget}`);

  // 3. Card 2 (Hijri Qamari)
  assert(code.includes('SPIRITUAL • MOON'), `${mode} mode must render "SPIRITUAL • MOON" tag`);
  assert(code.includes(islTarget), `${mode} mode must route to ${islTarget}`);

  // 4. Card 3 (Hijri Shamsi)
  assert(code.includes('SOLAR • SEASONAL'), `${mode} mode must render "SOLAR • SEASONAL" tag`);
  assert(code.includes(shamsiTarget), `${mode} mode must route to ${shamsiTarget}`);

  // 5. Store & Scroll verified
  assert(code.includes("import { useTaskStore } from './store/useTaskStore';"), `${mode} mode must keep useTaskStore`);
  assert(code.includes('flex-1 overflow-y-auto w-full px-margin pb-32'), `${mode} mode must maintain scrollable layout`);
}

console.log('✓ All Dedicated Systems cards and routes verified in both Light and Dark modes');
console.log('=== DEDICATED SYSTEMS VERIFICATION PASSED! ===');

