// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (token===undefined && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (token?.value!==undefined && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/register")) {
    if (token?.value && request.nextUrl.pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
