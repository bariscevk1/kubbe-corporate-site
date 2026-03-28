import Image from 'next/image';
import { SubpageHeading } from '@/components/ui/SubpageHeading';
import { watermarkedSrc } from '@/lib/media/watermarked-src';

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
    <div className="pointer-events-none absolute inset-3 z-[5] md:inset-5" aria-hidden>
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
 * Hizmet alt sayfaları — split screen hero; görseli `public/` altına koyup `imageSrc` ile bağlayın.
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
      className="relative w-full overflow-hidden border-b border-[var(--border-soft)] bg-[var(--surface-soft)]"
      aria-labelledby="hizmet-hero-heading"
    >
      <div className="grid md:min-h-screen md:grid-cols-[minmax(320px,40%)_minmax(0,60%)]">
        <div className="relative z-10 flex flex-col justify-center bg-[var(--surface-hero-card)] px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 md:px-10 md:pb-14 md:pt-36 lg:px-14">
          <div className="max-w-xl">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-brand-muted sm:text-xs">
              {kicker}
            </p>
            <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#c5a059] to-transparent" aria-hidden />
            <div className="mt-5">
              <SubpageHeading as="h1" id="hizmet-hero-heading" size="hero">
                {title}
              </SubpageHeading>
            </div>
            {subtitle ? (
              <p className="max-w-lg text-sm leading-7 text-[var(--text-body)] sm:text-base md:text-[1.05rem]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative min-h-[42vh] bg-[var(--surface-soft)] sm:min-h-[48vh] md:min-h-screen">
          <Image
            src={watermarkedSrc(imageSrc)}
            alt={imageAlt}
            fill
            priority={priority}
            quality={quality}
            className="bg-[var(--surface-soft)] object-contain object-center p-4 sm:p-6 md:p-10 lg:p-14"
            sizes="(max-width: 768px) 100vw, 60vw"
            fetchPriority={priority ? 'high' : 'low'}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(248,249,250,0.72))]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden
          />

          <HeroCorners />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-24 bg-gradient-to-b from-white/25 to-transparent md:h-32" />
        </div>
      </div>
    </section>
  );
}
