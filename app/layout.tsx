export const metadata = {
  title: 'Signup - NewCursorApp',
  description: 'Create your account',
};

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-white text-gray-900 font-inter antialiased">
        {children}
      </body>
    </html>
  );
}

