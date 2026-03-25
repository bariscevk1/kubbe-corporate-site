'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';

/**
 * Ücretli arama kampanyasıyla uyumlu, doğal dilde bilgi bölümü.
 * (Görünür içerik + anahtar kelime köprüsü; doldurma amaçlı değil.)
 */
export function HomeKeywordSection() {
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();

  const serviceSections = [
    {
      id: 'kubbe',
      href: '/hizmetler/kubbe-kaplama',
    },
    {
      id: 'alem',
      href: '/hizmetler/alemler',
    },
    {
      id: 'metal',
      href: '/hizmetler/aluminyum-kubbe-kaplama',
    },
  ] as const;

  const keywordCards = [
    { id: 'kubbe', href: '/hizmetler/kubbe-kaplama' },
    { id: 'kursun', href: '/hizmetler/kursun-levha-satis' },
    { id: 'kenet', href: '/hizmetler' },
    { id: 'aluminyum', href: '/hizmetler/aluminyum-satis' },
    { id: 'usta', href: '/hizmetler' },
    { id: 'alemler', href: '/hizmetler/alemler' },
  ] as const;

  return (
    <section
      className="border-t border-lead-800/80 bg-lead-900/50"
      aria-labelledby="seo-hizmet-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 max-md:px-5 max-md:py-16 md:px-6 md:py-16">
        <p className="text-center font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
          {t('home.keywords.tagline')}
        </p>
        <h2
          id="seo-hizmet-baslik"
          className="mt-4 text-center font-display text-2xl font-bold text-white md:text-3xl"
        >
          {t('home.keywords.heading')}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-slate-300">
          {t('home.keywords.description')}
        </p>

        <div className="mt-10 grid gap-4 max-md:mt-12 max-md:gap-5 lg:grid-cols-3">
          {serviceSections.map((item) => {
            const highlights = t(`home.keywords.sections.${item.id}.highlights`, {
              returnObjects: true,
            }) as string[];

            return (
              <section
                key={item.id}
                aria-labelledby={`keyword-section-${item.id}`}
                className="rounded-2xl border border-white/10 bg-lead-950/80 p-5 shadow-inner shadow-black/20"
              >
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-muted">
                  {t(`home.keywords.sections.${item.id}.eyebrow`)}
                </p>
                <h3
                  id={`keyword-section-${item.id}`}
                  className="mt-3 font-display text-xl font-semibold text-white"
                >
                  {t(`home.keywords.sections.${item.id}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {t(`home.keywords.sections.${item.id}.body`)}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5a059]" aria-hidden />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={toHref(item.href)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e8d5a3] transition hover:text-white"
                >
                  {t('home.keywords.detailCta')}
                  <span aria-hidden>↗</span>
                </Link>
              </section>
            );
          })}
        </div>

        <section className="mt-10" aria-labelledby="keyword-cards-title">
          <h3
            id="keyword-cards-title"
            className="text-center font-display text-lg font-semibold text-white"
          >
            {t('home.keywords.cardsTitle')}
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {keywordCards.map((card) => (
              <Link
                key={card.id}
                href={toHref(card.href)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#c5a059]/30 hover:bg-black/35 hover:shadow-[0_20px_45px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(197,160,89,0.08)]"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c5a059]/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex rounded-full border border-[#c5a059]/20 bg-[#c5a059]/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8d5a3]">
                    {t('home.keywords.cardBadge')}
                  </div>
                  <h4 className="mt-4 font-display text-lg font-semibold text-white">
                    {t(`home.keywords.cards.${card.id}.title`)}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {t(`home.keywords.cards.${card.id}.body`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e8d5a3] transition group-hover:text-white">
                    {t('home.keywords.detailCta')}
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            {t('home.keywords.cardsNote')}
          </p>
        </section>

      </div>
    </section>
  );
}
