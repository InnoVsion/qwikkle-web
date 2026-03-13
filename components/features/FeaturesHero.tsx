import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function FeaturesHero() {
  return (
    <section
      className="w-full px-4 pb-16 pt-32 text-center md:px-8 md:pb-20"
      style={{
        background: `
          radial-gradient(ellipse 60% 80% at 50% 0%, rgba(233, 30, 99, 0.06) 0%, transparent 60%),
          #F5F7F9
        `,
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
            Full feature overview
          </span>
          <h1 className="mb-5 font-display text-5xl font-extrabold tracking-tight text-[#263238] md:text-6xl">
            Everything you need.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #E91E63 0%, #880E4F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nothing you don&apos;t.
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[#9E9E9E] md:text-xl">
            Simple, powerful, private. See every feature that makes Qwikkle different.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
