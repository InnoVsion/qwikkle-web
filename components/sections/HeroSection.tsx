'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GradientText } from '@/components/shared/GradientText';
import { AppStoreBadge } from '@/components/shared/AppStoreBadge';
import { PhoneMockup } from '@/components/shared/PhoneMockup';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

function AvatarGroup() {
  const avatars = [
    { initial: 'S', color: '#E91E63' },
    { initial: 'M', color: '#880E4F' },
    { initial: 'P', color: '#00C853' },
  ];
  return (
    <div className="flex items-center -space-x-2" aria-hidden="true">
      {avatars.map(({ initial, color }, i) => (
        <div
          key={initial}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
          style={{ background: color, zIndex: avatars.length - i }}
        >
          {initial}
        </div>
      ))}
    </div>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5" fill="#E91E63" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 10% 20%, rgba(233, 30, 99, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 90% 80%, rgba(0, 230, 118, 0.06) 0%, transparent 50%),
          #F5F7F9
        `,
      }}
      data-testid="hero-section"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 pt-28 pb-20 md:flex-row md:items-center md:gap-12 md:px-8 md:pt-24 lg:gap-20">
        {/* Left — text + CTAs */}
        <motion.div
          className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInVariant}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{
                background: 'rgba(233, 30, 99, 0.06)',
                border: '1px solid rgba(233, 30, 99, 0.20)',
                color: '#E91E63',
              }}
            >
              🔒 Open Source · E2E Encrypted
            </span>
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col gap-0.5">
            <motion.h1
              className="font-display text-5xl font-extrabold leading-tight tracking-tight text-[#263238] md:text-6xl lg:text-7xl"
              variants={fadeUpVariant}
            >
              The most private
            </motion.h1>
            <motion.p
              className="font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl"
              variants={fadeUpVariant}
            >
              way to <GradientText>chat.</GradientText>
            </motion.p>
          </div>

          {/* Subheadline */}
          <motion.p
            className="max-w-md text-lg leading-relaxed text-[#9E9E9E] md:text-xl"
            variants={fadeInVariant}
          >
            End-to-end encrypted. Zero data collection. Always free.
          </motion.p>

          {/* Store badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:justify-start"
            variants={fadeInVariant}
          >
            <AppStoreBadge store="apple" size="md" />
            <AppStoreBadge store="google" size="md" />
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
            variants={fadeInVariant}
          >
            <AvatarGroup />
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-semibold text-[#263238]">Joined by 10M+ users</span>
              <div className="flex items-center gap-1.5">
                <StarRating />
                <span className="text-xs text-[#9E9E9E]">4.9 on both stores</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — phone mockup */}
        <motion.div
          className="mt-12 flex flex-1 justify-center md:mt-0 md:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhoneMockup />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={24} className="text-[#9E9E9E]" />
      </motion.div>
    </section>
  );
}
