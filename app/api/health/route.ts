import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", app: "WorkSphere", version: "0.1.0" });
}
