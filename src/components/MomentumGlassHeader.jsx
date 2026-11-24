import React from 'react';

/**
 * MomentumGlassHeader
 * Exact floating capsule frosted glass title bar container.
 * 
 * Characteristics:
 * - Floating capsule geometry with symmetrical side margins (px-3 sm:px-4)
 * - Top margin (pt-2 sm:pt-2.5) for floating depth
 * - Full smooth capsule curvature (rounded-full)
 * - Colorless transparent frosted glass (blur: 36px, no milky haze)
 * - Subtle glass-edge highlight & ambient soft shadow
 * - Full Light Mode & Dark Mode support
 * - Preserves all screen-specific contents, titles, back buttons, and actions
 */
export default function MomentumGlassHeader({
  children,
  className = '',
  capsuleClassName = '',
  isDarkMode = false,
  as: Component = 'header',
  containerAs: ContainerComponent = 'div',
  ...rest
}) {
  return (
    <ContainerComponent 
      className={`sticky top-0 z-[60] pt-2 sm:pt-2.5 px-3 sm:px-4 pb-1 w-full pointer-events-none flex justify-center ${className}`.trim()}
    >
      <Component
        {...rest}
        className={`momentum-glass-header-capsule ${isDarkMode ? 'dark-glass' : 'light-glass'} pointer-events-auto flex items-center justify-between w-full max-w-5xl ${capsuleClassName}`.trim()}
      >
        {children}
      </Component>
    </ContainerComponent>
  );
}
