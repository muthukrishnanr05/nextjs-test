import React from 'react';
import clsx from 'clsx';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextInput({ id, label, error, hint, className, type = 'text', ...props }: TextInputProps) {
  const inputId = id ?? React.useId();
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className={clsx('space-y-1.5', className)}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={inputId}
        type={type}
        aria-invalid={!!error || undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={clsx(
          'block w-full rounded-[var(--radius)] border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
        {...props}
      />
      {hint ? <p id={hintId} className="text-xs text-gray-500">{hint}</p> : null}
      {error ? <p id={errorId} className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

