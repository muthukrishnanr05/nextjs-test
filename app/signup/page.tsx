"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { PasswordInput } from '@/components/PasswordInput';
import { SocialButton } from '@/components/SocialButton';

export default function SignupPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
    };
    try {
      setLoading(true);
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Signup failed');
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1640&auto=format&fit=crop"
          alt="Decorative"
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/60 via-brand-700/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold">NewCursor</span>
          </div>
          <p className="mt-4 max-w-md text-white/80">
            Create your account to access personalized dashboards, collaborative tools, and more.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold">NewCursor</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="text-sm text-gray-600">Start your 14‑day free trial. No credit card required.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SocialButton provider="google" label="Sign up with Google" />
            <SocialButton provider="github" label="Sign up with GitHub" />
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
            <div className="h-px w-full bg-gray-200" />
            <span>or continue with email</span>
            <div className="h-px w-full bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <TextInput label="Full name" name="name" autoComplete="name" placeholder="Jane Doe" />
            <TextInput label="Email address" name="email" type="email" autoComplete="email" placeholder="jane@example.com" />
            <PasswordInput label="Password" name="password" autoComplete="new-password" placeholder="Create a strong password" />

            <div className="flex items-start gap-3 pt-2">
              <input id="terms" name="terms" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the <Link href="/terms" className="text-brand-600 hover:text-brand-700 font-medium">Terms</Link> and <Link href="/privacy" className="text-brand-600 hover:text-brand-700 font-medium">Privacy Policy</Link>.
              </label>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {success ? <p className="text-sm text-green-600">Account created successfully.</p> : null}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Creating...' : 'Create account'}
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-brand-600 hover:text-brand-700">Sign in</Link>
          </p>

          <p className="mt-8 text-[11px] leading-5 text-gray-500">
            By signing up, you agree to receive product updates and marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </main>
  );
}

