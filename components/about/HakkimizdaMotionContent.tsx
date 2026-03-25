'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { StatsSection } from '@/components/home/StatsSection';
import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag-events';

const SECTION_IDS = ['tarihce', 'yaklasim', 'vizyon'] as const;

type Props = {
  company: string;
  brandLine: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

type TimelineItem = {
  year: string;
  title: string;
  detail: string;
};

type TestimonialItem = {
  text: string;
  person: string;
  city: string;
};

const CONTACT_PHONE = '05323236627';

function CounterValue({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(value);
      return;
    }

    let raf = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="font-display text-lg font-semibold text-white">
      {count}
      {suffix}
    </span>
  );
}

export function HakkimizdaMotionContent({ company, brandLine }: Props) {
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();
  const reduced = useReducedMotion();
  const telHref = telHrefTr(CONTACT_PHONE);
  const waHref = waHrefTr(CONTACT_PHONE);
  const phoneLabel = formatPhoneDisplay(CONTACT_PHONE);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sections = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        title: t(`about.sections.${id}.title`),
        paragraphs: t(`about.sections.${id}.paragraphs`, { returnObjects: true }) as string[],
      })),
    [t],
  );

  const motionStats = useMemo(
    () => t('about.motion.stats', { returnObjects: true }) as StatItem[],
    [t],
  );
  const timeline = useMemo(
    () => t('about.motion.timeline', { returnObjects: true }) as TimelineItem[],
    [t],
  );
  const testimonials = useMemo(
    () => t('about.motion.testimonials', { returnObjects: true }) as TestimonialItem[],
    [t],
  );
  const heroPills = useMemo(
    () => t('about.motion.heroPills', { returnObjects: true }) as string[],
    [t],
  );
  const trustLines = useMemo(
    () => t('about.motion.trustLines', { returnObjects: true }) as string[],
    [t],
  );
  const processSteps = useMemo(
    () => t('about.motion.processSteps', { returnObjects: true }) as { n: string; t: string }[],
    [t],
  );

  useEffect(() => {
    if (reduced || testimonials.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 4300);
    return () => window.clearInterval(timer);
  }, [reduced, testimonials.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const container = reduced
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        },
      };

  const item = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
        },
      };

  return (
    <>
      <div className="about-lead-texture relative overflow-hidden border-b border-white/10">
        <motion.div
          className="absolute inset-0"
          animate={
            reduced
              ? undefined
              : isMobile
                ? { scale: [1, 1.018, 1], y: [0, -2, 0] }
                : { scale: [1, 1.035, 1], x: [0, -6, 0], y: [0, -4, 0] }
          }
          transition={
            reduced
              ? undefined
              : isMobile
                ? { duration: 13, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 16, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <Image
            src="/about/hakkimizda-hero.png"
            alt={t('about.motion.heroAlt')}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/65 to-[#101617]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_75%_at_50%_0%,rgba(0,0,0,0.08),rgba(0,0,0,0.62))]" />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={reduced ? undefined : { x: isMobile ? ['0%', '300%'] : ['0%', '360%'] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: isMobile ? 7.5 : 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: isMobile ? 1.8 : 2.5,
                }
          }
        />
        <motion.div {...container} className="relative z-10 mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
          <motion.div
            className="rounded-2xl border border-white/10 bg-black/28 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-[2px] md:p-6"
            animate={
              reduced
                ? undefined
                : {
                    y: isMobile ? [0, -1.2, 0] : [0, -2, 0],
                    boxShadow: [
                      '0 10px 40px rgba(0,0,0,0.45)',
                      isMobile ? '0 12px 42px rgba(0,0,0,0.5)' : '0 14px 46px rgba(0,0,0,0.52)',
                      '0 10px 40px rgba(0,0,0,0.45)',
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: isMobile ? 5.2 : 6.5, repeat: Infinity, ease: 'easeInOut' }}
          >
          <motion.p
            {...item}
            className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#b7d8c8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]"
          >
            {t('about.motion.heroKicker')}
          </motion.p>
          <motion.h1
            {...item}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)] md:text-4xl"
          >
            {t('about.motion.heroTitle')}
          </motion.h1>
          <motion.p {...item} className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-100 drop-shadow-[0_2px_14px_rgba(0,0,0,0.78)]">
            <strong className="text-white">{company}</strong> — {t('about.motion.heroLeadMid', { brandLine })}{' '}
            <strong className="font-semibold text-slate-200">{t('about.motion.heroLeadSince')}</strong>{' '}
            {t('about.motion.heroLeadEnd')}
          </motion.p>

          <motion.ul {...item} className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {motionStats.map((x) => (
              <li
                key={x.label}
                className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-sm"
              >
                <CounterValue value={x.value} suffix={x.suffix} />
                <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-[#9fbeac]">{x.label}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div {...item} className="relative mt-8 h-px w-full overflow-hidden bg-white/10" aria-hidden>
            <span className="about-divider-sheen absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-transparent via-[#9fbeac]/50 to-transparent" />
          </motion.div>

          <motion.ul {...item} className="mt-5 flex flex-wrap gap-2">
            {heroPills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200"
              >
                {pill}
              </li>
            ))}
          </motion.ul>
          </motion.div>
        </motion.div>
      </div>

      <StatsSection />

      <motion.article {...container} className="mx-auto max-w-5xl px-4 py-12 pb-28 md:px-6 md:py-16">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            {...item}
            whileHover={reduced ? undefined : { y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`${index > 0 ? 'mt-8' : ''} rounded-2xl border border-white/10 bg-[#4A4A4A]/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/20 md:p-8`}
            aria-labelledby={`section-${section.id}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/25 font-display text-sm font-semibold text-[#b6d8c5]">
                {index + 1}
              </span>
              <h2
                id={`section-${section.id}`}
                className="font-display text-xl font-semibold text-white md:text-2xl"
              >
                {section.title}
              </h2>
            </div>
            <div className="mt-5 space-y-4 text-slate-200">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.blockquote
          {...item}
          className="mt-8 rounded-2xl border border-[#004B23]/40 bg-gradient-to-br from-[#004B23]/35 to-[#0d1416] p-6 md:p-8"
        >
          <p className="font-display text-lg font-medium leading-relaxed text-slate-100 md:text-xl">
            “{t('about.quote')}”
          </p>
          <footer className="mt-4 text-sm text-slate-400">— {company}</footer>
        </motion.blockquote>

        <motion.section
          {...item}
          className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1f2528] to-[#111619] p-6 md:p-8"
        >
          <h2 className="font-display text-lg font-semibold text-white md:text-xl">
            {t('about.motion.mapSectionTitle')}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-200">{t('about.ctaBand')}</p>
        </motion.section>

        <motion.section
          {...item}
          className="mt-8 rounded-2xl border border-white/10 bg-[#131a1e] p-6 md:p-8"
          aria-labelledby="timeline-title"
        >
          <h2 id="timeline-title" className="font-display text-lg font-semibold text-white md:text-xl">
            {t('about.motion.timelineTitle')}
          </h2>
          <div className="relative mt-6">
            <span className="pointer-events-none absolute bottom-0 left-3 top-0 w-px bg-white/15 md:left-1/2 md:-translate-x-1/2" />
            <ul className="space-y-6">
              {timeline.map((entry, idx) => {
                const fromLeft = idx % 2 === 0;
                return (
                  <motion.li
                    key={`${entry.year}-${entry.title}`}
                    initial={reduced ? undefined : { opacity: 0, x: fromLeft ? -42 : 42 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: easeOut }}
                    className="relative md:grid md:grid-cols-2 md:gap-10"
                  >
                    <div className={`${fromLeft ? 'md:pr-8' : 'md:order-2 md:pl-8'} pl-10 md:pl-0`}>
                      <article className="rounded-xl border border-white/10 bg-[#4a4a4a]/20 p-4">
                        <p className="font-display text-xs uppercase tracking-[0.2em] text-[#9fbeac]">
                          {entry.year}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-white">{entry.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{entry.detail}</p>
                      </article>
                    </div>
                    <span className="absolute left-3 top-5 h-2.5 w-2.5 rounded-full bg-[#9fbeac] ring-4 ring-[#004B23]/35 md:left-1/2 md:-translate-x-1/2" />
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.section>

        <motion.section
          {...item}
          className="mt-8 rounded-2xl border border-white/10 bg-[#11181b] p-6 md:p-8"
          aria-labelledby="about-trust-title"
        >
          <h2 id="about-trust-title" className="font-display text-lg font-semibold text-white md:text-xl">
            {t('about.motion.trustTitle')}
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {trustLines.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm leading-relaxed text-slate-200"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#004B23]/60 text-[10px] text-[#b2d9c2]">
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          {...item}
          className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#141b1f] to-[#0f1518] p-6 md:p-8"
          aria-labelledby="about-process-title"
        >
          <h2 id="about-process-title" className="font-display text-lg font-semibold text-white md:text-xl">
            {t('about.motion.processTitle')}
          </h2>
          <ol className="mt-5 grid gap-3 md:grid-cols-4">
            {processSteps.map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <p className="font-display text-xs tracking-[0.18em] text-[#9fbeac]">{step.n}</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{step.t}</p>
              </li>
            ))}
          </ol>
        </motion.section>

        <motion.section
          {...item}
          className="mt-8 rounded-2xl border border-white/10 bg-[#12191d] p-6 md:p-8"
          aria-labelledby="about-testimonials-title"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 id="about-testimonials-title" className="font-display text-lg font-semibold text-white md:text-xl">
              {t('about.motion.testimonialsTitle')}
            </h2>
            <div className="flex gap-1.5" aria-hidden>
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-5 rounded-full transition ${
                    i === activeTestimonial ? 'bg-[#9fbeac]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <motion.blockquote
              key={activeTestimonial}
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-sm leading-relaxed text-slate-200">
                “{testimonials[activeTestimonial]?.text ?? ''}”
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-[#9fbeac]">
                {testimonials[activeTestimonial]?.person ?? ''} · {testimonials[activeTestimonial]?.city ?? ''}
              </footer>
            </motion.blockquote>
          </div>
        </motion.section>

        <motion.div {...item} className="mt-12 flex flex-wrap gap-4">
          <Link
            href={toHref('/iletisim')}
            className="about-cta-glow inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-light"
          >
            {t('about.motion.ctaCallQuote')}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={toHref('/hizmetler')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/5"
          >
            {t('about.motion.ctaServices')}
            <span aria-hidden>↗</span>
          </Link>
          <Link
            href={toHref('/sevkiyatlar')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/5"
          >
            {t('about.motion.ctaShipments')}
            <span aria-hidden>↗</span>
          </Link>
        </motion.div>

        <motion.p {...item} className="mt-10 text-center text-sm text-slate-500">
          <Link href={toHref('/')} className="text-brand-muted underline-offset-2 hover:underline">
            {t('about.motion.backHome')}
          </Link>
        </motion.p>
      </motion.article>

      {/* Desktop: sağ alt sticky CTA */}
      <div className="fixed bottom-6 right-6 z-[60] hidden w-[300px] rounded-2xl border border-white/15 bg-[#0f1518]/90 p-3 shadow-[0_16px_42px_rgba(0,0,0,0.45)] backdrop-blur-md md:block">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('about_sticky_desktop')}
          className="group flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12.05 2a9.94 9.94 0 0 0-8.6 14.93L2 22l5.23-1.37A10 10 0 1 0 12.05 2Zm5.83 14.31c-.24.68-1.37 1.26-1.88 1.34-.48.08-1.08.11-1.75-.11-.4-.13-.92-.3-1.58-.58-2.8-1.21-4.62-4.16-4.76-4.36-.14-.2-1.14-1.52-1.14-2.89 0-1.37.72-2.04.98-2.32.26-.28.56-.35.75-.35.18 0 .37 0 .53.01.17.01.4-.06.63.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.17.28.74 1.21 1.58 1.95 1.09.97 2.01 1.28 2.29 1.42.28.14.44.12.61-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.15.26.09 1.67.79 1.95.93.28.14.47.21.54.33.07.12.07.7-.17 1.38Z" />
          </svg>
          {t('about.motion.stickyWhatsapp')}
        </a>
        <a
          href={telHref}
          onClick={() => trackPhoneClick('about_sticky_desktop')}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/10"
        >
          <span aria-hidden>📞</span>
          {t('about.motion.stickyCallWithPhone', { phone: phoneLabel })}
        </a>
      </div>

    </>
  );
}
