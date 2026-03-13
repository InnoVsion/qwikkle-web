'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

const tocItems = [
  { id: 'collect', label: 'What We Collect' },
  { id: 'use', label: 'How We Use It' },
  { id: 'dont-do', label: "What We Don't Do" },
  { id: 'storage', label: 'Data Storage' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'changes', label: 'Policy Changes' },
  { id: 'contact', label: 'Contact Us' },
] as const;

type TocId = (typeof tocItems)[number]['id'];

export function PrivacyTOC(): React.ReactElement {
  const [activeId, setActiveId] = useState<TocId>('collect');

  useEffect(() => {
    const observers = tocItems.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollTo = (id: TocId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile dropdown */}
      <div className="mb-8 md:hidden">
        <label htmlFor="privacy-toc-select" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">
          Jump to section
        </label>
        <select
          id="privacy-toc-select"
          value={activeId}
          onChange={(e) => scrollTo(e.target.value as TocId)}
          className="w-full rounded-lg border border-[#E4E8EC] bg-white px-3 py-2 text-sm font-medium text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/30"
        >
          {tocItems.map(({ id, label }, i) => (
            <option key={id} value={id}>
              {i + 1}. {label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop sticky nav */}
      <nav
        className="sticky top-[100px] hidden w-60 shrink-0 self-start md:block"
        aria-label="Privacy policy sections"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">
          Contents
        </p>
        <ol className="flex flex-col gap-0.5">
          {tocItems.map(({ id, label }, i) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-all duration-200',
                    isActive ? 'bg-[rgba(233,30,99,0.06)]' : 'hover:bg-[#F5F7F9]',
                  )}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-200"
                    style={{
                      background: isActive ? '#E91E63' : '#E4E8EC',
                      color: isActive ? '#fff' : '#9E9E9E',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      'text-sm transition-all duration-200',
                      isActive ? 'font-semibold text-[#E91E63]' : 'font-medium text-[#9E9E9E]',
                    )}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
