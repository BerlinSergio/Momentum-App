import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import { Lock, ArrowLeft, X } from 'lucide-react';
import useSecurityStore, { LOCK_TIMING_OPTIONS } from './store/useSecurityStore';
import { registerBiometrics, clearBiometricCredential } from './utils/biometricAuth';
import { toast } from './components/ui/toast/index.js';

export default function AppLockLightMode({ setActiveTab, goBack }) {
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
  const [showAlphaModal, setShowAlphaModal] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [alphaInput, setAlphaInput] = useState('');
  const [modalFeedback, setModalFeedback] = useState('');
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
        setPinInput('');
        setCurrentPinInput('');
        setAlphaInput('');
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
    if (draft.biometricsEnabled) {
      clearBiometricCredential();
      setDraft((prev) => ({ ...prev, biometricsEnabled: false }));
      security.setBiometricsEnabled(false);
      toast.info(t('toasts.bioDisabled', 'Biometric unlock disabled.'));
      return;
    }

    setBioPrompting(true);
    toast.info(t('toasts.bioRegistering', 'Registering platform biometrics...'));

    try {
      const res = await registerBiometrics({
        title: 'Momentum App Lock',
      });

      setBioPrompting(false);

      if (res.success) {
        setDraft((prev) => ({ ...prev, biometricsEnabled: true }));
        security.setBiometricsEnabled(true);
        toast.success(t('toasts.bioRegistered', 'Biometric authentication registered and enabled!'));
      } else {
        setDraft((prev) => ({ ...prev, biometricsEnabled: false }));
        const msg = res.cancelled
          ? 'Biometric enrollment cancelled. Biometrics remained off.'
          : (res.error || 'Biometric enrollment failed.');
        toast.error(msg);
      }
    } catch {
      setBioPrompting(false);
      setDraft((prev) => ({ ...prev, biometricsEnabled: false }));
      toast.error(t('toasts.bioFailed', 'Biometric registration failed.'));
    }
  };

  const handleSave = () => {
    security.updatePreferences(draft);
    setIsSaved(true);
    toast.success(t('toasts.appLockSaved', 'App Lock preferences saved'));
    setTimeout(() => setIsSaved(false), 2200);
  };

  const handleSavePin = async (e) => {
    e.preventDefault();
    if (pinInput.length !== 4 || isNaN(Number(pinInput))) {
      setModalFeedback('New PIN must be exactly 4 digits');
      return;
    }

    if (security.hasPin) {
      if (!currentPinInput || currentPinInput.length !== 4) {
        setModalFeedback('Current PIN is required to change PIN');
        return;
      }
      const changed = await security.changePin(currentPinInput, pinInput);
      if (!changed.success) {
        setModalFeedback(changed.error || 'Failed to update PIN');
        return;
      }
    } else {
      const created = await security.setPin(pinInput);
      if (!created.success) {
        setModalFeedback(created.error || 'Failed to create PIN');
        return;
      }
    }

    setModalFeedback('PIN updated successfully!');
    setTimeout(() => {
      setModalFeedback('');
      setShowPinModal(false);
      setPinInput('');
      setCurrentPinInput('');
    }, 1000);
  };

  const handleSaveAlpha = (e) => {
    e.preventDefault();
    if (alphaInput.trim().length < 6) {
      setModalFeedback('Passcode must be at least 6 characters');
      return;
    }
    security.setAlphanumeric(alphaInput);
    setModalFeedback('Alphanumeric passcode active!');
    setTimeout(() => {
      setModalFeedback('');
      setShowAlphaModal(false);
    }, 1000);
  };

  return (
    <>
      {/* Top Header Bar */}
      <MomentumGlassHeader isDarkMode={false}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            {t('security.appLockSecurity', 'App Lock & Security')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => (goBack ? goBack('settings_profile_light_mode') : (setActiveTab ? setActiveTab('settings_profile_light_mode') : window.history.back()))} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
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
          <div className="relative w-full">
            <div className="absolute -top-10 -left-6 w-56 h-56 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-24 -right-10 w-64 h-64 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-96 left-8 w-60 h-60 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* Security Status Hero Card */}
            <section className="relative overflow-hidden flex flex-col space-y-space-md rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-md">
              {/* Decorative Shield Background SVG Motif */}
              <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-5 pointer-events-none text-primary">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.97-7 10.15-3.87-1.18-7-5.48-7-10.15V6.3l7-3.12zM12 7c-1.66 0-3 1.34-3 3v2H8v6h8v-6h-1v-2c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1v2h-2v-2c0-.55.45-1 1-1z"></path>
                </svg>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-space-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary-container flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-[24px]">shield_lock</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold w-fit transition-colors ${draft.isAppLockActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${draft.isAppLockActive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`}></span>
                      {draft.isAppLockActive ? t('common.active', 'App Lock Active') : t('common.disabled', 'App Lock Paused')}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">{t('security.title', 'Momentum App Security')}</span>
                  </div>
                </div>

                {/* Master Switch */}
                <button
                  aria-checked={draft.isAppLockActive}
                  onClick={() => { const next = !draft.isAppLockActive; setDraft((prev) => ({ ...prev, isAppLockActive: next })); security.setAppLockActive(next); }}
                  className={`w-12 h-7 rounded-full relative p-0.5 flex items-center transition-colors duration-200 ${draft.isAppLockActive ? 'bg-primary' : 'bg-slate-300'}`}
                  id="master-toggle"
                  role="switch"
                  type="button"
                >
                  <span className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 flex items-center justify-center ${draft.isAppLockActive ? 'translate-x-5 text-primary' : 'translate-x-0 text-slate-400'}`}>
                    <span className="material-symbols-outlined text-[14px]">{draft.isAppLockActive ? 'lock' : 'lock_open'}</span>
                  </span>
                </button>
              </div>

              <div className="pt-1">
                <h2 className="text-lg font-bold text-slate-900">
                  {draft.isAppLockActive ? t('security.appLock', 'App Lock is Active') : t('common.disabled', 'App Lock is Suspended')}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {draft.isAppLockActive
                    ? t('security.protectionActiveDesc', 'Your spiritual journals, reflective notes, personal finances, and intentional schedules are protected with passcode authentication.')
                    : t('security.protectionSuspendedDesc', 'Security protection is currently suspended. Re-enable the master toggle above to restore passcode application lock.')}
                </p>
              </div>

              {/* Quick stats micro-strip */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-slate-50 rounded-xl p-2.5 flex items-center space-x-2 border border-slate-100">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-500">{t('security.protectionStandard', 'Protection Standard')}</span>
                    <span className="text-xs font-bold text-slate-900">PBKDF2-SHA256</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 flex items-center space-x-2 border border-slate-100">
                  <span className="material-symbols-outlined text-teal-600 text-[18px]">key</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-500">{t('security.storageVerification', 'Storage Verification')}</span>
                    <span className="text-xs font-bold text-slate-900">{t('security.clientVerifier', 'Client Verifier')}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Subordinate Settings Container (disabled when master switch is off) */}
            <div className={`space-y-space-lg transition-all duration-300 ${!draft.isAppLockActive ? 'opacity-40 pointer-events-none select-none filter grayscale-[25%]' : ''}`}>
              {/* Authentication Methods Section */}
              <div className="pt-space-md space-y-space-md">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('security.authMethods', 'Authentication Methods')}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {draft.biometricsEnabled ? t('security.twoMethodsActive', '2 Methods Active') : t('security.oneMethodActive', '1 Method Active')}
                  </span>
                </div>

                {/* Biometric Card */}
                <div className="space-y-space-sm rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">fingerprint</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{t('security.biometricsFaceFingerprint', 'Biometrics (Face / Fingerprint)')}</h4>
                        <p className="text-xs text-slate-500">{t('security.instantEntry', 'Instant entry upon opening Momentum')}</p>
                      </div>
                    </div>
                    <button
                      aria-checked={draft.biometricsEnabled}
                      onClick={handleToggleBiometrics}
                      disabled={bioPrompting}
                      className={`w-11 h-6 rounded-full relative p-0.5 flex items-center transition-colors duration-200 ${draft.biometricsEnabled ? 'bg-primary' : 'bg-slate-300'} ${bioPrompting ? 'animate-pulse opacity-70' : ''}`}
                      id="toggle-bio"
                      role="switch"
                      type="button"
                    >
                      <span className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${draft.biometricsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                  {draft.biometricsEnabled && (
                    <div className="w-full rounded-xl bg-slate-50 p-3.5 mt-2 flex flex-row items-start gap-3 border border-slate-100">
                      <span className="material-symbols-outlined text-slate-500 text-[18px] mt-0.5 shrink-0">info</span>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t('security.fallbackMechanism', 'Requires your backup PIN whenever biometrics fail, after device reboot, or after prolonged inactivity.')}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => setActiveTab && setActiveTab('biometric_settings_light_mode')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left mt-2 cursor-pointer border border-slate-100"
                    type="button"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">fingerprint</span>
                      <span className="text-xs font-semibold text-slate-700">{t('security.biometricSettings', 'Biometric Settings')}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                  </button>
                </div>

                {/* PIN Protection Card */}
                <div className="space-y-space-md rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">password</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{t('security.pinProtection', 'PIN Protection')}</h4>
                        <p className="text-xs text-teal-700 flex items-center gap-1 font-medium">
                          <span className="inline-block w-2 h-2 rounded-full bg-teal-600"></span>
                          {t('common.active', 'Active')} ({security.passcodeType === 'alphanumeric' ? t('security.alphaPasscode', 'Alphanumeric') : '••••'})
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{t('security.primaryBackup', 'Primary Backup')}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <button
                      onClick={() => setActiveTab ? setActiveTab('pin_setup_change_light_mode') : setShowPinModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left cursor-pointer border border-slate-100"
                      type="button"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">edit_note</span>
                        <span className="text-xs font-semibold text-slate-700">{t('security.changePin', 'Change 4-Digit PIN')}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                    </button>
                    <button
                      onClick={() => setShowAlphaModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left border border-slate-100"
                      type="button"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">lock_reset</span>
                        <span className="text-xs font-semibold text-slate-700">{t('security.switchToAlpha', 'Switch to Alphanumeric Passcode')}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lock Timing & Trigger Behavior */}
              <div className="pt-space-md space-y-space-md">
                <div className="px-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('security.lockTimingTrigger', 'Lock Timing & Trigger')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('security.chooseLockTiming', 'Choose when Momentum requires your passcode')}
                  </p>
                </div>

                <div className="space-y-2 rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-md">
                  {LOCK_TIMING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      onClick={() => setDraft((prev) => ({ ...prev, lockTiming: option.id }))}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        draft.lockTiming === option.id
                          ? 'bg-primary/10 border border-primary/30 text-slate-900 font-semibold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="material-symbols-outlined text-[20px] text-primary">{option.icon}</span>
                        <div>
                          <p className="text-xs font-semibold">{option.title}</p>
                          <p className="text-[11px] text-slate-500">{option.description}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="lockTiming"
                        value={option.id}
                        checked={draft.lockTiming === option.id}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary bg-white border-slate-300 focus:ring-primary focus:ring-offset-white"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Shield & Multitasking */}
              <div className="pt-space-md space-y-space-md">
                <div className="px-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('security.multitaskingPrivacy', 'Multitasking & App Switcher Privacy')}
                  </h3>
                </div>

                <div className="rounded-3xl p-5 mb-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">visibility_off</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{t('security.hideInMultitasking', 'Hide Screen in Multitasking')}</h4>
                        <p className="text-xs text-slate-500">{t('security.obscuresSnapshotDesc', 'Obscures app snapshot when switching apps')}</p>
                      </div>
                    </div>
                    <button
                      aria-checked={draft.hideInMultitasking}
                      onClick={() => setDraft((prev) => ({ ...prev, hideInMultitasking: !prev.hideInMultitasking }))}
                      className={`w-11 h-6 rounded-full relative p-0.5 flex items-center transition-colors duration-200 ${draft.hideInMultitasking ? 'bg-primary' : 'bg-slate-300'}`}
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
      {showPinModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{security.hasPin ? t('security.changePIN', 'Change PIN') : t('security.setPIN', 'Set PIN')}</h3>
              </div>
              <button onClick={() => setShowPinModal(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSavePin} className="space-y-4">
              {security.hasPin && (
                <div>
                  <label className="text-xs font-semibold text-slate-700">{t('security.enterCurrentPin', 'Enter Current PIN')}</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full mt-1.5 p-3 text-center text-xl tracking-[0.5em] font-mono rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••"
                    autoFocus
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-slate-700">{security.hasPin ? t('security.enterNewPin', 'Enter New 4-Digit PIN') : t('security.enterNewPIN', 'Enter 4-Digit PIN')}</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  className="w-full mt-1.5 p-3 text-center text-xl tracking-[0.5em] font-mono rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••"
                  autoFocus={!security.hasPin}
                />
              </div>
              {modalFeedback && (
                <p className="text-xs text-center font-medium text-primary">{modalFeedback}</p>
              )}
              <div className="space-y-2 pt-1">
                <button type="submit" className="w-full py-3 rounded-2xl bg-primary text-white text-xs font-semibold shadow-md shadow-primary/25 hover:brightness-105">
                  {t('security.savePin', 'Update PIN')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setActiveTab && setActiveTab('pin_setup_change_light_mode');
                  }}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  {t('settings.pinSetupChange', 'Open Full PIN Setup Screen')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Switch to Alphanumeric Modal */}
      {showAlphaModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{t('security.alphaPasscode', 'Alphanumeric Passcode')}</h3>
              </div>
              <button onClick={() => setShowAlphaModal(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAlpha} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">{t('security.enterComplexPasscode', 'Enter Complex Passcode (min 6 chars)')}</label>
                <input
                  type="text"
                  value={alphaInput}
                  onChange={(e) => setAlphaInput(e.target.value)}
                  className="w-full mt-1.5 p-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('security.passcodePlaceholder', 'e.g. MySecur3Passcode!#')}
                  autoFocus
                />
              </div>
              {modalFeedback && (
                <p className="text-xs text-center font-medium text-primary">{modalFeedback}</p>
              )}
              <div className="space-y-2 pt-1">
                <button type="submit" className="w-full py-3 rounded-2xl bg-primary text-white text-xs font-semibold shadow-md shadow-primary/25 hover:brightness-105">
                  {t('security.activatePasscode', 'Activate Passcode')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAlphaModal(false)}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
