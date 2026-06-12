export type VentureStatus = 'Actief' | 'In ontwikkeling';

export interface Venture {
  id: string; // 'alfa' | 'fleettrack' | 'aanloopai' | 'piekai'
  name: string;
  tagline: string; // one line, max ~60 chars
  bullets: [string, string, string];
  beschrijving: string; // volledige omschrijving (feiten uit spec §2.1)
  diensten: string[]; // dienst-chips
  status: VentureStatus;
  url: string | null; // null = render name without hyperlink (FleetTrack)
}

export const ventures: Venture[] = [
  {
    id: 'alfa',
    name: 'Alfa Reclame',
    tagline: 'Full-service reclamebureau in Rotterdam — van gevel tot Google.',
    bullets: [
      'Gevelreclame, lichtreclame, autobelettering en drukwerk',
      'Websites, SEO, Google Ads en grafisch ontwerp',
      'Marco, de AI-receptionist, beantwoordt bezoekers 24/7',
    ],
    beschrijving:
      'Mijn eerste bedrijf en de fysieke basis van alles wat daarna kwam. Fysiek werk — gevels, autobelettering, borden — gecombineerd met digitaal: websites, vindbaarheid en campagnes. Op de site staat Marco, een Nederlandstalige AI-receptionist die bezoekers 24/7 beantwoordt en leads direct doorzet.',
    diensten: [
      'Gevelreclame',
      'Lichtreclame & LED',
      'Autobelettering & carwrap',
      'Raambelettering',
      'Reclameborden',
      'Spandoeken',
      'Bewegwijzering',
      'Drukwerk',
      'Websites',
      'SEO',
      'Google Ads',
      'Logo & grafisch ontwerp',
      'Social media',
    ],
    status: 'Actief',
    url: 'https://alfareclame.nl',
  },
  {
    id: 'fleettrack',
    name: 'FleetTrack Holland',
    tagline: 'GPS-voertuigvolgsysteem voor Nederlandse wagenparken.',
    bullets: [
      'Live tracking en automatische ritregistratie',
      'Rapportages voor beheer en administratie',
      'Bewezen 4G-trackerhardware, geleverd en geïnstalleerd',
    ],
    beschrijving:
      'GPS-voertuigvolgsysteem (SaaS) voor Nederlandse ondernemers en wagenparkbeheerders. Live tracking, automatische ritregistratie en rapportages voor beheer en administratie — op bewezen 4G-trackerhardware, geleverd en geïnstalleerd.',
    diensten: [
      'Live tracking',
      'Ritregistratie',
      'Rapportages',
      '4G-trackerhardware',
      'Wagenparkbeheer',
    ],
    status: 'Actief',
    url: null,
  },
  {
    id: 'aanloopai',
    name: 'AanloopAI',
    tagline: 'AI-receptionisten voor het Nederlandse mkb.',
    bullets: [
      'Voice- en WhatsApp-agents die 24/7 opnemen',
      'Leads gekwalificeerd en direct doorgestuurd',
      'Van implementatie tot beheer, als maandelijkse dienst',
    ],
    beschrijving:
      'AI-agents voor het Nederlandse mkb: virtuele receptionisten via telefoon en WhatsApp die 24/7 gesprekken afhandelen, leads kwalificeren en direct doorsturen. Van implementatie tot beheer, als maandelijkse dienst — de ondernemer houdt zijn handen vrij, de telefoon wordt toch opgenomen.',
    diensten: [
      'Voice-agents',
      'WhatsApp-agents',
      'Leadkwalificatie',
      '24/7 bereikbaarheid',
      'Implementatie & beheer',
    ],
    status: 'Actief',
    url: 'https://aanloopai.nl',
  },
  {
    id: 'piekai',
    name: 'PiekAI',
    tagline: 'Zichtbaar en vindbaar in het AI-tijdperk.',
    bullets: [
      'Vindbaarheid in AI-zoekmachines en assistenten (GEO)',
      'Voor groeibedrijven die verder kijken dan Google',
      'Lancering volgt — de fundering wordt nu gelegd',
    ],
    beschrijving:
      'Platform voor zichtbaarheid en omzetgroei in het AI-tijdperk: bedrijven vindbaar maken in AI-zoekmachines en -assistenten (GEO), gericht op groeibedrijven die verder kijken dan de klassieke zoekmachine. De lancering volgt — de fundering wordt nu gelegd.',
    diensten: ['GEO', 'AI-zoekmachines', 'Vindbaarheid', 'Groeibedrijven'],
    status: 'In ontwikkeling',
    // piekai.nl resolveert nog niet (NXDOMAIN, gecheckt 2026-06-12) — geen link tot livegang
    url: null,
  },
];
