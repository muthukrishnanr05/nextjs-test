import React from 'react';
import { TextInput } from './TextInput';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function PasswordInput({ label, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="relative">
      <TextInput
        type={visible ? 'text' : 'password'}
        label={label}
        {...props}
      />
      <button
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-[42px] -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setVisible(v => !v)}
      >
        {visible ? (
          // eye-off icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.56-1.26 1.36-2.43 2.35-3.46"/><path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-3.42"/><path d="M16.24 7.76A10.94 10.94 0 0 1 23 12a10.94 10.94 0 0 1-2.06 3.33"/><path d="M1 1l22 22"/></svg>
        ) : (
          // eye icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        )}
      </button>
    </div>
  );
}

