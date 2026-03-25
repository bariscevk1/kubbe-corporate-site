'use client';

import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag-events';

const DEFAULT_PHONE = '05323236627';

type Props = {
  phone?: string;
};

/**
 * Yalnızca mobil: sabit alt dönüşüm çubuğu (telefon + WhatsApp).
 * Masaüstünde gizli. z-[55]: içerik ve yüzen chip’lerin üstü; mobil drawer (z-[100]+) açıkken altta kalır.
 */
export function MobileConversionBar({ phone = DEFAULT_PHONE }: Props) {
  const tel = telHrefTr(phone);
  const wa = waHrefTr(phone);
  const label = formatPhoneDisplay(phone);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-white/10 bg-lead-950/95 shadow-[0_-12px_40px_-18px_rgba(0,0,0,0.75)] backdrop-blur-xl md:hidden"
      role="region"
      aria-label="Hizli iletisim"
    >
      <div className="mx-auto flex max-w-6xl items-stretch gap-3 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom,0px))] pt-2.5">
        <a
          href={tel}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#c5a059]/40 bg-[#c5a059]/12 px-3 py-2.5 font-display text-xs font-bold uppercase tracking-[0.12em] text-[#e8d5a3] ring-1 ring-[#c5a059]/20 transition active:scale-[0.98] hover:bg-[#c5a059]/18"
          onClick={() => trackPhoneClick('mobile_sticky_bar')}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <span className="text-center leading-tight">
            Hemen Ara
            <span className="mt-0.5 block text-[10px] font-semibold normal-case tracking-normal text-slate-200/95">
              {label}
            </span>
          </span>
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-600/18 px-3 py-2.5 font-display text-xs font-bold uppercase tracking-[0.12em] text-emerald-100 ring-1 ring-emerald-500/25 transition active:scale-[0.98] hover:bg-emerald-600/26"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar')}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
