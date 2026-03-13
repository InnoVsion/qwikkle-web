// TODO: Implement login form — POST credentials to Go backend, store JWT in httpOnly cookie
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign In' };

export default function LoginPage(){
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Login page — placeholder</p>
    </main>
  );
}
