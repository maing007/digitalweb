import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { EmployeeList } from "@/components/dashboard/employee-list";

export default async function EmployeesPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: members } = await supabase.from("organization_members").select("*").eq("organization_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Employees</h1>
      <p className="text-muted-foreground mt-2">Manage employee records and roles</p>
      <EmployeeList members={members || []} />
    </div>
  );
}
