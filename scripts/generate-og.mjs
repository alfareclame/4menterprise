// Hergenereert app/opengraph-image.png (1200×630) uit scripts/og-template.html.
// Vereist een Chromium met --headless (correcte Bricolage-rendering via Google Fonts);
// sharp wordt alleen gebruikt om de afmetingen te verifiëren.
//
//   node scripts/generate-og.mjs [pad-naar-chrome]
//
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const CHROME_CANDIDATES = [
  process.argv[2],
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chrome) {
  console.error('Geen Chrome/Chromium gevonden. Geef het pad mee als argument.');
  process.exit(1);
}

const template = resolve('scripts/og-template.html');
const output = resolve('app/opengraph-image.png');

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1200,630',
  '--force-device-scale-factor=1',
  '--virtual-time-budget=8000',
  `--screenshot=${output}`,
  `file://${template}`,
]);

const meta = await sharp(output).metadata();
if (meta.width !== 1200 || meta.height !== 630) {
  console.error(`Verkeerde afmetingen: ${meta.width}×${meta.height} (verwacht 1200×630)`);
  process.exit(1);
}
console.log(`opengraph-image.png OK — 1200×630`);
