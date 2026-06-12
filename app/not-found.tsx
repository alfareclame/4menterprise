import type { Metadata } from 'next';
import { notFound } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Pagina niet gevonden | 4M Enterprise',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold">
        {notFound.heading}
      </h1>
      <p className="mt-4 text-staal">{notFound.line}</p>
      <a href="/" className="btn-primary mt-8">
        {notFound.button}
      </a>
    </main>
  );
}
