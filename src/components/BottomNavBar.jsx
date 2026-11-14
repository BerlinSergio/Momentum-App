import { 
  Home, 
  CreditCard, 
  Plus, 
  CheckSquare, 
  LayoutGrid 
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';

/**
 * Standardized Global Bottom Navigation Bar for Momentum.
 * Enforces 100% identical icon library, icon sizing, stroke widths, and pill dock geometry across all screens and themes.
 *
 * @param {Object} props
 * @param {string} props.activeTab - Current active tab identifier ('home' | 'finance' | 'tasks' | 'more' or screen name)
 * @param {function} props.setActiveTab - State updater for active screen routing
 * @param {boolean} [props.isDarkMode] - Explicit dark mode flag (auto-inferred from activeTab if omitted)
 * @param {function} [props.onPlusClick] - Custom handler for center (+) action button
 */
export default function BottomNavBar({ activeTab = 'home', setActiveTab, isDarkMode, onPlusClick }) {
  if (activeTab && (activeTab.includes('splash_screen') || activeTab.includes('personal_setup') || activeTab.includes('pin_setup') || activeTab.includes('quick_note_editor'))) {
    return null;
  }

  const { setPendingTransactionType } = useFinanceStore();

  // Normalize active tab domain
  const getNormalizedTab = (tab) => {
    if (!tab) return 'home';
    const t = tab.toLowerCase();
    if (t.includes('home') || t.includes('dashboard')) return 'home';
    if (t.includes('finance') || t.includes('expense') || t.includes('income')) return 'finance';
    if (t.includes('task') || t.includes('routine')) return 'tasks';
    if (t.includes('more') || t.includes('setting') || t.includes('profile') || t.includes('appearance') || t.includes('calendar') || t.includes('note') || t.includes('tasbeeh') || t.includes('city') || t.includes('timezone')) return 'more';
    return t;
  };

  const currentTab = getNormalizedTab(activeTab);

  // Normalize theme
  const isDark = typeof isDarkMode === 'boolean'
    ? isDarkMode
    : (activeTab ? activeTab.toLowerCase().includes('dark') : false);

  const handleTabClick = (tabKey) => {
    if (!setActiveTab) return;
    switch (tabKey) {
      case 'home':
        setActiveTab(isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode');
        break;
      case 'finance':
        setActiveTab(isDark ? 'finance_expense_tracker_dark_mode' : 'finance_expense_tracker_light_mode');
        break;
      case 'tasks':
        setActiveTab(isDark ? 'tasks_reminders_dark_mode' : 'tasks_reminders_light_mode');
        break;
      case 'more':
        setActiveTab(isDark ? 'more_dark_mode' : 'more_light_mode');
        break;
      default:
        break;
    }
  };

  const handlePlusClick = (e) => {
    e.preventDefault();
    if (onPlusClick) {
      onPlusClick();
      return;
    }
    if (!setActiveTab) return;
    if (currentTab === 'tasks') {
      setActiveTab(isDark ? 'add_edit_task_dark_mode' : 'add_edit_task_light_mode');
    } else {
      if (setPendingTransactionType) setPendingTransactionType('expense');
      setActiveTab(isDark ? 'add_edit_expense_dark_mode' : 'add_edit_expense_light_mode');
    }
  };

  // Color tokens
  const dockBg = isDark
    ? 'bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
    : 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)]';

  const activeColor = 'text-primary';
  const inactiveColor = isDark
    ? 'text-slate-400 hover:text-primary'
    : 'text-slate-500 hover:text-primary';

  const ringColor = isDark ? 'ring-slate-900 shadow-primary/30' : 'ring-white shadow-primary/30';

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`fixed bottom-4 left-0 right-0 mx-auto w-[92%] max-w-md h-16 z-50 px-2 rounded-[2rem] backdrop-blur-3xl flex items-center justify-between pointer-events-auto transition-colors select-none font-sans text-xs ${dockBg}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. HOME TAB */}
      <button
        type="button"
        onClick={() => handleTabClick('home')}
        className={`flex flex-col items-center justify-center flex-1 h-full rounded-full transition-colors cursor-pointer pointer-events-auto ${
          currentTab === 'home' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
        }`}
      >
        <Home size={20} strokeWidth={2} className="mb-1" />
        <span className="text-xs font-sans tracking-tight mt-0.5">Home</span>
      </button>

      {/* 2. FINANCE TAB */}
      <button
        type="button"
        onClick={() => handleTabClick('finance')}
        className={`flex flex-col items-center justify-center flex-1 h-full rounded-full transition-colors cursor-pointer pointer-events-auto ${
          currentTab === 'finance' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
        }`}
      >
        <CreditCard size={20} strokeWidth={2} className="mb-1" />
        <span className="text-xs font-sans tracking-tight mt-0.5">Finance</span>
      </button>

      {/* 3. CENTER ACTION (+) BUTTON */}
      <div className="flex items-center justify-center px-2">
        <button
          type="button"
          onClick={handlePlusClick}
          aria-label={currentTab === 'tasks' ? 'Add Task' : 'Log Expense'}
          className={`w-14 h-14 -mt-6 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform ring-4 cursor-pointer pointer-events-auto shadow-primary/30 ${ringColor}`}
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* 4. TASKS TAB */}
      <button
        type="button"
        onClick={() => handleTabClick('tasks')}
        className={`flex flex-col items-center justify-center flex-1 h-full rounded-full transition-colors cursor-pointer pointer-events-auto ${
          currentTab === 'tasks' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
        }`}
      >
        <CheckSquare size={20} strokeWidth={2} className="mb-1" />
        <span className="text-xs font-sans tracking-tight mt-0.5">Tasks</span>
      </button>

      {/* 5. MORE TAB */}
      <button
        type="button"
        onClick={() => handleTabClick('more')}
        className={`flex flex-col items-center justify-center flex-1 h-full rounded-full transition-colors cursor-pointer pointer-events-auto ${
          currentTab === 'more' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
        }`}
      >
        <LayoutGrid size={20} strokeWidth={2} className="mb-1" />
        <span className="text-xs font-sans tracking-tight mt-0.5">More</span>
      </button>
    </nav>
  );
}

export { BottomNavBar, BottomNavBar as BottomNav };
