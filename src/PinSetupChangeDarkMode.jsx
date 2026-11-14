import React, { useState, useRef, useEffect } from 'react';
import { useSecurityStore } from './store/useSecurityStore';
import { useNavigate } from './utils/navigation';
import UserAvatar from './components/UserAvatar';
import { 
  ArrowLeft, ShieldCheck, Lock, KeyRound, Shield, CheckCircle2, 
  AlertCircle, Info, HelpCircle, ArrowRight, AlertTriangle 
} from 'lucide-react';

export default function PinSetupChangeDarkMode({ setActiveTab, goBack }) {
  const navigate = useNavigate();
  const { pin: storedPin, setPin, isAppLockActive, setAppLockActive } = useSecurityStore();
  const hasExistingPin = useSecurityStore((state) => (state.hasPin !== undefined ? !!state.hasPin : !!(state.pin && String(state.pin).trim().length === 4)));

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [activeStep, setActiveStep] = useState(hasExistingPin ? 1 : 2);
  const [currentError, setCurrentError] = useState(false);
  const [newPinError, setNewPinError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [failedAttemptsProtection, setFailedAttemptsProtection] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const currentInputRef = useRef(null);
  const newInputRef = useRef(null);
  const confirmInputRef = useRef(null);
  const currentTimeoutRef = useRef(null);
  const newTimeoutRef = useRef(null);
  const confirmTimeoutRef = useRef(null);

  const OBVIOUS_PINS = ['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '4321', '2580', '1379'];
  const isObvious = OBVIOUS_PINS.includes(newPin);
  const effectiveStoredPin = storedPin || '1234';

  const isCurrentValid = !hasExistingPin || (currentPin.length === 4 && currentPin === effectiveStoredPin && !currentError);
  const isCurrentError = currentError || (hasExistingPin && currentPin.length === 4 && currentPin !== effectiveStoredPin);
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
    if (hasExistingPin) {
      setActiveStep(1);
      const timer = setTimeout(() => currentInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setActiveStep(2);
      const timer = setTimeout(() => newInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [hasExistingPin]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2400);
  };

  const handleCurrentPinChange = (val) => {
    if (currentError) return;
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setCurrentPin(cleaned);
    if (cleaned.length === 4) {
      if (cleaned !== effectiveStoredPin) {
        setCurrentError(true);
        showToast('Incorrect current PIN. Please verify.', 'error');
        if (currentTimeoutRef.current) clearTimeout(currentTimeoutRef.current);
        currentTimeoutRef.current = setTimeout(() => {
          setCurrentPin('');
          setCurrentError(false);
          currentInputRef.current?.focus();
        }, 450);
      } else {
        setActiveStep(2);
        setTimeout(() => newInputRef.current?.focus(), 80);
      }
    }
  };

  const handleNewPinChange = (val) => {
    if (newPinError) return;
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setNewPin(cleaned);
    if (cleaned.length === 4) {
      if (OBVIOUS_PINS.includes(cleaned)) {
        setNewPinError(true);
        showToast('Avoid obvious PIN sequences (e.g. 1234, 0000).', 'error');
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
        showToast('PIN confirmation does not match.', 'error');
        if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
        confirmTimeoutRef.current = setTimeout(() => {
          setConfirmPin('');
          setConfirmError(false);
          confirmInputRef.current?.focus();
        }, 450);
      }
    }
  };

  const handleSavePin = () => {
    if (hasExistingPin && currentPin !== effectiveStoredPin) {
      setCurrentError(true);
      showToast('Current PIN is incorrect.', 'error');
      if (currentTimeoutRef.current) clearTimeout(currentTimeoutRef.current);
      currentTimeoutRef.current = setTimeout(() => {
        setCurrentPin('');
        setCurrentError(false);
        setActiveStep(1);
        currentInputRef.current?.focus();
      }, 450);
      return;
    }
    if (newPin.length !== 4) {
      showToast('New PIN must be 4 digits.', 'error');
      setActiveStep(2);
      newInputRef.current?.focus();
      return;
    }
    if (isObvious) {
      setNewPinError(true);
      showToast('Avoid obvious PIN sequences (e.g. 1234, 0000).', 'error');
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
      showToast('PIN confirmation does not match.', 'error');
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = setTimeout(() => {
        setConfirmPin('');
        setConfirmError(false);
        setActiveStep(3);
        confirmInputRef.current?.focus();
      }, 450);
      return;
    }

    setPin(newPin);
    showToast('PIN updated successfully! Vault protected.', 'success');
    setTimeout(() => {
      handleCancelReturn();
    }, 700);
  };

  const handleCancelReturn = () => {
    if (goBack) {
      goBack('settings_profile_dark_mode');
    } else {
      navigate(-1);
    }
  };

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
      {toast.show && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-2xl border shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur-xl ${toast.type === 'error' ? 'bg-slate-900/95 text-rose-300 border-rose-500/40' : 'bg-slate-900/95 text-emerald-300 border-emerald-500/40'}`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      <div>
        {/* 1. TOP HEADER & STATUS BAR */}
        <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Security PIN &amp; Vault
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
        </div>

        {/* Hardware Encrypted Sub-bar */}
        <div className="flex items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-primary">
            <ShieldCheck className="w-4 h-4 text-primary"/>
            <span className="text-[10px] font-bold tracking-wider uppercase text-white">Momentum Shield • Vault Security</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            Hardware Encrypted
          </div>
        </div>

        {/* 2. DYNAMIC ACTION HEADER */}
        <div className="mx-5 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 tracking-tight">
            <Lock className="w-5 h-5 text-primary flex-shrink-0" />
            <span>{hasExistingPin ? 'Change Existing PIN' : 'Create New PIN'}</span>
          </h2>
        </div>

        {/* 3. ZERO-KNOWLEDGE VAULT INFO CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl flex items-start gap-3.5 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Shield className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">Zero-Knowledge Vault</h3>
            <p className="text-xs font-normal text-slate-400 mt-1 leading-relaxed">Your 4-digit PIN secures your personal reflections, financial transactions, and sacred journals via on-device Secure Enclave.</p>
          </div>
        </div>

        {/* 4. PIN SEQUENCE CONTAINER */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">PIN Sequence</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 border border-teal-500/30 text-teal-300">
              <CheckCircle2 className="w-3 h-3 text-teal-400"/>
              Validation Active
            </span>
          </div>
          
          {/* Row 1 (Enter Current PIN - Only shown when user has existing PIN) */}
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
                  <h4 className="text-xs font-bold text-white">1. Enter Current PIN</h4>
                </div>
                <span className={`text-[11px] font-medium block pl-6 mt-0.5 ${isCurrentError ? 'text-rose-400' : isCurrentValid && currentPin.length === 4 ? 'text-teal-400' : 'text-slate-400'}`}>
                  {isCurrentError ? 'Incorrect current PIN' : isCurrentValid && currentPin.length === 4 ? 'Identity authenticated' : currentPin.length === 0 ? 'Enter active 4-digit PIN' : `${4 - currentPin.length} digits remaining`}
                </span>
              </div>
              <div 
                onClick={() => { setActiveStep(1); currentInputRef.current?.focus(); }}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeStep === 1 ? 'bg-slate-800 border-primary/50 ring-2 ring-primary/30' : 'bg-slate-800/80 border border-slate-700/60'} ${currentError ? 'animate-shake' : ''}`}
              >
                <input 
                  ref={currentInputRef}
                  aria-label="Enter Current PIN" 
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
                <h4 className="text-xs font-bold text-white">{hasExistingPin ? '2. New 4-Digit PIN' : '1. Create 4-Digit PIN'}</h4>
              </div>
              <span className={`text-[11px] font-medium block pl-6 mt-0.5 ${newPinError ? 'text-rose-400' : isObvious ? 'text-amber-400' : isNewValid ? 'text-teal-400' : 'text-slate-400'}`}>
                {newPinError ? 'Avoid obvious sequences' : newPin.length === 0 ? 'Choose unique 4 digits' : isObvious ? 'Avoid obvious sequences' : isNewValid ? 'High entropy matched' : `${4 - newPin.length} digits remaining`}
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

          {/* Row 3 (Confirm New PIN) */}
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
                <h4 className="text-xs font-bold text-white">{hasExistingPin ? '3. Confirm New PIN' : '2. Confirm New PIN'}</h4>
              </div>
              <span className={`text-[11px] font-medium block pl-6 mt-0.5 ${isConfirmMismatch ? 'text-rose-400' : isConfirmMatch ? 'text-teal-400' : 'text-slate-400'}`}>
                {confirmPin.length === 0 ? 'Awaiting last digit slot' : isConfirmMismatch ? 'PIN mismatch detected' : isConfirmMatch ? 'PIN confirmed & ready' : `${4 - confirmPin.length} digits remaining`}
              </span>
            </div>
            <div 
              onClick={() => { setActiveStep(3); confirmInputRef.current?.focus(); }}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${activeStep === 3 ? 'bg-slate-800 border-primary/50 ring-2 ring-primary/30' : 'bg-slate-800/80 border border-slate-700/60'} ${confirmError ? 'animate-shake' : ''}`}
            >
              <input 
                ref={confirmInputRef}
                aria-label="Confirm New PIN" 
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
            <p>Avoid obvious codes such as <strong className="text-white">1234</strong>, <strong className="text-white">0000</strong>, or your birth year.</p>
          </div>
        </div>

        {/* 5. SHIELD GUARDRAILS CARD */}
        <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Shield Guardrails</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Require PIN on App Switch</div>
              <div className="text-xs font-medium text-slate-400">Immediate background lock</div>
            </div>
            <button 
              type="button"
              onClick={() => setAppLockActive(!isAppLockActive)} 
              className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-sm focus:outline-none cursor-pointer ${isAppLockActive ? 'bg-primary justify-end' : 'bg-slate-700 justify-start'}`}
            >
              <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-sm font-semibold text-white">Failed Attempts Protection</div>
              <div className="text-xs font-medium text-slate-400">15 min lockout after 5 fails</div>
            </div>
            <button
              type="button"
              onClick={() => setFailedAttemptsProtection(!failedAttemptsProtection)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${failedAttemptsProtection ? 'bg-teal-500/20 border-teal-500/30 text-teal-400' : 'bg-slate-700/40 border-slate-600/40 text-slate-400'}`}
            >
              {failedAttemptsProtection ? 'Active' : 'Disabled'}
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
          <span className="font-bold text-sm">Save New PIN</span>
          <ArrowRight className="w-4 h-4"/>
        </button>
        <button 
          type="button"
          onClick={handleCancelReturn} 
          className="btn-secondary w-full h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all font-semibold text-sm"
        >
          Cancel &amp; Return
        </button>
      </div>
    </div>
  );
}
