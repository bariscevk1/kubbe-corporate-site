'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { localizePath, pathnameToInternal } from '@/lib/i18n/paths';

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

const MOBILE_MENU_LINKS = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/hakkimizda', labelKey: 'nav.about' },
  { href: '/hizmetler', labelKey: 'nav.services' },
  { href: '/projeler', labelKey: 'nav.projects' },
  { href: '/sevkiyatlar', labelKey: 'nav.shipments' },
  { href: '/iletisim', labelKey: 'nav.contact' },
] as const;

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

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7 4.5 12.5 10 7 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <Link prefetch href={href} className={`group relative inline-flex py-2 ${className}`}>
      <span>{children}</span>
      <span
        className="absolute bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 scale-x-0 rounded-full bg-[#c5a059]/90 transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
    </Link>
  );
}

const DEFAULT_PHONE = '05323236627';

export function SiteHeader({
  phone = DEFAULT_PHONE,
  logoUrl = null,
  logoAlt = 'Kubbe Kaplama',
  brandWordPrimary = 'Kubbe',
  brandWordAccent = 'Kaplama',
}: SiteHeaderProps) {
  const { t } = useTranslation('common', { i18n });
  const router = useRouter();
  const pathname = usePathname();
  const internalPath = pathnameToInternal(pathname || '/');
  const isHome = internalPath === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const mobileDrawerScrollRef = useRef<HTMLDivElement | null>(null);

  const telHref = telHrefTr(phone);
  const waHref = waHrefTr(phone);
  const phonePretty = formatPhoneDisplay(phone);

  const currentLang = (isSupportedLang(i18n.language) ? i18n.language : 'tr') as SupportedLang;
  const mobileMenuLinks = [
    { href: '/', label: t('nav.home') || 'Anasayfa' },
    { href: '/hakkimizda', label: t('nav.about') || 'Hakkimizda' },
    { href: '/hizmetler', label: t('nav.services') || 'Hizmetler' },
    { href: '/projeler', label: t('nav.projects') || 'Projelerimiz' },
    { href: '/sevkiyatlar', label: t('nav.shipments') || 'Sevkiyatlar' },
    { href: '/iletisim', label: t('nav.contact') || 'Iletisim' },
  ] as const;
  const toHref = useCallback(
    (internalHref: string) => {
      if (!internalHref.startsWith('/')) return internalHref;
      return localizePath(internalHref, currentLang);
    },
    [currentLang],
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

    const internal = pathnameToInternal(pathname || '/');
    router.push(localizePath(internal, lng));
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
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        mobileDrawerScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const barBg =
    scrolled || !isHome
      ? 'site-light-header border-b backdrop-blur-xl'
      : 'border-transparent bg-transparent shadow-none backdrop-blur-0';
  const headerPlacement = 'sticky top-0';

  return (
    <header
      className={`${headerPlacement} z-[120] pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ease-out ${barBg}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-6 md:py-4">
        {/* Mobil: marka + masaüstünde boş (nav merkezde) */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-5">
          <Link
            prefetch
            href={toHref('/')}
            className="header-brand-lockup group hidden min-w-0 rounded-xl px-1 py-1.5 outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-[#c5a059]/70 md:flex"
          >
            <span className="flex flex-col leading-none">
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.34em] text-brand-muted">
                Turgut Coşkun
              </span>
              <span className="mt-1 font-display text-[13px] font-semibold tracking-[0.08em] text-[var(--text-heading)] lg:text-[14px]">
                Camii Kubbe Kaplama
              </span>
              <span className="header-brand-underline mt-2 h-px w-full rounded-full bg-gradient-to-r from-transparent via-[#c5a059]/80 to-transparent" />
            </span>
          </Link>
          <Link
            prefetch
            href={toHref('/')}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-lg py-1.5 pr-2 outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-[#c5a059]/70 md:hidden"
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt || 'Kubbe Kaplama'}
                width={140}
                height={42}
                className="h-16 w-auto max-w-[64px] object-contain object-left"
                sizes="64px"
                priority
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a059]/10 font-display text-[20px] font-bold leading-tight tracking-tight text-[var(--text-heading)]">
                {brandWordPrimary.slice(0, 1)}
              </span>
            )}
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">
                Turgut Coşkun
              </span>
              <span className="mt-1 truncate font-display text-[13px] font-semibold tracking-[0.05em] text-[var(--text-heading)]">
                Camii Kubbe Kaplama
              </span>
            </span>
          </Link>
        </div>

        {/* Masaüstü menü */}
        <nav
          aria-label="Ana menü"
          className="hidden items-center gap-1 md:flex md:gap-0 lg:gap-1"
        >
          {MAIN_NAV.map((item) =>
            item.hasDropdown ? (
              <div key={item.key} className="group relative px-1">
                <Link
                  prefetch
                  href={toHref(item.href)}
                  className="group/nav relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-body)] transition hover:text-[var(--text-heading)]"
                >
                  {t(item.key)}
                  <ChevronDown className="h-4 w-4 opacity-80 transition group-hover/nav:translate-y-px" />
                  <span
                    className="absolute bottom-1 left-1/2 h-[2px] w-[calc(100%-1.5rem)] origin-center -translate-x-1/2 scale-x-0 rounded-full bg-[#c5a059]/90 transition-transform duration-300 ease-out group-hover/nav:scale-x-100"
                    aria-hidden
                  />
                </Link>
                <div
                  className="invisible absolute left-0 top-full z-[60] min-w-[220px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                  role="menu"
                >
                  <div className="rounded-xl border border-[var(--border-soft)] bg-white/95 py-2 shadow-xl shadow-slate-200/70 backdrop-blur-md">
                    {SERVICE_LINKS.map((s) => (
                      <Link
                        key={s.href}
                        prefetch
                        href={toHref(s.href)}
                        className="block px-4 py-2 text-sm text-[var(--text-body)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--text-heading)]"
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
                href={toHref(item.href)}
                className="px-3 text-sm font-medium text-[var(--text-body)] transition hover:text-[var(--text-heading)]"
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
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/80 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-body)] transition hover:border-[var(--border-strong)] hover:bg-white"
          >
            <span className="text-[var(--text-muted)]">{t('ui.language')}</span>
            <span className="font-display text-[var(--text-heading)]">{t(`lang.${currentLang}`)}</span>
            <ChevronDown className={`h-4 w-4 opacity-80 transition ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {langMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-[160px] overflow-hidden rounded-xl border border-[var(--border-soft)] bg-white/95 shadow-xl shadow-slate-200/80 backdrop-blur-md"
              >
                <div className="p-1.5">
                  {SUPPORTED_LANGS.map((lng) => (
                    <button
                      key={lng}
                      type="button"
                      onClick={() => setLang(lng)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] transition ${
                        lng === currentLang
                          ? 'bg-[var(--surface-soft)] text-[var(--text-heading)]'
                          : 'text-[var(--text-body)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <span>{t(`lang.${lng}`)}</span>
                      <span className="text-[11px] text-[var(--text-muted)]">{lng.toUpperCase()}</span>
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
          className="inline-flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-white/90 px-4 text-[var(--text-heading)] shadow-[0_12px_28px_-20px_rgba(31,41,55,0.18)] transition active:scale-95 hover:bg-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-sheet"
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.26em]">
            {t('ui.menu')}
          </span>
          <span className="relative h-4 w-4" aria-hidden>
            <span className="absolute left-0 top-[2px] h-[1.5px] w-4 rounded-full bg-current" />
            <span className="absolute left-0 top-[7px] h-[1.5px] w-4 rounded-full bg-current" />
            <span className="absolute left-0 top-[12px] h-[1.5px] w-4 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {/* Mobil sidebar menü */}
      {isClient
        ? createPortal(
            <AnimatePresence>
              {mobileOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-[130] bg-slate-900/28 backdrop-blur-[3px] md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden
                  />
                  <motion.aside
                    id="mobile-nav-sheet"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobil navigasyon"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 28 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-y-0 right-0 z-[140] flex h-dvh max-h-dvh w-[min(88vw,380px)] flex-col border-l border-[var(--border-soft)] bg-[var(--surface-base)] px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-[max(1rem,env(safe-area-inset-top,0px))] shadow-2xl shadow-slate-300/60 md:hidden"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
                      <Link
                        prefetch
                        href={toHref('/')}
                        className="flex min-w-0 items-center gap-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={logoAlt || 'Kubbe Kaplama'}
                            width={140}
                            height={42}
                            className="h-8 w-auto max-w-[140px] object-contain object-left"
                            sizes="140px"
                            priority
                          />
                        ) : (
                          <span className="truncate font-display text-[13px] font-bold leading-tight tracking-tight text-[var(--text-heading)]">
                            <span className="text-[#c5a059]">{brandWordPrimary}</span> {brandWordAccent}
                          </span>
                        )}
                      </Link>
                      <button
                        type="button"
                        className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 text-sm font-semibold text-[var(--text-heading)] transition hover:bg-white"
                        onClick={() => setMobileOpen(false)}
                        aria-label={t('ui.close')}
                      >
                        {t('ui.close')}
                      </button>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div ref={mobileDrawerScrollRef} className="flex-1 overflow-y-auto overscroll-contain py-5">
                        <p className="px-1 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Sayfalar
                        </p>
                        <nav aria-label="Mobil ana menü" className="flex flex-col gap-2">
                          {mobileMenuLinks.map((item) => (
                            <Link
                              key={item.href}
                              prefetch
                              href={toHref(item.href)}
                              className="flex items-center justify-between rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-4 font-display text-[1.05rem] font-semibold tracking-tight text-[var(--text-heading)] shadow-[0_12px_26px_-24px_rgba(31,41,55,0.18)] transition hover:border-[var(--border-strong)] hover:bg-white"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span>{item.label}</span>
                              <ArrowRight className="h-5 w-5 shrink-0 text-[var(--text-muted)]" />
                            </Link>
                          ))}
                        </nav>
                        <div className="mt-6 border-t border-[var(--border-soft)] pt-5">
                          <p className="px-1 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                            Hizmet kalemleri
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            {SERVICE_LINKS.slice(1).map((item) => (
                              <Link
                                key={item.href}
                                prefetch
                                href={toHref(item.href)}
                                className="flex min-h-[44px] items-center justify-between rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--text-heading)] shadow-[0_12px_24px_-24px_rgba(31,41,55,0.16)] transition hover:border-[var(--border-strong)] hover:bg-white"
                                onClick={() => setMobileOpen(false)}
                              >
                                <span className="min-w-0 truncate">{t(item.key)}</span>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
