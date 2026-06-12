import { footer } from '@/content/copy';

// vastgelegd op buildtijd — statische export, dus geen hydration-verschil
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-lijn bg-wit">
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="font-medium">{footer.left}</p>
          <p className="mt-1 font-mono text-sm text-staal">{footer.kvk}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {footer.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors duration-150 hover:text-kraan-diep"
              >
                {link.label}
                <span className="sr-only"> (opent in nieuw tabblad)</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="md:text-right">
          <a
            href="/privacy/"
            className="text-sm font-medium transition-colors duration-150 hover:text-kraan-diep"
          >
            {footer.privacyLabel}
          </a>
        </div>
      </div>
      <div className="border-t border-lijn">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <p className="font-mono text-xs text-staal">{footer.bottom(year)}</p>
        </div>
      </div>
    </footer>
  );
}
