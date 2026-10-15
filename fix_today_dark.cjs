const fs = require('fs');

let code = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', 'utf8');

// Match the Today cell block
// Starts somewhere and ends before {/*  Day 3
const regex = /<div className="min-h-\[58px\] p-1.*?TODAY.*?<\/div>\s*<\/div>/s;
const match = code.match(regex);
if (match) {
    const todayHTML = `<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-full transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 cursor-pointer group">
  <span className="text-xs font-bold font-mono">۲</span>
  <span className="text-[10px] leading-tight opacity-90">24 Oct</span>
  <span className="text-[9px] opacity-60">13 R2</span>
</div>`;
    code = code.replace(regex, todayHTML);
    fs.writeFileSync('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', code);
    console.log('Fixed Dark Mode');
} else {
    console.log('Not found');
}

