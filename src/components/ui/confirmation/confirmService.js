import { create } from 'zustand';

/**
 * Momentum Universal Confirmation & Prompt Dialog Store
 * Manages asynchronous promise-based confirmation and prompt dialogs
 * across Mobile (Adaptive Bottom Sheet) and Desktop/Tablet (Floating Glass Modal).
 */
export const useConfirmStore = create((set, get) => ({
  isOpen: false,
  dialogProps: null,

  showDialog: (options = {}) => {
    return new Promise((resolve, reject) => {
      // If a dialog is already active, settle the previous one cleanly
      const current = get().dialogProps;
      if (current && current.resolve) {
        current.resolve(current.type === 'prompt' ? null : false);
      }

      set({
        isOpen: true,
        dialogProps: {
          id: `confirm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          type: options.type || 'confirm', // 'confirm' | 'prompt'
          variant: options.variant || 'default', // 'destructive' | 'warning' | 'info' | 'default'
          title: options.title || '',
          titleKey: options.titleKey || '',
          message: options.message || '',
          messageKey: options.messageKey || '',
          confirmLabel: options.confirmLabel || '',
          confirmLabelKey: options.confirmLabelKey || '',
          cancelLabel: options.cancelLabel || '',
          cancelLabelKey: options.cancelLabelKey || '',
          defaultValue: options.defaultValue !== undefined ? String(options.defaultValue) : '',
          placeholder: options.placeholder || '',
          placeholderKey: options.placeholderKey || '',
          inputType: options.inputType || 'text',
          params: options.params || {},
          resolve,
          reject,
          ...options,
        },
      });
    });
  },

  handleConfirm: (resultValue) => {
    const { dialogProps } = get();
    if (dialogProps && dialogProps.resolve) {
      if (dialogProps.type === 'prompt') {
        dialogProps.resolve(resultValue !== undefined ? resultValue : '');
      } else {
        dialogProps.resolve(true);
      }
    }
    set({ isOpen: false, dialogProps: null });
  },

  handleCancel: () => {
    const { dialogProps } = get();
    if (dialogProps && dialogProps.resolve) {
      if (dialogProps.type === 'prompt') {
        dialogProps.resolve(null);
      } else {
        dialogProps.resolve(false);
      }
    }
    set({ isOpen: false, dialogProps: null });
  },

  closeDialog: () => {
    get().handleCancel();
  },
}));

/**
 * Universal Confirm Dialog Invocation
 * Supports both object options { title, message, variant, ... }
 * and simple string signature confirm(message).
 *
 * @returns {Promise<boolean>} Resolves true if confirmed, false if cancelled/dismissed.
 */
export const confirm = (options) => {
  const opts = typeof options === 'string' ? { message: options } : (options || {});
  return useConfirmStore.getState().showDialog({
    type: 'confirm',
    ...opts,
  });
};

/**
 * Universal Prompt Dialog Invocation
 * Replaces window.prompt with a Momentum device-aware modal/sheet.
 *
 * @returns {Promise<string|null>} Resolves input string if confirmed, null if cancelled.
 */
export const promptInput = (messageOrOptions, defaultVal = '') => {
  let opts = {};
  if (typeof messageOrOptions === 'string') {
    opts = { message: messageOrOptions, defaultValue: defaultVal };
  } else if (messageOrOptions && typeof messageOrOptions === 'object') {
    opts = messageOrOptions;
  }
  return useConfirmStore.getState().showDialog({
    type: 'prompt',
    ...opts,
  });
};

// Global attachment for developer console testing & end-to-end puppeteer verification
if (typeof window !== 'undefined') {
  window.momentumConfirm = confirm;
  window.momentumPrompt = promptInput;
  window.useConfirmStore = useConfirmStore;
}
