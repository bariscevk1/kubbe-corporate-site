'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ensureI18nInit,
  i18n,
  STORAGE_KEY,
  SUPPORTED_LANGS,
  type SupportedLang,
  isSupportedLang,
} from '@/lib/i18n/i18n';
import { useRouter } from 'next/navigation';
import { formatPhoneDisplay, telHrefTr } from '@/lib/phone';

const SERVICE_LINKS = [
  { href: '/hizmetler', key: 'services.all' },
  { href: '/hizmetler/kubbe-kaplama', key: 'services.kubbe' },
  { href: '/hizmetler/aluminyum-satis', key: 'services.aluminyumSatis' },
  { href: '/hizmetler/aluminyum-kubbe-kaplama', key: 'services.aluminyumKubbe' },
  { href: '/hizmetler/bakir-levha-satis', key: 'services.bakir' },
  { href: '/hizmetler/kursun-levha-satis', key: 'services.kursun' },
  { href: '/hizmetler/nakkas-susleme', key: 'services.nakkas' },
  { href: '/hizmetler/alemler', key: 'services.alemler' },
  { href: '/hizmetler/oluk', key: 'services.oluk' },
] as const;

const MAIN_NAV = [
  { href: '/', key: 'nav.home', hasDropdown: false as const },
  { href: '/hakkimizda', key: 'nav.about', hasDropdown: false as const },
  { href: '/hizmetler', key: 'nav.services', hasDropdown: true as const },
  { href: '/projeler', key: 'nav.projects', hasDropdown: false as const },
  { href: '/sevkiyatlar', key: 'nav.shipments', hasDropdown: false as const },
  { href: '/iletisim', key: 'nav.contact', hasDropdown: false as const },
];

