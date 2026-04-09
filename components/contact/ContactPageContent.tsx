'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { trackContactFormSubmit, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag-events';
import { ValuesSection } from '@/components/home/ValuesSection';
import { SubpageHeading } from '@/components/ui/SubpageHeading';
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
      className={`inline-flex items-center justify-center text-current ${className}`}
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
      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-heading)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[#c5a059]/45 focus:bg-white"
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
  const [emailStatus, setEmailStatus] = useState<'idle' | 'ok' | 'fail'>('idle');

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
    <>
      <section className="border-b border-[var(--border-soft)] bg-[var(--brand-bg-body)]">
        <div className="relative mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="max-w-3xl rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-hero-card)] p-4 shadow-[0_18px_40px_-32px_rgba(31,41,55,0.2)] backdrop-blur-[3px] md:p-7"
          >
            <p className="text-sm font-medium leading-relaxed text-[var(--text-heading)]">
              Hızlı erişim: WhatsApp, telefon, harita ve yorumlar.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={waPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('iletisim_hero')}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#128C7E]/45 bg-[#128C7E]/12 px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#054239] transition hover:border-[#128C7E]/55 hover:bg-[#128C7E]/18 sm:rounded-2xl sm:px-5 sm:text-xs sm:tracking-[0.14em]"
              >
                <Icon>🟢</Icon>
                WhatsApp
                <span aria-hidden>↗</span>
              </a>
              <a
                href={tel}
                onClick={() => trackPhoneClick('iletisim_hero')}
                className="inline-flex min-h-[46px] flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)] sm:rounded-2xl sm:px-5 sm:text-xs sm:tracking-[0.14em]"
              >
                <Icon>☎</Icon>
                <span>Hızlı arama</span>
                <span className="w-full basis-full text-center text-[13px] font-bold normal-case tracking-normal text-[var(--text-heading)] tabular-nums sm:w-auto sm:basis-auto sm:text-left sm:text-sm">
                  {phonePretty}
                </span>
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#8b6914]/45 bg-[#c5a059]/20 px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3d2e0a] transition hover:border-[#8b6914]/55 hover:bg-[#c5a059]/28 sm:rounded-2xl sm:px-5 sm:text-xs sm:tracking-[0.14em]"
              >
                <Icon>📍</Icon>
                Harita
                <span aria-hidden>↗</span>
              </a>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)] sm:rounded-2xl sm:px-5 sm:text-xs sm:tracking-[0.14em]"
              >
                <Icon>★</Icon>
                Yorumlar
                <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-[var(--text-heading)]">
              <span className="rounded-full border border-[var(--border-soft)] bg-white px-3 py-1.5">
                Ankara merkez · Türkiye geneli
              </span>
              <span className="rounded-full border border-[var(--border-soft)] bg-white px-3 py-1.5">
                Keşif · teklif · montaj · sevkiyat
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
          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-6 shadow-[0_18px_40px_-32px_rgba(31,41,55,0.18)] md:p-8">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
              Teklif formu
            </p>
            <div className="mt-2">
              <SubpageHeading as="h2">
                Mesaj birakin, Turgut Usta ayni gun donus yapsin
              </SubpageHeading>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-body)]">
              Form gonderimi WhatsApp&apos;a yonlendirilir. Boylece mesajiniz kaybolmaz ve Turgut Usta ekibiyle hizlica gorusuruz.
            </p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                trackContactFormSubmit('iletisim_form_whatsapp');
                setEmailStatus('idle');
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name,
                      phone: phoneInput,
                      message,
                      page: typeof window !== 'undefined' ? window.location.href : undefined,
                    }),
                  });
                  setEmailStatus(res.ok ? 'ok' : 'fail');
                } catch {
                  setEmailStatus('fail');
                }
                const opened = window.open(waPrefilled, '_blank', 'noopener,noreferrer');
                if (!opened) window.location.assign(waPrefilled);
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
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Mesajınız
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Proje türü, il/ilçe, yaklaşık metraj, teslim tarihi gibi detayları yazabilirsiniz."
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-heading)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[#c5a059]/45 focus:bg-white"
                />
              </label>

              {emailStatus === 'fail' ? (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  WhatsApp mesajınız açıldı. Ek olarak e-posta bildirimi gönderilemedi; lütfen daha sonra tekrar deneyin.
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#128C7E]/45 bg-[#128C7E]/12 px-5 py-2.5 font-display text-sm font-semibold text-[#054239] transition hover:border-[#128C7E]/55 hover:bg-[#128C7E]/18"
                >
                  WhatsApp ile gönder
                  <span aria-hidden>↗</span>
                </button>
                <a
                  href={tel}
                  onClick={() => trackPhoneClick('iletisim_form')}
                  className="inline-flex min-h-[44px] flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-xl border border-[var(--border-soft)] bg-white px-5 py-2.5 font-display text-sm font-semibold text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]"
                >
                  <span>Hemen arayın</span>
                  <span className="w-full text-center text-[15px] font-bold tabular-nums text-[var(--text-heading)] sm:w-auto">
                    {phonePretty}
                  </span>
                </a>
              </div>
            </form>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Telefon</p>
              <a
                href={tel}
                onClick={() => trackPhoneClick('iletisim_card')}
                className="mt-2 inline-flex items-center gap-2 text-lg font-bold tabular-nums text-[var(--text-heading)] transition hover:text-[#8b6914] hover:underline"
              >
                {phonePretty}
              </a>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-body)]">
                Acil işler için doğrudan arayın. Keşif ve metraj planlamasını telefonda netleştirelim.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Konum</p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-heading)] underline-offset-2 hover:underline"
              >
                {locationLabel}
                <span aria-hidden>↗</span>
              </a>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-body)]">
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
              <p className="mt-1 text-sm leading-snug text-[var(--text-body)]">
                İşletmemizi harita üzerinden inceleyin.
              </p>
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
                className="inline-flex items-center gap-2 rounded-full border border-[#8b6914]/45 bg-[#c5a059]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#3d2e0a] transition hover:border-[#8b6914]/55 hover:bg-[#c5a059]/28"
              >
                Haritada aç
                <span aria-hidden>↗</span>
              </a>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]"
              >
                Yorumlar
                <span aria-hidden>★</span>
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Çalışma düzeni</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--text-body)]">
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

      <ValuesSection />

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
            <div className="mt-2">
              <SubpageHeading as="h2">
                Tek numara, tek ekip, tek sorumluluk
              </SubpageHeading>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-body)]">
              Ustadan keşfe, malzeme tedarikinden montaja kadar tek bir hat üzerinden ilerleyin. Hızlı arama veya
              WhatsApp ile hemen başlayalım.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={tel}
                onClick={() => trackPhoneClick('iletisim_footer_cta')}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--border-soft)] bg-white px-5 py-2.5 font-display text-sm font-semibold text-[var(--text-heading)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]"
              >
                <span>Hızlı arama</span>
                <span className="font-bold tabular-nums text-[var(--text-heading)]">{phonePretty}</span>
              </a>
              <a
                href={waPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('iletisim_footer_cta')}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#128C7E]/45 bg-[#128C7E]/12 px-5 py-2.5 font-display text-sm font-semibold text-[#054239] transition hover:border-[#128C7E]/55 hover:bg-[#128C7E]/18"
              >
                WhatsApp ile yazın
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

