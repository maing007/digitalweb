# WorkSphere — Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────┐
│                  Client                       │
│         (Next.js App Router)                  │
│   ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│   │ Public  │  │ Dashboard│  │  Admin    │  │
│   │  Pages  │  │  Pages   │  │  Pages    │  │
│   └────┬────┘  └────┬─────┘  └────┬──────┘  │
│        │            │             │         │
│   ┌────▼────────────▼─────────────▼──────┐  │
│   │          API Routes / Server Actions  │  │
│   │    (Next.js Server-side Architecture) │  │
│   └────┬─────────────────┬───────────────┘  │
│        │                 │                  │
│   ┌────▼─────────────────▼───────────────┐  │
│   │         Auth & Permission Middleware   │  │
│   └────┬─────────────────┬───────────────┘  │
│        │                 │                  │
│   ┌────▼─────────────────▼───────────────┐  │
│   │              Prisma Client            │  │
│   └────┬─────────────────┬───────────────┘  │
│        │                 │                  │
└────────┼─────────────────┼──────────────────┘
         │                 │
    ┌────▼─────────────────▼──────────────┐
    │         PostgreSQL 16               │
    │         (Docker Container)          │
    └─────────────────────────────────────┘
```

## Multi-Tenant Pattern

- **Shared Database, Shared Schema**: All tenants share the same database and tables.
- **Tenant Isolation**: Every record has an `organizationId`. All queries are scoped to the authenticated user's organization.
- **Server-Side Enforcement**: Permission and tenant checks happen in server actions and API routes.
- **Future**: Database-level row-level security (RLS) can be added for stronger isolation.

## Layer Architecture

1. **Presentation Layer**: Next.js App Router pages and server components
2. **API Layer**: Route handlers and server actions
3. **Auth Layer**: Session management, RBAC, organization validation
4. **Data Layer**: Prisma ORM with typed queries
5. **Database Layer**: PostgreSQL with indexes and constraints

## Key Files

- `app/` — Next.js App Router
- `lib/` — Supabase clients, auth utilities, env validation
- `prisma/` — Schema, migrations, seeds
- `components/` — UI, layout, dashboard components
- `docker-compose.yml` — Development infrastructure

## Security Model

- Every request passes through `proxy.ts` for session validation
- Organization membership verified server-side on every protected route
- Cross-tenant access attempts are blocked and logged
- Super Admin routes require explicit `SUPER_ADMIN` role check

## Deployment

- Self-hosted VPS with Docker Compose
- Environment variables for all configuration
- Nginx reverse proxy (production)
- HTTPS via Let's Encrypt or similar
