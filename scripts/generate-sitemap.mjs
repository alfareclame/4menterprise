// postbuild: schrijft sitemap.xml in de statische export (out/)
import { existsSync, writeFileSync } from 'node:fs';

const BASE = 'https://4menterprise.nl';
const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${BASE}/`, priority: '1.0' },
  { loc: `${BASE}/privacy/`, priority: '0.3' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${url.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

if (!existsSync('out')) {
  console.error('out/ ontbreekt — draai eerst `next build`');
  process.exit(1);
}
writeFileSync('out/sitemap.xml', xml);
console.log(`sitemap.xml geschreven (lastmod ${lastmod})`);
