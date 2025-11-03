"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    router.push('/signin');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 px-6 py-2 rounded-[var(--radius)] bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition"
      type="button"
    >
      Logout
    </button>
  );
}


