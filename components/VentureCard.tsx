import StatusBadge from './StatusBadge';
import type { Venture } from '@/content/ventures';

interface VentureCardProps {
  venture: Venture;
  index: number;
  total: number;
}

export default function VentureCard({ venture, index, total }: VentureCardProps) {
  const hostname = venture.url ? new URL(venture.url).hostname : null;

  return (
    <article className="rounded-[2px] border border-lijn bg-wit p-8 transition-colors duration-[180ms] hover:border-havennacht md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-sm font-medium text-staal">
            0{index + 1} / 0{total}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">
              {venture.name}
            </h3>
            <StatusBadge status={venture.status} />
          </div>
          <p className="mt-4 font-display text-lg font-semibold text-havennacht">
            {venture.tagline}
          </p>
          {venture.url && hostname && (
            <a
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-mono text-sm font-medium uppercase tracking-[0.08em] text-havennacht transition-colors duration-150 hover:text-kraan-diep"
            >
              Bezoek {hostname} →
              <span className="sr-only"> (opent in nieuw tabblad)</span>
            </a>
          )}
        </div>
        <div>
          <p className="text-staal">{venture.beschrijving}</p>
          <ul className="mt-6 space-y-2.5">
            {venture.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[0.95rem]">
                {/* vierkante marker: tekentafel, geen bolletje */}
                <span
                  className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-kraan"
                  aria-hidden="true"
                />
                {bullet}
              </li>
            ))}
          </ul>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Diensten">
            {venture.diensten.map((dienst) => (
              <li key={dienst} className="chip">
                {dienst}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
