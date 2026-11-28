import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';
import { logicalScreenId, logicalHistoryStack } from '../utils/themeNavigation.js';

const navigationStorage = createIndexedDbStorage({ legacyLocalStorageKey: 'momentum-navigation-storage' });
const getSafeStorage = () => navigationStorage;

const isTopLevelTab = (screen) => {
  if (!screen) return false;
  const s = screen.toLowerCase();
  return (
    s.includes('home_dashboard') ||
    s.includes('tasks_reminders') ||
    s.includes('daily_routine') ||
    s.includes('finance_dashboard') ||
    s.includes('finance_expense_tracker') ||
    s.includes('income_management') ||
    s.includes('notes_main') ||
    s.includes('prayer_times') ||
    s.includes('calendars_main') ||
    s.includes('more_')
  );
};

const resolveNavigationDirection = (fromScreen, toScreen, isBack = false) => {
  if (isBack) return 'backward';
  if (!fromScreen || !toScreen) return 'tab';
  if (isTopLevelTab(fromScreen) && isTopLevelTab(toScreen)) {
    return 'tab';
  }
  return 'forward';
};

/**
 * Global Navigation Store for Momentum
 * Manages active screen routing, navigation history stack, and seamless goBack logic
 * with browser history synchronization (pushState / popstate) and safe Home fallbacks.
 */
