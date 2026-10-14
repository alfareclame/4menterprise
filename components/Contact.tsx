import SectionHeading from './SectionHeading';
import { contact } from '@/content/copy';
import { bedrijven, hostname } from '@/content/groep';
import { site } from '@/content/site';

const bereikbaar = bedrijven.filter((b) => b.url !== null);

export default function Contact() {
  return (
    <section id="contact" className="border-t border-lijn py-[clamp(4rem,10vw,8rem)]">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            index="05"
            eyebrow={contact.eyebrow}
            title={contact.h2}
            intro={contact.body}
          />
          <a href={`mailto:${site.email}`} className="btn-primary mt-9 active:translate-y-px">
            {contact.buttonLabel}
          </a>
          <p className="mt-6 font-mono text-sm text-staal">{contact.subline}</p>
        </div>

        <div className="lg:pt-2">
          <h3 className="eyebrow">{contact.direktTitel}</h3>
          <ul className="mt-5 divide-y divide-lijn border-y border-lijn">
            {bereikbaar.map((bedrijf) => {
              const host = hostname(bedrijf.url as string);
              return (
                <li
                  key={bedrijf.id}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[11rem_1fr_auto]"
                >
                  <span className="font-display text-[1.05rem] font-semibold">{bedrijf.naam}</span>
                  {bedrijf.email ? (
                    <a
                      href={`mailto:${bedrijf.email}`}
                      className="order-3 col-span-2 font-mono text-[13px] text-staal transition-colors duration-150 hover:text-kraan-diep sm:order-none sm:col-span-1"
                    >
                      {bedrijf.email}
                    </a>
                  ) : (
                    <span className="order-3 col-span-2 font-mono text-[13px] text-staal sm:order-none sm:col-span-1">
                      via contactformulier op de site
                    </span>
                  )}
                  <a
                    href={bedrijf.url as string}
                    target="_blank"
                    rel="noopener"
                    className="font-mono text-[12px] font-medium uppercase tracking-[0.06em] transition-colors duration-150 hover:text-kraan-diep"
                  >
                    {host} ↗<span className="sr-only"> (opent in nieuw tabblad)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
