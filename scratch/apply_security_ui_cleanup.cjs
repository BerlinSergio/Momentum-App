const fs = require('fs');

// Helper to normalize CRLF
function normalize(str) {
  return str.replace(/\r\n/g, '\n');
}

// ---------------------------------------------------------------------
// 1. AppLockLightMode.jsx & AppLockDarkMode.jsx
// ---------------------------------------------------------------------
function cleanAppLock(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  const wasCRLF = content.includes('\r\n');
  content = normalize(content);

  // Clean draft state definition
  const oldDraftState = `  const [draft, setDraft] = useState({
    isAppLockActive: security.isAppLockActive,
    biometricsEnabled: security.biometricsEnabled,
    lockTiming: security.lockTiming,
    hideInMultitasking: security.hideInMultitasking,
    lockFinance: security.lockFinance,
    lockReflections: security.lockReflections,
    allowQuickDhikr: security.allowQuickDhikr,
  });`;

  const newDraftState = `  const [draft, setDraft] = useState({
    isAppLockActive: security.isAppLockActive,
    biometricsEnabled: security.biometricsEnabled,
    lockTiming: security.lockTiming,
    hideInMultitasking: security.hideInMultitasking,
  });`;

  content = content.replace(oldDraftState, newDraftState);

  // Clean useEffect sync
  const oldUseEffect = `  useEffect(() => {
    if (security._hasHydrated) {
      setDraft({
        isAppLockActive: security.isAppLockActive,
        biometricsEnabled: security.biometricsEnabled,
        lockTiming: security.lockTiming,
        hideInMultitasking: security.hideInMultitasking,
        lockFinance: security.lockFinance,
        lockReflections: security.lockReflections,
        allowQuickDhikr: security.allowQuickDhikr,
      });
      setPinInput(security.pin || '1234');
      setAlphaInput(security.alphanumeric || '');
    }
  }, [
    security._hasHydrated,
    security.isAppLockActive,
    security.biometricsEnabled,
    security.lockTiming,
    security.hideInMultitasking,
    security.lockFinance,
    security.lockReflections,
    security.allowQuickDhikr,
    security.pin,
    security.alphanumeric,
  ]);`;

  const newUseEffect = `  useEffect(() => {
    if (security._hasHydrated) {
      setDraft({
        isAppLockActive: security.isAppLockActive,
        biometricsEnabled: security.biometricsEnabled,
        lockTiming: security.lockTiming,
        hideInMultitasking: security.hideInMultitasking,
      });
      setPinInput(security.pin || '1234');
      setAlphaInput(security.alphanumeric || '');
    }
  }, [
    security._hasHydrated,
    security.isAppLockActive,
    security.biometricsEnabled,
    security.lockTiming,
    security.hideInMultitasking,
    security.pin,
    security.alphanumeric,
  ]);`;

  content = content.replace(oldUseEffect, newUseEffect);

  // Now remove Selective Guardrails & Zero-Knowledge Architecture sections
  // Starts at `{/* Sensitive Feature Guardrails */}` and ends right before `{/* Action Button */}`
  const guardrailsMarker = `              {/* Sensitive Feature Guardrails */}`;
  const actionButtonMarker = `              {/* Action Button */}`;

  const startIndex = content.indexOf(guardrailsMarker);
  const endIndex = content.indexOf(actionButtonMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + content.substring(endIndex);
  } else {
    console.error(`Markers not found in ${filePath}: startIndex=${startIndex}, endIndex=${endIndex}`);
  }

  if (wasCRLF) {
    content = content.replace(/\n/g, '\r\n');
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned ${filePath}`);
}

cleanAppLock('src/AppLockLightMode.jsx', false);
cleanAppLock('src/AppLockDarkMode.jsx', true);

// ---------------------------------------------------------------------
// 2. BiometricSettingsLightMode.jsx & BiometricSettingsDarkMode.jsx
// ---------------------------------------------------------------------
function cleanBiometricSettings(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  const wasCRLF = content.includes('\r\n');
  content = normalize(content);

  // 1. Destructure
  content = content.replace(
    `const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, pin, setAppLockActive, setLockFinance, setLockReflections, setAllowQuickDhikr, setBiometricsEnabled, updatePreferences } = useSecurityStore();`,
    `const { isAppLockActive, lockReflections, biometricsEnabled, pin, setAppLockActive, setLockReflections, setBiometricsEnabled, updatePreferences } = useSecurityStore();`
  );

  // 2. Remove Zero-Knowledge Architecture Card
  const eduCardMarker = `{/*  Educational & Security Philosophy Card  */}`;
  const fallbackMarker = `{/*  Fallback to PIN Configuration  */}`;
  const eduStartIndex = content.indexOf(eduCardMarker);
  const eduEndIndex = content.indexOf(fallbackMarker);

  if (eduStartIndex !== -1 && eduEndIndex !== -1) {
    content = content.substring(0, eduStartIndex) + content.substring(eduEndIndex);
  } else {
    console.error(`Edu markers not found in ${filePath}`);
  }

  // 3. Update Checkpoint count
  content = content.replace('4 Checkpoints', '2 Checkpoints');

  // 4. Remove Item 2 ("Confirm Financial & Zakat Transfers")
  const item2Marker = `{/*  Item 2  */}`;
  const item3Marker = `{/*  Item 3  */}`;
  const item2Start = content.indexOf(item2Marker);
  const item3Start = content.indexOf(item3Marker);
  if (item2Start !== -1 && item3Start !== -1) {
    content = content.substring(0, item2Start) + content.substring(item3Start);
  } else {
    console.error(`Item 2/3 markers not found in ${filePath}`);
  }

  // 5. Remove Item 4 ("Quick Dhikr Counter without Biometrics")
  const item4Marker = `{/*  Item 4 (OFF state)  */}`;
  const item4Start = content.indexOf(item4Marker);
  const bottomActionMarker = `{/*  Bottom Action Button  */}`;
  const bottomActionStart = content.indexOf(bottomActionMarker);

  if (item4Start !== -1 && bottomActionStart !== -1) {
    content = content.substring(0, item4Start) + '</div>\n</div>\n' + content.substring(bottomActionStart);
  } else {
    // If item4 was already stripped, make sure there are two </div> before bottom action button
    const gatesBeforeAction = content.indexOf(`</div>\n{/*  Bottom Action Button  */}`);
    if (gatesBeforeAction !== -1) {
      content = content.substring(0, gatesBeforeAction) + '</div>\n</div>\n' + content.substring(gatesBeforeAction + 7);
    }
  }

  // 6. Update Save preferences call
  content = content.replace(
    `updatePreferences({ biometricsEnabled, isAppLockActive, lockFinance, lockReflections, allowQuickDhikr })`,
    `updatePreferences({ biometricsEnabled, isAppLockActive, lockReflections })`
  );

  if (wasCRLF) {
    content = content.replace(/\n/g, '\r\n');
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned ${filePath}`);
}

cleanBiometricSettings('src/BiometricSettingsLightMode.jsx', false);
cleanBiometricSettings('src/BiometricSettingsDarkMode.jsx', true);
