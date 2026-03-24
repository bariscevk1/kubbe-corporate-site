import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';

export const metadata: Metadata = {
  title: 'Camii Alemleri',
  description:
    'Camii alemi tasarımı, üretimi ve montajı. Minare ve kubbe hatlarında geleneksel ve özel ölçü çözümler; Türkiye geneli hizmet.',
  openGraph: {
    title: 'Camii Alemleri | Kubbe Kaplama',
    description:
      'Alemlerde estetik, dayanıklılık ve doğru oran; üretimden montaja profesyonel camii alemi hizmeti.',
  },
};

export default function AlemlerPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/camii-alemleri.webp"
        imageAlt="Camii alemleri — hilal ve süslemeli alemi modelleri"
        title="Camii Alemleri"
        kicker="Hizmet"
        subtitle="Tasarım, üretim ve montaj ile alemi çözümleri."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
          <p>
            Camii alemleri, yapının semaya uzanan en ince imzasıdır: hem teşbih gibi bir hatırlatıcı hem de
            siluetin taç noktası. Bu yüzden alemi işi &quot;standart bir imalat&quot; gibi düşünülmemeli; ölçü,
            rüzgâr yükü, malzeme ve estetik bütünlük birlikte ele alınmalıdır.
          </p>

          <p>
            Kubbe kaplama ve alüminyum tedariki alanındaki tecrübemizi, alemi üretimi ve montajına da aynı
            disiplinle taşıyoruz. Tasarımdan üretime, sahada hizalama ve bağlantı detaylarına kadar her aşamada
            uygulanabilir ve sürdürülebilir çözümler sunuyoruz.
          </p>

          <p>
            Referanslarımızla birlikte sizi de yeni projelerimizin parçası görmekten mutluluk duyarız. Her caminin
            kendine özgü bir hikâyesi olduğu gibi, her alemin de kendine özgü bir oranı ve karakteri vardır;
            biz bu karakteri koruyarak ilerliyoruz.
          </p>

          <p>
            Alemi ihtiyaçlarınız için iletişim sayfamızdaki numaralardan bize ulaşabilir; ölçü, malzeme ve montaj
            planı hakkında detaylı bilgi alabilirsiniz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
