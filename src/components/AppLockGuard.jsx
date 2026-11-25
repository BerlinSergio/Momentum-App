import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
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
import { useTranslation } from 'react-i18next';
import { authenticateBiometrics } from '../utils/biometricAuth';
import {
  authenticatePin,
  getLockoutState,
  LOCKOUT_STORAGE_KEY,
} from '../utils/credentialService';
import { flushPendingNotificationRoute } from '../utils/nativeNotifications';

export default function AppLockGuard({ children }) {
  const { t } = useTranslation();
  const isAppLockActive = useSecurityStore((s) => s.isAppLockActive);
  const biometricsEnabled = useSecurityStore((s) => s.biometricsEnabled);
  const hideInMultitasking = useSecurityStore((s) => s.hideInMultitasking);
  const hasPin = useSecurityStore((s) => s.hasPin);
  const _hasHydrated = useSecurityStore((s) => s._hasHydrated);
  const storeIsLocked = useSecurityStore((s) => s.isLocked);
  const setStoreLocked = useSecurityStore((s) => s.setLocked);

  const isLocked = isAppLockActive && hasPin && (storeIsLocked !== undefined ? storeIsLocked : true);
  const [enteredPin, setEnteredPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [lockoutState, setLockoutState] = useState(() => getLockoutState());
  const [isShaking, setIsShaking] = useState(false);
  const isSuccess = false;
  const [isTabHidden, setIsTabHidden] = useState(false);

  const lastHiddenTimeRef = useRef(0);
  const hasTriggeredInitialBioRef = useRef(false);
  const authInFlight = useRef(false);
  const authEpoch = useRef(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      authEpoch.current += 1;
    };
  }, []);

  const beginAuthentication = () => {
    if (authInFlight.current || document.hidden) return null;
    const current = getLockoutState();
    if (current.isLockedOut) {
      setLockoutState(current);
      return null;
    }
    authInFlight.current = true;
    setIsAuthenticating(true);
    setAuthError('');
    return authEpoch.current;
  };

  const isCurrentAuthentication = (epoch) => mounted.current &&
    authEpoch.current === epoch && !document.hidden;

  const finishAuthentication = () => {
    authInFlight.current = false;
    if (mounted.current) setIsAuthenticating(false);
  };

  const unlockAuthenticatedSession = (epoch) => {
    if (!isCurrentAuthentication(epoch)) return;
    const current = useSecurityStore.getState();
    if (!current._hasHydrated || !current.isAppLockActive ||
        !current.hasPin || !current.isLocked) return;
    // Do not defer the security-sensitive unlock behind an animation timer.
    const currentLockout = getLockoutState();
    if (currentLockout.isLockedOut) { setLockoutState(currentLockout); return; }
    setLockoutState(currentLockout);
    setEnteredPin('');
    setAuthError('');
    setStoreLocked(false);
    flushPendingNotificationRoute();
  };

  useEffect(() => {
    if (!isShaking) return;
    const timer = setTimeout(() => setIsShaking(false), 450);
    return () => clearTimeout(timer);
  }, [isShaking]);

  // Reflect lockout changes made in another tab before the next interaction.
  useEffect(() => {
    const sync = event => {
      if (event.key === LOCKOUT_STORAGE_KEY || event.key === null) {
        setLockoutState(getLockoutState());
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  // Monitor and tick active lockout countdown
  useEffect(() => {
    if (!lockoutState.isLockedOut) return;

    const interval = setInterval(() => {
      const current = getLockoutState();
      setLockoutState(current);
      if (current.unavailable) {
        setAuthError('PIN attempt storage unavailable. Restart Momentum.');
      } else if (current.isLockedOut) {
        setAuthError(t('lockGuard.tooManyAttempts', { seconds: current.remainingSeconds }));
      } else {
        setAuthError('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutState.isLockedOut]);

  // PIN and biometric checks share a single in-flight slot.
  const triggerBiometrics = useCallback(async () => {
    const epoch = beginAuthentication();
    if (epoch === null) return;
    try {
      const result = await authenticateBiometrics();
      if (!isCurrentAuthentication(epoch)) return;
      if (result.success) {
        if (useSecurityStore.getState().biometricsEnabled) {
          unlockAuthenticatedSession(epoch);
        }
      } else {
        setAuthError(result.cancelled
          ? t('lockGuard.biometricCancelled', 'Biometric scan cancelled. Enter PIN to unlock.')
          : (result.error || t('lockGuard.biometricFailed', 'Biometric authentication failed.')));
      }
    } catch {
      if (isCurrentAuthentication(epoch)) {
        setAuthError(t('lockGuard.authError', 'Authentication error. Enter PIN to unlock.'));
      }
    } finally {
      finishAuthentication();
    }
  }, [setStoreLocked, t]);

  // Optional automatic biometric prompt once on mount if enabled
  useEffect(() => {
    if (_hasHydrated && isAppLockActive && isLocked && biometricsEnabled && !hasTriggeredInitialBioRef.current && !lockoutState.isLockedOut) {
      hasTriggeredInitialBioRef.current = true;
      const timer = setTimeout(() => {
        triggerBiometrics();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [_hasHydrated, isAppLockActive, isLocked, biometricsEnabled, lockoutState.isLockedOut, triggerBiometrics]);

  // Listen for backgrounding / tab switching according to lockTiming
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // A result from before backgrounding must not unlock a later session.
        authEpoch.current += 1;
        setEnteredPin('');
        setAuthError('');
        lastHiddenTimeRef.current = Date.now();
        setIsTabHidden(true);
      } else {
        setIsTabHidden(false);
        const activeSecurity = useSecurityStore.getState();
        if (!activeSecurity.isAppLockActive) return;

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
  const handleDigitPress = useCallback(async (digit) => {
    if (authInFlight.current || document.hidden || enteredPin.length >= 4) return;
    const currentLockout = getLockoutState();
    if (currentLockout.isLockedOut) {
      setLockoutState(currentLockout);
      return;
    }
    const nextPin = enteredPin + digit;
    setEnteredPin(nextPin);
    setAuthError('');
    if (nextPin.length !== 4) return;

    const epoch = beginAuthentication();
    if (epoch === null) {
      setEnteredPin('');
      return;
    }
    try {
      const result = await authenticatePin(nextPin);
      if (!result.success) {
        const nextLockout = result.lockout || getLockoutState();
        if (!isCurrentAuthentication(epoch)) return;
        setLockoutState(nextLockout);
        setIsShaking(true);
        if (nextLockout.unavailable) {
          setAuthError('PIN attempt storage unavailable. Restart Momentum.');
        } else if (nextLockout.isLockedOut) {
          setAuthError(`Too many failed attempts. Try again in ${nextLockout.remainingSeconds}s.`);
        } else if (result.noCredential) {
          setAuthError('No credential configured. App locked.');
        } else {
          setAuthError(result.error || `Incorrect PIN (${nextLockout.failedAttempts}/5)`);
        }
      } else {
        unlockAuthenticatedSession(epoch);
      }
    } catch {
      if (isCurrentAuthentication(epoch)) {
        setIsShaking(true);
        setAuthError('Authentication verification error.');
      }
    } finally {
      if (mounted.current) {
        setEnteredPin('');
      }
      finishAuthentication();
    }
  }, [enteredPin, setStoreLocked]);

  const handleBackspace = useCallback(() => {
    if (!authInFlight.current && !getLockoutState().isLockedOut) {
      setEnteredPin((prev) => prev.slice(0, -1));
      setAuthError('');
    }
  }, []);

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

  // Multitasking Privacy Blur Overlay
  const isInputDisabled = isAuthenticating || isSuccess || lockoutState.isLockedOut;
  const privacyVeil = hideInMultitasking && isTabHidden ? (
    <div className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-3xl flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-3 text-white/50">
        <ShieldCheck className="w-12 h-12 text-primary animate-pulse" />
        <span className="text-xs uppercase tracking-widest font-semibold">{t('lockGuard.privacyShield', 'Momentum Privacy Shield')}</span>
      </div>
    </div>
  ) : null;

  // If app lock is not active, PIN is not set, or app is currently unlocked, render normal children
  if (!isAppLockActive || !hasPin || !isLocked) {
    return (
      <>
        {privacyVeil}
        {children}
      </>
    );
  }

  return (
    <>
      {privacyVeil}
      <div data-testid="app-lock-screen" className="fixed inset-0 z-[999] w-screen h-screen min-h-screen bg-slate-950 text-white flex flex-col justify-between items-center p-6 select-none font-sans overflow-y-auto">
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
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block">{t('lockGuard.securityTitle', 'Momentum Security')}</span>
              <span className="text-[9px] text-teal-400 font-mono block">{t('lockGuard.passcodeProtected', 'PASSCODE PROTECTED')}</span>
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
              {t('lockGuard.lockTitle', 'Momentum Lock')}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-[260px] leading-relaxed">
              {isSuccess
                ? t('lockGuard.pinVerified', 'PIN verified. Unlocking...')
                : lockoutState.isLockedOut
                ? t('lockGuard.temporaryLockout', 'Temporarily locked for security. Please wait.')
                : t('lockGuard.enterPin', 'Enter your 4-digit PIN to access your account')}
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
                  {t('lockGuard.accessGranted', 'PIN Verified • Access Granted')}
                </span>
              ) : null}
            </div>
          </div>

          {/* Numeric Keypad Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mx-auto pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button
                key={num}
                type="button"
                onClick={() => handleDigitPress(String(num))}
                disabled={isInputDisabled}
                whileTap={isInputDisabled ? undefined : { scale: 0.90 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-primary/20 active:border-primary/40 border border-white/10 text-xl font-semibold text-white transition-colors flex items-center justify-center cursor-pointer shadow-sm select-none disabled:opacity-30 disabled:pointer-events-none"
              >
                {num}
              </motion.button>
            ))}

            {/* Bottom Row */}
            {biometricsEnabled ? (
              <motion.button
                type="button"
                onClick={triggerBiometrics}
                disabled={isInputDisabled || isAuthenticating}
                whileTap={isInputDisabled || isAuthenticating ? undefined : { scale: 0.90 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-primary/20 border border-white/10 text-primary transition-colors flex items-center justify-center cursor-pointer select-none disabled:opacity-30 disabled:pointer-events-none"
                title={t('lockGuard.useBiometrics', 'Unlock with Biometrics')}
              >
                <Fingerprint className={`w-6 h-6 text-primary ${isAuthenticating ? 'animate-pulse' : ''}`} />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={() => {
                  if (!authInFlight.current && !getLockoutState().isLockedOut) {
                    setEnteredPin('');
                    setAuthError('');
                  }
                }}
                disabled={isInputDisabled || enteredPin.length === 0}
                whileTap={isInputDisabled || enteredPin.length === 0 ? undefined : { scale: 0.90 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer select-none disabled:opacity-30 disabled:pointer-events-none"
              >
                {t('lockGuard.clear', 'Clear')}
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={() => handleDigitPress('0')}
              disabled={isInputDisabled}
              whileTap={isInputDisabled ? undefined : { scale: 0.90 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-primary/20 active:border-primary/40 border border-white/10 text-xl font-semibold text-white transition-colors flex items-center justify-center cursor-pointer shadow-sm select-none disabled:opacity-30 disabled:pointer-events-none"
            >
              0
            </motion.button>

            <motion.button
              type="button"
              onClick={handleBackspace}
              disabled={isInputDisabled || enteredPin.length === 0}
              whileTap={isInputDisabled || enteredPin.length === 0 ? undefined : { scale: 0.90 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-slate-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer select-none disabled:opacity-30 disabled:pointer-events-none"
              title={t('common.delete', 'Delete')}
            >
              <Delete className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="text-center pb-2 z-10 max-w-sm">
          <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>{t('lockGuard.pbkdfVerification', 'PBKDF2-SHA256 Protected Verification')}</span>
          </p>
        </div>
      </div>
    </>
  );
}
