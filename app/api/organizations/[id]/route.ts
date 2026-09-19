import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const org = await prisma.organization.findUnique({
      where: { id: params.id },
      include: { plan: true, subscriptions: { orderBy: { createdAt: "desc" } } },
    });
    if (!org || org.id !== tenantId) throw new AppError("FORBIDDEN");
    return NextResponse.json({ data: org });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
