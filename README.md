# WorkSphere

Multi-tenant company management SaaS by **Techinovates**.

Features: Employee management, performance tracking, VPN access.

## Getting Started

```bash
# Install dependencies
npm install

# Start Supabase locally
npx supabase start

# Run database migrations then generate types
npx supabase db reset
npm run db:types

# Start dev server
npm run dev
```

## Tech Stack

- Next.js 16 (App Router, RSC)
- React 19
- TypeScript 5
- Supabase (Postgres, Auth, Storage)
- Tailwind CSS 4
- shadcn/ui components
- Zod (validation)
- Vitest + Playwright (testing)

## Project Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — UI components, layout components, dashboard components
- `lib/` — Supabase clients, auth utilities, error handling, env validation
- `shared/` — Shared package for cross-platform code
- `types/` — TypeScript type definitions
- `migrations/` — Database migrations
- `scripts/` — Build and deployment scripts
