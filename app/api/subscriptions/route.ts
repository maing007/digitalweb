import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");
    const subscription = await prisma.subscription.findFirst({
      where: { organizationId: tenantId, status: { not: "CANCELED" } },
      include: { plan: true },
    });
    return NextResponse.json({ data: subscription });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");
    const subscription = await prisma.subscription.create({
      data: { id: crypto.randomUUID(), organizationId: tenantId, planId: body.planId, status: "TRIALING", currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    });
    return NextResponse.json({ data: subscription }, { status: 201 });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
