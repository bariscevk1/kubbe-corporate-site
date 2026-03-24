import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED = new Set(['tr', 'en', 'ar']);
const DEFAULT_LOCALE = 'tr';

function getLocaleFromCookie(req: NextRequest) {
  const v = req.cookies.get('NEXT_LOCALE')?.value || req.cookies.get('kubbe_lang')?.value;
  if (v && SUPPORTED.has(v)) return v;
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // skip next internals, api, and files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  /**
   * Kok path + RSC: yonlendirme zinciri Flight istegini bozabiliyor; bu tek istek tipini serbest birak.
   */
  if (pathname === '/' && req.nextUrl.searchParams.has('_rsc')) {
    return NextResponse.next();
  }

  /**
   * App Router: sayfalar app/page.tsx altinda / ile tanimli; /tr, /en, /ar klasoru yok.
   * Dis URL: /tr/iletisim -> ic rewrite: /iletisim (aynı route dosyalari calisir).
   */
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  const hasLocale = !!first && SUPPORTED.has(first);

  if (hasLocale) {
    const rest = parts.slice(1);
    const internalPath = rest.length ? `/${rest.join('/')}` : '/';
    const url = req.nextUrl.clone();
    url.pathname = internalPath;
    return NextResponse.rewrite(url);
  }

  /**
   * Yerel gelistirme (npm run dev): / ve /hizmetler dogrudan acilir; /tr -> rewrite yukarida cozulur.
   * .env.local: NEXT_PUBLIC_DEV_SIMPLE_ROUTES=1 — uretimde kullanmayin.
   */
  if (process.env.NEXT_PUBLIC_DEV_SIMPLE_ROUTES === '1') {
    return NextResponse.next();
  }

  const locale = getLocaleFromCookie(req) || DEFAULT_LOCALE;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

