# WorkSphere — Database Design

## Overview

PostgreSQL database with Prisma ORM. Shared schema with organization-level data isolation via `organizationId` foreign keys on all tenant records.

## Core Models

### User

- `id` (UUID, primary key)
- `email` (unique)
- `passwordHash`
- `name`
- `role` (platform role)
- `organizationId` (nullable, foreign key)
- `isActive`
- `emailVerified`
- `createdAt`, `updatedAt`

### Organization

- `id` (UUID, primary key)
- `name`
- `slug` (unique)
- `industry`
- `companySize`
- `country`
- `website`
- `planId` (nullable)
- `subscriptionStatus`
- `settings` (JSON)
- `createdAt`, `updatedAt`

### OrganizationMember

- `id` (UUID)
- `userId` (FK)
- `organizationId` (FK)
- `role` (OWNER, ADMIN, PROJECT_MANAGER, TEAM_LEAD, DEVELOPER, DESIGNER, EMPLOYEE, CLIENT)
- `department`
- `isActive`
- `invitedBy` (FK to userId)
- `createdAt`, `updatedAt`

### SubscriptionPlan

- `id` (UUID)
- `name` (STARTER, GROWTH, BUSINESS, ENTERPRISE)
- `description`
- `monthlyPrice`, `yearlyPrice`
- `features` (JSON array)
- `maxEmployees`, `maxProjects`, `maxClients`, etc.
- `isActive`
- `createdAt`, `updatedAt`

### Subscription

- `id` (UUID)
- `organizationId` (FK)
- `planId` (FK)
- `status` (TRIALING, ACTIVE, PAST_DUE, CANCELED, EXPIRED, SUSPENDED)
- `currentPeriodStart`, `currentPeriodEnd`
- `cancelAtPeriodEnd`
- `createdAt`, `updatedAt`

### Invoice

- `id` (UUID)
- `organizationId` (FK)
- `subscriptionId` (FK)
- `amount`, `currency`
- `status` (PENDING, PAID, FAILED, VOID)
- `dueDate`
- `createdAt`, `updatedAt`

### PaymentEvent

- `id` (UUID)
- `invoiceId` (FK)
- `organizationId` (FK)
- `amount`, `currency`
- `provider`, `referenceId`
- `status`
- `createdAt`

### Project

- `id` (UUID)
- `organizationId` (FK)
- `name`, `description`
- `status` (PLANNING, ACTIVE, COMPLETED, CANCELED)
- `startDate`, `deadline`
- `budget`
- `projectManagerId` (FK)
- `createdAt`, `updatedAt`

### Task

- `id` (UUID)
- `projectId` (FK)
- `title`, `description`
- `status` (TODO, IN_PROGRESS, IN_REVIEW, BLOCKED, COMPLETED, CANCELED)
- `priority` (LOW, MEDIUM, HIGH, URGENT)
- `assigneeId` (FK)
- `dueDate`
- `points` (estimate)
- `timeLogged` (accumulated)
- `createdAt`, `updatedAt`

### TaskComment

- `id` (UUID)
- `taskId` (FK)
- `authorId` (FK)
- `content`
- `createdAt`

### TimeEntry

- `id` (UUID)
- `taskId` (FK)
- `employeeId` (FK)
- `projectId` (FK)
- `organizationId` (FK)
- `startTime`, `endTime`
- `duration`
- `date`
- `timezone`
- `description`
- `createdAt`, `updatedAt`

### Client

- `id` (UUID)
- `organizationId` (FK)
- `name`, `email`, `phone`, `company`
- `status` (LEAD, ACTIVE, INACTIVE)
- `assignedManagerId` (FK)
- `createdAt`, `updatedAt`

### Service

- `id` (UUID)
- `organizationId` (FK)
- `name`, `description`, `pricingModel`
- `duration`, `status`
- `category`
- `createdAt`, `updatedAt`

### Product

- `id` (UUID)
- `organizationId` (FK)
- `name`, `sku`, `description`, `price`
- `inventory`
- `status`, `images` (JSON)
- `category`
- `createdAt`, `updatedAt`

### AuditLog

- `id` (UUID)
- `organizationId` (FK)
- `userId` (FK)
- `action`, `entity`, `entityId`
- `metadata` (JSON)
- `ipAddress`, `userAgent`
- `createdAt`

### Notification

- `id` (UUID)
- `userId` (FK)
- `type`, `title`, `content`
- `isRead`
- `createdAt`

### VPNConfiguration

- `id` (UUID)
- `organizationId` (FK)
- `config` (JSON)
- `isActive`
- `createdAt`, `updatedAt`

### DeviceAuthorization

- `id` (UUID)
- `organizationId` (FK)
- `userId` (FK)
- `deviceInfo` (JSON)
- `token`
- `expiresAt`
- `isRevoked`
- `createdAt`

### AccessPolicy

- `id` (UUID)
- `organizationId` (FK)
- `resource`, `action`, `roles` (JSON)
- `isAllowed`
- `createdAt`

### BrowserExtensionSession

- `id` (UUID)
- `organizationId` (FK)
- `userId` (FK)
- `deviceId`
- `connectedAt`, `lastActivityAt`
- `isActive`
- `createdAt`

## Indexes

- All FK columns indexed
- `Organization.slug` unique index
- `User.email` unique index
- `Task.projectId + status` composite index
- `TimeEntry.employeeId + date` composite index
- `AuditLog.organizationId + createdAt` composite index

## Soft Deletion

- `isDeleted` boolean flag on all tenant records
- `deletedAt` timestamp
- Historical data preserved for audit purposes
