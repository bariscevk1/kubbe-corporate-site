'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { formatPhoneDisplay, telHrefTr, waHrefTr } from '@/lib/phone';
import { HERO_LEFT_IMAGE, HERO_RIGHT_IMAGE } from '@/lib/brand-assets';
import { trackHeroTeklifClick, trackHeroWhatsAppClick } from '@/lib/analytics/gtag-events';

/** Premium easing — yumuşak duruş */
const easeLux = [0.22, 1, 0.36, 1] as const;

/** prefers-reduced-motion: sade hâle indir */
function useHeroMotion() {
  const reduce = useReducedMotion();
  return {
    reduce: !!reduce,
    imgScale: reduce ? 1 : 1.08,
    imgScaleEnd: 1,
    logoFloat: reduce ? false : true,
  };
}

/** Köşe çerçeve — özgün SVG dekor */
function HeroCornerFrame({ side }: { side: 'left' | 'right' }) {
  const flip = side === 'right';
  return (
    <svg
      className={`pointer-events-none absolute bottom-6 z-[6] h-24 w-24 text-[var(--brand)] opacity-70 md:bottom-10 md:h-28 md:w-28 ${
        flip ? 'right-4 scale-x-[-1] md:right-8' : 'left-4 md:left-8'
      }`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M8 92V8h84"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: side === 'left' ? 0.5 : 0.65, ease: easeLux }}
      />
      <motion.circle
        cx="8"
        cy="92"
        r="3"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: side === 'left' ? 1.45 : 1.6, type: 'spring', stiffness: 400 }}
      />
    </svg>
  );
}

/** Orta dikey ışık çizgisi — split vurgusu */
function HeroCenterBeam() {
  const { reduce } = useHeroMotion();
  return (
    <div
      className="pointer-events-none absolute inset-y-[12%] left-[50%] z-[15] hidden w-[2px] -translate-x-1/2 md:block"
      aria-hidden
    >
      <motion.div
        className="h-full w-full origin-top bg-gradient-to-b from-transparent via-[var(--brand)]/90 to-transparent"
        initial={{ scaleY: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        animate={{ scaleY: 1, opacity: 0.85 }}
        transition={{ duration: 1.1, delay: 0.35, ease: easeLux }}
      />
      {!reduce && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

function HeroDividerLogo({
  logoUrl,
  logoAlt,
  brandWordPrimary,
  brandWordAccent,
}: {
  logoUrl: string | null;
  logoAlt: string;
  brandWordPrimary: string;
  brandWordAccent: string;
}) {
  const { reduce } = useHeroMotion();
  return (
    <motion.div
      className="pointer-events-none absolute left-[50%] top-[50%] z-[28] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.2, ease: easeLux }}
      aria-hidden
    >
      {logoUrl ? (
        <motion.div
          className="relative flex flex-col items-center -translate-x-[47%] -translate-y-[50%]"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.97, 1, 0.97],
                  filter: [
                    'drop-shadow(0 6px 18px rgba(0,0,0,0.95)) brightness(1)',
                    'drop-shadow(0 9px 24px rgba(0,0,0,0.98)) brightness(1.05)',
                    'drop-shadow(0 6px 18px rgba(0,0,0,0.95)) brightness(1)',
                  ],
                }
          }
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {!reduce ? (
            <motion.span
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(110deg, transparent 36%, rgba(255,255,255,0.16) 50%, transparent 64%)',
                mixBlendMode: 'screen',
              }}
              animate={{ x: ['-140%', '140%'] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: 'linear', repeatDelay: 1.6 }}
            />
          ) : null}
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={1135}
            height={338}
            className="relative z-[1] h-48 w-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.95)]"
            sizes="1135px"
            quality={96}
            priority
          />
        </motion.div>
      ) : (
        <p className="font-display text-xl font-semibold tracking-wide text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
          {brandWordPrimary} <span className="text-[#c5a059]">{brandWordAccent}</span>
        </p>
      )}
    </motion.div>
  );
}

function HeroCornerSignature({ phone }: { phone: string }) {
  const { reduce } = useHeroMotion();
  const phonePretty = formatPhoneDisplay(phone);
  const telHref = telHrefTr(phone);
  return (
    <motion.aside
      className="absolute bottom-5 left-5 z-[24] max-w-[min(90vw,560px)] md:bottom-8 md:left-8"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.18, ease: easeLux }}
      aria-label="Hero imza metni"
    >
      <p className="font-display text-base font-semibold uppercase tracking-[0.2em] text-[#e8d5a3] drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] md:text-xl">
        Turgut Usta
      </p>
      <p className="mt-2 max-w-[38ch] text-base leading-relaxed text-slate-100 drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] md:text-lg md:leading-[1.4]">
        Kubbe kaplama, alem ve oluk uygulamalarinda kurumsal disiplin ve uzun omurlu iscilik.
      </p>
      <motion.a
        href={telHref}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/35 bg-black/35 px-3 py-1.5 font-display text-sm font-semibold text-[#e8d5a3] shadow-[0_8px_18px_-10px_rgba(0,0,0,0.8)] backdrop-blur-sm"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32, ease: easeLux }}
      >
        <span className="uppercase tracking-[0.14em] text-[11px] text-slate-300">Hemen Arayin</span>
        <span className="text-base tracking-wide text-brand-muted">{phonePretty}</span>
      </motion.a>
    </motion.aside>
  );
}

