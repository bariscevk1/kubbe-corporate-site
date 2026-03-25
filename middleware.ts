import { NextResponse, type NextRequest } from 'next/server';
import { pathnameToInternal } from '@/lib/i18n/paths';
import type { SupportedLang } from '@/lib/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED = new Set(['tr', 'en', 'ar']);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/' && req.nextUrl.searchParams.has('_rsc')) {
    return NextResponse.next();
  }

  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  const hasLocale = !!first && SUPPORTED.has(first);

  if (hasLocale) {
    const locale = first as SupportedLang;
    const internalPath = pathnameToInternal(pathname);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-next-locale', locale);

    const u = req.nextUrl.clone();
    u.pathname = internalPath;

    const res = NextResponse.rewrite(u, {
      request: { headers: requestHeaders },
    });
    res.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
