# WorkSphere — Security Policy

## Authentication

- Passwords hashed with bcrypt (minimum cost 12)
- Email verification required before account activation
- Secure password reset with time-limited tokens
- Session management via HTTP-only cookies
- Refresh token rotation

## Authorization

- Role-Based Access Control (RBAC) enforced server-side
- Organization membership verified on every protected request
- Cross-tenant data access is blocked and logged
- Super Admin routes require explicit `SUPER_ADMIN` role check
- Principle of least privilege applied to all roles

## Data Protection

- Tenant data isolated by `organizationId` on every query
- Never trust organization IDs from the client
- Audit logs for all sensitive operations
- Soft deletion to preserve historical records
- Configurable data retention policies

## Input Validation

- All inputs validated using Zod schemas
- Sanitization of user-supplied content
- File upload validation (type, size)
- Rate limiting on authentication endpoints

## Infrastructure Security

- No secrets in source control
- All secrets via environment variables
- `.env.example` for development template
- `.gitignore` excludes `.env`, `.env.local`
- Docker secrets for production
- Secure HTTP headers (HSTS, CSP, X-Frame-Options)
- CSRF protection for state-changing operations

## OWASP Compliance

- SQL injection prevention via Prisma parameterized queries
- XSS prevention via React auto-escaping
- CSRF tokens for forms
- Open redirect prevention
- Secure cookie attributes (HttpOnly, SameSite, Secure)

## Audit & Monitoring

- All administrative actions logged to `AuditLog`
- IP and user agent recorded
- Login attempts tracked (success/failure)
- Failed access attempts rate-limited
- Cross-tenant access attempts trigger security alerts

## VPN & Extension Security

- Device authorization with short-lived tokens
- No private keys stored in client-side storage
- Connection status is a security signal, not productivity metric
- Browser extension uses Manifest V3
- Extension authentication through secure OAuth flow

## Development Security

- Run `npm run typecheck` before commits
- Run `npm run lint` before commits
- Never commit `.env` files
- Use `git secrets` scanning in CI
- Dependency vulnerability scanning
