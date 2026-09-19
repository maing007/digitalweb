"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, AlertCircle, Loader2 } from "lucide-react";
import { Task } from "@/types";

const statusIcons = {
  TODO: Clock,
  IN_PROGRESS: Loader2,
  IN_REVIEW: AlertCircle,
  BLOCKED: AlertCircle,
  COMPLETED: Check,
  CANCELED: Clock,
};

export function TaskBoard({ tasks }: { tasks: any[] }) {
  const columns = ["TODO", "IN_PROGRESS", "IN_REVIEW", "BLOCKED", "COMPLETED"];

  return (
    <div className="mt-6">
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((status) => {
          const Icon = statusIcons[status as keyof typeof statusIcons] || Clock;
          const statusTasks = tasks.filter((t) => t.status === status);
          return (
            <div key={status} className="min-w-[250px] flex-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Icon className="h-4 w-4" /> {status} ({statusTasks.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {statusTasks.map((task) => (
                    <div key={task.id} className="rounded border p-3 text-sm hover:bg-muted/50">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(task.assignee as any)?.name ?? "Unassigned"}
                      </p>
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
