import { AnimatePresence } from 'framer-motion';
import { useToastStore } from './toastService';
import ToastItem from './ToastItem';

/**
 * Universal Top-Center Toast Viewport
 * Placed at the application root level to ensure all action notifications
 * render at the top center of the visible viewport across Mobile, Tablet, and Desktop.
 */
export default function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div
      role="region"
      aria-label="Application Notifications"
      data-testid="momentum-toast-viewport"
      className="fixed top-4 left-0 right-0 z-[9999] pointer-events-none flex flex-col items-center gap-2 px-4"
      style={{
        top: 'calc(1rem + env(safe-area-inset-top, 0px))',
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {toasts.map((item) => (
          <ToastItem
            key={item.id}
            toast={item}
            onClose={() => removeToast(item.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
