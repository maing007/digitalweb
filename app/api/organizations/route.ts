import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";
import { ROLES } from "@/lib/rbac";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) throw new AppError("UNAUTHORIZED");
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const member = await prisma.organizationMember.findUnique({
      where: { userId_organizationId: { userId, organizationId: tenantId } },
    });
    if (!member) throw new AppError("FORBIDDEN");

    const organizations = await prisma.organization.findMany({
      where: { id: tenantId },
      include: { plan: true, subscriptions: { orderBy: { createdAt: "desc" } } },
    });
    return NextResponse.json({ data: organizations });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = await getUserId();
    if (!userId) throw new AppError("UNAUTHORIZED");

    const orgId = crypto.randomUUID();
    const memberId = crypto.randomUUID();
    const subId = crypto.randomUUID();

    await prisma.$transaction([
      prisma.organization.create({ data: { id: orgId, name: body.companyName, slug: body.slug, industry: body.industry, companySize: body.companySize, country: body.country } }),
      prisma.organizationMember.create({ data: { id: memberId, userId, organizationId: orgId, role: ROLES.OWNER } }),
      prisma.subscription.create({ data: { id: subId, organizationId: orgId, planId: body.plan, status: "TRIALING" } }),
    ]);

    return NextResponse.json({ data: { orgId } }, { status: 201 });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getUserId() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id;
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
