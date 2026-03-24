import { defineField, defineType } from 'sanity';

/**
 * Tekil “Genel Ayarlar” — Studio’da bir kez oluşturun (singleton benzeri).
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Genel Ayarlar',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description:
        'Önce bunu yükleyin — header ve footer’da kullanılır. Yatay logo tercih edin (PNG veya SVG). Tüm site vurgu renkleri “Marka ana rengi” ile uyumludur.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternatif metin (SEO)',
          description: 'Logo görseli için kısa açıklama',
        }),
      ],
    }),
    defineField({
      name: 'brandAccentHex',
      title: 'Marka ana rengi (logodan)',
      type: 'string',
      description:
        'Logonuzdaki ana yeşil / kurumsal rengin HEX kodu. Örnek: #064e3b — butonlar, link vurguları ve anasayfa ışıması buna göre ayarlanır.',
      placeholder: '#064e3b',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || !String(value).trim()) return true;
          const ok = /^#[0-9A-Fa-f]{6}$/.test(String(value).trim());
          return ok ? true : 'Format: # ile başlayan 6 haneli renk (örn. #064e3b)';
        }),
    }),
    defineField({
      name: 'brandWordPrimary',
      title: 'Marka — birinci kelime (logo yokken)',
      type: 'string',
      initialValue: 'Kubbe',
      description: 'Logo görseli yüklenmediyse sol üstte metin olarak gösterilir.',
    }),
    defineField({
      name: 'brandWordAccent',
      title: 'Marka — vurgulu kelime (logo yokken)',
      type: 'string',
      initialValue: 'Kaplama',
      description: 'Marka rengiyle vurgulanır.',
    }),
    defineField({
      name: 'companyLegalName',
      title: 'Şirket / imza satırı (footer)',
      type: 'string',
      initialValue: 'Turgut Çoşkun Kubbe Kaplama',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon (sekme ikonu)',
      type: 'image',
      description: 'İsteğe bağlı — kare veya küçük logo (örn. 32×32). Boşsa logo veya varsayılan kullanılır.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'theme',
      title: 'Arka plan tonu',
      type: 'string',
      options: {
        list: [
          { title: 'Kurşun (gri tonları)', value: 'lead' },
          { title: 'Yeşil (kurumsal)', value: 'green' },
        ],
        layout: 'radio',
      },
      initialValue: 'lead',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'İletişim numarası',
      type: 'string',
      initialValue: '05323236627',
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'homeKicker',
      title: 'Anasayfa — üst etiket',
      type: 'string',
      description: 'Örn: Kurumsal',
      initialValue: 'Kurumsal',
    }),
    defineField({
      name: 'homeTitle',
      title: 'Anasayfa — ana başlık',
      type: 'string',
      initialValue: 'Cami kubbe kaplama ve metal çözümler',
    }),
    defineField({
      name: 'homeSubtitle',
      title: 'Anasayfa — alt metin',
      type: 'text',
      rows: 4,
      initialValue:
        'Kurşun ve alüminyum uygulamalarında güvenilir iş ortağınız. Statik üretim ile hızlı sayfa yükü; ölçü, üretim ve sahada profesyonel ekip.',
    }),
    defineField({
      name: 'heroSplitLeftTitle',
      title: 'Anasayfa hero — sol sütun başlık',
      type: 'string',
      initialValue: 'Bakır Kubbe Kaplama ve Cami Alemleri',
    }),
    defineField({
      name: 'heroSplitLeftSubtitle',
      title: 'Anasayfa hero — sol sütun alt başlık',
      type: 'string',
      initialValue: 'Sektördeki 25 Yıllık Tecrübe',
    }),
    defineField({
      name: 'heroSplitRightTitle',
      title: 'Anasayfa hero — sağ sütun başlık',
      type: 'string',
      initialValue: 'Alüminyum Kubbe Kaplama ve Büyük Ölçekli Projeler',
    }),
    defineField({
      name: 'heroSplitRightSubtitle',
      title: 'Anasayfa hero — sağ sütun alt başlık',
      type: 'string',
      initialValue: 'Kapasitemiz ve İşçiliğimizle Otoriteyiz',
    }),
    defineField({
      name: 'contactLocation',
      title: 'İletişim — konum metni',
      type: 'string',
      initialValue: 'Ankara, Türkiye',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Genel Ayarlar' }),
  },
});
