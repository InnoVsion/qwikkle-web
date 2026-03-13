import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AppStoreBadge } from '@/components/shared/AppStoreBadge';

const trustPoints = [
  'Free forever',
  'No data collection',
  'Open source',
] as const;

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
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

export function DownloadSection() {
  return (
    <section
      className="w-full px-4 py-20 md:px-8 md:py-28"
      style={{
        background: `
          radial-gradient(ellipse 80% 100% at 50% 50%, rgba(233, 30, 99, 0.08) 0%, transparent 70%),
          #FFFFFF
        `,
        borderTop: '1px solid #E4E8EC',
        borderBottom: '1px solid #E4E8EC',
      }}
      data-testid="download-section"
    >
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedSection>
          {/* Tag */}
          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(233, 30, 99, 0.08)',
              color: '#E91E63',
              border: '1px solid rgba(233, 30, 99, 0.15)',
            }}
          >
            Download now — it&apos;s free
          </span>

          {/* Headline */}
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-[#263238] md:text-5xl">
            Ready to chat privately?
          </h2>

          {/* Subtext */}
          <p className="mb-10 text-lg leading-relaxed text-[#9E9E9E]">
            Download free.{' '}
            <span className="font-semibold text-[#263238]">No ads. No data collection.</span>
          </p>

          {/* Store badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreBadge store="apple" size="lg" />
            <AppStoreBadge store="google" size="lg" />
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-1.5">
                <CheckIcon />
                <span className="text-sm font-medium text-[#263238]">{point}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
