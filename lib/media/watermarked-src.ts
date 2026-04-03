export function watermarkedSrc(src: string) {
  if (!src) return src;
  if (src.startsWith('/api/sevkiyat-image/')) return src;
  /** Dinamik görsel route'ları (ör. hizmetler hero) public dosya değil; watermark zincirini kır. */
  if (src.startsWith('/api/')) return src;
  return `/api/image-watermark?src=${encodeURIComponent(src)}`;
}
