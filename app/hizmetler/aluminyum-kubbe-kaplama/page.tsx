import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { ServicePageImageGallery } from '@/components/hizmetler/ServicePageImageGallery';
import { ALUMINYUM_KUBBE_KAPLAMA_GALLERY } from '@/lib/content/aluminyum-kubbe-kaplama-gallery';
import { HIZMET_PAGE_METADATA } from '@/lib/seo/service-metadata';

export const metadata: Metadata = HIZMET_PAGE_METADATA['aluminyum-kubbe-kaplama'];

export default function AluminyumKubbeKaplamaPage() {
  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/aluminyum-kubbe-kaplama.webp"
        imageAlt="Alüminyum kaplı camii kubbesi ve kubbe kaplama uygulaması"
        title="Alüminyum Kubbe Kaplama"
        kicker="Hizmet"
        subtitle="Turgut Usta ekibiyle hafif, dayanikli ve uzun omurlu kubbe yuzeyleri icin profesyonel montaj."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
          <p>
            Camii kubbelerinde alüminyum kaplama uygulamalarını, bu alanda uzun yıllardır çalışan uzman
            ekibimizle titizlikle gerçekleştiriyoruz. Doğru malzeme, doğru uygulama ve düzenli saha
            planlaması ile hem estetik hem de dayanıklı sonuçlar üretiyoruz.
          </p>

          <p>
            Alüminyum kubbe kaplama; hafifliği, işlenebilirliği ve uzun ömürlü yapısı sayesinde bugün en
            çok tercih edilen çözümlerden biridir. Biz de her projede yapının mevcut durumunu dikkate alıyor,
            ihtiyaca uygun sistemi belirleyip uygulamayı buna göre planlıyoruz.
          </p>

          <p>
            <strong className="text-slate-100">Alüminyum Kubbe Kaplama bizim işimiz.</strong> Türkiye&apos;nin
            birçok ilinde tamamladığımız uygulamalarla, cami kubbe kaplama alanında güvenilir bir çözüm
            ortağı olarak hizmet vermeye devam ediyoruz.
          </p>

          <p>
            Kuruluşumuz için kalite kadar iş ahlakı da temel bir prensiptir. Bu anlayışla yürüttüğümüz her
            uygulamada; söz verilen zamanda teslim, şeffaf iletişim ve sürdürülebilir kaliteyi ön planda
            tutuyoruz. İbadethane niteliği taşıyan bu yapıların kültürel değerinin farkında olarak çalışıyoruz.
          </p>

          <p>
            1987&apos;den bu yana 39 yildir devam eden tecrubemizle, aluminyum kubbe kaplama konusunda ihtiyac
            duydugunuz tum teknik ve uygulama destegini profesyonel kadromuzla karsiliyoruz. Detayli bilgi ve
            fiyat teklifi almak icin bizimle iletisime gecebilirsiniz.
          </p>
        </div>
      </div>

      <ServicePageImageGallery
        id="aluminyum-kubbe-kaplama-gallery"
        title="Uygulama görselleri"
        items={ALUMINYUM_KUBBE_KAPLAMA_GALLERY}
      />

      <div className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
        <ContactCtaBlock />
      </div>
    </main>
  );
}
