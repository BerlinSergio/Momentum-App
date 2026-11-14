const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');
const target = " case 'biometric_settings': return isDarkMode ? <BiometricSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <BiometricSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;";
const addition = " case 'biometric_settings': return isDarkMode ? <BiometricSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <BiometricSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;\r\n case 'calendars_and_time':\r\n case 'calendars':\r\n case 'calendar': return isDarkMode ? <CalendarsMainDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <CalendarsMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;";

if (!content.includes(target)) {
  console.error('Target not found');
  process.exit(1);
}
content = content.replace(target, addition);
fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Successfully updated App.jsx');