export const useNavigationStore = create(
  persist(
    (set, get) => ({
      activeTab: typeof window !== 'undefined'
        ? (() => {
            const sp = new URLSearchParams(window.location.search);
            const queryScreen = sp.get('screen');
            if (queryScreen) return logicalScreenId(queryScreen);
            const path = window.location.pathname;
            if (path.includes('/finance/dashboard')) return 'finance_dashboard';
            if (path.includes('/finance/income')) return 'income_management';
            if (path.includes('/finance/expenses')) return 'finance_expense_tracker';
            return 'home_dashboard';
          })()
        : 'home_dashboard',
      
      routeParams: typeof window !== 'undefined'
        ? (() => {
            const sp = new URLSearchParams(window.location.search);
            const params = {};
            if (sp.has('taskId')) params.taskId = sp.get('taskId');
            if (sp.has('routineId')) params.routineId = sp.get('routineId');
            if (sp.has('dateKey')) params.dateKey = sp.get('dateKey');
            return params;
          })()
        : {},
      historyStack: [],
      tasksSubTab: typeof window !== 'undefined'
        ? (() => {
            const s = new URLSearchParams(window.location.search).get('screen') || '';
            if (s.includes('daily_routine') || s === 'routine') return 'routine';
            return 'tasks';
          })()
        : 'tasks',
      financeSubTab: typeof window !== 'undefined'
        ? (() => {
            const s = new URLSearchParams(window.location.search).get('screen') || window.location.pathname;
            if (s.includes('income')) return 'income';
            if (s.includes('finance_expense') || s.includes('/finance/expenses')) return 'expenses';
            return 'dashboard';
          })()
        : 'dashboard',
      navigationDirection: 'tab',
      isSidebarCollapsed: typeof window !== 'undefined'
        ? (() => {
            try {
              return localStorage.getItem('momentum_desktop_sidebar_collapsed') === 'true';
            } catch {
              return false;
            }
          })()
        : false,
      sidebarPosition: typeof window !== 'undefined'
        ? (() => {
            try {
              const saved = localStorage.getItem('momentum_desktop_sidebar_position');
              if (['left', 'right', 'top', 'bottom'].includes(saved)) return saved;
              return 'left';
            } catch {
              return 'left';
            }
          })()
        : 'left',
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),
      toggleSidebarCollapsed: () => {
        const next = !get().isSidebarCollapsed;
        try {
          localStorage.setItem('momentum_desktop_sidebar_collapsed', next ? 'true' : 'false');
        } catch {}
        set({ isSidebarCollapsed: next });
      },
      setSidebarCollapsed: (collapsed) => {
        const val = !!collapsed;
        try {
          localStorage.setItem('momentum_desktop_sidebar_collapsed', val ? 'true' : 'false');
        } catch {}
        set({ isSidebarCollapsed: val });
      },
      setSidebarPosition: (pos) => {
        if (!['left', 'right', 'top', 'bottom'].includes(pos)) return;
        try {
          localStorage.setItem('momentum_desktop_sidebar_position', pos);
        } catch {}
        set({ sidebarPosition: pos });
      },
      setRouteParams: (params) => set({ routeParams: params || {} }),
      setTasksSubTab: (tab) => set({ tasksSubTab: tab || 'tasks' }),
      setFinanceSubTab: (tab) => set({ financeSubTab: tab || 'dashboard' }),
      setNavigationDirection: (dir) => set({ navigationDirection: dir || 'tab' }),

      /**
       * Navigate forward to a target screen and push the current screen to the history stack
       */
      navigateTo: (requestedScreen, params = {}) => {
        if (!requestedScreen) return;
        const nextScreen = logicalScreenId(requestedScreen);
        const { activeTab, tasksSubTab, financeSubTab, historyStack, routeParams } = get();
        if (nextScreen === logicalScreenId(activeTab)) {
          if (params && Object.keys(params).length > 0) {
            set({ routeParams: params });
          }
          return;
        }

        const historyEntry = {
          screen: logicalScreenId(activeTab),
          params: routeParams || {},
          tasksSubTab,
          financeSubTab,
        };
        const nextStack = [...logicalHistoryStack(historyStack), historyEntry];
        const nextState = {
          activeTab: nextScreen,
          routeParams: params || {},
          historyStack: nextStack,
          navigationDirection: resolveNavigationDirection(logicalScreenId(activeTab), nextScreen, false),
        };

        if (nextScreen.includes('finance_dashboard')) {
          nextState.financeSubTab = 'dashboard';
        } else if (nextScreen.includes('income_management')) {
          nextState.financeSubTab = 'income';
        } else if (nextScreen.includes('finance_expense_tracker') || nextScreen === 'finance') {
          nextState.financeSubTab = 'expenses';
        }

        if (nextScreen.includes('daily_routine') || nextScreen === 'routine') {
          nextState.tasksSubTab = 'routine';
        } else if (nextScreen.includes('tasks_reminders') || nextScreen === 'tasks') {
          nextState.tasksSubTab = 'tasks';
        }

        set(nextState);

        if (typeof window !== 'undefined') {
          try {
            const url = new URL(window.location);
            if (nextScreen.includes('finance_dashboard') || nextScreen === '/finance/dashboard') {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/dashboard';
            } else if (nextScreen.includes('income_management') || nextScreen === '/finance/income') {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/income';
            } else if (nextScreen.includes('finance_expense_tracker') || nextScreen === '/finance/expenses') {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/expenses';
            } else {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
            }
            url.searchParams.set('screen', nextScreen);
            if (params?.taskId) url.searchParams.set('taskId', params.taskId);
            else url.searchParams.delete('taskId');
            if (params?.routineId) url.searchParams.set('routineId', params.routineId);
            else url.searchParams.delete('routineId');
            if (params?.dateKey) url.searchParams.set('dateKey', params.dateKey);
            else url.searchParams.delete('dateKey');
            window.history.pushState(
              { screen: nextScreen, stackDepth: nextStack.length, params: params || {} },
              '',
              url
            );
          } catch {
            // Ignore in restricted environments
          }
        }
      },

      /**
       * Set active tab alias for backward compatibility with existing setActiveTab callers
       */
      setActiveTab: (screen, params = {}) => {
        if (typeof screen === 'function') {
          const next = screen(get().activeTab);
          get().navigateTo(next, params);
        } else {
          get().navigateTo(screen, params);
        }
      },

      /**
       * Navigate back to the previous screen in the stack, or use the provided fallback / Home screen
       */
      goBack: (fallback) => {
        const { historyStack } = get();
        const targetFallback = logicalScreenId(fallback || 'home_dashboard');

        if (historyStack.length > 0) {
          const nextStack = logicalHistoryStack(historyStack);
          const previousEntry = nextStack.pop();
          const previousScreen = logicalScreenId(typeof previousEntry === 'object' && previousEntry !== null
            ? previousEntry.screen
            : previousEntry);

          const backState = {
            activeTab: previousScreen,
            routeParams: (typeof previousEntry === 'object' && previousEntry !== null && previousEntry.params)
              ? previousEntry.params
              : {},
            historyStack: nextStack,
            navigationDirection: 'backward',
          };

          if (typeof previousEntry === 'object' && previousEntry !== null) {
            if (previousEntry.tasksSubTab) {
              backState.tasksSubTab = previousEntry.tasksSubTab;
            }
            if (previousEntry.financeSubTab) {
              backState.financeSubTab = previousEntry.financeSubTab;
            }
          } else {
            if (previousScreen.includes('finance_dashboard')) {
              backState.financeSubTab = 'dashboard';
            } else if (previousScreen.includes('income_management')) {
              backState.financeSubTab = 'income';
            } else if (previousScreen.includes('finance_expense_tracker') || previousScreen === 'finance') {
              backState.financeSubTab = 'expenses';
            }

            if (previousScreen.includes('daily_routine') || previousScreen === 'routine') {
              backState.tasksSubTab = 'routine';
            } else if (previousScreen.includes('tasks_reminders') || previousScreen === 'tasks') {
              backState.tasksSubTab = 'tasks';
            }
          }

          set(backState);

          if (typeof window !== 'undefined') {
            try {
              const url = new URL(window.location);
              if (previousScreen.includes('finance_dashboard') || previousScreen === '/finance/dashboard') {
                url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/dashboard';
              } else if (previousScreen.includes('income_management') || previousScreen === '/finance/income') {
                url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/income';
              } else if (previousScreen.includes('finance_expense_tracker') || previousScreen === '/finance/expenses') {
                url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/expenses';
              } else {
                url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
              }
              url.searchParams.set('screen', previousScreen);
              if (backState.routeParams?.taskId) url.searchParams.set('taskId', backState.routeParams.taskId);
              else url.searchParams.delete('taskId');
              if (backState.routeParams?.routineId) url.searchParams.set('routineId', backState.routeParams.routineId);
              else url.searchParams.delete('routineId');
              if (backState.routeParams?.dateKey) url.searchParams.set('dateKey', backState.routeParams.dateKey);
              else url.searchParams.delete('dateKey');
              window.history.replaceState(
                { screen: previousScreen, stackDepth: nextStack.length, params: backState.routeParams },
                '',
                url
              );
            } catch {
              // Ignore
            }
          }
          return previousScreen;
        }

        // Fallback if no history in stack
        const fallbackState = {
          activeTab: targetFallback,
          historyStack: [],
          navigationDirection: 'backward',
        };

        if (targetFallback.includes('finance_dashboard')) {
          fallbackState.financeSubTab = 'dashboard';
        } else if (targetFallback.includes('income_management')) {
          fallbackState.financeSubTab = 'income';
        } else if (targetFallback.includes('finance_expense_tracker') || targetFallback === 'finance') {
          fallbackState.financeSubTab = 'expenses';
        }

        if (targetFallback.includes('daily_routine') || targetFallback === 'routine') {
          fallbackState.tasksSubTab = 'routine';
        } else if (targetFallback.includes('tasks_reminders') || targetFallback === 'tasks') {
          fallbackState.tasksSubTab = 'tasks';
        }

        set(fallbackState);

        if (typeof window !== 'undefined') {
          try {
            const url = new URL(window.location);
            if (targetFallback.includes('finance_dashboard') || targetFallback === '/finance/dashboard') {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/dashboard';
            } else if (targetFallback.includes('income_management') || targetFallback === '/finance/income') {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/income';
            } else if (targetFallback.includes('finance_expense_tracker') || targetFallback === '/finance/expenses') {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/finance/expenses';
            } else {
              url.pathname = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
            }
            url.searchParams.set('screen', targetFallback);
            window.history.replaceState(
              { screen: targetFallback, stackDepth: 0 },
              '',
              url
            );
          } catch {
            // Ignore
          }
        }
        return targetFallback;
      },

      /**
       * Synchronize activeTab from window.onpopstate (e.g. browser or Android hardware back)
       */
      syncFromPopState: (screen) => {
        if (!screen) return;
        const targetScreen = logicalScreenId(screen);
        set((state) => {
          const stack = logicalHistoryStack(state.historyStack);
          const prevIdx = stack.map((e) => (typeof e === 'object' && e !== null ? e.screen : e)).lastIndexOf(targetScreen);
          let restoredTasksSubTab = state.tasksSubTab;
          let restoredFinanceSubTab = state.financeSubTab;
          if (prevIdx !== -1) {
            const popped = stack[prevIdx];
            if (typeof popped === 'object' && popped !== null) {
              if (popped.tasksSubTab) restoredTasksSubTab = popped.tasksSubTab;
              if (popped.financeSubTab) restoredFinanceSubTab = popped.financeSubTab;
            }
            stack.splice(prevIdx);
          }
          return {
            activeTab: targetScreen,
            historyStack: stack,
            tasksSubTab: restoredTasksSubTab,
            financeSubTab: restoredFinanceSubTab,
            navigationDirection: 'backward',
          };
        });
      },

      /**
       * Check if back navigation is possible
       */
      canGoBack: () => get().historyStack.length > 0,
    }),
    {
      name: 'momentum-navigation-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          // Older versions persisted separate Dark/Light route IDs. Migrate them
          // in memory without touching notes, finance, tasks or any other data.
          useNavigationStore.setState({
            activeTab: logicalScreenId(state.activeTab),
            historyStack: logicalHistoryStack(state.historyStack),
          });
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eagerly rehydrate synchronously if in browser to prevent initial render flicker
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-navigation-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.activeTab) {
        const sp = new URLSearchParams(window.location.search);
        const urlScreen = sp.get('screen');
        const urlParams = {};
        if (sp.has('taskId')) urlParams.taskId = sp.get('taskId');
        if (sp.has('routineId')) urlParams.routineId = sp.get('routineId');
        if (sp.has('dateKey')) urlParams.dateKey = sp.get('dateKey');
        const effectiveScreen = logicalScreenId(urlScreen || parsed.state.activeTab);
        const effectiveParams = Object.keys(urlParams).length > 0 ? urlParams : (parsed.state.routeParams || {});
        const initialSubTabs = {};
        if (urlScreen) {
          if (urlScreen.includes('daily_routine') || urlScreen === 'routine') {
            initialSubTabs.tasksSubTab = 'routine';
          } else if (urlScreen.includes('tasks_reminders') || urlScreen === 'tasks') {
            initialSubTabs.tasksSubTab = 'tasks';
          }
          if (urlScreen.includes('income_management')) {
            initialSubTabs.financeSubTab = 'income';
          } else if (urlScreen.includes('finance_dashboard')) {
            initialSubTabs.financeSubTab = 'dashboard';
          } else if (urlScreen.includes('finance_expense_tracker') || urlScreen === 'finance') {
            initialSubTabs.financeSubTab = 'expenses';
          }
        }
        useNavigationStore.setState({
          ...parsed.state,
          activeTab: effectiveScreen,
          historyStack: logicalHistoryStack(parsed.state.historyStack),
          routeParams: effectiveParams,
          ...initialSubTabs,
          _hasHydrated: true,
        });
      } else {
        useNavigationStore.setState({ _hasHydrated: true });
      }
    } else {
      useNavigationStore.setState({ _hasHydrated: true });
    }
  } catch {
    useNavigationStore.setState({ _hasHydrated: true });
  }
}

// Convenience helpers
export const goBack = (fallback) => useNavigationStore.getState().goBack(fallback);
export const navigateTo = (screen, params) => useNavigationStore.getState().navigateTo(screen, params);
export const useNavigation = () => useNavigationStore();

export default useNavigationStore;

