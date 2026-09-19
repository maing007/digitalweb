export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  TEAM_LEAD: "TEAM_LEAD",
  DEVELOPER: "DEVELOPER",
  DESIGNER: "DESIGNER",
  EMPLOYEE: "EMPLOYEE",
  CLIENT: "CLIENT",
} as const;

export const ROLE_HIERARCHY: Record<string, number> = {
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.OWNER]: 90,
  [ROLES.ADMIN]: 80,
  [ROLES.PROJECT_MANAGER]: 70,
  [ROLES.TEAM_LEAD]: 60,
  [ROLES.DEVELOPER]: 50,
  [ROLES.DESIGNER]: 50,
  [ROLES.EMPLOYEE]: 40,
  [ROLES.CLIENT]: 30,
};

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.OWNER]: [
    "organization:read", "organization:update", "organization:delete",
    "subscription:manage", "billing:manage",
    "members:invite", "members:remove", "members:update",
    "projects:manage", "tasks:manage", "clients:manage",
    "settings:manage", "settings:configure",
    "analytics:read", "reports:view",
  ],
  [ROLES.ADMIN]: [
    "organization:read", "organization:update",
    "members:invite", "members:remove", "members:update",
    "projects:manage", "tasks:manage", "clients:manage",
    "settings:configure", "analytics:read", "reports:view",
  ],
  [ROLES.PROJECT_MANAGER]: [
    "projects:create", "projects:manage", "tasks:create", "tasks:assign",
    "tasks:update", "clients:manage", "analytics:read", "reports:view",
  ],
  [ROLES.TEAM_LEAD]: [
    "tasks:create", "tasks:update", "tasks:assign",
    "time:read", "reports:view",
  ],
  [ROLES.DEVELOPER]: [
    "tasks:read", "tasks:update", "time:create", "time:log",
  ],
  [ROLES.DESIGNER]: [
    "tasks:read", "tasks:update", "time:create", "time:log",
  ],
  [ROLES.EMPLOYEE]: [
    "tasks:read", "time:create", "time:log",
  ],
  [ROLES.CLIENT]: [
    "projects:read", "tasks:read",
  ],
};

export function hasPermission(role: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(permission);
}

export function canAccess(
  userRole: string,
  requiredPermission: string
): boolean {
  return hasPermission(userRole, requiredPermission);
}
