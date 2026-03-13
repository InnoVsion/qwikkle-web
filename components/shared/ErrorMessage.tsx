// TODO: Style with destructive color token and optional retry button

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps){
  return (
    <div role="alert" className="rounded-md border border-destructive p-4 text-sm text-destructive">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 underline">
          Try again
        </button>
      )}
    </div>
  );
}
