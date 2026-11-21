import { useNotesStore } from '../store/useNotesStore';
import { useTaskStore } from '../store/useTaskStore';
import { useRoutineStore } from '../store/useRoutineStore';
import { useFinanceStore } from '../store/useFinanceStore';
import i18n from '../i18n/config.js';

/**
 * Momentum Central Context-Aware Creation Action Resolver
 *
 * Distinguishes the user's actual screen and internal tab state to trigger
 * the correct creation flow from the central (+) button in BottomNavBar.
 */

// 1. Creation / Editor screens where central (+) must be safely disabled to prevent recursive creation
export const EDITOR_ROUTES = new Set([
  'quick_note_editor',
  'quick_note_editor_dark_mode',
  'quick_note_editor_light_mode',
  'long_note_editor',
  'long_note_editor_dark_mode',
  'long_note_editor_light_mode',
  'note_editor',
  'note_editor_dark_mode',
  'note_editor_light_mode',
  'add_edit_task',
  'add_edit_task_dark_mode',
  'add_edit_task_light_mode',
  'add_task',
  'add_item',
  'add_edit_routine',
  'add_edit_routine_dark_mode',
  'add_edit_routine_light_mode',
  'add_edit_expense_dark_mode',
  'add_edit_expense_light_mode',
  'add_income_dark_mode',
  'add_income_light_mode',
  'add_edit_income_dark_mode',
  'add_edit_income_light_mode',
  'new_edit_tasbeeh_dark_mode',
  'new_edit_tasbeeh_light_mode',
  'note_media_attachment_viewer',
  'note_media_attachment_viewer_dark_mode',
  'note_media_attachment_viewer_light_mode',
  'note_media_viewer',
  'attachment_details',
  'AttachmentDetails',
]);

// 2. Exact Route Mappings
export const NOTES_ROUTES = new Set([
  'notes',
  'notes_main',
  'reflections',
  'notes_main_dark_mode',
  'notes_main_light_mode',
]);

export const TASKS_ROUTES = new Set([
  'tasks',
  'tasks_reminders_dark_mode',
  'tasks_reminders_dark_mode_1',
  'tasks_reminders_dark_mode_2',
  'tasks_reminders_light_mode',
  'tasks_reminders_light_mode_1',
  'tasks_reminders_light_mode_2',
  'task_details',
  'task_details_dark_mode',
  'task_details_light_mode',
]);

export const ROUTINE_ROUTES = new Set([
  'daily_routine',
  'routine',
  'daily_routine_dark_mode',
  'daily_routine_light_mode',
  'routine_details',
  'routine_details_dark_mode',
  'routine_details_light_mode',
]);

export const INCOME_ROUTES = new Set([
  'income_management_dark_mode',
  'income_management_light_mode',
  'finance_income_tracker_dark_mode',
  'finance_income_tracker_light_mode',
]);

export const FINANCE_ROUTES = new Set([
  'finance',
  '/finance/dashboard',
  '/finance/expenses',
  'finance_dashboard_dark_mode',
  'finance_dashboard_light_mode',
  'finance_expense_tracker_dark_mode',
  'finance_expense_tracker_light_mode',
]);

export const TASBEEH_ROUTES = new Set([
  'tasbeh',
  'tasbeh_main',
  '/tasbeh',
  '/tasbeeh',
  'digital_tasbeeh_counter',
  'tasbeeh',
  'tasbeeh_main',
  'dhikr',
  'tasbeh_dark_mode',
  'tasbeh_light_mode',
  'tasbeeh_main_dark_mode',
  'tasbeeh_main_light_mode',
  'digital_tasbeeh_counter_dark_mode',
  'digital_tasbeeh_counter_light_mode',
  'dhikr_history_dark_mode',
  'dhikr_history_light_mode',
  'tasbeeh_history_dark_mode',
  'tasbeeh_history_light_mode',
  'tasbeeh_settings_dark_mode',
  'tasbeeh_settings_light_mode',
]);

export const HOME_ROUTES = new Set([
  'home',
  'home_dashboard_dark_mode',
  'home_dashboard_light_mode',
]);

/**
 * Resolves the contextual action and accessible metadata based on the active screen and internal tabs.
 *
 * @param {Object} params
 * @param {string} params.activeTab - Global route/screen identifier
 * @param {string} [params.tasksSubTab] - Internal Tasks/Routine tab ('tasks' | 'routine')
 * @param {string} [params.financeSubTab] - Internal Finance tab ('dashboard' | 'expenses' | 'income')
 * @param {Object} [params.routeParams] - Navigation route parameters
 * @returns {{ type: string, label: string, ariaLabel: string, isBlocked: boolean }}
 */
