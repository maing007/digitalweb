import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const tasks = await prisma.task.findMany({
      where: { isDeleted: false },
      include: { project: true, assignee: true },
    });
    return NextResponse.json({ data: tasks });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });
    if (!project || project.organizationId !== tenantId) {
      throw new AppError("FORBIDDEN", "Not authorized for this project");
    }

    const task = await prisma.task.create({
      data: {
        id: crypto.randomUUID(),
        projectId: body.projectId,
        title: body.title,
        description: body.description,
        status: body.status || "TODO",
        priority: body.priority || "MEDIUM",
        assigneeId: body.assigneeId,
        dueDate: body.dueDate,
        points: body.points,
      },
    });
    return NextResponse.json({ data: task }, { status: 201 });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { cookies } = await import("next/headers");
  return (await cookies()).get("tenant_id")?.value;
}
