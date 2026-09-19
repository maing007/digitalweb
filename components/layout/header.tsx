import { UserButton } from "@/components/layout/user-button";

export function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">WorkSphere</h2>
      <UserButton />
    </header>
  );
}
