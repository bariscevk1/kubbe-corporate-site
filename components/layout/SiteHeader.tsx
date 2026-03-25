'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        className="absolute bottom-1 left-1/2 h-[2px] w-full origin-center -translate-x-1/2 scale-x-0 rounded-full bg-white/90 transition-transform duration-300 ease-out group-hover:scale-x-100"
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
  const mobileServiceLinks = [
    { href: '/hizmetler', label: t('services.all') || 'Tum hizmetler' },
    { href: '/hizmetler/kubbe-kaplama', label: t('services.kubbe') || 'Camii kubbe kaplama' },
    { href: '/hizmetler/aluminyum-satis', label: t('services.aluminyumSatis') || 'Aluminyum satisi' },
    {
      href: '/hizmetler/aluminyum-kubbe-kaplama',
      label: t('services.aluminyumKubbe') || 'Aluminyum kubbe kaplama',
    },
    { href: '/hizmetler/bakir-levha-satis', label: t('services.bakir') || 'Bakir levha ve kubbe' },
    { href: '/hizmetler/kursun-levha-satis', label: t('services.kursun') || 'Kursun levha satisi' },
    { href: '/hizmetler/nakkas-susleme', label: t('services.nakkas') || 'Camii nakkas ve susleme' },
    { href: '/hizmetler/alemler', label: t('services.alemler') || 'Camii alemleri' },
    { href: '/hizmetler/oluk', label: t('services.oluk') || 'Oluk satisi ve montaji' },
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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
    <header
      className={`${headerPlacement} z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ease-out ${barBg}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-4 sm:py-3 md:px-6 md:py-4">
        {/* Mobil: marka + masaüstünde boş (nav merkezde) */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-5">
          <Link
            prefetch
            href={toHref('/')}
            className="flex min-w-0 shrink items-center gap-2 rounded-lg py-1.5 outline-none ring-offset-2 ring-offset-[#0b0f14] focus-visible:ring-2 focus-visible:ring-[#c5a059]/70 md:hidden"
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
              <span className="truncate font-display text-[13px] font-bold leading-tight tracking-tight text-white">
                <span className="text-[#c5a059]">{brandWordPrimary}</span> {brandWordAccent}
              </span>
            )}
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
                        prefetch
                        href={toHref(s.href)}
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
                href={toHref(item.href)}
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
          className="inline-flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#004B23] bg-[#004B23]/10 px-4 text-white shadow-[0_10px_24px_-18px_rgba(0,75,35,0.85)] transition active:scale-95 hover:bg-[#004B23]/18 md:hidden"
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

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              id="mobile-nav-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Mobil navigasyon"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[101] flex flex-col bg-[#4A4E52] px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-[max(1rem,env(safe-area-inset-top,0px))] shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
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
                    <span className="truncate font-display text-[13px] font-bold leading-tight tracking-tight text-white">
                      <span className="text-[#c5a059]">{brandWordPrimary}</span> {brandWordAccent}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t('ui.close')}
                >
                  {t('ui.close')}
                </button>
              </div>
              <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto overscroll-contain py-6">
                  <div className="mx-auto flex w-full max-w-md flex-col gap-4">
                    <nav
                      aria-label="Mobil ana menü"
                      className="rounded-[28px] border border-white/10 bg-[#3f4347] p-3 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.65)]"
                    >
                      <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                        Sayfalar
                      </div>
                      <div className="flex flex-col gap-2">
                        {mobileMenuLinks.map((item) => (
                          <Link
                            key={item.href}
                            prefetch
                            href={toHref(item.href)}
                            className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 font-display text-[1.125rem] font-semibold tracking-tight text-white transition hover:bg-white/[0.08]"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="h-5 w-5 shrink-0 text-white/70" />
                          </Link>
                        ))}
                      </div>
                    </nav>

                    <div className="rounded-[28px] border border-white/10 bg-[#3f4347] p-3 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.65)]">
                      <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                        {t('nav.service_categories')}
                      </p>
                      <div className="flex flex-col gap-2">
                        {mobileServiceLinks.map((item) => (
                          <Link
                            key={item.href}
                            prefetch
                            href={toHref(item.href)}
                            className="flex items-center justify-between rounded-xl border border-white/8 bg-black/10 px-4 py-3 text-[15px] font-medium text-slate-100 transition hover:bg-white/[0.06]"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-white/60" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-[#3f4347] p-3 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.65)]">
                      <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                        {t('ui.language')}
                      </p>
                      <div className="grid grid-cols-3 gap-2 px-1 pb-1">
                        {SUPPORTED_LANGS.map((lng) => (
                          <button
                            key={lng}
                            type="button"
                            onClick={() => setLang(lng)}
                            className={`rounded-xl border px-2 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                              lng === currentLang
                                ? 'border-[#c5a059]/55 bg-[#c5a059]/12 text-[#e8d5a3]'
                                : 'border-white/15 bg-white/[0.02] text-slate-100 hover:border-white/30'
                            }`}
                          >
                            {t(`lang.${lng}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto grid w-full max-w-md shrink-0 grid-cols-2 gap-3 border-t border-white/10 pt-4">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[54px] items-center justify-center rounded-2xl bg-[#0f7a3f] px-4 text-center font-display text-sm font-bold text-white shadow-[0_16px_32px_-18px_rgba(15,122,63,0.8)]"
                  >
                    {t('mobileBar.whatsappLine')}
                  </a>
                  <a
                    href={telHref}
                    className="flex min-h-[54px] items-center justify-center rounded-2xl border border-white/18 bg-[#f3f4f6] px-4 text-center font-display text-sm font-bold text-[#1f2937] shadow-[0_16px_32px_-18px_rgba(0,0,0,0.4)]"
                  >
                    {t('mobileBar.call')}
                  </a>
                </div>
                <p className="pt-3 text-center text-xs text-slate-300/80">{phonePretty}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
