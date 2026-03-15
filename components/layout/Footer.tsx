import Link from 'next/link';
import Image from 'next/image';
import { AppStoreBadge } from '@/components/shared/AppStoreBadge';

// Footer uses <a> tags instead of Next.js <Link> so placeholder routes (pages
// not yet built) don't cause typedRoutes type errors. Swap to <Link> once pages exist.
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm text-[#263238] transition-colors hover:text-[#E91E63]">
      {children}
    </a>
  );
}

const productLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '#download' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

function TwitterXIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(233, 30, 99, 0.10)' }} className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {/* Top section — logo + tagline + store badges */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/qwikkle-logo.jpeg"
                alt="Qwikkle"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="font-display text-lg font-bold tracking-tight text-[#263238]">
                Qwikkle
              </span>
            </Link>
            <p className="max-w-[240px] text-sm text-[#9E9E9E]">
              The most private way to chat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AppStoreBadge store="apple" size="sm" />
            <AppStoreBadge store="google" size="sm" />
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#E4E8EC] pt-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">
              Product
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">
              Company
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-[#E4E8EC] pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* suppressHydrationWarning: Date.getFullYear() is the same server/client but React flags it */}
          <p className="text-sm text-[#9E9E9E]" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Qwikkle. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Qwikkle on X (Twitter)"
              className="text-[#9E9E9E] transition-colors hover:text-[#E91E63]"
            >
              <TwitterXIcon />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Qwikkle on LinkedIn"
              className="text-[#9E9E9E] transition-colors hover:text-[#E91E63]"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Qwikkle on GitHub"
              className="text-[#9E9E9E] transition-colors hover:text-[#E91E63]"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
