import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/auth";
import { supabase } from "@/lib/supabase/server";
import { ProjectList } from "@/components/dashboard/project-list";

export default async function ProjectsPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/dashboard/tenants");

  const { data: projects } = await supabase.from("projects").select("*").eq("organization_id", tenant.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="text-muted-foreground mt-2">Manage your projects</p>
      <ProjectList projects={projects || []} />
    </div>
  );
}
