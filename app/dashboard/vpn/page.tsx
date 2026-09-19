import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { VPNList } from "@/components/dashboard/vpn-list";

export default async function VPNPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: vpnConfigs } = await supabase.from("vpn_access").select("*").eq("tenant_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">VPN Access</h1>
      <p className="text-muted-foreground mt-2">Manage VPN connections for your team</p>
      <VPNList configs={vpnConfigs || []} />
    </div>
  );
}
