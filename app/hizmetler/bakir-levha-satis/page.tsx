import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';

export const metadata: Metadata = {
  title: 'Bakır Levha Satışı ve Bakır Kubbe Kaplama',
  description:
    'Camii kubbeleri için bakır levha satışı ve bakır kubbe kaplama uygulamalarına uygun tedarik. Profesyonel ekip ve Türkiye geneli destek.',
  openGraph: {
    title: 'Bakır Levha & Bakır Kubbe | Kubbe Kaplama',
    description:
      'Bakır kubbe kaplama ve bakır levha tedariği; uzun ömürlü yüzeyler ve doğru malzeme seçimi ile güvenilir hizmet.',
  },
};

export default function BakirLevhaSatisPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/bakir-kubbe-kaplama.webp"
        imageAlt="Bakır kaplı camii kubbesi — bakır kubbe kaplama uygulaması"
        title="Bakır Levha Satışı ve Bakır Kubbe Kaplama"
        kicker="Hizmet"
        subtitle="Levha tedariği ve bakır kubbe uygulamalarına profesyonel destek."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
          <p>
            Firmamız uzun yıllardır daha estetik, daha dayanıklı ve daha fonksiyonel yapılar için özveriyle
            çalışmaktadır. <strong>Bakır kubbe kaplama</strong> ve camii kubbelerinde kullanılan bakır levha
            tedarikinde, hem teknik bilgiye hem saha tecrübesine sahip profesyonel kadromuzla hizmet veriyoruz.
          </p>

          <p>
            Bizim için bakır levha satışı yalnızca ürün teslimi değildir. Projenin ihtiyaçlarını doğru okumak,
            doğru malzemeyi önermek ve uygulama sürecini kolaylaştıracak çözümler sunmak da işimizin önemli bir
            parçasıdır. Bu yaklaşımı meslek etiği, şeffaf iletişim ve güvenilir hizmet anlayışıyla yürütüyoruz.
          </p>

          <p>
            Nitelikli personel yapımızla kalite, performans, çevresel hassasiyet ve estetik arasında dengeli bir
            hizmet sunmayı hedefliyoruz. İş ilişkilerimizde açıklık, dürüstlük ve bütünlük ilkelerini temel alıyor;
            her müşterimize aynı ciddiyetle yaklaşıyoruz.
          </p>

          <p>
            Camii bakırı ve bakır levha ihtiyaçlarınızda hangi ürünün doğru olduğundan emin değilseniz bile
            çekinmeden bize ulaşabilirsiniz. İletişim sayfamız üzerinden bizi arayarak detaylı bilgi alabilir,
            projenize uygun teknik yönlendirme ve fiyatlandırma desteği talep edebilirsiniz.
          </p>
        </div>
        <ContactCtaBlock />
      </div>
    </main>
  );
}
