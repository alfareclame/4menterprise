# 4menterprise.nl

Persoonlijk ondernemingsmerk van Mustafa Doğan — founder-story one-pager, Rotterdam.

- **Stack:** Next.js 15 (App Router, static export) · TypeScript strict · Tailwind v4 · Framer Motion
- **Build:** `npm install && npm run build` → statische site in `out/` (incl. sitemap via postbuild)
- **Preview:** `npx serve out`
- **OG-image:** `npm run og` (headless Chrome vereist)
- **Deploy-doel:** Cloudflare Pages (security headers in `public/_headers`) — nog NIET gedeployed
- **Content bewerken:** alle teksten staan in `/content/*.ts`, los van de componenten
- **Beslissingen & checklist:** zie `tasks/decisions.md` en `tasks/todo.md`
