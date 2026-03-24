'use client';

import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag-events';

type Props = {
  phone?: string;
};

const DEFAULT_PHONE = '05323236627';

export function ContactCtaBlock({ phone = DEFAULT_PHONE }: Props) {
  const tel = telHrefTr(phone);
  const wa = waHrefTr(phone);
  const phoneLabel = formatPhoneDisplay(phone);

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-lead-900/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-7">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
        Bizimle Iletisime Gecin
      </p>
      <p className="mt-2 text-slate-300">
        Projeniz icin detayli bilgi, kesif ve fiyat teklifi almak icin bize ulasabilirsiniz.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={tel}
          onClick={() => trackPhoneClick('contact_cta_block')}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand/35 bg-brand/10 px-5 py-2.5 font-display text-sm font-semibold text-slate-100 transition hover:bg-brand/20"
        >
          Ara: {phoneLabel}
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('contact_cta_block')}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-5 py-2.5 font-display text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
        >
          <span aria-hidden>🟢</span>
          WhatsApp Uzerinden Yaz
        </a>
      </div>
    </section>
  );
}
