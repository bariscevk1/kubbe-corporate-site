import path from 'node:path';
import sharp from 'sharp';
import { WATERMARK_PHONE_DISPLAY } from '@/lib/watermark-phone';

const ALLOWED_REMOTE_HOSTS = new Set(['cdn.sanity.io']);

function escapeXml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cornerWatermarkSvg(width: number, height: number, text = WATERMARK_PHONE_DISPLAY) {
  const paddingX = Math.max(24, Math.round(width * 0.032));
  const paddingY = Math.max(22, Math.round(height * 0.034));
  const fontSize = Math.max(13, Math.min(22, Math.round(Math.min(width, height) * 0.021)));
  const strokeWidth = Math.max(0.7, Math.round(fontSize * 0.045 * 10) / 10);
  const safeText = escapeXml(text);

  return Buffer.from(
    `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <text
          x="${width - paddingX}"
          y="${height - paddingY}"
          text-anchor="end"
          fill="rgba(55,65,81,0.09)"
          stroke="rgba(255,255,255,0.06)"
          stroke-width="${strokeWidth}"
          paint-order="stroke"
          font-size="${fontSize}"
          font-family="Arial, Helvetica, sans-serif"
          font-weight="600"
          letter-spacing="0.35"
        >${safeText}</text>
      </svg>
    `.trim(),
  );
}

export async function renderPermanentWatermark(input: Buffer) {
  const base = sharp(input).rotate();
  const meta = await base.metadata();
  const width = meta.width ?? 1600;
  const height = meta.height ?? 1200;

  return base
    .composite([{ input: cornerWatermarkSvg(width, height), left: 0, top: 0 }])
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
}

export function resolvePublicImagePath(src: string) {
  if (!src.startsWith('/')) throw new Error('Invalid image path.');
  const normalizedSrc = src.split('?')[0]?.split('#')[0] ?? src;
  const relative = normalizedSrc.replace(/^\/+/, '');
  const absolute = path.resolve(process.cwd(), 'public', relative);
  const publicRoot = path.resolve(process.cwd(), 'public');

  if (!absolute.startsWith(publicRoot)) {
    throw new Error('Path traversal is not allowed.');
  }

  return absolute;
}

export async function fetchAllowedRemoteImage(src: string) {
  const url = new URL(src);
  if (!ALLOWED_REMOTE_HOSTS.has(url.hostname)) {
    throw new Error('Remote host is not allowed.');
  }

  const response = await fetch(src, {
    headers: { Accept: 'image/avif,image/webp,image/*,*/*;q=0.8' },
    next: { revalidate: 60 * 60 * 24 * 30 },
  });

  if (!response.ok) {
    throw new Error('Remote image could not be fetched.');
  }

  return Buffer.from(await response.arrayBuffer());
}
