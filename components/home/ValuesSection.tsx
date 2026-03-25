'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HOME_VALUES_ITEMS } from '@/lib/content/home-values';

const ease = [0.22, 1, 0.36, 1] as const;

/** Altın/bronz vurgu — siyah zeminde okunaklı */
const gold = 'text-[#c9a55c]';

function IconKalite({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 20V10" />
      <path d="M12 20V4" />
      <path d="M19 20v-6" />
    </svg>
  );
}

function IconDeneyim({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconGuven({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 5 6v5c0 5.25 3.5 9.75 7 11 3.5-1.25 7-5.75 7-11V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconTeslimat({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 18V8a2 2 0 0 0-2-2H3v12h2.5" />
      <path d="M14 9h4l3 3v6h-3" />
      <circle cx="7.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

const ICONS = [IconKalite, IconDeneyim, IconGuven, IconTeslimat] as const;

/**
 * Anasayfa — Hakkımızda altı: dört sütunlu kurumsal değerler bloğu.
 */
export function ValuesSection() {
  const { t } = useTranslation('common');
  const reduce = useReducedMotion();
  const anim = (seconds: number) => (reduce ? 0 : seconds);

  const headerContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: anim(0.14), delayChildren: anim(0.08) },
    },
  };

  const headerItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: anim(0.65), ease },
    },
  };

  const gridContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: anim(0.11), delayChildren: anim(0.25) },
    },
  };

  const gridItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: anim(0.58), ease },
    },
  };

  return (
    <section
      id="degerlerimiz"
      aria-labelledby="values-heading"
      className="relative overflow-hidden border-t border-white/[0.07] bg-black"
    >
      {/* Dekoratif arka plan harfi — “Mükemmellik” */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden
      >
        <motion.span
          className="font-display text-[min(52vw,520px)] font-bold leading-none text-white/[0.035]"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: reduce ? 0 : 1.2, ease }}
        >
          M
        </motion.span>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(6,78,59,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 max-md:px-5 max-md:py-24 md:px-6 md:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-12% 0px' }}
        >
          <motion.h2
            id="values-heading"
            variants={headerItem}
            className="font-display text-3xl font-bold uppercase tracking-[0.22em] text-white md:text-4xl md:tracking-[0.28em]"
          >
            {t('home.values.heading')}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className={`mt-5 font-display text-[11px] font-semibold uppercase tracking-[0.42em] md:text-xs ${gold}`}
          >
            {t('home.values.subtitle')}
          </motion.p>
          <motion.div
            variants={headerItem}
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a55c]/50 to-transparent"
            aria-hidden
          />
        </motion.div>

        <motion.ul
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {HOME_VALUES_ITEMS.map((item, idx) => {
            const Icon = ICONS[idx] ?? IconKalite;
            return (
              <motion.li key={item.id} variants={gridItem} className="group relative">
                <div
                  className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-[border-color,box-shadow,transform] duration-500 ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.04] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 md:p-7 lg:hover:-translate-y-1 lg:hover:border-[#c9a55c]/25 lg:hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65),0_0_40px_-12px_rgba(201,165,92,0.12)]"
                >
                  <div className="mb-5 inline-flex rounded-lg border border-[#c9a55c]/20 bg-[#c9a55c]/[0.06] p-2.5 text-[#c9a55c] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#c9a55c]/35">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                    {t(`home.values.items.${item.id}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-[15px]">
                    {t(`home.values.items.${item.id}.body`)}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
