import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { TaskBoard } from "@/components/dashboard/task-board";

export default async function TasksPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: tasks } = await supabase.from("tasks").select("*").eq("project_id", tenant.id).limit(50);

  return (
    <div>
      <h1 className="text-3xl font-bold">Tasks</h1>
      <p className="text-muted-foreground mt-2">Manage tasks across all projects</p>
      <TaskBoard tasks={tasks || []} />
    </div>
  );
}
