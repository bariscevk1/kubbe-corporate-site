'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag-events';

type Props = {
  phone: string;
  locationLabel: string;
  mapUrl: string;
  reviewsUrl: string;
  mapEmbed: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function Icon({
  children,
  className = 'h-5 w-5',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center text-white/90 ${className}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#c5a059]/45 focus:bg-black/35"
      />
    </label>
  );
}

export function ContactPageContent({ phone, locationLabel, mapUrl, reviewsUrl, mapEmbed }: Props) {
  const reduce = useReducedMotion();
  const tel = useMemo(() => telHrefTr(phone), [phone]);
  const wa = useMemo(() => waHrefTr(phone), [phone]);
  const phonePretty = useMemo(() => formatPhoneDisplay(phone), [phone]);

  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [message, setMessage] = useState('');

  const waText = useMemo(() => {
    const parts = [
      'Merhaba,',
      name.trim() ? `Ben ${name.trim()}.` : '',
      phoneInput.trim() ? `Telefon: ${phoneInput.trim()}.` : '',
      message.trim() ? message.trim() : 'Fiyat teklifi ve detaylı bilgi almak istiyorum.',
    ].filter(Boolean);
    return parts.join(' ');
  }, [name, phoneInput, message]);

  const waPrefilled = useMemo(() => {
    const u = new URL(wa);
    u.searchParams.set('text', waText);
    return u.toString();
  }, [wa, waText]);

  return (
    <main className="bg-[var(--brand-bg-body)]">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              'radial-gradient(1200px 520px at 15% 0%, rgba(197,160,89,0.18), transparent 55%), radial-gradient(900px 460px at 90% 10%, rgba(0,75,35,0.22), transparent 58%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="max-w-3xl"
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              İletişim ve teklif
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Hızlı iletişim, net teklif.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
              Projenizi kısaca yazın; aynı gün içerisinde dönüş sağlayalım. Telefon ve WhatsApp üzerinden 7/24
              ulaşabilirsiniz.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={waPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('iletisim_hero')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200 transition hover:bg-emerald-500/22"
              >
                <Icon>🟢</Icon>
                WhatsApp
                <span aria-hidden>↗</span>
              </a>
              <a
                href={tel}
                onClick={() => trackPhoneClick('iletisim_hero')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/18 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Icon>☎</Icon>
                Hızlı arama
                <span aria-hidden>{phonePretty}</span>
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/12 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8d5a3] transition hover:border-[#c5a059]/60 hover:bg-[#c5a059]/20"
              >
                <Icon>📍</Icon>
                Harita
                <span aria-hidden>↗</span>
              </a>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-white/35 hover:bg-white/[0.08]"
              >
                <Icon>★</Icon>
                Yorumlar
                <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                Ankara merkez · Türkiye geneli
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                Keşif · teklif · montaj · sevkiyat
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                Dönüşüm takibi: arama/WhatsApp event
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-12 md:gap-8 md:px-6 md:py-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="md:col-span-7"
        >
          <div className="rounded-2xl border border-white/10 bg-[#0a0d10]/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
              Teklif formu
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              Mesaj bırakın, aynı gün dönüş yapalım
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Form gönderimi WhatsApp’a yönlendirilir. Böylece mesajınız kaybolmaz ve hızlıca görüşürüz.
            </p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                trackWhatsAppClick('iletisim_form_submit');
                window.open(waPrefilled, '_blank', 'noopener,noreferrer');
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Ad soyad"
                  value={name}
                  onChange={setName}
                  placeholder="Örn. Mehmet Y."
                />
                <Field
                  label="Telefon"
                  value={phoneInput}
                  onChange={setPhoneInput}
                  placeholder="Örn. 05xx xxx xx xx"
                  type="tel"
                />
              </div>
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Mesajınız
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Proje türü, il/ilçe, yaklaşık metraj, teslim tarihi gibi detayları yazabilirsiniz."
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#c5a059]/45 focus:bg-black/35"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-5 py-2.5 font-display text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/22"
                >
                  WhatsApp ile gönder
                  <span aria-hidden>↗</span>
                </button>
                <a
                  href={tel}
                  onClick={() => trackPhoneClick('iletisim_form')}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-2.5 font-display text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/[0.08]"
                >
                  Hemen arayın
                  <span aria-hidden>{phonePretty}</span>
                </a>
              </div>
            </form>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Telefon</p>
              <a
                href={tel}
                onClick={() => trackPhoneClick('iletisim_card')}
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-white hover:underline"
              >
                {phonePretty}
              </a>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Acil işler için doğrudan arayın. Keşif ve metraj planlamasını telefonda netleştirelim.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Konum</p>
              <p className="mt-2 text-sm font-semibold text-white">{locationLabel}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Ankara merkezden Türkiye geneline montaj ve sevkiyat. Uygunluk durumuna göre yerinde keşif.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55, ease: easeOut, delay: reduce ? 0 : 0.06 }}
          className="md:col-span-5"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d10]/70">
            <div className="border-b border-white/10 px-4 py-3 md:px-5">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
                Harita kaydı
              </p>
              <p className="mt-1 text-sm text-slate-300">İşletmemizi harita üzerinden inceleyin.</p>
            </div>
            <div className="relative aspect-[16/11] w-full">
              <iframe
                title="Google Harita Konum"
                src={mapEmbed}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-wrap gap-3 p-4 md:p-5">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8d5a3] transition hover:border-[#c5a059]/60 hover:bg-[#c5a059]/20"
              >
                Haritada aç
                <span aria-hidden>↗</span>
              </a>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-white/35 hover:bg-white/[0.08]"
              >
                Yorumlar
                <span aria-hidden>★</span>
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Çalışma düzeni</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#c5a059]" aria-hidden />
                Keşif planı: konum ve metraja göre
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#c5a059]" aria-hidden />
                Teklif: malzeme + montaj + sevkiyat kalemleri
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#c5a059]" aria-hidden />
                Uygulama: şantiye güvenliği ve zaman planı
              </li>
            </ul>
          </div>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d10]/70 p-6 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              background:
                'radial-gradient(900px 360px at 10% 0%, rgba(197,160,89,0.16), transparent 60%), radial-gradient(900px 360px at 90% 0%, rgba(0,75,35,0.22), transparent 60%)',
            }}
            aria-hidden
          />
          <div className="relative">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
              Kurumsal iletişim
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              Tek numara, tek ekip, tek sorumluluk
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              Ustadan keşfe, malzeme tedarikinden montaja kadar tek bir hat üzerinden ilerleyin. Hızlı arama veya
              WhatsApp ile hemen başlayalım.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={tel}
                onClick={() => trackPhoneClick('iletisim_footer_cta')}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/18 bg-white/[0.04] px-5 py-2.5 font-display text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                Hızlı arama: {phonePretty}
              </a>
              <a
                href={waPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('iletisim_footer_cta')}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-5 py-2.5 font-display text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/22"
              >
                WhatsApp ile yazın
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

