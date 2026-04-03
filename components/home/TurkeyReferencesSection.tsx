'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { watermarkedSrc } from '@/lib/media/watermarked-src';
import {
  countUniqueProvinces,
  filterReferenceProjects,
  type ReferenceFilter,
  type TurkeyReferenceProject,
  TURKEY_REFERENCE_PROJECTS,
} from '@/lib/content/turkey-reference-projects';

function MapLoadingPlaceholder() {
  const { t } = useTranslation('common');
  return (
    <div className="relative flex min-h-[min(420px,55vh)] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#060606] sm:min-h-[440px]">
      <div
        className="map-loading-shimmer pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.14) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#c5a059]/[0.07]">
          <span className="absolute inset-0 rounded-full bg-[#c5a059]/15 opacity-75 motion-safe:animate-ping [animation-duration:2s]" />
          <MapGlobeIcon className="relative h-5 w-5 text-[#c5a059]" />
        </span>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#c5a059]/90">
          {t('home.map.loadingShort')}
        </p>
        <p className="max-w-xs text-xs text-slate-500">{t('home.map.loading')}</p>
      </div>
    </div>
  );
}

const ReferenceMap = dynamic(
  () => import('./ReferenceMap').then((m) => m.ReferenceMap),
  {
    ssr: false,
    loading: MapLoadingPlaceholder,
  }
);

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = '#c5a059';

const FILTER_IDS: ReferenceFilter[] = ['all', 'kubbe', 'nakkas', 'oluk'];

function categoryColor(cat: TurkeyReferenceProject['category']): string {
  switch (cat) {
    case 'kubbe':
      return '#c5a059';
    case 'nakkas':
      return '#5eead4';
    case 'oluk':
      return '#93c5fd';
    default:
      return '#a8a29e';
  }
}

function CategoryGlyph({
  category,
  className,
}: {
  category: TurkeyReferenceProject['category'] | 'all';
  className?: string;
}) {
  const c = className ?? 'h-4 w-4';
  if (category === 'all') {
    return (
      <svg viewBox="0 0 24 24" className={c} fill="none" aria-hidden>
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  switch (category) {
    case 'kubbe':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" aria-hidden>
          <path
            d="M12 4c5 1.2 6.5 5.2 6.8 6.4H5.2C5.5 9.2 7 5.2 12 4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M4 14h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 14v2.5M12 14v2.5M17 14v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case 'nakkas':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" aria-hidden>
          <path
            d="M12 4l1.2 2.6L16 7.5l-2.6 1.2L12 11l-1.4-4.3L8 7.5l2.6-1.2L12 4Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M6 14l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 17h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
        </svg>
      );
    case 'oluk':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" aria-hidden>
          <path
            d="M5 10c3-3 11-3 14 0v2c-3 3-11 3-14 0v-2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M4 14h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
          <path d="M8 18h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" aria-hidden>
          <path
            d="M12 4l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V8l8-4Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path d="M9.5 10.5h5M9.5 13.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
        </svg>
      );
  }
}

function MapGlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? 'h-5 w-5'} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M3 12h18M12 3c2.8 2.8 4 5.2 4 9s-1.2 6.2-4 9c-2.8-2.8-4-5.2-4-9s1.2-6.2 4-9Z"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.45"
      />
    </svg>
  );
}

