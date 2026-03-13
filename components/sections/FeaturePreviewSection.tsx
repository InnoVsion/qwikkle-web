'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Zap, Smartphone, type LucideIcon } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Military-grade Encryption',
    description:
      'Your messages are locked with keys that only exist on your device. Not even we can read them.',
    iconColor: '#E91E63',
    iconBg: 'rgba(233, 30, 99, 0.08)',
  },
  {
    icon: Zap,
    title: 'Instant Delivery',
    description:
      'Sub-100ms message delivery. Send messages and they arrive before you blink.',
    iconColor: '#00C853',
    iconBg: 'rgba(0, 230, 118, 0.08)',
  },
  {
    icon: Smartphone,
    title: 'Works on Every Device',
    description: 'iOS, Android, Web — one account, all your devices, always in sync.',
    iconColor: '#E91E63',
    iconBg: 'rgba(233, 30, 99, 0.08)',
  },
];

export function FeaturePreviewSection() {
  return (
    <section
      className="w-full bg-[#F5F7F9] px-4 py-20 md:px-8 md:py-28"
      data-testid="features-preview-section"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection className="mb-14 text-center">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(233, 30, 99, 0.08)',
              color: '#E91E63',
              border: '1px solid rgba(233, 30, 99, 0.15)',
            }}
          >
            Why Qwikkle
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#263238] md:text-5xl">
            Why millions choose us
          </h2>
        </AnimatedSection>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <motion.div
                  className="flex h-full flex-col gap-5 rounded-2xl bg-white p-8"
                  style={{
                    border: '1px solid #E4E8EC',
                    boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)',
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 12px 40px rgba(233, 30, 99, 0.10)',
                    borderColor: 'rgba(233, 30, 99, 0.25)',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: feature.iconBg }}
                  >
                    <Icon size={28} aria-hidden={true} style={{ color: feature.iconColor }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-bold text-[#263238]">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#9E9E9E]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA link */}
        <AnimatedSection className="mt-10 text-center" delay={0.3}>
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E91E63] transition-colors hover:text-[#880E4F]"
          >
            Explore all features
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
