'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import type { HomeServiceTeaserItem } from '@/lib/content/home-services-teaser';

type Props = {
  items: readonly HomeServiceTeaserItem[];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

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
    <span ref={ref} className="font-display text-2xl font-bold text-white md:text-3xl">
      {count}
      {suffix}
    </span>
  );
}

export function HizmetlerMotionPageContent({ items }: Props) {
  const reduced = useReducedMotion();
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();

  return (
    <main className="bg-[var(--brand-bg-body)]">
      <section className="about-lead-texture relative overflow-hidden border-b border-white/10">
        <Image
          src="/hizmetler/hizmetler-hero.png"
          alt={t('servicesPage.heroAlt')}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/74 to-[#0e1417]/96 md:from-black/35 md:via-black/70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(0,0,0,0.1),rgba(0,0,0,0.5))]" />

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 22 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut }}
          className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20"
        >
          <div className="rounded-2xl border border-white/12 bg-black/36 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-[3px] md:p-7">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.26em] text-[#c5dfd3]">
              {t('servicesPage.kicker')}
            </p>
            <h1 className="mt-3 font-display text-[1.8rem] font-bold tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.78)] sm:text-3xl md:text-4xl">
              {t('servicesPage.title')}
            </h1>
            <p className="mt-4 max-w-3xl text-slate-100/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] md:text-slate-200 md:drop-shadow-none">
              {t('servicesPage.lead')}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              <li className="rounded-xl border border-white/15 bg-black/30 p-4">
                <StatCounter value={items.length} />
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c0dccf]">{t('servicesPage.stat1Label')}</p>
              </li>
              <li className="rounded-xl border border-white/15 bg-black/30 p-4">
                <StatCounter value={30} suffix={t('servicesPage.stat2Suffix')} />
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c0dccf]">{t('servicesPage.stat2Label')}</p>
              </li>
              <li className="rounded-xl border border-white/15 bg-black/30 p-4">
                <StatCounter value={81} />
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#c0dccf]">{t('servicesPage.stat3Label')}</p>
              </li>
            </ul>
          </div>
        </motion.div>
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
                className="overflow-hidden rounded-2xl border border-white/10 bg-lead-900/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/20"
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
                      <div className="h-full w-full bg-lead-800" aria-hidden />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/18 to-transparent" />
                  </div>

                  <div className="md:col-span-7">
                    <div className="flex h-full flex-col justify-center p-6 md:p-8">
                      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                        {t('servicesPage.cardKicker')}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                        {title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                        {description}
                      </p>
                      <div className="mt-6">
                        <Link
                          href={toHref(item.href)}
                          className="inline-flex items-center gap-2 rounded-lg border border-brand/35 bg-brand/10 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-brand hover:bg-brand/20"
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
