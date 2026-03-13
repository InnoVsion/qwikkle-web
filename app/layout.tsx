import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import { Providers } from '@/lib/providers';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Qwikkle',
    default: 'Qwikkle — The most private way to chat.',
  },
  description: 'End-to-end encrypted. Zero data collection. Always free.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
