'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { waHrefTr } from '@/lib/phone';
import { HERO_LEFT_IMAGE, HERO_RIGHT_IMAGE, HERO_SLIDES } from '@/lib/brand-assets';
import { trackHeroTeklifClick, trackHeroWhatsAppClick } from '@/lib/analytics/gtag-events';
import { useLocalizedPath } from '@/components/i18n/useLocalizedPath';
import { watermarkedSrc } from '@/lib/media/watermarked-src';

const easeLux = [0.22, 1, 0.36, 1] as const;
const AUTO_SLIDE_MS = 4000;

export type HeroSplitSectionProps = {
  phone: string;
  leftTitle?: string;
  leftSubtitle?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  leftImageSrc?: string;
  rightImageSrc?: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  brandWordPrimary?: string;
  brandWordAccent?: string;
  leftColumnCta?: { href: string; label: string };
  rightColumnCta?: { href: string; label: string };
};

export function HeroSplitSection({
  phone,
  leftTitle,
  leftSubtitle,
  rightTitle,
  rightSubtitle,
  leftImageSrc = HERO_LEFT_IMAGE,
  rightImageSrc = HERO_RIGHT_IMAGE,
  logoUrl,
  logoAlt,
}: HeroSplitSectionProps) {
  const { t } = useTranslation('common');
  const toHref = useLocalizedPath();
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = useMemo(
    () => [
      { src: watermarkedSrc(leftImageSrc), alt: t('home.hero.imageLeftAlt') || HERO_SLIDES[0].alt },
      { src: watermarkedSrc(rightImageSrc), alt: t('home.hero.imageRightAlt') || HERO_SLIDES[1].alt },
      ...HERO_SLIDES.slice(2).map((slide) => ({ ...slide, src: watermarkedSrc(slide.src) })),
    ],
    [leftImageSrc, rightImageSrc, t],
  );

  const [loadedSlides, setLoadedSlides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoadedSlides((current) => ({
      ...current,
      [slides[0]?.src ?? '']: true,
    }));
  }, [slides]);

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    slides.forEach((slide) => {
      if (loadedSlides[slide.src]) return;
      const img = new window.Image();
      img.src = slide.src;
      img.onload = () => {
        setLoadedSlides((current) => ({ ...current, [slide.src]: true }));
      };
    });
  }, [loadedSlides, slides]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const brandLine = t('home.hero.brandLine') || 'Turgut Coşkun Camii Kubbe Kaplama';
  const title = leftTitle ?? t('home.hero.leftTitle');
  const subtitle = leftSubtitle ?? t('home.hero.leftSubtitle');
  const secondaryTitle = rightTitle ?? t('home.hero.rightTitle');
  const secondarySubtitle = rightSubtitle ?? t('home.hero.rightSubtitle');
  const resolvedLogoAlt = logoAlt?.trim() || t('home.hero.logoAlt');
  const quoteHref = toHref('/iletisim');
  const whatsappHref = waHrefTr(phone);
  const servicesHref = toHref('/hizmetler');
  const projectsHref = toHref('/projeler');
  const prevSlide = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const nextSlide = () => setActiveIndex((current) => (current + 1) % slides.length);

  return (
    <section
      className="hero-tech-overlay relative overflow-hidden"
      aria-label={t('home.hero.ariaSection')}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative grid min-h-[620px] grid-cols-1 md:min-h-[100vh] md:grid-cols-[minmax(340px,38%)_1fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: easeLux }}
          className="relative z-10 order-2 flex bg-black/[0.68] px-5 py-8 backdrop-blur-md max-md:border-t max-md:border-white/10 sm:px-6 md:order-1 md:min-h-[100vh] md:items-center md:bg-black/[0.48] md:px-8 lg:px-10"
        >
          <div className="w-full max-w-[32rem]">
            {logoUrl ? (
              <div className="mb-5">
                <Image
                  src={logoUrl}
                  alt={resolvedLogoAlt}
                  width={220}
                  height={66}
                  priority
                  className="h-10 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.48)] sm:h-12"
                />
              </div>
            ) : null}

            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e8d5a3] sm:text-xs">
              {brandLine}
            </p>
            <h1 className="mt-4 max-w-[13ch] font-display text-[clamp(2rem,8vw,4.8rem)] font-bold leading-[0.98] tracking-tight text-white md:max-w-[10ch]">
              {title}
            </h1>
            <p className="mt-5 max-w-[32rem] text-[clamp(0.98rem,3.8vw,1.125rem)] leading-relaxed text-slate-100/95">
              {subtitle}
            </p>
            <p className="mt-4 max-w-[32rem] text-[clamp(0.9rem,3.5vw,1rem)] leading-relaxed text-slate-200/85">
              <span className="font-semibold text-white">{secondaryTitle}</span>
              {' · '}
              {secondarySubtitle}
            </p>

            <div className="mt-7 flex max-w-[32rem] flex-wrap gap-3">
              <Link
                prefetch
                href={quoteHref}
                onClick={() => trackHeroTeklifClick()}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(47,124,103,0.8)] ring-1 ring-white/15 transition hover:bg-brand-light"
              >
                {t('home.hero.ctaQuote')}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackHeroWhatsAppClick()}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/[0.12]"
              >
                {t('home.hero.ctaWhatsapp')}
              </a>
              <Link
                prefetch
                href={servicesHref}
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[#c5a059]/45 bg-[#c5a059]/10 px-5 py-3 text-center font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-[#f4e5bc] transition hover:bg-[#c5a059]/18"
              >
                {t('home.hero.colCtaServices')}
              </Link>
              <Link
                prefetch
                href={projectsHref}
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/15 bg-black/[0.18] px-5 py-3 text-center font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-black/[0.28]"
              >
                {t('home.hero.colCtaProjects')}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-200/90">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e8d5a3]">
                {t('home.hero.kickerBadge1')}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden />
              <span>{t('home.hero.kickerBadge2')}</span>
            </div>
          </div>
        </motion.div>

        <div className="group relative order-1 min-h-[58vh] bg-[#1a1a1a] sm:min-h-[64vh] md:order-2 md:min-h-[100vh]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: easeLux }}
                style={{ zIndex: isActive ? 2 : 1 }}
                aria-hidden={!isActive}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={
                    isActive && !reduceMotion
                      ? isMobile
                        ? { scale: 1.04, x: 0 }
                        : { scale: 1.12, x: -12 }
                      : { scale: 1.02, x: 0 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.2 : isMobile ? 0.6 : AUTO_SLIDE_MS + 1800,
                    ease: 'easeOut',
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    sizes="(max-width: 768px) 100vw, 62vw"
                    quality={index === 0 ? 82 : 74}
                    className="bg-[#1a1a1a] object-cover object-center"
                    onLoad={() => {
                      setLoadedSlides((current) => ({ ...current, [slide.src]: true }));
                    }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,20,0.10),rgba(6,14,20,0.18)_42%,rgba(6,14,20,0.42)_100%)] md:bg-[linear-gradient(180deg,rgba(6,14,20,0.04),rgba(6,14,20,0.12)_40%,rgba(6,14,20,0.28)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),rgba(0,0,0,0.20))]" />
                {!loadedSlides[slide.src] ? <div className="absolute inset-0 bg-[#1a1a1a]" /> : null}
              </motion.div>
            );
          })}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Onceki hero gorseli"
            className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/[0.28] text-white/90 opacity-0 backdrop-blur-sm transition duration-300 hover:bg-black/[0.4] hover:text-white group-hover:flex group-hover:opacity-100 md:flex"
          >
            <span aria-hidden className="text-xl leading-none">
              ‹
            </span>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Sonraki hero gorseli"
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/[0.28] text-white/90 opacity-0 backdrop-blur-sm transition duration-300 hover:bg-black/[0.4] hover:text-white group-hover:flex group-hover:opacity-100 md:flex"
          >
            <span aria-hidden className="text-xl leading-none">
              ›
            </span>
          </button>

          <div className="absolute inset-x-0 bottom-6 z-10">
            <div className="flex items-center justify-center gap-2 px-4 md:justify-end md:px-8">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Hero gorseli ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-white/10' : 'bg-black/10 hover:bg-white/10'
                  }`}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-14 bg-[#e8d5a3]' : 'w-7 bg-white/[0.35] hover:bg-white/[0.55]'
                    }`}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
