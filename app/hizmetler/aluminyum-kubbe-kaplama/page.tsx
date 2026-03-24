import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';

export const metadata: Metadata = {
  title: 'Alüminyum Kubbe Kaplama',
  description:
    'Camii kubbeleri için alüminyum kaplama uygulamaları. Tecrübeli ekip, doğru malzeme seçimi ve Türkiye geneli profesyonel montaj hizmeti.',
  openGraph: {
    title: 'Alüminyum Kubbe Kaplama | Kubbe Kaplama',
    description:
      'Alüminyum kubbe kaplama uygulamalarında kaliteli işçilik, uygun fiyat ve Türkiye geneli hizmet.',
  },
};

export default function AluminyumKubbeKaplamaPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/aluminyum-kubbe-kaplama.webp"
        imageAlt="Alüminyum kaplı camii kubbesi ve kubbe kaplama uygulaması"
        title="Alüminyum Kubbe Kaplama"
        kicker="Hizmet"
        subtitle="Hafif, dayanıklı ve uzun ömürlü kubbe yüzeyleri için profesyonel montaj."
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
            30 yılı aşkın tecrübemizle, alüminyum kubbe kaplama konusunda ihtiyaç duyduğunuz tüm teknik ve
            uygulama desteğini profesyonel kadromuzla karşılıyoruz. Detaylı bilgi ve fiyat teklifi almak için
            bizimle iletişime geçebilirsiniz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
