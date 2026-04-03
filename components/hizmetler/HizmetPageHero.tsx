import Image from 'next/image';
import { watermarkedSrc } from '@/lib/media/watermarked-src';

export type HizmetPageHeroProps = {
  /** `public/` altı — örn. `/hizmetler/ornek.webp` */
  imageSrc: string;
  imageAlt: string;
  title: string;
  /** Üst satır etiket */
  kicker?: string;
  /** Başlığın altında ince açıklama */
  subtitle?: string;
  /** Kapak görseli için ek sınıflar (örn. `object-[58%_center]`) */
  imageClassName?: string;
  priority?: boolean;
  quality?: number;
};

const HERO_MIN_HEIGHT =
  'min-h-[min(78vw,300px)] sm:min-h-[min(72vw,340px)] md:min-h-[min(48vh,480px)] lg:min-h-[min(52vh,560px)]';

/**
 * Hizmet alt sayfaları — mobil referans: tam genişlik kapak görseli, koyu örtü, ortada beyaz başlık.
 */
export function HizmetPageHero({
  imageSrc,
  imageAlt,
  title,
  kicker,
  subtitle,
  imageClassName,
  priority = true,
  quality = 88,
}: HizmetPageHeroProps) {
  return (
    <section
      className="hizmet-page-hero relative w-full overflow-hidden border-b border-black/10"
      aria-labelledby="hizmet-hero-heading"
    >
      <div className={`relative ${HERO_MIN_HEIGHT}`}>
        <Image
          src={watermarkedSrc(imageSrc)}
          alt={imageAlt}
          fill
          priority={priority}
          quality={quality}
          className={`z-0 object-cover object-center ${imageClassName ?? ''}`.trim()}
          sizes="100vw"
          fetchPriority={priority ? 'high' : 'low'}
        />

        {/*
          Inline gradient + z-index: bazı ortamlarda Next/Image katmanı üstte kalabiliyor;
          ayrıca global CSS gradient sınıflarına müdahale riskine karşı doğrudan stil garanti eder.
        */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.78) 100%)',
          }}
          aria-hidden
        />

        <div
          className={`relative z-[2] flex ${HERO_MIN_HEIGHT} flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-14 md:px-8 md:py-20`}
        >
          {kicker ? (
            <p className="hizmet-hero-kicker font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-white/80 sm:text-[11px]">
              {kicker}
            </p>
          ) : null}
          <h1
            id="hizmet-hero-heading"
            className={`font-display font-bold leading-tight tracking-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,1),0_2px_16px_rgba(0,0,0,0.85),0_6px_36px_rgba(0,0,0,0.55)] ${
              kicker ? 'mt-3 md:mt-4' : ''
            } max-w-[min(92vw,34rem)] text-[clamp(1.35rem,5.5vw,2.35rem)] sm:text-[clamp(1.5rem,5vw,2.65rem)] md:max-w-3xl md:text-[clamp(1.85rem,3.5vw,3rem)]`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="hizmet-hero-lead mt-4 max-w-xl text-sm leading-relaxed text-white/95 sm:text-[0.95rem] md:mt-5 md:max-w-2xl md:text-base [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
