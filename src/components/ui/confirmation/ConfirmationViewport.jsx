import { AnimatePresence } from 'framer-motion';
import { useConfirmStore } from './confirmService';
import MomentumConfirmDialog from './MomentumConfirmDialog';

/**
 * Universal Confirmation Viewport
 * Placed at the application root level in App.jsx to render active
 * confirmation and prompt dialogs over any screen or navigation drawer.
 */
export default function ConfirmationViewport() {
  const isOpen = useConfirmStore((s) => s.isOpen);

  return (
    <AnimatePresence>
      {isOpen && <MomentumConfirmDialog key="momentum-confirm-dialog" />}
    </AnimatePresence>
  );
}
