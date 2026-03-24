import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';

export const metadata: Metadata = {
  title: 'Camii Kubbe Kaplama',
  description:
    'Osmanlı kubbe geleneğine uygun camii kubbe kaplama, montaj ve malzeme tedariği. 30 yılı aşkın tecrübe, Türkiye geneli referanslar.',
  openGraph: {
    title: 'Camii Kubbe Kaplama | Kubbe Kaplama',
    description:
      'Kubbe mimarisinde uzun ömürlü uygulamalar; bakır, kurşun ve alüminyum ile profesyonel camii kubbe kaplama hizmeti.',
  },
};

export default function KubbeKaplamaPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/camii-kubbe-kaplama.webp"
        imageAlt="Camii kubbe kaplama uygulaması — kubbe ve çatı hattı"
        title="Camii Kubbe Kaplama"
        kicker="Hizmet"
        subtitle="Osmanlı kubbe geleneğine uygun montaj ve malzeme tedariği."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
          <p>
            Kubbe mimarisinde zirveye Osmanlı ustadları ulaşmıştır; ana mekânda geometrik düzeni, üst yapıda ise
            küresel formu bir arada kuran bu gelenek, bugün hâlâ ibadethanelerimizin siluetini belirliyor. Biz de
            camii kubbe kaplamada bu mirasa saygı duyarak; doğru malzeme seçimi, doğru detay ve sahada titiz
            uygulama ile uzun ömürlü sonuçlar hedefliyoruz.
          </p>

          <p>
            Kullandığımız ürünler yıllar içinde kalite dalgalanması göstermeyecek şekilde seçilir; böylece
            uygulamanın ömrü boyunca performansını korur. Otuz yılı aşkın süredir Türkiye&apos;de yüzlerce camii
            ve referans projede gerçekleştirdiğimiz kubbe kaplama çalışmaları, bu yaklaşımın somut karşılığıdır.
          </p>

          <p>
            Montaj hizmetinin yanında camii kubbe kaplamaları için <strong>malzeme tedariği</strong> de
            sunuyoruz. Alüminyum ve diğer kaplama ürünlerini bizden temin edebilir; dilerseniz siparişlerinizi
            doğrudan proje adresinize sevk ettirebilirsiniz.
          </p>

          <p>
            Kubbe ve çatı hattıyla ilgili tüm sorularınız için iletişim kanallarımız üzerinden bize ulaşabilirsiniz.
            Camilerinizin kubbe kaplama ihtiyaçlarını tek elden, deneyimli bir ekip ile çözmek istiyorsanız
            keşif ve teklif için hemen görüşebiliriz. İnternet sitemizdeki referanslarımızdan ülke genelinde
            yürüttüğümüz işlere dair örnekleri inceleyebilirsiniz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
