import { Archivo, Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';

// latin-ext is verplicht: "Doğan" moet in alle drie de fonts correct renderen
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});
