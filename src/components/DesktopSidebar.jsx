import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  CheckSquare,
  CreditCard,
  FileText,
  Clock,
  Sparkles,
  Calendar,
  LayoutGrid,
  Sun,
  Moon,
  Compass,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  PanelTopClose,
  PanelTopOpen,
  PanelBottomClose,
  PanelBottomOpen,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Move,
  Zap,
  Flame,
  Check,
  Bell,
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import QuickActionsSheet from './QuickActionsSheet';
import { useProfileStore } from '../store/useProfileStore';
import { useTheme } from '../context/ThemeContext';
import { useThemeStore } from '../store/useThemeStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useTranslation } from 'react-i18next';
import { useAppMotion } from '../motion/useAppMotion';
import { resolveActionContext, executeCreationAction } from '../utils/actionContextResolver';

/**
 * Premium Reference-Accurate Four-Position Floating Desktop Sidebar for Momentum.
 * Directly supports all four viewport positions:
 * - 'left': Vertical floating sidebar (Left edge)
 * - 'right': Vertical floating sidebar (Right edge)
 * - 'top': Horizontal floating dock (Top edge)
 * - 'bottom': Horizontal floating dock (Bottom edge)
 *
 * Fully supports all 8 combinations (4 positions x 2 sizes: Expanded & Collapsed).
 * Features:
 * - In-sidebar position selector popover (Left, Right, Top, Bottom) with directional icons
 * - Fluid Framer Motion animated width/height transitions with spring physics
 * - Coordinated layout reflow without horizontal overflow or content occlusion
 * - Dual discoverable Toggle buttons and keyboard shortcuts ('[' / 'Ctrl+B')
 * - True glassmorphic frosted surface with authentic backdrop filter & wallpaper bleed
 * - Accessible tooltips, ARIA attributes, and Reduced Motion support
 * - Zero untranslated text with complete English, Pashto, and Afghan Dari localization
 */
