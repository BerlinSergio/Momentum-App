import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { Lock, ArrowLeft, X } from 'lucide-react';
import useSecurityStore, { LOCK_TIMING_OPTIONS } from './store/useSecurityStore';
import { clearBiometricCredential } from './utils/biometricAuth';
import PasscodeChangeDialog from './components/PasscodeChangeDialog';
import { validCurrentSecret } from './utils/credentialService';
import BiometricEnrollmentDialog from './components/BiometricEnrollmentDialog';
import { toast } from './components/ui/toast/index.js';

export default function AppLockDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const security = useSecurityStore();

  const [draft, setDraft] = useState({
    isAppLockActive: security.isAppLockActive,
    biometricsEnabled: security.biometricsEnabled,
    lockTiming: security.lockTiming,
    hideInMultitasking: security.hideInMultitasking,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pausePin, setPausePin] = useState('');
  const [pauseError, setPauseError] = useState('');
  const [pauseBusy, setPauseBusy] = useState(false);
  const [showAlphaModal, setShowAlphaModal] = useState(false);
  const [bioPrompting, setBioPrompting] = useState(false);

  // Synchronize draft state when security store finishes rehydrating
  useEffect(() => {
    if (security._hasHydrated) {
      const timer = setTimeout(() => {
        setDraft({
          isAppLockActive: security.isAppLockActive,
          biometricsEnabled: security.biometricsEnabled,
          lockTiming: security.lockTiming,
          hideInMultitasking: security.hideInMultitasking,
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [
    security._hasHydrated,
    security.isAppLockActive,
    security.biometricsEnabled,
    security.lockTiming,
    security.hideInMultitasking,
  ]);

  const handleToggleBiometrics = async () => {
    if (bioPrompting) return;
    if (security.biometricsEnabled) {
      try {
        const result = await security.setBiometricsEnabled(false);
        if (result?.success === false) { toast.error(result.error); return; }
        clearBiometricCredential();
        toast.info(t('toasts.bioDisabled', 'Biometric unlock disabled.'));
      } catch {
        toast.error(t('security.saveFailed', 'Security preferences could not be saved.'));
      }
      return;
    }
    if (!security.hasPin) {
      toast.error(t('security.pinRequiredForBiometrics', 'Set up your PIN before enabling biometric unlock.'));
      return;
    }
    setBioPrompting(true);
  };

  const handleSave = async () => {
    try {
      const result = await security.updatePreferences(draft);
      if (result?.success === false) { toast.error(result.error); return; }
    } catch {
      toast.error(t('security.saveFailed', 'Security preferences could not be saved.'));
      return;
    }
    setIsSaved(true);
    toast.success(t('toasts.appLockSaved', 'App Lock preferences saved'));
    setTimeout(() => setIsSaved(false), 2200);
  };

  const handleMasterToggle = async () => {
    const next = !security.isAppLockActive;
    if (!next && security.hasPin) {
      setPausePin('');
      setPauseError('');
      setShowPauseModal(true);
      return;
    }
    try {
      const result = await security.setAppLockActive(next);
      if (result?.success === false) { toast.error(result.error); return; }
      setDraft(prev => ({ ...prev, isAppLockActive: next }));
    } catch {
      toast.error(t('security.saveFailed', 'Security preferences could not be saved.'));
    }
  };

  const closePauseModal = () => {
    if (pauseBusy) return;
    setPausePin('');
    setPauseError('');
    setShowPauseModal(false);
  };

  const handlePause = async (e) => {
    e.preventDefault();
    if (pauseBusy) return;
    if (!validCurrentSecret(pausePin,security.passcodeType)) {
      setPauseError(t('security.currentSecretRequired', 'Enter your current credential.'));
      return;
    }
    setPauseBusy(true);
    try {
      const result = await security.pauseAppLock(pausePin);
      if (!result.success) { setPauseError(result.error); return; }
      setDraft(prev => ({ ...prev, isAppLockActive: false }));
      setPausePin('');
      setPauseError('');
      setShowPauseModal(false);
      toast.success(t('security.lockPaused', 'App Lock paused. Your PIN is retained.'));
    } catch {
      setPauseError(t('security.saveFailed', 'Security preferences could not be saved.'));
    } finally {
      setPauseBusy(false);
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={true}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('security.appLockSecurity', 'App Lock & Security')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => (goBack ? goBack('settings_profile_dark_mode') : (setActiveTab ? setActiveTab('settings_profile_dark_mode') : window.history.back()))} className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <UserAvatar 
            setActiveTab={setActiveTab} 
          />
        </div>
      </MomentumGlassHeader>

      <main className="flex-1 flex flex-col relative w-full px-margin pb-safe bg-surface">
        <div className="flex flex-col w-full pb-28 space-y-space-lg">
          {/* Subtle Ambient Glow Orbs */}
          <div className="relative w-full min-w-0">
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none -z-10"><div className="absolute -top-10 -left-6 w-56 h-56 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-24 -right-10 w-64 h-64 bg-tertiary-fixed/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-96 left-8 w-60 h-60 bg-secondary-fixed/15 rounded-full blur-3xl pointer-events-none -z-10"></div></div>

            {/* Security Status Hero Card */}
            <section className="relative overflow-hidden flex flex-col space-y-space-md rounded-3xl p-5 mb-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              {/* Decorative Shield Background SVG Motif */}
              <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none text-primary">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.97-7 10.15-3.87-1.18-7-5.48-7-10.15V6.3l7-3.12zM12 7c-1.66 0-3 1.34-3 3v2H8v6h8v-6h-1v-2c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1v2h-2v-2c0-.55.45-1 1-1z"></path>
                </svg>
              </div>
              <div className="flex items-center justify-between gap-2 min-w-0">
                <div className="flex items-center space-x-space-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary-container flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-[24px]">shield_lock</span>
                  </div>
                  <div className="flex flex-col min-w-0 break-words">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold w-fit transition-colors ${draft.isAppLockActive ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${draft.isAppLockActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                      {draft.isAppLockActive ? t('common.active', 'App Lock Active') : t('common.disabled', 'App Lock Paused')}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">{t('security.title', 'Momentum App Security')}</span>
                  </div>
                </div>

                {/* Master Switch */}
                <button
                  aria-checked={draft.isAppLockActive}
                  onClick={handleMasterToggle}
                  className={`w-12 h-7 shrink-0 rounded-full relative p-0.5 flex items-center transition-colors duration-200 ${draft.isAppLockActive ? 'bg-primary' : 'bg-slate-700'}`}
                  id="master-toggle"
                  role="switch"
                  type="button"
                >
                  <span className={`w-6 h-6 bg-slate-900 rounded-full shadow-sm transform transition-transform duration-200 flex items-center justify-center ${draft.isAppLockActive ? 'translate-x-5 text-primary' : 'translate-x-0 text-slate-500'}`}>
                    <span className="material-symbols-outlined text-[14px]">{draft.isAppLockActive ? 'lock' : 'lock_open'}</span>
                  </span>
                </button>
              </div>

              <div className="pt-1">
                <h2 className="text-lg font-bold text-white">
                  {draft.isAppLockActive ? t('security.appLock', 'App Lock is Active') : t('common.disabled', 'App Lock is Suspended')}
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {draft.isAppLockActive
                    ? t('security.protectionActiveDesc', 'Your spiritual journals, reflective notes, personal finances, and intentional schedules are protected with passcode authentication.')
                    : t('security.protectionSuspendedDesc', 'Security protection is currently suspended. Re-enable the master toggle above to restore passcode application lock.')}
                </p>
              </div>

              {/* Quick stats micro-strip */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white/5 rounded-xl p-2.5 flex items-center space-x-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                  <div className="flex flex-col min-w-0 break-words">
                    <span className="text-[10px] font-semibold text-slate-400">{t('security.protectionStandard', 'Protection Standard')}</span>
                    <span className="text-xs font-bold text-white">PBKDF2-SHA256</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 flex items-center space-x-2">
                  <span className="material-symbols-outlined text-teal-400 text-[18px]">key</span>
                  <div className="flex flex-col min-w-0 break-words">
                    <span className="text-[10px] font-semibold text-slate-400">{t('security.storageVerification', 'Storage Verification')}</span>
                    <span className="text-xs font-bold text-white">{t('security.clientVerifier', 'Client Verifier')}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Subordinate Settings Container (disabled when master switch is off) */}
            <div className={`space-y-space-lg transition-all duration-300 ${!draft.isAppLockActive ? 'opacity-40 pointer-events-none select-none filter grayscale-[25%]' : ''}`}>
              {/* Authentication Methods Section */}
              <div className="pt-space-md space-y-space-md">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold text-white">
                    {t('security.authMethods', 'Authentication Methods')}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {draft.biometricsEnabled ? t('security.twoMethodsActive', '2 Methods Active') : t('security.oneMethodActive', '1 Method Active')}
                  </span>
                </div>

                {/* Biometric Card */}
                <div className="space-y-space-sm rounded-3xl p-5 mb-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">fingerprint</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{t('security.biometricsFaceFingerprint', 'Biometrics (Face / Fingerprint)')}</h4>
                        <p className="text-xs text-slate-400">{t('security.instantEntry', 'Instant entry upon opening Momentum')}</p>
                      </div>
                    </div>
                    <button
                      aria-checked={draft.biometricsEnabled}
                      onClick={handleToggleBiometrics}
                      disabled={bioPrompting}
                      className={`w-11 h-6 shrink-0 rounded-full relative p-0.5 flex items-center transition-colors duration-200 ${draft.biometricsEnabled ? 'bg-primary' : 'bg-slate-700'} ${bioPrompting ? 'animate-pulse opacity-70' : ''}`}
                      id="toggle-bio"
                      role="switch"
                      type="button"
                    >
                      <span className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${draft.biometricsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                  {draft.biometricsEnabled && (
                    <div className="w-full rounded-xl bg-white/5 p-3.5 mt-2 flex flex-row items-start gap-3 border border-white/5">
                      <span className="material-symbols-outlined text-slate-400 text-[18px] mt-0.5 shrink-0">info</span>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {t('security.fallbackMechanism', 'Requires your backup PIN whenever biometrics fail, after device reboot, or after prolonged inactivity.')}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => setActiveTab && setActiveTab('biometric_settings_dark_mode')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-left mt-2 cursor-pointer"
                    type="button"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">fingerprint</span>
                      <span className="text-xs font-semibold text-slate-200">{t('security.biometricSettings', 'Biometric Settings')}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                  </button>
                </div>

                {/* PIN Protection Card */}
                <div className="space-y-space-md rounded-3xl p-5 mb-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">password</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{t('security.pinProtection', 'PIN Protection')}</h4>
                        <p className="text-xs text-teal-400 flex items-center gap-1 font-medium">
                          <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
                          {t('common.active', 'Active')} ({security.passcodeType === 'alphanumeric' ? t('security.alphaPasscode', 'Alphanumeric') : '••••'})
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{t('security.primaryBackup', 'Primary Backup')}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <button
                      onClick={() => security.passcodeType==='alphanumeric' ? setShowPinModal(true) : setActiveTab ? setActiveTab('pin_setup_change_dark_mode') : setShowPinModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
                      type="button"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">edit_note</span>
                        <span className="text-xs font-semibold text-slate-200">{t('security.changePin', 'Change 4-Digit PIN')}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                    </button>
                    <button
                      onClick={() => setShowAlphaModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                      type="button"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">lock_reset</span>
                        <span className="text-xs font-semibold text-slate-200">{security.passcodeType==='alphanumeric'?t('security.changePasscode','Change passcode'):t('security.switchToAlpha', 'Switch to Alphanumeric Passcode')}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lock Timing & Trigger Behavior */}
              <div className="pt-space-md space-y-space-md">
                <div className="px-1">
                  <h3 className="text-sm font-bold text-white">
                    {t('security.lockTimingTrigger', 'Lock Timing & Trigger')}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t('security.chooseLockTiming', 'Choose when Momentum requires your passcode')}
                  </p>
                </div>

                <div className="space-y-2 rounded-3xl p-5 mb-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                  {LOCK_TIMING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      onClick={() => setDraft((prev) => ({ ...prev, lockTiming: option.id }))}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        draft.lockTiming === option.id
                          ? 'bg-primary/20 border border-primary/40 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className="material-symbols-outlined text-[20px] text-primary">{option.icon}</span>
                        <div>
                          <p className="text-xs font-semibold">{option.title}</p>
                          <p className="text-[11px] text-slate-400">{option.description}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="lockTiming"
                        value={option.id}
                        checked={draft.lockTiming === option.id}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary bg-slate-800 border-slate-600 focus:ring-primary focus:ring-offset-slate-900"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Shield & Multitasking */}
              <div className="pt-space-md space-y-space-md">
                <div className="px-1">
                  <h3 className="text-sm font-bold text-white">
                    {t('security.multitaskingPrivacy', 'Multitasking & App Switcher Privacy')}
                  </h3>
                </div>

                <div className="rounded-3xl p-5 mb-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">visibility_off</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{t('security.hideInMultitasking', 'Hide Screen in Multitasking')}</h4>
                        <p className="text-xs text-slate-400">{t('security.obscuresSnapshotDesc', 'Obscures app snapshot when switching apps')}</p>
                      </div>
                    </div>
                    <button
                      aria-checked={draft.hideInMultitasking}
                      onClick={() => setDraft((prev) => ({ ...prev, hideInMultitasking: !prev.hideInMultitasking }))}
                      className={`w-11 h-6 shrink-0 rounded-full relative p-0.5 flex items-center transition-colors duration-200 ${draft.hideInMultitasking ? 'bg-primary' : 'bg-slate-700'}`}
                      role="switch"
                      type="button"
                    >
                      <span className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${draft.hideInMultitasking ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Persistent Save Button */}
            <div className="mt-8 pb-4">
              <button
                type="button"
                onClick={handleSave}
                className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>{isSaved ? t('security.preferencesSaved', 'Preferences Saved!') : t('security.saveSecuritySettings', 'Save Security Settings')}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* {t('security.changePin', 'Change 4-Digit PIN')} Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handlePause} role="dialog" aria-modal="true" aria-labelledby="pause-lock-title" className="w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4 bg-slate-900 border-slate-700 text-slate-100">
            <h3 id="pause-lock-title" className="text-sm font-bold">{t('security.pauseLock', 'Pause App Lock')}</h3>
            <p className="text-xs">{t('security.pauseCredentialDescription', 'Confirm your current credential. It will be retained.')}</p>
            <label className="block text-xs font-semibold" htmlFor="pause-lock-pin">{security.passcodeType==='alphanumeric'?t('security.currentPasscode','Current passcode'):t('security.enterCurrentPin', 'Enter Current PIN')}</label>
            <input id="pause-lock-pin" type="password" inputMode={security.passcodeType==='alphanumeric'?'text':'numeric'} maxLength={security.passcodeType==='alphanumeric'?128:4} autoComplete="current-password" autoFocus disabled={pauseBusy} value={pausePin} onChange={e => setPausePin(security.passcodeType==='alphanumeric'?e.target.value:e.target.value.replace(/\D/g, ''))} className="w-full p-3 text-center tracking-widest rounded-2xl border bg-slate-800 border-slate-600"/>
            {pauseError && <p role="alert" className="text-xs text-red-500">{pauseError}</p>}
            <button type="submit" disabled={pauseBusy} className="w-full rounded-2xl py-3 bg-primary text-white text-xs font-semibold">{t('security.pauseLock', 'Pause App Lock')}</button>
            <button type="button" disabled={pauseBusy} onClick={closePauseModal} className="w-full rounded-2xl py-2 text-xs">{t('common.cancel', 'Cancel')}</button>
          </form>
        </div>
      )}

      {showPinModal && <PasscodeChangeDialog isDarkMode={true} toPin onClose={()=>setShowPinModal(false)}/>}
      {showAlphaModal && <PasscodeChangeDialog isDarkMode={true} onClose={()=>setShowAlphaModal(false)}/>}
      {bioPrompting && <BiometricEnrollmentDialog isDarkMode={true} onClose={() => setBioPrompting(false)} />}
    </>
  );
}
