import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SplashScreen({ onComplete, mode, setActiveTab, goBack }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = mode ? mode === 'dark' : (theme !== 'light');

  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasFinishedRef = useRef(false);
  const rafIdRef = useRef(null);

  const startAnimation = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    setProgress(0);
    setIsExiting(false);
    hasFinishedRef.current = false;

    const duration = 2200; // 2.2 seconds initialization simulation
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Natural ease-out cubic curve
      const eased = 1 - Math.pow(1 - progressFraction, 2.8);
      const currentVal = Math.min(Math.round(eased * 100), 100);

      setProgress(currentVal);

      if (progressFraction < 1) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true;
          if (onComplete) {
            // Hold for 300ms once progress reaches 100%
            setTimeout(() => {
              setIsExiting(true);
            }, 300);
          }
        }
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isExiting ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: isExiting ? 0.4 : 0.45, ease: isExiting ? 'easeInOut' : 'easeOut' },
        scale: { duration: 0.4, ease: 'easeInOut' },
      }}
      onAnimationComplete={() => {
        if (isExiting && onComplete) {
          onComplete();
        }
      }}
      className={`h-full w-full overflow-hidden select-none overscroll-none flex flex-col justify-between items-center px-6 py-8 relative ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 via-slate-950 to-primary/20 text-white'
          : 'bg-gradient-to-b from-slate-50 via-white to-primary/10 text-slate-900'
      }`}
    >
      {/* Ambient background glows */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none ${
          isDark ? 'bg-primary/20' : 'bg-primary/10'
        }`}
      />
      <div
        className={`absolute bottom-16 -right-16 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-500/10'
        }`}
      />

      {/* CENTER BRAND HERO & PILL TAGS */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 z-10">
        {/* Momentum Glowing Squircle Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className={`absolute -inset-4 rounded-full blur-2xl pointer-events-none ${
              isDark
                ? 'bg-gradient-to-tr from-amber-500/20 via-primary/25 to-teal-400/20'
                : 'bg-gradient-to-tr from-amber-400/20 via-primary/20 to-teal-400/20'
            }`}
          />
          <img
            src="/logo.png"
            alt="Momentum Logo"
            className={`relative w-24 h-24 object-cover rounded-3xl aspect-square flex-shrink-0 shadow-xl ${
              isDark
                ? 'shadow-black/60 ring-4 ring-slate-900'
                : 'shadow-primary/20 ring-4 ring-white'
            }`}
          />
        </motion.div>

        {/* Brand Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="space-y-2"
        >
          <h1
            className={`text-2xl font-bold tracking-[0.28em] uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={
              !isDark
                ? {
                    textShadow:
                      '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)',
                  }
                : undefined
            }
          >
            Momentum
          </h1>
          <p
            className={`text-xs font-normal max-w-xs mx-auto leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-700'
            }`}
            style={
              !isDark
                ? {
                    textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)',
                  }
                : undefined
            }
          >
            {t('splash.spiritualTools', 'Spiritual tools, mindful finance & daily routines')}
          </p>
        </motion.div>

        {/* Minimal Aesthetic Goal Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="flex items-center justify-center gap-2 pt-1"
        >
          <span
            className={`px-3.5 py-1 rounded-full text-[11px] font-semibold shadow-2xs ${
              isDark
                ? 'bg-slate-900 border border-slate-800 text-slate-300'
                : 'bg-white border border-slate-200/80 text-slate-800'
            }`}
          >
            {t('splash.focus', 'Focus')}
          </span>
          <span className={isDark ? 'text-slate-700 text-xs' : 'text-slate-400 text-xs'}>•</span>
          <span
            className={`px-3.5 py-1 rounded-full text-[11px] font-semibold shadow-2xs ${
              isDark
                ? 'bg-slate-900 border border-slate-800 text-slate-300'
                : 'bg-white border border-slate-200/80 text-slate-800'
            }`}
          >
            {t('splash.clarity', 'Clarity')}
          </span>
          <span className={isDark ? 'text-slate-700 text-xs' : 'text-slate-400 text-xs'}>•</span>
          <span
            className={`px-3.5 py-1 rounded-full text-[11px] font-semibold shadow-2xs ${
              isDark
                ? 'bg-slate-900 border border-slate-800 text-slate-300'
                : 'bg-white border border-slate-200/80 text-slate-800'
            }`}
          >
            {t('splash.growth', 'Growth')}
          </span>
        </motion.div>
      </div>

      {/* STANDARDIZED PROGRESS CARD & UPDATED VERSION FOOTER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        className="w-full max-w-xs space-y-4 pb-2 z-10"
      >
        {/* Progress Card (Rounded-3xl with Soft Shadow) */}
        <div
          className={`p-4 rounded-3xl space-y-2.5 backdrop-blur-xl shadow-xl ${
            isDark
              ? 'bg-black/40 border border-white/10'
              : 'bg-white/80 border border-white/60 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              <span
                className={`text-xs font-semibold ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {t('splash.aligning', 'Aligning your day')}
              </span>
            </div>
            <span className="text-xs font-bold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-400 to-cyan-400">
              {progress}%
            </span>
          </div>

          {/* Gradient Progress Bar */}
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden relative ${
              isDark ? 'bg-slate-800/90' : 'bg-slate-100'
            }`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(45,212,191,0.5)] transition-[width] duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Updated Version & Tagline Footer */}
        <div className="text-center flex flex-col items-center gap-1.5">
          <p className="text-[11px] font-medium text-slate-500">
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              v1.0
            </span>{' '}
            • App By Milad Wardak
          </p>

          {/* Standalone Replay Pill (only shown when in standalone/dev view without onComplete) */}
          {!onComplete && progress === 100 && (
            <button
              onClick={startAnimation}
              className={`mt-1 text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full tracking-wider transition-colors ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {t('splash.replay', 'Replay')}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
