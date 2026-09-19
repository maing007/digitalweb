import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function tenantMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tenantId = request.cookies.get("tenant_id")?.value;

  if (!tenantId) {
    return NextResponse.next({ request });
  }

  const tenantMatch = pathname.match(/^\/t\/([^/]+)/);
  if (tenantMatch) {
    const pathTenantId = tenantMatch[1];
    if (pathTenantId !== tenantId) {
      return NextResponse.json(
        { error: "Forbidden: Cross-tenant access denied" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next({ request });
}

export async function authorize(
  action: string,
  tenantId: string | null,
  userId: string | null
): Promise<{ authorized: boolean; error?: string }> {
  if (!tenantId) {
    return { authorized: false, error: "No organization found" };
  }
  if (!userId) {
    return { authorized: false, error: "Not authenticated" };
  }

  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId, organizationId: tenantId },
    },
  });

  if (!member || !member.isActive) {
    return { authorized: false, error: "Not a member of this organization" };
  }

  return { authorized: true };
}
