# Kubbe Kurumsal Site — Next.js (App Router)

Kurumsal altyapı: **TypeScript**, **Tailwind CSS**, **Sunucu render** (`force-dynamic`, hosting derleme süresi için), **next/font** (Inter + Montserrat), koyu tema (**kurşun** `#374151` / **yeşil** `#064e3b`).

**GitHub depo adı:** `kubbe-kurumsal-site` (eski `…-sitesi` / `kubbe-corporate-site` isimleri yerine bunu kullanın; Hostinger’daki repo URL’si ile aynı olmalı.)

## Kurulum

```bash
cd kubbe-kurumsal-site
npm install
npm run dev
```

Yerel klasörünüz hâlâ `kubbe-corporate-site` ise `cd` satırında o klasör adını kullanın.

### Site açılmıyorsa (localhost)

**Varsayılan `npm run dev`** artık yerelde **kesin açılsın** diye ayarlıdır:

- **Sanity/CMS istekleri atlanır** (`SKIP_SANITY_IN_DEV`) — ağ takılınca sayfa yine yüklenir.
- **Basit dil modu** (`NEXT_PUBLIC_DEV_SIMPLE_ROUTES`) — `/` ve `/hizmetler` doğrudan çalışır; **`/tr` → anasayfa** (rewrite) hâlâ geçerli.

Tarayıcıda: **`http://127.0.0.1:3000/`** veya **`http://127.0.0.1:3000/tr`**

**Tam CMS + yönlendirme** (eski davranış): `npm run dev:full` — o zaman `/` çoğunlukla `/tr`’ye yönlenir; Sanity `.env.local` ile çalışır.

Diğer:

1. Port çakışırsa terminalde `Local: http://localhost:XXXX` satırına bakın.
2. Sabit port: `npm run dev:local` veya `dev:full` — 3000 doluysa eski `node` sürecini kapatın veya `npm run dev:clean`.
3. **Önbellek:** Gizli pencere veya Ctrl+F5.

## Sayfa yapısı (routing)

Dil öneki: **`/tr`**, **`/en`**, **`/ar`** (middleware ile `app/` rotalarına içeride eşlenir). Kısayol: **`/tr`** anasayfa.

| Yol | Açıklama |
|-----|----------|
| `/tr` | Anasayfa (Türkçe URL) |
| `/` | Cookie / varsayılan dile yönlendirir → çoğunlukla `/tr` |
| `/hizmetler` | Hizmet listesi |
| `/hizmetler/kubbe-kaplama` | Camii kubbe kaplama |
| `/hizmetler/aluminyum-satis` | Alüminyum satışı |
| `/hizmetler/aluminyum-kubbe-kaplama` | Alüminyum kubbe kaplama |
| `/hizmetler/bakir-levha-satis` | Bakır levha / bakır kubbe |
| `/hizmetler/kursun-levha-satis` | Kurşun levha satışı |
| `/hizmetler/nakkas-susleme` | Camii nakkaş süsleme |
| `/hizmetler/alemler` | Camii alemleri |
| `/hizmetler/oluk` | Oluk satışı ve montajı |
| `/sevkiyatlar` | Sevkiyatlar |
| `/iletisim` | İletişim |
| `/projeler` | Tüm referans projeler (harita verisiyle uyumlu liste) |

Hizmet alt sayfalarındaki **hero** görselleri `public/hizmetler/` altındaki dosyalardan yüklenir (`HizmetPageHero` bileşeni). Görseli değiştirmek için aynı dosya adıyla değiştirin veya ilgili `page.tsx` içinde `imageSrc` yolunu güncelleyin.

## SEO

Her sayfa `export const metadata` ile **title** ve **description** tanımlar. `app/layout.tsx` içinde `metadataBase` ve `title.template` kullanılır — `.env.local` içinde `NEXT_PUBLIC_SITE_URL` ile güncelleyin.

## Google Ads / gtag / AdresGezgini

1. `.env.example` dosyasını `.env.local` olarak kopyalayın.
2. `NEXT_PUBLIC_GOOGLE_ADS_ID` ve/veya `NEXT_PUBLIC_GA_MEASUREMENT_ID` değerlerini girin.
3. `components/ads/GtagSlot.tsx` layout’ta yüklenir (`next/script`, `afterInteractive`).

WhatsApp / telefon / teşekkürler dönüşüm etiketleri için opsiyonel env değişkenleri:

- `NEXT_PUBLIC_GADS_CONVERSION_WHATSAPP` (ör. `AW-XXXX/abc...`)
- `NEXT_PUBLIC_GADS_CONVERSION_PHONE`
- `NEXT_PUBLIC_GADS_CONVERSION_THANKYOU`
- `NEXT_PUBLIC_ADRESGEZGINI_CONVERSION_WHATSAPP` (opsiyonel)
- `NEXT_PUBLIC_ADRESGEZGINI_CONVERSION_PHONE` (opsiyonel)
- `NEXT_PUBLIC_ADRESGEZGINI_CONVERSION_THANKYOU` (opsiyonel)

`/tesekkurler` sayfası açıldığında otomatik dönüşüm olayı tetiklenir. WhatsApp ve telefon CTA tıklamaları da olay olarak gönderilir.

Ek snippet (AdresGezgini panel kodu vb.) için `app/layout.tsx` içinde `CmsScriptManager` alanını kullanabilir veya `next/script` ile script ekleyebilirsiniz.

## Performans

- **Render:** `app/layout.tsx` → `export const dynamic = 'force-dynamic'` (uzak derlemede Sanity ile SSG zaman aşımını önler; içerik `sanityFetch` etiketleri + webhook ile yenilenir.)
- **Fontlar:** Google Fonts, `next/font` ile `display: swap` — CLS azaltımı
- **LCP:** Hero’da metin öncelikli; görseller eklendiğinde `next/image` + `priority` kullanın

## Üretim

```bash
npm run build
npm start
```
