import StatusBadge from './StatusBadge';
import type { Venture } from '@/content/ventures';

export default function VentureCard({ venture }: { venture: Venture }) {
  const hostname = venture.url ? new URL(venture.url).hostname : null;

  return (
    <article className="flex h-full flex-col rounded-[2px] border border-lijn bg-wit p-8 transition-colors duration-[180ms] hover:border-havennacht">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold">{venture.name}</h3>
        <StatusBadge status={venture.status} />
      </div>
      <p className="mt-3 font-display text-lg font-semibold text-havennacht">
        {venture.tagline}
      </p>
      <ul className="mt-5 space-y-2.5">
        {venture.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-[0.95rem] text-staal">
            {/* vierkante marker: tekentafel, geen bolletje */}
            <span
              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-havennacht"
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </ul>
      {venture.url && hostname && (
        <a
          href={venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-6 font-mono text-sm font-medium uppercase tracking-[0.08em] text-havennacht transition-colors duration-150 hover:text-kraan-diep"
        >
          Bezoek {hostname} →
          <span className="sr-only"> (opent in nieuw tabblad)</span>
        </a>
      )}
    </article>
  );
}
