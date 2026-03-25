'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const SevkiyatVideoArchive = dynamic(
  () =>
    import('@/components/sevkiyat/SevkiyatVideoArchive').then((m) => ({
      default: m.SevkiyatVideoArchive,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14"
        aria-busy="true"
        aria-label="Video arsivi yukleniyor"
      >
        <div className="min-h-[320px] animate-pulse rounded-2xl border border-white/10 bg-[#0a0d10]/60" />
      </div>
    ),
  },
);

/**
 * Görünür alana gelene kadar video arşivi JS’i ve önizleme istekleri yüklenmez
 * (içerik IntersectionObserver + dynamic ile gecikir).
 */
export function SevkiyatVideoArchiveLazy() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '180px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <SevkiyatVideoArchive />
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <div className="min-h-[320px] rounded-2xl border border-white/10 bg-[#0a0d10]/40" aria-hidden />
        </div>
      )}
    </div>
  );
}
