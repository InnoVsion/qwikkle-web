'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/lib/store/useUIStore';
import { useAuthStore } from '@/lib/store/useAuthStore';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'Users',
  '/admin/organizations': 'Organizations',
  '/admin/documents': 'Document Review',
  '/admin/settings': 'Settings',
  '/admin/content': 'Content',
  '/admin/media': 'Media',
};

function resolvePageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  // Match prefix — e.g. /admin/users/123 → "Users"
  const match = Object.entries(PAGE_TITLES)
    .filter(([key]) => key !== '/admin')
    .find(([key]) => pathname.startsWith(key));
  return match ? match[1] : 'Admin';
}

export function AdminHeader(): React.ReactElement {
  const pathname = usePathname();
  const { toggleMobileMenu } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const pageTitle = resolvePageTitle(pathname);
  const displayName = user?.name ?? 'Admin User';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#E4E8EC] bg-white px-4 md:px-6">
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="rounded-lg p-2 text-[#9E9E9E] transition-colors hover:bg-[#F5F7F9] hover:text-[#263238] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-base font-semibold text-[#263238]">{pageTitle}</h1>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-2">
        {/* Notification bell — placeholder */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-[#9E9E9E] transition-colors hover:bg-[#F5F7F9] hover:text-[#263238]"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* Avatar dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsAvatarMenuOpen((v) => !v)}
            className={cn(
              'flex items-center gap-2 rounded-xl p-1.5 pr-2 transition-colors',
              isAvatarMenuOpen ? 'bg-[#F5F7F9]' : 'hover:bg-[#F5F7F9]',
            )}
            aria-label="Admin account menu"
            aria-expanded={isAvatarMenuOpen}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: '#E91E63' }}
              aria-hidden="true"
            >
              {initials}
            </span>
            <span className="hidden text-sm font-medium text-[#263238] md:block">
              {displayName}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                'text-[#9E9E9E] transition-transform duration-200',
                isAvatarMenuOpen && 'rotate-180',
              )}
            />
          </button>

          <AnimatePresence>
            {isAvatarMenuOpen && (
              <>
                {/* Click-outside dismisser */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsAvatarMenuOpen(false)}
                  aria-hidden="true"
                />

                <motion.div
                  key="avatar-menu"
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-20 mt-1 min-w-[180px] overflow-hidden rounded-xl border border-[#E4E8EC] bg-white"
                  style={{ boxShadow: '0 8px 32px rgba(38, 50, 56, 0.10)' }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#263238] transition-colors hover:bg-[#F5F7F9]"
                    onClick={() => setIsAvatarMenuOpen(false)}
                  >
                    <User size={14} className="text-[#9E9E9E]" />
                    Profile
                  </button>
                  <div className="border-t border-[#E4E8EC]" />
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#263238] transition-colors hover:bg-[#F5F7F9]"
                    onClick={() => setIsAvatarMenuOpen(false)}
                  >
                    <LogOut size={14} className="text-[#9E9E9E]" />
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
