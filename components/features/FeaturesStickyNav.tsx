'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { id: 'encryption', label: 'Encryption' },
  { id: 'disappearing', label: 'Messages' },
  { id: 'groups', label: 'Group Chats' },
  { id: 'calls', label: 'Calls' },
  { id: 'files', label: 'File Sharing' },
  { id: 'multidevice', label: 'Multi-Device' },
] as const;

type NavId = (typeof navItems)[number]['id'];

export function FeaturesStickyNav() {
  const [activeId, setActiveId] = useState<NavId>('encryption');

  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        // Trigger when section crosses 40% from top
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollTo = (id: NavId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      className="sticky top-[120px] hidden w-48 shrink-0 self-start lg:block"
      aria-label="Feature sections"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">
        Jump to
      </p>
      <div className="flex flex-col gap-0.5">
        {navItems.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-all duration-200',
                isActive ? 'bg-[rgba(233,30,99,0.06)]' : 'hover:bg-[#F5F7F9]',
              )}
              aria-current={isActive ? 'location' : undefined}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full transition-colors duration-200"
                style={{ background: isActive ? '#E91E63' : '#E4E8EC' }}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-sm transition-all duration-200',
                  isActive ? 'font-semibold text-[#E91E63]' : 'font-medium text-[#9E9E9E]',
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
