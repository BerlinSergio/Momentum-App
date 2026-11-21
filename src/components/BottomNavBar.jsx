import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  Plus, 
  CheckSquare, 
  LayoutGrid 
} from 'lucide-react';
import { useNavigationStore } from '../store/useNavigationStore';
import { useTranslation } from 'react-i18next';
import { resolveActionContext, executeCreationAction } from '../utils/actionContextResolver';
import QuickActionsSheet from './QuickActionsSheet';

/**
 * Standardized Global Bottom Navigation Bar for Momentum.
 * Features a fully context-aware central (+) Action Button that dynamically maps
 * to the appropriate creation workflow (Task, Routine, Note, Expense, Income, Tasbeeh,
 * or Quick Actions menu) based on the user's active screen and internal tab state.
 *
 * @param {Object} props
 * @param {string} props.activeTab - Current active tab identifier
 * @param {function} props.setActiveTab - State updater for active screen routing
 * @param {boolean} [props.isDarkMode] - Explicit dark mode flag (auto-inferred if omitted)
 * @param {function} [props.onPlusClick] - Custom handler override for center (+) button
 */
export default function BottomNavBar({ activeTab = 'home', setActiveTab, isDarkMode, onPlusClick }) {
  const { t } = useTranslation();
  // All React Hooks called unconditionally at top of component
  const tasksSubTab = useNavigationStore((s) => s.tasksSubTab);
  const financeSubTab = useNavigationStore((s) => s.financeSubTab);
  const routeParams = useNavigationStore((s) => s.routeParams);

  // Modal state for contextual Quick Actions bottom sheet
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [prevActiveTab, setPrevActiveTab] = useState(activeTab);

  // Auto-close sheet when activeTab changes without calling setState in an effect
  if (prevActiveTab !== activeTab) {
    setPrevActiveTab(activeTab);
    if (isQuickActionsOpen) {
      setIsQuickActionsOpen(false);
    }
  }

  // Click debounce lock to prevent rapid accidental double-clicks or duplicate creation
  const isActionPendingRef = useRef(false);

  // Screen visibility restriction guard
  const isHidden = Boolean(
    activeTab && (
      activeTab.includes('splash_screen') || 
      activeTab.includes('personal_setup') || 
      activeTab.includes('pin_setup') || 
      activeTab.includes('quick_note_editor')
    )
  );

  // Normalize active tab domain strictly for visual tab highlighting
  const getNormalizedTab = (tab) => {
    if (!tab) return 'home';
    const t = tab.toLowerCase();
    if (t.includes('home') || t.includes('dashboard')) return 'home';
    if (t.includes('finance') || t.includes('expense') || t.includes('income')) return 'finance';
    if (t.includes('task') || t.includes('routine')) return 'tasks';
    if (
      t.includes('more') || 
      t.includes('setting') || 
      t.includes('profile') || 
      t.includes('appearance') || 
      t.includes('calendar') || 
      t.includes('note') || 
      t.includes('tasbeeh') || 
      t.includes('city') || 
      t.includes('timezone')
    ) {
      return 'more';
    }
    return t;
  };

  const currentTab = getNormalizedTab(activeTab);

  // Normalize theme
  const isDark = typeof isDarkMode === 'boolean'
    ? isDarkMode
    : (activeTab ? activeTab.toLowerCase().includes('dark') : false);

  // Resolve creation action context independently from visual tab selection
  const actionContext = resolveActionContext({
    activeTab,
    tasksSubTab,
    financeSubTab,
    routeParams,
  });

  const handleTabClick = (tabKey) => {
    setIsQuickActionsOpen(false);
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

    // Guard against rapid duplicate clicks
    if (isActionPendingRef.current) return;
    isActionPendingRef.current = true;
    setTimeout(() => {
      isActionPendingRef.current = false;
    }, 450);

    // If consumer provided an explicit onPlusClick override, execute it
    if (onPlusClick) {
      onPlusClick();
      return;
    }

    if (!setActiveTab) return;

    // Guard against recursive creation on active editor screens
    if (actionContext.isBlocked) {
      return;
    }

    // Contextual execution
    if (actionContext.type === 'quick_actions') {
      setIsQuickActionsOpen(true);
    } else {
      executeCreationAction(actionContext.type, { setActiveTab, isDark });
    }
  };

  const handleSelectQuickAction = (actionId) => {
    setIsQuickActionsOpen(false);
    executeCreationAction(actionId, { setActiveTab, isDark });
  };

  if (isHidden) {
    return null;
  }

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
    <>
      {/* The dock box stays fixed-height; safe-area clearance is below it,
          not internal padding that would shift the tab icons and labels. */}
      <nav
        aria-label={t('nav.bottomNavAria')}
        data-testid="mobile-bottom-nav"
        className={`fixed bottom-4 left-0 right-0 mx-auto w-[92%] max-w-md h-16 z-50 px-2 rounded-[2rem] backdrop-blur-3xl shadow-lg border flex items-center justify-between pointer-events-auto transition-colors select-none ${dockBg}`}
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* 1. HOME TAB */}
        <motion.button
          type="button"
          data-testid="mobile-tab-home"
          onClick={() => handleTabClick('home')}
          whileTap={{ scale: 0.92 }}
          className={`relative flex flex-col items-center justify-center flex-1 h-full rounded-2xl transition-colors cursor-pointer pointer-events-auto ${
            currentTab === 'home' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
          }`}
        >
          {currentTab === 'home' && (
            <motion.div
              layoutId="activeBottomTabPill"
              className={`absolute inset-0.5 rounded-2xl -z-10 ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            />
          )}
          <Home size={20} strokeWidth={2} className="mb-1" />
          <span className="text-xs tracking-tight mt-0.5">{t('nav.home')}</span>
        </motion.button>

        {/* 2. FINANCE TAB */}
        <motion.button
          type="button"
          data-testid="mobile-tab-finance"
          onClick={() => handleTabClick('finance')}
          whileTap={{ scale: 0.92 }}
          className={`relative flex flex-col items-center justify-center flex-1 h-full rounded-2xl transition-colors cursor-pointer pointer-events-auto ${
            currentTab === 'finance' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
          }`}
        >
          {currentTab === 'finance' && (
            <motion.div
              layoutId="activeBottomTabPill"
              className={`absolute inset-0.5 rounded-2xl -z-10 ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            />
          )}
          <CreditCard size={20} strokeWidth={2} className="mb-1" />
          <span className="text-xs tracking-tight mt-0.5">{t('nav.finance')}</span>
        </motion.button>

        {/* 3. CONTEXTUAL PLUS BUTTON */}
        <div className="flex items-center justify-center px-2">
          <motion.button
            type="button"
            data-testid="central-action-btn"
            onClick={handlePlusClick}
            aria-label={actionContext.ariaLabel}
            title={actionContext.label}
            whileTap={actionContext.isBlocked ? undefined : { scale: 0.92, rotate: isQuickActionsOpen ? 0 : 45 }}
            whileHover={actionContext.isBlocked ? undefined : { scale: 1.05 }}
            transition={{ type: 'spring', damping: 22, stiffness: 380 }}
            className={`w-14 h-14 -mt-6 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-lg ring-4 cursor-pointer pointer-events-auto shadow-primary/30 ${ringColor} ${
              actionContext.isBlocked ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <Plus size={24} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* 4. TASKS TAB */}
        <motion.button
          type="button"
          data-testid="mobile-tab-tasks"
          onClick={() => handleTabClick('tasks')}
          whileTap={{ scale: 0.92 }}
          className={`relative flex flex-col items-center justify-center flex-1 h-full rounded-2xl transition-colors cursor-pointer pointer-events-auto ${
            currentTab === 'tasks' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
          }`}
        >
          {currentTab === 'tasks' && (
            <motion.div
              layoutId="activeBottomTabPill"
              className={`absolute inset-0.5 rounded-2xl -z-10 ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            />
          )}
          <CheckSquare size={20} strokeWidth={2} className="mb-1" />
          <span className="text-xs tracking-tight mt-0.5">{t('nav.tasks')}</span>
        </motion.button>

        {/* 5. MORE TAB */}
        <motion.button
          type="button"
          data-testid="mobile-tab-more"
          onClick={() => handleTabClick('more')}
          whileTap={{ scale: 0.92 }}
          className={`relative flex flex-col items-center justify-center flex-1 h-full rounded-2xl transition-colors cursor-pointer pointer-events-auto ${
            currentTab === 'more' ? `${activeColor} font-bold` : `${inactiveColor} font-medium`
          }`}
        >
          {currentTab === 'more' && (
            <motion.div
              layoutId="activeBottomTabPill"
              className={`absolute inset-0.5 rounded-2xl -z-10 ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            />
          )}
          <LayoutGrid size={20} strokeWidth={2} className="mb-1" />
          <span className="text-xs tracking-tight mt-0.5">{t('nav.more')}</span>
        </motion.button>
      </nav>

      {/* Global Quick Actions Bottom Sheet */}
      <QuickActionsSheet
        isOpen={isQuickActionsOpen}
        onClose={() => setIsQuickActionsOpen(false)}
        onSelectAction={handleSelectQuickAction}
        isDark={isDark}
      />
    </>
  );
}

export { BottomNavBar, BottomNavBar as BottomNav };
