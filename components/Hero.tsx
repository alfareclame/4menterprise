'use client';

import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion';
import { hero } from '@/content/copy';
import VentureMap from './VentureMap';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (index: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE, delay: index * 0.09 },
});

export default function Hero() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <section id="hero" className="overflow-hidden">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pt-[clamp(3rem,8vw,6rem)] pb-[clamp(4rem,10vw,8rem)] lg:grid-cols-[1.1fr_1fr]">
            <div>
              <m.p {...fadeUp(0)} className="eyebrow">
                {hero.eyebrow}
              </m.p>
              <m.h1
                {...fadeUp(1)}
                className="mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
              >
                {hero.h1}
              </m.h1>
              <m.p {...fadeUp(2)} className="mt-6 max-w-[34rem] text-lg text-staal">
                {hero.subline}
              </m.p>
              <m.div {...fadeUp(3)} className="mt-9 flex flex-wrap gap-4">
                <a href={hero.primaryCta.href} className="btn-primary">
                  {hero.primaryCta.label}
                </a>
                <a href={hero.secondaryCta.href} className="btn-secondary">
                  {hero.secondaryCta.label}
                </a>
              </m.div>
            </div>
            <VentureMap />
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
