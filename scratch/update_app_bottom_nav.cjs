const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const target = ` <div className={\`flex-1 \${activeTab.includes('splash_screen') ? 'overflow-hidden overscroll-none' : 'overflow-y-auto'} relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport font-sans \${activeTab.includes('splash_screen') ? '' : 'wallpaper-active'} pb-32\`}>
 <AppLockGuard>
          {renderScreen()}
        </AppLockGuard>
 </div>
 {!activeTab.includes('splash_screen') && (
   <BottomNavBar
     activeTab={activeTab}
     setActiveTab={setActiveTab}
     isDarkMode={isDarkMode}
   />
 )}`;

const replacement = ` <div className={\`flex-1 \${activeTab.includes('splash_screen') ? 'overflow-hidden overscroll-none' : 'overflow-y-auto'} relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport font-sans \${activeTab.includes('splash_screen') ? '' : 'wallpaper-active'} \${activeTab.includes('splash_screen') || activeTab.includes('personal_setup') ? 'pb-0' : 'pb-32'}\`}>
 <AppLockGuard>
          {renderScreen()}
        </AppLockGuard>
 </div>
 {!activeTab.includes('splash_screen') && !activeTab.includes('personal_setup') && (
   <BottomNavBar
     activeTab={activeTab}
     setActiveTab={setActiveTab}
     isDarkMode={isDarkMode}
   />
 )}`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.jsx', code, 'utf8');
  console.log('App.jsx successfully updated!');
} else {
  console.error('Target not found in App.jsx');
}
