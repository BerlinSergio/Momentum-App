import { useNavigationStore } from '../store/useNavigationStore';

/**
 * App-wide navigation hook compatible with react-router-dom API.
 * Maps path-based routes (e.g. '/dashboard', '/home') to the active screen view.
 */
export function useNavigate() {
  const { setActiveTab, navigateTo, goBack } = useNavigationStore();

  return (to) => {
    if (to === -1 || to === '-1') {
      if (goBack) {
        goBack();
        return;
      }
      if (typeof window !== 'undefined' && window.history) {
        window.history.back();
        return;
      }
      return;
    }
    const raw = String(to).replace(/^\//, '');
    let target = raw;

    if (raw === 'home' || raw === 'dashboard') {
      const isDark = typeof document !== 'undefined' && (
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        (localStorage.getItem('momentum_settings_store') && JSON.parse(localStorage.getItem('momentum_settings_store'))?.state?.theme === 'dark')
      );
      target = isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode';
    }

    if (setActiveTab) setActiveTab(target);
    if (navigateTo) navigateTo(target);
  };
}

