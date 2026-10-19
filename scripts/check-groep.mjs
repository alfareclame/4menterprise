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

// GEO-guard (wave 2026-10-19): zichtbare update-datum, dateModified in JSON-LD,
// over-link en AI-bestanden moeten blijven bestaan.
import { existsSync } from 'node:fs';
const geoFouten = [];
if (!/Bijgewerkt op(?:<!-- -->)? <time dateTime="\d{4}-\d{2}-\d{2}"/.test(html)) geoFouten.push('zichtbare "Bijgewerkt op" ontbreekt');
if (!/"dateModified":"\d{4}-\d{2}-\d{2}"/.test(html)) geoFouten.push('dateModified in JSON-LD ontbreekt');
if (!footer.includes('href="/#verhaal"')) geoFouten.push('footer-link naar Over 4M ontbreekt');
for (const f of ['ai.txt', '.well-known/ai.txt', 'llms.txt', 'llms-full.txt', 'googlea58b0be0ceb7c24e.html', '5792f8c6ff1c450ab008b567cca7472c.txt']) {
  if (!existsSync(`out/${f}`)) geoFouten.push(`out/${f} ontbreekt`);
}
if (geoFouten.length) {
  console.error('GEO-guard faalt:', geoFouten.join('; '));
  process.exit(1);
}
console.log('geo-guard ok (dateModified, Bijgewerkt op, Over-link, ai.txt, llms-full.txt)');
