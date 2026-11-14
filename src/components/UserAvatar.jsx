import React from 'react';
import { User } from 'lucide-react';
import { useProfileStore } from '../store/useProfileStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { useThemeStore } from '../store/useThemeStore';

/**
 * Universal UserAvatar Component
 * - Subscribes directly to persistent useProfileStore
 * - Displays live saved user avatar image
 * - If no avatar exists, dynamically displays the uppercase first initial of fullName (or User icon fallback)
 * - Interactive navigation: Tapping the avatar routes immediately to "Edit Profile"
 */
export default function UserAvatar({
  onClick,
  setActiveTab,
  className = '',
  size = 'w-9 h-9',
  textSize = 'text-xs',
  ariaLabel = 'Edit Profile',
}) {
  const profile = useProfileStore();
  const avatar = profile?.avatar;
  const fullName = profile?.fullName;
  const initial = fullName && fullName.trim() ? fullName.trim().charAt(0).toUpperCase() : '';

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
      return;
    }
    const theme = useThemeStore.getState().theme;
    const isDark = theme === 'dark';
    const targetScreen = isDark ? 'edit_profile_dark_mode' : 'edit_profile_light_mode';
    if (setActiveTab) {
      setActiveTab(targetScreen);
    } else {
      useNavigationStore.getState().navigateTo(targetScreen);
    }
  };

  if (avatar) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={`${size} rounded-full overflow-hidden shadow-sm flex items-center justify-center border border-white/20 flex-shrink-0 aspect-square cursor-pointer pointer-events-auto transition-transform active:scale-95 hover:scale-105 select-none ${className}`}
      >
        <img src={avatar} alt="User Avatar" className="w-full h-full object-cover rounded-full aspect-square" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`${size} rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold ${textSize} flex items-center justify-center shadow-sm flex-shrink-0 aspect-square cursor-pointer pointer-events-auto overflow-hidden transition-transform active:scale-95 hover:scale-105 select-none ${className}`}
    >
      {initial || <User className="w-4 h-4 text-white/90" />}
    </button>
  );
}

export { UserAvatar, UserAvatar as HeaderAvatar };

