# Görsel ve video — web / mobil hız

## Statik görseller (`public/`)

1. **Yeni fotoğraf eklerken** mümkünse doğrudan **WebP** veya hafif **JPEG** kullanın.
2. Projede tek komut: **`npm run optimize:images`**  
   - `public/` altındaki tüm **PNG ve JPEG** dosyalarını tarar.  
   - Klasöre göre yeniden boyutlandırır ve **WebP** üretir (Sharp).  
   - Başarılı olunca orijinal PNG/JPEG **silinir** (yer tasarrufu).

| Klasör | Max genişlik (yaklaşık) | Amaç |
|--------|-------------------------|------|
| `hizmetler/` | 960 px | Kart / grid |
| `about/` | 1400 px | İçerik görselleri |
| `hero/` | 1920 px | Geniş hero |
| `brand/` | 800 px | Logo |

3. Kodda yolu **`.webp`** olarak güncelleyin (`lib/content/...`, bileşenler).

## Next.js `Image`

Üretimde Next, WebP/AVIF sunar (`next.config.mjs` içinde `formats`). `public/` dosyaları da optimize edilir; **`sizes`** ve **`loading`** doğru verildiğinde mobilde gereksiz piksel indirilmez.

## Videolar

- **Sitedeki galeri:** YouTube (`VideoGallery`) — iframe yalnızca oynatınca yüklenir; kapaklar `next/image` ile küçültülür.
- **İleride `public/` içine MP4/MOV koyarsanız** (öneri, tek seferlik):

```bash
# Örnek: web + hızlı başlatma (fast start), makul boyut
ffmpeg -i giris.mov -c:v libx264 -crf 26 -preset medium -movflags +faststart -an cikis.mp4
```

Ses gerekiyorsa `-an` kaldırın. Mümkünse **1080p’den büyük** kaynakları siteye koymayın.

## Üretim öncesi

```bash
npm run build:prod
```

(`optimize:images` + `build` — `package.json` içinde tanımlı.)
