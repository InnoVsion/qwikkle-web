import type { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = { title: 'Sign In — Qwikkle Admin' };

export default function LoginPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen">
      {/* ── Left panel: brand / decorative ─────────────────────────── */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-1/2"
        style={{ background: '#E91E63' }}
        aria-hidden="true"
      >
        {/* Decorative circles */}
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full"
          style={{ background: 'rgba(136, 14, 79, 0.35)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full"
          style={{ background: 'rgba(136, 14, 79, 0.25)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        />
        <div
          className="absolute bottom-32 right-12 h-24 w-24 rounded-full"
          style={{ background: 'rgba(255, 255, 255, 0.06)' }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <Image
            src="/qwikkle-logo.jpeg"
            alt="Qwikkle"
            width={40}
            height={40}
            className="rounded-xl"
            priority
          />
          <span className="font-display text-xl font-bold text-white">Qwikkle Admin</span>
        </div>

        {/* Tagline */}
        <div className="relative max-w-xs">
          <p className="text-3xl font-bold leading-snug text-white">
            The back-office for Qwikkle administrators.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Manage users, organisations, and content — all in one place.
          </p>
        </div>

        {/* Bottom badge */}
        <div className="relative">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white/80"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#00E676' }}
            />
            Admin access only
          </span>
        </div>
      </div>

      {/* ── Right panel: sign-in form ────────────────────────────────── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-8"
        style={{ background: '#F5F7F9' }}
      >
        {/* Mobile-only logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <Image
            src="/qwikkle-logo.jpeg"
            alt="Qwikkle"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="font-display text-lg font-bold text-[#263238]">Qwikkle Admin</span>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
