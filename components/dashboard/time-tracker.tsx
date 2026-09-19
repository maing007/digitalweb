"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, Plus } from "lucide-react";

export function TimeTracker({ entries }: { entries: any[] }) {
  return (
    <div className="mt-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Active Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="lg"><Play className="mr-2 h-4 w-4" /> Start</Button>
            <Button size="lg" variant="destructive"><Square className="mr-2 h-4 w-4" /> Stop</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Task</th>
                <th className="text-left p-3">Duration</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">{(entry.task as any)?.title ?? "Task"}</td>
                  <td className="p-3">{Math.round((entry.duration || 0) / 60)} min</td>
                  <td className="p-3">{new Date(entry.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
