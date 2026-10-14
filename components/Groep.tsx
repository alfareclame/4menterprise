'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domMax, m } from 'framer-motion';
import SectionHeading from './SectionHeading';
import BedrijfCard from './BedrijfCard';
import { bedrijven, bedrijvenVan, divisies } from '@/content/groep';
import { groepIntro } from '@/content/copy';

const EASE = [0.22, 1, 0.36, 1] as const;
const ALLE = 'alle';
const HASH_PREFIX = '#divisie-';

export default function Groep() {
  const [actief, setActief] = useState<string>(ALLE);
  const sectionRef = useRef<HTMLElement>(null);

  // deep-link vanuit het schema in de hero en de footer: #divisie-<id>
  useEffect(() => {
    const vanHash = () => {
      const { hash } = window.location;
      if (!hash.startsWith(HASH_PREFIX)) return;
      const id = hash.slice(HASH_PREFIX.length);
      if (!divisies.some((d) => d.id === id)) return;
      setActief(id);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    vanHash();
    window.addEventListener('hashchange', vanHash);
    return () => window.removeEventListener('hashchange', vanHash);
  }, []);

  const zichtbaar = actief === ALLE ? divisies : divisies.filter((d) => d.id === actief);

  const tabs = [
    { id: ALLE, label: groepIntro.alleLabel, aantal: bedrijven.length },
    ...divisies.map((d) => ({ id: d.id, label: d.kort, aantal: bedrijvenVan(d.id).length })),
  ];

  return (
    <section
      id="groep"
      ref={sectionRef}
      className="border-t border-lijn py-[clamp(4rem,10vw,8rem)]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          index="01"
          eyebrow={groepIntro.eyebrow}
          title={groepIntro.h2}
          intro={groepIntro.intro}
        />

        <LazyMotion features={domMax} strict>
          <MotionConfig reducedMotion="user">
            {/* filter: horizontaal scrollbaar op mobiel, geen afgebroken labels */}
            <div
              role="group"
              aria-label="Filter op divisie"
              className="-mx-6 mt-12 overflow-x-auto px-6 [scrollbar-width:none]"
            >
              <div className="inline-flex min-w-max gap-1 rounded-[3px] border border-lijn bg-wit p-1">
                {tabs.map((tab) => {
                  const isActief = actief === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={isActief}
                      onClick={() => {
                        setActief(tab.id);
                        const hash = tab.id === ALLE ? '#groep' : `${HASH_PREFIX}${tab.id}`;
                        window.history.replaceState(null, '', hash);
                      }}
                      className={`relative flex items-center gap-2 rounded-[2px] px-3.5 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 active:scale-[0.98] ${
                        isActief ? 'text-wit' : 'text-staal hover:text-havennacht'
                      }`}
                    >
                      {isActief && (
                        <m.span
                          layoutId="groep-filter"
                          className="absolute inset-0 rounded-[2px] bg-havennacht"
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{tab.label}</span>
                      <span
                        className={`relative tabular-nums ${isActief ? 'text-kraan' : 'text-staal-licht'}`}
                      >
                        {String(tab.aantal).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {zichtbaar.map((divisie) => {
                  const leden = bedrijvenVan(divisie.id);
                  const nummer = divisies.findIndex((d) => d.id === divisie.id) + 1;
                  return (
                    <m.div
                      key={divisie.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      id={`divisie-${divisie.id}`}
                      className="grid gap-6 border-t-[1.5px] border-havennacht pt-6 lg:grid-cols-[17rem_1fr] lg:gap-10"
                    >
                      <header className="lg:sticky lg:top-24 lg:self-start">
                        <p className="font-mono text-sm font-medium text-kraan-diep">
                          D{String(nummer).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                          {divisie.naam}
                        </h3>
                        <p className="mt-3 text-[0.95rem] text-staal [text-wrap:pretty]">
                          {divisie.omschrijving}
                        </p>
                      </header>
                      <div
                        className={`grid gap-5 ${leden.length > 1 ? 'md:grid-cols-2' : ''}`}
                      >
                        {leden.map((bedrijf) => (
                          <BedrijfCard
                            key={bedrijf.id}
                            bedrijf={bedrijf}
                            breed={leden.length === 1}
                          />
                        ))}
                      </div>
                    </m.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </MotionConfig>
        </LazyMotion>
      </div>
    </section>
  );
}