/** Ölçüm / harita estetiği — köşe braketleri */
function MapFrameCorners() {
  const stroke = 'currentColor';
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[510] text-[#c5a059]/[0.42]"
      aria-hidden
    >
      <svg className="absolute left-3 top-3 h-10 w-10 sm:left-4 sm:top-4" viewBox="0 0 40 40" fill="none">
        <path d="M2 14V2h12" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      <svg className="absolute right-3 top-3 h-10 w-10 sm:right-4 sm:top-4" viewBox="0 0 40 40" fill="none">
        <path d="M38 14V2H26" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-3 left-3 h-10 w-10 sm:bottom-4 sm:left-4" viewBox="0 0 40 40" fill="none">
        <path d="M2 26v12h12" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-3 right-3 h-10 w-10 sm:bottom-4 sm:right-4" viewBox="0 0 40 40" fill="none">
        <path d="M38 26v12H26" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const springSnappy = { type: 'spring' as const, stiffness: 420, damping: 32 };
const springSoft = { type: 'spring' as const, stiffness: 280, damping: 26 };

export function TurkeyReferencesSection() {
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ReferenceFilter>('all');
  const provinceCount = 81;

  const filterItems = useMemo(
    () =>
      FILTER_IDS.map((id) => ({
        id,
        label: id === 'all' ? t('home.map.filterAll') : t(`home.map.category.${id}`),
      })),
    [t]
  );

  const trustItems = useMemo(
    () =>
      [
        { titleKey: 'home.map.benefit1Title', descKey: 'home.map.benefit1Desc' },
        { titleKey: 'home.map.benefit2Title', descKey: 'home.map.benefit2Desc' },
        { titleKey: 'home.map.benefit3Title', descKey: 'home.map.benefit3Desc' },
      ] as const,
    []
  );

  const filtered = useMemo(
    () => filterReferenceProjects(TURKEY_REFERENCE_PROJECTS, filter),
    [filter]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const first = filtered[0];
    setSelectedId(first ? first.id : null);
  }, [filter, filtered]);

  const selected = useMemo(
    () => filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId]
  );

  const onPick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const headerVariants = {
    hidden: reduce ? {} : { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce ? { duration: 0 } : { staggerChildren: 0.09, delayChildren: 0.06 },
    },
  };
  const headerItem = {
    hidden: reduce ? {} : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease },
    },
  };

  const projectsPath = toHref('/projeler');

  return (
    <section
      id="turkiye-referans"
      aria-labelledby="turkey-ref-heading"
      className="relative overflow-hidden border-t border-white/[0.07] bg-[#030303]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(ellipse 90% 60% at 50% -10%, ${GOLD}18, transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 50% at 85% 15%, rgba(6,78,59,0.35), transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `linear-gradient(rgba(197,160,89,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.05) 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 max-md:px-4 sm:px-5 md:py-28 lg:px-6">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-6%' }}
        >
          <motion.p
            variants={headerItem}
            className="font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c5a059]/90 md:text-[11px] md:tracking-[0.38em]"
            style={{ color: GOLD }}
          >
            {t('home.map.kicker')}
          </motion.p>
          <motion.h2
            variants={headerItem}
            id="turkey-ref-heading"
            className={`${playfair.className} mt-2 text-[1.35rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-3xl md:mt-4 md:text-4xl lg:text-[2.35rem]`}
          >
            {t('home.map.headingTitle', { count: provinceCount })}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mx-auto mt-3 hidden max-w-2xl text-sm leading-relaxed text-slate-400 md:mt-5 md:block md:text-[0.95rem]"
          >
            {t('home.map.subtitle')}
          </motion.p>
          <motion.p
            variants={headerItem}
            className="mx-auto mt-2 max-w-2xl text-[11px] leading-snug text-slate-500 md:mt-3 md:text-sm"
          >
            <Link
              href={projectsPath}
              className="font-medium text-[#c5a059]/95 underline-offset-4 hover:underline"
            >
              {t('home.map.allProjects')}
            </Link>
            <span className="hidden text-slate-500 md:inline">
              {' '}
              — {t('home.map.fullListHint')}
            </span>
          </motion.p>
        </motion.header>

        {/* Mobil: tek satırlık “metro şeridi” — minimum yükseklik */}
        <motion.div
          className="mx-auto mt-5 sm:hidden"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-4%' }}
          transition={{ duration: 0.45, ease, delay: 0.05 }}
          aria-label={t('home.map.kicker')}
        >
          <div className="relative rounded-2xl border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-1">
            <div
              className="pointer-events-none absolute left-4 right-4 top-[22px] h-px bg-gradient-to-r from-transparent via-[#c5a059]/35 to-transparent"
              aria-hidden
            />
            <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {trustItems.map((item, idx) => (
                <li
                  key={item.titleKey}
                  className="min-w-[33.33%] max-w-[33.33%] shrink-0 snap-start px-1.5 text-center first:pl-2 last:pr-2"
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/35 bg-[#0a0a0a] text-[11px] font-bold tabular-nums text-[#e8d5a3]">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="mt-2 line-clamp-2 text-[9px] font-semibold uppercase leading-tight tracking-[0.06em] text-[#c5a059]/90">
                    {t(item.titleKey)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-500">{t(item.descKey)}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.ul
          className="mx-auto mt-10 hidden max-w-5xl gap-3 sm:grid sm:grid-cols-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-4%' }}
          transition={{ duration: 0.55, ease, delay: 0.08 }}
          aria-label={t('home.map.kicker')}
        >
          {trustItems.map((item) => (
            <li key={item.titleKey}>
              <motion.div
                className="group/trust relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-colors hover:border-[#c5a059]/22 sm:p-4"
                whileHover={reduce ? {} : { y: -2 }}
                transition={springSnappy}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/0 via-[#c5a059]/[0.06] to-[#064e3b]/0 opacity-0 transition-opacity duration-500 group-hover/trust:opacity-100" />
                <p className="relative font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]/95">
                  {t(item.titleKey)}
                </p>
                <p className="relative mt-2 text-[13px] leading-snug text-slate-400">{t(item.descKey)}</p>
              </motion.div>
            </li>
          ))}
        </motion.ul>

        <div className="mt-6 space-y-6 max-md:mt-6 lg:mt-12 lg:space-y-8">
          <div className="space-y-3">
            <p className="text-center font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-left">
              {t('home.map.filterLabel')}
            </p>
            <div
              className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible"
              role="group"
              aria-label={t('home.map.filterLabel')}
            >
              {filterItems.map((f) => {
                const active = filter === f.id;
                const glyphCat =
                  f.id === 'all' ? ('all' as const) : (f.id as TurkeyReferenceProject['category']);
                return (
                  <motion.button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    whileHover={reduce ? {} : { scale: 1.02, y: -1 }}
                    whileTap={reduce ? {} : { scale: 0.98 }}
                    transition={springSnappy}
                    className={`relative inline-flex min-h-[44px] shrink-0 snap-center items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                      active
                        ? 'border-[#c5a059]/55 bg-[#c5a059]/14 text-[#e8d5a3] shadow-[0_0_28px_rgba(197,160,89,0.14),inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#c5a059]/25 hover:text-slate-200'
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="ref-filter-glow"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#c5a059]/0 via-[#c5a059]/10 to-[#064e3b]/0"
                        transition={springSnappy}
                      />
                    ) : null}
                    <span
                      className={`relative z-[1] ${active ? 'text-[#c5a059]' : 'text-slate-500'}`}
                      aria-hidden
                    >
                      <CategoryGlyph category={glyphCat} className="h-3.5 w-3.5" />
                    </span>
                    <span className="relative z-[1] max-w-[200px] truncate sm:max-w-none">{f.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="order-1 lg:order-1 lg:col-span-7">
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-[#c5a059]/22 bg-[#060606] shadow-[inset_0_0_0_1px_rgba(197,160,89,0.07),0_48px_100px_-48px_rgba(0,0,0,0.92),0_0_0_1px_rgba(6,78,59,0.06)]"
                initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, ease }}
                aria-label={t('home.map.cardAria')}
              >
                <div className="pointer-events-none absolute -left-px -right-px top-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/45 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#c5a059]/[0.08] to-transparent opacity-60" />

                <div className="relative flex flex-col gap-3 border-b border-white/[0.06] bg-gradient-to-b from-[#111]/95 to-[#0a0a0a]/90 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <motion.span
                      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c5a059]/30 bg-[#c5a059]/[0.09] text-[#c5a059] shadow-[0_0_24px_rgba(197,160,89,0.12)]"
                      whileHover={reduce ? {} : { scale: 1.04 }}
                      transition={springSnappy}
                    >
                      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06]" />
                      <MapGlobeIcon className="relative h-5 w-5" />
                    </motion.span>
                    <div className="min-w-0 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]/95">
                          {t('home.map.panelTitle')}
                        </p>
                        <span className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-950/40 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-emerald-300/95">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping [animation-duration:2.5s]" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </span>
                          {t('home.map.badgeInteractive')}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 sm:text-sm">{t('home.map.panelSubtitle')}</p>
                    </div>
                  </div>
                  <motion.span
                    key={filtered.length}
                    initial={reduce ? false : { opacity: 0.5, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={springSoft}
                    className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-display text-[11px] text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    {t('home.map.locationCount', { count: filtered.length })}
                  </motion.span>
                </div>

                <div className="relative min-h-[min(420px,55vh)] p-2 sm:min-h-[440px] sm:p-3">
                  <ReferenceMap projects={filtered} selectedId={selectedId} onSelect={onPick} />
                  <MapFrameCorners />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.06] px-4 py-3 text-[10px] text-slate-500 sm:text-[11px]">
                  {(['kubbe', 'nakkas', 'oluk', 'diger'] as const).map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1.5 opacity-90">
                      <span style={{ color: categoryColor(cat) }} className="opacity-95">
                        <CategoryGlyph category={cat} className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-slate-400">{t(`home.map.category.${cat}`)}</span>
                    </span>
                  ))}
                </div>

                <details className="group border-t border-white/[0.06] px-4 py-3 text-left">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-slate-300 [&::-webkit-details-marker]:hidden">
                    <span>{t('home.map.howToTitle')}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-[#c5a059]/80 transition group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <ul className="mt-4 list-none space-y-2.5 text-[12px] leading-relaxed text-slate-500">
                    <li className="flex gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c5a059]/70" aria-hidden />
                      {t('home.map.howTo1')}
                    </li>
                    <li className="flex gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c5a059]/70" aria-hidden />
                      {t('home.map.howTo2')}
                    </li>
                    <li className="flex gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c5a059]/70" aria-hidden />
                      {t('home.map.howTo3')}
                    </li>
                  </ul>
                  <p className="mt-4 border-t border-white/[0.05] pt-3 text-[11px] leading-relaxed text-slate-600">
                    {t('home.map.mapHint')}
                  </p>
                </details>
              </motion.div>
            </div>

            <aside className="order-2 flex flex-col gap-6 lg:order-2 lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected?.id ?? 'empty'}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f0f0f] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: reduce ? 'none' : 'blur(0px)',
                    boxShadow: reduce
                      ? 'inset 0 1px 0 rgba(255,255,255,0.04)'
                      : [
                          '0 0 0 0 rgba(197,160,89,0)',
                          '0 20px 50px -28px rgba(197,160,89,0.22)',
                          '0 0 0 0 rgba(197,160,89,0)',
                        ],
                  }}
                  exit={{ opacity: 0, y: -10, filter: reduce ? undefined : 'blur(2px)' }}
                  transition={{
                    duration: 0.4,
                    ease,
                    boxShadow: reduce ? { duration: 0 } : { duration: 1.1, times: [0, 0.45, 1] },
                  }}
                >
                  {selected ? (
                    <>
                      <p className="border-b border-white/[0.06] px-4 py-2.5 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]/90">
                        {t('home.map.selectedLabel')}
                      </p>
                      <div className="relative aspect-[16/10] w-full bg-lead-900">
                        {selected.imageSrc ? (
                          <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 1.06 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, ease }}
                          >
                            <Image
                              src={watermarkedSrc(selected.imageSrc)}
                              alt={selected.mosqueName}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 420px"
                              quality={82}
                            />
                          </motion.div>
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-sm text-slate-500"
                            aria-hidden
                          >
                            {t('home.map.imageSoon')}
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 z-[3] max-md:bottom-4 max-md:left-4 max-md:right-4">
                          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                            <span style={{ color: categoryColor(selected.category) }}>
                              <CategoryGlyph category={selected.category} className="h-3.5 w-3.5" />
                            </span>
                            <p className="font-display text-[10px] font-semibold uppercase tracking-wider text-[#c5a059]">
                              {t(`home.map.category.${selected.category}`)}
                            </p>
                          </div>
                          <p className={`${playfair.className} mt-1 text-lg font-semibold text-white`}>
                            {selected.mosqueName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {selected.cityLabel}
                            {selected.period ? ` · ${selected.period}` : ''}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 max-md:p-5">
                        <Link
                          prefetch
                          href={projectsPath}
                          className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-[#c5a059] transition hover:text-[#e8d5a3]"
                        >
                          {t('home.map.allProjects')}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="p-6 text-sm text-slate-500">{t('home.map.emptyFilter')}</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
