'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { telHrefTr } from '@/lib/phone';
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
  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_URL?.trim() ||
    'https://www.google.com/maps/search/?api=1&query=Camii%20Kubbe%20Kaplama%20Yenimahalle%20Ankara';
  const footerBorder = theme === 'green' ? 'border-emerald-900' : 'border-lead-700';
  const footerBg = theme === 'green' ? 'bg-emerald-950' : 'bg-lead-950';

  return (
    <footer className={`relative overflow-hidden border-t ${footerBorder} ${footerBg}`}>
      <div className="footer-sheen pointer-events-none absolute inset-y-0 left-0 opacity-70" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-8 pb-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] md:px-6 md:pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt || companyLegalName}
                  width={160}
                  height={80}
                  className="h-9 w-auto max-h-[72px] max-w-[140px] object-contain object-left opacity-95"
                  sizes="140px"
                />
              ) : null}
              <p className="font-display text-sm font-semibold text-slate-200">{companyLegalName}</p>
            </div>
            <p
              className="mt-1 max-w-md text-xs leading-relaxed text-slate-500"
              dangerouslySetInnerHTML={{ __html: t('footer.blurb') }}
            />
            <p className="mt-2 text-sm">
              <a href={telHref} className="text-brand-muted transition hover:text-white">
                {phone}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link prefetch href={toHref('/hakkimizda')} className="footer-link-micro text-slate-400 hover:text-brand-muted">
              {t('footer.link_about')}
            </Link>
            <Link prefetch href={toHref('/hizmetler')} className="footer-link-micro text-slate-400 hover:text-brand-muted">
              {t('footer.link_services')}
            </Link>
            <Link
              prefetch
              href={toHref('/hizmetler/kubbe-kaplama')}
              className="footer-link-micro text-slate-400 hover:text-brand-muted"
            >
              {t('footer.link_kubbe')}
            </Link>
            <Link prefetch href={toHref('/hizmetler/oluk')} className="footer-link-micro text-slate-400 hover:text-brand-muted">
              {t('footer.link_oluk')}
            </Link>
            <Link prefetch href={toHref('/hizmetler/alemler')} className="footer-link-micro text-slate-400 hover:text-brand-muted">
              {t('footer.link_alemler')}
            </Link>
            <Link prefetch href={toHref('/iletisim')} className="footer-link-micro text-slate-400 hover:text-brand-muted">
              {t('footer.link_contact')}
            </Link>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-micro text-slate-400 hover:text-brand-muted"
            >
              {t('footer.mapLink')}
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
