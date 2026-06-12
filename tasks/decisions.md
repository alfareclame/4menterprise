# Decisions log

_Every deviation from spec, with one-line rationale._

0. **2026-06-12 — M's directe instructie overruled spec §2.1:** Alfa Reclame en FleetTrack Holland worden nergens op de site genoemd. Alleen AanloopAI, PiekAI, 4M Enterprise en de twee innovatieprojecten blijven. Aangepast: ventures, hero (subline + stats), verhaal (tekst + datasheet + traject), VentureMap (4 takken), footer-links, JSON-LD sameAs, llms.txt, meta-description.

1. **Extra kleurtoken `--color-kraan-diep` (#C24A05):** wit op kraan (#E8590C) haalt 3.47:1 — onder de 4.5:1-eis van 8.1. Knopachtergronden gebruiken kraan-diep (4.75:1 met wit); kraan blijft het accent voor dots, lijnen en focus-ring (non-tekst). Toegestaan door 8.1 ("adjust lightness minimally if a pair fails").
2. **Extra kleurtoken `--color-staal-licht` (#9DB0BD):** staal (#51616F) op havennacht haalt 2.7:1 — eyebrows/captions in de donkere innovatie-sectie gebruiken staal-licht (7.7:1).
3. **Favicon-tekst in systeemfont:** `icon.svg` gebruikt een system-ui stack voor "4M"; Bricolage-outlines embedden in een favicon-SVG is niet praktisch zonder font-tooling. CurrentColor-safe met expliciete kleurfallback op de root.
4. **Bricolage als variable font geladen:** spec 8.2 noemt gewichten 600 & 800, maar het typoschema vraagt H2 op gewicht 700. Bricolage Grotesque is een variable font; de variable-load dekt 600–800 in één bestand, dus alle drie de gewichten renderen echt.
5. **PiekAI-link overal verwijderd (spec 12.11):** piekai.nl is NXDOMAIN (curl https/http 000 + nslookup "Non-existent domain", gecheckt 2026-06-12). Venture-card rendert zonder link, footer noemt piekai.nl niet, JSON-LD `sameAs` bevat het niet, llms.txt noemt PiekAI zonder hyperlink. Terugdraaien zodra het domein live is.
6. **Sitemap via eigen postbuild-script** (`scripts/generate-sitemap.mjs`), niet next-sitemap: twee URL's rechtvaardigen geen extra dependency; het script schrijft direct in `out/`.
7. **CSP `script-src` verruimd naar `'self' 'unsafe-inline'`:** Next.js static export levert de hydration-payload als inline `<script>self.__next_f.push(...)</script>` (geverifieerd in `out/index.html`); ook de JSON-LD is een inline script. Zonder `'unsafe-inline'` breekt hydration; nonces zijn onmogelijk zonder server. Dit is de minimale werkende verruiming (spec 11.3-clausule).
8. **OG-image gegenereerd via headless Chromium** (`scripts/generate-og.mjs` + `scripts/og-template.html`), niet via sharp-SVG-rasterisatie: sharps SVG-tekstrendering kan Bricolage niet laden zonder systeeminstallatie; Chromium rendert de echte Google-Fonts. PNG gecommit, 1200×630, 38KB. NB: de spec-design (10.5) bevat de naam "Doğan" niet, dus de ğ-check is voor de OG n.v.t.

## Gerenderde JSON-LD (voor M's records, gevalideerd met JSON.parse + veldcheck)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://4menterprise.nl/#person",
      "name": "Mustafa Doğan",
      "jobTitle": "Ondernemer & Computer Engineer",
      "address": { "@type": "PostalAddress", "addressLocality": "Rotterdam", "addressCountry": "NL" },
      "worksFor": { "@id": "https://4menterprise.nl/#organization" },
      "sameAs": ["https://alfareclame.nl", "https://aanloopai.nl"]
    },
    {
      "@type": "Organization",
      "@id": "https://4menterprise.nl/#organization",
      "name": "4M Enterprise",
      "url": "https://4menterprise.nl",
      "logo": "https://4menterprise.nl/icon.svg",
      "founder": { "@id": "https://4menterprise.nl/#person" },
      "identifier": { "@type": "PropertyValue", "propertyID": "KVK", "value": "88606902" },
      "email": "info@4menterprise.nl",
      "address": { "@type": "PostalAddress", "addressLocality": "Rotterdam", "addressCountry": "NL" }
    },
    {
      "@type": "WebSite",
      "@id": "https://4menterprise.nl/#website",
      "name": "4M Enterprise",
      "url": "https://4menterprise.nl",
      "inLanguage": "nl-NL",
      "publisher": { "@id": "https://4menterprise.nl/#organization" }
    }
  ]
}
```
