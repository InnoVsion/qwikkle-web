// TODO: Replace with an accessible animated SVG spinner

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function LoadingSpinner({ label = 'Loading…' }: LoadingSpinnerProps){
  return (
    <div role="status" aria-label={label} className="flex items-center justify-center p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
