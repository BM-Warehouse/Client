import { NextResponse } from 'next/server';

export function middleware(request) {
  const publicPaths = ['/', '/login', '/register'];
  const protectedPaths = [
    '/add-product',
    '/categories',
    '/categories/:path*',
    '/checkout',
    '/checkout-history',
    '/checkout-history/:path*',
    '/dashboard',
    '/edit-product/:path*',
    '/my-profile',
    '/orders',
    '/orders/:path*',
    '/products',
    '/products/:path*',
    '/users',
    '/users/:path*',
    '/warehouses',
    '/warehouses/:path*'
  ];

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/add-product',
    '/categories',
    '/categories/:path*',
    '/checkout',
    '/checkout-history',
    '/checkout-history/:path*',
    '/dashboard',
    '/edit-product/:path*',
    '/my-profile',
    '/orders',
    '/orders/:path*',
    '/products',
    '/products/:path*',
    '/users',
    '/users/:path*',
    '/warehouses',
    '/warehouses/:path*'
  ]
};
