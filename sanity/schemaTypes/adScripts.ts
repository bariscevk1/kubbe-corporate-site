import { defineField, defineType } from 'sanity';

/**
 * Script Manager — GTAG, Google Ads, AdresGezgini vb. tek yerden.
 */
export const adScripts = defineType({
  name: 'adScripts',
  title: 'Reklam & Script Yöneticisi',
  type: 'document',
  fields: [
    defineField({
      name: 'gtagMeasurementId',
      title: 'GA4 Measurement ID',
      type: 'string',
      description: 'Örnek: G-XXXXXXXX',
      placeholder: 'G-...',
    }),
    defineField({
      name: 'googleAdsId',
      title: 'Google Ads (AW-) ID',
      type: 'string',
      description: 'gtag yükleyicide kullanılır: AW-XXXXXXXX',
      placeholder: 'AW-...',
    }),
    defineField({
      name: 'adresGezginiSnippet',
      title: 'AdresGezgini / özel script (head veya body)',
      type: 'text',
      rows: 8,
      description: 'Üçüncü parti dönüşüm veya harita kodu; güvenilir kaynaklardan yapıştırın.',
    }),
    defineField({
      name: 'scriptManagerHead',
      title: 'Ek: &lt;head&gt; içi (Script Manager)',
      type: 'text',
      rows: 10,
      description: 'İsteğe bağlı: ek meta, piksel, doğrulama kodları.',
    }),
    defineField({
      name: 'scriptManagerBodyEnd',
      title: 'Ek: &lt;body&gt; sonu (Script Manager)',
      type: 'text',
      rows: 10,
      description: 'İsteğe bağlı: body kapanışına yakın scriptler.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Reklam & Script Yöneticisi' }),
  },
});
