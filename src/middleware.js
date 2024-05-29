import { cookies } from 'next/headers';
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
    const response = NextResponse.next();

    const accessToken = request.cookies.get('accessToken');
    if(accessToken) {
      console.log(accessToken.value);
      response.headers.set('accessToken', accessToken.value);
    }
    return response;
  }

  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
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
