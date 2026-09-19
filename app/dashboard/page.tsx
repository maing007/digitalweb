import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";

export default async function DashboardPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome to WorkSphere — {tenant.name}</p>
    </div>
  );
}
