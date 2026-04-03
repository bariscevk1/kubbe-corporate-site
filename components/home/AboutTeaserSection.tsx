'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { ABOUT_TEASER_IMAGE } from '@/lib/brand-assets';

type Props = {
  companyName?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const textContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

/** Kubbe silüeti — ince dekor çizgisi (özgün şablon) */
function DomeAccentLine() {
  return (
    <svg
      className="pointer-events-none absolute -left-2 top-1/2 h-[min(280px,50vh)] w-8 -translate-y-1/2 text-[var(--brand)]/50 md:-left-4"
      viewBox="0 0 32 200"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M16 8 Q28 48 16 88 Q4 128 16 192"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      />
    </svg>
  );
}

/**
 * Anasayfada hero’dan sonra — Hakkımızda + cami/kubbe görseli, özgün animasyonlar.
 */
export function AboutTeaserSection({ companyName = 'Turgut Çoşkun Kubbe Kaplama' }: Props) {
  const reduce = useReducedMotion();
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();

  return (
    <section
      id="hakkimizda-ozet"
      aria-labelledby="about-teaser-heading"
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[var(--brand-bg-body)] via-[#0d1218] to-[var(--brand-bg-body)]"
    >
      {/* Arka plan — hafif ızgara + marka parlaması */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 80% at 20% 30%, rgba(46, 90, 71, 0.12), transparent 55%),
            radial-gradient(ellipse 80% 60% at 80% 70%, rgba(6, 78, 59, 0.08), transparent 50%)
          `,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-7 max-md:px-4 md:px-6 md:py-24">
        <div className="grid items-center gap-8 max-md:gap-5 md:gap-12 lg:grid-cols-12 lg:gap-10">
          {/* —— Görsel kolonu: katmanlı kart + clip açılışı —— */}
          <div className="relative lg:col-span-5">
            {!reduce && <DomeAccentLine />}

            <motion.div
              className="relative mx-auto max-w-md max-md:max-w-[320px] lg:mx-0 lg:max-w-none"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Kağıt yığını efekti — 3 katman */}
              <motion.div
                className="absolute -inset-1 hidden rounded-[1.35rem] bg-gradient-to-br from-[#2E5A47]/25 to-transparent md:block"
                initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease }}
              />
              <motion.div
                className="absolute inset-0 hidden translate-x-3 translate-y-3 rounded-[1.25rem] border border-[#F5F5DC]/12 bg-lead-900/40 md:block"
                initial={reduce ? false : { opacity: 0, x: 16, y: 16 }}
                whileInView={{ opacity: 1, x: 12, y: 12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.08, ease }}
              />
              <motion.div
                className="relative overflow-hidden rounded-[1.1rem] border border-[#F5F5DC]/16 shadow-[0_18px_34px_-22px_rgba(0,0,0,0.45)] ring-1 ring-[var(--brand)]/24 md:rounded-[1.25rem] md:border-2 md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] md:ring-[var(--brand)]/25"
                initial={reduce ? false : { opacity: 0.92, scale: 1.03 }}
                whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0.2 }}
                transition={{ duration: 0.75, ease }}
              >
                {/* clip-path kaldırıldı: bazı tarayıcılarda whileInView tetiklenmezse görsel tamamen gizleniyordu */}
                <div className="relative aspect-[4/3] min-h-[170px] w-full bg-white sm:aspect-[4/5] sm:min-h-[280px]">
                  <Image
                    src={ABOUT_TEASER_IMAGE}
                    alt={t('home.aboutTeaser.imageAlt')}
                    fill
                    priority
                    unoptimized
                    className="object-contain object-center brightness-[1.01] contrast-[1.06] saturate-[1.04]"
                    sizes="(max-width: 1024px) 96vw, 480px"
                    quality={96}
                  />
                </div>

                {/* Üst kemer vurgusu — SVG */}
                <svg
                  className="pointer-events-none absolute left-0 right-0 top-0 hidden h-16 w-full text-white/10 md:block"
                  viewBox="0 0 400 64"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M0 64 Q200 0 400 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease, delay: 0.35 }}
                  />
                </svg>

                <motion.div
                  className="absolute bottom-3 left-3 right-3 hidden flex-wrap gap-2 md:bottom-5 md:left-5 md:right-5 md:flex"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 0.5, ease }}
                >
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/95 backdrop-blur-md md:text-xs">
                    {t('home.aboutTeaser.badge')}
                  </span>
                </motion.div>
              </motion.div>

              {/* Yüzen marka halkası */}
              {!reduce && (
                <motion.div
                  className="pointer-events-none absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-full border border-[var(--brand)]/35 bg-[var(--brand)]/5 blur-[1px] md:block"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden
                />
              )}
            </motion.div>
          </div>

          {/* —— Metin kolonu —— */}
          <motion.div
            className="relative lg:col-span-7"
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <motion.p
              variants={textItem}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8e4d8]"
            >
              {t('home.aboutTeaser.kicker')}
            </motion.p>
            <motion.h2
              id="about-teaser-heading"
              variants={textItem}
              className="mt-2 text-[2rem] font-bold tracking-tight text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.16)] md:mt-3 md:text-4xl"
            >
              {t('home.aboutTeaser.heading')}
            </motion.h2>
            <motion.div
              variants={textItem}
              className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--brand)] to-brand-muted"
              aria-hidden
            />
            <motion.p
              variants={textItem}
              className="mt-4 max-w-xl text-[15px] leading-8 text-slate-100 md:mt-6 md:text-lg"
            >
              {t('home.aboutTeaser.p1', { company: companyName })}
            </motion.p>
            <motion.p
              variants={textItem}
              className="mt-3 hidden max-w-xl text-sm leading-relaxed text-slate-300 md:block md:text-base"
            >
              {t('home.aboutTeaser.p2')}
            </motion.p>

            <motion.div
              variants={textItem}
              className="mt-6 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  prefetch
                  href={toHref('/hakkimizda')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--brand)]/20 ring-1 ring-white/15 transition hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-muted)] md:px-6 md:py-3.5"
                >
                  <span>{t('home.aboutTeaser.storyCta')}</span>
                  <span className="sr-only">{t('home.aboutTeaser.storyCtaSr')}</span>
                  <motion.span
                    aria-hidden
                    className="inline-block"
                    animate={reduce ? undefined : { x: [0, 5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
              <Link
                prefetch
                href={toHref('/iletisim')}
                className="group relative text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-light)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
              >
                <span className="relative z-[1]">{t('home.aboutTeaser.contactCta')}</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-[var(--brand)] transition-all duration-300 group-hover:w-full group-hover:bg-[var(--brand-light)]" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
