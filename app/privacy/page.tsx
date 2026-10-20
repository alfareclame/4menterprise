import type { Metadata } from 'next';
import Link from 'next/link';
import { privacy } from '@/content/copy';
import { site } from '@/content/site';
import { PRIVACY_UPDATED, buildPageJsonLd } from '@/lib/jsonld';

const TITLE = 'Privacyverklaring | 4M Enterprise';
const DESCRIPTION =
  'Privacyverklaring van 4M Enterprise (Rotterdam, KvK 88606902): geen cookies, geen trackers, alleen e-mailcontact.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
  openGraph: { type: 'website', locale: 'nl_NL', siteName: site.brand, title: TITLE, description: DESCRIPTION, url: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildPageJsonLd({ path: '/privacy/', name: TITLE, description: DESCRIPTION, dateModified: PRIVACY_UPDATED }),
        ),
      }}
    />
    <main id="main" className="mx-auto max-w-[44rem] px-6 py-[clamp(4rem,10vw,7rem)]">
      <Link
        href="/"
        className="font-mono text-sm text-staal transition-colors duration-150 hover:text-kraan-diep"
      >
        {privacy.backLink}
      </Link>
      <h1 className="mt-8 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1]">
        {privacy.h1}
      </h1>
      <p className="mt-6">{privacy.intro}</p>
      {privacy.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
          <p className="mt-3 text-staal">{section.body}</p>
        </section>
      ))}
      <p className="mt-12 font-mono text-xs text-staal">{privacy.lastUpdated}</p>
    </main>
    </>
  );
}
