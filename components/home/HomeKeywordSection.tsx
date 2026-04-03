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

  const sectionCard = (item: (typeof serviceSections)[number]) => {
    const highlights = t(`home.keywords.sections.${item.id}.highlights`, {
      returnObjects: true,
    }) as string[];

    return (
      <section
        key={item.id}
        aria-labelledby={`keyword-section-${item.id}`}
        className="rounded-2xl border border-white/10 bg-lead-950/80 p-5 shadow-inner shadow-black/20 md:p-5"
      >
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e8d5a3]">
          {t(`home.keywords.sections.${item.id}.eyebrow`)}
        </p>
        <h3
          id={`keyword-section-${item.id}`}
          className="mt-3 font-display text-xl font-semibold text-white"
        >
          {t(`home.keywords.sections.${item.id}.title`)}
        </h3>
        <p className="mt-3 hidden text-sm leading-relaxed text-slate-300 md:block">
          {t(`home.keywords.sections.${item.id}.body`)}
        </p>
        <ul className="mt-4 hidden space-y-2 text-sm text-slate-400 md:block">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5a059]" aria-hidden />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <Link
          href={toHref(item.href)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a7f3d0] transition hover:text-white"
        >
          {t('home.keywords.detailCta')}
          <span aria-hidden>↗</span>
        </Link>
      </section>
    );
  };

  return (
    <section
      className="border-t border-lead-800/80 bg-lead-900/50"
      aria-labelledby="seo-hizmet-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-16">
        <p className="text-center font-display text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-slate-200/95 md:text-xs md:tracking-[0.2em] md:text-[#a7f3d0]">
          {t('home.keywords.tagline')}
        </p>
        <h2
          id="seo-hizmet-baslik"
          className="mt-2 text-center font-display text-lg font-bold leading-snug text-white drop-shadow-sm md:mt-4 md:text-3xl md:drop-shadow-none"
        >
          {t('home.keywords.heading')}
        </h2>
        <p className="mx-auto mt-2 hidden max-w-3xl text-center text-base leading-relaxed text-slate-300 md:mt-5 md:block">
          {t('home.keywords.description')}
        </p>

        {/* Mobil: yatay şerit — üç özet kart */}
        <div className="mt-4 md:hidden">
          <ul className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {serviceSections.map((item) => (
              <li
                key={item.id}
                className="min-w-[min(88vw,280px)] max-w-[88vw] shrink-0 snap-start rounded-xl border border-white/12 bg-lead-950/90 px-3 py-2.5"
              >
                <p className="font-display text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e8d5a3]">
                  {t(`home.keywords.sections.${item.id}.eyebrow`)}
                </p>
                <h3 className="mt-1 font-display text-sm font-semibold leading-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                  {t(`home.keywords.sections.${item.id}.title`)}
                </h3>
                <Link
                  href={toHref(item.href)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#a7f3d0] underline decoration-[#a7f3d0]/70 underline-offset-[3px] hover:text-white hover:decoration-white"
                >
                  {t('home.keywords.detailCta')}
                  <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-3 md:mt-10">
          {serviceSections.map((item) => sectionCard(item))}
        </div>

        <section className="mt-5 md:mt-10" aria-labelledby="keyword-cards-title">
          <h3
            id="keyword-cards-title"
            className="text-center font-display text-sm font-semibold text-white md:text-lg"
          >
            {t('home.keywords.cardsTitle')}
          </h3>
          {/* Mobil: yatay kaydırmalı kompakt kartlar */}
          <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-5 md:grid md:gap-4 md:overflow-visible sm:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {keywordCards.map((card) => (
              <Link
                key={card.id}
                href={toHref(card.href)}
                className="group relative min-w-[min(72vw,240px)] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-black/30 p-3 transition-[transform,border-color] duration-300 hover:border-[#c5a059]/35 md:min-w-0 md:rounded-2xl md:p-5 md:hover:-translate-y-1 md:hover:shadow-[0_20px_45px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(197,160,89,0.08)]"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c5a059]/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex rounded-full border border-white/30 bg-white/15 px-2 py-0.5 font-display text-[8px] font-semibold uppercase tracking-[0.14em] text-white md:border-[#c5a059]/35 md:bg-[#c5a059]/15 md:px-2.5 md:py-1 md:text-xs md:text-[#fef3c7]">
                    {t('home.keywords.cardBadge')}
                  </div>
                  <h4 className="mt-2 font-display text-sm font-semibold leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] md:mt-4 md:text-lg md:[text-shadow:none]">
                    {t(`home.keywords.cards.${card.id}.title`)}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-200 md:mt-3 md:line-clamp-none md:text-sm md:leading-relaxed md:text-slate-300">
                    {t(`home.keywords.cards.${card.id}.body`)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white underline decoration-white/45 underline-offset-2 md:mt-5 md:gap-2 md:text-sm md:no-underline md:text-[#a7f3d0] md:decoration-transparent md:group-hover:text-white">
                    {t('home.keywords.detailCta')}
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-3 hidden max-w-3xl text-center text-xs leading-relaxed text-slate-500 md:mt-5 md:block">
            {t('home.keywords.cardsNote')}
          </p>
        </section>
      </div>
    </section>
  );
}
