import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";

export default async function SecurityPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");
  const { data: devices } = await supabase.from("device_authorizations").select("*").eq("organization_id", tenant.id).limit(20);
  const { data: policies } = await supabase.from("access_policies").select("*").eq("organization_id", tenant.id).limit(20);

  return (
    <div>
      <h1 className="text-3xl font-bold">Security & Access</h1>
      <p className="text-muted-foreground mt-2">Manage device authorizations and access policies</p>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div><h2 className="text-xl font-semibold mb-4">Device Authorizations</h2><table className="w-full border-collapse"><thead><tr className="border-b"><th className="text-left p-3">Device</th></tr></thead><tbody>{(devices || []).map((d: any) => <tr key={d.id} className="border-b hover:bg-muted/50"><td className="p-3">{d.deviceId}</td></tr>)}</tbody></table></div>
        <div><h2 className="text-xl font-semibold mb-4">Access Policies</h2><table className="w-full border-collapse"><thead><tr className="border-b"><th className="text-left p-3">Resource</th></tr></thead><tbody>{(policies || []).map((p: any) => <tr key={p.id} className="border-b hover:bg-muted/50"><td className="p-3">{p.resource}</td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}
