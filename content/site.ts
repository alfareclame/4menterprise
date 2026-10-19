export const site = {
  brand: '4M Enterprise',
  domain: '4menterprise.nl',
  url: 'https://4menterprise.nl',
  email: 'info@4menterprise.nl',
  kvk: '88606902',
  updated: '2026-10-19', // ISO; zichtbaar in footer + dateModified in JSON-LD
  city: 'Rotterdam',
  founder: 'Mustafa Doğan',
  founderTitle: 'Ondernemer & Computer Engineer (BSc)',
  meta: {
    title: '4M Enterprise | Ondernemersgroep uit Rotterdam — reclame, AI, mobiliteit & wonen',
    description:
      '4M Enterprise is het Rotterdamse moederbedrijf van Alfa Reclame, AanloopAI, FleetTrack Holland, Keuken in Beeld, Alles in Renovatie, Zoekeen en Trip & Tick: zes divisies, één aanspreekpunt.',
  },
  nav: [
    { label: 'De groep', href: '#groep' },
    { label: 'Over 4M', href: '#verhaal' },
    { label: 'Innovatie', href: '#innovatie' },
    { label: 'Werkwijze', href: '#werkwijze' },
    { label: 'Contact', href: '#contact' },
  ],
  navCta: { label: 'Neem contact op', href: '#contact' },
} as const;
