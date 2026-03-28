export function watermarkedSrc(src: string) {
  if (!src) return src;
  if (src.startsWith('/api/sevkiyat-image/')) return src;
  return `/api/image-watermark?src=${encodeURIComponent(src)}`;
}
