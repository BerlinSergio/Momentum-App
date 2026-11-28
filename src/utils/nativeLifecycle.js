/**
 * Momentum Native Lifecycle & Hardware Navigation Controller
 * Connects Capacitor App events, Android Hardware Back button,
 * Status Bar, and Keyboard integration to Momentum's navigation architecture.
 */

import { App } from '@capacitor/app';
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { useNavigationStore } from '../store/useNavigationStore';
import useSecurityStore from '../store/useSecurityStore';
import { useTimeStore } from '../store/useTimeStore';
import { useThemeStore } from '../store/useThemeStore';

let isLifecycleInitialized = false;
let lastBackgroundTime = 0;
let lastHomeBackPressed = 0;
const customBackHandlers = [];

/**
 * Register a high-priority custom back handler (e.g. for modal, picker, bottom sheet).
 * If the callback returns true, the event is marked consumed and stops propagation.
 *
 * @param {() => boolean} callback
 * @param {number} [priority=0] Higher number runs earlier
 * @returns {() => void} Unregister function
 */
export function registerBackHandler(callback, priority = 0) {
  const item = { callback, priority };
  customBackHandlers.push(item);
  customBackHandlers.sort((a, b) => b.priority - a.priority);
  return () => {
    const idx = customBackHandlers.indexOf(item);
    if (idx !== -1) customBackHandlers.splice(idx, 1);
  };
}

/**
 * Check if the application is running inside a native Capacitor shell
 */
export function isNativePlatform() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

/**
 * Handle Android Hardware Back Button with prioritized dispatch hierarchy:
 * 1. App Lock guard (never allow hardware back to bypass an active lock screen)
 * 2. Active custom back handlers (modal, bottom sheet, popover)
 * 3. Active DOM modal / sheet dismissal
 * 4. Form / Editor exit to originating details or parent list
 * 5. Details / Sub-settings screen exit to originating list
 * 6. History stack traversal via goBack()
 * 7. Root Home screen deliberate exit guard (double-press within 2s)
 */
