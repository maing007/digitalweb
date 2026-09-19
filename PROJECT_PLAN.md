# WorkSphere — Project Plan

**Developed by Techinovates**

## Overview

WorkSphere is a multi-tenant SaaS platform enabling software houses, IT agencies, digital marketing companies, and design agencies to manage their organizations through isolated workspaces.

## Product Modules

| Module | Status | Phase |
|--------|--------|-------|
| Public Website | Planned | Phase 1 |
| Authentication & Registration | Planned | Phase 1 |
| Organization Management | Planned | Phase 2 |
| Subscription & Billing | Planned | Phase 4 |
| Employee & Team Management | Planned | Phase 3 |
| Projects & Tasks | Planned | Phase 3 |
| Time Tracking | Planned | Phase 3 |
| Products & Services | Planned | Phase 5 |
| Clients & CRM | Planned | Phase 5 |
| VPN & Security | Planned | Phase 6 |
| Super Admin Dashboard | Planned | Phase 7 |

## Tech Stack

- **Frontend**: Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui
- **Database**: PostgreSQL 16, Prisma ORM
- **Auth**: Custom email/password auth with RBAC
- **Payments**: Abstract adapter with mock provider
- **Infra**: Docker + Docker Compose
- **Testing**: Vitest, Playwright

## Development Sequence

See ROADMAP.md for detailed phases and tasks.

## Key Principles

1. Multi-tenant data isolation on every server operation
2. Server-side authorization checks (never client-only)
3. No secrets in source control
4. Modular architecture for self-hosted VPS deployment
5. Progressive feature rollout across 7 phases
