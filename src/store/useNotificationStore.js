import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';

const notificationStorage = createIndexedDbStorage({ legacyLocalStorageKey: 'momentum-notification-center-v1' });
const getSafeStorage = () => notificationStorage;

const MAX_NOTIFICATIONS = 100;

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],

      // Add a notification into the history log
      addNotification: (notif) => {
        if (!notif) return null;
        const now = new Date().toISOString();
        const newEntry = {
          id: notif.id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: notif.title || 'Notification',
          body: notif.body || '',
          sourceType: notif.sourceType || 'system', // 'task' | 'routine' | 'prayer' | 'calendar' | 'system'
          sourceId: notif.sourceId || null,
          timestamp: notif.timestamp || now,
          read: Boolean(notif.read),
          targetScreen: notif.targetScreen || null,
          params: notif.params || {},
        };

        set((state) => {
          // Avoid exact duplicate IDs
          const existingIndex = state.notifications.findIndex((n) => n.id === newEntry.id);
          if (existingIndex !== -1) {
            // Update existing entry
            const updated = [...state.notifications];
            updated[existingIndex] = { ...updated[existingIndex], ...newEntry };
            return { notifications: updated };
          }
          const next = [newEntry, ...state.notifications].slice(0, MAX_NOTIFICATIONS);
          return { notifications: next };
        });

        return newEntry;
      },

      // Mark a single notification as read
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      // Mark all notifications as read
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      // Remove a specific notification
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      // Clear entire notification history
      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      // Helper selector for unread count
      getUnreadCount: () => {
        return (get().notifications || []).filter((n) => !n.read).length;
      },
    }),
    {
      name: 'momentum-notification-center-v1',
      storage: createJSONStorage(getSafeStorage),
      version: 1,
    }
  )
);

// Expose on window for testing and verification
if (typeof window !== 'undefined') {
  window.useNotificationStore = useNotificationStore;
}