export function handleHardwareBackAction() {
  const security = useSecurityStore.getState();
  const nav = useNavigationStore.getState();
  const { activeTab, historyStack } = nav;

  // 1. App Lock Guard — If app is locked, back button must not navigate or bypass
  if (security.isLocked) {
    if (isNativePlatform()) {
      App.minimizeApp().catch(() => {});
    }
    return { handled: true, action: 'lock_screen_guarded' };
  }

  // 2. Custom registered handlers (e.g. modals, bottom sheets, pickers)
  for (const handler of customBackHandlers) {
    try {
      const consumed = handler.callback();
      if (consumed) {
        return { handled: true, action: 'handler_consumed' };
      }
    } catch (e) {
      console.warn('[NativeLifecycle] Custom back handler error:', e);
    }
  }

  // 3. Active Modal / Sheet dismissal
  const activeModal = document.querySelector('[data-modal-open="true"], [role="dialog"], .modal-backdrop');
  if (activeModal) {
    const closeBtn = activeModal.querySelector('[data-close-modal="true"], button[aria-label*="close" i]');
    if (closeBtn) {
      closeBtn.click();
      return { handled: true, action: 'modal_dismissed' };
    }
    // Dispatch Escape key event as universal dismissal
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    return { handled: true, action: 'modal_dismissed' };
  }

  // 4. Editor screens -> Return safely to parent list or details
  const editorRoutes = [
    'add_edit_routine',
    'add_edit_routine_dark_mode',
    'add_edit_routine_light_mode',
    'add_edit_task_dark_mode',
    'add_edit_task_light_mode',
    'quick_note_editor_dark_mode',
    'quick_note_editor_light_mode',
    'long_note_editor_dark_mode',
    'long_note_editor_light_mode',
    'add_edit_expense_dark_mode',
    'add_edit_expense_light_mode',
    'add_edit_income_dark_mode',
    'add_edit_income_light_mode',
  ];

  if (editorRoutes.includes(activeTab)) {
    nav.goBack();
    return { handled: true, action: 'editor_back' };
  }

  // 5. Details screens -> Return to list with appropriate sub-tab
  if (activeTab === 'task_details_dark_mode' || activeTab === 'task_details_light_mode') {
    const isDark = activeTab.includes('dark');
    nav.navigateTo(isDark ? 'tasks_reminders_dark_mode' : 'tasks_reminders_light_mode');
    nav.setTasksSubTab('tasks');
    return { handled: true, action: 'subview_return' };
  }

  if (activeTab === 'routine_details_dark_mode' || activeTab === 'routine_details_light_mode') {
    const isDark = activeTab.includes('dark');
    nav.navigateTo(isDark ? 'daily_routine_dark_mode' : 'daily_routine_light_mode');
    nav.setTasksSubTab('routine');
    return { handled: true, action: 'subview_return' };
  }

  if (
    (activeTab.includes('app_lock_') || activeTab.includes('backup_restore_') || activeTab.includes('settings_')) &&
    activeTab !== 'settings_profile_dark_mode' &&
    activeTab !== 'settings_profile_light_mode'
  ) {
    const isDark = activeTab.includes('dark');
    nav.navigateTo(isDark ? 'settings_profile_dark_mode' : 'settings_profile_light_mode');
    return { handled: true, action: 'subview_return' };
  }

  // 6. Normal history stack traversal
  if (historyStack.length > 0) {
    nav.goBack();
    return { handled: true, action: 'history_back' };
  }

  // 7. Root Home screens -> Exit or minimize
  const rootRoutes = [
    'home_dashboard_dark_mode',
    'home_dashboard_light_mode',
    'home_dark_mode',
    'home_light_mode',
    'home',
  ];

  if (rootRoutes.includes(activeTab)) {
    const now = Date.now();
    if (now - lastHomeBackPressed < 2000) {
      if (isNativePlatform()) {
        App.exitApp().catch(() => {});
      }
      return { handled: true, action: 'exit_app' };
    }
    lastHomeBackPressed = now;
    return { handled: true, action: 'exit_guard_primed' };
  }

  // If not at home and stack is empty, safely fallback to home
  const isDark = activeTab.includes('dark') || useThemeStore.getState().theme === 'dark';
  nav.navigateTo(isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode');
  return { handled: true, action: 'fallback_home' };
}

export const handleHardwareBackButton = handleHardwareBackAction;
export const syncStatusBarTheme = (themeOrIsDark) => {
  const isDark = typeof themeOrIsDark === 'string' ? themeOrIsDark === 'dark' : Boolean(themeOrIsDark);
  return syncNativeStatusBar(isDark);
};

/**
 * Handle Application State Transitions (Foreground / Background)
 */
export function handleAppStateChange({ isActive }) {
  const security = useSecurityStore.getState();

  if (isActive) {
    // FOREGROUND / RESUME
    const now = Date.now();
    const elapsedSeconds = lastBackgroundTime > 0 ? (now - lastBackgroundTime) / 1000 : 0;
    lastBackgroundTime = 0;

    // 1. Refresh Time Store current instant
    if (useTimeStore.getState().tick) {
      useTimeStore.getState().tick();
    }

    // 2. Evaluate App Lock timing policy
    if (security.isAppLockActive && security.hasPin) {
      const timing = security.lockTiming || 'immediate';
      let shouldRelock = false;

      if (timing === 'immediate') {
        shouldRelock = true;
      } else if ((timing === '1min' || timing === 'after_1_minute') && elapsedSeconds >= 60) {
        shouldRelock = true;
      } else if ((timing === '5min' || timing === 'after_5_minutes') && elapsedSeconds >= 300) {
        shouldRelock = true;
      } else if (timing === 'after_15_minutes' && elapsedSeconds >= 900) {
        shouldRelock = true;
      }

      if (shouldRelock && !security.isLocked) {
        security.setLocked(true);
      }
    }
  } else {
    // BACKGROUND
    lastBackgroundTime = Date.now();
  }
}

/**
 * Synchronize native Status Bar appearance with active theme
 */
export async function syncNativeStatusBar(isDark) {
  const isNative = isNativePlatform();
  if (isNative) {
    try {
      await SystemBars.setStyle({
        style: isDark ? SystemBarsStyle.Dark : SystemBarsStyle.Light,
      });
    } catch {
      console.warn('[NativeLifecycle] System bar style unavailable');
    }
  }
  return { success: true, isDark, isNative };
}

/**
 * Initialize all native Capacitor listeners and handlers.
 * Idempotent: safe against duplicate calls.
 */
export function initializeNativeLifecycle() {
  if (isLifecycleInitialized || typeof window === 'undefined') return;
  isLifecycleInitialized = true;
  if (Capacitor.getPlatform() === 'android') document.documentElement.classList.add('momentum-native-android');

  // 1. Hardware Back Button
  try {
    App.addListener('backButton', () => {
      handleHardwareBackAction();
    });
  } catch (err) {
    console.warn('[NativeLifecycle] BackButton listener unavailable:', err.message);
  }

  if(window.momentumDesktop?.platform==='windows')window.momentumDesktop.onAppStateChange(isActive=>handleAppStateChange({isActive}));

  // 2. App State Changes (Foreground / Background)
  try {
    App.addListener('appStateChange', (state) => {
      handleAppStateChange(state);
    });
  } catch (err) {
    console.warn('[NativeLifecycle] AppState listener unavailable:', err.message);
  }

  // 3. Keyboard Visibility Helpers
  // @capacitor/keyboard has no web implementation. Calling addListener() on
  // browsers rejects asynchronously, so a synchronous try/catch is not enough.
  // Register only inside the native Capacitor shell and handle async failures.
  if (isNativePlatform()) {
    try {
      Promise.resolve(Keyboard.addListener('keyboardWillShow', (info) => {
        document.body.classList.add('keyboard-open');
        document.documentElement.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
      })).catch((error) => {
        console.warn('[NativeLifecycle] keyboardWillShow unavailable:', error);
      });

      Promise.resolve(Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-open');
        document.documentElement.style.setProperty('--keyboard-height', '0px');
      })).catch((error) => {
        console.warn('[NativeLifecycle] keyboardWillHide unavailable:', error);
      });
    } catch (error) {
      console.warn('[NativeLifecycle] Keyboard listeners unavailable:', error);
    }
  }

  // 4. Initial Status Bar sync
  const initialTheme = useThemeStore.getState().theme;
  syncNativeStatusBar(initialTheme === 'dark');

  // Subscribe to theme changes for dynamic status bar updates
  useThemeStore.subscribe((state, prevState) => {
    if (state.theme !== prevState?.theme) {
      syncNativeStatusBar(state.theme === 'dark');
    }
  });
}
