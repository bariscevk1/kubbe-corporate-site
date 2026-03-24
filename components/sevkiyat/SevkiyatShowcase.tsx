'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag-events';

const easeOut = [0.22, 1, 0.36, 1] as const;

type VideoItem = {
  id: string;
  title: string;
  city?: string;
  year?: string;
};

type ShipmentImageItem = {
  id: string;
  title: string;
};

const PHONE = '05323236627';

const VIDEOS: readonly VideoItem[] = [
  { id: '03', title: 'Sevkiyat kaydı', city: 'Ankara', year: '2024' },
  { id: '04', title: 'Sevkiyat kaydı', city: 'Bursa', year: '2024' },
  { id: '05', title: 'Sevkiyat kaydı', city: 'Konya', year: '2025' },
  { id: '06', title: 'Sevkiyat kaydı', city: 'Gaziantep', year: '2025' },
  { id: '07', title: 'Sevkiyat kaydı', city: 'Istanbul', year: '2025' },
  { id: '08', title: 'Sevkiyat kaydı', city: 'Edirne', year: '2025' },
  { id: '01', title: 'Sevkiyat kaydı', city: 'Adana', year: '2023' },
  { id: '02', title: 'Sevkiyat kaydı', city: 'Sakarya', year: '2023' },
];

const IMAGES: readonly ShipmentImageItem[] = [
  { id: '01', title: 'Sevkiyat fotografi 01' },
  { id: '02', title: 'Sevkiyat fotografi 02' },
  { id: '03', title: 'Sevkiyat fotografi 03' },
  { id: '04', title: 'Sevkiyat fotografi 04' },
  { id: '05', title: 'Sevkiyat fotografi 05' },
  { id: '06', title: 'Sevkiyat fotografi 06' },
  { id: '07', title: 'Sevkiyat fotografi 07' },
  { id: '08', title: 'Sevkiyat fotografi 08' },
  { id: '09', title: 'Sevkiyat fotografi 09' },
  { id: '10', title: 'Sevkiyat fotografi 10' },
  { id: '11', title: 'Sevkiyat fotografi 11' },
  { id: '12', title: 'Sevkiyat fotografi 12' },
  { id: '13', title: 'Sevkiyat fotografi 13' },
  { id: '14', title: 'Sevkiyat fotografi 14' },
  { id: '15', title: 'Sevkiyat fotografi 15' },
];

function videoSrc(id: string) {
  return `/api/sevkiyat-video/${id}`;
}

function imageSrc(id: string) {
  return `/api/sevkiyat-image/${id}`;
}

type VideoPreviewTileProps = {
  v: VideoItem;
  idx: number;
  reduce: boolean;
  onOpen: (id: string) => void;
};

function VideoPreviewTile({ v, idx, reduce, onOpen }: VideoPreviewTileProps) {
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(idx * 0.04, 0.2), ease: easeOut }}
    >
      <button
        type="button"
        onClick={() => onOpen(v.id)}
        aria-label={`${v.city || 'Sevkiyat'} ${v.year ? `· ${v.year}` : ''} — videoyu ac, videolar arasi gec`}
        className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1216] text-left transition hover:border-[#c5a059]/35"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <video
            src={videoSrc(v.id)}
            className="pointer-events-none relative z-0 h-full w-full object-cover"
            muted
            playsInline
            loop
            preload="metadata"
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.18),transparent_55%)]" />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] p-3 text-left">
            <p className="text-sm font-semibold text-white drop-shadow">
              {v.city || 'Türkiye'}
              {v.year ? ` · ${v.year}` : ''}
            </p>
            <p className="mt-0.5 line-clamp-2 text-xs text-slate-300/95">{v.title}</p>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/55 text-2xl text-white shadow-lg backdrop-blur-sm transition group-hover:scale-105"
              aria-hidden
            >
              ▶
            </span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

const videoSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '85%' : '-85%',
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (dir: number) => ({
    x: dir > 0 ? '-85%' : '85%',
    opacity: 0,
    filter: 'blur(6px)',
  }),
};

