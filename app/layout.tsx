import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Switcher from '@/components/Switch';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code Playground',
  description: 'All in one play ground',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-white dark:!bg-primary-dark`}>
        <Switcher />
        {children}
      </body>
    </html>
  );
}
