import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
            const path = window.location.pathname;
            if (path.includes('/finance/dashboard')) return 'finance_dashboard_dark_mode';
            if (path.includes('/finance/income')) return 'income_management_dark_mode';
            if (path.includes('/finance/expenses')) return 'finance_expense_tracker_dark_mode';
            return new URLSearchParams(window.location.search).get('screen') || 'home_dashboard_dark_mode';
          })()
        : 'home_dashboard_dark_mode',
      
      routeParams: {},
      historyStack: [],
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),
      setRouteParams: (params) => set({ routeParams: params || {} }),

      /**
       * Navigate forward to a target screen and push the current screen to the history stack
       */
      navigateTo: (nextScreen, params = {}) => {
        if (!nextScreen) return;
        const { activeTab, historyStack } = get();
        if (nextScreen === activeTab) {
          if (params && Object.keys(params).length > 0) {
            set({ routeParams: params });
          }
          return;
        }

        const nextStack = [...historyStack, activeTab];
        set({
          activeTab: nextScreen,
          routeParams: params || {},
          historyStack: nextStack,
        });

        if (typeof window !== 'undefined') {
          try {
            const url = new URL(window.location);
            if (nextScreen.includes('finance_dashboard') || nextScreen === '/finance/dashboard') {
              url.pathname = '/finance/dashboard';
            } else if (nextScreen.includes('income_management') || nextScreen === '/finance/income') {
              url.pathname = '/finance/income';
            } else if (nextScreen.includes('finance_expense_tracker') || nextScreen === '/finance/expenses') {
              url.pathname = '/finance/expenses';
            }
            url.searchParams.set('screen', nextScreen);
            window.history.pushState(
              { screen: nextScreen, stackDepth: nextStack.length },
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
        const { activeTab, historyStack } = get();
        const isDark = activeTab ? activeTab.toLowerCase().includes('dark') : false;
        const defaultHome = isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode';
        const targetFallback = fallback || defaultHome;

        if (historyStack.length > 0) {
          const nextStack = [...historyStack];
          const previousScreen = nextStack.pop();
          set({
            activeTab: previousScreen,
            routeParams: {},
            historyStack: nextStack,
          });

          if (typeof window !== 'undefined') {
            try {
              const url = new URL(window.location);
              url.searchParams.set('screen', previousScreen);
              window.history.replaceState(
                { screen: previousScreen, stackDepth: nextStack.length },
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
        set({
          activeTab: targetFallback,
          historyStack: [],
        });

        if (typeof window !== 'undefined') {
          try {
            const url = new URL(window.location);
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
        set((state) => {
          const stack = [...state.historyStack];
          const prevIdx = stack.lastIndexOf(screen);
          if (prevIdx !== -1) {
            stack.splice(prevIdx);
          }
          return {
            activeTab: screen,
            historyStack: stack,
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
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
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
        const urlScreen = new URLSearchParams(window.location.search).get('screen');
        useNavigationStore.setState({
          ...parsed.state,
          activeTab: urlScreen || parsed.state.activeTab,
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

