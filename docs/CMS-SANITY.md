# Sanity.io CMS — Kurulum ve kullanım

> **Hiç bilmiyorum, adım adım gideyim:** önce **[BASLANGIC-ADIM-ADIM.md](./BASLANGIC-ADIM-ADIM.md)** dosyasını okuyun.

## Ne sağlanıyor?

| Modül | Şema | Ön yüz |
|--------|------|--------|
| **Genel ayarlar** | `siteSettings` — tema (kurşun/yeşil), telefon, logo | İleride `SiteHeader` ile bağlanabilir |
| **Hizmetler** | `service` — başlık, slug, açıklama, kapak görseli | `SanityServiceCover` + WebP CDN + `ProtectedImage` filigran |
| **Sevkiyat videoları** | `shipmentVideo` — başlık, YouTube ID, tarih | `/sevkiyatlar` — `VideoGallery` |
| **Reklam / script** | `adScripts` — GA4, Google Ads, AdresGezgini, Script Manager | `layout` → `GtagSlot` + `CmsScriptManager` |

Görseller: Sanity CDN **otomatik WebP/AVIF** (`lib/sanity/image.ts` — `auto('format')`, `format('webp')`). Ek sunucu işlemi gerekmez.

## Kurulum

1. [sanity.io/manage](https://www.sanity.io/manage) üzerinden proje oluşturun.
2. Proje kökünde `.env.local` oluşturun (`.env.example` şablonu):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (genelde `production`)
   - `SANITY_REVALIDATE_SECRET` (uzun rastgele dize)
3. `npm install`
4. `npm run dev` → [http://localhost:3000/studio](http://localhost:3000/studio) — içerik girin.

**İlk içerik:** “Genel Ayarlar”, “Reklam & Script Yöneticisi” için **tek belge** oluşturun (liste başına bir kez).

## ISR / anlık yansıma

1. Vercel/hosting’de `SANITY_REVALIDATE_SECRET` ortam değişkenini ayarlayın.
2. Sanity: **API → Webhooks** → URL:
   ```text
   https://SITENIZ.com/api/revalidate?secret=SANITY_REVALIDATE_SECRET
   ```
   Method: **POST**, Dataset: production, Trigger: Create, Update, Delete.
3. Yayın sonrası `revalidateTag` ile ön yüz güncellenir (birkaç saniye içinde).

Yerelde test: `curl -X POST "http://localhost:3000/api/revalidate?secret=GIZLI"`

## Payload CMS alternatifi

Payload kendi veritabanı ve admin panelini projeye gömer; şema benzer şekilde tanımlanır. Bu repoda **Sanity** seçildi — Payload’a geçiş için veri modeli ve alan adları aynı mantıkla taşınabilir.

## Güvenlik

Script Manager alanlarına **yalnızca güvenilir** piksel/kod yapıştırın. Admin erişimini Sanity proje üyeleri ile sınırlayın.

**Not (App Router):** “Head” alanındaki kodlar `next/script` ile `afterInteractive` stratejisiyle yüklenir (`beforeInteractive` yalnızca `pages/_document` ile uyumludur). Çoğu etiket/analytics senaryosu için yeterlidir.