export default function DesktopSidebar({
  activeTab,
  setActiveTab,
  isDarkMode = true,
  onOpenQuickActions,
  onOpenScreenNavigator,
  devLayoutMode = 'responsive',
  onToggleDevLayoutMode,
  onOpenWallpaperSelector,
}) {
  const profile = useProfileStore();
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { shouldReduceMotion } = useAppMotion();

  // Persistent sidebar state from central navigation store
  const isCollapsed = useNavigationStore((s) => s.isSidebarCollapsed);
  const toggleSidebarCollapsed = useNavigationStore((s) => s.toggleSidebarCollapsed);
  const rawSidebarPos = useNavigationStore((s) => s.sidebarPosition);
  const setSidebarPosition = useNavigationStore((s) => s.setSidebarPosition);
  const sidebarPosition = rawSidebarPos || 'left';
  const isHorizontal = sidebarPosition === 'top' || sidebarPosition === 'bottom';
  const notifications = useNotificationStore((s) => s.notifications) || [];
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // In-Sidebar Position Selector Menu State
  const [isPositionMenuOpen, setIsPositionMenuOpen] = useState(false);
  const positionMenuRef = useRef(null);

  // Close position popover on click outside or Escape
  useEffect(() => {
    if (!isPositionMenuOpen) return;
    const handleClickOutside = (e) => {
      if (positionMenuRef.current && !positionMenuRef.current.contains(e.target)) {
        setIsPositionMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPositionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPositionMenuOpen]);

  // Global keyboard shortcut: '[' or 'Ctrl+B' to toggle sidebar size
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebarCollapsed();
      } else if (e.key === '[' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleSidebarCollapsed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebarCollapsed]);

  const tasksSubTab = useNavigationStore((s) => s.tasksSubTab);
  const financeSubTab = useNavigationStore((s) => s.financeSubTab);
  const routeParams = useNavigationStore((s) => s.routeParams);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  // Capitalized User Name
  const rawName = (profile.fullName || '').trim();
  const displayName = !rawName || rawName.toLowerCase() === 'milad wardak'
    ? 'Milad Wardak'
    : rawName;
  const firstName = displayName.split(' ')[0] || displayName;

  // Context-aware action button
  const actionContext = useMemo(() => {
    return resolveActionContext(activeTab, { tasksSubTab, financeSubTab, routeParams });
  }, [activeTab, tasksSubTab, financeSubTab, routeParams]);

  const handleThemeToggle = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    toggleTheme();
    useThemeStore.getState().setTheme(nextTheme);
    if (activeTab.includes('_dark_mode')) {
      setActiveTab(activeTab.replace('_dark_mode', '_light_mode'));
    } else if (activeTab.includes('_light_mode')) {
      setActiveTab(activeTab.replace('_light_mode', '_dark_mode'));
    }
  };

  const handleSelectQuickAction = (actionId) => {
    setIsQuickActionsOpen(false);
    executeCreationAction(actionId, { setActiveTab, isDark: isDarkMode });
  };

  // Determine current active section for highlight
  const normalizedSection = useMemo(() => {
    const tLower = (activeTab || '').toLowerCase();
    if (tLower.includes('home') || (tLower.includes('dashboard') && !tLower.includes('finance'))) return 'home';
    if (tLower.includes('task')) return 'tasks';
    if (tLower.includes('routine')) return 'routine';
    if (tLower.includes('finance') || tLower.includes('expense') || tLower.includes('income')) return 'finance';
    if (tLower.includes('note')) return 'notes';
    if (tLower.includes('prayer') || tLower.includes('adhan')) return 'prayer';
    if (tLower.includes('tasbeeh') || tLower.includes('tasbeh') || tLower.includes('dhikr')) return 'tasbeeh';
    if (tLower.includes('calendar') || tLower.includes('city') || tLower.includes('timezone')) return 'calendars';
    if (tLower.includes('more') || tLower.includes('setting') || tLower.includes('profile') || tLower.includes('appearance') || tLower.includes('lock') || tLower.includes('backup') || tLower.includes('about')) return 'more';
    return 'home';
  }, [activeTab]);

  // Primary navigation items (Favourites)
  const navItems = [
    {
      id: 'home',
      label: t('nav.home', 'Home'),
      icon: Home,
      targetDark: 'home_dashboard_dark_mode',
      targetLight: 'home_dashboard_light_mode',
    },
    {
      id: 'tasks',
      label: t('nav.tasks', 'Tasks'),
      icon: CheckSquare,
      targetDark: 'tasks_reminders_dark_mode',
      targetLight: 'tasks_reminders_light_mode',
    },
    {
      id: 'finance',
      label: t('nav.finance', 'Finance'),
      icon: CreditCard,
      targetDark: 'finance_dashboard_dark_mode',
      targetLight: 'finance_dashboard_light_mode',
    },
    {
      id: 'notes',
      label: t('nav.notes', 'Notes'),
      icon: FileText,
      targetDark: 'notes_main_dark_mode',
      targetLight: 'notes_main_light_mode',
    },
    {
      id: 'prayer',
      label: t('nav.prayer', 'Prayer'),
      icon: Clock,
      targetDark: 'prayer_times_dark_mode',
      targetLight: 'prayer_times_light_mode',
    },
    {
      id: 'tasbeeh',
      label: t('nav.tasbeeh', 'Tasbeeh'),
      icon: Sparkles,
      targetDark: 'tasbeeh_main_dark_mode',
      targetLight: 'tasbeeh_main_light_mode',
    },
    {
      id: 'calendars',
      label: t('nav.calendar', 'Calendars'),
      icon: Calendar,
      targetDark: 'calendars_main_dark_mode',
      targetLight: 'calendars_main_light_mode',
    },
    {
      id: 'more',
      label: t('nav.settings', 'More'),
      icon: LayoutGrid,
      targetDark: 'more_dark_mode',
      targetLight: 'more_light_mode',
    },
  ];

  // Secondary utility items (Quick Access)
  const quickAccessItems = [
    {
      id: 'routine',
      label: t('sidebar.routine', 'Daily Routine'),
      icon: Flame,
      action: () => setActiveTab(isDarkMode ? 'daily_routine_dark_mode' : 'daily_routine_light_mode'),
      activeCheck: normalizedSection === 'routine',
    },
    {
      id: 'notifications',
      label: t('nav.notifications', 'Notifications'),
      icon: Bell,
      badge: unreadNotificationCount,
      action: () => setActiveTab(isDarkMode ? 'notifications_settings_dark_mode' : 'notifications_settings_light_mode'),
      activeCheck: (activeTab || '').includes('notification'),
    },
    {
      id: 'quick_actions',
      label: t('home.quickActions', 'Quick Actions'),
      icon: Zap,
      action: () => {
        setIsQuickActionsOpen(true);
        if (onOpenQuickActions) onOpenQuickActions();
      },
      activeCheck: false,
    },
    ...(onOpenWallpaperSelector ? [{
      id: 'wallpapers',
      label: t('nav.wallpaperSelector', 'Wallpapers'),
      icon: Palette,
      action: onOpenWallpaperSelector,
      activeCheck: false,
    }] : []),
  ];

  // Position selector options definition
  const positionOptions = [
    { id: 'left', label: t('sidebar.posLeft', 'Left'), icon: PanelLeft },
    { id: 'top', label: t('sidebar.posTop', 'Top'), icon: PanelTop },
    { id: 'right', label: t('sidebar.posRight', 'Right'), icon: PanelRight },
    { id: 'bottom', label: t('sidebar.posBottom', 'Bottom'), icon: PanelBottom },
  ];

  // True Glassmorphism Inline Styles matching Reference Image A & Part 2 Specs
  const sidebarGlassStyle = {
    background: isDarkMode ? 'rgba(16, 22, 44, 0.66)' : 'rgba(245, 248, 252, 0.62)',
    backdropFilter: isDarkMode ? 'blur(18px) saturate(140%)' : 'blur(18px) saturate(145%)',
    WebkitBackdropFilter: isDarkMode ? 'blur(18px) saturate(140%)' : 'blur(18px) saturate(145%)',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: isDarkMode ? '0 20px 50px rgba(0, 0, 0, 0.45)' : '0 20px 50px rgba(0, 0, 0, 0.06)',
  };

  const dividerStyle = isDarkMode ? 'bg-white/10' : 'bg-slate-200/70';
  const sectionHeaderStyle = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const activeRowStyle = isDarkMode
    ? 'bg-white/10 text-white font-semibold border border-white/15 shadow-sm backdrop-blur-sm'
    : 'bg-white/85 text-slate-900 font-bold border border-white/80 shadow-md shadow-black/5';

  const inactiveRowStyle = isDarkMode
    ? 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
    : 'text-slate-600 hover:text-slate-900 hover:bg-black/5 border border-transparent';

  const activeCollapsedStyle = isDarkMode
    ? 'bg-primary/25 text-white border border-primary/30 shadow-sm'
    : 'bg-white/90 text-primary font-bold border border-white/80 shadow-md shadow-black/5';

  const inactiveCollapsedStyle = isDarkMode
    ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
    : 'text-slate-500 hover:text-slate-900 hover:bg-black/5 border border-transparent';

  // Responsive spring motion settings
  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', damping: 26, stiffness: 280, mass: 0.8 };

  // Calculate position-specific container classes
  const containerClasses = useMemo(() => {
    if (isHorizontal) {
      const margin = sidebarPosition === 'top' ? 'mx-4 mt-3 mb-1' : 'mx-4 mb-3 mt-1';
      return `hidden lg:flex flex-row items-center justify-between shrink-0 select-none z-30 font-sans relative ${margin} rounded-[24px] overflow-visible transition-[background-color,border-color,box-shadow] duration-300 ${
        isDarkMode ? 'text-slate-100' : 'text-slate-800'
      }`;
    }
    const margin = sidebarPosition === 'right' ? 'my-4 mr-4 ml-0' : 'my-4 ml-4 mr-0';
    return `hidden lg:flex flex-col justify-between shrink-0 select-none z-30 font-sans relative ${margin} rounded-[28px] overflow-visible transition-[background-color,border-color,box-shadow] duration-300 ${
      isDarkMode ? 'text-slate-100' : 'text-slate-800'
    }`;
  }, [isHorizontal, sidebarPosition, isDarkMode]);

  // Popover placement class based on current orientation & position
  const popoverPlacementClass = useMemo(() => {
    switch (sidebarPosition) {
      case 'right':
        return 'right-full mr-3 bottom-0';
      case 'top':
        return 'top-full mt-3 right-0';
      case 'bottom':
        return 'bottom-full mb-3 right-0';
      case 'left':
      default:
        return 'left-full ml-3 bottom-0';
    }
  }, [sidebarPosition]);

  return (
    <>
      <motion.aside
        aria-label={t('nav.desktopSidebarAria', 'Desktop Navigation')}
        data-sidebar-position={sidebarPosition}
        data-sidebar-collapsed={isCollapsed ? 'true' : 'false'}
        layout
        initial={false}
        animate={
          isHorizontal
            ? { height: isCollapsed ? 54 : 72, width: 'calc(100% - 2rem)' }
            : { width: isCollapsed ? 80 : 260, height: 'calc(100vh - 2rem)' }
        }
        transition={springTransition}
        style={sidebarGlassStyle}
        className={containerClasses}
      >
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* CASE 1: HORIZONTAL FLOATING DOCK (TOP OR BOTTOM POSITION)              */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {isHorizontal ? (
          <div className="w-full h-full flex items-center justify-between px-3 md:px-5 gap-2 md:gap-4 select-none">
            {/* ── START SECTION: PROFILE AVATAR ── */}
            <div
              onClick={() => setActiveTab(isDarkMode ? 'settings_profile_dark_mode' : 'settings_profile_light_mode')}
              className="flex items-center gap-2.5 cursor-pointer group py-1 px-1.5 rounded-2xl hover:bg-white/5 transition-colors shrink-0"
              title={t('settings.profile', 'Profile')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveTab(isDarkMode ? 'settings_profile_dark_mode' : 'settings_profile_light_mode');
                }
              }}
            >
              <div className="relative">
                <UserAvatar
                  size={isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}
                  textSize={isCollapsed ? 'text-xs' : 'text-sm'}
                  setActiveTab={setActiveTab}
                  className={`ring-2 ${isDarkMode ? 'ring-white/10' : 'ring-black/5'} shadow-sm`}
                />
                <span
                  className={`absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ${
                    isDarkMode ? 'ring-slate-900' : 'ring-white'
                  } w-2.5 h-2.5`}
                  aria-hidden="true"
                />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col text-left rtl:text-right hidden sm:flex">
                  <span className={`text-xs font-bold leading-tight truncate max-w-[120px] ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {displayName}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                    {t('common.personalVault', 'Personal Vault')}
                  </span>
                </div>
              )}
            </div>

            {/* Hairline vertical divider */}
            <div className={`h-7 w-px shrink-0 ${dividerStyle}`} aria-hidden="true" />

            {/* ── CENTER SECTION: NAVIGATION PILLS ── */}
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => {
                const isActive = normalizedSection === item.id;
                const targetScreen = isDarkMode ? item.targetDark : item.targetLight;
                const Icon = item.icon;

                if (isCollapsed) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-testid={`nav-item-${item.id}`}
                      onClick={() => setActiveTab(targetScreen)}
                      title={item.label}
                      aria-label={item.label}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                        isActive ? activeCollapsedStyle : inactiveCollapsedStyle
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`nav-item-${item.id}`}
                    onClick={() => setActiveTab(targetScreen)}
                    className={`px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs tracking-tight transition-all cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                      isActive ? activeRowStyle : inactiveRowStyle
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Hairline vertical divider */}
            <div className={`h-7 w-px shrink-0 ${dividerStyle}`} aria-hidden="true" />

            {/* ── END SECTION: UTILITIES CLUSTER (QUICK ACTIONS, POSITION, THEME, TOGGLE) ── */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 relative" ref={positionMenuRef}>
              {/* Quick Actions Trigger */}
              <button
                type="button"
                data-testid="quick-access-quick_actions"
                onClick={() => {
                  setIsQuickActionsOpen(true);
                  if (onOpenQuickActions) onOpenQuickActions();
                }}
                title={t('home.quickActions', 'Quick Actions')}
                aria-label={t('home.quickActions', 'Quick Actions')}
                className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                  isDarkMode ? 'hover:bg-white/10 text-amber-400' : 'hover:bg-black/5 text-amber-600'
                }`}
              >
                <Zap className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="hidden xl:inline text-xs">{t('home.quickActions', 'Quick Actions')}</span>}
              </button>

              {/* In-Dock Position Control Button */}
              <button
                type="button"
                data-testid="sidebar-position-btn"
                onClick={() => setIsPositionMenuOpen((prev) => !prev)}
                title={`${t('sidebar.position', 'Sidebar Position')}: ${t(`sidebar.pos${sidebarPosition.charAt(0).toUpperCase() + sidebarPosition.slice(1)}`, sidebarPosition)}`}
                aria-label={t('sidebar.position', 'Sidebar Position')}
                aria-expanded={isPositionMenuOpen}
                className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                  isPositionMenuOpen
                    ? (isDarkMode ? 'bg-primary/20 text-white' : 'bg-primary/10 text-primary')
                    : (isDarkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-black/5 text-slate-600')
                }`}
              >
                <Move className="w-4 h-4 shrink-0" />
                {!isCollapsed && (
                  <span className="hidden xl:inline text-[11px] capitalize">
                    {t(`sidebar.pos${sidebarPosition.charAt(0).toUpperCase() + sidebarPosition.slice(1)}`, sidebarPosition)}
                  </span>
                )}
              </button>

              {/* Dock Notifications Bell Button */}
              <button
                type="button"
                data-testid="dock-notifications-btn"
                onClick={() => setActiveTab(isDarkMode ? 'notifications_settings_dark_mode' : 'notifications_settings_light_mode')}
                title={`${t('nav.notifications', 'Notifications')}${unreadNotificationCount > 0 ? ` (${unreadNotificationCount})` : ''}`}
                aria-label={t('nav.notifications', 'Notifications')}
                className={`relative p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-white/10'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-black/5'
                }`}
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center ring-1 ring-slate-900">
                    {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                data-testid="sidebar-theme-toggle"
                onClick={handleThemeToggle}
                title={t('settings.switchToMode', { mode: isDarkMode ? t('settings.light') : t('settings.dark') })}
                aria-label={t('settings.appearance', 'Appearance')}
                className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                  isDarkMode
                    ? 'hover:bg-white/10 text-amber-400'
                    : 'hover:bg-black/5 text-slate-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Dock Expand / Collapse Toggle Button */}
              <button
                type="button"
                data-testid="sidebar-toggle-btn"
                onClick={toggleSidebarCollapsed}
                title={`${isCollapsed ? t('sidebar.expand', 'Expand Sidebar') : t('sidebar.collapse', 'Collapse Sidebar')} (Ctrl+B or [)`}
                aria-label={isCollapsed ? t('sidebar.expand', 'Expand Sidebar') : t('sidebar.collapse', 'Collapse Sidebar')}
                className={`p-1.5 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-black/5'
                }`}
              >
                {sidebarPosition === 'top' ? (
                  isCollapsed ? <PanelTopOpen className="w-4 h-4" /> : <PanelTopClose className="w-4 h-4" />
                ) : (
                  isCollapsed ? <PanelBottomOpen className="w-4 h-4" /> : <PanelBottomClose className="w-4 h-4" />
                )}
              </button>

              {/* Position Selector Popover Menu for Horizontal Dock */}
              <AnimatePresence>
                {isPositionMenuOpen && (
                  <motion.div
                    data-testid="sidebar-position-menu"
                    initial={{ opacity: 0, scale: 0.95, y: sidebarPosition === 'top' ? 8 : -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute z-50 p-2 rounded-2xl shadow-2xl border min-w-[210px] font-sans ${
                      isDarkMode
                        ? 'bg-slate-900/95 backdrop-blur-2xl border-white/15 text-white shadow-black/70'
                        : 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-xl'
                    } ${sidebarPosition === 'top' ? 'top-full mt-3 right-0' : 'bottom-full mb-3 right-0'}`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 mb-1 text-slate-400">
                      {t('sidebar.position', 'Sidebar Position')}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {positionOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = sidebarPosition === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            data-testid={`sidebar-position-option-${opt.id}`}
                            onClick={() => {
                              setSidebarPosition(opt.id);
                              setIsPositionMenuOpen(false);
                            }}
                            className={`p-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? (isDarkMode ? 'bg-primary/25 text-white border border-primary/40' : 'bg-primary/10 text-primary border border-primary/30')
                                : (isDarkMode ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-black/5 hover:text-slate-900')
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-primary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════════════════ */
          /* CASE 2: VERTICAL FLOATING SIDEBAR (LEFT OR RIGHT POSITION)             */
          /* ══════════════════════════════════════════════════════════════════════ */
          <>
            {/* ── TOP SECTION: TOP TOGGLE & PROFILE HEADER ── */}
            <div className="shrink-0 flex flex-col items-center">
              {/* Top Quick Action Buttons: Notifications Bell & Toggle Button */}
              <div
                className={`w-full flex items-center pt-3 pb-1 transition-all ${
                  isCollapsed ? 'flex-col gap-1.5 items-center' : 'px-3.5 justify-between'
                }`}
              >
                <button
                  type="button"
                  data-testid="sidebar-notifications-btn"
                  onClick={() => setActiveTab(isDarkMode ? 'notifications_settings_dark_mode' : 'notifications_settings_light_mode')}
                  title={`${t('nav.notifications', 'Notifications')}${unreadNotificationCount > 0 ? ` (${unreadNotificationCount})` : ''}`}
                  aria-label={t('nav.notifications', 'Notifications')}
                  className={`relative p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/10'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-black/5'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center ring-1 ring-slate-900">
                      {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  data-testid="sidebar-toggle-btn-top"
                  onClick={toggleSidebarCollapsed}
                  title={`${isCollapsed ? t('sidebar.expand', 'Expand Sidebar') : t('sidebar.collapse', 'Collapse Sidebar')} (Ctrl+B or [)`}
                  aria-label={isCollapsed ? t('sidebar.expand', 'Expand Sidebar') : t('sidebar.collapse', 'Collapse Sidebar')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/10'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-black/5'
                  }`}
                >
                  {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                </button>
              </div>

              {/* Profile Header Block (Centered) */}
              <div
                onClick={() => setActiveTab(isDarkMode ? 'settings_profile_dark_mode' : 'settings_profile_light_mode')}
                className={`flex flex-col items-center text-center cursor-pointer group transition-all ${
                  isCollapsed ? 'px-2 pt-1 pb-2' : 'px-4 pt-1 pb-3 w-full'
                }`}
                title={t('settings.profile', 'Profile')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab(isDarkMode ? 'settings_profile_dark_mode' : 'settings_profile_light_mode');
                  }
                }}
              >
                <div className="relative">
                  <UserAvatar
                    size={isCollapsed ? 'w-11 h-11' : 'w-16 h-16'}
                    textSize={isCollapsed ? 'text-sm' : 'text-xl'}
                    setActiveTab={setActiveTab}
                    className={`ring-2 ${isDarkMode ? 'ring-white/10' : 'ring-black/5'} shadow-md`}
                  />
                  <span
                    className={`absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ${
                      isDarkMode ? 'ring-slate-900' : 'ring-white'
                    } ${isCollapsed ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}`}
                    aria-hidden="true"
                  />
                </div>

                {!isCollapsed ? (
                  <div className="mt-2.5 w-full flex flex-col items-center">
                    <h2
                      className={`text-sm font-bold truncate max-w-[210px] leading-tight transition-colors ${
                        isDarkMode ? 'text-white group-hover:text-primary' : 'text-slate-800 group-hover:text-primary'
                      }`}
                    >
                      {displayName}
                    </h2>
                    <p
                      className={`text-[11px] truncate max-w-[210px] mt-0.5 leading-tight ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {t('common.personalVault', 'Personal Vault')}
                    </p>
                  </div>
                ) : (
                  <span className="text-[10px] font-semibold truncate max-w-[64px] text-center mt-1 text-slate-300">
                    {firstName}
                  </span>
                )}
              </div>

              {/* Hairline Divider */}
              <div
                className={`h-px transition-all ${dividerStyle} ${
                  isCollapsed ? 'w-8 my-2' : 'w-[calc(100%-2rem)] my-2.5'
                }`}
                aria-hidden="true"
              />
            </div>

            {/* ── MIDDLE SECTION: NAVIGATION & UTILITY LINKS ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-4">
              {/* Section 1: Favourites / Main Navigation */}
              <div className="space-y-1">
                {!isCollapsed && (
                  <div className={`text-[11px] font-medium px-4 mb-1.5 uppercase tracking-wider ${sectionHeaderStyle}`}>
                    {t('sidebar.favourites', 'Favourites')}
                  </div>
                )}

                <nav className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                  {navItems.map((item) => {
                    const isActive = normalizedSection === item.id;
                    const targetScreen = isDarkMode ? item.targetDark : item.targetLight;
                    const Icon = item.icon;

                    if (isCollapsed) {
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-testid={`nav-item-${item.id}`}
                          onClick={() => setActiveTab(targetScreen)}
                          title={item.label}
                          aria-label={item.label}
                          className={`relative w-11 h-11 mx-auto rounded-xl flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                            isActive ? activeCollapsedStyle : inactiveCollapsedStyle
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive && isDarkMode ? 'text-primary' : ''}`} />
                        </button>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`nav-item-${item.id}`}
                        onClick={() => setActiveTab(targetScreen)}
                        className={`relative w-full px-3.5 py-2 rounded-xl flex items-center gap-3 text-xs tracking-tight transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                          isActive ? activeRowStyle : inactiveRowStyle
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive && isDarkMode ? 'text-primary' : ''}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Hairline Divider */}
              <div
                className={`h-px transition-all ${dividerStyle} ${
                  isCollapsed ? 'w-8 mx-auto my-2' : 'w-[calc(100%-2rem)] mx-auto my-2.5'
                }`}
                aria-hidden="true"
              />

              {/* Section 2: Quick Access / Secondary Utilities */}
              <div className="space-y-1">
                {!isCollapsed && (
                  <div className={`text-[11px] font-medium px-4 mb-1.5 uppercase tracking-wider ${sectionHeaderStyle}`}>
                    {t('sidebar.quickAccess', 'Quick Access')}
                  </div>
                )}

                <div className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                  {quickAccessItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.activeCheck;

                    if (isCollapsed) {
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-testid={`quick-access-${item.id}`}
                          onClick={item.action}
                          title={item.label}
                          aria-label={item.label}
                          className={`relative w-11 h-11 mx-auto rounded-xl flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                            isActive ? activeCollapsedStyle : inactiveCollapsedStyle
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {item.badge > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-1 ring-slate-900" />
                          )}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`quick-access-${item.id}`}
                        onClick={item.action}
                        className={`relative w-full px-3.5 py-2 rounded-xl flex items-center gap-3 text-xs tracking-tight transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                          isActive ? activeRowStyle : inactiveRowStyle
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {item.badge > 0 && (
                          <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                            {item.badge > 9 ? '9+' : item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── BOTTOM SECTION: POSITION CONTROL, THEME, COLLAPSE & CONTROLS ── */}
            <div className="shrink-0 relative" ref={positionMenuRef}>
              {/* Hairline Divider */}
              <div
                className={`h-px transition-all ${dividerStyle} ${
                  isCollapsed ? 'w-8 mx-auto my-1.5' : 'w-[calc(100%-2rem)] mx-auto my-2'
                }`}
                aria-hidden="true"
              />

              <div className={`pb-3 pt-1 space-y-1.5 ${isCollapsed ? 'px-2 flex flex-col items-center' : 'px-3'}`}>
                {/* 1. In-Sidebar Position Control Button */}
                {!isCollapsed ? (
                  <button
                    type="button"
                    data-testid="sidebar-position-btn"
                    onClick={() => setIsPositionMenuOpen((prev) => !prev)}
                    aria-expanded={isPositionMenuOpen}
                    className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs tracking-tight transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                      isPositionMenuOpen
                        ? (isDarkMode ? 'bg-primary/20 text-white border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20')
                        : inactiveRowStyle
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Move className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{t('sidebar.position', 'Sidebar Position')}</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-black/15 text-slate-400">
                      {t(`sidebar.pos${sidebarPosition.charAt(0).toUpperCase() + sidebarPosition.slice(1)}`, sidebarPosition)}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    data-testid="sidebar-position-btn"
                    onClick={() => setIsPositionMenuOpen((prev) => !prev)}
                    title={`${t('sidebar.position', 'Sidebar Position')}: ${t(`sidebar.pos${sidebarPosition.charAt(0).toUpperCase() + sidebarPosition.slice(1)}`, sidebarPosition)}`}
                    aria-label={t('sidebar.position', 'Sidebar Position')}
                    aria-expanded={isPositionMenuOpen}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                      isPositionMenuOpen ? activeCollapsedStyle : inactiveCollapsedStyle
                    }`}
                  >
                    <Move className="w-4 h-4" />
                  </button>
                )}

                {/* 2. Theme Toggle Button */}
                {!isCollapsed ? (
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className={`text-[11px] font-medium ${sectionHeaderStyle}`}>
                      {t('settings.appearance', 'Appearance')}
                    </span>
                    <button
                      type="button"
                      data-testid="sidebar-theme-toggle"
                      onClick={handleThemeToggle}
                      title={t('settings.switchToMode', { mode: isDarkMode ? t('settings.light') : t('settings.dark') })}
                      className={`py-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold border focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                        isDarkMode
                          ? 'bg-white/5 hover:bg-white/10 text-amber-400 border-white/10'
                          : 'bg-black/5 hover:bg-black/10 text-slate-700 border-black/5'
                      }`}
                    >
                      {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{isDarkMode ? t('settings.light') : t('settings.dark')}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    data-testid="sidebar-theme-toggle"
                    onClick={handleThemeToggle}
                    title={t('settings.switchToMode', { mode: isDarkMode ? t('settings.light') : t('settings.dark') })}
                    aria-label={t('settings.appearance', 'Appearance')}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${inactiveCollapsedStyle}`}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                  </button>
                )}

                {/* 3. Expand / Collapse Sidebar Toggle */}
                {!isCollapsed ? (
                  <button
                    type="button"
                    data-testid="sidebar-toggle-btn"
                    onClick={toggleSidebarCollapsed}
                    className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs tracking-tight transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${inactiveRowStyle}`}
                    aria-label={t('sidebar.collapse', 'Collapse Sidebar')}
                  >
                    <div className="flex items-center gap-2.5">
                      <PanelLeftClose className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 font-medium">{t('sidebar.collapse', 'Collapse')}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono opacity-60">
                      [ ]
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    data-testid="sidebar-toggle-btn"
                    onClick={toggleSidebarCollapsed}
                    title={`${t('sidebar.expand', 'Expand Sidebar')} (Ctrl+B or [)`}
                    aria-label={t('sidebar.expand', 'Expand Sidebar')}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${inactiveCollapsedStyle}`}
                  >
                    <PanelLeftOpen className="w-4 h-4 text-slate-400" />
                  </button>
                )}

                {/* Development Controls (Strictly isolated to import.meta.env.DEV) */}
                {Boolean(import.meta.env.DEV) && onOpenScreenNavigator && (
                  <div className="pt-1">
                    {!isCollapsed ? (
                      <button
                        type="button"
                        data-testid="sidebar-dev-navigator"
                        onClick={onOpenScreenNavigator}
                        className={`w-full px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] font-semibold transition-colors cursor-pointer border focus-visible:ring-2 focus-visible:ring-primary focus:outline-none ${
                          isDarkMode
                            ? 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20'
                            : 'bg-primary/5 hover:bg-primary/10 text-primary border-primary/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5" />
                          <span>{t('nav.devScreenNavigator', 'Screen Navigator')}</span>
                        </div>
                        <kbd className="text-[9px] font-mono opacity-70 px-1 py-0.5 rounded bg-black/20">
                          Ctrl+Alt+D
                        </kbd>
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-testid="sidebar-dev-navigator"
                        onClick={onOpenScreenNavigator}
                        title={t('nav.devScreenNavigator', 'Screen Navigator')}
                        aria-label={t('nav.devScreenNavigator', 'Screen Navigator')}
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-primary transition-all cursor-pointer border border-primary/20 bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
                      >
                        <Compass className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Position Selector Popover Menu for Vertical Sidebar */}
              <AnimatePresence>
                {isPositionMenuOpen && (
                  <motion.div
                    data-testid="sidebar-position-menu"
                    initial={{ opacity: 0, scale: 0.95, x: sidebarPosition === 'left' ? 10 : -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute z-50 p-2.5 rounded-2xl shadow-2xl border min-w-[210px] font-sans ${
                      isDarkMode
                        ? 'bg-slate-900/95 backdrop-blur-2xl border-white/15 text-white shadow-black/70'
                        : 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-xl'
                    } ${popoverPlacementClass}`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 mb-1.5 text-slate-400">
                      {t('sidebar.position', 'Sidebar Position')}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {positionOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = sidebarPosition === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            data-testid={`sidebar-position-option-${opt.id}`}
                            onClick={() => {
                              setSidebarPosition(opt.id);
                              setIsPositionMenuOpen(false);
                            }}
                            className={`p-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? (isDarkMode ? 'bg-primary/25 text-white border border-primary/40' : 'bg-primary/10 text-primary border border-primary/30')
                                : (isDarkMode ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-black/5 hover:text-slate-900')
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-primary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.aside>

      {/* Global Quick Actions Modal for Desktop Sidebar */}
      <QuickActionsSheet
        isOpen={isQuickActionsOpen}
        onClose={() => setIsQuickActionsOpen(false)}
        onSelectAction={handleSelectQuickAction}
        isDark={isDarkMode}
      />
    </>
  );
}
