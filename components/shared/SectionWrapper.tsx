import { cn } from '@/lib/utils/cn';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'surface' | 'gradient';
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  variant = 'default',
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full px-4 py-20 md:px-8 md:py-28',
        variant === 'surface' && 'bg-white',
        variant === 'gradient' && 'relative overflow-hidden',
        className,
      )}
      style={
        variant === 'gradient'
          ? {
              background: `
                radial-gradient(ellipse 70% 60% at 10% 20%, rgba(233, 30, 99, 0.08) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 90% 80%, rgba(0, 230, 118, 0.06) 0%, transparent 50%),
                #F5F7F9
              `,
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
