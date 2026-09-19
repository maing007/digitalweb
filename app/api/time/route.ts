import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const timeEntries = await prisma.timeEntry.findMany({
      where: { organizationId: tenantId },
      include: { task: true, employee: true },
      orderBy: { startTime: "desc" },
    });
    return NextResponse.json({ data: timeEntries });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const entry = await prisma.timeEntry.create({
      data: {
        id: crypto.randomUUID(),
        taskId: body.taskId,
        projectId: body.projectId,
        employeeId: body.employeeId,
        organizationId: tenantId,
        startTime: body.startTime || new Date(),
        description: body.description,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    });
    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
