'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface FeatureShowcaseProps {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  description: string;
  bulletPoints?: string[];
  visual: React.ReactNode;
  layout?: 'text-left' | 'text-right';
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00E676"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function FeatureShowcase({
  id,
  tag,
  headline,
  subheadline,
  description,
  bulletPoints,
  visual,
  layout = 'text-left',
}: FeatureShowcaseProps) {
  const textFirst = layout === 'text-left';

  return (
    <section
      id={id}
      className="py-20 md:py-28"
      style={{ scrollMarginTop: '120px' }}
      aria-labelledby={`${id}-heading`}
    >
      <div
        className={cn(
          'flex flex-col gap-12 md:flex-row md:items-center md:gap-16',
          !textFirst && 'md:flex-row-reverse',
        )}
      >
        {/* Text side */}
        <motion.div
          className="flex flex-1 flex-col gap-5"
          initial={{ opacity: 0, x: textFirst ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(233, 30, 99, 0.08)',
              color: '#E91E63',
              border: '1px solid rgba(233, 30, 99, 0.15)',
            }}
          >
            {tag}
          </span>

          <div>
            <h2
              id={`${id}-heading`}
              className="font-display text-3xl font-bold tracking-tight text-[#263238] md:text-4xl"
            >
              {headline}
            </h2>
            <p className="mt-2 text-base font-medium text-[#9E9E9E]">{subheadline}</p>
          </div>

          <p className="text-base leading-relaxed text-[#9E9E9E]">{description}</p>

          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="flex flex-col gap-2.5">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm font-medium text-[#263238]">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Visual side */}
        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, x: textFirst ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}
