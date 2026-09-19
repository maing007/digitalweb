import { createClient } from "./supabase/server";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getTenantId() {
  const cookieStore = await cookies();
  return cookieStore.get("tenant_id")?.value;
}

export async function getCurrentTenant() {
  const tenantId = await getTenantId();
  if (!tenantId) return null;

  const supabase = await createClient();
  const { data: tenant } = await supabase.from("tenants").select("*").eq("id", tenantId).single();
  return tenant;
}
