'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { formatPhoneDisplay, telHrefTr } from '@/lib/phone';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { i18n } from '@/lib/i18n/i18n';

const DEFAULT_PHONE = '05323236627';

export type SiteFooterProps = {
  phone?: string;
  theme?: 'lead' | 'green';
  logoUrl?: string | null;
  logoAlt?: string | null;
  companyLegalName?: string;
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 8 8 6 8-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter({
  phone = DEFAULT_PHONE,
  theme = 'lead',
  logoUrl,
  logoAlt,
  companyLegalName = 'Turgut Çoşkun Kubbe Kaplama',
}: SiteFooterProps) {
  const { t } = useTranslation('common', { i18n });
  const toHref = useLocalizedPath();
  const telHref = telHrefTr(phone);
  const phoneLabel = formatPhoneDisplay(phone);
  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_URL?.trim() ||
    'https://www.google.com/maps/search/?api=1&query=Camii%20Kubbe%20Kaplama%20Yenimahalle%20Ankara';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || '';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';
  const addressLabel = 'Yenimahalle / Ankara';
  const quickLinks = [
    { href: '/', label: t('nav.home', { defaultValue: 'Anasayfa' }) },
    { href: '/hakkimizda', label: t('nav.about', { defaultValue: 'Hakkımızda' }) },
    { href: '/hizmetler', label: t('nav.services', { defaultValue: 'Hizmetler' }) },
    { href: '/projeler', label: t('nav.projects', { defaultValue: 'Referanslarımız' }) },
    { href: '/sevkiyatlar', label: t('nav.shipments', { defaultValue: 'Sevkiyatlar' }) },
    { href: '/iletisim', label: t('nav.contact', { defaultValue: 'İletişim' }) },
  ];
  const serviceLinks = [
    { href: '/hizmetler/kubbe-kaplama', label: t('services.kubbe', { defaultValue: 'Camii kubbe kaplama' }) },
    { href: '/hizmetler/kursun-levha-satis', label: t('services.kursun', { defaultValue: 'Kurşun levha satışı' }) },
    { href: '/hizmetler/aluminyum-kubbe-kaplama', label: t('services.aluminyumKubbe', { defaultValue: 'Alüminyum kubbe kaplama' }) },
    { href: '/hizmetler/bakir-levha-satis', label: t('services.bakir', { defaultValue: 'Bakır levha & kubbe' }) },
    { href: '/hizmetler/oluk', label: t('services.oluk', { defaultValue: 'Oluk satışı ve montajı' }) },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-soft)] bg-[var(--surface-subtle)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(700px 220px at 10% 0%, rgba(197,160,89,0.08), transparent 60%), radial-gradient(680px 220px at 90% 0%, rgba(47,124,103,0.06), transparent 62%)',
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-10 pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+2rem))] md:px-6 md:py-14 md:pb-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt || companyLegalName}
                  width={160}
                  height={80}
                  className="h-11 w-auto max-h-[84px] max-w-[170px] object-contain object-left opacity-95"
                  sizes="170px"
                />
              ) : null}
            </div>
            <div className="space-y-3">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[#333333]">
                {companyLegalName}
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-[var(--text-body)]">
                {t('footer.motto', {
                  defaultValue: 'Uzmanlık, güven ve uzun ömürlü işçilik ile Türkiye genelinde kurumsal uygulama.',
                })}
              </p>
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[#333333]">
              {t('footer.quickMenu', { defaultValue: 'Hızlı Menü' })}
            </p>
            <nav aria-label="Footer hızlı menü" className="mt-4 flex flex-col items-start gap-1">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  prefetch
                  href={toHref(item.href)}
                  className="footer-link-micro inline-flex min-h-[44px] w-full items-center rounded-xl px-3 py-2 text-sm text-[var(--text-body)] transition hover:bg-white/80 hover:text-[#c5a059]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[#333333]">
              {t('footer.servicesMenu', { defaultValue: 'Hizmetler' })}
            </p>
            <div className="mt-4 flex flex-col items-start gap-1">
              {serviceLinks.map((item) => (
                <Link
                  key={item.href}
                  prefetch
                  href={toHref(item.href)}
                  className="footer-link-micro inline-flex min-h-[44px] w-full items-center rounded-xl px-3 py-2 text-sm text-[var(--text-body)] transition hover:bg-white/80 hover:text-[#c5a059]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[#333333]">
              {t('footer.contactMenu', { defaultValue: 'İletişim' })}
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--text-body)]">
              <a
                href={telHref}
                className="inline-flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/80 hover:text-[#c5a059]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/15 bg-white text-[#c5a059] shadow-[0_6px_18px_-14px_rgba(31,41,55,0.16)]">
                  <PhoneIcon />
                </span>
                <span>{phoneLabel}</span>
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/80 hover:text-[#c5a059]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/15 bg-white text-[#c5a059] shadow-[0_6px_18px_-14px_rgba(31,41,55,0.16)]">
                  <MapPinIcon />
                </span>
                <span>{addressLabel}</span>
              </a>
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/80 hover:text-[#c5a059]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/15 bg-white text-[#c5a059] shadow-[0_6px_18px_-14px_rgba(31,41,55,0.16)]">
                    <MailIcon />
                  </span>
                  <span>{contactEmail}</span>
                </a>
              ) : null}
            </div>

            {instagramUrl ? (
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/25 bg-white text-[#c5a059] transition hover:border-[#c5a059]/45 hover:bg-[#fffaf0]"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border-soft)] pt-5 text-center">
          <p className="text-xs text-[var(--text-muted)]">© 2026 Turgut Coşkun Camii Kubbe Kaplama - Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
