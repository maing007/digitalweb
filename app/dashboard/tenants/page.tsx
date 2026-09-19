import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { TenantList } from "@/components/dashboard/tenant-list";

export default async function TenantsPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: employees } = await supabase.from("employees").select("*").eq("tenant_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Tenants</h1>
      <p className="text-muted-foreground mt-2">Manage your tenants and employees</p>
      <TenantList employees={employees || []} />
    </div>
  );
}
