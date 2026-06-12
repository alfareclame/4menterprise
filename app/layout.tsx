import type { Metadata } from 'next';
import { archivo, bricolage, plexMono } from './fonts';
import { site } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${bricolage.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-wit focus:px-4 focus:py-2 focus:font-medium focus:text-havennacht focus:border focus:border-havennacht focus:rounded-[2px]"
        >
          Direct naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}
