'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { watermarkedSrc } from '@/lib/media/watermarked-src';
import { HOME_SERVICES_TEASER_ITEMS } from '@/lib/content/home-services-teaser';

const ease = [0.22, 1, 0.36, 1] as const;
const gold = '#c5a059';

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
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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

  const syncScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 8);
  }, []);

  useEffect(() => {
    syncScrollState();
    const el = sliderRef.current;
    if (!el) return;

    el.addEventListener('scroll', syncScrollState, { passive: true });
    window.addEventListener('resize', syncScrollState);

    return () => {
      el.removeEventListener('scroll', syncScrollState);
      window.removeEventListener('resize', syncScrollState);
    };
  }, [syncScrollState]);

  const scrollCards = useCallback((dir: -1 | 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.82, 280);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  return (
    <section
      id="hizmetler-ozet"
      aria-labelledby="services-teaser-heading"
      className="relative overflow-hidden border-t border-[rgba(15,23,42,0.05)] bg-white"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-6 max-md:px-4 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.p
            variants={headerItem}
            className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] md:text-xs md:tracking-[0.38em]"
            style={{ color: gold }}
          >
            {t('home.services.kicker')}
          </motion.p>
          <motion.div variants={headerItem} className="mt-2 flex items-center justify-between gap-2 md:mt-3 md:gap-3">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Onceki hizmet kartlari"
              disabled={!canScrollPrev}
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[var(--text-heading)] shadow-[0_8px_18px_-16px_rgba(15,23,42,0.12)] transition md:h-12 md:w-12 ${
                canScrollPrev
                  ? 'border-[rgba(15,23,42,0.14)] bg-white hover:border-[rgba(15,23,42,0.24)] hover:bg-white'
                  : 'cursor-not-allowed border-[rgba(15,23,42,0.08)] bg-white/70 text-slate-300'
              }`}
            >
              <span aria-hidden className="text-[1.35rem] leading-none md:text-[2rem]">
                ←
              </span>
            </button>
            <div className="min-w-0 flex-1 text-center">
              <h2
                id="services-teaser-heading"
                className="text-[1.35rem] font-semibold leading-tight tracking-tight text-[var(--text-heading)] md:text-4xl lg:text-[2.65rem]"
              >
                {t('home.services.title')}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Sonraki hizmet kartlari"
              disabled={!canScrollNext}
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[var(--text-heading)] shadow-[0_8px_18px_-16px_rgba(15,23,42,0.12)] transition md:h-12 md:w-12 ${
                canScrollNext
                  ? 'border-[rgba(15,23,42,0.14)] bg-white hover:border-[rgba(15,23,42,0.24)] hover:bg-white'
                  : 'cursor-not-allowed border-[rgba(15,23,42,0.08)] bg-white/70 text-slate-300'
              }`}
            >
              <span aria-hidden className="text-[1.35rem] leading-none md:text-[2rem]">
                →
              </span>
            </button>
          </motion.div>
          <motion.p
            variants={headerItem}
            className="mx-auto mt-2 hidden max-w-xl text-center text-[13px] leading-6 text-slate-600 md:mt-4 md:block md:max-w-2xl md:text-base md:leading-relaxed"
          >
            {t('home.services.leadBefore')}
            <Link prefetch href={servicesPath} className="text-[#c5a059]/90 underline-offset-4 hover:underline">
              {t('home.services.leadLink')}
            </Link>
            {t('home.services.leadAfter')}
          </motion.p>
          <motion.div variants={headerItem} className="mt-3 hidden justify-center md:mt-8 md:flex">
            <Link
              prefetch
              href={servicesPath}
              className="group inline-flex items-center gap-2 rounded-xl border border-[rgba(15,23,42,0.12)] bg-white px-5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-heading)] shadow-[0_8px_18px_-16px_rgba(15,23,42,0.12)] transition hover:border-[rgba(15,23,42,0.2)] hover:bg-slate-50 md:px-6 md:py-2.5 md:text-sm"
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
          ref={sliderRef}
          className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-12 md:gap-5 md:pb-3"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {HOME_SERVICES_TEASER_ITEMS.map((item) => {
            const gridBase = `home.services.grid.${item.id}` as const;
            const title = t(`${gridBase}.title`);
            const description = t(`${gridBase}.description`);
            const imageAlt = t(`${gridBase}.imageAlt`);
            return (
              <motion.li
                key={item.id}
                variants={cardItem}
                className="group h-full min-w-[78vw] snap-start sm:min-w-[46vw] lg:min-w-[31.5%] xl:min-w-[23.5%]"
              >
                <Link
                  prefetch
                  href={toHref(item.href)}
                  className="relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.07)] bg-white shadow-[0_10px_24px_-20px_rgba(15,23,42,0.1)] transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-[rgba(15,23,42,0.14)] hover:shadow-[0_14px_28px_-22px_rgba(15,23,42,0.12)] md:min-h-[300px] md:rounded-[24px]"
                >
                  {item.imageSrc ? (
                    <>
                      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-200 md:aspect-[4/3]">
                        <Image
                          src={watermarkedSrc(item.imageSrc)}
                          alt={imageAlt}
                          fill
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, (max-width: 1280px) 31vw, 24vw"
                          quality={82}
                        />
                      </div>
                      <div
                        className="border-t border-[rgba(15,23,42,0.08)] bg-[#f8f9fb] px-3 py-2 text-center md:px-5 md:py-3.5"
                        style={{ backgroundColor: '#f8f9fb' }}
                      >
                        <h3
                          className="text-[0.9rem] font-bold leading-snug tracking-[0.01em] !text-[#18212b] md:text-[1.08rem]"
                          style={{ color: '#18212b' }}
                        >
                          {title}
                        </h3>
                      </div>
                    </>
                  ) : null}
                  <div className="flex flex-1 flex-col p-3 md:p-6">
                    <p className="line-clamp-3 flex-1 text-left text-[13px] font-medium leading-[1.45] text-slate-700 md:line-clamp-none md:text-base md:leading-7">
                      {description}
                    </p>
                    <div className="mt-2 hidden justify-start sm:flex">
                      <span className="inline-flex items-center rounded-full border border-[rgba(15,23,42,0.1)] bg-slate-50 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-slate-600 md:text-[11px]">
                        {phoneDisplay}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-start md:mt-3">
                      <span className="inline-flex min-h-[36px] min-w-[100px] items-center justify-center rounded-xl border border-[rgba(15,23,42,0.26)] bg-white px-4 text-center text-[13px] font-semibold text-[var(--text-heading)] shadow-[0_8px_18px_-16px_rgba(15,23,42,0.08)] transition group-hover:bg-slate-50 md:min-h-[48px] md:min-w-[132px] md:rounded-2xl md:px-6 md:text-[15px]">
                        İncele
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
