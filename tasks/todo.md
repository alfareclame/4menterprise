# 4menterprise.nl — Build Plan (one-shot)

## Build order

1. [ ] Scaffold: package.json, tsconfig, next.config.ts (output: 'export'), postcss, eslint, .gitignore, tasks/
2. [ ] Design tokens + fonts: globals.css (@theme), layout fonts (Bricolage Grotesque, Archivo, IBM Plex Mono, latin-ext), icon.svg wordmark
3. [ ] Content: content/site.ts, ventures.ts, innovatie.ts, copy.ts (final Dutch copy verbatim)
4. [ ] Shell: layout.tsx, Nav.tsx, Footer.tsx, skip-link, not-found.tsx
5. [ ] Hero + VentureMap (signature SVG, draw-on-scroll, reduced-motion safe)
6. [ ] Sections: Verhaal, Ventures + VentureCard, Innovatie + InnovatieProject, Werkwijze, Contact, SectionHeading, StatusBadge
7. [ ] Privacy page
8. [ ] SEO: metadata, lib/jsonld.ts (@graph Person/Organization/WebSite), llms.txt, robots.txt, sitemap (postbuild), OG image (SVG→PNG via sharp script, committed)
9. [ ] Security headers (_headers), perf pass (LazyMotion domAnimation)
10. [ ] Self-review checklist (Section 14) — record PASS/FAIL below
11. [ ] README + delivery report

## Commit plan (Section 13)

1. chore: scaffold next 15 + tailwind v4 + ts strict
2. feat: design tokens, fonts, globals, wordmark + favicon
3. content: typed content files with final dutch copy
4. feat: layout, nav, footer, skip-link, 404
5. feat: hero + venturemap signature element
6. feat: verhaal, ventures, innovatie, werkwijze, contact sections
7. feat: privacy page
8. feat: seo — metadata, json-ld, llms.txt, robots, sitemap, og image
9. chore: security headers, perf pass (lazymotion, bundle audit)
10. fix: self-review findings
11. docs: readme + delivery report

## File tree target

Per spec Section 3.1 — exact.

## Hard stops

- NO deploy, NO DNS, NO email setup, NO domain config.

## Self-review (Section 14) — results

_To be filled after build._
