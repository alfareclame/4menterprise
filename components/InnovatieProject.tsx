import StatusBadge from './StatusBadge';
import type { InnovatieProject as Project } from '@/content/innovatie';

// abstracte lijnschema's in tekentafel-stijl — decoratief, geen feiteninhoud
function LaadpuntSchema() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="w-full max-w-[260px]">
      <g fill="none" stroke="var(--color-staal-licht)" strokeWidth="1.5">
        <path d="M10 110 H190" />
        <path d="M40 110 V30 H64" />
        <rect x="64" y="25" width="16" height="9" />
        <path d="M34 68 H46 V86 H34 Z" />
        <path d="M46 80 C 72 102, 92 102, 108 96" strokeDasharray="3 5" />
        <path d="M112 106 H164 M118 106 V92 L128 80 H150 L160 92 V106" />
      </g>
      <g fill="none" stroke="var(--color-staal-licht)" strokeWidth="1.5">
        <circle cx="126" cy="106" r="6" />
        <circle cx="154" cy="106" r="6" />
      </g>
      <rect x="105" y="92" width="6" height="6" fill="var(--color-kraan)" stroke="none" />
      <g stroke="var(--color-kraan)" strokeWidth="1.5">
        <path d="M68 38 L64 46 M72 38 L70 46 M76 38 L76 46" />
      </g>
    </svg>
  );
}

function SchadeSchema() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="w-full max-w-[260px]">
      <g fill="none" stroke="var(--color-staal-licht)" strokeWidth="1.5">
        <path d="M30 98 H170 M38 98 V84 L52 68 H120 L140 84 V98" />
        <circle cx="62" cy="98" r="7" />
        <circle cx="142" cy="98" r="7" />
        <path d="M56 84 H128" strokeDasharray="3 5" />
      </g>
      {/* zoeker-hoeken */}
      <g fill="none" stroke="var(--color-staal-licht)" strokeWidth="1.5">
        <path d="M22 40 H34 M22 40 V52" />
        <path d="M178 40 H166 M178 40 V52" />
        <path d="M22 112 H34 M22 112 V100" />
        <path d="M178 112 H166 M178 112 V100" />
      </g>
      {/* detectie-kruis op schadepunt */}
      <g fill="none" stroke="var(--color-kraan)" strokeWidth="1.5">
        <circle cx="120" cy="78" r="11" />
        <path d="M120 62 V70 M120 86 V94 M104 78 H112 M128 78 H136" />
      </g>
    </svg>
  );
}

export default function InnovatieProject({ project }: { project: Project }) {
  return (
    <article className="grid gap-10 py-14 lg:grid-cols-[1.1fr_1.6fr]">
      <div>
        <h3 className="font-display text-2xl font-semibold text-wit md:text-3xl">
          {project.name}
        </h3>
        <div className="mt-4">
          <StatusBadge dark status={project.status} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-staal-licht">
          {project.statusToelichting}
        </p>
        <div className="mt-8">
          {project.id === 'laadpunten' ? <LaadpuntSchema /> : <SchadeSchema />}
        </div>
      </div>
      <dl className="space-y-7">
        <div>
          <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-staal-licht">
            Probleem
          </dt>
          <dd className="mt-2 text-beton">{project.probleem}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-staal-licht">
            Oplossing
          </dt>
          <dd className="mt-2 text-beton">{project.oplossing}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-staal-licht">
            Impact
          </dt>
          <dd className="mt-2 text-beton">{project.impact}</dd>
        </div>
      </dl>
    </article>
  );
}
