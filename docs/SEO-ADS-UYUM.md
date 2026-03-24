# SEO ve Google Ads anahtar kelime uyumu

## Site sahibinin talepleri (özet)

1. **Ücretli arama kelimeleri** — AdresGezgini / Google Ads’te ödeme yapılan anahtar kelimeler web içeriğiyle uyumlu olsun.
2. **Tüm Türkiye** — Sadece tek şehir değil, ülke geneli hizmet vurgusu.
3. **7/24** — Sürekli ulaşılabilirlik (telefon / WhatsApp).
4. **Yurt dışı** — Arap ülkeleri ve Körfez bölgelerinden gelen talepler için görünürlük; EN/AR iletişim ifadesi.
5. **Yaş** — Hedef kitlede yaş sınırlaması yok; metinlerde “tüm yaş grupları” ifadesi.

## Projede yapılanlar

| Ne | Nerede |
|----|--------|
| Panellerden türetilmiş **anahtar kelime listesi** + genişletmeler | `lib/seo/ads-keywords.ts` |
| **Meta açıklama** (Türkiye, 7/24, uluslararası) | `lib/seo/seo-copy.ts`, `app/layout.tsx`, `app/page.tsx` |
| **Meta keywords** (virgülle ayrılmış, uzunluk sınırlı) | `generateMetadata` |
| **JSON-LD Schema.org** (`ProfessionalService`): `areaServed`, `openingHoursSpecification` (7 gün), `knowsAbout`, `availableLanguage` | `components/seo/JsonLdSite.tsx` |
| Ana sayfada **görünür bilgi bölümü** (hizmet alanları, örnek kelimeler, EN/AR kısa metin) | `components/home/HomeKeywordSection.tsx` |
| **Footer** metni (Türkiye geneli, 7/24, Körfez, yaş) | `components/layout/SiteFooter.tsx` |
| **Hero varsayılan alt başlıklar** (CMS doluysa Sanity kazanır) | `app/page.tsx` |
| **Sitemap / robots** | `app/sitemap.ts`, `app/robots.ts` |

## Not

- Google, `<meta name="keywords">` için sıralama sinyali olarak çok kullanmaz; yine de talep doğrultusunda eklendi. Asıl değer **sayfa metni**, **başlıklar**, **Schema** ve **reklam–açılış sayfası uyumu**ndadır.
- Tam çok dilli site (`/en`, `/ar`) ileride eklenebilir; şu an EN/AR metin ana sayfada ve `alternateLocale` ile keşfedilebilirlik için işaretlendi.
