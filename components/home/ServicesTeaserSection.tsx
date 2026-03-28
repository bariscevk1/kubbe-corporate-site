'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { watermarkedSrc } from '@/lib/media/watermarked-src';
import { HOME_SERVICES_TEASER_ITEMS } from '@/lib/content/home-services-teaser';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const ease = [0.22, 1, 0.36, 1] as const;
const gold = '#c5a059';
const goldMuted = 'rgba(197, 160, 89, 0.55)';

function formatPhoneDisplay(raw: string): string {
  const d = raw.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('0')) {
    return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
  }
  return raw.trim() || '—';
}

function IconDomeMosque({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20h16" />
      <path d="M6 20v-4" />
      <path d="M18 20v-4" />
      <path d="M12 6c-3.5 0-6 3.5-6 7.5V20" />
      <path d="M12 6c3.5 0 6 3.5 6 7.5V20" />
      <path d="M12 4v2" />
    </svg>
  );
}

function IconAluminumBars({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="14" width="18" height="5" rx="1" />
      <rect x="4" y="9" width="16" height="4" rx="0.8" />
      <rect x="5" y="4" width="14" height="4" rx="0.8" />
    </svg>
  );
}

function IconDomeArch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 20h18" />
      <path d="M5 20V12" />
      <path d="M19 20V12" />
      <path d="M5 12c0-4 3.5-8 7-8s7 4 7 8" />
    </svg>
  );
}

function IconCopperSheet({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <ellipse cx="12" cy="14" rx="8" ry="3" />
      <path d="M4 14V9c0-2 3.5-4 8-4s8 2 8 4v5" />
      <path d="M8 10c2-1 4-1.5 8-1.5" />
    </svg>
  );
}

function IconLeadStack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="16" width="16" height="3" rx="0.5" />
      <rect x="5" y="12" width="14" height="3" rx="0.5" />
      <rect x="6" y="8" width="12" height="3" rx="0.5" />
      <rect x="7" y="4" width="10" height="3" rx="0.5" />
    </svg>
  );
}

function IconOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
      <path d="M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
    </svg>
  );
}

function IconAlemi({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v14" />
      <path d="M8 20h8" />
      <path d="M10 7h4" />
      <path d="M9 11h6" />
      <circle cx="12" cy="5" r="1.5" />
    </svg>
  );
}

function IconGutter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 10c4 0 6-3 9-3s5 3 9 3v8H3v-8Z" />
      <path d="M7 14h10" />
      <path d="M12 18v3" />
    </svg>
  );
}

const SERVICE_ICONS = [
  IconDomeMosque,
  IconAluminumBars,
  IconDomeArch,
  IconCopperSheet,
  IconLeadStack,
  IconOrnament,
  IconAlemi,
  IconGutter,
] as const;

type Props = {
  phone: string;
};

export function ServicesTeaserSection({ phone }: Props) {
  const reduce = useReducedMotion();
  const anim = (s: number) => (reduce ? 0 : s);
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();
  const phoneDisplay = formatPhoneDisplay(phone);
  const servicesPath = toHref('/hizmetler');

  const headerContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: anim(0.12), delayChildren: anim(0.05) },
    },
  };

  const headerItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: anim(0.65), ease },
    },
  };

  const gridContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: anim(0.08), delayChildren: anim(0.2) },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 44 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: anim(0.52), ease },
    },
  };

  return (
    <section
      id="hizmetler-ozet"
      aria-labelledby="services-teaser-heading"
      className="relative overflow-hidden border-t border-white/[0.07] bg-black"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 100% 70% at 50% -15%, ${gold}12, transparent 55%)`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 max-md:px-5 max-md:py-24 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.p
            variants={headerItem}
            className="font-display text-[11px] font-semibold uppercase tracking-[0.38em] md:text-xs"
            style={{ color: gold }}
          >
            {t('home.services.kicker')}
          </motion.p>
          <motion.h2
            id="services-teaser-heading"
            variants={headerItem}
            className={`${playfair.className} mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.65rem]`}
          >
            {t('home.services.title')}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base"
          >
            {t('home.services.leadBefore')}
            <Link prefetch href={servicesPath} className="text-[#c5a059]/90 underline-offset-4 hover:underline">
              {t('home.services.leadLink')}
            </Link>
            {t('home.services.leadAfter')}
          </motion.p>
          <motion.div variants={headerItem} className="mt-8 flex justify-center">
            <Link
              prefetch
              href={servicesPath}
              className="group inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c5a059]/10 md:text-sm"
              style={{ borderColor: goldMuted, color: gold }}
            >
              {t('home.services.viewAll')}
              <span
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul
          className="mt-14 grid grid-cols-1 gap-6 max-md:mt-16 max-md:gap-8 sm:grid-cols-2 xl:grid-cols-4"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {HOME_SERVICES_TEASER_ITEMS.map((item, idx) => {
            const Icon = SERVICE_ICONS[idx] ?? IconDomeMosque;
            const hasImage = Boolean(item.imageSrc);
            const gridBase = `home.services.grid.${item.id}` as const;
            const title = t(`${gridBase}.title`);
            const description = t(`${gridBase}.description`);
            const imageAlt = t(`${gridBase}.imageAlt`);
            return (
              <motion.li key={item.id} variants={cardItem} className="group h-full">
                <Link
                  prefetch
                  href={toHref(item.href)}
                  className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-[#c5a059]/35 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85),0_0_0_1px_rgba(197,160,89,0.12)] max-md:min-h-[296px] md:min-h-[300px]"
                >
                  {hasImage && item.imageSrc ? (
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-lead-900">
                      <Image
                        src={watermarkedSrc(item.imageSrc)}
                        alt={imageAlt}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        quality={82}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#111111]/85 via-transparent to-black/10"
                        aria-hidden
                      />
                    </div>
                  ) : null}
                  <div
                    className={`flex flex-1 flex-col p-6 max-md:p-7 md:p-7 ${hasImage ? 'pt-5' : 'pt-7'}`}
                  >
                    {!hasImage ? (
                      <div
                        className="mb-5 flex justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ color: gold }}
                      >
                        <Icon className="h-11 w-11 md:h-12 md:w-12" />
                      </div>
                    ) : null}
                    <h3
                      className={`${playfair.className} text-center text-lg font-semibold leading-snug text-white md:text-xl`}
                    >
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-center text-sm leading-relaxed text-slate-400">
                      {description}
                    </p>
                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/[0.06] pt-5">
                      <span
                        className="inline-flex items-center gap-1 font-display text-[11px] font-semibold uppercase tracking-wider transition-colors group-hover:text-[#d4b87a]"
                        style={{ color: gold }}
                      >
                        {t('home.services.detailCta')}
                        <span aria-hidden>→</span>
                      </span>
                      <span className="shrink-0 text-right font-mono text-[10px] text-slate-500 md:text-[11px]">
                        {phoneDisplay}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
