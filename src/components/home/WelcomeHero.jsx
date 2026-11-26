import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { useProfileStore } from '../../store/useProfileStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAppTime } from '../../hooks/useAppTime';
import { useAppMotion } from '../../motion/useAppMotion';
import { normalizeIanaTimezone } from '../../utils/timeService';
import { useTranslation } from 'react-i18next';
import { useLocaleStore } from '../../store/useLocaleStore';
import { formatHomeDate } from '../../i18n/displayDate.js';

/**
 * Premium Glass Welcome Hero Component
 * 
 * Replaces the plain text greeting area with an elegant, responsive,
 * glassmorphic welcome card featuring:
 * - Time-aware dynamic greeting with user profile name
 * - Subtle vertical gold/orange gradient accent
 * - Motivational subtitle
 * - Translucent date chip synchronized with central Time Service
 * - Glass halo circular avatar with layered decorative arcs & ambient glow
 * - Dark & Light mode theme-aware glassmorphic styling
 * - Full reduced-motion and responsive breakpoint compliance
 */
export default function WelcomeHero({
  isDark: propIsDark,
  setActiveTab,
  className = '',
}) {
  const storeTheme = useThemeStore((s) => s.theme);
  const isDark = typeof propIsDark === 'boolean' ? propIsDark : storeTheme === 'dark';

  const profile = useProfileStore();
  const avatar = profile?.avatar;
  const fullName = profile?.fullName;

  const { t } = useTranslation();
  const currentLocale = useLocaleStore((s) => s.currentLocale);

  const { greeting, now, effectiveTimezone, formattedDate } = useAppTime();
  const { shouldReduceMotion } = useAppMotion();

  // Extract first name safely
  const userFirstName = useMemo(() => {
    return fullName && fullName.trim() ? fullName.trim().split(' ')[0] : '';
  }, [fullName]);

  // Extract first initial for fallback badge
  const initial = useMemo(() => {
    return fullName && fullName.trim() ? fullName.trim().charAt(0).toUpperCase() : '';
  }, [fullName]);

  // Compute localized greeting
  const localizedGreeting = useMemo(() => {
    if (currentLocale === 'en') return greeting;
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) return t('home.morning');
    if (hour >= 12 && hour < 17) return t('home.afternoon');
    if (hour >= 17 && hour < 21) return t('home.evening');
    return t('home.night');
  }, [currentLocale, greeting, now, t]);

  const numberSystem = useLocaleStore(s => s.numberSystem);
  const chipFormattedDate = useMemo(() =>
    formatHomeDate(now,currentLocale,numberSystem,normalizeIanaTimezone(effectiveTimezone)).toUpperCase(),
    [now,currentLocale,numberSystem,effectiveTimezone]);

  // Handle profile navigation
  const handleProfileNavigation = (e) => {
    e.stopPropagation();
    const targetScreen = isDark ? 'edit_profile_dark_mode' : 'edit_profile_light_mode';
    if (setActiveTab) {
      setActiveTab(targetScreen);
    } else {
      useNavigationStore.getState().navigateTo(targetScreen);
    }
  };

  return (
    <motion.section
      aria-label="Welcome Hero"
      data-testid="welcome-hero-card"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-5 lg:mx-0 mb-5 lg:mb-6 rounded-3xl p-5 sm:p-6 lg:p-8 xl:p-9 overflow-hidden select-none pointer-events-auto transition-colors duration-200 ${
        isDark
          ? 'bg-slate-900/45 border border-white/15 shadow-2xl shadow-black/30'
          : 'bg-white/75 border border-white/70 shadow-xl shadow-slate-900/5'
      } backdrop-blur-xl ${className}`}
      style={{
        boxShadow: isDark
          ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 20px 35px -10px rgba(0, 0, 0, 0.45)'
          : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 20px 30px -10px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* ── Ambient Background Glow Highlights ── */}
      <div
        className={`absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none blur-3xl transition-opacity duration-300 ${
          isDark ? 'bg-amber-500/10' : 'bg-amber-400/15'
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute -bottom-14 -right-14 w-56 h-56 rounded-full pointer-events-none blur-3xl transition-opacity duration-300 ${
          isDark ? 'bg-orange-500/12' : 'bg-orange-400/10'
        }`}
        aria-hidden="true"
      />

      {/* ── Tasteful Layered Translucent Decorative Arcs (Scalable SVG) ── */}
      <svg
        className="absolute right-0 top-0 bottom-0 h-full w-2/3 pointer-events-none overflow-hidden opacity-35 sm:opacity-45"
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="welcome-hero-gold-arc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#F59E0B' : '#D97706'} stopOpacity="0.45" />
            <stop offset="60%" stopColor={isDark ? '#FBBF24' : '#F59E0B'} stopOpacity="0.2" />
            <stop offset="100%" stopColor={isDark ? '#FFFFFF' : '#D97706'} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="welcome-hero-cool-arc" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#38BDF8' : '#0284C7'} stopOpacity="0.25" />
            <stop offset="100%" stopColor={isDark ? '#FFFFFF' : '#38BDF8'} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Dynamic decorative curved path 1 */}
        <path
          d="M 60 0 C 120 70, 180 130, 320 160"
          fill="none"
          stroke="url(#welcome-hero-gold-arc)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Dynamic decorative curved path 2 */}
        <path
          d="M 120 0 C 160 80, 220 140, 320 180"
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.08)'}
          strokeWidth="1.5"
        />

        {/* Dynamic decorative curved path 3 */}
        <path
          d="M 0 140 C 100 120, 220 90, 320 60"
          fill="none"
          stroke="url(#welcome-hero-cool-arc)"
          strokeWidth="1"
        />

        {/* Concentric orbital rings on right side */}
        <circle
          cx="255"
          cy="90"
          r="65"
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.05)'}
          strokeWidth="1"
        />
        <circle
          cx="255"
          cy="90"
          r="100"
          fill="none"
          stroke={isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(217, 119, 6, 0.08)'}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>

      {/* ── Main Flex Container (Left Content & Right Avatar) ── */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Left Column: Greeting, Motivational Subtitle & Date Chip */}
        <div className="min-w-0 flex-1 pr-2">
          {/* Greeting Line with Orange/Gold Gradient Accent */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className="w-1 sm:w-1.5 h-6 sm:h-7 md:h-8 lg:h-9 rounded-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 flex-shrink-0 shadow-sm shadow-amber-500/40"
              aria-hidden="true"
              data-testid="welcome-hero-accent-bar"
            />
            <h1
              data-testid="welcome-hero-greeting"
              className={`text-lg sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold tracking-tight truncate leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{
                textShadow: isDark
                  ? '0 1px 3px rgba(0, 0, 0, 0.6)'
                  : '0 1px 2px rgba(255, 255, 255, 0.9), 0 0 6px rgba(255, 255, 255, 0.8)',
              }}
            >
              {localizedGreeting}
              {userFirstName ? `, ${userFirstName}` : ''}{' '}
              <span className="inline-block hover:scale-110 transition-transform origin-bottom-right" aria-hidden="true">
                👋
              </span>
            </h1>
          </div>

          {/* Motivational Subtitle */}
          <p
            data-testid="welcome-hero-subtitle"
            className={`text-xs sm:text-sm lg:text-base font-normal mt-1 sm:mt-1.5 leading-relaxed truncate ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
            style={{
              textShadow: isDark
                ? '0 1px 2px rgba(0, 0, 0, 0.4)'
                : '0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
          >
            {t('home.stayConsistent')}
          </p>

          {/* Rounded Translucent Date Chip */}
          <div
            data-testid="welcome-hero-date-chip"
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full mt-2.5 sm:mt-3.5 text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm transition-all duration-200 ${
              isDark
                ? 'bg-white/10 text-slate-200 border border-white/15'
                : 'bg-slate-900/5 text-slate-800 border border-slate-900/10'
            }`}
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.7)',
            }}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{chipFormattedDate}</span>
          </div>
        </div>

        {/* Right Column: Circular Profile Avatar with Glass Halo & Decorative Rings */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          {/* Subtle Outer Halo Ring */}
          <div
            className={`absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full pointer-events-none border transition-all duration-300 ${
              isDark ? 'border-amber-400/20 bg-amber-500/5' : 'border-amber-500/20 bg-amber-400/10'
            }`}
            aria-hidden="true"
          />

          {/* Interactive Circular Avatar Glass Button */}
          <motion.button
            type="button"
            data-testid="welcome-hero-avatar-btn"
            onClick={handleProfileNavigation}
            aria-label="Edit Profile"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className={`relative z-10 p-1 sm:p-1.5 rounded-full cursor-pointer pointer-events-auto backdrop-blur-md shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
              isDark
                ? 'bg-slate-800/50 border border-white/20 hover:border-amber-400/40 hover:shadow-amber-500/10'
                : 'bg-white/70 border border-white/90 hover:border-amber-500/40 hover:shadow-amber-500/15'
            }`}
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), 0 8px 16px rgba(0, 0, 0, 0.35)'
                : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 8px 16px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden shadow-inner flex items-center justify-center aspect-square flex-shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt={fullName || 'User Profile'}
                  className="w-full h-full object-cover rounded-full aspect-square transition-transform duration-300 group-hover:scale-105"
                />
              ) : initial ? (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl shadow-inner">
                  {initial}
                </div>
              ) : (
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
