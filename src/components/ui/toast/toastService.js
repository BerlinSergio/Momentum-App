import { create } from 'zustand';

/**
 * Global Momentum Toast Notification Store
 * Manages in-app user feedback toasts with top-center positioning,
 * deduplication, auto-dismissal, and accessible live regions.
 */
export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (options) => {
    if (!options || !options.message) return null;

    const message = String(options.message).trim();
    if (!message) return null;

    const type = options.type || 'info'; // 'success' | 'error' | 'warning' | 'info'
    const id = options.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    // Default durations calibrated to readability:
    // Success: 3000ms, Info: 3500ms, Warning: 4500ms, Error: 6000ms
    const defaultDuration =
      type === 'success' ? 3000 :
      type === 'info' ? 3500 :
      type === 'warning' ? 4500 : 6000;

    const duration = options.duration !== undefined ? options.duration : defaultDuration;

    // Deduplication: prevent identical rapid toasts within 1500ms
    const existing = get().toasts.find(
      (t) => t.message === message && t.type === type && Date.now() - t.createdAt < 1500
    );
    if (existing) {
      return existing.id;
    }

    const newToast = {
      id,
      message,
      type,
      duration,
      createdAt: Date.now(),
    };

    // Keep maximum 3 toasts visible at a time
    set((state) => ({
      toasts: [...state.toasts.slice(-2), newToast],
    }));

    // Auto-dismiss timer
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

/**
 * Universal Toast API for use anywhere in the application
 */
export const toast = {
  success: (message, options = {}) =>
    useToastStore.getState().addToast({ message, type: 'success', ...options }),

  error: (message, options = {}) =>
    useToastStore.getState().addToast({ message, type: 'error', ...options }),

  warning: (message, options = {}) =>
    useToastStore.getState().addToast({ message, type: 'warning', ...options }),

  info: (message, options = {}) =>
    useToastStore.getState().addToast({ message, type: 'info', ...options }),

  dismiss: (id) => useToastStore.getState().removeToast(id),

  clear: () => useToastStore.getState().clearToasts(),
};

// Expose globally for testing / inspection if window exists
if (typeof window !== 'undefined') {
  window.momentumToast = toast;
  window.useToastStore = useToastStore;
}
