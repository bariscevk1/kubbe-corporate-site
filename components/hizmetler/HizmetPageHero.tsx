import Image from 'next/image';

export type HizmetPageHeroProps = {
  /** `public/` altı — örn. `/hizmetler/ornek.webp` */
  imageSrc: string;
  imageAlt: string;
  title: string;
  /** Üst satır etiket (varsayılan: "Hizmet") */
  kicker?: string;
  /** Başlığın altında ince açıklama */
  subtitle?: string;
  priority?: boolean;
  quality?: number;
};

function HeroCorners() {
  return (
    <div className="pointer-events-none absolute inset-3 md:inset-5" aria-hidden>
      <svg className="absolute left-0 top-0 h-10 w-10 text-brand/80 md:h-12 md:w-12" viewBox="0 0 40 40" fill="none">
        <path d="M2 12V2h10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        className="absolute right-0 top-0 h-10 w-10 rotate-90 text-brand/80 md:h-12 md:w-12"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M2 12V2h10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-10 w-10 -rotate-90 text-brand/80 md:h-12 md:w-12"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M2 12V2h10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 h-10 w-10 rotate-180 text-brand/80 md:h-12 md:w-12"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M2 12V2h10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

/**
 * Hizmet alt sayfaları — tam genişlik hero; görseli `public/` altına koyup `imageSrc` ile bağlayın.
 */
export function HizmetPageHero({
  imageSrc,
  imageAlt,
  title,
  kicker = 'Hizmet',
  subtitle,
  priority = true,
  quality = 88,
}: HizmetPageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-white/10 bg-lead-950"
      aria-labelledby="hizmet-hero-heading"
    >
      <div className="relative min-h-[min(54vh,480px)] w-full md:min-h-[min(46vh,520px)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          quality={quality}
          className="object-cover object-[60%_center] md:object-center"
          sizes="100vw"
        />
        {/* Okunabilirlik katmanları */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060c11] via-[#060c11]/78 to-[#0a1520]/52 md:from-[#070d12] md:via-[#070d12]/66"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_0%,rgba(0,0,0,0.15),rgba(0,0,0,0.58))] md:bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(197,160,89,0.14),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden
        />

        <HeroCorners />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-7 pt-24 md:px-10 md:pb-12 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl rounded-2xl border border-white/10 bg-black/28 p-4 shadow-[0_12px_34px_rgba(0,0,0,0.45)] backdrop-blur-[2px] md:border-transparent md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b7d8c8] md:text-brand-muted">
                {kicker}
              </p>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-brand/90 to-transparent" aria-hidden />
              <h1
                id="hizmet-hero-heading"
                className="font-display mt-4 text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.78)] sm:text-3xl md:text-4xl md:leading-[1.15] lg:text-[2.6rem]"
              >
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-100/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.78)] md:text-base md:text-slate-300/95 md:drop-shadow-none">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
