import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default async function ReportsPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  return (
    <div>
      <h1 className="text-3xl font-bold">Reports & Analytics</h1>
      <p className="text-muted-foreground mt-2">Business and project analytics</p>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border p-6"><h3 className="font-semibold">Task Completion</h3><div className="mt-4 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={[]}><XAxis dataKey="name"/><YAxis/><Tooltip/></BarChart></ResponsiveContainer></div></div>
        <div className="rounded-lg border p-6"><h3 className="font-semibold">Revenue</h3><div className="mt-4 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={[]}><XAxis dataKey="name"/><YAxis/><Tooltip/></BarChart></ResponsiveContainer></div></div>
      </div>
    </div>
  );
}
