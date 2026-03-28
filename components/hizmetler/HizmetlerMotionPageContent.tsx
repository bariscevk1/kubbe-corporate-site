'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { SubpageHeading } from '@/components/ui/SubpageHeading';
import { HERO_SLIDES } from '@/lib/brand-assets';
import type { HomeServiceTeaserItem } from '@/lib/content/home-services-teaser';

type Props = {
  items: readonly HomeServiceTeaserItem[];
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const AUTO_SLIDE_MS = 4000;

function getInitialLoadedSlides(): Record<string, boolean> {
  const initial: Record<string, boolean> = {};
  const firstSlide = HERO_SLIDES[0];
  if (firstSlide) {
    initial[firstSlide.src] = true;
  }
  return initial;
}

function StatCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setCount(value);
      return;
    }

    let raf = 0;
    const duration = 1050;
    const start = performance.now();

    const run = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(run);
    };

    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [isInView, reduced, value]);

  return (
    <span ref={ref} className="font-display text-2xl font-bold text-[var(--text-heading)] md:text-3xl">
      {count}
      {suffix}
    </span>
  );
}

export function HizmetlerMotionPageContent({ items }: Props) {
  const reduced = useReducedMotion();
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Record<string, boolean>>(getInitialLoadedSlides);

  const heroKicker = t('servicesPage.heroSplitKicker', { defaultValue: 'HİZMETLER' });
  const heroTitle = t('servicesPage.heroSplitTitle', { defaultValue: 'Camii Kubbe Kaplama' });
  const heroLead = t('servicesPage.heroSplitLead', {
    defaultValue: 'Osmanlı kubbe geleneğine uygun montaj ve malzeme tedariği.',
  });

  useEffect(() => {
    if (HERO_SLIDES[0]) {
      setLoadedSlides((current) => ({ ...current, [HERO_SLIDES[0].src]: true }));
    }
  }, []);

  useEffect(() => {
    if (reduced || HERO_SLIDES.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    HERO_SLIDES.forEach((slide) => {
      if (loadedSlides[slide.src]) return;
      const img = new window.Image();
      img.src = slide.src;
      img.onload = () => {
        setLoadedSlides((current) => (current[slide.src] ? current : { ...current, [slide.src]: true }));
      };
    });
  }, [loadedSlides]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <main className="site-subpage-light services-page bg-[var(--brand-bg-body)]">
      <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-[var(--surface-soft)]">
        <div className="grid md:min-h-screen md:grid-cols-[minmax(320px,40%)_minmax(0,60%)]">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, x: -28 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="relative z-10 flex flex-col justify-center bg-[var(--surface-hero-card)] px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 md:px-10 md:pb-14 md:pt-36 lg:px-14"
          >
            <div className="max-w-xl">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-brand-muted sm:text-xs">
                {heroKicker}
              </p>
              <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#c5a059] to-transparent" aria-hidden />
              <div className="mt-5">
                <SubpageHeading as="h1" size="hero">
                  {heroTitle}
                </SubpageHeading>
              </div>
              <p className="max-w-lg text-[clamp(0.98rem,3.8vw,1.05rem)] leading-7 text-[var(--text-body)]">
                {heroLead}
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <li className="rounded-xl border border-[var(--border-soft)] bg-white/80 p-4 shadow-[0_14px_30px_-24px_rgba(31,41,55,0.14)]">
                  <StatCounter value={items.length} />
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{t('servicesPage.stat1Label')}</p>
                </li>
                <li className="rounded-xl border border-[var(--border-soft)] bg-white/80 p-4 shadow-[0_14px_30px_-24px_rgba(31,41,55,0.14)]">
                  <StatCounter value={30} suffix={t('servicesPage.stat2Suffix')} />
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{t('servicesPage.stat2Label')}</p>
                </li>
                <li className="rounded-xl border border-[var(--border-soft)] bg-white/80 p-4 shadow-[0_14px_30px_-24px_rgba(31,41,55,0.14)]">
                  <StatCounter value={81} />
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{t('servicesPage.stat3Label')}</p>
                </li>
              </ul>
            </div>
          </motion.div>

          <div className="relative min-h-[42vh] bg-[var(--surface-soft)] sm:min-h-[48vh] md:min-h-screen">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.32),rgba(248,249,250,0.78))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-24 bg-gradient-to-b from-white/25 to-transparent md:h-32" />

            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: reduced ? 0.2 : 0.85, ease: easeOut }}
                  style={{ zIndex: isActive ? 2 : 1 }}
                  aria-hidden={!isActive}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-10 lg:p-14"
                    initial={false}
                    animate={
                      isActive && !reduced
                        ? isMobile
                          ? { scale: 1.015, y: 0 }
                          : { scale: 1.035, y: -6 }
                        : { scale: 1, y: 0 }
                    }
                    transition={{ duration: reduced ? 0.2 : isMobile ? 0.45 : AUTO_SLIDE_MS + 1400, ease: 'easeOut' }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        quality={index === 0 ? 82 : 74}
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="bg-[var(--surface-soft)] object-contain object-center"
                        onLoad={() => {
                          setLoadedSlides((current) => ({ ...current, [slide.src]: true }));
                        }}
                      />
                    </div>
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04)_45%,rgba(248,249,250,0.36)_100%)]" />
                  {!loadedSlides[slide.src] ? <div className="absolute inset-0 bg-[var(--surface-soft)]" /> : null}
                </motion.div>
              );
            })}

            <div className="absolute bottom-5 left-1/2 z-[5] flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-all ${
                    index === activeIndex ? 'bg-white/30' : 'bg-slate-900/8 hover:bg-white/20'
                  }`}
                  aria-label={`${heroTitle} ${index + 1}`}
                  aria-pressed={index === activeIndex}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-9 bg-white' : 'w-5 bg-white/35 hover:bg-white/60'
                    }`}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <motion.ul
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, amount: 0.1 }}
          variants={
            reduced
              ? undefined
              : {
                  hidden: {},
                  show: { transition: { staggerChildren: 0.09 } },
                }
          }
          className="space-y-8 md:space-y-10"
        >
          {items.map((item, index) => {
            const fromLeft = index % 2 === 0;
            const gridBase = `home.services.grid.${item.id}` as const;
            const title = t(`${gridBase}.title`);
            const description = t(`${gridBase}.description`);
            const imageAlt = t(`${gridBase}.imageAlt`);
            return (
              <motion.li
                key={item.id}
                id={item.id}
                variants={
                  reduced
                    ? undefined
                    : {
                        hidden: { opacity: 0, x: fromLeft ? -28 : 28, y: 10 },
                        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: easeOut } },
                      }
                }
                whileHover={reduced ? undefined : { y: -2 }}
                className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] shadow-[0_18px_40px_-32px_rgba(31,41,55,0.18)] transition-colors hover:border-[var(--border-strong)]"
              >
                <article className="grid items-stretch md:grid-cols-12">
                  <div className={`relative min-h-[220px] md:col-span-5 ${index % 2 ? 'md:order-2' : ''}`}>
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 42vw"
                        quality={84}
                      />
                    ) : (
                      <div className="h-full w-full bg-[var(--surface-soft)]" aria-hidden />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/16 via-transparent to-transparent" />
                  </div>

                  <div className="md:col-span-7">
                    <div className="flex h-full flex-col justify-center p-6 md:p-8">
                      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                        {t('servicesPage.cardKicker')}
                      </p>
                      <div className="mt-2">
                        <SubpageHeading as="h2" spacing="compact">
                          {title}
                        </SubpageHeading>
                      </div>
                      <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-body)] md:text-base">
                        {description}
                      </p>
                      <div className="mt-6">
                        <Link
                          href={toHref(item.href)}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-brand/35 bg-brand/10 px-4 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/16 hover:text-brand-light"
                        >
                          {t('servicesPage.detailCta')}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </section>
    </main>
  );
}
