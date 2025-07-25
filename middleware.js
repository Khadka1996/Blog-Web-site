// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// List of public routes (no auth required)
const publicRoutes = [
  '/',
  '/blogs/(.*)', // This will match all blog routes
  '/blog/(.*)',
  '/login',
  '/register'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace('*', '.*')}$`);
    return regex.test(pathname);
  })) {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get('token')?.value;
    if (!token) throw new Error('No token');
    
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // Role validation for admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Config to specify which paths should run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public routes (handled in the middleware itself)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};