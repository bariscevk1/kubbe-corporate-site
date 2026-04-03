'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { formatPhoneDisplay, formatPhoneIntlTr, telHrefTr, waHrefTr } from '@/lib/phone';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { i18n } from '@/lib/i18n/i18n';

const DEFAULT_PHONE = '05323236627';
const DEFAULT_CONTACT_EMAIL = 'info@camiikubbekaplama.org';

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

function WhatsAppIconSm({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MobileContactRow({
  href,
  external,
  icon,
  children,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex min-h-[44px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50/90 to-white px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition active:scale-[0.99] hover:border-[var(--brand)]/25 hover:shadow-[0_8px_24px_-20px_rgba(47,124,103,0.35)]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ecfdf5] text-[var(--brand)] ring-1 ring-[var(--brand)]/10">
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-slate-800">{children}</span>
    </a>
  );
}

function InstagramIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 10-4 0v7h-4v-7a6 6 0 016-6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h4v12H2zM4 5a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"
      />
      <path fill="currentColor" stroke="none" d="M10 9.5l6 3.25-6 3.25V9.5z" />
    </svg>
  );
}

function SocialTextStrip({
  items,
  title,
  className,
}: {
  items: { href: string; label: string }[];
  title: string;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav className={className} aria-label={title}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-1 text-[13px] leading-relaxed">
        {items.map((item, i) => (
          <span key={item.href} className="inline-flex items-baseline">
            {i > 0 ? (
              <span className="mx-1.5 select-none text-slate-300" aria-hidden>
                ·
              </span>
            ) : null}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
            >
              {item.label}
            </a>
          </span>
        ))}
      </div>
    </nav>
  );
}

function CopyrightBlock({
  year,
  company,
  rights,
  className,
}: {
  year: number;
  company: string;
  rights: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium text-slate-600 md:text-xs">
        © {year} {company}
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-slate-500 md:text-xs">{rights}</p>
    </div>
  );
}

