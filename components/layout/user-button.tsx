"use client";

import { SignOutButton } from "@/components/providers/auth-provider";

export function UserButton() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">User</span>
      <SignOutButton />
    </div>
  );
}
