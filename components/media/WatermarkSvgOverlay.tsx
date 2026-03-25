import { WATERMARK_PHONE_DISPLAY } from '@/lib/watermark-phone';

type Props = {
  /** Sayfada benzersiz olmalı (örn. useId ile) */
  patternId: string;
  text?: string;
  className?: string;
};

/**
 * Tek SVG pattern — çok sayıda DOM düğümü yerine bir rect + tile; paint maliyeti düşük.
 */
export function WatermarkSvgOverlay({
  patternId,
  text = WATERMARK_PHONE_DISPLAY,
  className = '',
}: Props) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 select-none ${className}`.trim()}
      aria-hidden
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="220"
          height="72"
          patternTransform="rotate(-32)"
        >
          <text
            x="8"
            y="42"
            fill="rgba(255,255,255,0.22)"
            style={{ fontSize: 13, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}
          >
            {text}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
