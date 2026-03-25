import Image from 'next/image';
import Link from 'next/link';
import { telHrefTr } from '@/lib/phone';

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
            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500">
              Ankara merkez · <strong className="font-medium text-slate-400">Türkiye geneli</strong> montaj
              ve sevkiyat · <strong className="font-medium text-slate-400">7/24</strong> telefon & WhatsApp ·
              Körfez ve Arap ülkeleri projeleri (EN/AR iletişim) · Tüm yaş gruplarına kurumsal hizmet
            </p>
            <p className="mt-2 text-sm">
              <a href={telHref} className="text-brand-muted transition hover:text-white">
                {phone}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/hakkimizda" className="footer-link-micro text-slate-400 hover:text-brand-muted">
              Hakkımızda
            </Link>
            <Link href="/hizmetler" className="footer-link-micro text-slate-400 hover:text-brand-muted">
              Hizmetler
            </Link>
            <Link href="/hizmetler/kubbe-kaplama" className="footer-link-micro text-slate-400 hover:text-brand-muted">
              Kubbe kaplama
            </Link>
            <Link href="/hizmetler/oluk" className="footer-link-micro text-slate-400 hover:text-brand-muted">
              Oluk
            </Link>
            <Link href="/hizmetler/alemler" className="footer-link-micro text-slate-400 hover:text-brand-muted">
              Alemler
            </Link>
            <Link href="/iletisim" className="footer-link-micro text-slate-400 hover:text-brand-muted">
              İletişim
            </Link>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-micro text-slate-400 hover:text-brand-muted"
            >
              Haritada bul
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
