'use client';

import Link from 'next/link';
import type { Route } from 'next';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideProps } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/lib/store/useUIStore';
import { useAuthStore } from '@/lib/store/useAuthStore';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: 'OVERVIEW',
    items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Organizations', href: '/admin/organizations', icon: Building2 },
      { label: 'Documents', href: '/admin/documents', icon: FileText },
    ],
  },
];

const bottomNavItems: NavItem[] = [
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function isNavItemActive(href: string, pathname: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  return pathname.startsWith(href);
}

interface SidebarNavItemProps {
  item: NavItem;
  pathname: string;
  onClick?: () => void;
}

function SidebarNavItem({ item, pathname, onClick }: SidebarNavItemProps): React.ReactElement {
  const active = isNavItemActive(item.href, pathname);
  const Icon = item.icon;

  return (
    <Link
      href={item.href as Route<string>}
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150',
        active
          ? 'font-semibold text-[#E91E63]'
          : 'text-[#9E9E9E] hover:bg-[#F5F7F9] hover:text-[#263238]',
      )}
      style={
        active
          ? { background: 'rgba(233, 30, 99, 0.06)' }
          : undefined
      }
      aria-current={active ? 'page' : undefined}
    >
      {/* Active indicator bar */}
      {active && (
        <span
          className="absolute inset-y-0 left-0 w-0.5 rounded-r"
          style={{ background: '#E91E63' }}
          aria-hidden="true"
        />
      )}
      <Icon
        size={16}
        className={cn('shrink-0', active ? 'text-[#E91E63]' : 'text-[#B0BEC5] group-hover:text-[#9E9E9E]')}
      />
      {item.label}
    </Link>
  );
}

function SidebarContent({
  pathname,
  onNavClick,
}: {
  pathname: string;
  onNavClick?: () => void;
}): React.ReactElement {
  const user = useAuthStore((s) => s.user);

  // Initials for avatar — placeholder until auth is wired
  const displayName = user?.name ?? 'Admin User';
  const displayIdentity = user?.qkId ?? 'admin.QK';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-full flex-col">
      {/* Brand header */}
      <div className="flex h-16 items-center gap-3 border-b border-[#E4E8EC] px-4">
        <Image
          src="/qwikkle-logo.jpeg"
          alt="Qwikkle"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="font-display text-base font-bold text-[#263238]">Qwikkle Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#B0BEC5]">
              {section.label}
            </p>
            <ul role="list" className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem item={item} pathname={pathname} onClick={onNavClick} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-2 border-t border-[#E4E8EC] pt-4">
          <ul role="list" className="space-y-0.5">
            {bottomNavItems.map((item) => (
              <li key={item.href}>
                <SidebarNavItem item={item} pathname={pathname} onClick={onNavClick} />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Admin user pill */}
      <div className="border-t border-[#E4E8EC] p-4">
        <div className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#F5F7F9]">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: '#E91E63' }}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#263238]">{displayName}</p>
            <p className="truncate text-xs text-[#9E9E9E]">{displayIdentity}</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg p-1.5 text-[#9E9E9E] transition-colors hover:bg-[#E4E8EC] hover:text-[#263238]"
            aria-label="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar(): React.ReactElement {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#E4E8EC] bg-white lg:flex"
        style={{ position: 'sticky', top: 0 }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-[#E4E8EC] bg-white lg:hidden"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closeMobileMenu}
                className="absolute right-3 top-3 z-10 rounded-lg p-2 text-[#9E9E9E] transition-colors hover:bg-[#F5F7F9] hover:text-[#263238]"
                aria-label="Close navigation menu"
              >
                <X size={16} />
              </button>
              <SidebarContent pathname={pathname} onNavClick={closeMobileMenu} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
