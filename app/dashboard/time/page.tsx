import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { TimeTracker } from "@/components/dashboard/time-tracker";

export default async function TimePage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: entries } = await supabase.from("time_entries").select("*").eq("organization_id", tenant.id).limit(100);

  return (
    <div>
      <h1 className="text-3xl font-bold">Time Tracking</h1>
      <p className="text-muted-foreground mt-2">Track work hours across projects</p>
      <TimeTracker entries={entries || []} />
    </div>
  );
}
