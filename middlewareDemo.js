import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/order') ||
    request.nextUrl.pathname.startsWith('/history');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
