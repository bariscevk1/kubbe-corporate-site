import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { ServicePageImageGallery } from '@/components/hizmetler/ServicePageImageGallery';
import { SubpageHeading } from '@/components/ui/SubpageHeading';
import { ALUMINYUM_SATIS_GALLERY } from '@/lib/content/aluminyum-satis-gallery';
import { HIZMET_PAGE_METADATA } from '@/lib/seo/service-metadata';

export const metadata: Metadata = HIZMET_PAGE_METADATA['aluminyum-satis'];

export default function AluminyumSatisPage() {
  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/aluminyum-satis.webp"
        imageAlt="Alüminyum renk ve malzeme numuneleri yelpazesi"
        title="Alüminyum Satışı"
        kicker="Hizmet"
        subtitle="Turgut Usta guvencesiyle her renk ve kalinlikta urun; projeye ozel tedarik ve sevkiyat."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-[var(--text-body)]">
          <p>
            Kullanım alanınıza göre standart ölçülerin dışında alüminyum ürünleri de temin edebiliyoruz.
            İhtiyacınıza uygun kalınlık, alaşım ve yüzey seçeneklerini birlikte belirliyor; doğru ürünü doğru
            uygulamayla eşleştiriyoruz. Böylece hem uygulama süreci hızlanıyor hem de uzun vadede daha verimli
            bir sonuç alınıyor.
          </p>

          <p>
            Camii kubbeleri gibi form verilmesi gereken yapılarda özellikle <strong>1050 alaşım / H0 kondisyon</strong>{' '}
            ürünler yüksek işlenebilirlik avantajı sağlar. Esnek yapısı sayesinde sahada daha rahat uygulanır,
            düşük ağırlığı ile taşıyıcıya gereksiz yük bindirmez ve farklı iklim koşullarında güvenilir performans
            sunar.
          </p>

          <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-5 shadow-[0_16px_32px_-28px_rgba(31,41,55,0.16)]">
            <SubpageHeading as="h2" spacing="compact" className="text-[clamp(1rem,3.2vw,1.25rem)]">
              Neden Alüminyum?
            </SubpageHeading>
            <ul className="mt-2 space-y-2 text-[var(--text-body)]">
              <li>- Hafif ve dayanıklıdır (kurşuna göre çok daha düşük ağırlık).</li>
              <li>- Kolay şekillenir, montajı hızlı ve pratiktir.</li>
              <li>- Dekoratif görünüm sunar; boyalı ve desenli seçenekler mevcuttur.</li>
              <li>- Korozyona karşı dirençlidir, uzun ömürlü kullanım sağlar.</li>
              <li>- Maliyet avantajı sunar ve bakım yükünü azaltır.</li>
              <li>- Geri dönüşüme uygun, çevre ve insan sağlığına duyarlı bir malzemedir.</li>
            </ul>
          </div>

          <p>
            Alüminyum satışı tarafında sadece ürün vermekle kalmıyor, ihtiyaç halinde uygulama tarafını da deneyimli
            ekibimizle destekliyoruz. Kubbe kaplama işi yapan bir ekip olarak sahadaki gerçek ihtiyaçları biliyor,
            bu nedenle ürün seçimini proje gerçeklerine göre yönlendiriyoruz.
          </p>

          <p>
            Türkiye&apos;nin tüm illerine sevkiyat yapıyoruz. Her renk ve kalınlıkta alüminyum ürün tedariğimiz
            devam etmektedir. Detaylı teknik bilgi, güncel fiyat ve uygun ürün eşleştirmesi için iletişim
            sayfamızdan bize doğrudan ulaşabilirsiniz.
          </p>
        </div>
      </div>

      <ServicePageImageGallery
        id="aluminyum-satis-gallery"
        title="Depo ve stok görselleri"
        items={ALUMINYUM_SATIS_GALLERY}
      />

      <div className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
        <ContactCtaBlock />
      </div>
    </main>
  );
}
