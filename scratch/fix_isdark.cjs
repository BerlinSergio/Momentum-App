const fs = require('fs');

const lightPath = 'src/CalendarsMainLightMode.jsx';
let light = fs.readFileSync(lightPath, 'utf8');
light = light.replace("${isDark ? 'text-slate-300' : 'text-slate-600'}", 'text-slate-600');
fs.writeFileSync(lightPath, light, 'utf8');

const darkPath = 'src/CalendarsMainDarkMode.jsx';
let dark = fs.readFileSync(darkPath, 'utf8');
dark = dark.replace("${isDark ? 'text-slate-300' : 'text-slate-600'}", 'text-slate-300');
fs.writeFileSync(darkPath, dark, 'utf8');

console.log('Successfully replaced isDark in both files.');

