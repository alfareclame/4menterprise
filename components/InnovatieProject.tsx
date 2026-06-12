import StatusBadge from './StatusBadge';
import type { InnovatieProject as Project } from '@/content/innovatie';

export default function InnovatieProject({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 py-12 lg:grid-cols-[1fr_1.6fr]">
      <div>
        <h3 className="font-display text-2xl font-semibold text-wit">
          {project.name}
        </h3>
        <div className="mt-4">
          <StatusBadge dark status={project.status} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-staal-licht">
          {project.statusToelichting}
        </p>
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
