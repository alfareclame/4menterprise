import type { Metadata } from 'next';
import { archivo, bricolage, plexMono } from './fonts';
import { site } from '@/content/site';
import { buildJsonLd } from '@/lib/jsonld';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: site.brand,
    title: site.meta.title,
    description: site.meta.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
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
