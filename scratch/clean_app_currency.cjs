const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove imports
content = content.replace("import CurrencySelectionDarkMode from './CurrencySelectionDarkMode';\n", "");
content = content.replace("import CurrencySelectionLightMode from './CurrencySelectionLightMode';\n", "");
content = content.replace("import CurrencySelectionDarkMode from './CurrencySelectionDarkMode';\r\n", "");
content = content.replace("import CurrencySelectionLightMode from './CurrencySelectionLightMode';\r\n", "");

// 2. Remove case routes
content = content.replace("      case 'currency_selection_dark_mode': return <CurrencySelectionDarkMode setActiveTab={setActiveTab} goBack={goBack} />;\n", "");
content = content.replace("      case 'currency_selection_light_mode': return <CurrencySelectionLightMode setActiveTab={setActiveTab} goBack={goBack} />;\n", "");
content = content.replace("      case 'currency_selection_dark_mode': return <CurrencySelectionDarkMode setActiveTab={setActiveTab} goBack={goBack} />;\r\n", "");
content = content.replace("      case 'currency_selection_light_mode': return <CurrencySelectionLightMode setActiveTab={setActiveTab} goBack={goBack} />;\r\n", "");

// 3. Remove select options
content = content.replace('              <option value="currency_selection_dark_mode">Currency Selection Dark Mode</option>\n', '');
content = content.replace('              <option value="currency_selection_light_mode">Currency Selection Light Mode</option>\n', '');
content = content.replace('              <option value="currency_selection_dark_mode">Currency Selection Dark Mode</option>\r\n', '');
content = content.replace('              <option value="currency_selection_light_mode">Currency Selection Light Mode</option>\r\n', '');

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Cleaned CurrencySelection from src/App.jsx');

