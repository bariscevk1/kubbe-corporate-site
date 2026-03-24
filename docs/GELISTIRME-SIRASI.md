# Yeni site — geliştirme sırası (Kubbe / Next + Sanity)

## Tamamlanan

- **Genel Ayarlar → header/footer:** tema, telefon, logo (`layout`).
- **Genel Ayarlar → anasayfa + iletişim:** `homeKicker`, `homeTitle`, `homeSubtitle`, `contactLocation` (Studio’dan düzenlenebilir).
- **Hizmetler listesi:** Sanity’de `service` kaydı varsa kartlar + kapak görseli; yoksa eski 3 sabit link.
- **Hizmet detay:** `/hizmetler/[slug]` — CMS içeriği (kapak + açıklama).
- **Telefon yardımcıları:** `lib/phone.ts` (`tel`, WhatsApp, gösterim).

### Not: slug çakışması

`kubbe-kaplama`, `oluk`, `alemler` için statik sayfalar mevcuttur; CMS’te **aynı slug** ile `service` kaydı açarsanız Next.js önce statik rotayı sunar. CMS içeriği için farklı slug kullanın veya statik sayfayı kaldırın.

## Sıradaki adımlar

1. Studio’da **Genel Ayarlar** alanlarını doldur; **Hizmet** belgeleri oluştur.
2. **Sevkiyatlar** içeriği (`shipmentVideo`) zaten `/sevkiyatlar` ile uyumlu — videoları gir.
3. **Reklam / Script** (`adScripts`) — GA, Ads, AdresGezgini.
4. **Deploy** — Node hosting; `NEXT_PUBLIC_SITE_URL`; webhook.

## Yerelde

```bash
cd kubbe-kurumsal-site
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/studio  
