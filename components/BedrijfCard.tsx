'use client';

import type { MouseEvent } from 'react';
import StatusBadge from './StatusBadge';
import { hostname, type Bedrijf } from '@/content/groep';

interface BedrijfCardProps {
  bedrijf: Bedrijf;
  breed?: boolean; // enige bedrijf in de divisie: horizontale opbouw op desktop
}

// spotlight-rand: de cursorpositie stuurt een radiale gloed via CSS-variabelen
const volgCursor = (event: MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--sx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--sy', `${event.clientY - rect.top}px`);
};

export default function BedrijfCard({ bedrijf, breed = false }: BedrijfCardProps) {
  const host = bedrijf.url ? hostname(bedrijf.url) : null;

  return (
    <article
      onMouseMove={volgCursor}
      className="spotlight group relative flex h-full flex-col rounded-[3px] border border-lijn bg-wit p-7 shadow-[0_1px_0_rgba(16,28,40,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-havennacht/40 hover:shadow-[0_18px_40px_-24px_rgba(16,28,40,0.35)] md:p-8"
    >
      <div className={breed ? 'grid flex-1 gap-8 lg:grid-cols-[1fr_1.15fr]' : 'flex flex-1 flex-col'}>
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden="true"
              className="inline-flex h-12 min-w-12 items-center justify-center rounded-[3px] bg-havennacht px-2 font-display text-base font-extrabold tracking-tight text-wit transition-colors duration-200 group-hover:bg-kraan-diep"
            >
              {bedrijf.monogram}
            </span>
            <StatusBadge status={bedrijf.status} />
          </div>
          <h4 className="mt-6 font-display text-2xl font-extrabold leading-tight">
            {bedrijf.naam}
          </h4>
          <p className="mt-2 font-display text-[1.05rem] font-semibold leading-snug [text-wrap:balance]">
            {bedrijf.tagline}
          </p>
          <p className="mt-4 max-w-[38rem] text-[0.95rem] leading-relaxed text-staal [text-wrap:pretty]">
            {bedrijf.beschrijving}
          </p>
        </div>

        <div className={breed ? 'flex flex-col' : 'mt-6 flex flex-1 flex-col'}>
          <ul className="space-y-2" aria-label={`Kerngegevens ${bedrijf.naam}`}>
            {bedrijf.feiten.map((feit) => (
              <li key={feit} className="flex items-baseline gap-3 font-mono text-[13px] font-medium">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] bg-kraan" aria-hidden="true" />
                {feit}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Diensten ${bedrijf.naam}`}>
            {bedrijf.diensten.map((dienst) => (
              <li key={dienst} className="chip">
                {dienst}
              </li>
            ))}
          </ul>

          {/* link onderaan vastgepind: één lijn over alle kaarten */}
          <div className="min-h-7 flex-1" aria-hidden="true" />
          <div className="flex items-center justify-between gap-4 border-t border-lijn pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-staal">
              {bedrijf.regio}
            </span>
            {bedrijf.url && host ? (
              <a
                href={bedrijf.url}
                target="_blank"
                rel="noopener"
                className="group/link inline-flex items-center gap-1.5 font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-havennacht transition-colors duration-150 hover:text-kraan-diep"
              >
                {host}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                >
                  ↗
                </span>
                <span className="sr-only"> (opent in nieuw tabblad)</span>
              </a>
            ) : (
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-staal">
                Binnenkort online
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
