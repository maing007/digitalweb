import { createClient } from "./supabase/client";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { hashSync } from "bcryptjs";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getTenantId() {
  const cookieStore = await cookies();
  return cookieStore.get("tenant_id")?.value;
}

export async function getCurrentTenant() {
  const tenantId = await getTenantId();
  if (!tenantId) return null;

  try {
    const tenant = await prisma.organization.findUnique({
      where: { id: tenantId },
    });
    return tenant;
  } catch {
    return null;
  }
}

export async function getCurrentUserWithTenant() {
  const user = await getCurrentUser();
  const tenantId = await getTenantId();

  if (!user || !tenantId) return null;

  try {
    const member = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: tenantId,
        },
      },
    });
    return { user, member };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return hashSync(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}

export function hasRole(member: { role: string }, requiredRoles: string[]): boolean {
  return requiredRoles.includes(member.role);
}

export function canAccessOrganization(
  member: { organizationId: string },
  tenantId: string | null
): boolean {
  if (!tenantId) return false;
  return member.organizationId === tenantId;
}
