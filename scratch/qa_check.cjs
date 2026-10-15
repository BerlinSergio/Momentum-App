const fs = require('fs');
const path = require('path');

const mappings = [
  { html: 'home_dashboard_dark_mode/code.html', jsx: 'Dashboard.jsx' },
  { html: 'tasks_reminders_dark_mode_1/code.html', jsx: 'Tasks.jsx' }, // Tasks used tasks_reminders, but let's check exact names later
  { html: 'quick_note_editor_dark_mode/code.html', jsx: 'QuickNoteEditor.jsx' },
  { html: 'tasbeeh_main_dark_mode/code.html', jsx: 'TasbeehMain.jsx' },
  { html: 'splash_screen_dark_mode/code.html', jsx: 'SplashScreen.jsx' },
  { html: 'finance_expense_tracker_dark_mode/code.html', jsx: 'Finance.jsx' },
];

function extractClasses(text, isJsx) {
  const classNames = new Set();
  const regex = isJsx ? /className=(?:"([^"]*)"|\{`([^`]*)`\})/g : /class="([^"]*)"/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const val = match[1] || match[2] || '';
    // Split by whitespace and remove dynamic parts (like ${...})
    const tokens = val.split(/\s+/).filter(t => t.trim() !== '' && !t.includes('${'));
    tokens.forEach(t => classNames.add(t));
  }
  return classNames;
}

function extractStyles(text, isJsx) {
  const styles = [];
  const regex = isJsx ? /style=\{\{\s*([^}]+)\s*\}\}/g : /style="([^"]*)"/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    styles.push(match[1].trim());
  }
  return styles;
}

function extractViewBoxes(text) {
  const vbs = [];
  // Both viewBox and viewbox might exist in HTML, JSX expects viewBox
  const regex = /viewBox="([^"]*)"/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    vbs.push(match[1]);
  }
  return vbs;
}

for (const map of mappings) {
  const htmlPath = path.join('c:/momentum/design_reference', map.html);
  const jsxPath = path.join('c:/momentum/src', map.jsx);
  
  if (!fs.existsSync(htmlPath) || !fs.existsSync(jsxPath)) {
    console.log(`SKIP: Missing file for ${map.jsx}`);
    continue;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf8');
  const jsx = fs.readFileSync(jsxPath, 'utf8');
  
  const htmlClasses = extractClasses(html, false);
  const jsxClasses = extractClasses(jsx, true);
  
  const missingClasses = [...htmlClasses].filter(c => !jsxClasses.has(c));
  
  const htmlViewBoxes = extractViewBoxes(html);
  const jsxViewBoxes = extractViewBoxes(jsx);
  const missingViewBoxes = htmlViewBoxes.filter(vb => !jsxViewBoxes.includes(vb));
  
  const htmlStyles = extractStyles(html, false);
  const jsxStyles = extractStyles(jsx, true);
  
  console.log(`\n=== QA Report for ${map.jsx} ===`);
  console.log(`HTML Classes: ${htmlClasses.size}, JSX Classes: ${jsxClasses.size}`);
  if (missingClasses.length > 0) {
    console.log(`⚠️ Missing classes: ${missingClasses.slice(0, 10).join(', ')}${missingClasses.length > 10 ? '...' : ''}`);
  } else {
    console.log(`✅ All Tailwind classes preserved!`);
  }
  
  if (htmlViewBoxes.length !== jsxViewBoxes.length || missingViewBoxes.length > 0) {
    console.log(`⚠️ SVG viewBox mismatch! HTML has ${htmlViewBoxes.length}, JSX has ${jsxViewBoxes.length}`);
  } else {
    console.log(`✅ All SVGs preserved properly!`);
  }
  
  // Style attribute check (rudimentary)
  if (htmlStyles.length > 0) {
    console.log(`Styles check: HTML has ${htmlStyles.length}, JSX has ${jsxStyles.length} style attributes.`);
  }
}

