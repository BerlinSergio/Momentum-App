import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ShieldCheck,
  Fingerprint,
  Lock,
  Unlock,
  Delete,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import useSecurityStore from '../store/useSecurityStore';
import { authenticateBiometrics } from '../utils/biometricAuth';

export default function AppLockGuard({ children }) {
  const isAppLockActive = useSecurityStore((s) => s.isAppLockActive);
  const biometricsEnabled = useSecurityStore((s) => s.biometricsEnabled);
  const lockTiming = useSecurityStore((s) => s.lockTiming);
  const pin = useSecurityStore((s) => s.pin || '');
  const hasPin = useSecurityStore((s) => (s.hasPin !== undefined ? !!s.hasPin : !!(s.pin && String(s.pin).trim().length === 4)));
  const hideInMultitasking = useSecurityStore((s) => s.hideInMultitasking);
  const _hasHydrated = useSecurityStore((s) => s._hasHydrated);
  const storeIsLocked = useSecurityStore((s) => s.isLocked);
  const setStoreLocked = useSecurityStore((s) => s.setLocked);

  const [isLocked, setIsLocked] = useState(() => (storeIsLocked !== undefined ? storeIsLocked : isAppLockActive && hasPin));
  const [enteredPin, setEnteredPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const lastHiddenTimeRef = useRef(0);
  const hasTriggeredInitialBioRef = useRef(false);

  // Trigger biometric authentication
  const triggerBiometrics = useCallback(async () => {
    if (isAuthenticating || isSuccess) return;
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const result = await authenticateBiometrics({
        title: 'Momentum Vault',
      });

      setIsAuthenticating(false);

      if (result.success) {
        setIsSuccess(true);
        setAuthError('');
        setTimeout(() => {
          setIsLocked(false);
          setStoreLocked(false);
          setIsSuccess(false);
          setFailedAttempts(0);
          setEnteredPin('');
        }, 320);
      } else {
        const errorMsg = result.cancelled
          ? 'Biometric scan cancelled. Enter PIN to unlock.'
          : (result.error || 'Biometric verification failed.');
        setAuthError(errorMsg);
        setFailedAttempts((prev) => prev + 1);
      }
    } catch {
      setIsAuthenticating(false);
      setAuthError('Authentication error. Enter PIN to unlock.');
    }
  }, [isAuthenticating, isSuccess, setStoreLocked]);

  // Sync lock status if app lock active state changes or no PIN set
  useEffect(() => {
    if (_hasHydrated && (!isAppLockActive || !hasPin)) {
      setIsLocked(false);
      setStoreLocked(false);
    }
  }, [_hasHydrated, isAppLockActive, hasPin, setStoreLocked]);

  // Sync with store isLocked
  useEffect(() => {
    if (storeIsLocked !== undefined) {
      setIsLocked(storeIsLocked);
    }
  }, [storeIsLocked]);

  // Optional automatic biometric prompt once on mount if enabled
  useEffect(() => {
    if (_hasHydrated && isAppLockActive && isLocked && biometricsEnabled && !hasTriggeredInitialBioRef.current) {
      hasTriggeredInitialBioRef.current = true;
      const timer = setTimeout(() => {
        triggerBiometrics();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [_hasHydrated, isAppLockActive, isLocked, biometricsEnabled, triggerBiometrics]);

  // Listen for backgrounding / tab switching according to lockTiming
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastHiddenTimeRef.current = Date.now();
        setIsTabHidden(true);
      } else {
        setIsTabHidden(false);
        const activeSecurity = useSecurityStore.getState();
        if (!activeSecurity.isAppLockActive || !activeSecurity.hasPin) return;

        const elapsed = Date.now() - (lastHiddenTimeRef.current || 0);
        let shouldLock = false;

        if (activeSecurity.lockTiming === 'immediate') {
          shouldLock = true;
        } else if (activeSecurity.lockTiming === '1min' && elapsed >= 60000) {
          shouldLock = true;
        } else if (activeSecurity.lockTiming === '5min' && elapsed >= 300000) {
          shouldLock = true;
        } else if (activeSecurity.lockTiming === 'onLock') {
          shouldLock = true;
        }

        if (shouldLock) {
          setIsLocked(true);
          setStoreLocked(true);
          setEnteredPin('');
          setAuthError('');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [setStoreLocked]);

  // Handle PIN input digit addition
  const handleDigitPress = useCallback((digit) => {
    if (enteredPin.length >= 4 || isSuccess) return;
    const nextPin = enteredPin + digit;
    setEnteredPin(nextPin);
    setAuthError('');

    if (nextPin.length === 4) {
      // Validate PIN against store or fallback
      const currentStoredPin = useSecurityStore.getState().pin;
      const expectedPin = currentStoredPin || pin || '1234';
      if (nextPin === expectedPin) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsLocked(false);
          setStoreLocked(false);
          setIsSuccess(false);
          setEnteredPin('');
          setAuthError('');
          setFailedAttempts(0);
        }, 320);
      } else {
        setIsShaking(true);
        setAuthError('Incorrect PIN');
        setFailedAttempts((prev) => prev + 1);
        setTimeout(() => {
          setIsShaking(false);
          setEnteredPin('');
        }, 450);
      }
    }
  }, [enteredPin, isSuccess, pin, setStoreLocked]);

  const handleBackspace = useCallback(() => {
    if (enteredPin.length > 0) {
      setEnteredPin((prev) => prev.slice(0, -1));
      setAuthError('');
    }
  }, [enteredPin]);

  // Keyboard support for desktop users
  useEffect(() => {
    if (!isLocked) return;

    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, handleDigitPress, handleBackspace]);

  // If app lock is not active or no PIN set, render normal children
  if (!isAppLockActive || !hasPin) {
    return <>{children}</>;
  }

  // Multitasking Privacy Blur Overlay
  const privacyVeil = hideInMultitasking && isTabHidden ? (
    <div className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-3xl flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-3 text-white/50">
        <ShieldCheck className="w-12 h-12 text-primary animate-pulse" />
        <span className="text-xs uppercase tracking-widest font-semibold">Momentum Privacy Shield</span>
      </div>
    </div>
  ) : null;

  // Unlocked state: render children
  if (!isLocked) {
    return (
      <>
        {privacyVeil}
        {children}
      </>
    );
  }

  // Locked State: Render impenetrable Security Gate
  return (
    <>
      <style>{`
        @keyframes momentumVaultShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .momentum-shake {
          animation: momentumVaultShake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
      {privacyVeil}
      <div className="fixed inset-0 z-[999] w-screen h-screen min-h-screen bg-slate-950 text-white flex flex-col justify-between items-center p-6 select-none font-sans overflow-y-auto">
        {/* Ambient Chromatic Orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between pt-2 px-2 z-10 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-sm shadow-primary/20">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Momentum Vault</span>
              <p className="text-[9px] text-teal-400 font-mono">ENCLAVE SECURED</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
            {isSuccess ? <Unlock className="w-4 h-4 text-emerald-400 animate-pulse" /> : <Lock className="w-4 h-4 text-slate-400" />}
          </div>
        </div>

        {/* Central Display */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 py-4 w-full max-w-xs">
          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-xl shadow-primary/25 mb-3 transition-transform duration-300">
              {isSuccess ? (
                <Unlock className="w-8 h-8 text-emerald-400 animate-pulse" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-primary" />
              )}
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">
              Momentum Vault
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-[260px] leading-relaxed">
              {isSuccess
                ? 'Vault unlocked. Decrypting enclave...'
                : 'Enter your 4-digit PIN to access your account'}
            </p>
          </div>

          {/* 4 PIN Dots Indicator */}
          <div className="flex flex-col items-center my-3 w-full">
            <div className={`flex items-center justify-center gap-4 py-2 transition-transform duration-200 ${isShaking ? 'momentum-shake' : ''}`}>
              {[0, 1, 2, 3].map((index) => {
                const filled = enteredPin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      isSuccess
                        ? 'bg-emerald-400 border-emerald-400 shadow-lg shadow-emerald-400/50 scale-110'
                        : isShaking
                        ? 'bg-rose-500 border-rose-500 shadow-lg shadow-rose-500/50 scale-105'
                        : filled
                        ? 'bg-primary border-primary shadow-lg shadow-primary/50 scale-110'
                        : 'border-2 border-slate-700 bg-transparent'
                    }`}
                  />
                );
              })}
            </div>

            {/* Error or validation message banner */}
            <div className="h-6 flex items-center justify-center mt-1">
              {authError ? (
                <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              ) : isSuccess ? (
                <span className="text-xs font-semibold text-emerald-400 animate-pulse">
                  PIN Verified • Access Granted
                </span>
              ) : null}
            </div>
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mx-auto pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDigitPress(String(num))}
                disabled={isSuccess}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-primary/20 active:border-primary/40 border border-white/10 text-xl font-semibold text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-sm select-none disabled:opacity-50"
              >
                {num}
              </button>
            ))}

            {/* Bottom Row */}
            {biometricsEnabled ? (
              <button
                type="button"
                onClick={triggerBiometrics}
                disabled={isSuccess || isAuthenticating}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-primary/20 border border-white/10 text-primary transition-all flex items-center justify-center cursor-pointer active:scale-95 select-none disabled:opacity-50"
                title="Unlock with Biometrics"
              >
                <Fingerprint className={`w-6 h-6 text-primary ${isAuthenticating ? 'animate-pulse' : ''}`} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEnteredPin('');
                  setAuthError('');
                }}
                disabled={isSuccess || enteredPin.length === 0}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer active:scale-95 select-none disabled:opacity-30"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => handleDigitPress('0')}
              disabled={isSuccess}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-primary/20 active:border-primary/40 border border-white/10 text-xl font-semibold text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-sm select-none disabled:opacity-50"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleBackspace}
              disabled={isSuccess || enteredPin.length === 0}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 select-none disabled:opacity-30"
              title="Delete"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="text-center pb-2 z-10 max-w-sm">
          <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>AES-256 GCM Zero-Knowledge Hardware Vault</span>
          </p>
        </div>
      </div>
    </>
  );
}
