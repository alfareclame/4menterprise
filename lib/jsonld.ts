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

export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
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
        '@type': 'Organization',
        '@id': ORG_ID,
        name: site.brand,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        founder: { '@id': PERSON_ID },
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'KVK',
          value: site.kvk,
        },
        email: site.email,
        description: site.meta.description,
        address: ROTTERDAM,
        subOrganization: SUB_ORGANIZATIONS,
      },
      {
        '@type': 'WebPage',
        '@id': `${site.url}/#webpage`,
        url: `${site.url}/`,
        name: site.meta.title,
        inLanguage: 'nl-NL',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        dateModified: site.updated,
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
