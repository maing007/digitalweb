import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

const statusColors = { ACTIVE: "text-green-600", TRIALING: "text-blue-600", PAST_DUE: "text-orange-600", CANCELED: "text-red-600", EXPIRED: "text-gray-600", SUSPENDED: "text-red-600" };
const statusIcons = { ACTIVE: CheckCircle, TRIALING: Clock, PAST_DUE: AlertCircle, CANCELED: XCircle, EXPIRED: XCircle, SUSPENDED: AlertCircle };

export default async function BillingPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");
  const { data: subscriptions } = await supabase.from("subscriptions").select("*").eq("organization_id", tenant.id).limit(10);

  return (
    <div>
      <h1 className="text-3xl font-bold">Billing & Subscriptions</h1>
      <p className="text-muted-foreground mt-2">Manage your subscription and payment history</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions?.map((sub) => {
          const Icon = statusIcons[sub.status as keyof typeof statusIcons] || Clock;
          return (
            <Card key={sub.id}>
              <CardHeader><CardTitle className="flex items-center gap-2"><Icon className={`h-5 w-5 ${statusColors[sub.status as keyof typeof statusColors] || ""}`} />{sub.status}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Plan: {sub.plan?.name ?? "N/A"}</p><p className="text-sm text-muted-foreground">Period: {new Date(sub.currentPeriodStart).toLocaleDateString()} — {new Date(sub.currentPeriodEnd).toLocaleDateString()}</p></CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
