import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";

export default async function AuditPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");
  const { data: logs } = await supabase.from("audit_logs").select("*").eq("organization_id", tenant.id).limit(50);

  return (
    <div>
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      <p className="text-muted-foreground mt-2">Track all administrative actions</p>
      <table className="mt-6 w-full border-collapse"><thead><tr className="border-b"><th className="text-left p-3">Action</th><th className="text-left p-3">Entity</th><th className="text-left p-3">Date</th></tr></thead><tbody>{(logs || []).map((log: any) => <tr key={log.id} className="border-b hover:bg-muted/50"><td className="p-3">{log.action}</td><td className="p-3">{log.entity}</td><td className="p-3">{new Date(log.createdAt).toLocaleString()}</td></tr>)}</tbody></table>
    </div>
  );
}
