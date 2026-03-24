# Performans (hız) notları

## Projede yapılanlar

| Konu | Açıklama |
|------|----------|
| `next.config.mjs` | `optimizePackageImports: ['framer-motion']`, `poweredByHeader: false`, `compress`, görsel `minimumCacheTTL`, üretimde `removeConsole` |
| Font | Montserrat **preload kapalı** (sadece Inter kritik); ağırlık 600–700 |
| Bağlantı | `preconnect` + `dns-prefetch` (Sanity CDN, GTM) |
| Ana sayfa | `AboutTeaserSection` ve `HomeKeywordSection` **dynamic import** ile ayrı JS chunk |
| Görseller | LCP: sol hero + logo `fetchPriority="high"`; sağ hero ve Hakkımızda **`low` / lazy**; kalite ~72–82 |
| Görseller | `npm run optimize:images` — `public/` altı **tüm** PNG/JPEG → **WebP** (klasöre göre max genişlik + boyut hedefi). Bkz. `scripts/optimize-public-media.mjs`, `docs/MEDYA-OPTIMIZASYON.md` |
| Video kapakları | `VideoGallery` kapakları `next/image` + YouTube CDN (küçük thumbnail) |

## Ölçüm

- **Geliştirme** (`npm run dev`) her zaman üretimden yavaştır.
- Gerçek hız için: `npm run build` → `npm run start`

## Mobil (Android)

- Azaltılmış JS = ilk chunk daha hızlı (dynamic import).
- Ağır animasyonlar `prefers-reduced-motion` ile zaten sadeleşiyor.
