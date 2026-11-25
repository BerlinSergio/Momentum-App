import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSecurityStore from '../store/useSecurityStore';
import { registerBiometrics } from '../utils/biometricAuth';
import { getCommittedStoreRecord } from '../storage/db';
import { toast } from './ui/toast/index.js';

export default function BiometricEnrollmentDialog({ isDarkMode, onClose }) {
  const { t } = useTranslation();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  const submit = async (event) => {
    event.preventDefault();
    if (active.current) return;
    if (!/^\d{4}$/.test(pin)) {
      setError(t('security.currentPinRequired', 'Enter your current 4-digit PIN.'));
      return;
    }
    const state = useSecurityStore.getState();
    if (!state._hasHydrated || !state.hasPin || state.isLocked) {
      setError(t('security.unlockBeforeEnrollment', 'Unlock Momentum with PIN before enabling biometrics.'));
      return;
    }
    const controller = new AbortController();
    active.current = controller;
    setBusy(true);
    setError('');
    try {
      const result = await registerBiometrics({ currentPin: pin, signal: controller.signal });
      if (controller.signal.aborted) return;
      if (!result.success) { setError(result.error); return; }
      const current = useSecurityStore.getState();
      if (!current._hasHydrated || current.isLocked || !current.hasPin) {
        setError(t('security.unlockBeforeEnrollment', 'Unlock Momentum with PIN before enabling biometrics.'));
        return;
      }
      const saved = await current.setBiometricsEnabled(true);
      if (controller.signal.aborted) return;
      const row = await getCommittedStoreRecord('momentum-security-storage');
      if (controller.signal.aborted) return;
      if (saved?.success === false || row?.value?.state?.biometricsEnabled !== true) {
        setError(t('security.saveFailed', 'Security preferences could not be saved. Restart Momentum.'));
        return;
      }
      toast.success(t('toasts.bioRegistered', 'Biometric authentication registered and enabled!'));
      onClose();
    } catch {
      if (!controller.signal.aborted) setError(t('toasts.bioFailed', 'Biometric registration failed.'));
    } finally {
      if (!controller.signal.aborted) { setPin(''); setBusy(false); }
      active.current = null;
    }
  };
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="bio-enrollment-title" className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <h3 id="bio-enrollment-title" className="text-sm font-bold">{t('security.confirmBiometricEnrollment', 'Confirm biometric enrollment')}</h3>
        <p className="text-xs">{t('security.confirmBiometricEnrollmentDesc', 'Confirm your current PIN before registering device authentication.')}</p>
        <label htmlFor="bio-enrollment-pin" className="block text-xs font-semibold">{t('security.enterCurrentPin', 'Enter Current PIN')}</label>
        <input id="bio-enrollment-pin" type="password" inputMode="numeric" autoComplete="off" autoFocus maxLength={4} disabled={busy} value={pin} onChange={e => setPin(e.target.value.replace(/\D/g,''))} className={`w-full rounded-2xl border p-3 text-center tracking-widest ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
        {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-2xl py-3 bg-primary text-white text-xs font-semibold">{busy ? t('toasts.bioRegistering', 'Registering platform biometrics...') : t('common.confirm', 'Confirm')}</button>
        <button type="button" disabled={busy} onClick={onClose} className="w-full rounded-2xl py-2 text-xs">{t('common.cancel', 'Cancel')}</button>
      </form>
    </div>
  );
}
