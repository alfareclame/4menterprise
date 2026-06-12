import type { Metadata } from 'next';
import Link from 'next/link';
import { privacy } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Privacyverklaring | 4M Enterprise',
  description:
    'Privacyverklaring van 4M Enterprise (Rotterdam, KvK 88606902): geen cookies, geen trackers, alleen e-mailcontact.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
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
  );
}
