import type { Metadata } from 'next';
import { ContactCtaBlock } from '@/components/ContactCtaBlock';
import { HizmetPageHero } from '@/components/hizmetler/HizmetPageHero';

export const metadata: Metadata = {
  title: 'Alüminyum Satışı',
  description:
    'Camii kubbeleri ve özel projeler için alüminyum satışı, tedarik ve sevkiyat hizmetleri. Her renk ve kalınlıkta ürün seçenekleri.',
  openGraph: {
    title: 'Alüminyum Satışı | Kubbe Kaplama',
    description: 'Her renk ve kalınlıkta alüminyum ürün tedariği ve Türkiye geneli sevkiyat.',
  },
};

export default function AluminyumSatisPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg-body)]">
      <HizmetPageHero
        imageSrc="/hizmetler/aluminyum-satis.webp"
        imageAlt="Alüminyum renk ve malzeme numuneleri yelpazesi"
        title="Alüminyum Satışı"
        kicker="Hizmet"
        subtitle="Her renk ve kalınlıkta ürün; projeye özel tedarik ve sevkiyat."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-5 leading-relaxed text-slate-300">
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

          <div className="rounded-xl border border-white/10 bg-lead-900/35 p-5">
            <h2 className="font-display text-xl font-semibold text-white">Neden Alüminyum?</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
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
        <ContactCtaBlock />
      </div>
    </main>
  );
}
