<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## WorkSphere run commands

- `npm run dev` — Next.js web app (http://localhost:3000)
- `npx supabase start` — local Postgres + Studio (http://127.0.0.1:54323)
- `npx supabase db reset` — apply migrations locally
- `npx supabase link --project-ref <ref>` — link cloud project

Next.js 16 uses `proxy.ts` (not `middleware.ts`) for session refresh.
Multi-tenant routing uses tenant subdomains or `/t/<tenantId>` paths.
