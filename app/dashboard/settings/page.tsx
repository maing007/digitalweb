import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-2">Configure your WorkSpace tenant settings</p>
    </div>
  );
}
