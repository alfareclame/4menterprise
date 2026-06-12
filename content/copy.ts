export const hero = {
  eyebrow: '4M ENTERPRISE — ROTTERDAM — KVK 88606902',
  h1: 'Ik bouw bedrijven in Rotterdam.',
  subline:
    'Van AI-agents tot laadinfrastructuur. 4M Enterprise is het dak boven alles wat ik bouw: twee bedrijven, twee innovatieprojecten, één ingenieur.',
  primaryCta: { label: 'Bekijk de bedrijven', href: '#ventures' },
  secondaryCta: { label: 'Neem contact op', href: '#contact' },
  stats: [
    { value: '02', label: 'Bedrijven' },
    { value: '02', label: 'Innovatieprojecten' },
    { value: '01', label: 'KvK-inschrijving' },
    { value: '24/7', label: 'AI-agents actief' },
  ],
} as const;

export const verhaal = {
  eyebrow: 'HET VERHAAL',
  h2: 'Eén ingenieur, meerdere projecten.',
  paragraphs: [
    'Ik ben Mustafa Doğan, computer engineer en ondernemer in Rotterdam. 4M Enterprise is geen holding met een kantoorpand en een managementlaag — het is de naam boven mijn werk. Eén KvK-inschrijving, één verantwoordelijke, meerdere projecten.',
    'De rode draad is software die werk uit handen neemt. Met AanloopAI zet ik AI-receptionisten in die voor ondernemers de telefoon en WhatsApp afhandelen, dag en nacht. Leads worden gekwalificeerd en direct doorgestuurd — als maandelijkse dienst, van implementatie tot beheer.',
    'PiekAI, nu in ontwikkeling, pakt de volgende verschuiving: bedrijven vindbaar maken in AI-zoekmachines en -assistenten, voor groeibedrijven die verder kijken dan de klassieke zoekmachine.',
    'En daarnaast onderzoek ik wat er hierna komt: laadpunten in straatverlichting, automatische schadedetectie na een aanrijding. Dezelfde aanpak in elk project: eerst analyseren, dan bouwen, dan bewijzen. Vanuit Rotterdam — waar je aan een half woord genoeg hebt.',
  ],
  datasheet: {
    title: 'Datasheet',
    rows: [
      { key: 'Naam', value: 'Mustafa Doğan' },
      { key: 'Rol', value: 'Oprichter & ingenieur' },
      { key: 'Opleiding', value: 'BSc Computer Engineering' },
      { key: 'Basis', value: 'Rotterdam, Nederland' },
      { key: 'KvK', value: '88606902' },
      { key: 'Bedrijven', value: '2' },
      { key: 'R&D-projecten', value: '2' },
    ],
  },
  traject: {
    title: 'Het traject',
    steps: [
      {
        title: 'AI-agents in productie',
        body: 'AanloopAI is actief: AI-receptionisten die 24/7 telefoon en WhatsApp afhandelen voor het Nederlandse mkb.',
      },
      {
        title: 'Vindbaarheid in het AI-tijdperk',
        body: 'PiekAI is in ontwikkeling: zichtbaarheid in AI-zoekmachines en -assistenten (GEO) voor groeibedrijven.',
      },
      {
        title: 'Laadinfrastructuur',
        body: 'Conceptfase: projectvoorstel voor laadpunten in bestaande straatverlichting, gericht op Gemeente Rotterdam.',
      },
      {
        title: 'Schadedetectie',
        body: 'R&D: computer vision die voertuigschade na een aanrijding detecteert, lokaliseert en classificeert.',
      },
    ],
  },
} as const;

export const venturesIntro = {
  eyebrow: 'DE BEDRIJVEN',
  h2: 'Twee bedrijven, één aanpak.',
  intro: 'Elk bedrijf lost één concreet probleem op voor Nederlandse ondernemers.',
} as const;

export const innovatieIntro = {
  eyebrow: 'INNOVATIE',
  h2: 'Wat er hierna komt.',
  intro:
    'Naast de bedrijven werk ik aan twee projecten op het snijvlak van mobiliteit en AI. Eerlijk over de status: dit is onderzoek en ontwikkeling, geen verkooppraatje.',
} as const;

export const werkwijze = {
  eyebrow: 'WERKWIJZE',
  h2: 'Hoe ik werk.',
  principles: [
    {
      title: 'Eerst analyseren, dan bouwen.',
      body: 'Elk project begint met de vraag wat het echte probleem is — niet met de oplossing die toevallig voorhanden is.',
    },
    {
      title: 'Bewijzen, niet beloven.',
      body: 'Een functie is pas af als die aantoonbaar werkt. Dat geldt voor software, voor AI-agents en voor deze site.',
    },
    {
      title: 'Eén verantwoordelijke.',
      body: 'Alles onder één KvK, één aanspreekpunt. Geen lagen, geen doorverwijzen.',
    },
    {
      title: 'Eerlijk over status.',
      body: 'Wat actief is heet actief. Wat in ontwikkeling is, heet in ontwikkeling. Conceptfase is conceptfase.',
    },
  ],
} as const;

export const contact = {
  eyebrow: 'CONTACT',
  h2: 'Praten over een project?',
  body: 'Voor gemeenten, partners en ondernemers: één e-mail is genoeg. Ik antwoord zelf.',
  buttonLabel: 'Mail naar info@4menterprise.nl',
  subline: 'Rotterdam · KvK 88606902',
} as const;

export const footer = {
  left: '4M Enterprise — Rotterdam',
  kvk: 'KvK 88606902',
  links: [{ label: 'aanloopai.nl', url: 'https://aanloopai.nl' }],
  privacyLabel: 'Privacy',
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
