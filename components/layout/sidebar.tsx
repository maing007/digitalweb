"use client";

import { NavItems } from "@/components/layout/nav-items";
import { Logo } from "@/components/layout/logo";

export function Sidebar() {
  return (
    <aside className="w-64 bg-border min-h-screen border-r p-4 flex flex-col">
      <Logo />
      <nav className="mt-8 flex-1">
        <NavItems />
      </nav>
    </aside>
  );
}
