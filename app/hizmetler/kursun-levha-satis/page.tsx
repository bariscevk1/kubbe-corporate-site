import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';
import { SubpageHeading } from '@/components/ui/SubpageHeading';

export const metadata: Metadata = {
  title: 'Kurşun Levha Satışı',
  description:
    'Yüksek saflıkta kurşun levha satışı, özel ebat üretim ve Türkiye geneli sevkiyat. Kubbe kaplama, restorasyon ve radyasyon yalıtımı için profesyonel çözümler.',
  openGraph: {
    title: 'Kurşun Levha Satışı | Kubbe Kaplama',
    description:
      'Kubbe, minare ve restorasyon uygulamaları için yüksek kalite kurşun levha tedariki ve teknik destek.',
  },
};

export default function KursunLevhaSatisPage() {
  return (
    <main className="service-detail-page site-subpage-light min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/kursun-levha-satis.webp"
        imageAlt="Kurşun levha ve metal ürün tedariki"
        title="Kurşun Levha Satışı"
        kicker="Hizmet"
        subtitle="Turgut Usta guvencesiyle yuksek saflik, standart plaka agirliklari ve Turkiye geneli sevkiyat."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-[var(--text-body)]">
          <p>
            Kurşun levhalar; elektrolitik saflıkta külçe kurşun veya geri dönüşüm kaynaklı külçe kurşun kullanılarak
            ergitme, alaşımlandırma ve haddeleme süreçleriyle üretilir. Standart ebatların yanında, projeye özel
            farklı ölçü ve kalınlıklarda üretim de yapılabilmektedir.
          </p>

          <p>
            Kubbe formundaki yapılarda kurşun levhanın öne çıkmasının temel nedeni, malzemenin yumuşak ve uyumlu
            yapısıdır. Sıcaklık farklarında oluşan genleşmeyi bünyesinde daha sağlıklı karşılar; bu da ek yerlerinde
            kırılma, çatlama ve su sızdırma riskini ciddi biçimde azaltır. Bu nedenle Osmanlı&apos;dan günümüze birçok
            cami ve tarihi yapıda kurşun kaplama tercih edilmiştir.
          </p>

          <p>
            Doğru malzeme seçimi kadar doğru işçilik de kritik önemdedir. Teknik şartnamelere uygun uygulanan
            yüksek saflıktaki kurşun levhalar, iklim şartlarına bağlı olarak 50 ila 100 yıl arasında kullanım ömrü
            sunabilir. Bu da uzun vadede hem dayanım hem maliyet açısından güçlü bir avantaj sağlar.
          </p>

          <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-5 shadow-[0_16px_32px_-28px_rgba(31,41,55,0.16)]">
            <SubpageHeading as="h2" spacing="compact" className="text-[clamp(1rem,3.2vw,1.25rem)]">
              Kaliteyi belirleyen 2 temel unsur
            </SubpageHeading>
            <ul className="mt-2 space-y-2 text-[var(--text-body)]">
              <li>- Hammadde saflığı (kimyasal bileşim ve işlenebilirlik)</li>
              <li>- Hadde kalitesi ve plaka ağırlık/kalınlık standartlarının tutarlılığı</li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              Hadde silindirlerinin düzenli bakım görmediği üretimlerde levha kalınlığı yüzey boyunca değişken
              olabildiği için plaka ağırlığı artar ve tüketici gereksiz maliyet ödeyebilir. Biz, tolerans dahilinde
              standart plaka ağırlıklarını sağlayan ürünleri önceliklendiririz.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-5 shadow-[0_16px_32px_-28px_rgba(31,41,55,0.16)]">
            <SubpageHeading as="h2" spacing="compact" className="text-[clamp(1rem,3.2vw,1.25rem)]">
              Ürün tipleri
            </SubpageHeading>
            <h3 className="mt-2 text-base font-semibold text-[var(--text-heading)]">Yüksek kalite kurşun levha</h3>
            <ul className="mt-2 space-y-1.5 text-[var(--text-body)]">
              <li>- Pb %99,95 – %99,99 aralığında saflık</li>
              <li>- Yumuşak, kolay işlenebilir yapı</li>
              <li>- Doğru uygulamada kırılma/çatlama riski çok düşüktür</li>
              <li>- X-ray yalıtım performansı yüksektir</li>
            </ul>

            <h3 className="mt-5 text-base font-semibold text-[var(--text-heading)]">Geri dönüşüm kurşun levha</h3>
            <ul className="mt-2 space-y-1.5 text-[var(--text-body)]">
              <li>- Yaklaşık Pb %99,80 saflık</li>
              <li>- Bakır/antimon gibi elementler nedeniyle daha sert yapı</li>
              <li>- Zamanla yüzey oksidasyonunda farklı renklenmeler görülebilir</li>
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-5 shadow-[0_16px_32px_-28px_rgba(31,41,55,0.16)]">
            <SubpageHeading as="h2" spacing="compact" className="text-[clamp(1rem,3.2vw,1.25rem)]">
              Kullanım alanları
            </SubpageHeading>
            <ul className="mt-2 space-y-2 text-[var(--text-body)]">
              <li>- Cami kubbe ve minareleri, hamam kubbeleri, tarihi eser restorasyonları</li>
              <li>- Radyoloji/röntgen bölümlerinde radyasyon yalıtımı</li>
              <li>- Ses stüdyolarında ses yalıtımı uygulamaları</li>
              <li>- Lehim ve alaşım üretim süreçleri</li>
            </ul>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Uygulama tipine göre genellikle kubbe yüzeylerinde 2 mm, minarelerde 1,5 mm kalınlık tercih edilir.
            </p>
          </div>

          <p>
            Kurşun levha satışı konusunda detaylı bilgi, proje bazlı teknik yönlendirme ve fiyat teklifi için
            bizimle iletişime geçebilirsiniz. Türkiye genelinde sevkiyat ve uygulama ihtiyaçlarınıza profesyonel
            destek sunuyoruz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
