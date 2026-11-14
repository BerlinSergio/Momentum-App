const fs = require('fs');

// Update BiometricSettingsLightMode.jsx
let light = fs.readFileSync('src/BiometricSettingsLightMode.jsx', 'utf8');

// 1. Destructure
light = light.replace(
  `const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, setAppLockActive, setGuardrail, setBiometricsEnabled, updatePreferences } = useSecurityStore();`,
  `const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, pin, setAppLockActive, setLockFinance, setLockReflections, setAllowQuickDhikr, setBiometricsEnabled, updatePreferences } = useSecurityStore();`
);

// 2. Status Pill
light = light.replace(
  `<div className="inline-flex items-center px-space-md py-1 mb-space-sm rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed-variant">\r\n<span className="material-symbols-outlined text-[14px] mr-1 text-tertiary" style={{fontVariationSettings: '"FILL" 1'}}>verified_user</span>\r\n<span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">Hardware Enclave Bound</span>\r\n</div>`,
  `<div className={\`inline-flex items-center px-space-md py-1 mb-space-sm rounded-full \${biometricsEnabled ? 'bg-tertiary-fixed/40 text-on-tertiary-fixed-variant' : 'bg-slate-200 text-slate-600'}\`}>\r\n<span className="material-symbols-outlined text-[14px] mr-1 text-tertiary" style={{fontVariationSettings: '"FILL" 1'}}>{biometricsEnabled ? 'verified_user' : 'pause_circle'}</span>\r\n<span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">{biometricsEnabled ? 'Hardware Enclave Bound' : 'Hardware Enclave Paused'}</span>\r\n</div>`
);

// 3. Title & Body
light = light.replace(
  `<h2 className="font-headline-md text-headline-md text-on-surface mb-1">Biometric Sanctuary Active</h2>\r\n<p className="text-on-surface-variant text-xs leading-relaxed max-w-xs mx-auto">\r\n        Unlock Momentum instantly using Face ID or Touch ID sensor on this device.\r\n      </p>`,
  `<h2 className="font-headline-md text-headline-md text-on-surface mb-1">{biometricsEnabled ? 'Biometric Sanctuary Active' : 'Biometric Sanctuary Paused'}</h2>\r\n<p className="text-on-surface-variant text-xs leading-relaxed max-w-xs mx-auto">\r\n        {biometricsEnabled ? 'Unlock Momentum instantly using Face ID or Touch ID sensor on this device.' : 'Biometric unlock is currently disabled. Momentum will require your PIN.'}\r\n      </p>`
);

// 4. Master Card subtext
light = light.replace(
  `<div className="mt-space-md pt-space-sm flex items-center gap-2 text-on-surface-variant">\r\n<span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>\r\n<span className="font-body-sm text-body-sm text-on-surface-variant">Secure hardware keypair authenticated and active</span>\r\n</div>`,
  `<div className="mt-space-md pt-space-sm flex items-center gap-2 text-on-surface-variant">\r\n<span className="material-symbols-outlined text-[16px] text-tertiary">{biometricsEnabled ? 'check_circle' : 'pause_circle'}</span>\r\n<span className="font-body-sm text-body-sm text-on-surface-variant">{biometricsEnabled ? 'Secure hardware keypair authenticated and active' : 'Biometric authentication currently switched off'}</span>\r\n</div>`
);

// 5. PIN badge & PIN setup button
light = light.replace(
  `        Configured (••••)\r\n      </span>\r\n</div>\r\n<p className="text-on-surface-variant text-xs leading-relaxed mt-2">\r\n      Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.\r\n    </p>\r\n<button className="btn-secondary w-full" type="button">`,
  `        {pin ? 'Configured (••••)' : 'Not Set'}\r\n      </span>\r\n</div>\r\n<p className="text-on-surface-variant text-xs leading-relaxed mt-2">\r\n      Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.\r\n    </p>\r\n<button onClick={() => (setActiveTab ? setActiveTab('pin_setup_change_light_mode') : undefined)} className="btn-secondary w-full" type="button">`
);

// 6. Gate toggles
light = light.replace(
  `onClick={() => setGuardrail('lockFinance', !lockFinance)} aria-checked={lockFinance}`,
  `onClick={() => setLockFinance(!lockFinance)} aria-checked={lockFinance}`
);
light = light.replace(
  `onClick={() => setGuardrail('lockReflections', !lockReflections)} aria-checked={lockReflections}`,
  `onClick={() => setLockReflections(!lockReflections)} aria-checked={lockReflections}`
);
light = light.replace(
  `onClick={() => setGuardrail('allowQuickDhikr', !allowQuickDhikr)} aria-checked={allowQuickDhikr}`,
  `onClick={() => setAllowQuickDhikr(!allowQuickDhikr)} aria-checked={allowQuickDhikr}`
);

fs.writeFileSync('src/BiometricSettingsLightMode.jsx', light, 'utf8');
console.log('Updated BiometricSettingsLightMode.jsx successfully');

