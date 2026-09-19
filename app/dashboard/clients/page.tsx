import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";

export default async function ClientsPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");
  const { data: clients } = await supabase.from("clients").select("*").eq("organization_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Clients & CRM</h1>
      <p className="text-muted-foreground mt-2">Manage your client relationships</p>
      <table className="mt-6 w-full border-collapse">
        <thead><tr className="border-b"><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Status</th></tr></thead>
        <tbody>
          {(clients || []).map((c: any) => (
            <tr key={c.id} className="border-b hover:bg-muted/50"><td className="p-3">{c.name}</td><td className="p-3">{c.email}</td><td className="p-3">{c.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
