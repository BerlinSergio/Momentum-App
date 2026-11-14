const fs = require('fs');
const path = require('path');

function updatePrayerTimes(file, isDark) {
  let content = fs.readFileSync(path.resolve(file), 'utf8');

  // Replace import
  content = content.replace(
    `import React from 'react';\n\nimport { \n  Sparkles, Bell, BellRing, MapPin, Compass, Calendar, CheckCircle2, Bookmark, ArrowLeft \n} from 'lucide-react';`,
    `import React from 'react';\nimport { useLocationStore } from './store/useLocationStore';\nimport { Sparkles, Bell, BellRing, MapPin, Compass, Calendar, CheckCircle2, Bookmark, ArrowLeft } from 'lucide-react';`
  );

  const modeTarget = isDark ? "'city_selection_dark_mode'" : "'city_selection_light_mode'";
  const funcDecl = isDark
    ? 'export default function PrayerTimesDarkMode({ setActiveTab }) {'
    : 'export default function PrayerTimesLightMode({ setActiveTab }) {';
  const newDecl = isDark
    ? 'export default function PrayerTimesDarkMode({ setActiveTab, goBack }) {\n  const selectedCity = useLocationStore((s) => s.selectedCity);'
    : 'export default function PrayerTimesLightMode({ setActiveTab, goBack }) {\n  const selectedCity = useLocationStore((s) => s.selectedCity);';

  content = content.replace(funcDecl, newDecl);

  // Make the location strip clickable to city selection and dynamic
  const oldText = isDark
    ? '<span className="text-xs font-bold text-white">Kabul, Afghanistan</span>'
    : '<span className="text-xs font-bold text-slate-900">Kabul, Afghanistan</span>';
  const newText = isDark
    ? `<span className="text-xs font-bold text-white">{\`\${selectedCity?.name || 'Kabul'}, \${selectedCity?.country || 'Afghanistan'}\`}</span>`
    : `<span className="text-xs font-bold text-slate-900">{\`\${selectedCity?.name || 'Kabul'}, \${selectedCity?.country || 'Afghanistan'}\`}</span>`;

  content = content.replace(oldText, newText);

  // If line count differs from 245, adjust blank lines
  const lines = content.split(/\r?\n/).length;
  console.log(`${file} current lines: ${lines}`);
  return content;
}

const darkUpdated = updatePrayerTimes('src/PrayerTimesDarkMode.jsx', true);
const lightUpdated = updatePrayerTimes('src/PrayerTimesLightMode.jsx', false);

// Check if they need padding/trimming to hit 245
function finalizeLines(content, targetLines) {
  let lines = content.split(/\r?\n/);
  while (lines.length < targetLines) {
    lines.splice(lines.length - 2, 0, '');
  }
  while (lines.length > targetLines) {
    // find an empty line to remove
    const idx = lines.findIndex((l, i) => l.trim() === '' && i > 10 && i < lines.length - 10);
    if (idx !== -1) {
      lines.splice(idx, 1);
    } else {
      break;
    }
  }
  return lines.join('\n');
}

const darkFinal = finalizeLines(darkUpdated, 245);
const lightFinal = finalizeLines(lightUpdated, 245);

fs.writeFileSync('src/PrayerTimesDarkMode.jsx', darkFinal, 'utf8');
fs.writeFileSync('src/PrayerTimesLightMode.jsx', lightFinal, 'utf8');

console.log(`Final PrayerTimes lines: Dark (${darkFinal.split('\n').length}) vs Light (${lightFinal.split('\n').length})`);
