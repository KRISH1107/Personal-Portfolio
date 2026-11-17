<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a Next.js 16 (App Router, Turbopack, React 19) portfolio site. Content is sourced from modules in `lib/` and JSON under `data/`.

- Dev server: `npm run dev` → `http://localhost:3000`
- Routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/hobbies` (Travel), `/hobbies/sports` (power rankings), `/hobbies/sports/admin`
- Travel data: `lib/travel.ts` + photos in `public/images/travel/<code>/`
- Sports rankings: persisted in `data/sports/store.json` (not localStorage). Public UI reads this file; admin publish/draft writes to it via server actions.
- Sports admin password: set `SPORTS_ADMIN_PASSWORD` in the environment. In non-production, if unset, the default is `dev-sports-admin`.
- Note: On Vercel’s read-only filesystem, admin publishes that write `store.json` will fail unless you publish locally (or via CI) and redeploy. Seeded historical weeks still work on production.
- Scripts: `dev`, `build`, `start`, `lint`
- Baseline lint: pre-existing `react-hooks/set-state-in-effect` in `Intro.tsx` and `ThemeToggle.tsx`