export function SiteFooter({
  phone = DEFAULT_PHONE,
  logoUrl,
  logoAlt,
  companyLegalName = 'Turgut Coşkun Kubbe Kaplama',
}: SiteFooterProps) {
  const { t } = useTranslation('common', { i18n });
  const toHref = useLocalizedPath();
  const telHref = telHrefTr(phone);
  const waHref = waHrefTr(phone);
  const phoneLabel = formatPhoneDisplay(phone);
  const phoneIntl = formatPhoneIntlTr(phone);
  const year = new Date().getFullYear();

  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_URL?.trim() ||
    'https://www.google.com/maps/search/?api=1&query=Camii%20Kubbe%20Kaplama%20Yenimahalle%20Ankara';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || '';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || '';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || '';
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || '';
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
  const addressBlock =
    process.env.NEXT_PUBLIC_FOOTER_ADDRESS?.trim() || t('footer.addressFallback', { defaultValue: 'Yenimahalle / Ankara' });

  const quickLinks = [
    { href: '/', label: t('nav.home', { defaultValue: 'Anasayfa' }) },
    { href: '/hakkimizda', label: t('nav.about', { defaultValue: 'Hakkımızda' }) },
    { href: '/hizmetler', label: t('nav.services', { defaultValue: 'Hizmetler' }) },
    { href: '/projeler', label: t('nav.projects', { defaultValue: 'Referanslarımız' }) },
    { href: '/sevkiyatlar', label: t('nav.shipments', { defaultValue: 'Sevkiyatlar' }) },
    { href: '/iletisim', label: t('nav.contact', { defaultValue: 'İletişim' }) },
  ];
  const mobileQuickLinks = [
    { href: '/', label: t('nav.home', { defaultValue: 'Ana' }) },
    { href: '/hizmetler', label: t('nav.services', { defaultValue: 'Hizmetler' }) },
    { href: '/projeler', label: t('nav.projects', { defaultValue: 'Projeler' }) },
    { href: '/iletisim', label: t('nav.contact', { defaultValue: 'İletişim' }) },
  ];
  const serviceLinks = [
    { href: '/hizmetler/kubbe-kaplama', label: t('services.kubbe', { defaultValue: 'Camii kubbe kaplama' }) },
    { href: '/hizmetler/kursun-levha-satis', label: t('services.kursun', { defaultValue: 'Kurşun levha satışı' }) },
    { href: '/hizmetler/aluminyum-kubbe-kaplama', label: t('services.aluminyumKubbe', { defaultValue: 'Alüminyum kubbe kaplama' }) },
    { href: '/hizmetler/bakir-levha-satis', label: t('services.bakir', { defaultValue: 'Bakır levha & kubbe' }) },
    { href: '/hizmetler/oluk', label: t('services.oluk', { defaultValue: 'Oluk satışı ve montajı' }) },
  ];

  const copyrightShort = companyLegalName.replace(/\s+Kubbe Kaplama/i, '').trim() || companyLegalName;
  const rightsLine = t('footer.rights', { defaultValue: "Tüm hakları Turgut Coşkun'a saklıdır." });

  const socialItems = [
    instagramUrl ? { href: instagramUrl, label: 'Instagram' } : null,
    facebookUrl ? { href: facebookUrl, label: 'Facebook' } : null,
    linkedinUrl ? { href: linkedinUrl, label: 'LinkedIn' } : null,
    youtubeUrl ? { href: youtubeUrl, label: 'YouTube' } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  const socialTitle = t('footer.socialStrip', { defaultValue: 'Sosyal' });
  const footerBlurb = t('footer.blurb', {
    defaultValue:
      'Ankara merkez · Türkiye geneli montaj ve sevkiyat · 7/24 telefon & WhatsApp · Kurumsal hizmet.',
  });

  return (
    <footer
      id="site-footer"
      className="relative border-t border-[rgba(47,124,103,0.2)] bg-[linear-gradient(180deg,#eef2ec_0%,#e6ebe4_50%,#dde5da_100%)]"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/70 to-transparent"
        aria-hidden
      />

      {/* Mobil */}
      <div className="md:hidden">
        <div className="pb-[max(1rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))] pt-4">
          <div className="mx-auto max-w-lg px-3">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-[rgba(47,124,103,0.14)] bg-white/95 shadow-[0_20px_50px_-32px_rgba(31,41,55,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm">
              <div
                className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[var(--brand)]/[0.06]"
                aria-hidden
              />
              <div className="relative flex gap-0">
                <div
                  className="w-1 shrink-0 rounded-l-[1.35rem] bg-gradient-to-b from-[var(--brand)] via-[#2f7c67] to-[#c5a059]"
                  aria-hidden
                />
                <div className="min-w-0 flex-1 px-4 py-4">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
                    {t('footer.contactMenu', { defaultValue: 'İletişim' })}
                  </p>
                  <h2 className="mt-1 font-display text-[1.2rem] font-bold leading-tight tracking-tight text-[var(--text-heading)]">
                    {t('footer.reachUs', { defaultValue: 'Bize ulaşın' })}
                  </h2>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex gap-2 text-[13px] leading-snug text-slate-600 transition hover:text-[var(--brand)]"
                  >
                    <span className="mt-0.5 shrink-0 text-[var(--brand)]">
                      <MapPinIcon />
                    </span>
                    <span>{addressBlock}</span>
                  </a>

                  <div className="mt-3 space-y-2">
                    <MobileContactRow href={telHref} icon={<PhoneIcon />}>
                      <span className="tabular-nums">{phoneIntl}</span>
                    </MobileContactRow>
                    <MobileContactRow href={waHref} external icon={<WhatsAppIconSm />}>
                      <span>
                        WhatsApp · <span className="tabular-nums">{phoneIntl}</span>
                      </span>
                    </MobileContactRow>
                    <MobileContactRow href={`mailto:${contactEmail}`} icon={<MailIcon />}>
                      <span className="break-all">{contactEmail}</span>
                    </MobileContactRow>
                  </div>

                  <SocialTextStrip
                    items={socialItems}
                    title={socialTitle}
                    className="mt-4 border-t border-slate-100 pt-3"
                  />

                  <Link
                    prefetch
                    href={toHref('/iletisim')}
                    className="mt-4 inline-flex items-center gap-1 rounded-full border border-[var(--brand)]/20 bg-[#f0fdf4] px-3 py-1.5 text-[11px] font-semibold text-[var(--brand)] transition hover:bg-[#ecfdf5]"
                  >
                    {t('footer.compactNav', { defaultValue: 'İletişim ve form' })}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>

            <nav
              className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label={t('footer.quickMenu', { defaultValue: 'Hızlı Menü' })}
            >
              {mobileQuickLinks.map((item) => (
                <Link
                  key={item.href}
                  prefetch
                  href={toHref(item.href)}
                  className="shrink-0 rounded-full border border-slate-300/70 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition active:scale-[0.98] hover:border-[var(--brand)]/35 hover:text-[var(--brand)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p
              className="mt-3 px-1 text-center text-[10px] leading-snug text-slate-600"
              dangerouslySetInnerHTML={{ __html: footerBlurb }}
            />

            <CopyrightBlock
              year={year}
              company={copyrightShort}
              rights={rightsLine}
              className="mt-3 px-1 text-center"
            />
          </div>
        </div>
      </div>

      {/* Masaüstü — aynı palet + kart; mobil ile hizalı içerik */}
      <div className="relative hidden md:block">
        <div className="mx-auto max-w-6xl px-4 py-10 pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] md:px-6 md:py-12">
          <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(47,124,103,0.14)] bg-white/90 shadow-[0_28px_64px_-40px_rgba(31,41,55,0.35),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-md">
            <div className="flex min-h-0">
              <div
                className="w-1.5 shrink-0 bg-gradient-to-b from-[var(--brand)] via-[#2f7c67] to-[#c5a059]"
                aria-hidden
              />
              <div className="min-w-0 flex-1 px-6 py-8 md:px-10 md:py-10">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
                  <div className="space-y-4 lg:col-span-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={logoAlt || companyLegalName}
                          width={160}
                          height={80}
                          className="h-12 w-auto max-h-[88px] max-w-[180px] object-contain object-left"
                          sizes="180px"
                        />
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-heading)]">
                        {companyLegalName}
                      </p>
                      <p className="max-w-sm text-sm leading-relaxed text-[var(--text-body)]">
                        {t('footer.motto', {
                          defaultValue:
                            'Uzmanlık, güven ve uzun ömürlü işçilik ile Türkiye genelinde kurumsal uygulama.',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
                      {t('footer.quickMenu', { defaultValue: 'Hızlı Menü' })}
                    </p>
                    <nav aria-label="Footer hızlı menü" className="mt-3 flex flex-col gap-0.5">
                      {quickLinks.map((item) => (
                        <Link
                          key={item.href}
                          prefetch
                          href={toHref(item.href)}
                          className="footer-link-micro inline-flex min-h-[40px] items-center rounded-lg px-2 py-1.5 text-sm text-[var(--text-body)] transition hover:bg-[var(--brand)]/[0.06] hover:text-[var(--brand)]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
                      {t('footer.servicesMenu', { defaultValue: 'Hizmetler' })}
                    </p>
                    <div className="mt-3 flex flex-col gap-0.5">
                      {serviceLinks.map((item) => (
                        <Link
                          key={item.href}
                          prefetch
                          href={toHref(item.href)}
                          className="footer-link-micro inline-flex min-h-[40px] items-center rounded-lg px-2 py-1.5 text-sm text-[var(--text-body)] transition hover:bg-[var(--brand)]/[0.06] hover:text-[var(--brand)]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
                      {t('footer.contactMenu', { defaultValue: 'İletişim' })}
                    </p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--text-body)]">
                      <a
                        href={telHref}
                        className="inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-2 py-2 transition hover:border-[var(--brand)]/20 hover:bg-white"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecfdf5] text-[var(--brand)] ring-1 ring-[var(--brand)]/10">
                          <PhoneIcon />
                        </span>
                        <span className="font-medium tabular-nums text-slate-800">{phoneIntl}</span>
                      </a>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-2 py-2 transition hover:border-[#128C7E]/25 hover:bg-white"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#dcfce7] text-[#128C7E] ring-1 ring-[#128C7E]/15">
                          <WhatsAppIconSm />
                        </span>
                        <span className="font-medium text-slate-800">
                          WhatsApp · <span className="tabular-nums">{phoneLabel}</span>
                        </span>
                      </a>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-2 py-2 transition hover:border-[var(--brand)]/20 hover:bg-white"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecfdf5] text-[var(--brand)] ring-1 ring-[var(--brand)]/10">
                          <MailIcon />
                        </span>
                        <span className="min-w-0 break-all font-medium text-slate-800">{contactEmail}</span>
                      </a>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-2 py-2 transition hover:border-[var(--brand)]/20 hover:bg-white"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecfdf5] text-[var(--brand)] ring-1 ring-[var(--brand)]/10">
                          <MapPinIcon />
                        </span>
                        <span className="font-medium leading-snug text-slate-800">{addressBlock}</span>
                      </a>
                    </div>

                    {socialItems.length > 0 ? (
                      <div className="mt-4">
                        <SocialTextStrip items={socialItems} title={socialTitle} />
                        <div className="mt-3 flex flex-wrap gap-2">
                          {instagramUrl ? (
                            <a
                              href={instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/25 bg-white text-[#c5a059] transition hover:border-[#c5a059]/45 hover:bg-[#fffaf0]"
                              aria-label="Instagram"
                            >
                              <InstagramIcon className="h-4 w-4" />
                            </a>
                          ) : null}
                          {facebookUrl ? (
                            <a
                              href={facebookUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/25 bg-white text-[#c5a059] transition hover:border-[#c5a059]/45 hover:bg-[#fffaf0]"
                              aria-label="Facebook"
                            >
                              <FacebookIcon className="h-4 w-4" />
                            </a>
                          ) : null}
                          {linkedinUrl ? (
                            <a
                              href={linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/25 bg-white text-[#c5a059] transition hover:border-[#c5a059]/45 hover:bg-[#fffaf0]"
                              aria-label="LinkedIn"
                            >
                              <LinkedInIcon className="h-4 w-4" />
                            </a>
                          ) : null}
                          {youtubeUrl ? (
                            <a
                              href={youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/25 bg-white text-[#c5a059] transition hover:border-[#c5a059]/45 hover:bg-[#fffaf0]"
                              aria-label="YouTube"
                            >
                              <YouTubeIcon className="h-4 w-4" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200/80 pt-6">
                  <p
                    className="text-center text-xs leading-relaxed text-slate-600 md:text-sm"
                    dangerouslySetInnerHTML={{ __html: footerBlurb }}
                  />
                  <CopyrightBlock
                    year={year}
                    company={companyLegalName}
                    rights={rightsLine}
                    className="mt-4 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
