import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-2">Configure your organization settings</p>
      <div className="mt-6 space-y-4 max-w-lg">
        <div><label className="text-sm font-medium">Organization Name</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={tenant.name} /></div>
        <div><label className="text-sm font-medium">Industry</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={tenant.industry ?? ""} /></div>
        <div><label className="text-sm font-medium">Country</label><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={tenant.country ?? ""} /></div>
      </div>
    </div>
  );
}
