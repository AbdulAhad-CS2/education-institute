import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = "edu_session";

export function middleware(request: NextRequest) {
    const session = request.cookies.get(COOKIE_NAME)?.value;
    let user = null;

    if (session) {
        try {
            user = JSON.parse(session);
        } catch (e) {
            // Invalid session
        }
    }

    // Protect Admin Routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user || user.role !== 'admin') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Protect Teacher Routes
    if (request.nextUrl.pathname.startsWith('/teacher')) {
        if (!user || user.role !== 'teacher') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Protect Student Routes
    if (request.nextUrl.pathname.startsWith('/student')) {
        if (!user || user.role !== 'student') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Handle Automatic Dashboard Redirects for logged in users
    const authPages = ['/login', '/signup'];
    const isAuthPage = authPages.includes(request.nextUrl.pathname);
    const isRootPage = request.nextUrl.pathname === '/';

    if (user && (isAuthPage || isRootPage)) {
        if (user.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url))
        } else if (user.role === 'teacher') {
            return NextResponse.redirect(new URL('/teacher/dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/student/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/admin/:path*',
        '/teacher/:path*',
        '/student/:path*',
    ],
}
