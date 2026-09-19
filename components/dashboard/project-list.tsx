"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Project } from "@/types";

export function ProjectList({ projects }: { projects: any[] }) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
        <Button size="sm" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {showCreate && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Project name" />
              <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Description" />
              <Button size="sm">Create Project</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-muted px-2 py-1 text-xs">{project.status}</span>
                <span className="rounded-full bg-muted px-2 py-1 text-xs">{project.tasks?.length ?? 0} tasks</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