export type SiteHeaderProps = {
  theme?: 'lead' | 'green';
  phone?: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  brandWordPrimary?: string;
  brandWordAccent?: string;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Hover’da ortadan genişleyen alt çizgi */
function NavUnderlineLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group relative inline-flex py-2 ${className}`}>
      <span>{children}</span>
      <span
        className="absolute bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 scale-x-0 rounded-full bg-white/90 transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
    </Link>
  );
}

const DEFAULT_PHONE = '05323236627';

export function SiteHeader({ phone = DEFAULT_PHONE }: SiteHeaderProps) {
  const { t } = useTranslation('common', { i18n });
  const router = useRouter();
  const pathname = usePathname();
  /** URL tabanli dil: anasayfa /tr, /en veya /ar olabilir */
  const isHome =
    pathname === '/' || /^\/(tr|en|ar)\/?$/.test(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const telHref = telHrefTr(phone);
  const phonePretty = formatPhoneDisplay(phone);

  const currentLang = (isSupportedLang(i18n.language) ? i18n.language : 'tr') as SupportedLang;

  const stripLocale = useCallback(
    (p: string) => {
      const seg = p.split('/')[1];
      if (isSupportedLang(seg)) {
        const rest = p.replace(new RegExp(`^/${seg}`), '');
        return rest || '/';
      }
      return p || '/';
    },
    [],
  );

  const withLocale = useCallback(
    (href: string) => {
      if (!href.startsWith('/')) return href;
      const clean = stripLocale(href);
      return `/${currentLang}${clean === '/' ? '' : clean}`;
    },
    [currentLang, stripLocale],
  );

  const setLang = async (lng: SupportedLang) => {
    await ensureI18nInit(lng);
    try {
      window.localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      // ignore
    }
    void i18n.changeLanguage(lng);
    setLangMenuOpen(false);

    // URL tabanlı geçiş: aynı path, farklı locale
    const rest = stripLocale(pathname);
    router.push(`/${lng}${rest === '/' ? '' : rest}`);
  };

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    void ensureI18nInit(currentLang);
  }, [currentLang]);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setServicesMobileOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const barBg = scrolled
    ? 'border-b border-white/10 bg-[linear-gradient(180deg,rgba(6,14,20,0.72),rgba(6,14,20,0.5))] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl'
    : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-0';
  const headerPlacement = isHome && !scrolled ? 'fixed inset-x-0 top-0' : 'sticky top-0';

  return (
    <header className={`${headerPlacement} z-50 transition-all duration-300 ease-out ${barBg}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
        {/* Sol: logo + telefon */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-5" />

        {/* Masaüstü menü */}
        <nav
          aria-label="Ana menü"
          className="hidden items-center gap-1 md:flex md:gap-0 lg:gap-1"
        >
          {MAIN_NAV.map((item) =>
            item.hasDropdown ? (
              <div key={item.key} className="group relative px-1">
                <Link
                  href={withLocale(item.href)}
                  className="group/nav relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:text-white"
                >
                  {t(item.key)}
                  <ChevronDown className="h-4 w-4 opacity-80 transition group-hover/nav:translate-y-px" />
                  <span
                    className="absolute bottom-1 left-1/2 h-[2px] w-[calc(100%-1.5rem)] origin-center -translate-x-1/2 scale-x-0 rounded-full bg-white/90 transition-transform duration-300 ease-out group-hover/nav:scale-x-100"
                    aria-hidden
                  />
                </Link>
                <div
                  className="invisible absolute left-0 top-full z-[60] min-w-[220px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                  role="menu"
                >
                  <div className="rounded-xl border border-white/10 bg-lead-900/95 py-2 shadow-xl shadow-black/40 backdrop-blur-md">
                    {SERVICE_LINKS.map((s) => (
                      <Link
                        key={s.href}
                        href={withLocale(s.href)}
                        className="block px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                        role="menuitem"
                      >
                        {t(s.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavUnderlineLink
                key={item.href}
                href={withLocale(item.href)}
                className="px-3 text-sm font-medium text-slate-200 transition hover:text-white"
              >
                {t(item.key)}
              </NavUnderlineLink>
            ),
          )}
        </nav>

        {/* Dil seçici (masaüstü) */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setLangMenuOpen((v) => !v)}
            aria-expanded={langMenuOpen}
            aria-label={t('ui.language')}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-white/26 hover:bg-white/[0.07]"
          >
            <span className="text-slate-400">{t('ui.language')}</span>
            <span className="font-display text-slate-100">{t(`lang.${currentLang}`)}</span>
            <ChevronDown className={`h-4 w-4 opacity-80 transition ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {langMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-[160px] overflow-hidden rounded-xl border border-white/10 bg-lead-900/95 shadow-xl shadow-black/40 backdrop-blur-md"
              >
                <div className="p-1.5">
                  {SUPPORTED_LANGS.map((lng) => (
                    <button
                      key={lng}
                      type="button"
                      onClick={() => setLang(lng)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] transition ${
                        lng === currentLang
                          ? 'bg-white/[0.08] text-white'
                          : 'text-slate-200 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <span>{t(`lang.${lng}`)}</span>
                      <span className="text-[11px] text-slate-400">{lng.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Mobil: hamburger */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-sheet"
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">Menü</span>
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobil sheet — sağdan */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
              aria-label="Menüyü kapat"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-nav-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Mobil navigasyon"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-0 right-0 top-0 z-[101] flex w-[min(100vw-3rem,20rem)] flex-col border-l border-white/10 bg-lead-900 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <span className="font-display text-sm font-semibold text-white">Menü</span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Kapat"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                <Link
                  href={withLocale('/')}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link
                  href={withLocale('/hakkimizda')}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.about')}
                </Link>
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-slate-100 hover:bg-white/10"
                    aria-expanded={servicesMobileOpen}
                    onClick={() => setServicesMobileOpen((v) => !v)}
                  >
                    {t('nav.services')}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${servicesMobileOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {servicesMobileOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-2"
                      >
                        {SERVICE_LINKS.map((s) => (
                          <Link
                            key={s.href}
                            href={withLocale(s.href)}
                            className="block rounded-lg py-2.5 pl-2 text-sm text-slate-300 hover:text-white"
                            onClick={() => setMobileOpen(false)}
                          >
                            {t(s.key)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link
                  href={withLocale('/projeler')}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.projects')}
                </Link>
                <Link
                  href={withLocale('/sevkiyatlar')}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.shipments')}
                </Link>
                <Link
                  href={withLocale('/iletisim')}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.contact')}
                </Link>

                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-2">
                  <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t('ui.language')}
                  </p>
                  <div className="grid grid-cols-3 gap-2 px-2 pb-2">
                    {SUPPORTED_LANGS.map((lng) => (
                      <button
                        key={lng}
                        type="button"
                        onClick={() => setLang(lng)}
                        className={`rounded-lg border px-2 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                          lng === currentLang
                            ? 'border-[#c5a059]/55 bg-[#c5a059]/12 text-[#e8d5a3]'
                            : 'border-white/15 bg-white/[0.02] text-slate-200 hover:border-white/30'
                        }`}
                      >
                        {t(`lang.${lng}`)}
                      </button>
                    ))}
                  </div>
                </div>
                <a
                  href={telHref}
                  className="mt-4 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-center font-display text-sm font-bold text-brand-muted"
                >
                  {phonePretty}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