export function resolveActionContext({
  activeTab = 'home',
  tasksSubTab = 'tasks',
  financeSubTab = 'dashboard',
  routeParams = {},
}) {
  const normTab = (activeTab || '').toLowerCase().trim();

  // 1. Guard against recursive creation on active editor/viewer screens
  if (EDITOR_ROUTES.has(normTab) || routeParams?.isEditing) {
    const lbl = i18n?.t ? i18n.t('actions.editorActive', { defaultValue: 'Editor Active' }) : 'Editor Active';
    return {
      type: 'blocked',
      label: lbl,
      ariaLabel: lbl,
      isBlocked: true,
    };
  }

  // 2. Notes & Reflections
  if (NOTES_ROUTES.has(normTab)) {
    const lbl = i18n?.t ? i18n.t('actions.newNote', { defaultValue: 'New Note' }) : 'New Note';
    return {
      type: 'new_note',
      label: lbl,
      ariaLabel: lbl,
      isBlocked: false,
    };
  }

  // 3. Tasks & Daily Routine (internal visible sub-tab takes precedence over route default)
  if (TASKS_ROUTES.has(normTab) || ROUTINE_ROUTES.has(normTab)) {
    if (tasksSubTab === 'routine') {
      const lbl = i18n?.t ? i18n.t('actions.addRoutine', { defaultValue: 'Add Routine' }) : 'Add Routine';
      return {
        type: 'add_routine',
        label: lbl,
        ariaLabel: lbl,
        isBlocked: false,
      };
    }
    const lbl = i18n?.t ? i18n.t('actions.addTask', { defaultValue: 'Add Task' }) : 'Add Task';
    return {
      type: 'add_task',
      label: lbl,
      ariaLabel: lbl,
      isBlocked: false,
    };
  }

  // 4. Finance, Expense Tracker & Income Management (internal visible sub-tab takes precedence over route default)
  if (FINANCE_ROUTES.has(normTab) || INCOME_ROUTES.has(normTab)) {
    if (financeSubTab === 'income') {
      const lbl = i18n?.t ? i18n.t('actions.addIncome', { defaultValue: 'Add Income' }) : 'Add Income';
      return {
        type: 'add_income',
        label: lbl,
        ariaLabel: lbl,
        isBlocked: false,
      };
    }
    const lbl = i18n?.t ? i18n.t('actions.addExpense', { defaultValue: 'Add Expense' }) : 'Add Expense';
    return {
      type: 'add_expense',
      label: lbl,
      ariaLabel: lbl,
      isBlocked: false,
    };
  }

  // 7. Tasbeeh & Dhikr
  if (TASBEEH_ROUTES.has(normTab)) {
    const lbl = i18n?.t ? i18n.t('actions.newTasbeeh', { defaultValue: 'New Tasbeeh' }) : 'New Tasbeeh';
    return {
      type: 'new_tasbeeh',
      label: lbl,
      ariaLabel: lbl,
      isBlocked: false,
    };
  }

  // 8. Home Dashboard, Calendars, Prayer Times, More, Settings, Profile, Fallbacks -> Quick Actions
  const lbl = i18n?.t ? i18n.t('actions.quickActions', { defaultValue: 'Quick Actions' }) : 'Quick Actions';
  return {
    type: 'quick_actions',
    label: lbl,
    ariaLabel: lbl,
    isBlocked: false,
  };
}

/**
 * Centralized Creation Action Dispatcher.
 * Executes the exact creation flow for the specified action type, safely clearing stale editing states.
 *
 * @param {string} actionType - 'new_note' | 'add_task' | 'add_routine' | 'add_expense' | 'add_income' | 'new_tasbeeh'
 * @param {Object} options
 * @param {function} options.setActiveTab - Global navigation router function
 * @param {boolean} options.isDark - Current theme mode (dark vs light)
 */
export function executeCreationAction(actionType, { setActiveTab, isDark }) {
  if (!setActiveTab || actionType === 'blocked') return;

  switch (actionType) {
    case 'new_note': {
      try {
        const store = useNotesStore.getState();
        if (store.clearActiveNote) store.clearActiveNote();
        if (store.startNewNote) store.startNewNote();
      } catch (err) {
        console.warn('Note store cleanup error:', err);
      }
      setActiveTab(
        isDark ? 'quick_note_editor_dark_mode' : 'quick_note_editor_light_mode',
        { isNew: true }
      );
      break;
    }

    case 'add_task': {
      try {
        const taskStore = useTaskStore.getState();
        if (taskStore.setEditingTaskId) taskStore.setEditingTaskId(null);
      } catch (err) {
        console.warn('Task store cleanup error:', err);
      }
      setActiveTab(
        isDark ? 'add_edit_task_dark_mode' : 'add_edit_task_light_mode'
      );
      break;
    }

    case 'add_routine': {
      try {
        const routineStore = useRoutineStore.getState();
        if (routineStore.setEditingRoutineId) routineStore.setEditingRoutineId(null);
      } catch (err) {
        console.warn('Routine store cleanup error:', err);
      }
      setActiveTab(
        isDark ? 'add_edit_routine_dark_mode' : 'add_edit_routine_light_mode'
      );
      break;
    }

    case 'add_expense': {
      try {
        const financeStore = useFinanceStore.getState();
        if (financeStore.setEditingTransaction) financeStore.setEditingTransaction(null);
        if (financeStore.setPendingTransactionType) financeStore.setPendingTransactionType('expense');
      } catch (err) {
        console.warn('Finance store expense cleanup error:', err);
      }
      setActiveTab(
        isDark ? 'add_edit_expense_dark_mode' : 'add_edit_expense_light_mode'
      );
      break;
    }

    case 'add_income': {
      try {
        const financeStore = useFinanceStore.getState();
        if (financeStore.setEditingIncome) financeStore.setEditingIncome(null);
        if (financeStore.setPendingTransactionType) financeStore.setPendingTransactionType('income');
      } catch (err) {
        console.warn('Finance store income cleanup error:', err);
      }
      setActiveTab(
        isDark ? 'add_income_dark_mode' : 'add_income_light_mode'
      );
      break;
    }

    case 'new_tasbeeh': {
      setActiveTab(
        isDark ? 'new_edit_tasbeeh_dark_mode' : 'new_edit_tasbeeh_light_mode'
      );
      break;
    }

    default:
      console.warn(`Unrecognized creation action type: ${actionType}`);
      break;
  }
}
