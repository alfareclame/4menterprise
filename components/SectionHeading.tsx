'use client';

import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
}: SectionHeadingProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="max-w-[44rem]"
        >
          <p className={dark ? 'eyebrow !text-staal-licht' : 'eyebrow'}>{eyebrow}</p>
          <h2
            className={`mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] ${dark ? 'text-wit' : ''}`}
          >
            {title}
          </h2>
          {intro && (
            <p className={`mt-4 text-lg ${dark ? 'text-beton' : 'text-staal'}`}>
              {intro}
            </p>
          )}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
