import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toApiResult, AppError } from "@/lib/errors";

export async function GET() {
  try {
    const supabase = await createClient();
    const tenantId = await getTenantId();
    if (!tenantId) throw new AppError("UNAUTHORIZED");

    const { data, error } = await supabase.from("performance_reviews").select("*").eq("tenant_id", tenantId);
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

async function getTenantId() {
  const { createClient: cc } = await import("@/lib/supabase/server");
  const supabase = await cc();
  const cookieStore = await import("next/headers").then(m => m.cookies());
  return cookieStore.get("tenant_id")?.value;
}
