'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ProtectedImage } from '@/components/ProtectedImage';
import { SevkiyatVideoArchiveLazy } from '@/components/sevkiyat/SevkiyatVideoArchiveLazy';
import {
  SEVKIYAT_IMAGES as IMAGES,
  sevkiyatImageSrc as imageSrc,
} from '@/components/sevkiyat/sevkiyat-data';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SevkiyatShowcase() {
  const reduce = useReducedMotion() ?? false;
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const activeImageIndex = useMemo(
    () => IMAGES.findIndex((i) => i.id === activeImageId),
    [activeImageId],
  );
  const activeImage = activeImageIndex >= 0 ? IMAGES[activeImageIndex] : null;

  const prevImage = () => {
    if (activeImageIndex < 0) return;
    const i = (activeImageIndex - 1 + IMAGES.length) % IMAGES.length;
    setActiveImageId(IMAGES[i].id);
  };

  const nextImage = () => {
    if (activeImageIndex < 0) return;
    const i = (activeImageIndex + 1) % IMAGES.length;
    setActiveImageId(IMAGES[i].id);
  };

  return (
    <>
      <SevkiyatVideoArchiveLazy />

      <section className="mx-auto max-w-6xl px-4 py-3 md:px-6 md:py-5">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d10]/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
                Fotograf arsivi
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                Sevkiyat fotograflari
              </h2>
              <p className="mt-2 max-w-3xl text-slate-300">
                Tum fotograflar web formatinda sunulur ve telefon numarasi filigrani ile korunur.
              </p>
            </div>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {IMAGES.map((img, idx) => (
              <motion.li
                key={img.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(idx * 0.03, 0.22), ease: easeOut }}
              >
                <button
                  type="button"
                  onClick={() => setActiveImageId(img.id)}
                  className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1216] text-left transition hover:border-[#c5a059]/35"
                >
                  <div className="relative aspect-[4/3]">
                    <ProtectedImage
                      src={imageSrc(img.id)}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={76}
                      wrapClassName="block h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-sm font-semibold text-white">{img.title}</p>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[150] bg-black/92 p-3 backdrop-blur-sm md:p-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setActiveImageId(null)}
              className="absolute right-3 top-3 z-[160] rounded-full border border-white/20 bg-black/55 p-2 text-white transition hover:bg-black/75 md:right-6 md:top-6"
              aria-label="Fotografi kapat"
            >
              ✕
            </button>

            <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
              <div className="relative flex min-h-0 flex-1 items-center justify-center">
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Onceki fotograf"
                  className="absolute left-1 z-[155] rounded-full border border-white/20 bg-black/55 p-2.5 text-white transition hover:bg-black/75 md:left-4"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Sonraki fotograf"
                  className="absolute right-1 z-[155] rounded-full border border-white/20 bg-black/55 p-2.5 text-white transition hover:bg-black/75 md:right-4"
                >
                  ›
                </button>

                <motion.div
                  key={activeImage.id}
                  initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.24, ease: easeOut }}
                  className="relative h-full max-h-[78vh] w-full overflow-hidden rounded-xl border border-white/10 bg-black"
                >
                  <ProtectedImage
                    src={imageSrc(activeImage.id)}
                    alt={activeImage.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={86}
                    wrapClassName="block h-full w-full"
                  />
                </motion.div>
              </div>

              <div className="mt-3 rounded-xl border border-white/10 bg-black/35 px-3 py-2.5">
                <p className="font-display text-sm font-semibold text-white md:text-base">{activeImage.title}</p>
              </div>

              <div className="mt-3 overflow-x-auto pb-1">
                <div className="flex min-w-max gap-2">
                  {IMAGES.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveImageId(img.id)}
                      className={`relative h-14 w-24 overflow-hidden rounded-lg border transition md:h-16 md:w-28 ${
                        img.id === activeImage.id
                          ? 'border-[#c5a059]/70 ring-1 ring-[#c5a059]/40'
                          : 'border-white/15 hover:border-white/30'
                      }`}
                      aria-label={`${img.title} sec`}
                    >
                      <ProtectedImage
                        src={imageSrc(img.id)}
                        alt={img.title}
                        fill
                        className="object-cover"
                        sizes="140px"
                        quality={60}
                        wrapClassName="block h-full w-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
