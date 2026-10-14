// De groep: alle bedrijven onder 4M Enterprise, ingedeeld in divisies.
// Elk "feit" staat letterlijk (of vrijwel letterlijk) op de live site van het
// bedrijf zelf — gecontroleerd met curl op 2026-10-14. Geen cijfers toevoegen
// die niet op de bron-site staan.

export type BedrijfStatus = 'Actief' | 'In ontwikkeling';

export interface Divisie {
  id: string;
  naam: string;
  kort: string; // label in schema + tabs
  omschrijving: string;
}

export interface Bedrijf {
  id: string;
  naam: string;
  monogram: string;
  divisie: Divisie['id'];
  tagline: string;
  beschrijving: string;
  diensten: string[];
  feiten: string[]; // verifieerbaar op de eigen site
  regio: string;
  email: string | null;
  status: BedrijfStatus;
  url: string | null; // null = (nog) geen live domein
}

export const divisies: Divisie[] = [
  {
    id: 'reclame',
    naam: 'Reclame & Signing',
    kort: 'Reclame',
    omschrijving:
      'Ontwerp, productie en montage van zichtbare reclame — van gevel tot bedrijfsauto.',
  },
  {
    id: 'ai',
    naam: 'AI & Automatisering',
    kort: 'AI',
    omschrijving:
      'Software die werk uit handen neemt: AI-receptionisten, workflows en vindbaarheid in AI-zoekmachines.',
  },
  {
    id: 'mobiliteit',
    naam: 'Mobiliteit & Telematica',
    kort: 'Mobiliteit',
    omschrijving: 'Inzicht in voertuigen en machines, zonder lange contracten.',
  },
  {
    id: 'wonen',
    naam: 'Wonen & Verbouwen',
    kort: 'Wonen',
    omschrijving:
      'Van keukenkeuze tot complete renovatie: duidelijkheid voordat de eerste schroef erin gaat.',
  },
  {
    id: 'platforms',
    naam: 'Platforms & Bemiddeling',
    kort: 'Platforms',
    omschrijving:
      'Vraag en aanbod bij elkaar brengen — één passende match in plaats van een lijst met namen.',
  },
  {
    id: 'reizen',
    naam: 'Reizen & Toerisme',
    kort: 'Reizen',
    omschrijving: 'Belevenissen boeken met transparante prijzen, direct bij de operator.',
  },
];

