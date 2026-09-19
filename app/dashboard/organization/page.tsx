import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { OrganizationForm } from "@/components/dashboard/organization-form";

export default async function OrganizationPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: members } = await supabase.from("organization_members").select("*").eq("organization_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Organization</h1>
      <p className="text-muted-foreground mt-2">Manage your company details and team</p>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <OrganizationForm tenant={tenant} />
        <div>
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <ul className="space-y-2">
            {(members || []).map((m: any) => (
              <li key={m.id} className="flex items-center gap-2 rounded border p-3">
                <span className="font-medium">{m.user?.name ?? "Member"}</span>
                <span className="text-xs text-muted-foreground">{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
