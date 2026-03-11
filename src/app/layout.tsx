import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from '@/components/providers/SessionProvider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rising Roof Group - Admin Portal',
  description: 'Manage properties and blogs for Rising Roof Group',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased text-slate-900 bg-slate-50")}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
