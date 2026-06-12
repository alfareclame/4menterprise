type Status = 'Actief' | 'In ontwikkeling' | 'Conceptfase' | 'R&D';

interface StatusBadgeProps {
  status: Status;
  dark?: boolean;
}

export default function StatusBadge({ status, dark = false }: StatusBadgeProps) {
  // dot + tekstlabel: status leunt nooit op kleur alleen
  const dotClass =
    status === 'Actief'
      ? 'bg-kraan'
      : status === 'In ontwikkeling'
        ? 'bg-staal'
        : dark
          ? 'border border-staal-licht'
          : 'border border-staal';

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${
        dark ? 'border-staal text-staal-licht' : 'border-lijn text-staal'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${dotClass}`} aria-hidden="true" />
      {status}
    </span>
  );
}
