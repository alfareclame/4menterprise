export type ProjectStatus = 'Conceptfase' | 'R&D';

export interface InnovatieProject {
  id: string;
  name: string;
  probleem: string; // 2–3 sentences
  oplossing: string; // 2–3 sentences
  status: ProjectStatus;
  statusToelichting: string; // one honest sentence
  impact: string; // 1–2 sentences
}

export const innovatieProjecten: InnovatieProject[] = [
  {
    id: 'laadpunten',
    name: 'Laadpunten via straatverlichting',
    probleem:
      'Wie elektrisch rijdt maar geen eigen oprit heeft, kan thuis niet laden. Juist in wijken met hoge parkeerdruk is de afstand tot een laadpunt het grootst.',
    oplossing:
      'Oplaadpunten geïntegreerd in bestaande straatverlichting. De infrastructuur staat er al — lantaarnpalen met stroomaansluiting, om de dertig meter. Door die te benutten, ontstaat laadcapaciteit zonder nieuwe graafwerkzaamheden in elke straat.',
    status: 'Conceptfase',
    statusToelichting:
      'Projectvoorstel uitgewerkt, gericht op samenwerking met Gemeente Rotterdam en met beoogde kennisondersteuning vanuit de TU Delft.',
    impact:
      'Toegankelijk laden voor bewoners zonder oprit, minder fossiel vervoer, betere luchtkwaliteit in de stad.',
  },
  {
    id: 'schadedetectie',
    name: 'Automatische schadedetectie',
    probleem:
      "Na een aanrijding begint een traag, handmatig proces: foto's maken, formulieren invullen, wachten op een expert. Kostbaar voor verzekeraars, frustrerend voor bestuurders.",
    oplossing:
      'Een AI-systeem op basis van computer vision dat voertuigschade direct na een incident detecteert, lokaliseert en classificeert — als objectief eerste oordeel waar de afhandeling op kan bouwen.',
    status: 'R&D',
    statusToelichting:
      'In onderzoek en ontwikkeling. Geen pilot, geen klanten — eerst bewijzen dat het werkt.',
    impact: 'Snellere schadeafhandeling en minder discussie achteraf.',
  },
];
