import Image from 'next/image';
import Link from 'next/link';
import { footer } from '@/content/copy';
import { bedrijvenVan, divisies, hostname } from '@/content/groep';
import { site } from '@/content/site';

// vastgelegd op buildtijd — statische export, dus geen hydration-verschil
const year = new Date().getFullYear();

const updatedLabel = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(site.updated));

export default function Footer() {
  return (
    <footer className="blueprint-grid-dark bg-havennacht text-beton">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pt-16 pb-12 lg:grid-cols-[18rem_1fr]">
        {/* moederbedrijf */}
        <div>
          <Link href="/" className="inline-flex items-center" aria-label="4M Enterprise — home">
            <Image src="/logo-wit.png" alt="4M Enterprise — Research & Development" width={1200} height={259} className="h-10 w-auto" />
          </Link>
          <p className="mt-5 max-w-[18rem] text-[0.95rem] leading-relaxed text-staal-licht">
            {footer.pitch}
          </p>
          <dl className="mt-6 space-y-1.5 font-mono text-[13px]">
            <div className="flex gap-3">
              <dt className="text-staal-licht">KvK</dt>
              <dd className="text-wit">{site.kvk}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-staal-licht">Mail</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="text-wit transition-colors duration-150 hover:text-kraan">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-staal-licht">Basis</dt>
              <dd className="text-wit">{site.city}, NL</dd>
            </div>
          </dl>
        </div>

        {/* de groep, per divisie */}
        <nav aria-labelledby="footer-groep">
          <h2 id="footer-groep" className="eyebrow !text-staal-licht">
            {footer.groepTitel}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-3">
            {divisies.map((divisie) => (
              <div key={divisie.id}>
                <a
                  href={`/#divisie-${divisie.id}`}
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-kraan-licht transition-colors duration-150 hover:text-wit"
                >
                  {divisie.naam}
                </a>
                <ul className="mt-3 space-y-2.5">
                  {bedrijvenVan(divisie.id).map((bedrijf) => (
                    <li key={bedrijf.id}>
                      {bedrijf.url ? (
                        <a
                          href={bedrijf.url}
                          target="_blank"
                          rel="noopener"
                          className="group flex flex-col"
                        >
                          <span className="font-medium text-wit transition-colors duration-150 group-hover:text-kraan">
                            {bedrijf.naam}
                          </span>
                          <span className="font-mono text-[12px] text-staal-licht">
                            {hostname(bedrijf.url)} ↗
                          </span>
                          <span className="sr-only"> (opent in nieuw tabblad)</span>
                        </a>
                      ) : (
                        <span className="flex flex-col">
                          <span className="font-medium text-wit">{bedrijf.naam}</span>
                          <span className="font-mono text-[12px] text-staal-licht">
                            {bedrijf.status.toLowerCase()}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div className="border-t border-staal/60">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-5">
          <p className="font-mono text-xs text-staal-licht">
            {footer.bottom(year)} {footer.updatedPrefix}{' '}
            <time dateTime={site.updated}>{updatedLabel}</time>.
          </p>
          <Link
            href="/#verhaal"
            className="font-mono text-xs text-staal-licht transition-colors duration-150 hover:text-wit"
          >
            {footer.aboutLabel}
          </Link>
          <Link
            href="/privacy/"
            className="font-mono text-xs text-staal-licht transition-colors duration-150 hover:text-wit"
          >
            {footer.privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
