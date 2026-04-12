import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip internal next.js requests and assets
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/uploads')
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get('admin_session')?.value;
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  // Don't redirect if it's a POST request (likely a server action)
  if (request.method === 'POST') {
    return NextResponse.next();
  }

  console.log(`[PROXY] Path: ${pathname}, Session: ${!!session}`);

  if (isAdminPage && !session) {
    console.log(`[PROXY] Redirecting to /login (No session)`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginPage && session) {
    console.log(`[PROXY] Redirecting to /admin (Session exists)`);
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
