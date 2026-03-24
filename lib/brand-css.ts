import type { CSSProperties } from 'react';

/** Varsayılan — logo rengi girilmezse */
export const DEFAULT_BRAND_HEX = '#064e3b';

function parseHex(s: string): [number, number, number] | null {
  const m = s.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((x) =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

function mixRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/**
 * Logo / marka ana rengine göre site genelindeki vurgu renkleri (CSS değişkenleri).
 * Studio’da girilen #RRGGBB → butonlar, linkler, hero ışıması.
 */
const LEAD_950: [number, number, number] = [11, 15, 20];
const LEAD_900: [number, number, number] = [17, 24, 39];

export function brandCssVarsFromAccent(hexInput?: string | null): CSSProperties {
  const parsed = hexInput?.trim() ? parseHex(hexInput) : null;
  const base = parsed ?? parseHex(DEFAULT_BRAND_HEX)!;
  const light = mixRgb(base, [255, 255, 255], 0.24);
  const muted = mixRgb(base, [120, 240, 220], 0.42);
  const radial = mixRgb(base, [15, 23, 42], 0.35);

  /** Sayfa zemini — kurşun + hafif marka damarı */
  const bgBody = mixRgb(LEAD_950, base, 0.14);
  /** Hero sütun overlay — #111827 + marka (okunurluk korunur) */
  const heroOv = mixRgb(LEAD_900, base, 0.28);
  const heroOvHover = mixRgb(LEAD_900, base, 0.18);

  return {
    '--brand': toHex(...base),
    '--brand-light': toHex(...light),
    '--brand-muted': toHex(...muted),
    '--brand-radial': `rgba(${Math.round(radial[0])}, ${Math.round(radial[1])}, ${Math.round(radial[2])}, 0.38)`,
    '--brand-bg-body': toHex(...bgBody),
    '--brand-hero-overlay': `rgba(${Math.round(heroOv[0])}, ${Math.round(heroOv[1])}, ${Math.round(heroOv[2])}, 0.62)`,
    '--brand-hero-overlay-hover': `rgba(${Math.round(heroOvHover[0])}, ${Math.round(heroOvHover[1])}, ${Math.round(heroOvHover[2])}, 0.44)`,
    '--brand-logo-glow': `rgba(${Math.round(base[0])}, ${Math.round(base[1])}, ${Math.round(base[2])}, 0.35)`,
  } as CSSProperties;
}

export function isValidBrandHex(s: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(s.trim());
}
