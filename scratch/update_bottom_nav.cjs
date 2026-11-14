const fs = require('fs');

const path = 'src/components/BottomNavBar.jsx';
let content = fs.readFileSync(path, 'utf8');

// Update nav element
const navTarget = "className={`fixed bottom-4 left-0 right-0 mx-auto w-[92%] max-w-md h-16 z-50 px-2 rounded-[2rem] backdrop-blur-3xl shadow-lg border flex items-center justify-between pointer-events-auto transition-colors select-none ${dockBg}`}";
const navReplacement = "className={`fixed bottom-4 left-0 right-0 mx-auto w-[92%] max-w-md h-16 z-50 px-2 rounded-[2rem] backdrop-blur-3xl shadow-lg border flex items-center justify-between pointer-events-auto transition-colors select-none font-sans text-xs ${dockBg}`} style={{ fontFamily: \"'Inter', sans-serif\" }}";

if (!content.includes(navTarget)) {
  console.error('navTarget not found');
  process.exit(1);
}
content = content.replace(navTarget, navReplacement);

// Replace span text-[10px] with text-xs font-sans tracking-tight mt-0.5
content = content.replaceAll('<span className="text-[10px]">', '<span className="text-xs font-sans tracking-tight mt-0.5">');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated BottomNavBar.jsx');

