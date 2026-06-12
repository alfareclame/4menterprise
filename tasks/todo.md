# 4menterprise.nl — Build Plan (one-shot)

## Build order — ALL DONE

1. [x] Scaffold: package.json, tsconfig, next.config.ts (output: 'export'), postcss, eslint, .gitignore, tasks/
2. [x] Design tokens + fonts (Bricolage variable, Archivo, IBM Plex Mono — alle latin-ext), icon.svg wordmark
3. [x] Content: site.ts, ventures.ts, innovatie.ts, copy.ts (Dutch copy verbatim uit spec §6)
4. [x] Shell: layout.tsx, Nav (focus trap, Escape, IO active-anchor), Footer, skip-link, 404
5. [x] Hero + VentureMap (6 branches, chamfered circuit-trace, draw-on-scroll, reduced-motion pre-drawn, mobiele verticale variant)
6. [x] Secties: Verhaal, Ventures+Card, Innovatie+Project (enige donkere blok), Werkwijze, Contact, SectionHeading, StatusBadge
7. [x] Privacy page
8. [x] SEO: metadata, JSON-LD @graph, llms.txt, robots.txt, postbuild-sitemap, OG-image 1200×630 (38KB, gecommit)
9. [x] _headers (CSP gelogd), perf pass (hero → CSS keyframes, framer alleen waar nodig)
10. [x] Self-review §14 — resultaten hieronder
11. [x] README + delivery report

## Self-review (Section 14) — PASS/FAIL + bewijs

**Build & output**
- [x] PASS — `npm run build`: zero errors, zero warnings; export + postbuild-sitemap OK
- [x] PASS — `out/` bevat: index.html, privacy/index.html, 404.html, llms.txt, robots.txt, sitemap.xml, _headers, opengraph-image.png, icon.svg
- [x] PASS — `npx serve out`: beide pagina's renderen; /bestaat-niet/ → "Pagina niet gevonden"

**Content integrity**
- [x] PASS — alle §6-strings verbatim in content/*.ts (copy 1-op-1 overgenomen)
- [x] PASS — forbidden-words grep over app/components/content/lib/public/scripts: 0 hits
- [x] PASS — TODO/Lorem/placeholder grep over out/*.html: 0 hits (alleen de 2 FOTO-SLOT-codecomments, niet in output)
- [x] PASS — FleetTrack zonder hyperlink; alfareclame.nl + aanloopai.nl met target=_blank rel=noopener noreferrer + sr-only suffix. PiekAI-link verwijderd (NXDOMAIN — decisions.md #5)
- [x] PASS — "gericht op samenwerking" aanwezig (1×); "in samenwerking met Gemeente Rotterdam": 0 hits in source én out/
- [x] PASS — KvK 88606902: hero-eyebrow, contact-subline, footer, JSON-LD, llms.txt (7× in index.html)
- [x] PASS — "Doğan" 17× in out/index.html; ğ correct gerenderd in screenshots (alle drie de fonts latin-ext)

**Navigation & links**
- [x] PASS — alle nav-anchors + CTA's + VentureMap-endpoints resolven (id-grep: hero/verhaal/ventures/innovatie/werkwijze/contact/main allemaal aanwezig)
- [x] PASS — extern: alfareclame.nl HTTP 200, aanloopai.nl HTTP 200; piekai.nl 000/NXDOMAIN → url=null, gelogd
- [x] PASS — scroll-margin: na anchor-klik staat elke sectie op 80px vanaf top (nav=64px) — geen heading onder de nav
- [x] PASS — /privacy back-link → /; footer Privacy-link → /privacy/

**Design & motion**
- [x] PASS — kraan (+kraan-diep voor knoppen, zie decisions #1) is het enige accent; #innovatie is het enige donkere blok
- [x] PASS — VentureMap: 6 takken, dashed vs solid per status, draw-on-scroll, pre-drawn bij reduced-motion (computed: offset 0, transition 0s)
- [x] PASS — screenshots: tasks/screenshots/4m-360-full.png, 4m-768-full.png, 4m-1440-full-revealed.png, 4m-privacy-1440.png
- [x] PASS — reduced-motion geëmuleerd: geen beweging (hero-fade via media query uitgeschakeld, framer MotionConfig reducedMotion="user", map instant)

**A11y & SEO**
- [x] PASS — keyboard: eerste Tab = skip-link "Direct naar inhoud"; mobiel menu: aria-expanded, focus in panel, Escape sluit, focus terug op trigger (Playwright-geverifieerd)
- [x] PASS — 1× h1; header/nav/main#main/footer landmarks; html lang="nl"
- [x] PASS — contrastparen: havennacht/beton 15.1:1 · staal/beton 5.6:1 · staal/wit 5.9:1 · wit/kraan-diep 4.75:1 · wit/havennacht 16.7:1 · beton/havennacht 15.1:1 · staal-licht/havennacht 7.7:1 — alle ≥4.5:1
- [x] PASS — JSON-LD: JSON.parse OK, @graph Person+Organization+WebSite met @id-kruisverwijzingen (gerenderde blok in decisions.md)
- [x] PASS — title 64 chars, description 152 chars (≤160); og:image 1200×630 bevestigd via sharp metadata, 38KB (<300KB)
- [x] DEELS — Lighthouse (mobiel-simulatie): Performance 94, Accessibility 100, Best Practices 100, SEO 100. Desktop-preset: Performance 100 (LCP 0.6s). De 94 mobiel komt door de spec-verplichte hero-entrance (laatste fade eindigt ~0.77s na first paint op gesimuleerde 3G); Lighthouse meldt nul verbeterkansen. Geen gefingeerde score — eerlijke meting.

**Repo hygiene**
- [x] PASS — commit-historie volgt §13 (11 commits incl. fix + docs)
- [x] PASS — README aanwezig; decisions.md: 8 beslissingen gelogd; lessons.md: 1 les
- [x] PASS — geen deployment, geen DNS, geen mailbox aangemaakt

## Hard stops — gerespecteerd

- GEEN deploy, GEEN DNS, GEEN e-mail/mailbox, GEEN domeinconfiguratie.
