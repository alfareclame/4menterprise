import { bedrijven, divisies } from '@/content/groep';
import { site } from '@/content/site';

const PERSON_ID = `${site.url}/#person`;
const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

// alleen bedrijven met een live domein (piekai.nl nog niet — zie tasks/decisions.md)
const LIVE = bedrijven.filter((b): b is typeof b & { url: string } => b.url !== null);
const SAME_AS = LIVE.map((b) => b.url);

const SUB_ORGANIZATIONS = LIVE.map((b) => ({
  '@type': 'Organization',
  '@id': `${b.url}/#organization`,
  name: b.naam,
  url: b.url,
  description: b.tagline,
  knowsAbout: divisies.find((d) => d.id === b.divisie)?.naam,
  parentOrganization: { '@id': ORG_ID },
}));

const ROTTERDAM = {
  '@type': 'PostalAddress',
  addressLocality: 'Rotterdam',
  addressCountry: 'NL',
};

const PRIVACY_UPDATED = '2026-06-12'; // datum van de huidige privacytekst (git: app/privacy/page.tsx)

const AUTHOR = { '@type': 'Organization', '@id': ORG_ID, name: site.brand, url: site.url };

// Entity-disambiguatie: de merknaam lijkt op DJI Matrice 4 Enterprise (drone), geen verband.
const DISAMBIGUATION =
  'Nederlandse ondernemersgroep en moederbedrijf in Rotterdam (KvK 88606902); geen verband met DJI Enterprise-drones.';

export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: site.brand,
        alternateName: ['4menterprise', '4menterprise.nl'],
        url: site.url,
        logo: `${site.url}/logo.png`,
        founder: { '@id': PERSON_ID },
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'KVK',
          value: site.kvk,
        },
        email: site.email,
        description: site.meta.description,
        disambiguatingDescription: DISAMBIGUATION,
        knowsAbout: divisies.map((d) => d.naam),
        address: ROTTERDAM,
        subOrganization: SUB_ORGANIZATIONS,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: site.founder,
        jobTitle: 'Ondernemer & Computer Engineer',
        address: ROTTERDAM,
        worksFor: { '@id': ORG_ID },
        sameAs: SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: site.brand,
        url: site.url,
        inLanguage: 'nl-NL',
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

interface PageInput {
  path: string; // '/' of '/privacy/'
  name: string;
  description: string;
  dateModified: string;
}

// Per-pagina WebPage: description = meta description, echte dateModified, Organization als auteur.
export function buildPageJsonLd({ path, name, description, dateModified }: PageInput) {
  const url = `${site.url}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'nl-NL',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    author: AUTHOR,
    publisher: { '@id': ORG_ID },
    dateModified,
  };
}

export const homePageJsonLd = () =>
  buildPageJsonLd({ path: '/', name: site.meta.title, description: site.meta.description, dateModified: site.updated });

export { PRIVACY_UPDATED };
