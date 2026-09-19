import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const projects = await prisma.project.findMany({
      where: { organizationId: tenantId },
      include: { tasks: { orderBy: { createdAt: "desc" } } },
    });
    return NextResponse.json({ data: projects });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const project = await prisma.project.create({
      data: {
        id: crypto.randomUUID(),
        organizationId: tenantId,
        name: body.name,
        description: body.description,
        status: body.status || "PLANNING",
        deadline: body.deadline,
        budget: body.budget,
      },
    });
    return NextResponse.json({ data: project }, { status: 201 });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
