'use client';

import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion';
import SectionHeading from './SectionHeading';
import VentureCard from './VentureCard';
import { ventures } from '@/content/ventures';
import { venturesIntro } from '@/content/copy';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Ventures() {
  return (
    <section id="ventures" className="py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          index="02"
          eyebrow={venturesIntro.eyebrow}
          title={venturesIntro.h2}
          intro={venturesIntro.intro}
        />
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <div className="mt-12 space-y-6">
              {ventures.map((venture, index) => (
                <m.div
                  key={venture.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, ease: EASE, delay: (index % 2) * 0.06 }}
                >
                  <VentureCard
                    venture={venture}
                    index={index}
                    total={ventures.length}
                  />
                </m.div>
              ))}
            </div>
          </MotionConfig>
        </LazyMotion>
      </div>
    </section>
  );
}
