import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { ServicePageImageGallery } from '@/components/hizmetler/ServicePageImageGallery';
import { KUBBE_KAPLAMA_GALLERY } from '@/lib/content/kubbe-kaplama-gallery';
import { HIZMET_PAGE_METADATA } from '@/lib/seo/service-metadata';

export const metadata: Metadata = HIZMET_PAGE_METADATA['kubbe-kaplama'];

export default function KubbeKaplamaPage() {
  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/camii-kubbe-kaplama-hero.png"
        imageAlt="Camii kubbe kaplama uygulaması — kubbe ve çatı hattı"
        title="Camii Kubbe Kaplama"
        kicker="Hizmet"
        subtitle="Turgut Usta ekibiyle Osmanlı kubbe geleneğine uygun montaj ve malzeme tedariği."
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
            uygulamanın ömrü boyunca performansını korur. 1987&apos;den bu yana 39 yıldır devam eden kubbe kaplama
            tecrübemizle Türkiye&apos;de yüzlerce camii ve referans projede gerçekleştirdiğimiz çalışmalar, bu
            yaklaşımın somut karşılığıdır.
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
      </div>

      <ServicePageImageGallery title="Saha ve referans görselleri" items={KUBBE_KAPLAMA_GALLERY} />

      <div className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
        <ContactCtaBlock />
      </div>
    </main>
  );
}
