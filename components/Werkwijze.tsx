import SectionHeading from './SectionHeading';
import { werkwijze } from '@/content/copy';

export default function Werkwijze() {
  return (
    <section id="werkwijze" className="py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading eyebrow={werkwijze.eyebrow} title={werkwijze.h2} />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {werkwijze.principles.map((principle, index) => (
            <div key={principle.title} className="border-t border-lijn pt-6">
              <p className="font-mono text-sm font-medium text-staal">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {principle.title}
              </h3>
              <p className="mt-2 text-staal">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
