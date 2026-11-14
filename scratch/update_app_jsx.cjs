const fs = require('fs');

const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add import
if (!content.includes("import { useNavigationStore } from './store/useNavigationStore';")) {
  content = "import { useNavigationStore } from './store/useNavigationStore';\r\n" + content;
}

// 2. Locate function AppContent() and const renderScreen = () => {
const startMarker = 'function AppContent() {';
const endMarker = 'const renderScreen = () => {';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find markers in App.jsx");
  process.exit(1);
}

const replacement = `function AppContent() {\r
  const { activeTab, setActiveTab, goBack, syncFromPopState } = useNavigationStore();\r
  \r
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);\r
  const { syncThemeToScreen, theme } = useTheme();\r
\r
  // Auto-sync theme based on active screen name\r
  useEffect(() => {\r
    syncThemeToScreen(activeTab);\r
  }, [activeTab]);\r
\r
  useEffect(() => {\r
    const handlePopState = (event) => {\r
      const params = new URLSearchParams(window.location.search);\r
      const screenFromUrl = params.get('screen');\r
      const screenFromState = event.state?.screen;\r
      const targetScreen = screenFromState || screenFromUrl || 'home_dashboard_dark_mode';\r
      syncFromPopState(targetScreen);\r
    };\r
    window.addEventListener('popstate', handlePopState);\r
    return () => window.removeEventListener('popstate', handlePopState);\r
  }, [syncFromPopState]);\r
\r
  const handleNavChange = (e) => {\r
    const newScreen = e.target.value;\r
    setActiveTab(newScreen);\r
  };\r
\r
  `;

content = content.slice(0, startIdx) + replacement + content.slice(endIdx);

// 3. Pass goBack={goBack} to all screens in renderScreen
content = content.replace(/setActiveTab=\{setActiveTab\}(?!\s+goBack)/g, 'setActiveTab={setActiveTab} goBack={goBack}');

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully updated src/App.jsx with CRLF compatibility!");

