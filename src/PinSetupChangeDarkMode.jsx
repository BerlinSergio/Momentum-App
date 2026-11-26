import { useTranslation } from 'react-i18next';
import MomentumGlassHeader from './components/MomentumGlassHeader';
import { useState, useRef, useEffect } from 'react';
import { useSecurityStore } from './store/useSecurityStore';
import { useProfileStore } from './store/useProfileStore';
import { useNavigate } from './utils/navigation';
import UserAvatar from './components/UserAvatar';
import { 
  ArrowLeft, ShieldCheck, Lock, KeyRound, Shield, CheckCircle2, 
  AlertCircle, Info, HelpCircle, ArrowRight, AlertTriangle 
} from 'lucide-react';
import PasscodeChangeDialog from './components/PasscodeChangeDialog';
import { authenticatePin } from './utils/credentialService';
import { toast } from './components/ui/toast/index.js';

export default function PinSetupChangeDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAppLockActive, setAppLockActive } = useSecurityStore();
  const hasExistingPin = useSecurityStore((state) => !!state.hasPin);
  const isAlpha = useSecurityStore(state=>state.passcodeType==='alphanumeric');
  const [wasAlpha] = useState(isAlpha);

  const onboardingStep = useProfileStore((s) => s.onboardingStep);
  const completeSetup = useProfileStore((s) => s.completeSetup);
  const setOnboardingStep = useProfileStore((s) => s.setOnboardingStep);
  const isOnboarding = onboardingStep === 'security_setup';

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [activeStep, setActiveStep] = useState(hasExistingPin ? 1 : 2);
  const [currentError, setCurrentError] = useState(false);
  const [isCurrentVerified, setIsCurrentVerified] = useState(!hasExistingPin);
  const [newPinError, setNewPinError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [failedAttemptsProtection, setFailedAttemptsProtection] = useState(true);

  const currentInputRef = useRef(null);
  const newInputRef = useRef(null);
  const confirmInputRef = useRef(null);
  const currentTimeoutRef = useRef(null);
  const newTimeoutRef = useRef(null);
  const confirmTimeoutRef = useRef(null);

  const OBVIOUS_PINS = ['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '4321', '2580', '1379'];
  const isObvious = OBVIOUS_PINS.includes(newPin);

  const isCurrentValid = !hasExistingPin || (currentPin.length === 4 && isCurrentVerified && !currentError);
  const isCurrentError = currentError || (hasExistingPin && currentPin.length === 4 && !isCurrentVerified);
  const isNewValid = newPin.length === 4 && !isObvious && !newPinError;
  const isConfirmMatch = newPin.length === 4 && confirmPin.length === 4 && newPin === confirmPin && !confirmError;
  const isConfirmMismatch = confirmError || (confirmPin.length > 0 && (confirmPin !== newPin.slice(0, confirmPin.length) || (confirmPin.length === 4 && confirmPin !== newPin)));
  const canSave = isCurrentValid && isNewValid && isConfirmMatch;

  useEffect(() => {
    return () => {
      if (currentTimeoutRef.current) clearTimeout(currentTimeoutRef.current);
      if (newTimeoutRef.current) clearTimeout(newTimeoutRef.current);
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasExistingPin) {
        currentInputRef.current?.focus();
      } else {
        newInputRef.current?.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [hasExistingPin]);

  const showToast = (message, type = 'success') => {
    if (type === 'error') {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleCurrentPinChange = async (val) => {
    if (currentError) return;
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setCurrentPin(cleaned);
    if (cleaned.length === 4) {
      try {
        const verifyRes = await authenticatePin(cleaned);
        if (!verifyRes.success) {
          setCurrentError(true);
          setIsCurrentVerified(false);
          showToast(verifyRes.error || t('security.incorrectCurrentPin', 'Current PIN is incorrect.'), 'error');
          if (currentTimeoutRef.current) clearTimeout(currentTimeoutRef.current);
          currentTimeoutRef.current = setTimeout(() => {
            setCurrentPin('');
            setCurrentError(false);
            currentInputRef.current?.focus();
          }, 450);
        } else {
          setIsCurrentVerified(true);
          setActiveStep(2);
          setTimeout(() => newInputRef.current?.focus(), 80);
        }
      } catch {
        setCurrentError(true);
        setIsCurrentVerified(false);
      }
    } else {
      setIsCurrentVerified(false);
    }
  };

  const handleNewPinChange = (val) => {
    if (newPinError) return;
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setNewPin(cleaned);
    if (cleaned.length === 4) {
      if (OBVIOUS_PINS.includes(cleaned)) {
        setNewPinError(true);
        showToast(t('security.avoidObviousPinToast', 'Avoid obvious PIN sequences (e.g. 1234, 0000).'), 'error');
        if (newTimeoutRef.current) clearTimeout(newTimeoutRef.current);
        newTimeoutRef.current = setTimeout(() => {
          setNewPin('');
          setNewPinError(false);
          newInputRef.current?.focus();
        }, 450);
      } else {
        setActiveStep(3);
        setTimeout(() => confirmInputRef.current?.focus(), 80);
      }
    }
  };

  const handleConfirmPinChange = (val) => {
    if (confirmError) return;
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setConfirmPin(cleaned);
    if (cleaned.length === 4) {
      if (cleaned !== newPin) {
        setConfirmError(true);
        showToast(t('security.pinMismatch', 'PIN confirmation does not match.'), 'error');
        if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
        confirmTimeoutRef.current = setTimeout(() => {
          setConfirmPin('');
          setConfirmError(false);
          confirmInputRef.current?.focus();
        }, 450);
      }
    }
  };

  const handleSavePin = async () => {
    if (hasExistingPin) {
      const checkCurrent = await authenticatePin(currentPin);
      if (!checkCurrent.success) {
        setCurrentError(true);
        setIsCurrentVerified(false);
        showToast(checkCurrent.error || t('security.incorrectCurrentPin', 'Current PIN is incorrect.'), 'error');
        if (currentTimeoutRef.current) clearTimeout(currentTimeoutRef.current);
        currentTimeoutRef.current = setTimeout(() => {
          setCurrentPin('');
          setCurrentError(false);
          setActiveStep(1);
          currentInputRef.current?.focus();
        }, 450);
        return;
      }
    }
    if (newPin.length !== 4) {
      showToast(t('security.pinMustBe4Digits', 'New PIN must be 4 digits.'), 'error');
      setActiveStep(2);
      newInputRef.current?.focus();
      return;
    }
    if (isObvious) {
      setNewPinError(true);
      showToast(t('security.avoidObviousPinToast', 'Avoid obvious PIN sequences (e.g. 1234, 0000).'), 'error');
      if (newTimeoutRef.current) clearTimeout(newTimeoutRef.current);
      newTimeoutRef.current = setTimeout(() => {
        setNewPin('');
        setNewPinError(false);
        setActiveStep(2);
        newInputRef.current?.focus();
      }, 450);
      return;
    }
    if (confirmPin !== newPin) {
      setConfirmError(true);
      showToast(t('security.pinMismatch', 'PIN confirmation does not match.'), 'error');
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = setTimeout(() => {
        setConfirmPin('');
        setConfirmError(false);
        setActiveStep(3);
        confirmInputRef.current?.focus();
      }, 450);
      return;
    }

    let saveResult;
    if (hasExistingPin) {
      saveResult = await useSecurityStore.getState().changePin(currentPin, newPin);
    } else {
      saveResult = await useSecurityStore.getState().setPin(newPin);
    }

    if (!saveResult.success) {
      showToast(saveResult.error || 'Failed to save PIN.', 'error');
      return;
    }

    showToast(t('security.pinConfiguredAppLock', 'PIN configured! App Lock active.'), 'success');
    if (isOnboarding) {
      completeSetup();
      setTimeout(() => {
        if (setActiveTab) setActiveTab('home_dashboard_dark_mode');
      }, 600);
    } else {
      setTimeout(() => {
        handleCancelReturn();
      }, 700);
    }
  };

  const handleSkipSecurity = () => {
    showToast(t('security.setupSkippedWelcome', 'Security setup skipped. Welcome to Momentum!'), 'success');
    completeSetup();
    setTimeout(() => {
      if (setActiveTab) setActiveTab('home_dashboard_dark_mode');
    }, 400);
  };

  const handleCancelReturn = () => {
    if (isOnboarding) {
      setOnboardingStep('personal_setup');
      if (setActiveTab) {
        setActiveTab('personal_setup_dark_mode');
      }
      return;
    }
    if (goBack) {
      goBack('settings_profile_dark_mode');
    } else {
      navigate(-1);
    }
  };

  if (wasAlpha) return <PasscodeChangeDialog isDarkMode={true} toPin onClose={handleCancelReturn}/>;
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between pb-16 relative select-none">
      <style>{`
        @keyframes momentumShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: momentumShake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>

      <div>
        {/* 1. TOP HEADER & STATUS BAR */}
        <MomentumGlassHeader isDarkMode={true}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              {t('security.securityPinAppLock', 'Security PIN & App Lock')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCancelReturn}
              className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <UserAvatar setActiveTab={setActiveTab} />
          </div>
        </MomentumGlassHeader>

        {/* Protection Sub-bar */}
        <div className="flex items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-primary">
            <ShieldCheck className="w-4 h-4 text-primary"/>
            <span className="text-[10px] font-bold tracking-wider uppercase text-white">
              {isOnboarding ? t('security.step2of2AppLock', 'Step 2 of 2 • Set Up App Lock') : t('security.securityAppLockTitle', 'Momentum Security • App Lock')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            {isOnboarding ? t('security.optionalSetup', 'Optional Setup') : t('security.saltedHashVerification', 'Salted Hash Verification')}
          </div>
        </div>

        {/* 2. DYNAMIC ACTION HEADER */}
        <div className="mx-5 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 tracking-tight">
            <Lock className="w-5 h-5 text-primary flex-shrink-0" />
            <span>{hasExistingPin ? t('security.changeExistingPin', 'Change Existing PIN') : t('security.createNewPin', 'Create New PIN')}</span>
          </h2>
        </div>

        {/* 3. APP LOCK PROTECTION CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl flex items-start gap-3.5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Shield className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">{t('security.onDevicePasscode', 'On-Device Passcode Protection')}</h3>
            <p className="text-xs font-normal text-slate-400 mt-1 leading-relaxed">{t('security.onDevicePasscodeDesc', 'Your 4-digit PIN secures your personal reflections, financial transactions, and daily records with salted cryptographic derivation.')}</p>
          </div>
        </div>

        {/* 4. PIN SEQUENCE CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{t('security.pinSequence', 'PIN Sequence')}</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 border border-teal-500/30 text-teal-300">
              <CheckCircle2 className="w-3 h-3 text-teal-400"/>
              {t('security.validationActive', 'Validation Active')}
            </span>
          </div>
          
          {/* Row 1 (Enter Current PIN) */}
          {hasExistingPin && (
            <div className="p-3.5 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
              <div>
                <div className="flex items-center gap-2">
                  {isCurrentValid && currentPin.length === 4 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
                  ) : isCurrentError ? (
                    <AlertCircle className="w-4 h-4 text-rose-400"/>
                  ) : (
                    <KeyRound className="w-4 h-4 text-primary"/>
                  )}
                  <h4 className="text-xs font-bold text-white">1. {t('security.enterCurrentPin', 'Enter Current PIN')}</h4>
                </div>
                <span className={`text-[11px] font-medium block pl-6 mt-0.5 ${isCurrentError ? 'text-rose-400' : isCurrentValid && currentPin.length === 4 ? 'text-teal-400' : 'text-slate-400'}`}>
                  {isCurrentError ? t('security.incorrectCurrentPin', 'Incorrect current PIN') : isCurrentValid && currentPin.length === 4 ? t('security.identityAuthenticated', 'Identity authenticated') : currentPin.length === 0 ? t('security.enterActivePin', 'Enter active 4-digit PIN') : t('security.digitsRemaining', '{{count}} digits remaining', { count: 4 - currentPin.length })}
                </span>
              </div>
              <div 
                onClick={() => { setActiveStep(1); currentInputRef.current?.focus(); }}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeStep === 1 ? 'bg-slate-800 border-primary/50 ring-2 ring-primary/30' : 'bg-slate-800/80 border border-slate-700/60'} ${currentError ? 'animate-shake' : ''}`}
              >
                <input 
                  ref={currentInputRef}
                  aria-label={t('security.enterCurrentPin', 'Enter Current PIN')} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  value={currentPin} 
                  onChange={(e) => handleCurrentPinChange(e.target.value)}
                  onFocus={() => setActiveStep(1)}
                  inputMode="numeric" 
                  maxLength={4} 
                  pattern="[0-9]*" 
                  type="password"
                />
                {[0, 1, 2, 3].map((idx) => {
                  const filled = idx < currentPin.length;
                  const dotColor = filled ? (isCurrentError ? 'bg-rose-500' : 'bg-primary') : 'bg-slate-700';
                  return (
                    <span key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${dotColor} ${filled ? 'scale-110 shadow-xs' : 'scale-90 opacity-60'}`} />
                  );
                })}
              </div>
            </div>
          )}

          {/* Row 2 (New 4-Digit PIN) */}
          <div className="p-3.5 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                {isNewValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
                ) : newPinError ? (
                  <AlertCircle className="w-4 h-4 text-rose-400"/>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">{hasExistingPin ? 2 : 1}</div>
                )}
                <h4 className="text-xs font-bold text-white">{hasExistingPin ? t('security.stepNewPin', '2. New 4-Digit PIN') : t('security.stepCreatePin', '1. Create 4-Digit PIN')}</h4>
              </div>
              <span className={`text-[11px] font-medium block pl-6 mt-0.5 ${newPinError ? 'text-rose-400' : isObvious ? 'text-amber-400' : isNewValid ? 'text-teal-400' : 'text-slate-400'}`}>
                {newPinError ? t('security.avoidObvious', 'Avoid obvious sequences') : newPin.length === 0 ? t('security.chooseUnique', 'Choose unique 4 digits') : isObvious ? t('security.avoidObvious', 'Avoid obvious sequences') : isNewValid ? t('security.nonObviousOk', 'Non-obvious PIN OK') : t('security.digitsRemaining', '{{count}} digits remaining', { count: 4 - newPin.length })}
              </span>
            </div>
            <div 
              onClick={() => { setActiveStep(2); newInputRef.current?.focus(); }}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeStep === 2 ? 'bg-slate-800 border-primary/50 ring-2 ring-primary/30' : 'bg-slate-800/80 border border-slate-700/60'} ${newPinError ? 'animate-shake' : ''}`}
            >
              <input 
                ref={newInputRef}
                aria-label={hasExistingPin ? "New 4-Digit PIN" : "Create 4-Digit PIN"}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                value={newPin} 
                onChange={(e) => handleNewPinChange(e.target.value)}
                onFocus={() => setActiveStep(2)}
                inputMode="numeric" 
                maxLength={4} 
                pattern="[0-9]*" 
                type="password"
              />
              {[0, 1, 2, 3].map((idx) => {
                const filled = idx < newPin.length;
                const dotColor = filled ? (newPinError ? 'bg-rose-500' : isObvious ? 'bg-amber-500' : 'bg-primary') : 'bg-slate-700';
                return (
                  <span key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${dotColor} ${filled ? 'scale-110 shadow-xs' : 'scale-90 opacity-60'}`} />
                );
              })}
            </div>
          </div>

          {/* Row 3 ({t('security.confirmNewPin', 'Confirm New PIN')}) */}
          <div className="p-3.5 rounded-2xl flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                {isConfirmMatch ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
                ) : isConfirmMismatch ? (
                  <AlertCircle className="w-4 h-4 text-rose-400"/>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{hasExistingPin ? 3 : 2}</div>
                )}
                <h4 className="text-xs font-bold text-white">{hasExistingPin ? `3. ${t('security.confirmNewPin', 'Confirm New PIN')}` : `2. ${t('security.confirmNewPin', 'Confirm New PIN')}`}</h4>
              </div>
              <span className={`text-[11px] font-medium block pl-6 mt-0.5 ${isConfirmMismatch ? 'text-rose-400' : isConfirmMatch ? 'text-teal-400' : 'text-slate-400'}`}>
                {confirmPin.length === 0 ? t('security.awaitingLastDigit', 'Awaiting last digit slot') : isConfirmMismatch ? t('security.pinMismatchDetected', 'PIN mismatch detected') : isConfirmMatch ? t('security.pinConfirmedReady', 'PIN confirmed & ready') : t('security.digitsRemaining', '{{count}} digits remaining', { count: 4 - confirmPin.length })}
              </span>
            </div>
            <div 
              onClick={() => { setActiveStep(3); confirmInputRef.current?.focus(); }}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeStep === 3 ? 'bg-slate-800 border-primary/50 ring-2 ring-primary/30' : 'bg-slate-800/80 border border-slate-700/60'} ${confirmError ? 'animate-shake' : ''}`}
            >
              <input 
                ref={confirmInputRef}
                aria-label={t('security.confirmNewPin', 'Confirm New PIN')} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                value={confirmPin} 
                onChange={(e) => handleConfirmPinChange(e.target.value)}
                onFocus={() => setActiveStep(3)}
                inputMode="numeric" 
                maxLength={4} 
                pattern="[0-9]*" 
                type="password"
              />
              {[0, 1, 2, 3].map((idx) => {
                const filled = idx < confirmPin.length;
                const dotColor = filled ? (confirmError ? 'bg-rose-500' : isConfirmMatch ? 'bg-emerald-500' : isConfirmMismatch ? 'bg-rose-500' : 'bg-primary') : 'bg-slate-700';
                return (
                  <span key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${dotColor} ${filled ? 'scale-110 shadow-xs' : 'scale-90 opacity-60'}`} />
                );
              })}
            </div>
          </div>

          {/* Validation Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${isConfirmMatch ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : isConfirmMismatch ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800/80 text-slate-400 border border-slate-700'}`}>
              {isConfirmMatch ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/> : isConfirmMismatch ? <AlertCircle className="w-3.5 h-3.5 text-rose-400"/> : <Info className="w-3.5 h-3.5 text-slate-400"/>}
              {isConfirmMatch ? 'PIN Matched' : isConfirmMismatch ? 'PIN Mismatch' : 'Awaiting confirmation'}
            </span>
            <span className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${isObvious ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : isNewValid ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/80 text-slate-400 border border-slate-700'}`}>
              {isObvious ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400"/> : isNewValid ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/> : <Info className="w-3.5 h-3.5 text-slate-400"/>}
              {isObvious ? 'Avoid obvious sequence' : isNewValid ? 'Non-sequential rule OK' : '4 distinct digits advised'}
            </span>
          </div>

          {/* Hint */}
          <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
            <HelpCircle className="w-3.5 h-3.5 text-violet-400 flex-shrink-0"/>
            <p>{t('security.avoidObviousCodesPrompt', 'Avoid obvious codes such as 1234, 0000, or your birth year.')}</p>
          </div>
        </div>

        {/* 5. SHIELD GUARDRAILS CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('security.shieldGuardrails', 'Shield Guardrails')}</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">{t('security.requirePinOnSwitch', 'Require PIN on App Switch')}</div>
              <div className="text-xs font-medium text-slate-400">{t('security.immediateBackgroundLock', 'Immediate background lock')}</div>
            </div>
            <button 
              type="button"
              role="switch"
              aria-checked={isAppLockActive}
              aria-label={t('security.appLock', 'App Lock')}
              onClick={async () => {
                try {
                  const result = await setAppLockActive(!isAppLockActive);
                  if (result?.success === false) {
                    showToast(t('security.pauseInSettings', 'To pause App Lock, confirm your PIN in App Lock settings.'), 'error');
                  }
                } catch {
                  showToast(t('security.saveFailed', 'Security preferences could not be saved.'), 'error');
                }
              }} 
              className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-sm focus:outline-none cursor-pointer ${isAppLockActive ? 'bg-primary justify-end' : 'bg-slate-700 justify-start'}`}
            >
              <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-sm font-semibold text-white">{t('security.failedAttemptsProtection', 'Failed Attempts Protection')}</div>
              <div className="text-xs font-medium text-slate-400">{t('security.lockoutProtectionDesc', 'Lockout protection after 5 fails')}</div>
            </div>
            <button
              type="button"
              onClick={() => setFailedAttemptsProtection(!failedAttemptsProtection)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${failedAttemptsProtection ? 'bg-teal-500/20 border-teal-500/30 text-teal-400' : 'bg-slate-700/40 border-slate-600/40 text-slate-400'}`}
            >
              {failedAttemptsProtection ? t('common.active', 'Active') : t('common.disabled', 'Disabled')}
            </button>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM ACTION BUTTONS */}
      <div className="px-5 pt-3 pb-8 space-y-3">
        <button 
          type="button"
          onClick={handleSavePin} 
          disabled={!canSave}
          className={`btn-primary w-full h-13 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all ${canSave ? 'shadow-primary/30 opacity-100 cursor-pointer active:scale-[0.98]' : 'opacity-50 cursor-not-allowed'}`}
        >
          <span className="font-bold text-sm">
            {isOnboarding ? t('security.savePinEnter', 'Save PIN & Enter Momentum') : t('security.savePin', 'Save New PIN')}
          </span>
          <ArrowRight className="w-4 h-4"/>
        </button>
        <button 
          type="button"
          onClick={isOnboarding ? handleSkipSecurity : handleCancelReturn} 
          className="btn-secondary w-full h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all font-semibold text-sm"
        >
          {isOnboarding ? t('security.skipForNow', 'Skip for Now') : 'Cancel & Return'}
        </button>
      </div>
    </div>
  );
}
