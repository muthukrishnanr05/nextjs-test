import React from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function WelcomePage() {

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Welcome!</h1>
        <p className="mt-3 text-gray-600">You have successfully signed in.</p>
        <LogoutButton />
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Welcome - NewCursorApp',
  description: 'Welcome page',
};


