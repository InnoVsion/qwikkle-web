import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function proxy(request: NextRequest): NextResponse {
  // TODO: Re-enable auth guard when Go backend login is ready.
  // Tracked in: admin-panel-prompt.md Phase 1 (auth wiring session)
  //
  // const token = request.cookies.get('access_token');
  // if (request.nextUrl.pathname.startsWith('/admin') && !token?.value) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('from', request.nextUrl.pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
