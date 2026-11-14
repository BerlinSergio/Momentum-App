const fs = require('fs');

// Update BiometricSettingsDarkMode.jsx
let dark = fs.readFileSync('src/BiometricSettingsDarkMode.jsx', 'utf8');

// 1. Destructure
dark = dark.replace(
  `const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, setAppLockActive, setGuardrail, setBiometricsEnabled, updatePreferences } = useSecurityStore();`,
  `const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, pin, setAppLockActive, setLockFinance, setLockReflections, setAllowQuickDhikr, setBiometricsEnabled, updatePreferences } = useSecurityStore();`
);

// 2. Status Pill
dark = dark.replace(
  `<div className="inline-flex items-center px-space-md py-1 mb-space-sm rounded-full bg-primary/20 text-primary">\r\n<span className="material-symbols-outlined text-[14px] mr-1 text-primary" style={{fontVariationSettings: '"FILL" 1'}}>verified_user</span>\r\n<span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase text-primary">Hardware Enclave Bound</span>\r\n</div>`,
  `<div className={\`inline-flex items-center px-space-md py-1 mb-space-sm rounded-full \${biometricsEnabled ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-400'}\`}>\r\n<span className="material-symbols-outlined text-[14px] mr-1 text-primary" style={{fontVariationSettings: '"FILL" 1'}}>{biometricsEnabled ? 'verified_user' : 'pause_circle'}</span>\r\n<span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase text-primary">{biometricsEnabled ? 'Hardware Enclave Bound' : 'Hardware Enclave Paused'}</span>\r\n</div>`
);

// 3. Title & Body
dark = dark.replace(
  `<h2 className="font-headline-md text-headline-md text-white mb-1">Biometric Sanctuary Active</h2>\r\n<p className="text-slate-300 text-xs leading-relaxed max-w-xs mx-auto">\r\n  Unlock Momentum instantly using Face ID or Touch ID sensor on this device.\r\n</p>`,
  `<h2 className="font-headline-md text-headline-md text-white mb-1">{biometricsEnabled ? 'Biometric Sanctuary Active' : 'Biometric Sanctuary Paused'}</h2>\r\n<p className="text-slate-300 text-xs leading-relaxed max-w-xs mx-auto">\r\n  {biometricsEnabled ? 'Unlock Momentum instantly using Face ID or Touch ID sensor on this device.' : 'Biometric unlock is currently disabled. Momentum will require your PIN.'}\r\n</p>`
);

// 4. Master Card subtext
dark = dark.replace(
  `<div className="mt-space-md pt-space-sm flex items-center gap-2 text-slate-300">\r\n<span className="material-symbols-outlined text-[16px] text-teal-400">check_circle</span>\r\n<span className="font-body-sm text-body-sm text-slate-300">Secure hardware keypair authenticated and active</span>\r\n</div>`,
  `<div className="mt-space-md pt-space-sm flex items-center gap-2 text-slate-300">\r\n<span className="material-symbols-outlined text-[16px] text-teal-400">{biometricsEnabled ? 'check_circle' : 'pause_circle'}</span>\r\n<span className="font-body-sm text-body-sm text-slate-300">{biometricsEnabled ? 'Secure hardware keypair authenticated and active' : 'Biometric authentication currently switched off'}</span>\r\n</div>`
);

// 5. PIN badge & PIN setup button
dark = dark.replace(
  `  Configured (••••)\r\n</span>\r\n</div>\r\n<p className="text-slate-300 text-xs leading-relaxed mt-2">\r\n  Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.\r\n</p>\r\n<button className="btn-secondary w-full" type="button">`,
  `  {pin ? 'Configured (••••)' : 'Not Set'}\r\n</span>\r\n</div>\r\n<p className="text-slate-300 text-xs leading-relaxed mt-2">\r\n  Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.\r\n</p>\r\n<button onClick={() => (setActiveTab ? setActiveTab('pin_setup_change_dark_mode') : undefined)} className="btn-secondary w-full" type="button">`
);

// 6. Gate toggles
dark = dark.replace(
  `onClick={() => setGuardrail('lockFinance', !lockFinance)} aria-checked={lockFinance}`,
  `onClick={() => setLockFinance(!lockFinance)} aria-checked={lockFinance}`
);
dark = dark.replace(
  `onClick={() => setGuardrail('lockReflections', !lockReflections)} aria-checked={lockReflections}`,
  `onClick={() => setLockReflections(!lockReflections)} aria-checked={lockReflections}`
);
dark = dark.replace(
  `onClick={() => setGuardrail('allowQuickDhikr', !allowQuickDhikr)} aria-checked={allowQuickDhikr}`,
  `onClick={() => setAllowQuickDhikr(!allowQuickDhikr)} aria-checked={allowQuickDhikr}`
);

fs.writeFileSync('src/BiometricSettingsDarkMode.jsx', dark, 'utf8');
console.log('Updated BiometricSettingsDarkMode.jsx successfully');

