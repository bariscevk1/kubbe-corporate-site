'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import {
  TURKEY_REFERENCE_PROJECTS,
  categoryLabelTr,
  countUniqueProvinces,
  filterReferenceProjects,
  type ReferenceFilter,
  type TurkeyReferenceProject,
} from '@/lib/content/turkey-reference-projects';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const GOLD = '#c5a059';
const ease = [0.22, 1, 0.36, 1] as const;
const springSnappy = { type: 'spring' as const, stiffness: 420, damping: 32 };
const springSoft = { type: 'spring' as const, stiffness: 280, damping: 26 };

const FILTERS: { id: ReferenceFilter; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'kubbe', label: 'Kubbe kaplama' },
  { id: 'nakkas', label: 'Nakkaş süsleme' },
  { id: 'oluk', label: 'Oluk satışı ve montajı' },
  { id: 'diger', label: 'Diğer / sevkiyat' },
];

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

/** Arama için Türkçe uyumlu küçük harf */
function normalize(s: string) {
  return s.toLocaleLowerCase('tr-TR');
}

type SortKey = 'plaka' | 'city' | 'name';

function ProjectCard({
  project,
  index,
  onImageClick,
}: {
  project: TurkeyReferenceProject;
  index: number;
  onImageClick?: (projectId: string) => void;
}) {
  const reduce = useReducedMotion();
  const c = categoryColor(project.category);
  const plaka = project.plaka.padStart(2, '0');

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : Math.min(index * 0.025, 0.35),
        ease,
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090b0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_48px_-32px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-[#c5a059]/26"
    >
      <span className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition duration-500 group-hover:opacity-100">
        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.14),transparent_52%)]" />
      </span>
      <div className="pointer-events-none absolute -right-px -top-px z-[2] rounded-bl-xl border-b border-l border-[#c5a059]/25 bg-black/55 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#e8d5a3] backdrop-blur-sm">
        Plaka {plaka}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
        {project.imageSrc ? (
          <motion.button
            type="button"
            className="absolute inset-0 text-left"
            onClick={() => onImageClick?.(project.id)}
            whileHover={reduce ? {} : { scale: 1.06 }}
            transition={{ duration: 0.75, ease }}
            aria-label={`${project.mosqueName} görselini aç`}
          >
            <Image
              src={project.imageSrc}
              alt={project.mosqueName}
              fill
              className="object-cover saturate-[1.05] contrast-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
            />
            <span className="pointer-events-none absolute bottom-2 right-2 rounded-full border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-100 backdrop-blur-sm">
              Gorseli ac
            </span>
          </motion.button>
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#050505] p-4 text-center"
            aria-hidden
          >
            <span
              className="font-display text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: `${c}99` }}
            >
              {categoryLabelTr(project.category)}
            </span>
            <span className="text-xs text-slate-500">Görsel yakında</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.25)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className={`${playfair.className} line-clamp-2 text-base font-semibold leading-snug text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-lg`}>
            {project.mosqueName}
          </p>
          <p className="mt-1 text-xs text-slate-300">
            {project.cityLabel}
            {project.period ? ` · ${project.period}` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] px-3 py-2.5">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300"
          style={{ borderColor: `${c}44` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
          {categoryLabelTr(project.category)}
        </span>
        <div className="flex items-center gap-2">
          <motion.span
            className="text-[10px] font-medium text-slate-500 opacity-0 transition group-hover:opacity-100"
            aria-hidden
          >
            Referans
          </motion.span>
          <Link
            href="/#turkiye-referans"
            className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.03] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300 transition hover:border-[#c5a059]/35 hover:text-[#e8d5a3]"
          >
            Haritada
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.03] transition duration-500 group-hover:ring-[#c5a059]/24" />
    </motion.article>
  );
}

export function ProjectsPageContent() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ReferenceFilter>('all');
  const [query, setQuery] = useState('');
  const deferredQ = useDeferredValue(query);
  const [sort, setSort] = useState<SortKey>('plaka');
  const [activeImageProjectId, setActiveImageProjectId] = useState<string | null>(null);

  // Projeler sayfasında görseli olmayan şablon kayıtları göstermiyoruz.
  const projectsWithImage = useMemo(
    () => TURKEY_REFERENCE_PROJECTS.filter((p) => Boolean(p.imageSrc)),
    [],
  );

  const provinceCount = countUniqueProvinces(projectsWithImage);
  const total = projectsWithImage.length;

  const filtered = useMemo(() => {
    const base = filterReferenceProjects(projectsWithImage, filter);
    const q = normalize(deferredQ.trim());
    if (!q) return base;
    return base.filter((p) => {
      const hay = `${p.mosqueName} ${p.cityLabel} ${p.plaka}`;
      return normalize(hay).includes(q);
    });
  }, [filter, deferredQ, projectsWithImage]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      if (sort === 'name') {
        return a.mosqueName.localeCompare(b.mosqueName, 'tr');
      }
      if (sort === 'city') {
        const c = a.cityLabel.localeCompare(b.cityLabel, 'tr');
        if (c !== 0) return c;
        return a.mosqueName.localeCompare(b.mosqueName, 'tr');
      }
      const pa = a.plaka.padStart(2, '0');
      const pb = b.plaka.padStart(2, '0');
      const pcmp = pa.localeCompare(pb, 'tr');
      if (pcmp !== 0) return pcmp;
      const c = a.cityLabel.localeCompare(b.cityLabel, 'tr');
      if (c !== 0) return c;
      return a.mosqueName.localeCompare(b.mosqueName, 'tr');
    });
    return list;
  }, [filtered, sort]);

  const galleryItems = useMemo(
    () => sorted.filter((p) => Boolean(p.imageSrc)),
    [sorted],
  );

  const activeGalleryIndex = useMemo(() => {
    if (!activeImageProjectId) return -1;
    return galleryItems.findIndex((p) => p.id === activeImageProjectId);
  }, [activeImageProjectId, galleryItems]);

  const activeGalleryItem = activeGalleryIndex >= 0 ? galleryItems[activeGalleryIndex] : null;

  const goPrevImage = () => {
    if (!galleryItems.length || activeGalleryIndex < 0) return;
    const prev = (activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveImageProjectId(galleryItems[prev].id);
  };

  const goNextImage = () => {
    if (!galleryItems.length || activeGalleryIndex < 0) return;
    const next = (activeGalleryIndex + 1) % galleryItems.length;
    setActiveImageProjectId(galleryItems[next].id);
  };

  const categoryCounts = useMemo(() => {
    return {
      all: projectsWithImage.length,
      kubbe: projectsWithImage.filter((p) => p.category === 'kubbe').length,
      nakkas: projectsWithImage.filter((p) => p.category === 'nakkas').length,
      oluk: projectsWithImage.filter((p) => p.category === 'oluk').length,
      diger: projectsWithImage.filter((p) => p.category === 'diger').length,
    } as const;
  }, [projectsWithImage]);

  const hasActiveFilter = filter !== 'all' || deferredQ.trim().length > 0 || sort !== 'plaka';

  const headerVariants = {
    hidden: reduce ? {} : { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce ? { duration: 0 } : { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `radial-gradient(ellipse 90% 55% at 50% -15%, ${GOLD}20, transparent 58%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(ellipse 65% 45% at 88% 12%, rgba(6,78,59,0.4), transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(197,160,89,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.05) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src="/api/hizmetler-hero"
          alt="Projelerimiz hero görseli"
          fill
          priority
          className="object-cover object-[58%_center] md:object-center"
          sizes="100vw"
          quality={86}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/72 to-[#0b1014]/95" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(0,0,0,0.08),rgba(0,0,0,0.52))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:30px_30px]" />

        <motion.div
          className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="max-w-3xl rounded-2xl border border-white/12 bg-black/40 p-4 shadow-[0_14px_44px_rgba(0,0,0,0.5)] backdrop-blur-[4px] md:p-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-[#c5dfd3] md:text-xs">
              Türkiye referans ağı
            </p>
            <h1 className={`${playfair.className} mt-4 text-[1.9rem] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)] sm:text-3xl md:text-4xl lg:text-[2.5rem]`}>
              Projelerimiz
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-100/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.72)] md:text-base md:text-slate-200 md:drop-shadow-none">
              Türkiye genelindeki uygulama, sevkiyat ve referans kayıtlarımızı tek ekranda inceleyin.
              Filtreleme ve arama ile şehir, kategori ve dönem bazında hızlıca sonuca ulaşın.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                `${provinceCount} il kapsami`,
                `${total} toplam kayit`,
                `${sorted.length} aktif gorunum`,
              ].map((chip) => (
                <motion.span
                  key={chip}
                  whileHover={reduce ? {} : { y: -1 }}
                  transition={springSoft}
                  className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-100"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="#projeler-filtre"
                className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8d5a3] transition hover:border-[#c5a059]/60 hover:bg-[#c5a059]/20"
              >
                Filtrelere git
                <span aria-hidden>↓</span>
              </Link>
              <Link
                href="/#turkiye-referans"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-white/35 hover:bg-white/[0.08]"
              >
                Haritaya git
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-6 md:px-6 md:pb-20 md:pt-8">

        <motion.ul
          className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2 sm:gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.12 }}
          aria-label="Özet istatistikler"
        >
          {[
            { k: `${provinceCount}`, l: 'İl kapsamı', s: 'Plaka merkezleri' },
            { k: `${total}`, l: 'Kayıt', s: 'Harita ile uyumlu liste' },
            { k: `${sorted.length}`, l: 'Görünüm', s: 'Filtre / arama sonucu' },
          ].map((row) => (
            <li key={row.l}>
              <motion.div
                className="relative min-w-[140px] overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm"
                whileHover={reduce ? {} : { y: -3, scale: 1.02 }}
                transition={springSnappy}
              >
                <motion.p
                  key={row.k + row.l}
                  initial={reduce ? false : { scale: 0.92, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springSoft}
                  className="font-display text-2xl font-bold tabular-nums text-[#e8d5a3] md:text-3xl"
                >
                  {row.k}
                </motion.p>
                <p className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c5a059]/90">
                  {row.l}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">{row.s}</p>
              </motion.div>
            </li>
          ))}
        </motion.ul>

        <motion.div
          id="projeler-filtre"
          className="relative mx-auto mt-10 rounded-2xl border border-[#c5a059]/20 bg-[#060606]/80 p-4 shadow-[inset_0_0_0_1px_rgba(197,160,89,0.06),0_32px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm md:p-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="pointer-events-none absolute -left-px -right-px top-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div className="min-w-0 flex-1">
              <label htmlFor="projeler-ara" className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]/90">
                Ara
              </label>
              <div className="relative mt-2">
                <input
                  id="projeler-ara"
                  type="search"
                  placeholder="Cami, şehir veya plaka…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-4 pr-10 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-[#c5a059]/35 focus:bg-black/55"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
              <div>
                <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]/90">
                  Sırala
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="mt-2 w-full min-w-[180px] rounded-xl border border-white/10 bg-black/40 py-2.5 pl-3 pr-8 text-sm text-slate-200 outline-none focus:border-[#c5a059]/35 sm:w-auto"
                  aria-label="Sıralama"
                >
                  <option value="plaka">İl plakası (01→81)</option>
                  <option value="city">Şehir adı (A→Z)</option>
                  <option value="name">Proje adı (A→Z)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">
            <span className="mr-1 self-center font-display text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Kategori
            </span>
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <motion.button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  whileHover={reduce ? {} : { scale: 1.03, y: -1 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  transition={springSnappy}
                  aria-pressed={active}
                  className={`relative overflow-hidden rounded-full border px-3 py-2 font-display text-[10px] font-semibold uppercase tracking-wider transition-colors md:text-[11px] ${
                    active
                      ? 'border-[#c5a059]/55 bg-[#c5a059]/14 text-[#e8d5a3] shadow-[0_0_24px_rgba(197,160,89,0.12)]'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#c5a059]/22 hover:text-slate-200'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="proj-filter-glow"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#c5a059]/0 via-[#c5a059]/12 to-[#064e3b]/0"
                      transition={springSnappy}
                    />
                  ) : null}
                  <span className="relative z-[1]">
                    {f.label} · {categoryCounts[f.id]}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-4">
            <p className="text-xs text-slate-500">
              Aktif görünüm: <span className="font-medium text-slate-300">{sorted.length}</span> / {total}
            </p>
            <div className="flex flex-wrap gap-2">
              {hasActiveFilter ? (
                <button
                  type="button"
                  onClick={() => {
                    setFilter('all');
                    setQuery('');
                    setSort('plaka');
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-white/30 hover:bg-white/[0.06]"
                >
                  Filtreleri sifirla
                </button>
              ) : null}
              <Link
                href="/#turkiye-referans"
                className="inline-flex items-center gap-1 rounded-full border border-[#c5a059]/35 bg-[#c5a059]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8d5a3] transition hover:border-[#c5a059]/55 hover:bg-[#c5a059]/18"
              >
                Harita görünümü
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${deferredQ}-${sort}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-9"
          >
            {sorted.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-12 text-center">
                <p className="text-slate-400">Bu kriterlere uygun kayıt bulunamadı.</p>
                <p className="mt-1 text-sm text-slate-500">Filtreleri sıfırlayarak tüm projeleri tekrar görüntüleyin.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFilter('all');
                    setQuery('');
                    setSort('plaka');
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-white/30 hover:bg-white/[0.06]"
                >
                  Tum filtreleri temizle
                </button>
              </div>
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((project, index) => (
                  <li key={project.id}>
                    <ProjectCard
                      project={project}
                      index={index}
                      onImageClick={(projectId) => setActiveImageProjectId(projectId)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {activeGalleryItem && activeGalleryItem.imageSrc ? (
            <motion.div
              className="fixed inset-0 z-[120] bg-black/90 p-3 backdrop-blur-sm md:p-6"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                aria-label="Galeriyi kapat"
                className="absolute right-3 top-3 z-[130] rounded-full border border-white/20 bg-black/55 p-2 text-white transition hover:bg-black/75 md:right-6 md:top-6"
                onClick={() => setActiveImageProjectId(null)}
              >
                ✕
              </button>

              <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
                <div className="relative flex min-h-0 flex-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={goPrevImage}
                    aria-label="Önceki görsel"
                    className="absolute left-1 z-[125] rounded-full border border-white/20 bg-black/55 p-2.5 text-white transition hover:bg-black/75 md:left-4"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNextImage}
                    aria-label="Sonraki görsel"
                    className="absolute right-1 z-[125] rounded-full border border-white/20 bg-black/55 p-2.5 text-white transition hover:bg-black/75 md:right-4"
                  >
                    ›
                  </button>

                  <motion.div
                    key={activeGalleryItem.id}
                    initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.24, ease }}
                    className="relative h-full max-h-[75vh] w-full"
                  >
                    <Image
                      src={activeGalleryItem.imageSrc}
                      alt={activeGalleryItem.mosqueName}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={92}
                    />
                  </motion.div>
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-black/35 px-3 py-2.5">
                  <p className={`${playfair.className} text-sm font-semibold text-white md:text-base`}>
                    {activeGalleryItem.mosqueName}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {activeGalleryItem.cityLabel}
                    {activeGalleryItem.period ? ` · ${activeGalleryItem.period}` : ''}
                    {' · '}
                    {categoryLabelTr(activeGalleryItem.category)}
                  </p>
                </div>

                <div className="mt-3 overflow-x-auto pb-1">
                  <div className="flex min-w-max gap-2">
                    {galleryItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveImageProjectId(item.id)}
                        className={`relative h-14 w-24 overflow-hidden rounded-lg border transition md:h-16 md:w-28 ${
                          item.id === activeGalleryItem.id
                            ? 'border-[#c5a059]/70 ring-1 ring-[#c5a059]/40'
                            : 'border-white/15 hover:border-white/30'
                        }`}
                        aria-label={`${item.mosqueName} görselini seç`}
                      >
                        {item.imageSrc ? (
                          <Image
                            src={item.imageSrc}
                            alt={item.mosqueName}
                            fill
                            className="object-cover"
                            sizes="140px"
                            quality={60}
                          />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          className="relative mx-auto mt-12 overflow-hidden rounded-2xl border border-[#c5a059]/25 bg-gradient-to-br from-[#c5a059]/[0.09] via-[#064e3b]/[0.12] to-transparent p-8 text-center md:p-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="map-sheen-overlay absolute inset-y-0 left-0 w-full opacity-50" />
          </div>
          <p className={`${playfair.className} relative text-xl font-semibold text-white md:text-2xl`}>
            Haritada konumları görün
          </p>
          <p className="relative mx-auto mt-3 max-w-lg text-sm text-slate-300">
            Aynı referanslar plaka merkezlerinde işaretli; kümeleşme ve zoom ile detaylı gezinti.
          </p>
          <Link
            href="/#turkiye-referans"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-black/30 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-[#e8d5a3] transition hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10"
          >
            Türkiye haritasına git
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
