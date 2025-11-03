"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { PasswordInput } from '@/components/PasswordInput';
import { SocialButton } from '@/components/SocialButton';

export default function SigninPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
    };
    try {
      setLoading(true);
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Sign in failed');
      router.push('/welcome');
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
            Welcome back! Sign in to continue where you left off.
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
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Sign in to your account</h1>
            <p className="text-sm text-gray-600">Welcome back. We missed you.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SocialButton provider="google" label="Continue with Google" />
            <SocialButton provider="github" label="Continue with GitHub" />
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
            <div className="h-px w-full bg-gray-200" />
            <span>or continue with email</span>
            <div className="h-px w-full bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <TextInput label="Email address" name="email" type="email" autoComplete="email" placeholder="jane@example.com" />
            <PasswordInput label="Password" name="password" autoComplete="current-password" placeholder="Enter your password" />

            <div className="flex items-center justify-between pt-2">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700">Forgot password?</Link>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-brand-600 hover:text-brand-700">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}


