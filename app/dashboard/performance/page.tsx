import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { PerformanceDashboard } from "@/components/dashboard/performance-dashboard";

export default async function PerformancePage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: reviews } = await supabase
    .from("performance_reviews")
    .select("*")
    .eq("tenant_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Performance Tracking</h1>
      <p className="text-muted-foreground mt-2">Review scores and goals</p>
      <PerformanceDashboard reviews={reviews || []} />
    </div>
  );
}
