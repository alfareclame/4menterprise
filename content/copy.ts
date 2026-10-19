import { actieveBedrijven, divisies } from './groep';

const pad = (n: number) => String(n).padStart(2, '0');

export const hero = {
  eyebrow: '4M ENTERPRISE — ONDERNEMERSGROEP — ROTTERDAM',
  h1: 'Eén groep. Elk bedrijf lost één probleem op.',
  subline:
    'Van gevelreclame tot AI-receptionisten, van GPS-tracking tot keukenvisualisatie. 4M Enterprise is het moederbedrijf boven een groep gespecialiseerde bedrijven — met één aanspreekpunt in Rotterdam.',
  primaryCta: { label: 'Bekijk de groep', href: '#groep' },
  secondaryCta: { label: 'Neem contact op', href: '#contact' },
  stats: [
    { value: pad(actieveBedrijven.length), label: 'Actieve bedrijven' },
    { value: pad(divisies.length), label: 'Divisies' },
    { value: '2012', label: 'Eerste bedrijf' },
    { value: '24/7', label: 'AI-agents actief' },
  ],
} as const;

export const groepIntro = {
  eyebrow: 'DE GROEP',
  h2: 'Gespecialiseerde bedrijven, één moederbedrijf.',
  intro:
    'Elk bedrijf heeft een eigen vak, een eigen site en een eigen klantenkring. Wat ze delen: dezelfde ondernemer, dezelfde software-ruggengraat en dezelfde eis — aantoonbaar werk leveren.',
  alleLabel: 'Alle bedrijven',
} as const;

export const verhaal = {
  eyebrow: 'OVER 4M ENTERPRISE',
  h2: 'Van reclamebureau tot ondernemersgroep.',
  paragraphs: [
    '4M Enterprise is het moederbedrijf van Mustafa Doğan, computer engineer en ondernemer in Rotterdam. Het begon in 2012 met Alfa Reclame: ontwerpen, produceren en monteren met één Rotterdams team. Dat vak — iets fysieks maken dat werkt — is nog steeds de basis.',
    'Daaruit groeide een groep. FleetTrack Holland bracht GPS-tracking zonder lange contracten naar het mkb. AanloopAI zet AI-receptionisten in die dag en nacht de telefoon en WhatsApp opnemen. Keuken in Beeld, Alles in Renovatie en Zoekeen helpen mensen kiezen en verbouwen, en Trip & Tick maakt reizen in Cappadocië transparant.',
    'Wat de bedrijven verbindt, is één ruggengraat: gedeelde software, gedeelde kennis van vindbaarheid in Google én in AI-zoekmachines, en één werkwijze. Eerst analyseren, dan bouwen, dan bewijzen.',
  ],
  datasheet: {
    title: 'Datasheet',
    rows: [
      { key: 'Moederbedrijf', value: '4M Enterprise' },
      { key: 'Oprichter', value: 'Mustafa Doğan' },
      { key: 'Opleiding', value: 'BSc Computer Engineering' },
      { key: 'Basis', value: 'Rotterdam, Nederland' },
      { key: 'KvK', value: '88606902' },
      { key: 'Actieve bedrijven', value: String(actieveBedrijven.length) },
      { key: 'Divisies', value: String(divisies.length) },
      { key: 'Sinds', value: '2012' },
    ],
  },
  traject: {
    title: 'Hoe de groep groeide',
    steps: [
      {
        title: 'Het vak: reclame maken',
        body: 'Alfa Reclame (sinds 2012): ontwerp, productie en montage van gevel-, licht- en autoreclame in Rotterdam.',
      },
      {
        title: 'Van product naar dienst',
        body: 'FleetTrack Holland: GPS-tracking als maandelijkse dienst — opzegbaar, zelf te installeren.',
      },
      {
        title: 'AI in productie',
        body: 'AanloopAI: AI-receptionisten en automatisering die 24/7 draaien voor het Nederlandse mkb.',
      },
      {
        title: 'Platforms die matchen',
        body: 'Keuken in Beeld, Zoekeen, Alles in Renovatie en Trip & Tick: van keuze tot uitvoering, transparant.',
      },
    ],
  },
} as const;

