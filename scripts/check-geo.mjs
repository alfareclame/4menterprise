// Guard (GEO wave 4): citation bots named in robots.txt, Organization first in the graph, no founding year.
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL(`../out/${p}`, import.meta.url), 'utf8');
const fail = (m) => { console.error('check-geo FAIL:', m); process.exit(1); };

const robots = read('robots.txt');
const blocks = robots.split(/\n\s*\n/);
for (const b of ['OAI-SearchBot', 'GPTBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Googlebot', 'Applebot']) {
  const ok = blocks.some((blk) => blk.split(/\r?\n/).some((l) => l.trim().toLowerCase() === `user-agent: ${b.toLowerCase()}`) && /^allow:\s*\/\s*$/im.test(blk));
  if (!ok) fail(`robots.txt missing Allow block for ${b}`);
}

for (const page of ['index.html', 'privacy/index.html']) {
  const html = read(page);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
  const graph = scripts.find((j) => j['@graph'])?.['@graph'];
  if (!graph || graph[0]['@type'] !== 'Organization') fail(`${page}: Organization must be first graph node`);
  const wp = scripts.find((j) => j['@type'] === 'WebPage');
  if (!wp?.dateModified || !wp.description || !wp.author) fail(`${page}: WebPage needs description, dateModified, author`);
  if (/foundingDate/.test(html)) fail(`${page}: foundingDate is forbidden (source metadata unreliable)`);
}
console.log('check-geo ok');
