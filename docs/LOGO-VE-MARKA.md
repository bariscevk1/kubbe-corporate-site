# Logo ve marka — önce bunlar

## Yerel varsayılan logo

Repoda **`public/brand/turgut-coskun-logo.webp`** (Turgut Coşkun amblemi, optimize WebP) vardır.  
Sanity’de logo **yüklenmemişse** site otomatik bu dosyayı kullanır. İsterseniz aynı dosyayı Studio’ya da yükleyebilirsiniz (CDN üzerinden servis edilir).

Studio → **Genel Ayarlar** içinde sıra:

1. **Logo** — PNG/SVG, yatay; header + footer’da görünür.
2. **Marka ana rengi** — Logodaki ana rengin HEX kodu (`#064e3b` gibi).  
   Butonlar, link vurguları, anasayfa radial ışıması bu renge göre hesaplanır.
3. **Marka — birinci / vurgulu kelime** — Logo yüklenmezse sol üstte metin marka olarak çıkar.
4. **Şirket / imza satırı** — Footer’daki firma adı.
5. **Favicon** — İsteğe bağlı; boşsa logo sekme ikonu olarak kullanılır.

**Publish** sonrası birkaç dakika içinde (veya webhook ile) ön yüz güncellenir.

Teknik: `lib/brand-css.ts` ana rengi açık tonlara çevirir (`--brand`, `--brand-light`, `--brand-muted`, `--brand-radial`).
