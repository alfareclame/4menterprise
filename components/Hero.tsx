import { hero } from '@/content/copy';
import VentureMap from './VentureMap';

// entrance via CSS-keyframes (zie globals.css): start bij first paint,
// wacht niet op hydration — beter voor LCP dan een JS-gedreven animatie
const stagger = (index: number) => ({ animationDelay: `${index * 90}ms` });

export default function Hero() {
  return (
    <section id="hero" className="blueprint-grid overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pt-[clamp(3rem,8vw,6rem)] pb-[clamp(3rem,7vw,5rem)] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow hero-fade" style={stagger(0)}>
            {hero.eyebrow}
          </p>
          <h1
            className="hero-fade mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
            style={stagger(1)}
          >
            {hero.h1}
          </h1>
          <p
            className="hero-fade mt-6 max-w-[34rem] text-lg text-staal"
            style={stagger(2)}
          >
            {hero.subline}
          </p>
          <div className="hero-fade mt-9 flex flex-wrap gap-4" style={stagger(3)}>
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <VentureMap />
      </div>
      {/* feitenstrook — alle waarden verifieerbaar */}
      <div className="hero-fade border-t border-lijn" style={stagger(4)}>
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px px-6 md:grid-cols-4">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse gap-1 border-r border-lijn py-6 pr-6 last:border-r-0 md:py-8"
            >
              <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-staal">
                {stat.label}
              </dt>
              <dd className="font-display text-3xl font-extrabold md:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
