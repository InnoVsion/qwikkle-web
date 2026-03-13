import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Protects all /admin routes.
 * Redirects unauthenticated requests to /login, preserving the intended destination.
 * Full token validation is handled server-side by the Go backend in the auth session.
 */
export function proxy(request: NextRequest): NextResponse {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !token?.value) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
