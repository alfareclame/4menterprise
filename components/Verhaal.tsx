import SectionHeading from './SectionHeading';
import { verhaal } from '@/content/copy';

export default function Verhaal() {
  return (
    <section id="verhaal" className="border-t border-lijn py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading index="01" eyebrow={verhaal.eyebrow} title={verhaal.h2} />
        {/* FOTO-SLOT: portret M — wordt later aangeleverd */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-[44rem] space-y-6">
            {verhaal.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <aside className="h-fit border border-lijn bg-wit p-7 lg:mt-2">
            <p className="eyebrow">{verhaal.datasheet.title}</p>
            <dl className="mt-5 divide-y divide-lijn">
              {verhaal.datasheet.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-staal">
                    {row.key}
                  </dt>
                  <dd className="text-right text-sm font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* het traject: van fysiek naar AI, in vier stappen */}
        <div className="mt-20">
          <h3 className="eyebrow">{verhaal.traject.title}</h3>
          <ol className="mt-8 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {verhaal.traject.steps.map((step, index) => (
              <li key={step.title} className="relative border-t-[1.5px] border-havennacht pt-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-[4px] left-0 h-1.5 w-1.5 bg-havennacht"
                />
                <p className="font-mono text-sm font-medium text-kraan-diep">
                  0{index + 1}
                </p>
                <h4 className="mt-2 font-display text-lg font-semibold">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-staal">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