function HeroContentDock({
  leftTitle,
  leftSubtitle,
  rightTitle,
  rightSubtitle,
  phone,
}: {
  leftTitle: string;
  leftSubtitle: string;
  rightTitle: string;
  rightSubtitle: string;
  phone: string;
}) {
  const wa = waHrefTr(phone);
  const { reduce } = useHeroMotion();
  return (
    <motion.div
      className="relative z-[22] border-t border-white/10 bg-[#07090c]/92 backdrop-blur-md"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: easeLux }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:px-6 md:py-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8d5a3]/95">
            Kurumsal Proje Standardı
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-slate-300">
            Türkiye geneli uygulama
          </span>
        </div>

        <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
          {leftTitle}
        </h1>
        <p className="max-w-4xl text-sm leading-relaxed text-slate-300 md:text-base">
          {leftSubtitle} · {rightSubtitle}
        </p>

        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/iletisim"
            onClick={() => trackHeroTeklifClick()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-black/35 ring-1 ring-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-muted)]"
          >
            <motion.span
              className="inline-flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            >
              Hemen Teklif Al
              <motion.span aria-hidden animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                →
              </motion.span>
            </motion.span>
          </Link>
          <motion.a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeroWhatsAppClick()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-lead-800/90 px-6 py-3 text-center text-sm font-semibold text-slate-100 shadow-md shadow-black/25 ring-1 ring-[var(--brand)]/30 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-muted)]"
            whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.28)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            WhatsApp&apos;tan Yaz
          </motion.a>
          <span className="hidden font-display text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 md:inline">
            {rightTitle}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

type ColumnProps = {
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  side: 'left' | 'right';
  bottomCta?: { href: string; label: string };
};

function HeroColumn({
  imageSrc,
  imageAlt,
  priority = false,
  side,
  bottomCta,
}: ColumnProps) {
  const { reduce, imgScale, imgScaleEnd } = useHeroMotion();

  return (
    <motion.div
      className="group relative min-h-[min(92vh,820px)] overflow-hidden bg-lead-900 md:min-h-[calc(100vh-4.5rem)]"
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.95, ease: easeLux, delay: side === 'left' ? 0.05 : 0.12 }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: imgScaleEnd }}
        transition={{ duration: 1.35, ease: easeLux, delay: 0.08 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          quality={priority ? 78 : 72}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.035]"
          draggable={false}
          fetchPriority={priority ? 'high' : 'low'}
        />
      </motion.div>

      <div
        className="absolute inset-0 z-[1] bg-[var(--brand-hero-overlay)] transition-colors duration-500 group-hover:bg-[var(--brand-hero-overlay-hover)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-black/25 via-transparent to-[var(--brand)]/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <HeroCornerFrame side={side} />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {bottomCta ? (
        <div className="pointer-events-auto absolute inset-x-0 bottom-[5.5rem] z-[20] flex justify-center px-4 md:bottom-[6.5rem]">
          <Link
            href={bottomCta.href}
            className="rounded-full border border-[#c5a059]/75 bg-black/35 px-5 py-2.5 text-center font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8d5a3] shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:border-[#e8d5a3]/95 hover:bg-black/50 md:text-[11px] md:tracking-[0.22em]"
          >
            {bottomCta.label}
          </Link>
        </div>
      ) : null}
    </motion.div>
  );
}

/** Fareyle hafif parallax — sütun görseli */
function ColumnParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 64, damping: 18 });
  const springY = useSpring(my, { stiffness: 64, damping: 18 });
  const rotateX = useTransform(springY, [-40, 40], [2, -2]);
  const rotateY = useTransform(springX, [-40, 40], [-2, 2]);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * 28);
    my.set(py * 22);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="relative min-h-0"
      style={reduce ? undefined : { perspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export type HeroSplitSectionProps = {
  phone: string;
  leftTitle: string;
  leftSubtitle: string;
  rightTitle: string;
  rightSubtitle: string;
  leftImageSrc?: string;
  rightImageSrc?: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  brandWordPrimary?: string;
  brandWordAccent?: string;
  /** Görsel sütunun altındaki altın çerçeveli kısayol (ör. Hizmetlerimiz / Projeler) */
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
  brandWordPrimary = 'Kubbe',
  brandWordAccent = 'Kaplama',
  leftColumnCta,
  rightColumnCta,
}: HeroSplitSectionProps) {
  const resolvedLogo = logoUrl ?? null;
  const resolvedAlt = logoAlt?.trim() || `${brandWordPrimary} ${brandWordAccent}`;
  return (
    <section
      className="relative w-full overflow-hidden hero-tech-overlay"
      aria-label="Anasayfa tanıtım"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative mx-auto min-h-0 max-w-[1920px]">
        <div className="relative">
          <div className="grid min-h-0 grid-cols-1 md:grid-cols-2">
            <ColumnParallax>
              <HeroColumn
                imageSrc={leftImageSrc}
                imageAlt="Bakır kubbe ve cami alemleri — referans proje görseli"
                priority
                side="left"
                bottomCta={leftColumnCta}
              />
            </ColumnParallax>
            <ColumnParallax>
              <HeroColumn
                imageSrc={rightImageSrc}
                imageAlt="Alüminyum kubbe külliye — referans proje görseli"
                side="right"
                bottomCta={rightColumnCta}
              />
            </ColumnParallax>
          </div>
          <HeroDividerLogo
            logoUrl={resolvedLogo}
            logoAlt={resolvedAlt}
            brandWordPrimary={brandWordPrimary}
            brandWordAccent={brandWordAccent}
          />
          <HeroCornerSignature phone={phone} />
          <HeroCenterBeam />
        </div>
        <HeroContentDock
          leftTitle={leftTitle}
          leftSubtitle={leftSubtitle}
          rightTitle={rightTitle}
          rightSubtitle={rightSubtitle}
          phone={phone}
        />
      </div>
    </section>
  );
}
