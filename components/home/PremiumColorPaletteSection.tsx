'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type PaletteGroup = 'all' | 'copper' | 'aluminum' | 'special';

type ColorItem = {
  id: string;
  group: Exclude<PaletteGroup, 'all'>;
  name: string;
  code: string;
  finish: string;
  description: string;
  accent: string;
  swatchClassName: string;
};

const PALETTE_ITEMS: readonly ColorItem[] = [
  {
    id: 'classic-copper',
    group: 'copper',
    name: 'Klasik Bakır',
    code: 'PATINA BAKIR',
    finish: 'Doğal metal yüzey',
    description: 'Geleneksel kubbe ve çatı projelerinde zamansız bir görünüm sunan, karakterli bakır yüzey.',
    accent: '#b87333',
    swatchClassName:
      'bg-[linear-gradient(135deg,#4b2b18_0%,#7b4a2b_22%,#d49a63_48%,#7b4425_72%,#2f1a12_100%)]',
  },
  {
    id: 'anthracite',
    group: 'aluminum',
    name: 'Antrasit Gri',
    code: 'RAL 7016',
    finish: 'Mat metalik boya',
    description: 'Modern camii kubbe kaplama ve metal cati projelerinde premium, kurumsal ve net bir durus saglar.',
    accent: '#3b434b',
    swatchClassName:
      'bg-[linear-gradient(135deg,#16181b_0%,#2f353c_24%,#555d66_50%,#2a3037_74%,#14171a_100%)]',
  },
  {
    id: 'silver-grey',
    group: 'aluminum',
    name: 'Gumus Gri',
    code: 'RAL 9006',
    finish: 'Fircalanmis aluminyum etki',
    description: 'Yuksek isik yansimasi ve temiz metal dili ile buyuk olcekli uygulamalarda ferah bir premium etki olusturur.',
    accent: '#b7bcc4',
    swatchClassName:
      'bg-[linear-gradient(135deg,#5f6670_0%,#c9ced6_24%,#8b929b_50%,#d8dde3_74%,#59606a_100%)]',
  },
  {
    id: 'gold',
    group: 'special',
    name: 'Altin Sarisi',
    code: 'METALIK GOLD',
    finish: 'Parlak firin boya',
    description: 'Alem, kubbe tepe noktasi ve vurgu detaylarinda goz alici ancak kontrollu bir ihtisam sunar.',
    accent: '#c5a059',
    swatchClassName:
      'bg-[linear-gradient(135deg,#4d340f_0%,#a17b2f_20%,#f0d189_48%,#9a7429_72%,#3d2a0b_100%)]',
  },
  {
    id: 'night-blue',
    group: 'special',
    name: 'Gece Mavisi',
    code: 'RAL 5003',
    finish: 'Derin mat metalik',
    description: 'Koyu renkli prestij projelerinde metal catiyi daha sofistike ve sakin bir karaktere tasir.',
    accent: '#1e355d',
    swatchClassName:
      'bg-[linear-gradient(135deg,#07101f_0%,#17345b_26%,#315489_50%,#132d4f_74%,#060c16_100%)]',
  },
  {
    id: 'forest-green',
    group: 'aluminum',
    name: 'Orman Yesili',
    code: 'RAL 6005',
    finish: 'Satin firin boya',
    description: 'Dogal cevre ile uyumlu, kubbe ve ek cati elemanlarinda guven veren geleneksel bir renk secenegi.',
    accent: '#184631',
    swatchClassName:
      'bg-[linear-gradient(135deg,#091910_0%,#123c28_24%,#27684a_52%,#153b29_76%,#08150e_100%)]',
  },
  {
    id: 'bronze',
    group: 'copper',
    name: 'Bronz Rengi',
    code: 'BRONZE METAL',
    finish: 'Yari mat metalik',
    description: 'Bakir ile koyu tonlar arasinda dengeli bir gecis isteyen projeler icin sicak ve rafine bir gorunum sunar.',
    accent: '#7c5b3d',
    swatchClassName:
      'bg-[linear-gradient(135deg,#23170f_0%,#5a402d_22%,#a07a56_50%,#61452f_76%,#1f140d_100%)]',
  },
  {
    id: 'titanium-zinc',
    group: 'special',
    name: 'Titanyum Cinko',
    code: 'TI-ZN',
    finish: 'Dogal patina etkisi',
    description: 'Uzun omurlu dis cephe ve kubbe detaylarinda modern mimariyle uyumlu soguk premium bir yuzey olusturur.',
    accent: '#7f8791',
    swatchClassName:
      'bg-[linear-gradient(135deg,#2f3339_0%,#707984_24%,#b0b8c1_52%,#66707b_76%,#24282d_100%)]',
  },
] as const;

