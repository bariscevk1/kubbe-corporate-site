'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { HOME_STATS_HEADING, HOME_STATS_ITEMS } from '@/lib/content/home-stats';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const ease = [0.22, 1, 0.36, 1] as const;

/** Referans görseliyle uyumlu altın */
const gold = '#c5a059';

function formatTrInteger(n: number): string {
  return Math.max(0, Math.round(n)).toLocaleString('tr-TR');
}

type CountCellProps = {
  target: number;
  active: boolean;
  reduceMotion: boolean;
  /** Sütun sırasına göre hafif gecikme (stagger) */
  delayMs: number;
};

/**
 * Görünür alanda tetiklenen sayaç — ease-out cubic
 */
function AnimatedStatNumber({
  target,
  active,
  reduceMotion,
  delayMs,
}: CountCellProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setDisplay(target);
      return;
    }

    setDisplay(0);
    const duration = 2200;
    let raf = 0;
    const startAt = performance.now() + delayMs;

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startAt;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduceMotion, delayMs]);

  return <span className="tabular-nums">{formatTrInteger(display)}</span>;
}

function IconDocument({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4v18" />
      <path d="M19 21V11l-7-4" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </svg>
  );
}

/** Soyut figür — memnuniyet / insan odağı */
function IconPersonInfinity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20v-1.5a6 6 0 0 1 12 0V20" />
      <path d="M8.5 7.5a3 3 0 0 0 3.5 3.5" />
      <path d="M15.5 7.5a3 3 0 0 1-3.5 3.5" />
    </svg>
  );
}

function IconHouse({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 10 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

const ICONS = [IconDocument, IconBuilding, IconPersonInfinity, IconHouse] as const;

export function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px -8% 0px' });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) setActive(true);
  }, [inView]);

  const t = (seconds: number) => (reduce ? 0 : seconds);

  const headerVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: t(0.7), ease },
    },
  };

  const gridContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: t(0.12), delayChildren: t(0.12) },
    },
  };

  const gridItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: t(0.55), ease },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="basari-rakamlari"
      aria-labelledby="stats-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#060606]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(ellipse 90% 60% at 50% -10%, ${gold}14, transparent 50%)`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          animate={active ? 'show' : 'hidden'}
          variants={headerVariants}
        >
          <h2
            id="stats-heading"
            className="font-display text-[11px] font-semibold uppercase tracking-[0.38em] text-[#c5a059] md:text-xs"
          >
            {HOME_STATS_HEADING}
          </h2>
          <div
            className="mx-auto mt-6 h-px w-20 opacity-80"
            style={{
              background: `linear-gradient(90deg, transparent, ${gold}88, transparent)`,
            }}
            aria-hidden
          />
        </motion.div>

        <motion.ul
          className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          animate={active ? 'show' : 'hidden'}
          variants={gridContainer}
        >
          {HOME_STATS_ITEMS.map((item, idx) => {
            const Icon = ICONS[idx] ?? IconDocument;
            return (
              <motion.li
                key={item.id}
                variants={gridItem}
                className="group flex flex-col items-center text-center"
              >
                <div
                  className="mb-5 transition-transform duration-300 group-hover:scale-105"
                  style={{ color: gold }}
                >
                  <Icon className="h-9 w-9 md:h-10 md:w-10" />
                </div>
                <p
                  className={`${playfair.className} text-4xl font-semibold tracking-tight md:text-5xl`}
                  style={{ color: gold }}
                >
                  <AnimatedStatNumber
                    target={item.value}
                    active={active}
                    reduceMotion={!!reduce}
                    delayMs={idx * 120}
                  />
                </p>
                <p className="mt-3 max-w-[240px] font-display text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#c5a059]/90 md:text-[11px] md:tracking-[0.2em]">
                  {item.label}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