export const bedrijven: Bedrijf[] = [
  {
    id: 'alfareclame',
    naam: 'Alfa Reclame',
    monogram: 'AR',
    divisie: 'reclame',
    tagline: 'Reclamebureau in Rotterdam — ontwerp, productie en montage.',
    beschrijving:
      'Het eerste bedrijf van de groep. Eén Rotterdams team dat reclame ontwerpt, zelf produceert en zelf monteert: gevelreclame, lichtreclame, belettering, autoreclame en reclameborden.',
    diensten: [
      'Gevelreclame',
      'Lichtreclame & LED-neon',
      'Doosletters',
      'Raambelettering',
      'Autoreclame & fleet wrap',
      'Reclameborden',
      'Logo & huisstijl',
    ],
    feiten: ['Sinds 2012', '4.8 op Google · 17 reviews', 'Offerte binnen 24 uur'],
    regio: 'Rotterdam & Rijnmond',
    email: 'info@alfareclame.nl',
    status: 'Actief',
    url: 'https://alfareclame.nl',
  },
  {
    id: 'aanloopai',
    naam: 'AanloopAI',
    monogram: 'AA',
    divisie: 'ai',
    tagline: 'AI-receptionisten en automatisering voor het mkb.',
    beschrijving:
      'AI-receptioniste Emma neemt 24/7 telefoon en WhatsApp op, kwalificeert leads en boekt afspraken. Daarnaast websites met ingebouwde AI en maatwerk-automatisering — als maandelijkse dienst, van implementatie tot beheer.',
    diensten: [
      'AI-receptioniste',
      'Voice & WhatsApp',
      'Websites & webshops',
      'Maatwerk-workflows',
      'Leadkwalificatie',
      'AI-zichtbaarheid (GEO)',
    ],
    feiten: ['24/7 bereikbaar', 'Live binnen 7 werkdagen', 'Maandelijkse dienst'],
    regio: 'Heel Nederland',
    email: 'hello@aanloopai.nl',
    status: 'Actief',
    url: 'https://aanloopai.nl',
  },
  {
    id: 'piekai',
    naam: 'PiekAI',
    monogram: 'PA',
    divisie: 'ai',
    tagline: 'Zichtbaar en vindbaar in het AI-tijdperk.',
    beschrijving:
      'Platform voor vindbaarheid in AI-zoekmachines en -assistenten (GEO), voor groeibedrijven die verder kijken dan de klassieke zoekmachine. De fundering wordt nu gelegd.',
    diensten: ['GEO', 'AI-zoekmachines', 'Vindbaarheid'],
    feiten: ['In ontwikkeling', 'Bouwt op de GEO-ervaring van de groep'],
    regio: 'Nederland',
    email: null,
    status: 'In ontwikkeling',
    // piekai.nl is nog niet live — geen link tot livegang (zie tasks/decisions.md #5)
    url: null,
  },
  {
    id: 'fleettrackholland',
    naam: 'FleetTrack Holland',
    monogram: 'FT',
    divisie: 'mobiliteit',
    tagline: 'GPS-tracking voor het mkb — maandelijks opzegbaar.',
    beschrijving:
      'Ritregistratie en voertuigvolgsysteem voor bedrijven met 1 tot 50 voertuigen. Een OBD-tracker die je zelf in minuten inplugt, of een accutracker voor voertuigen en machines zonder bruikbare OBD-poort.',
    diensten: ['OBD-tracker', 'Accutracker', 'Ritregistratie', 'Track & trace-app'],
    feiten: ['Vanaf €9,95 p/m all-in', 'Maandelijks opzegbaar', 'Zelf installeren'],
    regio: 'Heel Nederland',
    email: 'info@fleettrackholland.nl',
    status: 'Actief',
    url: 'https://www.fleettrackholland.nl',
  },
  {
    id: 'keukeninbeeld',
    naam: 'Keuken in Beeld',
    monogram: 'KB',
    divisie: 'wonen',
    tagline: 'Zie je droomkeuken én de prijs vóórdat je beslist.',
    beschrijving:
      'Gratis AI-visualisatie van je nieuwe keuken met een richtprijs, gevolgd door vrijblijvende offertes van geselecteerde keukenspecialisten in je regio. Ook: een bestaande offerte laten checken.',
    diensten: [
      'AI-keukenvisualisatie',
      'Richtprijs',
      'Offertes vergelijken',
      'Offerte checken',
      'Keukengids',
    ],
    feiten: ['Maximaal drie specialisten per aanvraag', 'Reactie binnen één werkdag'],
    regio: 'Heel Nederland',
    email: 'info@keukeninbeeld.nl',
    status: 'Actief',
    url: 'https://keukeninbeeld.nl',
  },
  {
    id: 'allesinrenovatie',
    naam: 'Alles in Renovatie',
    monogram: 'AiR',
    divisie: 'wonen',
    tagline: 'Renovatie en verbouwing in Rotterdam, van ontwerp tot oplevering.',
    beschrijving:
      'Eén partner voor renovatie- en verbouwingswerkzaamheden: van onderhoud en schilderwerk tot complete renovaties, gecoördineerd vanuit Rotterdam.',
    diensten: [
      'Complete renovatie',
      'Schilderwerk',
      'Stucwerk',
      'Tegelwerk',
      'Timmerwerk',
      'Loodgieterswerk',
    ],
    feiten: ['Van ontwerp tot oplevering', 'Van onderhoud tot complete renovatie'],
    regio: 'Rotterdam e.o.',
    email: null,
    status: 'Actief',
    url: 'https://allesinrenovatie.nl',
  },
  {
    id: 'zoekeen',
    naam: 'Zoekeen',
    monogram: 'ZE',
    divisie: 'platforms',
    tagline: 'Vertel wat je zoekt. Wij vinden één passende aanbieder.',
    beschrijving:
      'Bemiddelingsplatform voor diensten — van aannemer en installateur tot accountant en websitebouwer. Geen lijst met namen en geen spam: één passende aanbieder in jouw regio. Gratis en vrijblijvend voor wie zoekt.',
    diensten: ['Aannemers', 'Installateurs', 'Keukens', 'Zakelijke diensten', 'Word aanbieder'],
    feiten: ['Eén aanbieder per aanvraag', 'Gratis voor zoekers', 'Contact binnen 1 werkdag'],
    regio: 'Heel Nederland',
    email: 'hello@zoekeen.nl',
    status: 'Actief',
    url: 'https://zoekeen.nl',
  },
  {
    id: 'tripandtick',
    naam: 'Trip & Tick',
    monogram: 'TT',
    divisie: 'reizen',
    tagline: 'Cappadocië boeken met transparante prijzen.',
    beschrijving:
      'Eén platform voor ballonvaarten, hotels, ATV- en dagtours en pakketreizen in Cappadocië (Turkije), rechtstreeks gecontracteerd bij lokale operators. Meertalig.',
    diensten: ['Ballonvaarten', 'Hotels', 'ATV-tours', 'Dagtours', 'Pakketreizen', 'Transfers'],
    feiten: ['9+ gecontracteerde operators', 'Göreme, Cappadocië'],
    regio: 'Cappadocië, Turkije',
    email: 'info@tripandtick.com',
    status: 'Actief',
    url: 'https://tripandtick.com',
  },
];

export const actieveBedrijven = bedrijven.filter((b) => b.status === 'Actief');

export const bedrijvenVan = (divisieId: string) =>
  bedrijven.filter((b) => b.divisie === divisieId);

export const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, '');
