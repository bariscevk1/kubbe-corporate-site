import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED = new Set(['tr', 'en', 'ar']);

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
   * /tr, /en, /ar önekli linkler (eski reklamlar, yer imleri).
   * Rewrite kullanmıyoruz: kök layout `force-dynamic` iken rewrite + RSC üretimde yanıt kilitleniyordu (500).
   * Öneki kaldıran 307 + NEXT_LOCALE çerezi — sayfa `/`, `/hizmetler` vb. gerçek yollar üzerinden sunulur.
   */
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  const hasLocale = !!first && SUPPORTED.has(first);

  if (hasLocale) {
    const rest = parts.slice(1);
    const internalPath = rest.length ? `/${rest.join('/')}` : '/';
    if (process.env.NODE_ENV === 'development') {
      const u = new URL(req.url);
      u.pathname = internalPath;
      return NextResponse.rewrite(u);
    }
    const url = req.nextUrl.clone();
    url.pathname = internalPath;
    const res = NextResponse.redirect(url);
    res.cookies.set('NEXT_LOCALE', first, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return res;
  }

  /**
   * Yerel: / ve /hizmetler doğrudan; isteğe bağlı NEXT_PUBLIC_DEV_SIMPLE_ROUTES=1.
   * Üretim: artık `/` → `/tr` zorunlu yönlendirmesi yok (aynı kilitlenme riski + çerez yeterli).
   */
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_DEV_SIMPLE_ROUTES === '1'
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

