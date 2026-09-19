"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ROLES } from "@/lib/rbac";

export function EmployeeList({ members }: { members: any[] }) {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Team Members ({members.length})</h2>
        <Button size="sm" onClick={() => setShowInvite(!showInvite)}>
          <Plus className="mr-2 h-4 w-4" /> Invite
        </Button>
      </div>

      {showInvite && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Input placeholder="Email address" />
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Developer</option>
                <option>Designer</option>
                <option>Project Manager</option>
                <option>Team Lead</option>
                <option>Employee</option>
                <option>Client</option>
              </select>
              <Button size="sm">Send Invite</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Department</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-b hover:bg-muted/50">
              <td className="p-3">{(m.user as any)?.name ?? "Member"}</td>
              <td className="p-3">{m.role}</td>
              <td className="p-3">{m.department}</td>
              <td className="p-3">{m.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
