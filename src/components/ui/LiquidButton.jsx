import React from 'react';

export default function LiquidButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 select-none transition-transform duration-150 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden border-0 outline-none focus:outline-none';
  
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = `h-11 px-5 rounded-2xl w-full bg-primary text-on-primary font-headline-sm text-headline-sm shadow-md shadow-primary/20 hover:opacity-95`;
      break;
    case 'secondary':
      variantClasses = `h-11 px-5 rounded-2xl w-full bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm shadow-sm hover:opacity-95`;
      break;
    case 'subtle':
      variantClasses = `h-10 px-4 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md`;
      break;
    case 'pill':
      variantClasses = `h-8 px-3 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant`;
      break;
    case 'icon':
      variantClasses = `h-11 w-11 rounded-full bg-transparent text-on-surface hover:bg-surface-container`;
      break;
    case 'destructive':
      variantClasses = `h-11 px-5 rounded-2xl w-full bg-error text-on-error font-headline-sm text-headline-sm shadow-md hover:opacity-95`;
      break;
    default:
      variantClasses = `h-11 px-5 rounded-2xl bg-surface-container text-on-surface`;
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>
    </button>
  );
}
