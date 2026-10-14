// postbuild-guard: 4menterprise.nl is het moederbedrijf van de hele groep
// (tasks/decisions.md #9). Faalt de build als een groepsbedrijf van de
// homepage of uit de footer verdwijnt — terugdraaien moet een bewuste stap zijn.
import { readFileSync } from 'node:fs';

const VERPLICHT = [
  'alfareclame.nl',
  'aanloopai.nl',
  'fleettrackholland.nl',
  'keukeninbeeld.nl',
  'allesinrenovatie.nl',
  'zoekeen.nl',
  'tripandtick.com',
];

const html = readFileSync('out/index.html', 'utf8');
const footer = html.slice(html.lastIndexOf('<footer'));

const missend = VERPLICHT.filter(
  (domein) => !html.includes(`https://${domein}`) && !html.includes(`https://www.${domein}`),
);
const nietInFooter = VERPLICHT.filter((domein) => !footer.includes(domein));

if (missend.length || nietInFooter.length) {
  console.error('Groep-guard faalt.');
  if (missend.length) console.error('  Ontbreekt op homepage:', missend.join(', '));
  if (nietInFooter.length) console.error('  Ontbreekt in footer:', nietInFooter.join(', '));
  process.exit(1);
}
console.log(`groep-guard ok (${VERPLICHT.length} bedrijven op homepage + footer)`);
