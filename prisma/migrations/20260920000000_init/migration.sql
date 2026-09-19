-- Auto-generated migration
CREATE TABLE IF NOT EXISTS "users" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "role" VARCHAR(50) NOT NULL DEFAULT 'EMPLOYEE',
    "organizationId" VARCHAR(191),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

CREATE TABLE IF NOT EXISTS "organizations" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "industry" VARCHAR(255),
    "companySize" VARCHAR(50),
    "country" VARCHAR(100),
    "website" VARCHAR(255),
    "planId" VARCHAR(191),
    "subscriptionStatus" VARCHAR(50) NOT NULL DEFAULT 'TRIALING',
    "settings" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations" ("slug");

CREATE TABLE IF NOT EXISTS "organization_members" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "userId" VARCHAR(191) NOT NULL,
    "organizationId" VARCHAR(191) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "department" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "invitedBy" VARCHAR(191),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "organization_members_userId_organizationId_key" ON "organization_members" ("userId", "organizationId");

CREATE TABLE IF NOT EXISTS "subscription_plans" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "monthlyPrice" DECIMAL(65,30),
    "yearlyPrice" DECIMAL(65,30),
    "features" JSONB NOT NULL DEFAULT '[]',
    "maxEmployees" INTEGER NOT NULL DEFAULT 5,
    "maxProjects" INTEGER NOT NULL DEFAULT 10,
    "maxClients" INTEGER NOT NULL DEFAULT 20,
    "maxStorage" INTEGER NOT NULL DEFAULT 1024,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "subscriptions" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "planId" VARCHAR(191) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'TRIALING',
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "invoices" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "subscriptionId" VARCHAR(191),
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "payment_events" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "invoiceId" VARCHAR(191) NOT NULL,
    "organizationId" VARCHAR(191) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "provider" VARCHAR(100),
    "referenceId" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "projects" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PLANNING',
    "startDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "budget" DECIMAL(65,30),
    "projectManagerId" VARCHAR(191),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "tasks" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "projectId" VARCHAR(191) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'TODO',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    "assigneeId" VARCHAR(191),
    "dueDate" TIMESTAMP(3),
    "points" INTEGER DEFAULT 0,
    "timeLogged" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "task_comments" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "taskId" VARCHAR(191) NOT NULL,
    "authorId" VARCHAR(191) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "time_entries" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "taskId" VARCHAR(191),
    "projectId" VARCHAR(191),
    "employeeId" VARCHAR(191) NOT NULL,
    "organizationId" VARCHAR(191) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" DECIMAL(65,30),
    "date" TIMESTAMP(3) NOT NULL,
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'UTC',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "clients" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "company" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'LEAD',
    "assignedManagerId" VARCHAR(191),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "services" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "pricingModel" VARCHAR(50) NOT NULL DEFAULT 'FIXED',
    "duration" VARCHAR(50),
    "status" VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    "category" VARCHAR(100),
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sku" VARCHAR(255),
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    "images" JSONB NOT NULL DEFAULT '[]',
    "category" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "entity" VARCHAR(255),
    "entityId" VARCHAR(191),
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "ipAddress" VARCHAR(100),
    "userAgent" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "notifications" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "userId" VARCHAR(191) NOT NULL,
    "organizationId" VARCHAR(191),
    "type" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "vpn_configurations" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "device_authorizations" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "deviceInfo" JSONB NOT NULL DEFAULT '{}',
    "token" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "device_authorizations_token_key" ON "device_authorizations" ("token");

CREATE TABLE IF NOT EXISTS "access_policies" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "resource" VARCHAR(255) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "roles" JSONB NOT NULL DEFAULT '[]',
    "isAllowed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "browser_extension_sessions" (
    "id" VARCHAR(191) PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "deviceId" VARCHAR(255) NOT NULL,
    "connectedAt" TIMESTAMP(3) NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vpnConfigId" VARCHAR(191)
);

-- Create indexes for better query performance
CREATE INDEX "tasks_projectId_idx" ON "tasks" ("projectId");
CREATE INDEX "tasks_assigneeId_idx" ON "tasks" ("assigneeId");
CREATE INDEX "time_entries_employeeId_idx" ON "time_entries" ("employeeId");
CREATE INDEX "time_entries_organizationId_idx" ON "time_entries" ("organizationId");
CREATE INDEX "projects_organizationId_idx" ON "projects" ("organizationId");
CREATE INDEX "clients_organizationId_idx" ON "clients" ("organizationId");
CREATE INDEX "audit_logs_organizationId_idx" ON "audit_logs" ("organizationId");
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs" ("createdAt");
