export type VentureStatus = 'Actief' | 'In ontwikkeling';

export interface Venture {
  id: string; // 'alfa' | 'fleettrack' | 'aanloopai' | 'piekai'
  name: string;
  tagline: string; // one line, max ~60 chars
  bullets: [string, string, string];
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
    status: 'In ontwikkeling',
    // piekai.nl resolveert nog niet (NXDOMAIN, gecheckt 2026-06-12) — geen link tot livegang
    url: null,
  },
];
