'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ease = [0.22, 1, 0.36, 1] as const;

const IMAGE_ALT_DEFAULT =
  'Kaplama renk kartelası: RAL 5010 Gök Mavisi, RAL 5018 Turkuaz, RAL 6016 Koyu Yeşil, RAL 6018 Fıstık Yeşili, RAL 6032 Yeşil, RAL 7024 Füme, RAL 9006 Gri, RAL 9016 Beyaz, AH 12 Bakır, AA 07 Altın Sarısı.';

export function PremiumColorPaletteSection() {
  const { t } = useTranslation('common');
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="premium-color-palette-heading"
      className="relative overflow-hidden border-t border-[rgba(15,23,42,0.05)] bg-white"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-5 max-md:px-4 md:px-6 md:py-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c5a059] md:text-[11px]">
            {t('home.palette.kicker', { defaultValue: 'Premium Construction Finish' })}
          </p>
          <h2
            id="premium-color-palette-heading"
            className="mt-2 text-lg font-semibold leading-snug tracking-tight text-[var(--text-heading)] md:mt-3 md:text-[2rem]"
          >
            {t('home.palette.title', { defaultValue: 'Premium Metal Renk Kartelasi' })}
          </h2>
          <p className="mx-auto mt-2 hidden max-w-xl text-sm leading-relaxed text-slate-600 md:mt-3 md:block">
            {t('home.palette.lead', {
              defaultValue: 'Projeleriniz icin sundugumuz yuksek kaliteli metal kaplama renklerini kesfedin.',
            })}
          </p>
        </motion.div>

        <motion.figure
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.55, ease, delay: 0.06 }}
          className="mt-4 overflow-hidden rounded-xl border border-[rgba(15,23,42,0.08)] bg-slate-50 shadow-[0_8px_20px_-18px_rgba(15,23,42,0.1)] md:mt-6"
        >
          <Image
            src="/home/renk-kartelasi.png"
            alt={t('home.palette.imageAlt', { defaultValue: IMAGE_ALT_DEFAULT })}
            width={960}
            height={216}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 1152px"
            priority={false}
          />
        </motion.figure>
      </div>
    </section>
  );
}
