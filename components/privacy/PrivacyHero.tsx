import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function PrivacyHero() {
  return (
    <section
      className="w-full px-4 pb-12 pt-32 md:px-8 md:pb-16"
      style={{
        background: `
          radial-gradient(ellipse 60% 80% at 50% 0%, rgba(233, 30, 99, 0.06) 0%, transparent 60%),
          #F5F7F9
        `,
        borderBottom: '1px solid #E4E8EC',
      }}
    >
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(233, 30, 99, 0.08)',
              color: '#E91E63',
              border: '1px solid rgba(233, 30, 99, 0.15)',
            }}
          >
            Last updated: March 13, 2026
          </span>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-[#263238] md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-base font-semibold text-[#E91E63]">
            We don&apos;t read your messages. We can&apos;t.
          </p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#9E9E9E]">
            We built Qwikkle with privacy as the foundation, not an afterthought. Here&apos;s
            exactly what we do — and don&apos;t do — with your data.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
