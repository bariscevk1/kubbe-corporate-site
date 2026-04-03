import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { HIZMET_PAGE_METADATA } from '@/lib/seo/service-metadata';

export const metadata: Metadata = HIZMET_PAGE_METADATA['nakkas-susleme'];

export default function NakkasSuslemePage() {
  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/camii-nakkas-susleme.webp"
        imageAlt="Camii içi nakkaş süsleme — geleneksel motifler"
        title="Camii Nakkaş Süsleme"
        kicker="Hizmet"
        subtitle="Turgut Usta ekibiyle kubbe, tavan ve ic duvarlarda kalemkar isciligi ve restorasyon."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
          <p>
            Nakkaş süsleme; cami, türbe, mescit, saray ve benzeri yapılarda kubbe, tavan ve iç duvarlara
            uygulanan geleneksel bir tezyinat sanatıdır. Sıva, ahşap, bez, taş ve benzeri yüzeyler üzerinde
            renkli boyalarla, kabartmalarla ve gerektiğinde altın varakla yapılan bu ince işçilikte, estetik
            kadar sabır ve ustalık da belirleyicidir.
          </p>

          <p>
            Bu sanatın uygulayıcısı olan kalemkâr ustalar, yapının ruhuna uygun desenleri doğru kompozisyonla
            bir araya getirir. Biz de camii nakkaş süsleme çalışmalarında, yapının tarihi kimliğine ve mimari
            karakterine sadık kalarak göze ve ruha hitap eden uygulamalar gerçekleştiriyoruz.
          </p>

          <p>
            Ülkemizin en kıymetli mirasları arasında yer alan ibadethanelerimizin restorasyon ve tadilat
            süreçlerinde güvenilir ekiplerle çalışmak çok önemlidir. Bu bilinçle; keşiften uygulamaya kadar
            tüm süreçleri planlı, şeffaf ve titiz şekilde yönetiyoruz.
          </p>

          <p>
            Hedefimiz; hızlı, kesintisiz ve güvenli hizmet sunarken kalite çizgisini korumaktır. Bireysel ve
            kurumsal projelerde edindiğimiz tecrübeyle, Türkiye genelinde kendi alanında öne çıkan ekiplerden
            biri olarak çalışmalarımıza devam ediyoruz.
          </p>

          <p>
            Camii nakkaş süsleme ihtiyaçlarınız için bizimle iletişime geçebilir, projenize özel detaylı bilgi
            ve uygulama planı talep edebilirsiniz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
