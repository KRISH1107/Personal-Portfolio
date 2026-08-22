<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a static Next.js 16 (App Router, Turbopack, React 19) portfolio site with no backend, database, or environment variables. Content is sourced from plain modules in `lib/` (`projects.ts`, `socials.ts`, `site.ts`, `hobbies.ts`, `travel.ts`).

- Dev server: `npm run dev` (Turbopack) serves on `http://localhost:3000`. Routes: `/`, `/about`, `/projects`, `/hobbies`, and dynamic `/projects/[slug]`.
- Travel map data: edit `lib/travel.ts` (ISO 3166-1 alpha-2 codes, lowercase). Photos: `public/images/travel/<code>/…` referenced as `/images/travel/<code>/…`.
- Standard scripts live in `package.json`: `dev`, `build`, `start`, `lint`.
- `npm run lint` currently reports pre-existing `react-hooks/set-state-in-effect` errors in `components/Intro.tsx` and `components/ThemeToggle.tsx`. Treat them as baseline unless explicitly asked to fix them.
