'use client';

import Image from 'next/image';
import { useCallback, useId, useState, type KeyboardEvent } from 'react';

/** Sevkiyat / tanıtım videoları — yalnızca YouTube (iframe, oynatınca yüklenir) */
export interface VideoGalleryItem {
  /** YouTube video ID (örn. URL’deki v= sonrası) */
  id: string;
  title: string;
  /** Kapak görseli URL’i (ör. `https://img.youtube.com/vi/{id}/hqdefault.jpg` veya kendi CDN’iniz) */
  thumbnail: string;
}

export interface VideoGalleryProps {
  videos: VideoGalleryItem[];
  className?: string;
}

function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
}

/** YouTube’un standart kapak URL’i — `thumbnail` alanında kullanabilirsiniz */
export function youtubeThumbnailUrl(
  videoId: string,
  quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'
): string {
  return `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/${quality}.jpg`;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function VideoCard({ item, index }: { item: VideoGalleryItem; index: number }) {
  const reactId = useId();
  const [playing, setPlaying] = useState(false);
  const titleId = `${reactId}-title`;

  const play = useCallback(() => setPlaying(true), []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        play();
      }
    },
    [play]
  );

  return (
    <article
      className="flex flex-col overflow-hidden rounded-lg bg-slate-900/40 shadow-md ring-1 ring-slate-700/50"
      aria-labelledby={titleId}
    >
      <div className="relative aspect-video w-full bg-slate-950">
        {playing ? (
          <iframe
            title={item.title}
            src={youtubeEmbedUrl(item.id)}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            <Image
              src={item.thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" aria-hidden />
            <button
              type="button"
              onClick={play}
              onKeyDown={onKeyDown}
              className="group absolute inset-0 flex cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={`Oynat: ${item.title}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-emerald-900 shadow-lg ring-2 ring-white/20 transition duration-200 group-hover:scale-105 group-hover:bg-white group-hover:shadow-xl md:h-16 md:w-16">
                <PlayIcon className="ml-0.5 h-7 w-7 md:h-8 md:w-8" />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="border-t border-slate-700/60 bg-slate-900/60 px-3 py-3 md:px-4">
        <p
          id={titleId}
          className="text-center text-sm font-medium leading-snug text-slate-200 md:text-base"
        >
          {item.title}
        </p>
      </div>
    </article>
  );
}

/**
 * Facade: Sayfa açılışında iframe yok; sadece kapak + Play.
 * Tıklanınca `playing` state ile YouTube iframe yüklenir (LCP / hız dostu).
 */
export default function VideoGallery({ videos, className = '' }: VideoGalleryProps) {
  if (!videos.length) {
    return (
      <p className="rounded-lg border border-dashed border-slate-600 bg-slate-900/40 px-4 py-8 text-center text-slate-400">
        Henüz video eklenmedi.
      </p>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6 ${className}`}
    >
      {videos.map((item, index) => (
        <VideoCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

/** Örnek liste — `thumbnail` alanını kendi kapaklarınızla veya YouTube CDN ile doldurun */
export const SEVKIYAT_VIDEOS_SAMPLE: VideoGalleryItem[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Paketleme ve yükleme süreci',
    thumbnail: youtubeThumbnailUrl('dQw4w9WgXcQ'),
  },
  {
    id: '9bZkp7q19f0',
    title: 'Şehirler arası sevkiyat',
    thumbnail: youtubeThumbnailUrl('9bZkp7q19f0'),
  },
  {
    id: 'L_jWHffIx5E',
    title: 'Teslimat ve montaj koordinasyonu',
    thumbnail: youtubeThumbnailUrl('L_jWHffIx5E'),
  },
];