export const innovatieIntro = {
  eyebrow: 'INNOVATIE',
  h2: 'Wat er hierna komt.',
  intro:
    'Naast de bedrijven werkt de groep aan twee projecten op het snijvlak van mobiliteit en AI. Eerlijk over de status: dit is onderzoek en ontwikkeling, geen verkooppraatje.',
} as const;

export const werkwijze = {
  eyebrow: 'WERKWIJZE',
  h2: 'Wat elk bedrijf van de groep deelt.',
  principles: [
    {
      title: 'Eerst analyseren, dan bouwen.',
      body: 'Elk project begint met de vraag wat het echte probleem is — niet met de oplossing die toevallig voorhanden is.',
    },
    {
      title: 'Bewijzen, niet beloven.',
      body: 'Een dienst is pas af als die aantoonbaar werkt. Dat geldt voor een lichtbak, een tracker, een AI-agent en voor deze site.',
    },
    {
      title: 'Eén aanspreekpunt.',
      body: 'Werk je met meerdere bedrijven uit de groep? Dan heb je toch één contactpersoon. Geen lagen, geen doorverwijzen.',
    },
    {
      title: 'Eerlijk over status.',
      body: 'Wat actief is heet actief. Wat in ontwikkeling is, heet in ontwikkeling. Conceptfase is conceptfase.',
    },
  ],
} as const;

export const contact = {
  eyebrow: 'CONTACT',
  h2: 'Eén aanspreekpunt voor de hele groep.',
  body: 'Voor partners, gemeenten, investeerders en klanten die met meerdere bedrijven werken: mail het moederbedrijf. Voor een offerte of vraag over één dienst kun je ook direct naar het bedrijf zelf.',
  buttonLabel: 'Mail naar info@4menterprise.nl',
  direktTitel: 'Direct naar een bedrijf',
  subline: 'Rotterdam · KvK 88606902',
} as const;

export const footer = {
  pitch: 'Moederbedrijf van een groep gespecialiseerde bedrijven, gevestigd in Rotterdam.',
  groepTitel: 'Bedrijven van 4M Enterprise',
  kvk: 'KvK 88606902',
  privacyLabel: 'Privacy',
  aboutLabel: 'Over 4M Enterprise',
  updatedPrefix: 'Bijgewerkt op',
  bottom: (year: number) => `© ${year} 4M Enterprise. Gebouwd in Rotterdam.`,
} as const;

export const notFound = {
  heading: 'Pagina niet gevonden',
  line: 'Deze pagina bestaat niet — maar de bedrijven wel.',
  button: 'Terug naar home',
} as const;

export const privacy = {
  h1: 'Privacyverklaring',
  intro:
    '4M Enterprise, gevestigd in Rotterdam (KvK 88606902), beheert de website 4menterprise.nl. Deze verklaring beschrijft hoe met persoonsgegevens wordt omgegaan.',
  sections: [
    {
      heading: 'Welke gegevens worden verzameld?',
      body: 'Deze website gebruikt geen cookies, geen analytics en geen trackers. Er worden geen persoonsgegevens verzameld via de website zelf.',
    },
    {
      heading: 'E-mailcontact',
      body: 'Wie contact opneemt via e-mail, deelt daarmee naam, e-mailadres en de inhoud van het bericht. Deze gegevens worden uitsluitend gebruikt om de vraag te beantwoorden en worden niet gedeeld met derden, tenzij dat wettelijk verplicht is.',
    },
    {
      heading: 'Bewaartermijn',
      body: 'E-mailcorrespondentie wordt bewaard zolang dat nodig is voor de afhandeling van het contact, en daarna verwijderd of gearchiveerd voor zover wettelijk vereist.',
    },
    {
      heading: 'Hosting',
      body: 'De website wordt gehost via Cloudflare Pages. Cloudflare kan voor de technische levering van de site server-logs verwerken (zoals IP-adressen) conform haar eigen privacybeleid.',
    },
    {
      heading: 'Rechten',
      body: 'Op grond van de AVG heeft u recht op inzage, correctie en verwijdering van uw persoonsgegevens. Neem hiervoor contact op via info@4menterprise.nl.',
    },
    {
      heading: 'Wijzigingen',
      body: 'Deze verklaring kan worden aangepast. De actuele versie staat altijd op deze pagina.',
    },
  ],
  lastUpdated: 'Laatst bijgewerkt: juni 2026',
  backLink: '← Terug naar home',
} as const;
