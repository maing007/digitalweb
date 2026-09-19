import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { data: { count: orgCount } } = await supabase.from("organizations").select("*", { count: "exact", head: true });

  return (
    <div>
      <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
      <p className="text-muted-foreground mt-2">Techinoves platform administration</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Organizations</h3>
          <p className="text-3xl font-bold mt-2">{orgCount ?? 0}</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Subscriptions</h3>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Platform Health</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">✓</p>
        </div>
      </div>
    </div>
  );
}
