import { cn } from '@/lib/utils/cn';

interface AppStoreBadgeProps {
  store: 'apple' | 'google';
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const paddingBySize = {
  sm: 'px-3 py-2 gap-2',
  md: 'px-4 py-3 gap-3',
  lg: 'px-5 py-4 gap-3',
};

const iconBySize = { sm: 18, md: 22, lg: 26 };

const labelBySize = {
  sm: 'text-[9px]',
  md: 'text-[10px]',
  lg: 'text-[11px]',
};

const nameBySize = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

function AppleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.3.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.17.64.24.99.2L15.39 12 11.97 8.58 3.18 23.76zM21.37 10.3l-2.68-1.53-3.41 3.41 3.41 3.41 2.71-1.55c.77-.44.77-1.3-.03-1.74zM2.45.34C2.17.64 2 1.1 2 1.69v20.62c0 .59.17 1.05.46 1.34l.07.07L13.9 12.07v-.14L2.52.27l-.07.07zM15.39 12l-3.42-3.42 3.42-3.42 2.69 1.54c.78.44.78 1.31 0 1.76L15.39 12z" />
    </svg>
  );
}

export function AppStoreBadge({
  store,
  href = '#download',
  size = 'md',
  className,
}: AppStoreBadgeProps) {
  const iconSize = iconBySize[size];

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center rounded-xl transition-all duration-200',
        'bg-[#263238] text-white border border-[#3D4F57]',
        'hover:border-[#E91E63] hover:shadow-[0_0_0_3px_rgba(233,30,99,0.12)]',
        'active:scale-[0.97]',
        paddingBySize[size],
        className,
      )}
      aria-label={store === 'apple' ? 'Download on the App Store' : 'Get it on Google Play'}
    >
      {store === 'apple' ? <AppleIcon size={iconSize} /> : <GooglePlayIcon size={iconSize} />}
      <div className="flex flex-col leading-tight">
        <span className={cn('font-medium opacity-70', labelBySize[size])}>
          {store === 'apple' ? 'Download on the' : 'Get it on'}
        </span>
        <span className={cn('font-semibold', nameBySize[size])}>
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </span>
      </div>
    </a>
  );
}
