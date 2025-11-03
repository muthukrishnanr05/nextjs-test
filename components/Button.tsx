import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  leftIcon?: React.ReactNode;
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors rounded-[var(--radius)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-60 disabled:cursor-not-allowed';
  const sizes = {
    md: 'h-11 px-4 text-sm gap-2',
    lg: 'h-12 px-5 text-base gap-2',
  } as const;
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-soft',
    secondary: 'bg-gray-900 hover:bg-black text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
  } as const;
  return (
    <button className={clsx(base, sizes[size], variants[variant], className)} {...props}>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      {children}
    </button>
  );
}

