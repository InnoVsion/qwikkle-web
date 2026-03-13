import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface Testimonial {
  id: string;
  text: string;
  name: string;
  role: string;
  initial: string;
  avatarColor: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    text: "Finally an app that actually respects my privacy. I've switched everything to Qwikkle and haven't looked back.",
    name: 'Sarah K.',
    role: 'UX Designer',
    initial: 'S',
    avatarColor: '#E91E63',
    rating: 5,
  },
  {
    id: '2',
    text: 'The speed is insane. Messages arrive before I even hit send. Nothing else comes close.',
    name: 'Marcus T.',
    role: 'Software Engineer',
    initial: 'M',
    avatarColor: '#880E4F',
    rating: 5,
  },
  {
    id: '3',
    text: 'Moved my whole family over to Qwikkle. My kids love how simple it is, and I love knowing our messages are private.',
    name: 'Priya S.',
    role: 'Teacher',
    initial: 'P',
    avatarColor: '#00C853',
    rating: 5,
  },
  {
    id: '4',
    text: 'No ads. No tracking. No BS. This is how messaging apps should work, full stop.',
    name: 'James W.',
    role: 'Entrepreneur',
    initial: 'J',
    avatarColor: '#F48FB1',
    rating: 5,
  },
  {
    id: '5',
    text: 'The file sharing is incredible — 2GB files, end-to-end encrypted, delivered in seconds. I use it for client work daily.',
    name: 'Emma L.',
    role: 'Photographer',
    initial: 'E',
    avatarColor: '#00C853',
    rating: 5,
  },
  {
    id: '6',
    text: "I've reviewed the Signal Protocol implementation. The security is real, not marketing. You can actually trust it.",
    name: 'David K.',
    role: 'Security Researcher',
    initial: 'D',
    avatarColor: '#263238',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4" fill="#E91E63" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="w-full bg-[#F5F7F9] px-4 py-20 md:px-8 md:py-28"
      data-testid="testimonials-section"
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
            Loved by millions
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#263238] md:text-5xl">
            What people are saying
          </h2>
        </AnimatedSection>

        {/* Masonry grid via CSS columns */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <div key={t.id} className="mb-6 break-inside-avoid">
              <AnimatedSection delay={i * 0.08}>
                <article
                  className="flex flex-col gap-4 rounded-2xl bg-white p-6"
                  style={{
                    border: '1px solid #E4E8EC',
                    boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)',
                  }}
                >
                  <Stars count={t.rating} />
                  <blockquote className="text-sm leading-relaxed text-[#263238]">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: t.avatarColor }}
                      aria-hidden="true"
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#263238]">{t.name}</p>
                      <p className="text-xs text-[#9E9E9E]">{t.role}</p>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