export function SevkiyatShowcase() {
  const reduce = useReducedMotion() ?? false;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [videoSlideDir, setVideoSlideDir] = useState(1);
  const videoStageRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeIndex = useMemo(() => VIDEOS.findIndex((v) => v.id === activeId), [activeId]);
  const active = activeIndex >= 0 ? VIDEOS[activeIndex] : null;
  const activeImageIndex = useMemo(
    () => IMAGES.findIndex((i) => i.id === activeImageId),
    [activeImageId],
  );
  const activeImage = activeImageIndex >= 0 ? IMAGES[activeImageIndex] : null;

  const tel = telHrefTr(PHONE);
  const wa = waHrefTr(PHONE);
  const phoneLabel = formatPhoneDisplay(PHONE);

  const prev = useCallback(() => {
    if (activeIndex < 0) return;
    const i = (activeIndex - 1 + VIDEOS.length) % VIDEOS.length;
    flushSync(() => setVideoSlideDir(-1));
    setActiveId(VIDEOS[i].id);
  }, [activeIndex]);

  const next = useCallback(() => {
    if (activeIndex < 0) return;
    const i = (activeIndex + 1) % VIDEOS.length;
    flushSync(() => setVideoSlideDir(1));
    setActiveId(VIDEOS[i].id);
  }, [activeIndex]);

  const goToVideo = useCallback(
    (id: string) => {
      const nextIdx = VIDEOS.findIndex((v) => v.id === id);
      if (nextIdx < 0) return;
      if (activeIndex >= 0 && nextIdx !== activeIndex) {
        flushSync(() => setVideoSlideDir(nextIdx > activeIndex ? 1 : -1));
      }
      setActiveId(id);
    },
    [activeIndex],
  );

  /** Tarayici tam ekrani: modal acikken video alani; kapatinca cik */
  useEffect(() => {
    if (!activeId) {
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }
      return;
    }
    const raf = requestAnimationFrame(() => {
      const el = videoStageRef.current;
      if (!el) return;
      if (document.fullscreenElement !== el) {
        void el.requestFullscreen?.().catch(() => {});
      }
    });
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setActiveId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, prev, next]);

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
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d10]/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
                Video arsivi
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                Sevkiyat kayitlari
              </h2>
              <p className="mt-2 max-w-3xl text-slate-300">
                Videoya tiklayinca genis izleme acilir (sessiz). Ok tuslari veya yan oklarla videolar arasinda
                gecin; mobilde saga/sola kaydirin. Alt seritten istediginiz kayda gecebilirsiniz.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('sevkiyat_page')}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200 transition hover:bg-emerald-500/22"
              >
                WhatsApp
                <span aria-hidden>↗</span>
              </a>
              <a
                href={tel}
                onClick={() => trackPhoneClick('sevkiyat_page')}
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                Hizli arama
                <span aria-hidden>{phoneLabel}</span>
              </a>
            </div>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VIDEOS.map((v, idx) => (
              <VideoPreviewTile key={v.id} v={v} idx={idx} reduce={reduce} onOpen={goToVideo} />
            ))}
          </ul>

          <p className="mt-6 text-xs text-slate-500">
            Donusum takibi: WhatsApp ve telefon butonlari event/conversion tetikler. Gerekirse{' '}
            <Link href="/tesekkurler" className="text-brand-muted underline-offset-2 hover:underline">
              Tesekkurler
            </Link>{' '}
            sayfasi kampanya hedefi olarak kullanilabilir.
          </p>
        </div>
      </section>

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
                    <Image
                      src={imageSrc(img.id)}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={76}
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
        {active ? (
          <motion.div
            className="fixed inset-0 z-[140] bg-black/92 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              ref={videoStageRef}
              className="flex h-full min-h-0 w-full flex-col bg-black/95 p-3 md:p-6"
            >
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute right-3 top-3 z-[150] rounded-full border border-white/20 bg-black/55 p-2 text-white transition hover:bg-black/75 md:right-6 md:top-6"
                aria-label="Videoyu kapat"
              >
                ✕
              </button>

              <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col">
                <div
                  className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center overflow-hidden"
                  onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                  }}
                  onTouchEnd={(e) => {
                    if (touchStartX.current == null) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    touchStartX.current = null;
                    if (Math.abs(dx) < 48) return;
                    if (dx > 0) prev();
                    else next();
                  }}
                >
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Onceki video"
                    className="absolute left-1 z-[145] rounded-full border border-white/20 bg-black/55 p-2.5 text-white transition hover:bg-black/75 md:left-0"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Sonraki video"
                    className="absolute right-1 z-[145] rounded-full border border-white/20 bg-black/55 p-2.5 text-white transition hover:bg-black/75 md:right-0"
                  >
                    ›
                  </button>

                  <div className="relative h-full max-h-[78vh] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                    <AnimatePresence mode="wait" initial={false} custom={videoSlideDir}>
                      <motion.div
                        key={active.id}
                        layout={false}
                        custom={videoSlideDir}
                        variants={
                          reduce
                            ? {
                                enter: { opacity: 0 },
                                center: { opacity: 1 },
                                exit: { opacity: 0 },
                              }
                            : videoSlideVariants
                        }
                        initial={reduce ? false : 'enter'}
                        animate="center"
                        exit={reduce ? undefined : 'exit'}
                        transition={{ duration: reduce ? 0.15 : 0.38, ease: easeOut }}
                        className="absolute inset-0"
                      >
                        <video
                          src={videoSrc(active.id)}
                          className="h-full w-full object-contain"
                          playsInline
                          autoPlay
                          preload="auto"
                          loop
                          muted
                          controlsList="nodownload noplaybackrate noremoteplayback"
                          disablePictureInPicture
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-3 shrink-0 rounded-xl border border-white/10 bg-black/35 px-3 py-2.5">
                  <p className="font-display text-sm font-semibold text-white md:text-base">
                    {active.city || 'Türkiye'}
                    {active.year ? ` · ${active.year}` : ''}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">{active.title}</p>
                </div>

                <div className="mt-3 shrink-0 overflow-x-auto pb-1">
                  <div className="flex min-w-max gap-2">
                    {VIDEOS.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => goToVideo(v.id)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                          v.id === active.id
                            ? 'border-[#c5a059]/70 bg-[#c5a059]/12 text-[#e8d5a3]'
                            : 'border-white/15 bg-white/[0.03] text-slate-300 hover:border-white/30'
                        }`}
                      >
                        {v.city || 'Türkiye'}
                        {v.year ? ` · ${v.year}` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
                  <Image
                    src={imageSrc(activeImage.id)}
                    alt={activeImage.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={86}
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
                      <Image
                        src={imageSrc(img.id)}
                        alt={img.title}
                        fill
                        className="object-cover"
                        sizes="140px"
                        quality={60}
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

