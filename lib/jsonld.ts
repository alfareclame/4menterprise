import { site } from '@/content/site';

const PERSON_ID = `${site.url}/#person`;
const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

// sameAs bevat alleen domeinen die live zijn (piekai.nl nog niet — zie tasks/decisions.md)
const SAME_AS = ['https://aanloopai.nl'];

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
        address: ROTTERDAM,
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