const GROUPS: readonly { id: PaletteGroup; labelKey: string; defaultLabel: string }[] = [
  { id: 'all', labelKey: 'home.palette.tabs.all', defaultLabel: 'Tum Renkler' },
  { id: 'copper', labelKey: 'home.palette.tabs.copper', defaultLabel: 'Bakir Serisi' },
  { id: 'aluminum', labelKey: 'home.palette.tabs.aluminum', defaultLabel: 'Aluminyum Serisi' },
  { id: 'special', labelKey: 'home.palette.tabs.special', defaultLabel: 'Ozel Kaplamalar' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function PremiumColorPaletteSection() {
  const { t } = useTranslation('common');
  const reduced = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<PaletteGroup>('all');
  const [selectedId, setSelectedId] = useState<string>(PALETTE_ITEMS[0]?.id ?? '');

  const visibleItems = useMemo(
    () => (activeGroup === 'all' ? PALETTE_ITEMS : PALETTE_ITEMS.filter((item) => item.group === activeGroup)),
    [activeGroup],
  );

  const selectedItem = visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0] ?? PALETTE_ITEMS[0];

  return (
    <section
      aria-labelledby="premium-color-palette-heading"
      className="relative overflow-hidden border-t border-white/12 bg-[#1b2125]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 78% 58% at 50% -10%, rgba(197,160,89,0.18), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 max-md:px-5 max-md:py-16 md:px-6 md:py-24">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c5a059] md:text-xs">
            {t('home.palette.kicker', { defaultValue: 'Premium Construction Finish' })}
          </p>
          <h2
            id="premium-color-palette-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.7rem]"
          >
            {t('home.palette.title', { defaultValue: 'Premium Metal Renk Kartelasi' })}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            {t('home.palette.lead', {
              defaultValue: 'Projeleriniz icin sundugumuz yuksek kaliteli metal kaplama renklerini kesfedin.',
            })}
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {GROUPS.map((group) => {
            const active = group.id === activeGroup;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroup(group.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 md:text-sm ${
                  active
                    ? 'border-[#c5a059]/60 bg-[#c5a059]/14 text-[#f1ddb0] shadow-[0_0_0_1px_rgba(197,160,89,0.12)]'
                    : 'border-white/12 bg-white/[0.08] text-slate-100 hover:border-white/25 hover:text-white'
                }`}
              >
                {t(group.labelKey, { defaultValue: group.defaultLabel })}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0.15 : 0.35, ease }}
            className="mt-10"
          >
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-4">
              {visibleItems.map((item) => {
                const selected = item.id === selectedItem?.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={selected}
                    aria-label={`${item.name} ${item.code}`}
                    whileHover={reduced ? undefined : { y: -6, scale: 1.015 }}
                    transition={{ duration: 0.22, ease }}
                    className={`group relative min-w-[250px] snap-start overflow-hidden rounded-[24px] border text-left transition-all duration-300 md:min-w-0 ${
                      selected
                        ? 'border-[#c5a059]/45 bg-[#23292e] shadow-[0_24px_54px_-32px_rgba(0,0,0,0.76),0_0_0_1px_rgba(197,160,89,0.14)]'
                        : 'border-white/12 bg-[#262d32] hover:border-[#c5a059]/28 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.72),0_0_0_1px_rgba(197,160,89,0.08)]'
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className={`h-36 w-full ${item.swatchClassName}`} />
                    <div className="border-t border-white/10 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-white">{item.name}</h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{item.code}</p>
                        </div>
                        <span
                          className="mt-1 h-4 w-4 shrink-0 rounded-full border border-white/15 shadow-[0_0_0_5px_rgba(255,255,255,0.02)]"
                          style={{ backgroundColor: item.accent }}
                          aria-hidden
                        />
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.finish}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="mt-8 grid gap-5 overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 shadow-[0_30px_70px_-44px_rgba(0,0,0,0.78)] md:grid-cols-[minmax(220px,320px)_minmax(0,1fr)] md:p-7"
              >
                <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-[#2a3137]">
                  <div className={`h-[220px] w-full ${selectedItem.swatchClassName} md:h-full md:min-h-[250px]`} />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_35%,transparent_65%,rgba(0,0,0,0.24))]" />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#c5a059]/25 bg-[#c5a059]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e7cf96]">
                      {selectedItem.code}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {selectedItem.finish}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold text-white md:text-[2rem]">
                    {selectedItem.name}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                    {selectedItem.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]">
                        {t('home.palette.detailLabel1', { defaultValue: 'Yuzey Dayanimi' })}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {t('home.palette.detailText1', {
                          defaultValue: 'UV, nem ve zorlu dis hava kosullarina uygun premium firin boya ve metal yuzey secenekleri.',
                        })}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]">
                        {t('home.palette.detailLabel2', { defaultValue: 'Proje Uyumu' })}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {t('home.palette.detailText2', {
                          defaultValue: 'Kubbe, metal cati, alem ve tamamlayici detaylarda mimari dilinize uygun ton secimi.',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
