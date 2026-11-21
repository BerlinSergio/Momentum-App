import { useCallback } from 'react';
import { confirm, promptInput, useConfirmStore } from './confirmService';

/**
 * React hook for invoking Momentum confirmation and prompt dialogs.
 */
export function useConfirmDialog() {
  const isOpen = useConfirmStore((s) => s.isOpen);
  const handleCancel = useConfirmStore((s) => s.handleCancel);

  const requestConfirm = useCallback((options) => confirm(options), []);
  const requestPrompt = useCallback((options, defaultVal) => promptInput(options, defaultVal), []);

  return {
    confirm: requestConfirm,
    promptInput: requestPrompt,
    isOpen,
    dismiss: handleCancel,
  };
}

export default useConfirmDialog;
