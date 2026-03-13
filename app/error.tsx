'use client';

// Style global error boundary with brand design
// Must be a Client Component per Next.js requirements

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps){
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="text-primary underline">
        Try again
      </button>
    </main>
  );
}
