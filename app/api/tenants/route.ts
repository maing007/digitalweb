import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toApiResult, AppError } from "@/lib/errors";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: tenantId } = await supabase.auth.getUser();
    const tid = tenantId?.user?.id;

    const { data, error } = await supabase.from("tenants").select("*").eq("id", tid).single();
    if (error) throw new AppError("NOT_FOUND", "Tenant not found");
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("tenants")
      .insert({ ...body, id: crypto.randomUUID() })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return NextResponse.json(toApiResult(err), { status: err instanceof AppError ? err.status : 500 });
  }
}
