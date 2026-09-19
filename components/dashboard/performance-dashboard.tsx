"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function PerformanceDashboard({ reviews }: { reviews: any[] }) {
  const taskData = reviews.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.entries(taskData).map(([name, value]) => ({ name, value }));

  return (
    <div className="mt-6 grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Task Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between"><span>Tasks Completed</span><span>{reviews.filter((r: any) => r.status === "COMPLETED").length}</span></div>
            <div className="flex justify-between"><span>Tasks In Progress</span><span>{reviews.filter((r: any) => r.status === "IN_PROGRESS").length}</span></div>
            <div className="flex justify-between"><span>Average Score</span><span>{(reviews.reduce((a: number, b: any) => a + b.score, 0) / (reviews.length || 1)).toFixed(1)}/5</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
