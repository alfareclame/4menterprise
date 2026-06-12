import SectionHeading from './SectionHeading';
import { werkwijze } from '@/content/copy';

export default function Werkwijze() {
  return (
    <section id="werkwijze" className="py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading index="04" eyebrow={werkwijze.eyebrow} title={werkwijze.h2} />
        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {werkwijze.principles.map((principle, index) => (
            <div key={principle.title} className="relative border-t-[1.5px] border-havennacht pt-7">
              <span
                aria-hidden="true"
                className="absolute -top-[4px] left-0 h-1.5 w-1.5 bg-havennacht"
              />
              <p
                aria-hidden="true"
                className="font-display text-5xl font-extrabold leading-none text-lijn md:text-6xl"
              >
                0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold md:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-[32rem] text-staal">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
