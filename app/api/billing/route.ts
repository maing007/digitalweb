import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");
    const invoices = await prisma.invoice.findMany({ where: { organizationId: tenantId }, orderBy: { createdAt: "desc" as const } });
    return NextResponse.json({ data: invoices });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
