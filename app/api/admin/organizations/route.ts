import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AppError, toApiResult } from "@/lib/errors";

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({ include: { subscriptions: { orderBy: { createdAt: "desc" as const } }, plan: true } });
    return NextResponse.json({ data: orgs });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}
