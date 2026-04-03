import Image from 'next/image';
import { watermarkedSrc } from '@/lib/media/watermarked-src';

type GalleryItem = { readonly src: string; readonly alt: string };

type Props = {
  id?: string;
  title: string;
  items: readonly GalleryItem[];
};

export function ServicePageImageGallery({ id = 'service-page-gallery', title, items }: Props) {
  return (
    <section className="border-t border-[var(--border-soft)] bg-[var(--brand-bg-body)] py-8 md:py-10" aria-labelledby={id}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 id={id} className="font-display text-lg font-semibold tracking-tight text-[var(--text-heading)] md:text-xl">
          {title}
        </h2>
      </div>

      <div className="mt-5 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
        <ul
          className="flex w-max snap-x snap-mandatory gap-3 px-4 pb-2 pt-0.5 md:gap-4 md:px-6"
          role="list"
          aria-label={`${title} — yatay liste`}
        >
          {items.map((item) => (
            <li
              key={item.src}
              className="w-[min(82vw,300px)] shrink-0 snap-start sm:w-[min(72vw,320px)] md:w-[300px]"
            >
              <div className="overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] shadow-[0_14px_32px_-28px_rgba(15,23,42,0.2)]">
                <div className="relative aspect-[4/3] w-full bg-[#1a1a1a]">
                  <Image
                    src={watermarkedSrc(item.src)}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 82vw, 320px"
                    quality={78}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
